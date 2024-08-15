const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const responseDiv = document.getElementById('response');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        const data = {
            name,
            email,
            message
        };

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                responseDiv.textContent = 'Message sent successfully!';
                responseDiv.style.color = 'green';
            } else {
                responseDiv.textContent = 'Error sending message. Please try again.';
                responseDiv.style.color = 'red';
            }
        })
        .catch((error) => {
            console.error(error);
            responseDiv.textContent = 'Error sending message. Please try again.';
            responseDiv.style.color = 'red';
        });
    } else {
        responseDiv.textContent = 'Please fill out all fields.';
        responseDiv.style.color = 'red';
    }
});