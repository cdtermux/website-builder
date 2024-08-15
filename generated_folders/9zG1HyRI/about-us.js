const pixelApiKey = 'YOUR_PEXELS_API_KEY'; // Put your Pexels API Key here

document.getElementById('saveMission').addEventListener('click', () => {
    const mission = "Our mission is to empower students through knowledge and promote lifelong learning.";
    localStorage.setItem('collegeMission', mission);
    alert('Mission saved!');
});

document.getElementById('loadMission').addEventListener('click', () => {
    const mission = localStorage.getItem('collegeMission');
    document.getElementById('missionOutput').innerText = mission || "No mission found.";
});

document.getElementById('getImages').addEventListener('click', async () => {
    const response = await fetch(`https://api.pexels.com/v1/search?query=college&per_page=6`, {
        headers: {
            Authorization: pixelApiKey
        }
    });
    const data = await response.json();
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = ""; // clear previous images
    data.photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.src.medium;
        img.alt = photo.alt;
        img.classList.add('w-full', 'h-auto', 'rounded-lg');
        gallery.appendChild(img);
    });
});