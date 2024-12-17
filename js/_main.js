document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const countryCodeInput = document.getElementById('countryCode');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');

    // Error message elements
    const firstNameError = document.getElementById('firstnameError');
    const lastNameError = document.getElementById('lastnameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');

    const carousel = document.querySelector('.shop-carousel');
    const carouselContainer = document.querySelector('.carousel-container');
    
    // Optional: Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'paused';
    });
    
    carousel.addEventListener('mouseleave', () => {
        carousel.style.animationPlayState = 'running';
    });

    // Sanitize user input
    const sanitizeInput = (input) => {
        const sanitized = input
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/[\r\n]/g, " ");
        return sanitized.trim();
    };

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });

    // Input validation logic
    const validateName = (name) => /^[A-Za-z]{3,}$/.test(name);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phoneNumber) => /^\(\d{3}\) \d{3}-\d{4}$/.test(phoneNumber);

    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/\D/g, ''); // Remove non-digit characters
        if (cleaned.length > 10) return value; // Prevent invalid long input
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
        if (!match) return value;

        let formatted = '';
        if (match[1]) formatted = `(${match[1]}`;
        if (match[2]) formatted += `) ${match[2]}`;
        if (match[3]) formatted += `-${match[3]}`;

        return formatted;
    };

    phoneInput.addEventListener('input', () => {
        const formattedValue = formatPhoneNumber(phoneInput.value);
        phoneInput.value = formattedValue;

        // Prevent repetitive digits like "1111111111"
        const repetitivePattern = /^(\d)\1{9}$/;
        if (repetitivePattern.test(formattedValue.replace(/\D/g, ''))) {
            phoneError.textContent = 'Phone number cannot have repetitive digits';
            phoneInput.classList.add('invalid');
        } else {
            phoneError.textContent = '';
            phoneInput.classList.remove('invalid');
        }

        validateForm(); // Trigger form validation
    });

    const validateField = (input, validator, errorElement, errorMessage) => {
        const value = input.value.trim();
        const isValid = validator(value);

        if (!isValid) {
            errorElement.textContent = errorMessage;
            input.classList.add('invalid');
        } else {
            errorElement.textContent = '';
            input.classList.remove('invalid');
        }

        return isValid;
    };

    const validateForm = () => {
        const isFirstNameValid = validateField(
            firstNameInput,
            validateName,
            firstNameError,
            'First name must be at least 3 letters long'
        );

        const isLastNameValid = validateField(
            lastNameInput,
            validateName,
            lastNameError,
            'Last name must be at least 3 letters long'
        );
    // Error message elements
        const isEmailValid = validateField(
            emailInput,
            validateEmail,
            emailError,
            'Please enter a valid email address'
        );

        const isPhoneValid = validateField(
            phoneInput,
            validatePhone,
            phoneError,
            'Phone number must be in (XXX) XXX-XXXX format'
        );

        const isMessageValid = messageInput.value.trim().length > 0;
        messageError.textContent = isMessageValid ? '' : 'Message cannot be empty';

        submitBtn.disabled = !(isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid && isMessageValid);
    };

    document.querySelectorAll('h1, h2').forEach(glitchEffect);

    // Add real-time validation listeners
    [firstNameInput, lastNameInput, emailInput, messageInput, countryCodeInput].forEach(input => {
        input.addEventListener('input', validateForm);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            firstname: sanitizeInput(firstNameInput.value),
            lastname: sanitizeInput(lastNameInput.value),
            email: sanitizeInput(emailInput.value),
            phone: sanitizeInput(phoneInput.value),
            message: sanitizeInput(messageInput.value),
        };

        try {
            const response = await fetch('https://degenvets-contact.workers.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
                submitBtn.disabled = true;
            } else {
                const errorText = await response.text();
                alert(`Failed to send message: ${errorText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was a problem sending your message. Please try again later.');
        }
    });


    validateForm();

import('./config.js').then((config) => {
    const API_KEY = config.API_KEY;

    console.log("API Key:", API_KEY);


    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`, 
        },
        body: JSON.stringify({
            model: 'gpt-4', 
            messages: [{ role: 'user', content: 'Hello!' }], 
        }),
    })
        .then((response) => response.json())
        .then((data) => console.log("Response 1:", data))
        .catch((error) => console.error('Error in Request 1:', error));


    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`, 
        },
        body: JSON.stringify({
            model: 'gpt-4', 
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' }, 
                { role: 'user', content: 'Tell me a joke!' } 
            ],
            max_tokens: 50, 
        }),
    })
        .then((response) => response.json())
        .then((data) => console.log("Response 2:", data))
        .catch((error) => console.error('Error in Request 2:', error));
}).catch((error) => console.error('Error loading config:', error));

function closeTab() {
    window.open('', '_self').close();
}

});
document.querySelectorAll('.share-dots').forEach(dot => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const link = e.target.closest('.button').getAttribute('href');
        shareLink(link, e.target);
    });
});

function shareLink(link, target) {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this link',
            url: link
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch(error => {
            console.error('Error sharing:', error);
            fallbackShare(link, target);
        });
    } else {
        fallbackShare(link, target);
    }
}

function fallbackShare(link, target) {
    navigator.clipboard.writeText(link).then(() => {
        alert('Link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });

    showShareMenu(link, target);
}

function showShareMenu(link, target) {
    const existingMenu = document.querySelector('.share-menu');
    if (existingMenu) {
        existingMenu.remove();
    }

    const menu = document.createElement('div');
    menu.className = 'share-menu';
    menu.innerHTML = `
        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}" target="_blank">Share on Twitter</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}" target="_blank">Share on Facebook</a>
        <a href="https://www.linkedin.com/shareArticle?url=${encodeURIComponent(link)}" target="_blank">Share on LinkedIn</a>
    `;

    const rect = target.getBoundingClientRect();
    menu.style.position = 'absolute';
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;

    document.body.appendChild(menu);
    document.addEventListener('click', closeShareMenu);
}

function closeShareMenu(e) {
    const menu = document.querySelector('.share-menu');
    if (menu && !menu.contains(e.target) && !e.target.classList.contains('share-dots')) {
        menu.remove();
        document.removeEventListener('click', closeShareMenu);
    }
}