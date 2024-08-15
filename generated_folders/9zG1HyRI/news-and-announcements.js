function loadAnnouncements() {
    const container = document.getElementById('announcement-container');
    container.innerHTML = ''; // Clear previous announcements

    const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    announcements.forEach((announcement, index) => {
        const announcementDiv = document.createElement('div');
        announcementDiv.classList.add('bg-white', 'text-blue-600', 'p-5', 'rounded-lg', 'shadow-lg');
        announcementDiv.innerHTML = `
            <h2 class="text-xl font-bold">${announcement.title}</h2>
            <p>${announcement.content}</p>
            <button onclick="deleteAnnouncement(${index})" class="mt-2 bg-red-600 text-white px-2 py-1 rounded">Delete</button>
        `;
        container.appendChild(announcementDiv);
    });
}

function addAnnouncement() {
    const title = prompt('Enter announcement title:');
    const content = prompt('Enter announcement content:');
    
    if (title && content) {
        const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
        announcements.push({ title, content });
        localStorage.setItem('announcements', JSON.stringify(announcements));
        loadAnnouncements();
    }
}

function deleteAnnouncement(index) {
    const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    announcements.splice(index, 1);
    localStorage.setItem('announcements', JSON.stringify(announcements));
    loadAnnouncements();
}

function clearLocalStorage() {
    localStorage.removeItem('announcements');
    loadAnnouncements();
}