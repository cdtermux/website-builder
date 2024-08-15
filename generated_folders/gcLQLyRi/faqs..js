// Load the Pexels API key from the .env file
const API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace this with your own method to load the API key

document.addEventListener('DOMContentLoaded', () => {
    // Example FAQs
    const faqs = [
        {
            question: "What services do you offer?",
            answer: "We offer a variety of software solutions, including web development, mobile app development, and cloud services."
        },
        {
            question: "How do I contact customer support?",
            answer: "You can reach us through our contact page or send us an email at support@exclamatorylabs.com."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept major credit cards, PayPal, and bank transfers."
        }
    ];

    // Display FAQs
    const faqContainer = document.getElementById('faq-content');
    faqs.forEach(faq => {
        const faqElement = document.createElement('div');
        faqElement.className = 'bg-gray-800 p-4 rounded shadow-md';
        faqElement.innerHTML = `<h3 class="font-semibold">${faq.question}</h3><p>${faq.answer}</p>`;
        faqContainer.appendChild(faqElement);
    });

    // Load an Image from Pexels
    document.getElementById('loadImage').onclick = async () => {
        const response = await fetch(`https://api.pexels.com/v1/search?query=software&per_page=1`, {
            headers: {
                Authorization: API_KEY,
            },
        });
        const data = await response.json();
        const imgUrl = data.photos[0].src.original;

        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = `<img src="${imgUrl}" alt="Software" class="rounded shadow-lg mt-4">`;
        
        localStorage.setItem('lastImage', imgUrl);
    };
});