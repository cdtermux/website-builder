import logging
import queue
import threading
from flask import Flask, jsonify, request, render_template, send_from_directory
import os
import random
import string
import re
from g4f.client import Client
from datetime import datetime

# Flask app setup
app = Flask(__name__)

# Logging configuration
log_level = logging.DEBUG
log_file = 'app.log'
log_file_mode = 'a'
log_format = '%(asctime)s - %(levelname)s - %(message)s'

logging.basicConfig(level=log_level, filename=log_file, filemode=log_file_mode, format=log_format)

# Add console handler if you want logs to also appear in the console
console_handler = logging.StreamHandler()
console_handler.setLevel(log_level)
console_handler.setFormatter(logging.Formatter(log_format))
app.logger.addHandler(console_handler)

# Example usage of logging in your app
app.logger.info('Starting Flask app')


# Counter to track code generation failures
code_generation_failures = {}
avoid ="do not add any chineese word in the reponse , go with pure english "

# Your existing code below
def write_to_log(new_content, file_path='logs.txt'):
    # Get the current date and time
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    # Create the log content with date and time
    log_entry = f"{current_time} - {new_content}"
    
    try:
        with open(file_path, 'a') as file:
            file.write(log_entry + '\n')  # Adding a newline character for readability
        app.logger.info(f"Content successfully written to {file_path}")
    except Exception as e:
        app.logger.error(f"An error occurred: {e}")



# Example usage
file_path = 'logs.txt'
# new_content = 'This is the new log entry.'


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
    new_content =f"Page {page_name} generated successfully."
    write_to_log(new_content )

