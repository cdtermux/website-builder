const form = document.getElementById('form');
const submitBtn = document.getElementById('submit-btn');
const responseDiv = document.getElementById('response');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        const data = {
            name,
            email,
            message,
        };

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                responseDiv.innerHTML = `Thank you, ${name}! We will get back to you soon.`;
            })
            .catch((error) => {
                responseDiv.innerHTML = `Error: ${error.message}`;
            });
    } else {
        responseDiv.innerHTML = 'Please fill out all fields.';
    }
});

const images = [];
fetch('https://api.pexels.com/v1/search?query=Wedding&orientation=landscape&size=medium&per_page=6', {
    headers: {
        Authorization: 'Bearer YOUR_PIXEL_API_KEY',
    },
})
    .then((response) => response.json())
    .then((data) => {
        images.length = 0;
        data.photos.forEach((image) => {
            images.push(image.src);
        });
        const imagesHTML = images.map((image) => `<li><img src="${image}" alt="Wedding Inspiration" class="w-full h-48 object-cover rounded"></li>`).join('');
        document.getElementById('images').innerHTML = imagesHTML;
    })
    .catch((error) => {
        console.error(error);
    });

localStorage.setItem('images', JSON.stringify(images));// Fetch and display images from Pexels API
fetch('https://api.pexels.com/v1/search?query=wedding&orientation=landscape&size=large&api_key=' + localStorage.getItem('PIXEL_API_KEY'))
  .then(response => response.json())
  .then(response => {
    const imageGallery = document.querySelector('.image-gallery');
    response.photos.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.src.large;
      img.alt = photo.alt;
      img.classList.add('w-48', 'h-36', 'object-cover');
      imageGallery.appendChild(img);
    });
  });

// Set package in local storage when button is clicked
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    localStorage.setItem('package', button.textContent.toLowerCase());
  });
});const testimonials = [];

fetch('https://api.pexels.com/v1/search?query=wedding&orientation=horizontal&size=medium&per_page=3', {
  headers: {
    'Authorization': `Bearer ${process.env.PIXEL_API_KEY}`
  }
})
.then(response => response.json())
.then(data => {
  data.photos.forEach((photo, index) => {
    const testimonial = document.getElementById(`testimonial-${index + 1}`);
    testimonial.querySelector('img').src = photo.src.medium;
  });
});

function saveTestimonial(id, content, author) {
  const testimonial = {
    id,
    content,
    author
  };
  if (localStorage.getItem('testimonials')) {
    const storedTestimonials = JSON.parse(localStorage.getItem('testimonials'));
    storedTestimonials.push(testimonial);
    localStorage.setItem('testimonials', JSON.stringify(storedTestimonials));
  } else {
    testimonials.push(testimonial);
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }
  alert(`Testimonial saved successfully!`);
}document.getElementById('book-now-button').addEventListener('click', function() {
    localStorage.setItem('booking', 'pending');
    alert('Your booking has been saved!');
});

// Example for form validation
function validateForm() {
    var form = document.getElementById('booking-form');
    var name = form.elements['name'].value;
    var email = form.elements['email'].value;
    
    if (name.trim() === '' || email.trim() === '') {
        alert('Please fill in all fields.');
        return false;
    }
    
    localStorage.setItem('booking-details', JSON.stringify({ name: name, email: email }));
    alert('Your booking details have been saved!');
    return true;
}

