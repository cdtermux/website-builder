const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const API_URL = `https://api.pexels.com/v1/search?query=tech&orientation=portrait&size=large&orientation=portrait&per_page=1&api_key=${PEXELS_API_KEY}`;

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        const imageContainer = document.getElementById('image-container');
        const image = document.createElement('img');
        image.src = data.photos[0].src.large;
        imageContainer.appendChild(image);
    })
    .catch(error => console.error(error));

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.id === 'button1') {
            alert('Learn more about our services!');
        } else if (button.id === 'button2') {
            localStorage.setItem('terms-agreed', 'true');
            alert('Thank you for agreeing to our terms of service!');
        }
    });
});

if (localStorage.getItem('terms-agreed') === 'true') {
    alert('You have already agreed to our terms of service!');
}