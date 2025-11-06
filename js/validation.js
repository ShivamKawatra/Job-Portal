// Form Validation and Interactive Features

// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const jobPostForm = document.getElementById('jobPostForm');
    const loginForm = document.querySelector('form[action=""]');

    // Contact Form Handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            // Reset previous validation states
            clearValidationStates();

            let isValid = true;

            // Validate full name
            if (fullName === '') {
                showError('fullName', 'Please enter your full name.');
                isValid = false;
            }

            // Validate email
            if (email === '' || !isValidEmail(email)) {
                showError('email', 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate subject
            if (subject === '') {
                showError('subject', 'Please select a subject.');
                isValid = false;
            }

            // Validate message
            if (message === '') {
                showError('message', 'Please enter your message.');
                isValid = false;
            }

            if (isValid) {
                showSuccessMessage('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Job Post Form Handler
    if (jobPostForm) {
        jobPostForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const companyName = document.getElementById('companyName').value.trim();
            const jobTitle = document.getElementById('jobTitle').value.trim();
            const jobCategory = document.getElementById('jobCategory').value;
            const employmentType = document.getElementById('employmentType').value;
            const experienceLevel = document.getElementById('experienceLevel').value;
            const jobLocation = document.getElementById('jobLocation').value.trim();
            const jobDescription = document.getElementById('jobDescription').value.trim();
            const contactEmail = document.getElementById('contactEmail').value.trim();

            // Reset previous validation states
            clearValidationStates();

            let isValid = true;

            // Validate required fields
            if (companyName === '') {
                showError('companyName', 'Please enter company name.');
                isValid = false;
            }

            if (jobTitle === '') {
                showError('jobTitle', 'Please enter job title.');
                isValid = false;
            }

            if (jobCategory === '') {
                showError('jobCategory', 'Please select job category.');
                isValid = false;
            }

            if (employmentType === '') {
                showError('employmentType', 'Please select employment type.');
                isValid = false;
            }

            if (experienceLevel === '') {
                showError('experienceLevel', 'Please select experience level.');
                isValid = false;
            }

            if (jobLocation === '') {
                showError('jobLocation', 'Please enter job location.');
                isValid = false;
            }

            if (jobDescription === '') {
                showError('jobDescription', 'Please enter job description.');
                isValid = false;
            }

            if (contactEmail === '' || !isValidEmail(contactEmail)) {
                showError('contactEmail', 'Please enter a valid contact email.');
                isValid = false;
            }

            if (isValid) {
                showSuccessMessage('Job posted successfully! It will be reviewed and published soon.');
                jobPostForm.reset();
            }
        });
    }

    // Skip login/register form handling if on those pages - handled by auth.js
    if (window.location.href.includes('login.html') || window.location.href.includes('register.html')) {
        return;
    }
});

// Search Functionality
function performSearch() {
    const searchInput = document.querySelector('input[placeholder*="Job Title"]');
    const locationInput = document.querySelector('input[placeholder*="Location"]');
    
    if (searchInput && locationInput) {
        const jobTitle = searchInput.value.trim();
        const location = locationInput.value.trim();
        
        if (jobTitle === '' && location === '') {
            alert('Please enter a job title or location to search.');
            return;
        }
        
        // Simulate search
        showLoadingState();
        setTimeout(() => {
            hideLoadingState();
            window.location.href = 'job.html?search=' + encodeURIComponent(jobTitle) + '&location=' + encodeURIComponent(location);
        }, 1000);
    }
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('is-invalid');
        const feedback = field.parentNode.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.textContent = message;
        }
    }
}

function clearValidationStates() {
    const invalidFields = document.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => {
        field.classList.remove('is-invalid');
    });
}

function showSuccessMessage(message) {
    // Create and show success alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function showLoadingState() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingOverlay';
    loadingDiv.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center';
    loadingDiv.style.cssText = 'background: rgba(0,0,0,0.5); z-index: 9999;';
    loadingDiv.innerHTML = `
        <div class="text-center text-white">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="mt-2">Processing...</div>
        </div>
    `;
    
    document.body.appendChild(loadingDiv);
}

function hideLoadingState() {
    const loadingDiv = document.getElementById('loadingOverlay');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// Job Search Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add search functionality to search buttons
    const searchButtons = document.querySelectorAll('a[href="#"]');
    searchButtons.forEach(button => {
        if (button.textContent.includes('Search')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                performSearch();
            });
        }
    });

    // Add enter key support for search inputs
    const searchInputs = document.querySelectorAll('input[placeholder*="Job Title"], input[placeholder*="Location"]');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});