document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulating a login process and storing data in localStorage
    localStorage.setItem('userEmail', email);
    alert('Login successful! Welcome back, ' + email);
});

document.getElementById('register-btn').addEventListener('click', function() {
    alert('Redirecting to registration page...');
    // Here you would typically redirect to the registration page
});