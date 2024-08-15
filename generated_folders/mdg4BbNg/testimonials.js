const testimonials = [
    {
        name: "John Doe",
        feedback: "Suhelroadlines provided an excellent service. Highly recommend!",
        image: "https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg"
    },
    {
        name: "Jane Smith",
        feedback: "Fast and reliable transport. I will use them again!",
        image: "https://images.pexels.com/photos/1234568/pexels-photo-1234568.jpeg"
    },
    {
        name: "Michael Brown",
        feedback: "Great experience from start to finish.",
        image: "https://images.pexels.com/photos/1234569/pexels-photo-1234569.jpeg"
    },
    // Add more testimonials as needed
];

let currentIndex = 0;

function displayTestimonials() {
    const testimonialsContainer = document.getElementById('testimonials');
    const itemsToShow = 3;

    for (let i = 0; i < itemsToShow && currentIndex < testimonials.length; i++, currentIndex++) {
        const testimonial = testimonials[currentIndex];
        const testimonialDiv = document.createElement('div');
        testimonialDiv.classList.add('testimonial', 'p-4');
        testimonialDiv.innerHTML = `
            <img src="${testimonial.image}" alt="${testimonial.name}" class="rounded-full w-16 h-16 mb-4">
            <h3 class="font-bold">${testimonial.name}</h3>
            <p>${testimonial.feedback}</p>
        `;
        testimonialsContainer.appendChild(testimonialDiv);
    }

    if (currentIndex >= testimonials.length) {
        document.getElementById('loadMore').style.display = 'none';
    }
}

document.getElementById('loadMore').addEventListener('click', displayTestimonials);

// Initial load
displayTestimonials();