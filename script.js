// Joke Generator using Official Joke API
const jokeBtn = document.getElementById('joke-btn');
const jokeText = document.getElementById('joke-text');
const jokeDisplay = document.getElementById('joke-display');
const jokeLoading = document.getElementById('joke-loading');
const jokeCopyBtn = document.getElementById('joke-copy-btn');

// API URL - Official Joke API
const JOKE_API_URL = 'https://official-joke-api.appspot.com/jokes/programming/random';

// Function to fetch and display a random joke
async function getRandomJoke() {
    // Show loading state
    jokeDisplay.style.display = 'none';
    jokeLoading.style.display = 'block';
    jokeCopyBtn.style.display = 'none';

    try {
        // Fetch joke from API
        const response = await fetch(JOKE_API_URL);
        
        if (!response.ok) {
            throw new Error('فشل في جلب النكتة');
        }

        const joke = await response.json();
        
        // Display the joke
        const jokeContent = `${joke.setup}\n\n${joke.punchline}`;
        jokeText.textContent = jokeContent;
        
        // Store current joke for copy functionality
        jokeText.dataset.currentJoke = jokeContent;
        
        // Hide loading and show joke
        jokeLoading.style.display = 'none';
        jokeDisplay.style.display = 'flex';
        jokeCopyBtn.style.display = 'inline-block';

    } catch (error) {
        jokeLoading.style.display = 'none';
        jokeDisplay.style.display = 'flex';
        jokeText.textContent = `حدث خطأ: ${error.message}. حاول مرة أخرى!`;
        jokeCopyBtn.style.display = 'none';
        console.error('Joke API Error:', error);
    }
}

// Function to copy joke to clipboard
function copyJokeToClipboard() {
    const jokeContent = jokeText.dataset.currentJoke;
    
    navigator.clipboard.writeText(jokeContent).then(() => {
        // Change button text temporarily
        const originalText = jokeCopyBtn.textContent;
        jokeCopyBtn.textContent = '✓ تم النسخ!';
        
        setTimeout(() => {
            jokeCopyBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('فشل النسخ. حاول مرة أخرى!');
    });
}

// Event Listeners
jokeBtn.addEventListener('click', getRandomJoke);
jokeCopyBtn.addEventListener('click', copyJokeToClipboard);

// Load a joke when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Random Joke Generator loaded successfully!');
});

// Contact Form Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('شكراً لتواصلك معنا! سيتم الرد عليك قريباً.');
        contactForm.reset();
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});