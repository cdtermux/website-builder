const testimonials = [
    {
        name: "John Doe",
        feedback: "Imtiyaz is an exceptional web developer. Highly recommended!",
        image: "https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg"
    },
    {
        name: "Jane Smith",
        feedback: "Great experience working with Imtiyaz. Very professional!",
        image: "https://images.pexels.com/photos/1234568/pexels-photo-1234568.jpeg"
    },
    {
        name: "Alice Johnson",
        feedback: "Imtiyaz delivered beyond my expectations. Fantastic work!",
        image: "https://images.pexels.com/photos/1234569/pexels-photo-1234569.jpeg"
    }
];

let currentIndex = 0;

function displayTestimonials() {
    const testimonialsContainer = document.getElementById('testimonials');
    for (let i = 0; i < 3; i++) {
        if (currentIndex >= testimonials.length) break;
        const testimonial = testimonials[currentIndex];
        const testimonialDiv = document.createElement('div');
        testimonialDiv.className = "bg-gray-800 p-5 rounded-lg shadow-lg";
        testimonialDiv.innerHTML = `
            <img src="${testimonial.image}" alt="${testimonial.name}" class="w-full h-32 object-cover rounded-t-lg">
            <h2 class="text-xl font-semibold mt-2">${testimonial.name}</h2>
            <p class="mt-1">${testimonial.feedback}</p>
        `;
        testimonialsContainer.appendChild(testimonialDiv);
        currentIndex++;
    }
}

document.getElementById('loadMore').addEventListener('click', displayTestimonials);

// Initial load
displayTestimonials();