// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if(document.querySelector(targetId)) {
            document.querySelector(targetId).scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    });
});

// Add active class to current page link
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('nav a').forEach(link => {
    if(link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Slider functionality
const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;
const totalSlides = 3;
let slideInterval;

function goToSlide(n) {
    currentSlide = (n + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 33.333}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

// Add click events to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        resetInterval();
    });
});

// Auto slide every 6 seconds
function startInterval() {
    slideInterval = setInterval(nextSlide, 6000);
}

function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

// Start auto sliding
startInterval();

// Pause on hover
document.querySelector('.slider').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

document.querySelector('.slider').addEventListener('mouseleave', () => {
    startInterval();
});

// Add fade-in animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.feature-card, .testimonial-card').forEach(card => {
    observer.observe(card);
});

// Image preloading and error handling
function preloadImages() {
    const imageUrls = ['printer.jpg', 'laptop.jpg', 'keyboard.jpg'];
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onload = function() {
            console.log('Image loaded successfully:', url);
            // Show success message
            const imageElements = document.querySelectorAll(`img[src="${url}"]`);
            imageElements.forEach(imgEl => {
                imgEl.style.opacity = '1';
                imgEl.style.transition = 'opacity 0.5s ease';
            });
        };
        img.onerror = function() {
            console.warn('Failed to load image:', url);
            // The onerror attribute in HTML will handle the fallback
        };
    });
}

// Start preloading images when page loads
window.addEventListener('load', preloadImages);

// Optimize image display - show all three slides properly
document.querySelectorAll('.slides img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    
    // Check if image is already loaded
    if(img.complete && img.naturalHeight !== 0) {
        img.style.opacity = '1';
    } else {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    }
});

// Debug: Check slider structure
console.log('Slider slides count:', document.querySelectorAll('.slides img').length);
console.log('Slider width:', slides.offsetWidth);
console.log('Individual slide width:', slides.offsetWidth / 3);