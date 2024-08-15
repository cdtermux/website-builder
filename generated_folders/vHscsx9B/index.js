const apiKey = process.env.PIXEL_API_KEY || 'YOUR_PEXELS_API_KEY'; // Remember to set this key or use a mocked API key for testing

document.getElementById('fetchImages').addEventListener('click', fetchImages);
document.getElementById('saveInfo').addEventListener('click', saveInfo);
document.getElementById('loadInfo').addEventListener('click', loadInfo);

async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=technology&per_page=6`, {
        headers: {
            'Authorization': apiKey
        }
    });
    const data = await response.json();
    const imageGallery = document.getElementById('image-gallery');
    imageGallery.innerHTML = ''; // Clear previous images

    data.photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.src.medium;
        img.alt = photo.alt;
        img.className = 'w-full h-auto rounded-lg';
        imageGallery.appendChild(img);
    });
}

function saveInfo() {
    const info = {
        name: "Imtiyaz",
        skills: ["JavaScript", "HTML & CSS", "React.js", "Node.js", "Tailwind CSS"]
    };
    localStorage.setItem('myInfo', JSON.stringify(info));
    alert('Info saved!');
}

function loadInfo() {
    const info = JSON.parse(localStorage.getItem('myInfo'));
    if (info) {
        alert(`Name: ${info.name}, Skills: ${info.skills.join(', ')}`);
    } else {
        alert('No information found!');
    }
}