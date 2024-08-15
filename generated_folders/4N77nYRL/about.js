// script.js

// Function to fetch an image from Pexels API
async function fetchImage() {
  const apiKey = process.env.PEXELS_API_KEY; // Assuming PEXELS_API_KEY is in your .env file
  const imageUrl = `https://api.pexels.com/v1/photos?per_page=1&page=1&phrase=technology`; // Adjust parameters as needed
  const response = await fetch(imageUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const data = await response.json();
  const image = data.photos[0].src.original;
  document.querySelector('img').src = image;
}

// Function to handle button clicks
function handleButtonClick(event) {
  const button = event.target;
  if (button.classList.contains('learn-more')) {
    // Add functionality for the Learn More button
  } else if (button.classList.contains('get-started')) {
    // Add functionality for the Get Started button
  }
}

// Event listener for button clicks
document.querySelectorAll('button').forEach(button => button.addEventListener('click', handleButtonClick));

// Call the fetchImage function
fetchImage();