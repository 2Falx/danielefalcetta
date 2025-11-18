// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

// Remove loading screen when page is fully loaded
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 300); // Small delay for better UX
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Navbar scroll effect and active link highlighting
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Highlight active nav link
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    lastScroll = currentScroll;
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            width: 500px;
            height: 500px;
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .publication-item, .award-card');
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Initialize 3D tilt effect for project cards
    init3DTilt();
    
    // Add particle effect to hero
    createParticles();
    
    // Animate statistics if present
    animateCounters();
    
    // Initialize skill bar animations
    animateSkillBars();
});

// 3D Tilt Effect for Project Cards
function init3DTilt() {
    const cards = document.querySelectorAll('.project-card[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `
        translateY(-15px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(1.03)
    `;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
}

// Create floating particles in hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    `;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.1;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(37, 99, 235, ${opacity}) 0%, transparent 70%);
            border-radius: 50%;
            left: ${startX}%;
            bottom: -20px;
            animation: floatUp ${duration}s ease-in ${delay}s infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    hero.insertBefore(particlesContainer, hero.firstChild);
    
    // Add float up animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Animate counters (for stats if you add them later)
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Animate skill steps when they come into view
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-bar-item');
    
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const steps = skillItem.querySelectorAll('.skill-step.filled');
                
                // Add a staggered animation for each filled step
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.transform = 'scale(1)';
                        step.style.opacity = '1';
                    }, 150 * (index + 1));
                });
                
                skillBarObserver.unobserve(skillItem);
            }
        });
    }, { threshold: 0.3 });
    
    skillItems.forEach(item => {
        // Initially hide filled steps for animation
        const steps = item.querySelectorAll('.skill-step.filled');
        steps.forEach(step => {
            step.style.transform = 'scale(0.8)';
            step.style.opacity = '0';
        });
        
        skillBarObserver.observe(item);
    });
}

// Animate number counting effect
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (range * easeOutQuart));
        
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dark mode toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a little rotation animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});

// Add loading animation when page loads
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add smooth reveal for sections on scroll
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', revealSections);
revealSections(); // Initial check

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea')) {
            themeToggle.click();
        }
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// ==================== COLLABORATIONS CAROUSEL ====================
class CollaborationsCarousel {
    constructor() {
        this.track = document.querySelector('.collaborations-track');
        this.originalCards = Array.from(document.querySelectorAll('.collaboration-item'));
        this.prevBtn = document.querySelector('.collaborations .carousel-nav.prev');
        this.nextBtn = document.querySelector('.collaborations .carousel-nav.next');
        this.dotsContainer = document.querySelector('.collaborations .carousel-dots');
        
        if (!this.track || this.originalCards.length === 0) return;
        
        this.totalCards = this.originalCards.length;
        this.cardsPerView = this.getCardsPerView();
        
        // Add mock cards for infinite scroll effect
        this.addMockCards();
        
        // Get all cards including mocks
        this.cards = Array.from(this.track.querySelectorAll('.collaboration-item'));
        
        // Start at the first real card (after mock cards)
        this.currentIndex = this.totalCards;
        
        this.init();
    }
    
    getCardsPerView() {
        if (window.innerWidth >= 1200) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    addMockCards() {
        // Clone cards and add to beginning and end
        const fragment = document.createDocumentFragment();
        
        // Add clones at the beginning (for seamless backward scrolling)
        this.originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('mock-collab');
            fragment.appendChild(clone);
        });
        this.track.insertBefore(fragment, this.track.firstChild);
        
