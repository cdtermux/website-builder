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
from bs4 import BeautifulSoup

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
    
    # Clean HTML content
    html_content = clean_html_content(code_sections["html"])
    
    # Standardize file names
    file_name = 'index.html' if page_name.lower() == 'home' else f"{page_name.lower().replace(' ', '-')}.html"
    css_filename = f"{page_name.lower().replace(' ', '-')}.css"
    js_filename = f"{page_name.lower().replace(' ', '-')}.js"
    
    # Process HTML
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Update head section
    head = soup.find('head')
    if not head:
        head = soup.new_tag('head')
        soup.html.insert(0, head)
    
    # Add meta tags if missing
    if not soup.find('meta', charset=True):
        meta_charset = soup.new_tag('meta', charset='UTF-8')
        head.insert(0, meta_charset)
    
    # Add CSS links
    css_link = soup.new_tag('link', rel='stylesheet', href=css_filename)
    head.append(css_link)
    
    # Add JS at end of body
    body = soup.find('body')
    if body:
        script = soup.new_tag('script', src=js_filename)
        body.append(script)
    
    # Write files
    with open(os.path.join(folder_path, file_name), 'w', encoding='utf-8') as f:
        f.write(str(soup.prettify()))
    
    with open(os.path.join(folder_path, css_filename), 'w', encoding='utf-8') as f:
        f.write(standardize_css(code_sections["css"], page_name))
    
    with open(os.path.join(folder_path, js_filename), 'w', encoding='utf-8') as f:
        f.write(code_sections["js"])

# Function to regenerate the code
def regenerate_code(prompt, attempt=1):
    """Generate code with multiple model fallbacks"""
    client = Client()
    models = [
        "o1-mini",          # First 3 attempts
        "gpt-4o",           # Next attempt
        "gpt-4o-mini",      # Next attempt
        "gpt-3.5-turbo"    # Final fallback
    ]
    
    try:
        # First 3 attempts with o1-mini
        if attempt <= 3:
            model = models[0]
        # Subsequent attempts use different models
        elif attempt <= 6:
            model = models[attempt - 3]
        else:
            app.logger.error("All model attempts exhausted")
            raise Exception("Failed to generate code with all available models")

        app.logger.info(f"Attempting code generation with model: {model} (Attempt {attempt})")
        
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}]
        )

        response_content = response.choices[0].message.content

        if "您的ip已由于触发防滥用检测而被封禁" in response_content:
            if attempt < 6:  # Try next attempt if not exhausted
                return regenerate_code(prompt, attempt + 1)
            else:
                raise Exception("IP blocked and all models exhausted")

        return response_content

    except Exception as e:
        app.logger.error(f"Model {model} failed: {str(e)}")
        if attempt < 6:  # Try next attempt if not exhausted
            return regenerate_code(prompt, attempt + 1)
        raise Exception("All model attempts failed")

# Function to generate a page
def generate_page(page, original_prompt, base_prompt, folder_name, result_queue):
    # Add retry counter and max attempts
    max_attempts = 3
    attempts = 0
    prompt = f"{original_prompt} - {page} page: {base_prompt}"
    
    while attempts < max_attempts:
        try:
            response_content = regenerate_code(prompt)
            code_sections = extract_code_sections(response_content)

            # More thorough validation
            if not is_complete_html(code_sections["html"]) or \
               not contains_div_tags(code_sections["html"]) or \
               not code_sections["css"].strip() or \
               not code_sections["js"].strip():
                raise ValueError("Incomplete code sections")

            create_files(code_sections, folder_name, page)
            result_queue.put({"page": page, "status": "success"})
            return
        except Exception as e:
            attempts += 1
            app.logger.error(f"Failed attempt {attempts} for {page}: {str(e)}")
    
    result_queue.put({"page": page, "status": "failed"})

# New function to generate custom navbar
def generate_custom_navbar(pages):
    """Generate a single, clean navbar"""
    nav_html = """
    <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <a href="index.html" class="text-xl font-bold text-gray-800">Brand</a>
                <div class="hidden md:block">
                    <ul class="flex space-x-4">
    """
    
    for page in pages:
        file_name = 'index.html' if page.lower() == 'home' else f"{page.lower().replace(' ', '-')}.html"
        nav_html += f'                        <li><a href="{file_name}" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">{page}</a></li>\n'
    
    nav_html += """
                    </ul>
                </div>
                <button class="md:hidden rounded-md p-2 hover:bg-gray-100" id="mobile-menu-button" aria-label="Menu">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
            <div class="hidden md:hidden" id="mobile-menu">
                <ul class="pt-2 pb-3 space-y-1">
    """
    
    for page in pages:
        file_name = 'index.html' if page.lower() == 'home' else f"{page.lower().replace(' ', '-')}.html"
        nav_html += f'                    <li><a href="{file_name}" class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">{page}</a></li>\n'
    
    nav_html += """
                </ul>
            </div>
        </div>
        <script>
            document.getElementById('mobile-menu-button').addEventListener('click', function() {
                document.getElementById('mobile-menu').classList.toggle('hidden');
            });
        </script>
    </nav>
    <div class="h-16"></div> <!-- Spacer for fixed navbar -->
    """
    
    return nav_html

