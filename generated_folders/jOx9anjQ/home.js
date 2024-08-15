document.addEventListener('DOMContentLoaded', () => {
    const aboutBtn = document.getElementById('aboutBtn');
    const projectsBtn = document.getElementById('projectsBtn');
    const contactBtn = document.getElementById('contactBtn');
    const mainContent = document.getElementById('mainContent');

    aboutBtn.addEventListener('click', () => showSection('about'));
    projectsBtn.addEventListener('click', () => showSection('projects'));
    contactBtn.addEventListener('click', () => showSection('contact'));

    function showSection(sectionId) {
        const sections = ['about', 'projects', 'contact'];
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (section === sectionId) {
                element.classList.remove('hidden');
                if (sectionId === 'projects') {
                    fetchImages();
                }
            } else {
                element.classList.add('hidden');
            }
        });
    }

    function fetchImages() {
        const apiKey = process.env.PIXEL_API_KEY; // Ensure to set this in your environment
        const url = `https://api.pexels.com/v1/search?query=web%20development&per_page=6`;

        fetch(url, {
            headers: {
                Authorization: apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            const projectImages = document.getElementById('projectImages');
            projectImages.innerHTML = '';
            data.photos.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.src.medium;
                img.alt = photo.alt;
                img.className = 'w-full h-auto rounded-lg';
                projectImages.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching images:', error));
    }
});