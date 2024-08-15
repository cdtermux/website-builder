const courses = [
    { title: "Computer Science", image: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg" },
    { title: "Business Administration", image: "https://images.pexels.com/photos/3184290/pexels-photo-3184290.jpeg" },
    { title: "Graphic Design", image: "https://images.pexels.com/photos/3184290/pexels-photo-3184290.jpeg" },
    { title: "Mechanical Engineering", image: "https://images.pexels.com/photos/3184290/pexels-photo-3184290.jpeg" },
];

function displayCourses() {
    const coursesContainer = document.getElementById('courses');
    coursesContainer.innerHTML = ''; // Clear existing content
    courses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'bg-gray-100 rounded-lg p-4 shadow-md';
        courseDiv.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="rounded-lg mb-2">
            <h3 class="text-xl font-semibold">${course.title}</h3>
        `;
        coursesContainer.appendChild(courseDiv);
    });
}

document.getElementById('saveButton').addEventListener('click', () => {
    localStorage.setItem('courses', JSON.stringify(courses));
    alert('Data saved to localStorage!');
});

document.getElementById('loadButton').addEventListener('click', () => {
    const savedCourses = JSON.parse(localStorage.getItem('courses'));
    if (savedCourses) {
        alert('Data loaded from localStorage!');
        console.log(savedCourses);
    } else {
        alert('No data found in localStorage.');
    }
});

document.getElementById('clearButton').addEventListener('click', () => {
    localStorage.removeItem('courses');
    alert('Data cleared from localStorage!');
});

// Initial display of courses
displayCourses();