# Function to update HTML files with the custom navbar
def update_html_with_navbar(folder_name, pages):
    folder_path = os.path.join('generated_folders', folder_name)
    navbar_html = generate_custom_navbar(pages)
    
    for page in pages:
        file_name = 'index.html' if page.lower() == 'home' else f"{page.lower().replace(' ', '-')}.html"
        file_path = os.path.join(folder_path, file_name)
        
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            soup = BeautifulSoup(content, 'html.parser')
            
            # Remove any existing navbars
            for nav in soup.find_all('nav'):
                nav.decompose()
            
            # Add the new navbar right after body tag
            body = soup.find('body')
            if body:
                new_nav = BeautifulSoup(navbar_html, 'html.parser')
                body.insert(0, new_nav)
            
            # Ensure Tailwind CSS is present
            head = soup.find('head')
            if head and not soup.find('link', href=lambda x: x and 'tailwindcss' in x):
                tailwind_link = soup.new_tag('link')
                tailwind_link['href'] = 'https://cdn.tailwindcss.com'
                tailwind_link['rel'] = 'stylesheet'
                head.insert(0, tailwind_link)
            
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(str(soup.prettify()))
            
            app.logger.info(f"Updated {file_name} with custom navbar and ensured Tailwind CSS")
            
        except Exception as e:
            app.logger.error(f"Error updating {file_name}: {str(e)}")

