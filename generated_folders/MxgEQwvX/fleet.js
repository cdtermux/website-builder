const fleetImages = document.querySelectorAll('.fleet-image');

// Fetch images from Pexels API
fetch(`https://api.pexels.com/v1/search?query=truck&orientation=horizontal&size=large&per_page=3&apikey=${process.env.PIXEL_API_KEY}`)
    .then(response => response.json())
    .then(data => {
        data.photos.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image.src.large;
            img.alt = image.alt;
            img.classList.add('w-full', 'h-64', 'object-cover', 'rounded', 'shadow-md');
            fleetImages[index].appendChild(img);
        });
    });

// Add event listener to buttons
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('view-operations')) {
            // View operations logic
            localStorage.setItem('operations', 'view');
        } else if (target.classList.contains('edit-operations')) {
            // Edit operations logic
            localStorage.setItem('operations', 'edit');
        }
    });
});