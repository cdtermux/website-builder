import logging
from flask import Flask, request, jsonify, render_template, send_from_directory
import os
import random
import string
import re
from g4f.client import Client
import threading
import queue


avoid ="do not add any chineese word in the reponse , go with pure english "
app = Flask(__name__)
# DEBUG, INFO, WARNING, ERROR, CRITICAL
log_level = logging.DEBUG
log_file = 'app.log'
log_file_mode = 'a'
log_format = '%(asctime)s - %(levelname)s - %(message)s'

logging.basicConfig(level=log_level, filename=log_file, filemode=log_file_mode, format=log_format)

# Force a log entry to test
app.logger.info('Starting Flask app')
# Counter to track code generation failures
code_generation_failures = {}

# Function to generate a random folder name
def generate_random_folder_name(length=8):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

# Function to extract code sections from the response
def extract_code_sections(response):
    sections = {"html": "", "css": "", "js": ""}
    
    html_pattern = re.compile(r'```html:?(.*?)```', re.DOTALL | re.IGNORECASE)
    css_pattern = re.compile(r'```css:?(.*?)```', re.DOTALL | re.IGNORECASE)
    js_pattern = re.compile(r'```javascript(.*?)```', re.DOTALL | re.IGNORECASE)
    
    html_match = html_pattern.search(response)
    css_match = css_pattern.search(response)
    js_match = js_pattern.search(response)
    
    if html_match:
        sections["html"] = html_match.group(1).strip()
    if css_match:
        sections["css"] = css_match.group(1).strip()
    if js_match:
        sections["js"] = js_match.group(1).strip()
    
    return sections

# Function to check if the HTML content is complete
def is_complete_html(html_content):
    return re.search(r'<html[^>]*>', html_content, re.IGNORECASE) and re.search(r'</html>', html_content, re.IGNORECASE)

# Function to check if the JS content is present
def is_js_present(js_content):
    return bool(js_content.strip())

# Function to check if the HTML content contains <div> tags
def contains_div_tags(html_content):
    return bool(re.search(r'<div[^>]*>', html_content, re.IGNORECASE))

# Function to handle the creation and regeneration of files
def create_files(code_sections, folder_name, page_name):
    folder_path = os.path.join('generated_folders', folder_name)
    os.makedirs(folder_path, exist_ok=True)
    
    # Format the page file name
    file_name = 'index.html' if page_name.lower() == 'home' else f"{page_name.lower().replace(' ', '-')}.html"
    
    # Save HTML file
    with open(os.path.join(folder_path, file_name), 'w', encoding='utf-8') as html_file:
        html_content = code_sections["html"]
        
        head_tag_index = html_content.find('</head>')
        if head_tag_index != -1:
            # Link specific page styles and global styles
            html_content = html_content[:head_tag_index] + f'<link rel="stylesheet" href="{page_name.lower().replace(" ", "-")}.css">\n<link rel="stylesheet" href="global-style.css">\n' + html_content[head_tag_index:]
        else:
            html_content = f'<link rel="stylesheet" href="{page_name.lower().replace(" ", "-")}.css">\n<link rel="stylesheet" href="global-style.css">\n' + html_content
        
        # Add the corresponding script file at the end of the body tag
        body_tag_index = html_content.find('</body>')
        if body_tag_index != -1:
            html_content = html_content[:body_tag_index] + f'<script src="{page_name.lower().replace(" ", "-")}.js"></script>\n' + html_content[body_tag_index:]
        else:
            html_content += f'<script src="{page_name.lower().replace(" ", "-")}.js"></script>'
        
        html_file.write(html_content)

    # Save CSS to a page-specific file
    css_filename = 'home.css' if page_name.lower() == 'home' else f"{page_name.lower().replace(' ', '-')}.css"
    with open(os.path.join(folder_path, css_filename), 'w', encoding='utf-8') as css_file:
        css_file.write(code_sections["css"])
    
    # Save JS to a page-specific file
    js_filename = 'home.js' if page_name.lower() == 'home' else f"{page_name.lower().replace(' ', '-')}.js"
    with open(os.path.join(folder_path, js_filename), 'w', encoding='utf-8') as js_file:
        js_file.write(code_sections["js"])

    print(f'Page {page_name} generated successfully.')

