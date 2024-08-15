// Dummy FAQ data
const faqs = [
    {
        question: "What is your experience?",
        answer: "I have over 5 years of experience in web development."
    },
    {
        question: "What technologies do you use?",
        answer: "I primarily use JavaScript, React, and Node.js."
    },
    {
        question: "How can I contact you?",
        answer: "You can reach me via email at yourname@example.com."
    }
];

// Function to display FAQs
function displayFAQs() {
    const faqList = document.getElementById('faq-list');
    faqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.className = "bg-white text-black p-4 rounded shadow";
        faqItem.innerHTML = `
            <h2 class="font-semibold">${faq.question}</h2>
            <p>${faq.answer}</p>
        `;
        faqList.appendChild(faqItem);
    });
}

// Function to fetch images from Pexels API
async function fetchImages() {
    const API_KEY = process.env.PIXEL_API_KEY; // Use environment variable
    const response = await fetch(`https://api.pexels.com/v1/search?query=nature`, {
        headers: {
            Authorization: API_KEY
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

// Function to display images
function displayImages(photos) {
    const imageGallery = document.getElementById('image-gallery');
    imageGallery.innerHTML = ''; // Clear previous images
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.src.small;
        img.alt = photo.alt;
        img.className = "rounded shadow-lg";
        imageGallery.appendChild(img);
    });
}

// Event listeners
document.getElementById('fetch-images').addEventListener('click', fetchImages);

// Initialize the FAQ section
displayFAQs();