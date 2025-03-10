// Navigation Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const searchContainer = document.querySelector('.search-container');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    searchContainer.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(span => {
        span.classList.toggle('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('nav') && !event.target.closest('#search-results')) {
        navLinks.classList.remove('active');
        searchContainer.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.classList.remove('active');
        });
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu after click
        navLinks.classList.remove('active');
    });
});

// Add scroll animations to elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.post, .newsletter, .contact');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.classList.add('will-animate');
        observer.observe(element);
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message with animation
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Your message has been sent successfully!';
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(20px)';
        
        contactForm.reset();
        contactForm.appendChild(successMessage);
        
        // Animate the success message
        setTimeout(() => {
            successMessage.style.transition = 'all 0.5s ease';
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 3000);
    });
}

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get email value
        const email = this.querySelector('input[type="email"]').value;
        
        // In a real application, you would send this to a server
        console.log('Newsletter subscription:', email);
        
        // Show success message with animation
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thanks for subscribing!';
        successMessage.style.opacity = '0';
        
        newsletterForm.reset();
        newsletterForm.appendChild(successMessage);
        
        // Animate the success message
        setTimeout(() => {
            successMessage.style.transition = 'all 0.5s ease';
            successMessage.style.opacity = '1';
        }, 10);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 3000);
    });
}

// Search Functionality - FIXED
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const resultsContainer = document.querySelector('.results-container');
const closeSearch = document.getElementById('close-search');

// Function to search posts
function searchPosts(query) {
    query = query.toLowerCase();
    const posts = document.querySelectorAll('.post');
    const results = Array.from(posts).filter(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const content = post.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(post.querySelectorAll('.post-tag')).map(tag => tag.textContent.toLowerCase());
        
        return title.includes(query) || content.includes(query) || tags.some(tag => tag.includes(query));
    });
    
    return results;
}

if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (!query) return;
        
        const results = searchPosts(query);
        displaySearchResults(results, query);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (!query) return;
            
            const results = searchPosts(query);
            displaySearchResults(results, query);
        }
    });
}

function displaySearchResults(results, query) {
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `<p>No results found for "${query}"</p>`;
    } else {
        results.forEach(post => {
            const title = post.querySelector('h2').textContent;
            const date = post.querySelector('.post-date').textContent;
            const preview = post.querySelector('p').textContent.substring(0, 100) + '...';
            
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <h3>${title}</h3>
                <p class="post-date">${date}</p>
                <p>${preview}</p>
                <a href="#" class="read-more">Read More</a>
            `;
            
            resultsContainer.appendChild(resultItem);
        });
    }
    
    // Add animation when showing search results
    searchResults.style.display = 'block';
    searchResults.style.opacity = '0';
    searchResults.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        searchResults.classList.add('active');
        searchResults.style.transition = 'all 0.3s ease';
        searchResults.style.opacity = '1';
        searchResults.style.transform = 'translateY(0)';
    }, 10);
    
    searchInput.value = '';
}

if (closeSearch) {
    closeSearch.addEventListener('click', () => {
        searchResults.style.opacity = '0';
        searchResults.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            searchResults.classList.remove('active');
            searchResults.style.display = 'none';
        }, 300);
    });
}

// Tag Filtering with Animation
const tagButtons = document.querySelectorAll('.tag');
if (tagButtons.length > 0) {
    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tags
            tagButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tag
            button.classList.add('active');
            
            const selectedTag = button.getAttribute('data-tag');
            filterPosts(selectedTag);
        });
    });
}

function filterPosts(tag) {
    const posts = document.querySelectorAll('.post');
    
    posts.forEach(post => {
        const postTags = post.getAttribute('data-tags').split(' ');
        
        // Prepare for animation
        if (tag === 'all' || postTags.includes(tag)) {
            // Show posts with opacity animation
            if (post.style.display === 'none') {
                post.style.opacity = '0';
                post.style.transform = 'translateY(20px)';
                post.style.display = 'block';
                
                setTimeout(() => {
                    post.style.transition = 'all 0.5s ease';
                    post.style.opacity = '1';
                    post.style.transform = 'translateY(0)';
                }, 10);
            }
        } else {
            // Hide posts with opacity animation
            post.style.transition = 'all 0.5s ease';
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                post.style.display = 'none';
            }, 500);
        }
    });
}

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Dark Mode Toggle with Animation
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    darkModeToggle.addEventListener('click', () => {
        // Add page transition animation
        const overlay = document.createElement('div');
        overlay.className = 'theme-transition-overlay';
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            document.body.classList.toggle('dark-mode');
            
            // Save theme preference
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            
            setTimeout(() => {
                overlay.classList.add('fade-out');
                setTimeout(() => {
                    overlay.remove();
                }, 500);
            }, 100);
        }, 50);
    });
}

// Sticky Header with Animation
const nav = document.querySelector('nav');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;
    
    if (currentScrollPosition > 50) {
        nav.classList.add('sticky');
        
        // Hide nav when scrolling down, show when scrolling up
        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 150) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
    } else {
        nav.classList.remove('sticky');
        nav.classList.remove('nav-hidden');
    }
    
    lastScrollPosition = currentScrollPosition;
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
    
    // Add staggered animation to blog posts on initial load
    const posts = document.querySelectorAll('.post');
    posts.forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            post.style.transition = 'all 0.8s ease';
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }, 100 + (index * 150));
    });
});