def update_navbar_links(folder_name, pages):
    folder_path = os.path.join('generated_folders', folder_name)
    
    # Generate mapping of page names to file names
    file_mapping = {
        page: 'index.html' if page.lower() == 'home' else f"{page.lower().replace(' ', '-')}.html"
        for page in pages
    }
    
    for page_name in pages:
        file_path = os.path.join(folder_path, file_mapping[page_name])
        
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()

            # Update all navigation links
            for original_page, target_file in file_mapping.items():
                # Handle both absolute and relative paths
                content = re.sub(
                    rf'href=["\'](?:/)?(?:.*?/)?{re.escape(original_page.lower())}.html["\']',
                    f'href="{target_file}"',
                    content,
                    flags=re.IGNORECASE
                )

            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
                
            app.logger.info(f"Successfully updated navbar links in {file_mapping[page_name]}")
            
        except Exception as e:
            app.logger.error(f"Error updating navbar links in {file_mapping[page_name]}: {str(e)}")

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
    try:
        original_prompt = request.json.get('prompt')
        if not original_prompt:
            return jsonify({"error": "No prompt provided"}), 400

        folder_name = generate_random_folder_name()
        result_queue = queue.Queue()
        threads = []
        
        # Get pages with retry logic
        pages = get_pages_with_retry(original_prompt)
        if not pages:
            return jsonify({"error": "Failed to generate page list"}), 500

        # Generate pages with proper thread management
        for page in pages:
            thread = threading.Thread(
                target=generate_page,
                args=(page, original_prompt, base_prompt, folder_name, result_queue)
            )
            threads.append(thread)
            thread.start()

        # Wait for all threads with timeout
        for thread in threads:
            thread.join(timeout=300)  # 5-minute timeout

        # Process results
        results = []
        failed_pages = []
        while not result_queue.empty():
            result = result_queue.get()
            if result["status"] == "success":
                results.append(result["page"])
            else:
                failed_pages.append(result["page"])

        if failed_pages:
            app.logger.error(f"Failed to generate pages: {failed_pages}")
            
        if results:
            update_html_with_navbar(folder_name, results)
            update_navbar_links(folder_name, results)
            return jsonify({"folder": folder_name, "pages": results, "failed_pages": failed_pages})
        else:
            return jsonify({"error": "No pages were generated successfully"}), 500

    except Exception as e:
        app.logger.error(f"Generation failed: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Route to serve generated files
@app.route('/view/<folder>/<path:filename>')
def view(folder, filename):
    return send_from_directory(os.path.join('generated_folders', folder), filename)

def clean_html_content(html_content):
    """Clean HTML content and ensure proper structure"""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove ALL navigation-related elements
    for element in soup.find_all(['nav', 'header']):
        element.decompose()
    
    # Remove elements with navigation-related classes
    for element in soup.find_all(class_=lambda x: x and any(term in str(x).lower() for term in ['nav', 'menu', 'header', 'navbar'])):
        element.decompose()
    
    # Remove elements with navigation-related IDs
    for element in soup.find_all(id=lambda x: x and any(term in str(x).lower() for term in ['nav', 'menu', 'header', 'navbar'])):
        element.decompose()
    
    # Ensure proper HTML structure
    if not soup.html:
        new_html = soup.new_tag('html')
        new_html.append(soup)
        soup = BeautifulSoup(str(new_html), 'html.parser')
    
    # Ensure head section exists
    head = soup.find('head')
    if not head:
        head = soup.new_tag('head')
        soup.html.insert(0, head)
    
    # Add required meta tags
    if not soup.find('meta', charset=True):
        meta_charset = soup.new_tag('meta', charset='UTF-8')
        head.insert(0, meta_charset)
    
    if not soup.find('meta', attrs={'name': 'viewport'}):
        meta_viewport = soup.new_tag('meta', attrs={
            'name': 'viewport',
            'content': 'width=device-width, initial-scale=1.0'
        })
        head.append(meta_viewport)
    
    # Ensure Tailwind CSS is present
    if not soup.find('link', href=lambda x: x and 'tailwindcss' in str(x)):
        tailwind_link = soup.new_tag('link')
        tailwind_link['href'] = 'https://cdn.tailwindcss.com'
        tailwind_link['rel'] = 'stylesheet'
        head.insert(0, tailwind_link)
    
    return str(soup.prettify())

def standardize_css(css_content, page_name):
    """Add standard CSS and fix paths"""
    common_styles = """
    /* Reset and common styles */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    /* Navigation styles */
    .navbar {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    /* Common animations */
    .fade-in { animation: fadeIn 0.5s ease-in; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    """
    
    return common_styles + "\n" + css_content

def get_pages_with_retry(prompt, max_retries=6):
    """Get list of pages from the AI with retry logic and model fallbacks"""
    models = [
        "o1-mini",          # First 3 attempts
        "gpt-4o",           # 4th attempt
        "gpt-4o-mini",      # 5th attempt
        "gpt-3.5-turbo"     # Final attempt
    ]
    
    for attempt in range(max_retries):
        try:
            # Select model based on attempt number
            if attempt < 3:
                model = models[0]
            else:
                model = models[attempt - 2]
                
            app.logger.info(f"Attempting page list generation with model: {model} (Attempt {attempt + 1})")
            
            pages_prompt = f"Based on this description: '{prompt}', list only the essential pages needed (minimum 3, maximum 7). Format: Home, About, etc. Only return the comma-separated list, nothing else."
            
            client = Client()
            response = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": pages_prompt}]
            )
            
            pages_text = response.choices[0].message.content.strip()
            
            # Check for IP block
            if "您的ip已由于触发防滥用检测而被封禁" in pages_text:
                raise Exception("IP blocked")
            
            pages = [page.strip() for page in pages_text.split(',')]
            
            # Ensure Home page is included
            if 'Home' not in pages and 'home' not in pages:
                pages.insert(0, 'Home')
            
            # Standardize page names
            pages = [page.strip().title() for page in pages]
            
            if len(pages) >= 3:
                app.logger.info(f"Successfully generated page list using {model}")
                return pages
                
        except Exception as e:
            app.logger.error(f"Attempt {attempt + 1} with {model} failed: {str(e)}")
            if attempt == max_retries - 1:
                app.logger.warning("All models failed, using fallback pages")
                return ['Home', 'About', 'Contact']
            continue

base_prompt = """Create a modern, responsive web page with these requirements:
1. Use semantic HTML5 structure (NO navigation/menu elements)
2. Include these meta tags:
   - charset UTF-8
   - viewport
   - description
3. Style requirements:
   - Use Tailwind CSS classes
   - Mobile-first approach
   - Modern glassmorphism effects
   - Smooth animations
4. Content structure:
   - Main content section
   - Footer (no navigation)
   - Clear visual hierarchy
5. JavaScript features:
   - Smooth scrolling
   - Interactive elements
   - Form validation if applicable
6. Performance:
   - Optimize images
   - Lazy loading
   - Efficient CSS classes

IMPORTANT: DO NOT include any navigation bars, menus, or site-wide headers - these will be added separately.
Focus only on the main content of the page.
"""

if __name__ == "__main__":
    app.run(debug=False)