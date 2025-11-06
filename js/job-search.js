// Dynamic Job Search Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize job search functionality
    initializeJobSearch();
    loadJobsOnPage();
    updateHomePageJobCounts();
});

function updateHomePageJobCounts() {
    // Only update if we're on the home page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const counts = updateJobCounts();
        
        // Update job counts in sector boxes
        const sectorCards = document.querySelectorAll('.card p:nth-child(2)');
        if (sectorCards.length >= 4) {
            sectorCards[0].textContent = `${counts.technology} jobs`;
            sectorCards[1].textContent = `${counts.sales} jobs`;
            sectorCards[2].textContent = `${counts.healthcare} jobs`;
            sectorCards[3].textContent = `${counts.hr} jobs`;
        }
    }
}

function initializeJobSearch() {
    // Add search functionality to all search forms
    const searchForms = document.querySelectorAll('form');
    searchForms.forEach(form => {
        const jobInput = form.querySelector('input[placeholder*="Job Title"]');
        const locationInput = form.querySelector('input[placeholder*="Location"]');
        
        if (jobInput && locationInput) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                performJobSearch(jobInput.value, locationInput.value);
            });
        }
    });

    // Add search button click handlers
    const searchButtons = document.querySelectorAll('a[href="#"], button');
    searchButtons.forEach(button => {
        if (button.textContent.includes('Search')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const form = button.closest('form') || button.closest('section');
                if (form) {
                    const jobInput = form.querySelector('input[placeholder*="Job Title"]');
                    const locationInput = form.querySelector('input[placeholder*="Location"]');
                    if (jobInput && locationInput) {
                        performJobSearch(jobInput.value, locationInput.value);
                    }
                }
            });
        }
    });
}

function performJobSearch(jobQuery, location) {
    // Get URL parameters if any
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('sector') || urlParams.get('category') || '';
    
    // Validate search inputs
    if (!jobQuery || jobQuery.trim() === '') {
        showNotification('Please enter a job title or keyword to search', 'warning');
        return;
    }
    
    // Search jobs
    const results = searchJobs(jobQuery, location, category);
    
    // Store search results and redirect to job listings
    localStorage.setItem('searchResults', JSON.stringify(results));
    localStorage.setItem('lastSearchQuery', jobQuery || '');
    localStorage.setItem('lastSearchLocation', location || '');
    
    // Show loading and redirect
    showLoadingState();
    setTimeout(() => {
        window.location.href = 'job.html';
    }, 1000);
}

