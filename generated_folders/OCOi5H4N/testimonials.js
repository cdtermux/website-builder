const testimonialsContainer = document.getElementById('testimonials');
const loadMoreButton = document.getElementById('loadMore');
let currentPage = 1;
const testimonialsPerPage = 3;

const fetchTestimonials = async () => {
    const response = await fetch(`https://api.pexels.com/v1/search?query=people&per_page=${testimonialsPerPage}&page=${currentPage}`, {
        headers: {
            Authorization: process.env.PEXELS_API_KEY // Use your API key here
        }
    });
    const data = await response.json();
    return data.photos;
};

const displayTestimonials = async () => {
    const testimonials = await fetchTestimonials();
    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card p-5';
        card.innerHTML = `
            <img src="${testimonial.src.medium}" alt="Testimonial Image" class="rounded mb-3">
            <p>"This is a dummy testimonial content. Great service!"</p>
            <p class="mt-2 font-bold">- Client Name</p>
        `;
        testimonialsContainer.appendChild(card);
    });
};

loadMoreButton.addEventListener('click', () => {
    currentPage++;
    displayTestimonials();
});

// Initial load
displayTestimonials();