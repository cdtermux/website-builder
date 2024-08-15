const testimonials = [
    {
        name: "John Doe",
        feedback: "This service was amazing! Highly recommend.",
        imageUrl: "https://images.pexels.com/photos/1004000/pexels-photo-1004000.jpeg"
    },
    {
        name: "Jane Smith",
        feedback: "I had a great experience. The team was professional and attentive.",
        imageUrl: "https://images.pexels.com/photos/1004010/pexels-photo-1004010.jpeg"
    },
    {
        name: "Mike Johnson",
        feedback: "Fantastic results! Will definitely use again.",
        imageUrl: "https://images.pexels.com/photos/1004020/pexels-photo-1004020.jpeg"
    }
];

let currentIndex = 0;

function loadTestimonials(count) {
    const container = document.getElementById('testimonial-container');
    
    for (let i = 0; i < count && currentIndex < testimonials.length; i++, currentIndex++) {
        const testimonial = testimonials[currentIndex];
        const testimonialCard = document.createElement('div');
        testimonialCard.className = "bg-gray-800 p-4 rounded-lg shadow-lg";
        testimonialCard.innerHTML = `
            <img src="${testimonial.imageUrl}" alt="${testimonial.name}" class="w-full h-32 object-cover rounded-t-lg">
            <h2 class="text-xl font-semibold mt-2">${testimonial.name}</h2>
            <p class="mt-1">${testimonial.feedback}</p>
        `;
        container.appendChild(testimonialCard);
    }
    
    if (currentIndex >= testimonials.length) {
        document.getElementById('loadMore').style.display = 'none';
    }
}

document.getElementById('loadMore').addEventListener('click', () => {
    loadTestimonials(3);
});

// Load initial testimonials
loadTestimonials(3);