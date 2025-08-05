// Navigation System
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupSearch();
    setupFeedbackForm();
    setupStarRating();
    setupFilters();
    updateCharacterCount();
}

// Navigation Management
function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPage = btn.getAttribute('data-page');
            
            // Remove active class from all nav buttons and pages
            navBtns.forEach(b => b.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding page
            btn.classList.add('active');
            document.getElementById(targetPage + 'Page').classList.add('active');
        });
    });
}

// Search and Filter Functionality
function setupSearch() {
    // Restaurant search
    const restaurantSearch = document.getElementById('restaurantSearch');
    if (restaurantSearch) {
        restaurantSearch.addEventListener('input', (e) => {
            filterRestaurants(e.target.value);
        });
    }
    
    // Attraction search
    const attractionSearch = document.getElementById('attractionSearch');
    if (attractionSearch) {
        attractionSearch.addEventListener('input', (e) => {
            filterAttractions(e.target.value);
        });
    }
}

function setupFilters() {
    // Restaurant status filter
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            filterRestaurantsByStatus(e.target.value);
        });
    }
    
    // Attraction category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            filterAttractionsByCategory(e.target.value);
        });
    }
}

function filterRestaurants(searchTerm) {
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    const searchLower = searchTerm.toLowerCase();
    
    restaurantCards.forEach(card => {
        const restaurantName = card.querySelector('h3').textContent.toLowerCase();
        const cuisine = card.querySelector('.cuisine-section p').textContent.toLowerCase();
        
        if (restaurantName.includes(searchLower) || cuisine.includes(searchLower)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterRestaurantsByStatus(status) {
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    
    restaurantCards.forEach(card => {
        const cardStatus = card.getAttribute('data-status');
        
        if (status === 'all' || cardStatus === status) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterAttractions(searchTerm) {
    const attractionCards = document.querySelectorAll('.attraction-card');
    const searchLower = searchTerm.toLowerCase();
    
    attractionCards.forEach(card => {
        const attractionName = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (attractionName.includes(searchLower) || description.includes(searchLower)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterAttractionsByCategory(category) {
    const categorySections = document.querySelectorAll('.category-section');
    
    categorySections.forEach(section => {
        const sectionCategory = section.getAttribute('data-category');
        
        if (category === 'all' || sectionCategory === category) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Star Rating System
function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = index + 1;
            ratingInput.value = rating;
            
            // Update visual state
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
        
        star.addEventListener('mouseover', () => {
            const rating = index + 1;
            
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.style.color = '#fbbf24';
                } else {
                    s.style.color = 'rgba(255, 255, 255, 0.3)';
                }
            });
        });
    });
    
    // Reset on mouse leave
    const starRating = document.getElementById('starRating');
    if (starRating) {
        starRating.addEventListener('mouseleave', () => {
            const currentRating = parseInt(ratingInput.value) || 0;
            
            stars.forEach((s, i) => {
                if (i < currentRating) {
                    s.style.color = '#fbbf24';
                } else {
                    s.style.color = 'rgba(255, 255, 255, 0.3)';
                }
            });
        });
    }
}

// Feedback Form Management
function setupFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitFeedback();
        });
    }
}

function updateCharacterCount() {
    const messageTextarea = document.getElementById('feedbackMessage');
    const charCount = document.querySelector('.char-count');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', () => {
            const currentLength = messageTextarea.value.length;
            charCount.textContent = `${currentLength}/500`;
            
            if (currentLength > 450) {
                charCount.style.color = '#ef4444';
            } else {
                charCount.style.color = 'rgba(255, 255, 255, 0.6)';
            }
        });
    }
}

function submitFeedback() {
    const form = document.getElementById('feedbackForm');
    const successMessage = document.getElementById('feedbackSuccess');
    const category = document.getElementById('feedbackCategory').value;
    const rating = document.getElementById('rating').value;
    const message = document.getElementById('feedbackMessage').value;
    const anonymous = document.getElementById('anonymous').checked;
    
    // Basic validation
    if (!category || !rating || !message.trim()) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    const formData = {
        category,
        rating,
        message: message.trim(),
        anonymous,
        timestamp: new Date().toISOString()
    };
    
    console.log('Feedback submitted:', formData);
    
    // Show success message
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Reset form after 3 seconds
    setTimeout(() => {
        form.style.display = 'block';
        successMessage.style.display = 'none';
        form.reset();
        
        // Reset star rating
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.classList.remove('active');
            star.style.color = 'rgba(255, 255, 255, 0.3)';
        });
        
        // Reset character count
        const charCount = document.querySelector('.char-count');
        if (charCount) {
            charCount.textContent = '0/500';
            charCount.style.color = 'rgba(255, 255, 255, 0.6)';
        }
    }, 3000);
}

