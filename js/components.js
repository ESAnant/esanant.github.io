// Utility Functions and Additional Components

// Theme Manager (for future dark/light mode toggle)
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.init();
    }

    init() {
        // Check for saved theme preference or default to dark
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// Lazy Loading for Images
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        imageObserver.unobserve(entry.target);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            this.images.forEach(img => this.loadImage(img));
        }
    }

    loadImage(img) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
    }
}

// Form Handler (for future contact form)
class ContactForm {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Add your form submission logic here
            console.log('Form data:', data);
            this.showSuccess('Message sent successfully!');
        } catch (error) {
            this.showError('Failed to send message. Please try again.');
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Scroll Progress Indicator
class ScrollProgress {
    constructor() {
        this.progressBar = this.createProgressBar();
        this.init();
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress__bar"></div>';
        
        const styles = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(255, 255, 255, 0.1);
                z-index: 9999;
            }
            .scroll-progress__bar {
                height: 100%;
                background: linear-gradient(90deg, var(--primary), var(--secondary));
                width: 0;
                transition: width 0.1s ease;
            }
        `;
        
        if (!document.querySelector('#scroll-progress-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'scroll-progress-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
        
        document.body.appendChild(progressBar);
        return progressBar;
    }

    init() {
        window.addEventListener('scroll', this.updateProgress.bind(this));
    }

    updateProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const bar = this.progressBar.querySelector('.scroll-progress__bar');
        bar.style.width = scrolled + '%';
    }
}

// Copy to Clipboard Utility
class ClipboardManager {
    static async copy(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    }

    static showCopyFeedback(element, originalText = 'Copy') {
        const originalContent = element.textContent;
        element.textContent = 'Copied!';
        element.classList.add('copied');
        
        setTimeout(() => {
            element.textContent = originalContent;
            element.classList.remove('copied');
        }, 2000);
    }
}

// Analytics Helper (for future analytics integration)
class Analytics {
    static trackEvent(eventName, data = {}) {
        // Add your analytics tracking code here
        console.log('Analytics event:', eventName, data);
        
        // Example for Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
    }

    static trackPageView(page) {
        this.trackEvent('page_view', { page });
    }

    static trackClick(element, label) {
        this.trackEvent('click', {
            element_id: element.id,
            element_class: element.className,
            label
        });
    }
}

// Device Detection
class DeviceDetection {
    static isMobile() {
        return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static isTablet() {
        return /iPad|Android(?=.*Mobile)/i.test(navigator.userAgent);
    }

    static isDesktop() {
        return !this.isMobile() && !this.isTablet();
    }

    static getDeviceType() {
        if (this.isMobile()) return 'mobile';
        if (this.isTablet()) return 'tablet';
        return 'desktop';
    }
}

// Initialize additional components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll progress indicator
    new ScrollProgress();
    
    // Initialize lazy loading if images exist
    if (document.querySelectorAll('img[data-src]').length > 0) {
        new LazyLoader();
    }
    
    // Add device class to body
    document.body.classList.add(`device--${DeviceDetection.getDeviceType()}`);
    
    // Track page load
    Analytics.trackPageView(window.location.pathname);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        LazyLoader,
        ContactForm,
        ScrollProgress,
        ClipboardManager,
        Analytics,
        DeviceDetection
    };
}