// Example for fetching images from Pexels API
function fetchPexelsImages() {
    var apiKey = process.env.PEXELS_API_KEY; // Assuming you have a `.env` file with `PEXELS_API_KEY`
    var query = encodeURIComponent('wedding'); // Example query
    var apiUrl = `https://api.pexels.com/v1/search?query=${query}&page=1&per_page=10&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var images = data.photos;
            var imageList = '';
            images.forEach(function(image) {
                imageList += `<img src="${image.src.original}" alt="${image.photographer}">`;
            });
            document.getElementById('image-container').innerHTML = imageList;
        })
        .catch(function(error) {
            console.error('Error fetching images:', error);
        });
}// Replace with your Pexels API key
const pixelApiKey = process.env.PIXEL_API_KEY; // Make sure this works in your environment.
const portfolioElement = document.getElementById('portfolio');
let page = 1;

// Function to fetch images from Pexels API
async function fetchImages(page) {
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=9&page=${page}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: pixelApiKey,
        }
    });
    const data = await response.json();
    
    data.photos.forEach(photo => {
        const imgDiv = document.createElement('div');
        imgDiv.className = "rounded overflow-hidden shadow-lg";
        imgDiv.innerHTML = `<img class="w-full" src="${photo.src.medium}" alt="${photo.alt}">`;
        portfolioElement.appendChild(imgDiv);
    });

    // Update localStorage
    localStorage.setItem('lastFetchedPage', page);
}

// Event listener for loading more images
document.getElementById('loadMoreBtn').addEventListener('click', () => {
    page++;
    fetchImages(page);
});

// On Page Load
document.addEventListener('DOMContentLoaded', () => {
    const lastFetchedPage = localStorage.getItem('lastFetchedPage');
    if (lastFetchedPage) {
        page = parseInt(lastFetchedPage);
    }
    fetchImages(page);
});const buttonDisplayImages = document.getElementById('displayImages');
const imageContainer = document.getElementById('imageContainer');

// Mock function to simulate the Pexels API call
async function fetchImages() {
    const images = [
        'https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg', 
        'https://images.pexels.com/photos/67890/pexels-photo-67890.jpeg',
        'https://images.pexels.com/photos/11223/pexels-photo-11223.jpeg'
    ];

    images.forEach(url => {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.alt = 'Wedding Image';
        imgElement.classList.add('w-full', 'rounded-lg');
        imageContainer.appendChild(imgElement);
    });
}

// Button click handler to fetch and display images
buttonDisplayImages.onclick = async () => {
    fetchImages();
    localStorage.setItem('galleryDisplayed', 'true');
};

// Contact Us button action
const contactUsButton = document.getElementById('contactUs');
contactUsButton.onclick = () => {
    alert('Contact us for more information!');
};

// Check localStorage for previously displayed images
if (localStorage.getItem('galleryDisplayed')) {
    fetchImages();
}// script.js

document.querySelector('.accept').addEventListener('click', function() {
    alert('Privacy Policy Accepted!');
});const postsContainer = document.getElementById('posts-container');
const loadMoreButton = document.getElementById('load-more');
let currentPage = 1;
let totalPages = 5; // adjust this to the total number of pages

// fetch and render posts
function fetchPosts() {
    fetch(`https://api.pexels.com/v1/search/?query=wedding&orientation=horizontal&per_page=10&page=${currentPage}`, {
        headers: {
            'Authorization': `Bearer ${process.env.PIXEL_API_KEY}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        const posts = data.photos.map(post => {
            return `
                <div class="bg-white rounded shadow-md p-4 mb-4">
                    <img src="${post.src.medium}" alt="${post.photographer}" class="w-full h-48 object-cover">
                    <h3 class="text-2xl font-bold">${post.photographer}</h3>
                    <p class="text-lg">${post.description}</p>
                </div>
            `;
        });
        postsContainer.innerHTML += posts.join('');
        currentPage++;
    })
    .catch(error => console.error(error));
}

// load more posts on button click
loadMoreButton.addEventListener('click', () => {
    if (currentPage <= totalPages) {
        fetchPosts();
    } else {
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = 'No more posts to load';
    }
});

// initialize posts
fetchPosts();// script.js

document.addEventListener('DOMContentLoaded', function() {
    const planningButton = document.querySelector('.planning-button');
    const designButton = document.querySelector('.design-button');
    const venueButton = document.querySelector('.venue-button');

    planningButton.addEventListener('click', function() {
        localStorage.setItem('serviceSelected', 'planning');
        alert('Planning service selected!');
    });

    designButton.addEventListener('click', function() {
        localStorage.setItem('serviceSelected', 'design');
        alert('Design service selected!');
    });

    venueButton.addEventListener('click', function() {
        localStorage.setItem('serviceSelected', 'venue');
        alert('Venue service selected!');
    });
});const faqs = [
    {
        question: "What services do you provide?",
        answer: "We offer a full range of wedding planning services, including venue selection, vendor coordination, and day-of coordination."
    },
    {
        question: "How do I book your services?",
        answer: "You can contact us through our website or give us a call to discuss your wedding plans."
    },
    {
        question: "What is your pricing model?",
        answer: "Our pricing varies based on the services you need. We offer packages to accommodate different budgets."
    },
    // Add more FAQs as needed
];

let currentIndex = 0;

// Function to load FAQs
function loadFAQs() {
    const faqList = document.getElementById('faq-list');
    for (let i = currentIndex; i < currentIndex + 2 && i < faqs.length; i++) {
        const faqItem = document.createElement('div');
        faqItem.classList.add('bg-gray-700', 'p-4', 'rounded', 'mb-4');
        faqItem.innerHTML = `<strong>${faqs[i].question}</strong><p>${faqs[i].answer}</p>`;
        faqList.appendChild(faqItem);
    }
    currentIndex += 2;
    if (currentIndex >= faqs.length) {
        document.getElementById('load-more').style.display = 'none'; // Hide button if no more FAQs
    }
}

// Fetch images from Pexels
async function fetchImages() {
    const API_KEY = "your_pexels_api_key"; // Replace with your actual Pexels API Key
    const response = await fetch(`https://api.pexels.com/v1/search?query=wedding&per_page=6`, {
        headers: {
            Authorization: API_KEY
        }
    });
    const data = await response.json();
    const imageGallery = document.getElementById('image-gallery');
    data.photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = "Wedding inspiration";
        imgElement.classList.add('w-full', 'rounded');
        imageGallery.appendChild(imgElement);
    });
}

// On Load
window.onload = () => {
    loadFAQs();
    fetchImages();
    
    document.getElementById('load-more').addEventListener('click', loadFAQs);
};