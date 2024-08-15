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
        const testimonialDiv = document.createElement('div');
        testimonialDiv.className = 'bg-white text-black p-5 rounded-lg shadow-lg';
        testimonialDiv.innerHTML = `
            <img src="${testimonial.src.medium}" alt="Testimonial Image" class="rounded-lg mb-3">
            <p>"This is a dummy testimonial content. Replace it with real testimonials!"</p>
            <p class="mt-2 font-bold">- ${testimonial.photographer}</p>
        `;
        testimonialsContainer.appendChild(testimonialDiv);
    });
    currentPage++;
};

loadMoreButton.addEventListener('click', displayTestimonials);

// Initial load
displayTestimonials();