from flask import Flask, request, jsonify, render_template, send_from_directory
import os
import random
import string
import re
from g4f.client import Client
import threading
import queue

app = Flask(__name__)

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
            # Link specific page styles
            html_content = html_content[:head_tag_index] + f'<link rel="stylesheet" href="{page_name.lower().replace(" ", "-")}.css">\n' + html_content[head_tag_index:]
        else:
            html_content = f'<link rel="stylesheet" href="{page_name.lower().replace(" ", "-")}.css">\n' + html_content
        
        # Link the corresponding script file
        if '<script src="' not in html_content:
            body_tag_index = html_content.find('</body>')
            if body_tag_index != -1:
                html_content = html_content[:body_tag_index] + f'<script src="{page_name.lower().replace(" ", "-")}.js"></script>\n' + html_content[body_tag_index:]
            else:
                html_content += f'<script src="{page_name.lower().replace(" ", "-")}.js"></script>'
        
        html_file.write(html_content)

    # Save CSS to a page-specific file
    with open(os.path.join(folder_path, f'{page_name.lower().replace(" ", "-")}.css'), 'w', encoding='utf-8') as css_file:
        css_file.write(code_sections["css"])
    
    # Save JS to a page-specific file
    with open(os.path.join(folder_path, f'{page_name.lower().replace(" ", "-")}.js'), 'w', encoding='utf-8') as js_file:
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

        if not is_js_present(code_sections["js"]):
            print(f"Missing JavaScript detected for {page}. Regenerating...")
            continue

        break

    create_files(code_sections, folder_name, page)
    result_queue.put(page)

# Index route
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
    pages_prompt = f"List out the essential minimum pages that should be created for the website not more than 10 about {original_prompt}. Provide the list as a comma-separated string: the response has to be like 'the minimum required pages are: ...'"
    pages_response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": pages_prompt}]
    )
    
    pages = [page.strip() for page in pages_response.choices[0].message.content.split(':')[1].split(',')]
    
    folder_name = generate_random_folder_name()
    
    base_prompt = '''Please create a complete web page using HTML, Tailwind CSS, and JavaScript with a modern, techy, and visually engaging layout. The page should feature a linear gradient background, vibrant design elements, and a broad, visually appealing design. Include distinct sections such as a header, main content, and footer. Implement multiple visible buttons with interactive functionalities using JavaScript. Use `localStorage` to manage data storage. Fetch and display images from the Pexels API, with the API key stored in a `.env` [pixel_api_key] file, and include dummy content to fully populate the page. Ensure that the HTML includes the Tailwind CSS CDN link and provide separate HTML, CSS, and JavaScript code files.'''

    threads = []
    result_queue = queue.Queue()

    for page in pages:
        thread = threading.Thread(target=generate_page, args=(page, original_prompt, base_prompt, folder_name, result_queue))
        thread.start()
        threads.append(thread)

    for thread in threads:
        thread.join()

    # Collect results
    generated_pages = []
    while not result_queue.empty():
        generated_pages.append(result_queue.get())

    create_global_style(folder_name)
    update_navbar(folder_name, generated_pages)

    return jsonify({"folder": folder_name})

# Create global style for navbar
def create_global_style(folder_name):
    folder_path = os.path.join('generated_folders', folder_name)
    global_style_path = os.path.join(folder_path, 'global-style.css')
    
    env_path = os.path.join(folder_path, '.env')
    pixel_api_key = 'yqbAXj60yoBMJ7uOaBENAdPhcvnNyiUYIen5n0yuqPIhl3J8T9NLSjqC'
    
    with open(env_path, 'w') as env_file:
        env_file.write(f'PIXELS_API_KEY={pixel_api_key}\n')

    navbar_css = '''
    /* Navbar Styles */
.navbar {
    background: linear-gradient(90deg, #2c3e50, #3498db);
    padding: 0.5rem 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.navbar:hover {
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.navbar-brand {
    font-size: 1.4rem;
    font-weight: bold;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
}

.navbar-brand:hover {
    text-shadow: 0 0 10px rgba(255,255,255,0.5);
}

.navbar-toggler {
    border-color: rgba(255,255,255,0.5);
    transition: all 0.3s ease;
}

.navbar-toggler:hover {
    background-color: rgba(255,255,255,0.1);
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.navbar-nav {
    display: flex;
    align-items: center;
}

.navbar-nav .nav-item {
    margin: 0 0.2rem;
}

.navbar-nav .nav-link {
    color: #ffffff;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.navbar-nav .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #ffffff;
    transition: all 0.3s ease;
}

.navbar-nav .nav-link:hover::after,
.navbar-nav .nav-link:focus::after,
.navbar-nav .nav-item.active .nav-link::after {
    width: 100%;
    left: 0;
}

.navbar-nav .nav-link:hover,
.navbar-nav .nav-link:focus {
    color: #f8f9fa;
    background-color: rgba(255,255,255,0.1);
}

.navbar-nav .nav-item.active .nav-link {
    color: #ffffff;
    background-color: rgba(255,255,255,0.2);
}

@media (max-width: 991.98px) {
    .navbar-nav {
        padding-top: 0.5rem;
    }
    .navbar-nav .nav-item {
        margin: 0.2rem 0;
    }
    .navbar-nav .nav-link {
        padding: 0.5rem 1rem;
    }
}

/* Add this for a smooth slide-down animation when toggling on mobile */
@media (max-width: 991.98px) {
    .navbar-collapse {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease;
    }
    .navbar-collapse.show {
        max-height: 500px; /* Adjust this value based on your content */
    }
}
    '''
    
    with open(global_style_path, 'w', encoding='utf-8') as f:
        f.write(navbar_css)

# Update navbar in all generated pages
def update_navbar(folder_name, pages):
    folder_path = os.path.join('generated_folders', folder_name)
    for filename in os.listdir(folder_path):
        if filename.endswith('.html'):
            file_path = os.path.join(folder_path, filename)
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()

            new_navbar = '''
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Your Brand</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
            '''
            
            for page in pages:
                page_filename = 'index.html' if page.lower() == 'home' else f"{page.lower().replace(' ', '-')}.html"
                new_navbar += f'''
                            <li class="nav-item">
                                <a class="nav-link" href="{page_filename}">{page}</a>
                            </li>
                '''
            
            new_navbar += '''
                        </ul>
                    </div>
                </div>
            </nav>
            '''
            
            body_tag_index = content.find('<body')
            if body_tag_index != -1:
                body_end_index = content.find('>', body_tag_index)
                if body_end_index != -1:
                    content = content[:body_end_index + 1] + new_navbar + content[body_end_index + 1:]

            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)

# Serve generated files route
@app.route('/generated_folders/<folder_name>/<path:filename>')
def serve_generated_file(folder_name, filename):
    folder_path = os.path.join('generated_folders', folder_name)
    return send_from_directory(folder_path, filename)

if __name__ == '__main__':
    app.run(debug=True)
