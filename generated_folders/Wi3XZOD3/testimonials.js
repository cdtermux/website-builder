const testimonials = [
    {
        name: "John Doe",
        feedback: "Imtiyaz is an exceptional web developer. Highly recommended!",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Jane Smith",
        feedback: "Great experience working with Imtiyaz. Very professional!",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Alice Johnson",
        feedback: "Imtiyaz delivered beyond my expectations. Fantastic work!",
        image: "https://via.placeholder.com/150"
    }
];

let currentIndex = 0;

function displayTestimonials() {
    const testimonialsContainer = document.getElementById('testimonials');
    for (let i = 0; i < 3; i++) {
        if (currentIndex >= testimonials.length) break;
        const testimonial = testimonials[currentIndex];
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card p-5 rounded-lg shadow-lg';
        testimonialCard.innerHTML = `
            <img src="${testimonial.image}" alt="${testimonial.name}" class="rounded-full w-24 h-24 mb-4">
            <h2 class="font-bold">${testimonial.name}</h2>
            <p>${testimonial.feedback}</p>
        `;
        testimonialsContainer.appendChild(testimonialCard);
        currentIndex++;
    }
}

document.getElementById('loadMore').addEventListener('click', displayTestimonials);

// Initial load
displayTestimonials();