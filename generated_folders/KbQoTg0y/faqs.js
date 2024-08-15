const q1Btn = document.getElementById('q1-btn');
const q1Answer = document.getElementById('q1-answer');
const q2Btn = document.getElementById('q2-btn');
const q2Answer = document.getElementById('q2-answer');
const q3Btn = document.getElementById('q3-btn');
const q3Answer = document.getElementById('q3-answer');

q1Btn.addEventListener('click', () => {
    q1Answer.classList.toggle('hidden');
});

q2Btn.addEventListener('click', () => {
    q2Answer.classList.toggle('hidden');
});

q3Btn.addEventListener('click', () => {
    q3Answer.classList.toggle('hidden');
});