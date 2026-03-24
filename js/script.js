document.addEventListener('DOMContentLoaded', () => {
    /* ====================================================
       THEME TOGGLE
       ==================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved user preference, if any, on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'light') {
            document.body.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
            if (window.vantaEffect) window.vantaEffect.setOptions({ color: 0x00f0ff, backgroundColor: 0x050a15 });
        } else {
            document.body.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
            if (window.vantaEffect) window.vantaEffect.setOptions({ color: 0x2563eb, backgroundColor: 0xf8fafc });
        }
    });

    /* ====================================================
       NAVBAR SCROLL EFFECT
       ==================================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ====================================================
       TYPING ANIMATION
       ==================================================== */
    const textRoles = [
        "Cyber Security Enthusiast", 
        ".NET Learner"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = textRoles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // normal typing speed
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % textRoles.length;
            typingSpeed = 500; // pause before next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start the typing animation
    setTimeout(typeEffect, 1000);

    /* ====================================================
       SCROLL ANIMATIONS (Intersection Observer)
       ==================================================== */
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    /* ====================================================
       3D TILT ANIMATIONS (vanilla-tilt.js)
       ==================================================== */
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card, .skill-category, .cert-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
        });
        VanillaTilt.init(document.querySelector(".image-wrapper"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    /* ====================================================
       3D BACKGROUND (vanta.js)
       ==================================================== */
    if (typeof VANTA !== 'undefined') {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        window.vantaEffect = VANTA.NET({
            el: "#home",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: isLight ? 0x2563eb : 0x00f0ff,
            backgroundColor: isLight ? 0xf8fafc : 0x050a15,
            points: 12.00,
            maxDistance: 20.00,
            spacing: 18.00
        });
    }
});