# Function to regenerate the code
def regenerate_code(prompt):
    client = Client()
    retry = True

    while retry:
        response = client.chat.completions.create(
            model="claude-3.5-sonnet",
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
    # Force a log entry to test
    app.logger.info('Starting Flask app')
    
    while True:
        response_content = regenerate_code(prompt)
        code_sections = extract_code_sections(response_content)

        if not is_complete_html(code_sections["html"]) or not contains_div_tags(code_sections["html"]):
            print(f"Incomplete HTML or missing <div> tags detected for {page}. Regenerating...")
            new_content =f"Incomplete HTML or missing <div> tags detected for {page}. Regenerating..."
            write_to_log(new_content )
            continue

        break

    create_files(code_sections, folder_name, page)
    result_queue.put(page)

def generate_navbar_css(navbar_html):
    """Generate custom CSS for the navbar using AI"""
    client = Client()
    
    css_prompt = f"""
    Given this navbar HTML:
    {navbar_html}
    
    Generate modern, professional CSS that will:
    1. Create a sleek, professional navigation bar
    2. Include smooth hover transitions
    3. Ensure proper spacing and alignment
    4. Make the navbar sticky/fixed at the top
    5. Handle both light and dark modes
    6. Include responsive design for mobile
    7. Add subtle shadows and depth
    8. Ensure high contrast and readability
    
    Return ONLY the CSS code wrapped in ```css``` tags.
    """
    
    try:
        response = client.chat.completions.create(
            model="claude-3.5-sonnet",
            messages=[{"role": "user", "content": css_prompt}]
        )
        
        css_content = response.choices[0].message.content
        
        # Extract CSS from code blocks
        css_match = re.search(r'```css(.*?)```', css_content, re.DOTALL)
        if css_match:
            return css_match.group(1).strip()
        return ""
    except Exception as e:
        app.logger.error(f"Failed to generate navbar CSS: {str(e)}")
        return ""

def generate_custom_navbar(pages):
    """Generate the standardized navbar HTML"""
    navbar_html = '''
    <nav class="main-nav">
        <div class="nav-container">
            <div class="nav-content">
                <!-- Logo -->
                <div class="nav-logo">
                    <a href="index.html">
                        <img src="/path/to/logo.svg" alt="Logo">
                    </a>
                </div>

                <!-- Desktop Navigation -->
                <div class="nav-links">
                    <ul class="nav-list">
                        {nav_links}
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    '''
    
    nav_links = []
    for page in pages:
        file_name = 'index.html' if page.lower() == 'home' else f"{page.lower().replace(' ', '-')}.html"
        link_text = page.replace('-', ' ').title()
        nav_links.append(f'<li class="nav-item"><a href="{file_name}">{link_text}</a></li>')
    
    return navbar_html.format(nav_links='\n'.join(nav_links))

def update_html_with_navbar(folder_name, pages):
    """Update HTML files with navbar and create/link navbar CSS"""
    folder_path = os.path.join('generated_folders', folder_name)
    
    # Generate navbar HTML and CSS
    navbar_html = generate_custom_navbar(pages)
    navbar_css = generate_navbar_css(navbar_html)
    
    # Save navbar CSS to file
    css_path = os.path.join(folder_path, 'navbar.css')
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(navbar_css)
    
    # Update each HTML file
    for page in pages:
        file_name = 'index.html' if page.lower() == 'home' else f"{page.lower().replace(' ', '-')}.html"
        file_path = os.path.join(folder_path, file_name)
        
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Remove any existing navigation elements
        content = re.sub(r'<nav\b[^>]*>.*?</nav>', '', content, flags=re.DOTALL)
        
        # Add navbar CSS link in head if not present
        css_link = '<link rel="stylesheet" href="navbar.css">'
        if '</head>' in content and css_link not in content:
            content = content.replace('</head>', f'    {css_link}\n</head>')
        
        # Insert navbar after body tag
        body_tag_index = content.find('<body')
        if body_tag_index != -1:
            closing_bracket_index = content.find('>', body_tag_index)
            if closing_bracket_index != -1:
                updated_content = (
                    content[:closing_bracket_index + 1] + 
                    '\n' + navbar_html + 
                    content[closing_bracket_index + 1:]
                )
                
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(updated_content)
        
        write_to_log(f"Updated {file_name} with custom navbar and ensured Tailwind CSS")

def update_navbar_links(folder_name, pages):
    print("navbar updation starts...")
    new_content ="navbar updation starts..."
    write_to_log( new_content)
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
            print(f"Updated navbar links in {p}")
            new_content =f"Updated navbar links in {p}"
            write_to_log(new_content)


        new_content =f"Updated navbar links in {file_name}"
        write_to_log(new_content)
        print(f"Updated navbar links in {file_name}")
        

# Example usage:
# update_navbar_links('my_folder', ['Home', 'About Us', 'Contact'])

# Force a log entry to test
app.logger.info('Starting Flask app')
@app.route('/')
def index():
    app.logger.info('Index route accessed')
    return render_template('index.html')

# Generate pages route
@app.route('/generate', methods=['POST'])
def generate():
    global code_generation_failures
    original_prompt = request.json.get('prompt')
    app.logger.info('generation started..')
    client = Client()
    
    # Get the list of pages
    pages_prompt = f"List out the essential minimum pages that should be created for the website not more than 10 about {original_prompt}. Provide the list as a comma-separated string: the response has to be like 'the minimum required pages are: ...' and {avoid}"
    pages_response = client.chat.completions.create(
        model="claude-3.5-sonnet",
        messages=[{"role": "user", "content": pages_prompt}]
    )
    
    pages = [page.strip() for page in pages_response.choices[0].message.content.split(':')[1].split(',')]
    
    folder_name = generate_random_folder_name()
    
    base_prompt = '''Generate a complete, production-ready web page for a {page_name} using modern web development best practices. The page should be visually striking, highly functional, and optimized for performance and SEO. Utilize HTML5, Tailwind CSS (via CDN), custom CSS for enhancements, and JavaScript (ES6+). Include the following elements:

HTML Structure:
Use semantic HTML5 tags for improved accessibility and SEO
Implement proper document structure with appropriate meta tags
Include a responsive viewport meta tag
DO NOT include a navigation bar or header navigation - this will be added separately

Styling:
Utilize Tailwind CSS classes for primary layout and design
Implement custom CSS for unique color enhancements and specific styling needs
Create a visually appealing color scheme using a harmonious palette
Apply gradient backgrounds where appropriate
Incorporate subtle, smooth animations to enhance user experience

Custom Elements:
Design and implement custom SVG elements for icons, illustrations, or decorative purposes
Fetch and display high-quality, relevant images from the Pexels API

Layout and Components:
Design a visually engaging hero section relevant to the {page_name}
Implement content sections with appropriate layout for the page type
Include interactive elements like buttons, forms, or cards with hover effects
Design a footer with copyright info and social media links

[... rest of the prompt remains the same ...]'''

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