function loadJobsOnPage() {
    // Check if we're on the job listings page
    const jobContainer = document.querySelector('.row.row-cols-1.row-cols-md-2.row-cols-lg-3.g-4');
    if (!jobContainer) return;

    // Get search results from localStorage or load all jobs
    let jobs = [];
    const searchResults = localStorage.getItem('searchResults');
    
    if (searchResults) {
        jobs = JSON.parse(searchResults);
        // Clear search results after loading
        localStorage.removeItem('searchResults');
        localStorage.removeItem('searchQuery');
        localStorage.removeItem('searchLocation');
        
        // Update search inputs with previous search
        const searchQuery = localStorage.getItem('lastSearchQuery');
        const searchLocation = localStorage.getItem('lastSearchLocation');
        
        const jobInput = document.querySelector('input[placeholder*="Job Title"]');
        const locationInput = document.querySelector('input[placeholder*="Location"]');
        
        if (jobInput && searchQuery) jobInput.value = searchQuery;
        if (locationInput && searchLocation) locationInput.value = searchLocation;
    } else {
        // Check URL parameters for category filtering
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('sector') || urlParams.get('category');
        
        if (category) {
            jobs = getJobsByCategory(category);
        } else {
            // Load all jobs by default
            jobs = getAllJobs();
        }
    }

    // Clear existing job cards
    jobContainer.innerHTML = '';

    // Display jobs
    if (jobs.length === 0) {
        jobContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="card p-5">
                    <h4>No jobs found</h4>
                    <p>Try adjusting your search criteria or browse all jobs.</p>
                    <a href="job.html" class="btn btn-primary">View All Jobs</a>
                </div>
            </div>
        `;
        return;
    }

    // Create job cards
    jobs.forEach(job => {
        const jobCard = createJobCard(job);
        jobContainer.appendChild(jobCard);
    });

    // Update results count
    updateResultsCount(jobs.length);
}

function createJobCard(job) {
    const col = document.createElement('div');
    col.className = 'col';
    
    // Check if job is saved
    const isLoggedIn = authManager.isLoggedIn();
    const isSaved = isLoggedIn && authManager.getSavedJobs().includes(job.id);
    const heartIcon = isSaved ? 'fa-solid' : 'fa-regular';
    const heartButtonClass = isSaved ? 'btn-danger' : 'btn-outline-danger';
    
    col.innerHTML = `
        <div class="card cardjob h-100" onclick="viewJobDetails(${job.id})">
            <div class="card-body p-3">
                <div class="d-flex align-items-start mb-3">
                    <img src="${job.logo}" class="me-3" alt="Company Logo" style="width: 50px; height: 50px;">
                    <div class="flex-grow-1">
                        <h5 class="card-title mb-1">${job.title}</h5>
                        <h6 class="text-muted mb-2">${job.company}</h6>
                        <div class="d-flex flex-wrap gap-1 mb-2">
                            <span class="badge bg-primary">${job.type}</span>
                            <span class="badge bg-success">${job.experience}</span>
                        </div>
                    </div>
                </div>
                
                <div class="mb-3">
                    <div class="d-flex align-items-center mb-1">
                        <i class="fa-solid fa-location-dot me-2 text-muted"></i>
                        <small>${job.location}</small>
                    </div>
                    <div class="d-flex align-items-center mb-1">
                        <i class="fa-solid fa-dollar-sign me-2 text-muted"></i>
                        <small>${job.salary}</small>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="fa-solid fa-clock me-2 text-muted"></i>
                        <small>Posted ${job.posted}</small>
                    </div>
                </div>
                
                <p class="card-text text-muted small">${job.description.substring(0, 100)}...</p>
                
                <div class="d-flex flex-wrap gap-1 mb-3">
                    ${job.skills.slice(0, 3).map(skill => 
                        `<span class="badge bg-light text-dark">${skill}</span>`
                    ).join('')}
                    ${job.skills.length > 3 ? `<span class="badge bg-light text-dark">+${job.skills.length - 3} more</span>` : ''}
                </div>
                
                <div class="d-flex gap-2">
                    <button class="btn btn-primary btn-sm flex-grow-1" onclick="event.stopPropagation(); viewJobDetails(${job.id})">
                        View Details
                    </button>
                    <button class="btn ${heartButtonClass} btn-sm" onclick="event.stopPropagation(); saveJob(${job.id})" title="Save Job">
                        <i class="${heartIcon} fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function viewJobDetails(jobId) {
    // Store job ID and redirect to job details
    localStorage.setItem('currentJobId', jobId);
    window.location.href = `job-details.html?id=${jobId}`;
}

function saveJob(jobId) {
    if (!authManager.isLoggedIn()) {
        showNotification('Please login to save jobs', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html?returnUrl=' + encodeURIComponent(window.location.href);
        }, 2000);
        return;
    }
    
    try {
        const savedJobs = authManager.getSavedJobs();
        
        if (!savedJobs.includes(jobId)) {
            authManager.saveJob(jobId);
            showNotification('Job saved successfully!', 'success');
            
            // Update the heart icon
            const heartIcon = document.querySelector(`button[onclick="event.stopPropagation(); saveJob(${jobId})"] i`);
            if (heartIcon) {
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');
            }
        } else {
            showNotification('Job already saved!', 'info');
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function updateResultsCount(count) {
    // Update page title or add results count
    const pageTitle = document.querySelector('h1');
    if (pageTitle && pageTitle.textContent.includes('Job Listings')) {
        pageTitle.textContent = `Job Listings (${count} jobs found)`;
    }
}

// Category-based job loading
function loadJobsByCategory(category) {
    const jobs = getJobsByCategory(category);
    localStorage.setItem('searchResults', JSON.stringify(jobs));
    window.location.href = 'job.html';
}

// Add category click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle sector card clicks
    const sectorLinks = document.querySelectorAll('a[href*="sector="]');
    sectorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = new URL(this.href);
            const sector = url.searchParams.get('sector');
            if (sector) {
                loadJobsByCategory(sector);
            }
        });
    });
});

function showNotification(message, type = 'info') {
    const alertClass = {
        'success': 'alert-success',
        'error': 'alert-danger',
        'warning': 'alert-warning',
        'info': 'alert-info'
    };
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass[type]} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
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
            <div class="mt-2">Searching jobs...</div>
        </div>
    `;
    
    document.body.appendChild(loadingDiv);
}