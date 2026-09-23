document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation & Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu') || document.querySelector('nav');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('open');
            hamburgerBtn.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Dropdown toggle on mobile touch/click
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('a');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 900) {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.classList.toggle('open');
                    }
                });
            }
        });

        // Close menu when clicking anywhere outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                navMenu.classList.remove('open');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking regular navigation links
        const navLinks = navMenu.querySelectorAll('a:not(.dropdown > a)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    navMenu.classList.remove('open');
                    hamburgerBtn.classList.remove('active');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Scroll To Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0.7';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // FAQ Accordion (Index Page)
    const faqButtons = document.querySelectorAll('.faq-q');
    if (faqButtons.length > 0) {
        faqButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.parentElement;
                const wasOpen = item.classList.contains('open');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
                if (!wasOpen) item.classList.add('open');
            });
        });
    }

    // Ensure hero video autoplays reliably on all devices (mobile/desktop)
    const heroVideo = document.querySelector('.hero-bg-video');
    if (heroVideo) {
        heroVideo.muted = true;
        const playPromise = heroVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                document.addEventListener('touchstart', () => {
                    heroVideo.play().catch(() => {});
                }, { once: true });
            });
        }
    }
});