// Phone Call Functions
function callFrontDesk() {
    const phoneNumber = '757-763-6200';
    if (confirm(`Call front desk at ${phoneNumber}?`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

function callRestaurant(restaurant) {
    // Restaurant phone numbers (would be dynamic in real implementation)
    const phoneNumbers = {
        'saltine': '757-763-6200',
        'varia': '757-763-6200',
        'grain': '757-763-6200'
    };
    
    const phoneNumber = phoneNumbers[restaurant] || '757-763-6200';
    if (confirm(`Call ${restaurant} at ${phoneNumber}?`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

function callService(phoneNumber) {
    if (confirm(`Call ${phoneNumber}?`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

// Website Functions
function viewWebsite(restaurant) {
    // Restaurant websites (would be dynamic in real implementation)
    const websites = {
        'saltine': 'https://www.hilton.com/en/hotels/norfahf-hilton-norfolk-the-main/dining/',
        'varia': 'https://www.hilton.com/en/hotels/norfahf-hilton-norfolk-the-main/dining/',
        'grain': 'https://www.hilton.com/en/hotels/norfahf-hilton-norfolk-the-main/dining/'
    };
    
    const website = websites[restaurant];
    if (website) {
        window.open(website, '_blank');
    }
}

function openWebsite(url) {
    window.open(url, '_blank');
}

// App Functions
function openApp(appName) {
    const appUrls = {
        'uber': {
            ios: 'uber://',
            android: 'uber://',
            web: 'https://m.uber.com'
        },
        'lyft': {
            ios: 'lyft://',
            android: 'lyft://',
            web: 'https://www.lyft.com'
        }
    };
    
    const app = appUrls[appName];
    if (!app) return;
    
    // Try to open native app, fallback to web
    const userAgent = navigator.userAgent.toLowerCase();
    let appUrl;
    
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        appUrl = app.ios;
    } else if (userAgent.includes('android')) {
        appUrl = app.android;
    } else {
        appUrl = app.web;
    }
    
    // Try native app first
    const startTime = Date.now();
    window.location.href = appUrl;
    
    // Fallback to web after 1.5 seconds if app didn't open
    setTimeout(() => {
        if (Date.now() - startTime < 2000) {
            window.open(app.web, '_blank');
        }
    }, 1500);
}

// Weather Data Update (simulated)
function updateWeatherData() {
    // In a real implementation, this would fetch real weather data
    const weatherData = {
        temperature: 93,
        condition: 'Sunny & Hot',
        high: 96,
        low: 77,
        location: 'Norfolk, VA'
    };
    
    // Update weather display
    const tempElement = document.querySelector('.temp');
    const conditionElement = document.querySelector('.condition');
    const rangeElement = document.querySelector('.temp-range');
    
    if (tempElement) tempElement.textContent = `${weatherData.temperature}°F`;
    if (conditionElement) conditionElement.textContent = weatherData.condition;
    if (rangeElement) rangeElement.textContent = `High ${weatherData.high}° / Low ${weatherData.low}°`;
}

// Restaurant Status Updates (simulated)
function updateRestaurantStatuses() {
    // In a real implementation, this would fetch real-time status
    const statuses = ['open', 'busy', 'closed'];
    const statusElements = document.querySelectorAll('.status');
    
    // Simulate status changes (for demo purposes)
    statusElements.forEach(element => {
        const currentTime = new Date().getHours();
        let status;
        
        if (currentTime >= 7 && currentTime < 22) {
            status = Math.random() > 0.7 ? 'busy' : 'open';
        } else {
            status = 'closed';
        }
        
        element.className = `status ${status}`;
        element.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    });
}

// Smooth Scrolling for Attractions
function setupSmoothScrolling() {
    const attractionsScroll = document.querySelector('.attractions-scroll');
    if (attractionsScroll) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        attractionsScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - attractionsScroll.offsetLeft;
            scrollLeft = attractionsScroll.scrollLeft;
        });
        
        attractionsScroll.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        attractionsScroll.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        attractionsScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - attractionsScroll.offsetLeft;
            const walk = (x - startX) * 2;
            attractionsScroll.scrollLeft = scrollLeft - walk;
        });
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setupSmoothScrolling();
    
    // Update data periodically
    updateWeatherData();
    updateRestaurantStatuses();
    
    // Set up periodic updates (every 5 minutes)
    setInterval(() => {
        updateWeatherData();
        updateRestaurantStatuses();
    }, 300000);
});

// Touch gesture support for mobile
function setupTouchGestures() {
    let startY = 0;
    let endY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        endY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startY - endY;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe up - could trigger additional actions
                console.log('Swiped up');
            } else {
                // Swipe down - could trigger refresh
                console.log('Swiped down');
            }
        }
    }
}

// Performance optimization: Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    // In production, this would send error reports to monitoring service
});

// Service Worker registration for offline capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    setupTouchGestures();
    setupLazyLoading();
});