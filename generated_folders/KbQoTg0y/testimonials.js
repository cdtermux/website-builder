// get the testimonials container and load more button
const testimonialsContainer = document.getElementById('testimonials');
const loadMoreButton = document.getElementById('load-more');

// initialize the testimonials array
let testimonials = [];

// fetch testimonials from Pexels API
fetch('https://api.pexels.com/v1/search?query=cake&orientation=horizontal&size=medium', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${process.env.PIXEL_API_KEY}`
  }
})
.then(response => response.json())
.then(data => {
  testimonials = data.photos;
  renderTestimonials();
  loadMoreButton.addEventListener('click', loadMore);
});

// render testimonials
function renderTestimonials() {
  testimonialsContainer.innerHTML = '';
  testimonials.forEach((testimonial, index) => {
    const testimonialHTML = `
      <div class="testimonial w-full md:w-1/2 xl:w-1/3 p-4">
        <img src="${testimonial.src}" alt="${testimonial.alt}">
        <h3>${testimonial.description}</h3>
        <p>${testimonial.copyright}</p>
      </div>
    `;
    testimonialsContainer.innerHTML += testimonialHTML;
  });
}

// load more testimonials
function loadMore() {
  const nextPage = testimonials.length + 10;
  fetch(`https://api.pexels.com/v1/search?query=cake&orientation=horizontal&size=medium&page=${nextPage}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.PIXEL_API_KEY}`
    }
  })
  .then(response => response.json())
  .then(data => {
    testimonials = [...testimonials, ...data.photos];
    renderTestimonials();
  });
}