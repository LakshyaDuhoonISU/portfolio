// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            document.querySelector(this.getAttribute('href')).scrollTop = 0;
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize EmailJS
    emailjs.init("rrwM6QcpKIkXfAAlK");

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validate email
        if (!isValidEmail(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Validate other fields are not empty
        if (!formData.name || !formData.subject || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS
        emailjs.send("service_y4usi25", "template_kf8gnl6", {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: "lakshyaduhoon723@gmail.com"
        })
            .then(() => {
                // Reset form
                contactForm.reset();
                alert('Thank you for your message! I will get back to you soon.');
            })
            .catch((error) => {
                console.error('Email error:', error);
                alert('Sorry, there was an error sending your message. Please try again later.');
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
    });

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-item, .project-card');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial animation check
    animateOnScroll();

    // Animation on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Add inside the DOMContentLoaded event listener
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}); 