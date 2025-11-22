document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Hamburger Menu Functionality --- */
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburgerMenu && navMenu) {
        // Toggle menu on hamburger click
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('open');
            navMenu.classList.toggle('open');
            hamburgerMenu.setAttribute('aria-expanded', hamburgerMenu.classList.contains('open'));
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('open');
                navMenu.classList.remove('open');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.main-nav')) {
                hamburgerMenu.classList.remove('open');
                navMenu.classList.remove('open');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on window resize if screen becomes larger
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                hamburgerMenu.classList.remove('open');
                navMenu.classList.remove('open');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* --- 2. Défilement fluide (Smooth Scrolling) --- */
    document.querySelectorAll('a[href^="#"], a[href^="./#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const targetId = href.startsWith('./#') ? href.substring(3) : href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                // Calcule la hauteur du header de manière dynamique pour s'adapter au responsive
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Décalage pour laisser un peu d'espace

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    /* --- 3. Barre de navigation adaptative (Shrink/Change on Scroll) --- */
    // La barre de navigation s'adapte en fonction du défilement de l'utilisateur
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Déclenche le rétrécissement après 50px de défilement
            mainNav.classList.add('scrolled');
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            mainNav.classList.remove('scrolled');
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        }
    });


    /* --- 4. Bouton "Retour en haut" (Scroll-to-Top) --- */
    // Le bouton apparaît et disparaît de manière fluide
    const scrollToTopButton = document.getElementById('scroll-to-top');

    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            // Apparaît si le défilement est supérieur à la moitié de la hauteur de la fenêtre
            if (window.scrollY > window.innerHeight / 2) {
                scrollToTopButton.classList.add('show');
            } else {
                scrollToTopButton.classList.remove('show');
            }
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* --- 5. Animations d'apparition au défilement (Fade-in on Scroll) --- */
    // Gère l'animation des sections lors du défilement pour un rendu plus dynamique
    const animatedSections = document.querySelectorAll('main section:not(.hero-section)');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        section.classList.add('animated-section');
        sectionObserver.observe(section);
    });

});
