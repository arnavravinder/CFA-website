document.addEventListener('DOMContentLoaded', () => {
    const lenis = typeof Lenis !== 'undefined' ? new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    }) : null;

    if (lenis) {
        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    }

    const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
    if (hasGsap) gsap.registerPlugin(ScrollTrigger);

    const timelineSection = document.querySelector('.timeline-section');
    const timelineTrack = document.querySelector('.timeline-track');

    if (hasGsap && timelineSection && timelineTrack) {
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
    const updateNavbar = () => navbar?.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

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
            const targetId = this.getAttribute('href');
            const targetElement = targetId.length > 1 && document.querySelector(targetId);
            if (!targetElement) return;
            e.preventDefault();
            navLinks?.classList.remove('active');
            const icon = mobileMenuBtn?.querySelector('i');
            if (icon) icon.classList.replace('ph-x', 'ph-list');

            if (lenis) {
                lenis.scrollTo(targetElement);
            } else {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    if (hasGsap) gsap.utils.toArray('.team-tier').forEach(tier => {
        gsap.from(tier.querySelectorAll('.team-member'), {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: tier,
                start: 'top 85%',
            }
        });
    });

    const teamDialog = document.querySelector('.team-dialog');

    if (teamDialog) {
        const dialogImg = teamDialog.querySelector('img');
        const dialogName = teamDialog.querySelector('h3');
        const dialogRole = teamDialog.querySelector('.team-role');
        const dialogBio = teamDialog.querySelector('.team-dialog-bio');

        document.querySelectorAll('.team-tier:not(.team-tier-lead) .team-member').forEach(member => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'team-bio-btn';
            btn.innerHTML = 'Read bio <i class="ph ph-arrow-right"></i>';
            member.appendChild(btn);

            btn.addEventListener('click', () => {
                const img = member.querySelector('img');
                dialogImg.src = img.src;
                dialogImg.alt = img.alt;
                dialogName.textContent = member.querySelector('h3').textContent;
                dialogRole.textContent = member.querySelector('.team-role').textContent;
                dialogBio.textContent = member.querySelector('.team-bio').textContent;
                teamDialog.showModal();
                lenis?.stop();
            });
        });

        teamDialog.querySelector('.team-dialog-close').addEventListener('click', () => teamDialog.close());
        teamDialog.addEventListener('click', (e) => {
            if (e.target === teamDialog) teamDialog.close();
        });
        teamDialog.addEventListener('close', () => lenis?.start());
    }
});
