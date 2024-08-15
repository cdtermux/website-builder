const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

function handleButtonClick() {
    const button = event.target;
    const text = button.textContent;
    if (text === "Learn More") {
        console.log("Learn More button clicked!");
    } else if (text === "Get Started") {
        console.log("Get Started button clicked!");
    }
}

// Fetch and display image from Pexels API
fetch(`https://api.pexels.com/v1/search?query=nature&orientation=vertical&size=medium&per_page=1&apikey=${PEXELS_API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const image = document.createElement("img");
        image.src = data.photos[0].src.large;
        image.alt = data.photos[0].alt;
        document.querySelector("main img").replaceWith(image);
    })
    .catch(error => console.error(error));