# Function to regenerate the code
def regenerate_code(prompt):
    client = Client()
    retry = True

    while retry:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )

        response_content = response.choices[0].message.content

        if "您的ip已由于触发防滥用检测而被封禁" in response_content:
            continue
        else:
            retry = False

    return response_content

# Function to generate a page
def generate_page(page, original_prompt, base_prompt, folder_name, result_queue):
    prompt = f"{original_prompt} - {page} page: {base_prompt}"
    
    while True:
        response_content = regenerate_code(prompt)
        code_sections = extract_code_sections(response_content)

        if not is_complete_html(code_sections["html"]) or not contains_div_tags(code_sections["html"]):
            print(f"Incomplete HTML or missing <div> tags detected for {page}. Regenerating...")
            continue

        break

    create_files(code_sections, folder_name, page)
    result_queue.put(page)

# New function to generate custom navbar
def generate_custom_navbar(pages):
    client = Client()
    
    navbar_prompt = f"""Create a fully responsive, accessible navbar using Tailwind CSS that includes links to the following pages: {', '.join(pages)}, ensuring each link uses its exact .html extension without any modification to the page names. The navbar should be wrapped in a <nav> tag and use semantic HTML elements like ul, li, and a to ensure proper structure and accessibility. It should feature a logo and a mobile-friendly hamburger menu for smaller screens, which collapses and expands smoothly with JavaScript. Use Tailwind CSS classes to style the navbar, prioritizing responsiveness and visual consistency across all screen sizes. The design should include appropriate ARIA attributes, such as aria-expanded and aria-controls, to ensure the mobile menu is fully accessible. Add hover, focus, and active states to the interactive elements, making sure keyboard navigation is intuitive and clear. The navbar should be visually engaging, potentially featuring a shadow or fixed-top design, and the HTML should be production-ready with clean, optimized code."""

    while True:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": navbar_prompt}]
        )

        response_content = response.choices[0].message.content

        # Extract the navbar HTML
        nav_pattern = re.compile(r'<nav.*?>(.*?)</nav>', re.DOTALL)
        nav_match = nav_pattern.search(response_content)

        if nav_match:
            navbar_html = nav_match.group(0)  # This includes the <nav> tags
            
            # Replace generic page names with the correct file names
            for page in pages:
                file_name = 'index.html' if page.lower() == 'home' else f"{page.lower().replace(' ', '-')}.html"
                navbar_html = navbar_html.replace(f'href="{page.lower()}.html"', f'href="{file_name}"')
                navbar_html = navbar_html.replace(f'href="{page}.html"', f'href="{file_name}"')
            
            return navbar_html
        else:
            print("Navbar not found in the generated content. Retrying...")

    return ""  # Return an empty string if no navbar is generated after multiple attempts
# Function to update HTML files with the custom navbar
def update_html_with_navbar(folder_name, pages):
    folder_path = os.path.join('generated_folders', folder_name)
    navbar_html = generate_custom_navbar(pages)
    
    for page in pages:
        file_name = 'index.html' if page.lower() == 'home' else f"{page.lower().replace(' ', '-')}.html"
        file_path = os.path.join(folder_path, file_name)
        
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Insert navbar after the <body> tag
        body_tag_index = content.find('<body')
        if body_tag_index != -1:
            closing_bracket_index = content.find('>', body_tag_index)
            if closing_bracket_index != -1:
                updated_content = content[:closing_bracket_index + 1] + '\n' + navbar_html + content[closing_bracket_index + 1:]
                
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(updated_content)
        
        print(f"Updated {file_name} with custom navbar.")

def update_navbar_links(folder_name, pages):
    folder_path = os.path.join('generated_folders', folder_name)

    for page_name in pages:
        # Format the page file name
        file_name = 'index.html' if page_name.lower() == 'home' else f"{page_name.lower().replace(' ', '-')}.html"
        file_path = os.path.join(folder_path, file_name)

        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        # Update href links in the navbar
        for p in pages:
            # Format the href links just like the file names
            new_href = 'index.html' if p.lower() == 'home' else f"{p.lower().replace(' ', '-')}.html"
            
            # Remove any leading or trailing slashes from the new href
            new_href = new_href.strip('/')

            # Update the href attribute in the navbar
            content = re.sub(
                rf'href=["\'](?:/{re.escape(p.lower())}\.html|/{re.escape(p.lower().replace(" ", "-"))}\.html)["\']',
                f'href="{new_href}"',
                content
            )

        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)

        print(f"Updated navbar links in {file_name}")