        // Add clones at the end (for seamless forward scrolling)
        const fragmentEnd = document.createDocumentFragment();
        this.originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('mock-collab');
            fragmentEnd.appendChild(clone);
        });
        this.track.appendChild(fragmentEnd);
    }
    
    init() {
        // Create dots (only for original cards)
        this.createDots();
        
        // Add event listeners
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Enhanced touch support with momentum
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartTime = 0;
        let isSwiping = false;
        
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartTime = Date.now();
            isSwiping = true;
        }, { passive: true });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
            const touchDiff = touchStartX - touchEndX;
            const touchDuration = Date.now() - touchStartTime;
            const velocity = Math.abs(touchDiff) / touchDuration;
            
            // Swipe detection with velocity
            if (Math.abs(touchDiff) > 50 || velocity > 0.3) {
                if (touchDiff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            isSwiping = false;
        }, { passive: true });
        
        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newCardsPerView = this.getCardsPerView();
                if (newCardsPerView !== this.cardsPerView) {
                    this.cardsPerView = newCardsPerView;
                }
                this.updateCarousel(true); // Instant update on resize
            }, 200);
        });
        
        // Initial update (instant, no transition)
        this.updateCarousel(true);
        
        // Auto-play (optional)
        // this.startAutoPlay();
    }
    
    createDots() {
        const totalDots = this.totalCards;
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to project ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateCarousel(instant = false) {
        // Calculate offset to center the active card
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 32; // 2rem
        const carouselWidth = this.track.parentElement.offsetWidth;
        
        // Center the active card
        const centerOffset = (carouselWidth / 2) - (cardWidth / 2);
        const scrollOffset = this.currentIndex * (cardWidth + gap);
        const offset = centerOffset - scrollOffset;
        
        // Apply transition
        if (instant) {
            this.track.style.transition = 'none';
        }
        this.track.style.transform = `translateX(${offset}px)`;
        
        if (instant) {
            // Force reflow
            this.track.offsetHeight;
            this.track.style.transition = '';
        }
        
        // Update active states - only the current card is active
        this.cards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === this.currentIndex) {
                card.classList.add('active');
            }
        });
        
        // Update dots (map to original card index)
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        const realIndex = (this.currentIndex - this.totalCards + this.totalCards) % this.totalCards;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
    }
    
    next() {
        this.currentIndex++;
        this.updateCarousel();
        
        // Check if we're at the end of the second set
        if (this.currentIndex >= this.totalCards * 2) {
            setTimeout(() => {
                // Jump back to the start of the real cards (middle set)
                this.currentIndex = this.totalCards;
                this.updateCarousel(true);
            }, 650); // Wait for transition to complete
        }
    }
    
    prev() {
        this.currentIndex--;
        this.updateCarousel();
        
        // Check if we're before the middle set
        if (this.currentIndex < this.totalCards) {
            setTimeout(() => {
                // Jump to the end of the middle set
                this.currentIndex = this.totalCards * 2 - 1;
                this.updateCarousel(true);
            }, 650); // Wait for transition to complete
        }
    }
    
    goToSlide(index) {
        // Map the dot index to the actual card index (in the middle set)
        this.currentIndex = this.totalCards + index;
        this.updateCarousel();
    }
    
    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => this.next(), interval);
        
        // Pause on hover
        this.track.addEventListener('mouseenter', () => {
            clearInterval(this.autoPlayInterval);
        });
        
        this.track.addEventListener('mouseleave', () => {
            this.autoPlayInterval = setInterval(() => this.next(), interval);
        });
    }
}

// Presentations Carousel
class PresentationsCarousel {
    constructor() {
        this.track = document.querySelector('.presentations-track');
        this.originalCards = Array.from(document.querySelectorAll('.presentation-compact-card'));
        this.prevBtn = document.querySelector('.presentations .carousel-nav.prev');
        this.nextBtn = document.querySelector('.presentations .carousel-nav.next');
        this.dotsContainer = document.querySelector('.presentations .carousel-dots');
        
        if (!this.track || this.originalCards.length === 0) return;
        
        this.totalCards = this.originalCards.length;
        this.cardsPerView = this.getCardsPerView();
        
        // Add mock cards for infinite scroll effect
        this.addMockCards();
        
        // Get all cards including mocks
        this.cards = Array.from(this.track.querySelectorAll('.presentation-compact-card'));
        
        // Start at the first real card (after mock cards)
        this.currentIndex = this.totalCards;
        
        this.init();
    }
    
    getCardsPerView() {
        if (window.innerWidth >= 1200) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    addMockCards() {
        // Clone cards and add to beginning and end
        const fragment = document.createDocumentFragment();
        
        // Add clones at the beginning (for seamless backward scrolling)
        this.originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('mock-presentation');
            fragment.appendChild(clone);
        });
        this.track.insertBefore(fragment, this.track.firstChild);
        
