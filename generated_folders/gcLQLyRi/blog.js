document.addEventListener("DOMContentLoaded", () => {
    const fetchImageBtn = document.getElementById('fetchImage');
    const saveMessageBtn = document.getElementById('saveButton');
    const blogImage = document.getElementById('blogImage');

    async function fetchImage() {
        const response = await fetch(`https://api.pexels.com/v1/search?query=technology&per_page=1`, {
            method: 'GET',
            headers: {
                'Authorization': process.env.PEXELS_API_KEY
            }
        });
        const data = await response.json();
        const img = document.createElement('img');
        img.src = data.photos[0].src.original;
        img.alt = "Random Technology Image";
        img.classList.add('rounded', 'shadow', 'w-full', 'h-auto');
        blogImage.innerHTML = ''; // Clear previous image if any
        blogImage.appendChild(img);
    }

    fetchImageBtn.addEventListener('click', fetchImage);

    saveMessageBtn.addEventListener('click', () => {
        const message = "This is a saved message!";
        localStorage.setItem('savedMessage', message);
        alert("Message saved!");
    });
});