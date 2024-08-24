const generateBtn = document.getElementById('generate-btn');
const saveBtn = document.getElementById('save-btn');
const promptInput = document.getElementById('prompt');
const htmlCodeOutput = document.getElementById('html-code');
const cssCodeOutput = document.getElementById('css-code');
const jsCodeOutput = document.getElementById('js-code');
const viewPageBtn = document.createElement('button');
viewPageBtn.textContent = 'View Page';
viewPageBtn.style.display = 'none';
document.body.appendChild(viewPageBtn);

let currentFolderName = '';

generateBtn.addEventListener('click', async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    alert('Please enter a prompt.');
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    htmlCodeOutput.textContent = data.html;
    cssCodeOutput.textContent = data.css;
    jsCodeOutput.textContent = data.js;
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while generating the code.');
  }
});

saveBtn.addEventListener('click', () => {
  currentFolderName = generateRandomFolderName();
  saveCodeToLocalStorage(currentFolderName);
  viewPageBtn.style.display = 'block';
  alert(`Files saved in folder: ${currentFolderName}`);
});

viewPageBtn.addEventListener('click', () => {
  if (currentFolderName) {
    const win = window.open('', '_blank');
    const storedData = JSON.parse(localStorage.getItem(currentFolderName));
    win.document.write(`
      <html>
        <head>
          <style>${storedData.css}</style>
        </head>
        <body>
          ${storedData.html}
          <script>${storedData.js}</script>
        </body>
      </html>
    `);
  } else {
    alert('No page generated yet. Please generate and save a page first.');
  }
});

function generateRandomFolderName(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return 'generated_folders/' + result;
}

function saveCodeToLocalStorage(folderName) {
  const htmlContent = htmlCodeOutput.textContent;
  const cssContent = cssCodeOutput.textContent;
  const jsContent = jsCodeOutput.textContent;

  const folderContent = {
    html: htmlContent,
    css: cssContent,
    js: jsContent
  };

  localStorage.setItem(folderName, JSON.stringify(folderContent));
}