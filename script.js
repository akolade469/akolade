document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        // Smooth animation for outline
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect on links
    const links = document.querySelectorAll('a, button, .portfolio-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            outline.style.width = '60px';
            outline.style.height = '60px';
            outline.style.backgroundColor = 'rgba(255, 140, 0, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            outline.style.width = '40px';
            outline.style.height = '40px';
            outline.style.backgroundColor = 'transparent';
        });
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.hero h1, .hero-description, .stat, .section-title, .portfolio-item, .about-grid');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Add revealed class styles dynamically (or could be in CSS)
    document.body.insertAdjacentHTML('beforeend', `
        <style>
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);

    // Nav Background on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksLi = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('nav-active');

        // Animate Links
        navLinksLi.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    navLinksLi.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinksLi.forEach(l => l.style.animation = '');
        });
    });

    // Add styles for mobile menu
    document.body.insertAdjacentHTML('beforeend', `
        <style>
            @media (max-width: 768px) {
                .nav-links {
                    position: fixed;
                    right: 0px;
                    height: 100vh;
                    top: 0;
                    background-color: var(--clr-bg-alt);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    transform: translateX(100%);
                    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
                    z-index: 998;
                }
                .nav-active {
                    transform: translateX(0%);
                }
                .burger {
                    display: block !important;
                    cursor: pointer;
                    z-index: 1001;
                    position: relative;
                }
                @keyframes navLinkFade {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .toggle .line1 { transform: rotate(-45deg) translate(-5px, 6px); background-color: var(--clr-primary) !important; }
                .toggle .line2 { opacity: 0; }
                .toggle .line3 { transform: rotate(45deg) translate(-5px, -6px); background-color: var(--clr-primary) !important; }
            }
            .burger div {
                width: 25px;
                height: 3px;
                background-color: var(--clr-text);
                margin: 5px;
                transition: all 0.3s ease;
            }
        </style>
    `);
});
