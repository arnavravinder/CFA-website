document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);

    const timelineSection = document.querySelector('.timeline-section');
    const timelineTrack = document.querySelector('.timeline-track');

    if (timelineSection && timelineTrack) {
        if (window.innerWidth > 768) {
            let sections = gsap.utils.toArray(".timeline-card");

            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: ".timeline-section",
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: () => "+=" + timelineTrack.offsetWidth
                }
            });
        }
    }

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    }

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const statsSection = document.querySelector('.stats');
    const statNumbers = document.querySelectorAll('.stat-item h3');
    let started = false;

    const startCount = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const prefix = el.innerText.includes('₹') ? '₹' : '';
        const suffix = el.innerText.includes('+') ? '+' : '';

        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const updateCount = () => {
            count += increment;
            if (count < target) {
                el.innerText = prefix + Math.floor(count).toLocaleString() + suffix;
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = prefix + target.toLocaleString() + suffix;
            }
        };
        updateCount();
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            statNumbers.forEach(startCount);
            started = true;
        }
    });

    if (statsSection) {
        observer.observe(statsSection);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn?.querySelector('i');
            if (icon) icon.classList.replace('ph-x', 'ph-list');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                lenis.scrollTo(targetElement);
            }
        });
    });

    const teamBios = document.querySelectorAll('.team-bio');
    const MAX_BIO_LENGTH = 165;

    teamBios.forEach(bio => {
        const fullText = bio.textContent.trim();
        if (fullText.length > MAX_BIO_LENGTH) {
            const truncatedText = fullText.substring(0, MAX_BIO_LENGTH) + '...';
            bio.textContent = truncatedText;

            const readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'read-more-btn icon-btn';
            readMoreBtn.innerHTML = '<i class="ph ph-dots-three" style="font-size: 1.2rem;"></i>';
            readMoreBtn.setAttribute('aria-label', 'Read More');

            readMoreBtn.addEventListener('click', () => {
                if (bio.classList.contains('expanded')) {
                    bio.textContent = truncatedText;
                    readMoreBtn.innerHTML = '<i class="ph ph-dots-three" style="font-size: 1.2rem;"></i>';
                    readMoreBtn.setAttribute('aria-label', 'Read More');
                    bio.classList.remove('expanded');
                } else {
                    bio.textContent = fullText;
                    readMoreBtn.innerHTML = '<i class="ph ph-caret-up" style="font-size: 1.2rem;"></i>';
                    readMoreBtn.setAttribute('aria-label', 'Show Less');
                    bio.classList.add('expanded');
                }
                bio.appendChild(readMoreBtn);
            });

            bio.appendChild(readMoreBtn);
        }
    });
});