# Example usage:
# update_navbar_links('my_folder', ['Home', 'About Us', 'Contact'])

        
@app.route('/')
def index():
    return render_template('index.html')

# Generate pages route
@app.route('/generate', methods=['POST'])
def generate():
    global code_generation_failures
    original_prompt = request.json.get('prompt')
    
    client = Client()
    
    # Get the list of pages
    pages_prompt = f"List out the essential minimum pages that should be created for the website not more than 10 about {original_prompt}. Provide the list as a comma-separated string: the response has to be like 'the minimum required pages are: ...' and {avoid}"
    pages_response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": pages_prompt}]
    )
    
    pages = [page.strip() for page in pages_response.choices[0].message.content.split(':')[1].split(',')]
    
    folder_name = generate_random_folder_name()
    
    base_prompt = '''Generate a complete, production-ready web page for a {page_name} using modern web development best practices. The page should be visually striking, highly functional, and optimized for performance and SEO. Utilize HTML5, Tailwind CSS (via CDN), custom CSS for enhancements, and JavaScript (ES6+). Include the following elements:

HTML Structure:

Use semantic HTML5 tags for improved accessibility and SEO
Implement proper document structure with appropriate meta tags
Include a responsive viewport meta tag


Styling:

Utilize Tailwind CSS classes for primary layout and design
Implement custom CSS for unique color enhancements and specific styling needs
Create a visually appealing color scheme using a harmonious palette (suatable and best)
Apply gradient backgrounds where appropriate (suatable)
Incorporate subtle, smooth animations to enhance user experience (best applyable)


Custom Elements:

Design and implement custom SVG elements for icons, illustrations, or decorative purposes (provide complete SVG code)
Fetch and display high-quality, relevant images from the Pexels API (include API call in JavaScript , get the pixel api from .env file ())


Layout and Components:

Create a responsive header with logo and navigation menu
Design a visually engaging hero section relevant to the {page_name}
Implement content sections with appropriate layout for the page type
Include interactive elements like buttons, forms, or cards with hover effects
Design a footer with copyright info and social media links


Animations and Interactivity:

Add subtle scroll animations for content reveal
Implement smooth transitions for interactive elements
Create micro-interactions for buttons and links


JavaScript Functionality:

Implement any necessary interactive features (e.g., modals, sliders, form validation)
Add event listeners for user interactions
Implement lazy loading for images and heavy content


SEO Optimization:

Generate SEO-optimized content for the {page_name} (minimum 300 words)
Include appropriate headings (H1, H2, H3) with relevant keywords
Add meta description and title tags
Implement schema markup relevant to the page content


Performance Optimization:

Minify CSS and JavaScript
Optimize images and use appropriate formats (WebP where supported)
Implement critical CSS for above-the-fold content


Accessibility:

Ensure proper color contrast ratios
Add appropriate ARIA labels and roles
Implement keyboard navigation support


Additional Features:

Implement a simple cookie consent banner
Create a "Back to Top" button that appears on scroll



Provide the complete, production-ready HTML, CSS (both Tailwind classes and custom CSS), and JavaScript code for the {page_name}. Include inline comments explaining key sections and any complex logic.and{avoid}'''

    result_queue = queue.Queue()
    threads = []
    
    # Start thread for each page
    for page in pages:
        thread = threading.Thread(target=generate_page, args=(page, original_prompt, base_prompt, folder_name, result_queue))
        threads.append(thread)
        thread.start()

    # Wait for all threads to finish
    for thread in threads:
        thread.join()

    generated_pages = []
    while not result_queue.empty():
        generated_pages.append(result_queue.get())
    
    # Update HTML files with custom navbar
    update_html_with_navbar(folder_name, generated_pages)

    update_navbar_links(folder_name, generated_pages)

    
    return jsonify({"folder": folder_name, "pages": generated_pages})

# Route to serve generated files
@app.route('/view/<folder>/<path:filename>')
def view(folder, filename):
    return send_from_directory(os.path.join('generated_folders', folder), filename)

if __name__ == "__main__":
    app.run(debug=False)