        // Add clones at the end (for seamless forward scrolling)
        const fragmentEnd = document.createDocumentFragment();
        this.originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('mock-presentation');
            fragmentEnd.appendChild(clone);
        });
        this.track.appendChild(fragmentEnd);
    }
    
    init() {
        // Create dots (only for original cards)
        this.createDots();
        
        // Add event listeners
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Enhanced touch support with momentum
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartTime = 0;
        let isSwiping = false;
        
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartTime = Date.now();
            isSwiping = true;
        }, { passive: true });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
            const touchDiff = touchStartX - touchEndX;
            const touchDuration = Date.now() - touchStartTime;
            const velocity = Math.abs(touchDiff) / touchDuration;
            
            // Swipe detection with velocity
            if (Math.abs(touchDiff) > 50 || velocity > 0.3) {
                if (touchDiff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            isSwiping = false;
        }, { passive: true });
        
        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newCardsPerView = this.getCardsPerView();
                if (newCardsPerView !== this.cardsPerView) {
                    this.cardsPerView = newCardsPerView;
                }
                this.updateCarousel(true); // Instant update on resize
            }, 200);
        });
        
        // Initial update (instant, no transition)
        this.updateCarousel(true);
    }
    
    createDots() {
        const totalDots = this.totalCards;
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to presentation ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateCarousel(instant = false) {
        // Calculate offset to center the active card
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 32; // 2rem
        const carouselWidth = this.track.parentElement.offsetWidth;
        
        // Center the active card
        const centerOffset = (carouselWidth / 2) - (cardWidth / 2);
        const scrollOffset = this.currentIndex * (cardWidth + gap);
        const offset = centerOffset - scrollOffset;
        
        // Apply transition
        if (instant) {
            this.track.style.transition = 'none';
        }
        this.track.style.transform = `translateX(${offset}px)`;
        
        if (instant) {
            // Force reflow
            this.track.offsetHeight;
            this.track.style.transition = '';
        }
        
        // Update active states - only the current card is active
        this.cards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === this.currentIndex) {
                card.classList.add('active');
            }
        });
        
        // Update dots (map to original card index)
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        const realIndex = (this.currentIndex - this.totalCards + this.totalCards) % this.totalCards;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
    }
    
    next() {
        this.currentIndex++;
        this.updateCarousel();
        
        // Check if we're at the end of the second set
        if (this.currentIndex >= this.totalCards * 2) {
            setTimeout(() => {
                // Jump back to the start of the real cards (middle set)
                this.currentIndex = this.totalCards;
                this.updateCarousel(true);
            }, 650); // Wait for transition to complete
        }
    }
    
    prev() {
        this.currentIndex--;
        this.updateCarousel();
        
        // Check if we're before the middle set
        if (this.currentIndex < this.totalCards) {
            setTimeout(() => {
                // Jump to the end of the middle set
                this.currentIndex = this.totalCards * 2 - 1;
                this.updateCarousel(true);
            }, 650); // Wait for transition to complete
        }
    }
    
    goToSlide(index) {
        // Map the dot index to the actual card index (in the middle set)
        this.currentIndex = this.totalCards + index;
        this.updateCarousel();
    }
}

// Initialize carousels when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CollaborationsCarousel();
    new PresentationsCarousel();
});

// Add performance monitoring
const logPerformance = () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
};

window.addEventListener('load', logPerformance);

console.log('🎉 Daniele Falcetta\'s website loaded successfully!');
console.log('💡 Press "T" to toggle dark mode');

// ==================== PRESENTATION MODAL ====================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('presentationModal');
    const modalIframe = document.getElementById('modalIframe');
    const modalTitle = document.getElementById('modalTitle');
    const modalLink = document.getElementById('modalLink');
    const closeBtn = document.querySelector('.presentation-modal-close');
    const presentationCards = document.querySelectorAll('.presentation-compact-card');

    // Open modal when clicking on a presentation card
    presentationCards.forEach(card => {
        card.addEventListener('click', () => {
            const embedUrl = card.getAttribute('data-embed');
            const linkUrl = card.getAttribute('data-link');
            const title = card.querySelector('.presentation-compact-title').textContent;

            modalIframe.src = embedUrl;
            modalTitle.textContent = title;
            modalLink.href = linkUrl;
            modal.classList.add('active');
            // Don't prevent body scrolling - modal has its own scroll
        });
    });

    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        modalIframe.src = ''; // Stop iframe loading
    };

    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

// Scroll-triggered animations for timeline items
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});

// ==================== TIMELINE TOGGLE (Show More/Less) ====================
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('timeline-toggle-btn');
    const hiddenItems = document.querySelectorAll('.timeline-item-hidden');
    const toggleText = toggleBtn.querySelector('.toggle-text');
    let isExpanded = false;

    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        
        hiddenItems.forEach(item => {
            if (isExpanded) {
                item.classList.remove('timeline-item-hidden');
                item.style.display = 'flex';
                // Trigger animation
                setTimeout(() => {
                    item.classList.add('visible');
                }, 10);
            } else {
                item.classList.remove('visible');
                // Wait for fade out animation before hiding
                setTimeout(() => {
                    item.style.display = 'none';
                    item.classList.add('timeline-item-hidden');
                }, 800);
            }
        });
        
        // Update button text and icon rotation
        toggleText.textContent = isExpanded ? 'Show Less' : 'Show More';
        toggleBtn.classList.toggle('expanded', isExpanded);
        
        // Scroll to timeline section if collapsing
        if (!isExpanded) {
            const timelineSection = document.getElementById('timeline');
            const offset = 100;
            const targetPosition = timelineSection.offsetTop - offset;
            setTimeout(() => {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 200);
        }
    });
});
