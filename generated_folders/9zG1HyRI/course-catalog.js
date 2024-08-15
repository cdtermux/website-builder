const courseList = document.getElementById('course-list');
const loadMoreButton = document.getElementById('load-more');
let currentPage = 1;
const coursesPerPage = 6;

async function fetchCourses() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=college&per_page=${coursesPerPage}&page=${currentPage}`, {
        headers: {
            Authorization: process.env.PEXELS_API_KEY // This should be handled server-side
        }
    });
    const data = await response.json();
    return data.photos;
}

function displayCourses(courses) {
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'card p-5';
        courseCard.innerHTML = `
            <img src="${course.src.medium}" alt="${course.alt}" class="w-full h-48 object-cover rounded">
            <h2 class="text-xl font-bold mt-2">${course.alt}</h2>
            <p class="mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button class="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="saveCourse('${course.alt}')">Save Course</button>
        `;
        courseList.appendChild(courseCard);
    });
}

function saveCourse(courseName) {
    let savedCourses = JSON.parse(localStorage.getItem('savedCourses')) || [];
    if (!savedCourses.includes(courseName)) {
        savedCourses.push(courseName);
        localStorage.setItem('savedCourses', JSON.stringify(savedCourses));
        alert(`${courseName} has been saved!`);
    } else {
        alert(`${courseName} is already saved.`);
    }
}

loadMoreButton.addEventListener('click', async () => {
    currentPage++;
    const courses = await fetchCourses();
    displayCourses(courses);
});

// Initial load
(async () => {
    const courses = await fetchCourses();
    displayCourses(courses);
})();