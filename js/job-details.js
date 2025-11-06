// Job Details Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Load dynamic job details
    loadJobDetails();
    // Initialize job details functionality
    initializeJobActions();
    loadSimilarJobs();
});

// Load job details dynamically
function loadJobDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id') || localStorage.getItem('currentJobId');
    
    if (jobId) {
        const job = getJobById(parseInt(jobId));
        if (job) {
            updateJobDetailsPage(job);
        }
    }
}

// Update job details page with dynamic data
function updateJobDetailsPage(job) {
    // Update job title and company
    const jobTitle = document.querySelector('h2');
    const companyName = document.querySelector('h5.text-muted');
    
    if (jobTitle) jobTitle.textContent = job.title;
    if (companyName) companyName.textContent = job.company;
    
    // Update badges
    const badgeContainer = document.querySelector('.d-flex.flex-wrap.gap-3');
    if (badgeContainer) {
        badgeContainer.innerHTML = `
            <span class="badge bg-primary">${job.type}</span>
            <span class="badge bg-success">${job.location.includes('Remote') ? 'Remote' : 'On-site'}</span>
            <span class="badge bg-info">${job.experience}</span>
        `;
    }
    
    // Update salary and details
    const salarySpan = document.querySelector('.text-success');
    if (salarySpan) salarySpan.textContent = job.salary;
    
    // Update location in job overview section
    const overviewSection = document.querySelector('.row.mb-4');
    if (overviewSection) {
        const locationCol = overviewSection.children[1];
        if (locationCol) {
            locationCol.innerHTML = `<strong>Location:</strong><br>${job.location}`;
        }
    }
    
    // Update job description
    const descriptionSection = document.querySelector('h4[style*="color:#F03737"]');
    if (descriptionSection && descriptionSection.textContent === 'Job Description') {
        const descriptionContainer = descriptionSection.parentNode;
        descriptionContainer.innerHTML = `
            <h4 style="color:#F03737;">Job Description</h4>
            <p class="text-justify">${job.description}</p>
            
            <h5>Required Skills:</h5>
            <ul>
                ${job.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
            
            <h5>Job Details:</h5>
            <ul>
                <li><strong>Experience:</strong> ${job.experience}</li>
                <li><strong>Employment Type:</strong> ${job.type}</li>
                <li><strong>Salary Range:</strong> ${job.salary}</li>
                <li><strong>Posted:</strong> ${job.posted}</li>
            </ul>
        `;
    }
    
    // Update page title
    document.title = `${job.title} - ${job.company} | My Job Gator`;
}

// Save Job Functionality
function saveJob() {
    if (!authManager.isLoggedIn()) {
        showNotification('Please login to save jobs', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html?returnUrl=' + encodeURIComponent(window.location.href);
        }, 2000);
        return;
    }

    const saveButton = document.querySelector('button[onclick="saveJob()"]');
    const icon = saveButton.querySelector('i');
    const currentJobId = getCurrentJobId();
    
    // Toggle saved state
    if (icon.classList.contains('fa-regular')) {
        try {
            authManager.saveJob(parseInt(currentJobId));
            
            // Update UI
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            saveButton.innerHTML = '<i class="fa-solid fa-heart"></i> Saved';
            saveButton.classList.remove('btn-outline-danger');
            saveButton.classList.add('btn-danger');
            
            showNotification('Job saved successfully!', 'success');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    } else {
        // Remove from saved jobs
        const user = authManager.getCurrentUser();
        const users = authManager.getUsers();
        const userIndex = users.findIndex(u => u.id === user.id);
        
        users[userIndex].savedJobs = users[userIndex].savedJobs.filter(id => id !== parseInt(currentJobId));
        localStorage.setItem('jobPortalUsers', JSON.stringify(users));
        
        // Update current user session
        authManager.currentUser.savedJobs = users[userIndex].savedJobs;
        localStorage.setItem('currentUser', JSON.stringify(authManager.currentUser));
        
        // Update UI
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        saveButton.innerHTML = '<i class="fa-regular fa-heart"></i> Save Job';
        saveButton.classList.remove('btn-danger');
        saveButton.classList.add('btn-outline-danger');
        
        showNotification('Job removed from saved list', 'info');
    }
}

// Apply for Job Functionality
function applyForJob() {
    if (!authManager.isLoggedIn()) {
        showNotification('Please login to apply for this job', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html?returnUrl=' + encodeURIComponent(window.location.href);
        }, 2000);
        return;
    }
    
    // Show application modal
    showApplicationModal();
}

// Show Application Modal
function showApplicationModal() {
    const modalHTML = `
        <div class="modal fade" id="applicationModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Apply for Senior Software Developer</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="applicationForm">
                            <div class="mb-3">
                                <label class="form-label">Cover Letter *</label>
                                <textarea class="form-control" rows="5" required 
                                    placeholder="Write a brief cover letter explaining why you're interested in this position..."></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Resume/CV *</label>
                                <input type="file" class="form-control" accept=".pdf,.doc,.docx" required>
                                <small class="text-muted">Accepted formats: PDF, DOC, DOCX (Max 5MB)</small>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Portfolio URL (Optional)</label>
                                <input type="url" class="form-control" placeholder="https://yourportfolio.com">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Expected Salary</label>
                                <input type="number" class="form-control" placeholder="80000">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Available Start Date</label>
                                <input type="date" class="form-control">
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="agreeTerms" required>
                                <label class="form-check-label" for="agreeTerms">
                                    I agree to the <a href="terms.html" target="_blank">Terms & Conditions</a>
                                </label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn text-light" style="background-color:#F03737;" onclick="submitApplication()">
                            Submit Application
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page if it doesn't exist
    if (!document.getElementById('applicationModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('applicationModal'));
    modal.show();
}

// Submit Application
function submitApplication() {
    const form = document.getElementById('applicationForm');
    const coverLetter = form.querySelector('textarea').value.trim();
    const resume = form.querySelector('input[type="file"]').files[0];
    const agreeTerms = form.querySelector('#agreeTerms').checked;
    
    // Validate form
    if (!coverLetter) {
        showNotification('Please write a cover letter', 'error');
        return;
    }
    
    if (!resume) {
        showNotification('Please upload your resume', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showNotification('Please agree to the terms and conditions', 'error');
        return;
    }
    
    // Simulate application submission
    const submitButton = document.querySelector('button[onclick="submitApplication()"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('applicationModal'));
        modal.hide();
        
        // Show success message
        showNotification('Application submitted successfully! You will receive a confirmation email shortly.', 'success');
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Save application using auth manager
        const currentJobId = getCurrentJobId();
        const applicationData = {
            coverLetter: coverLetter,
            resumeFileName: resume.name,
            portfolioUrl: form.querySelector('input[type="url"]').value,
            expectedSalary: form.querySelector('input[type="number"]').value,
            startDate: form.querySelector('input[type="date"]').value
        };
        
        try {
            authManager.applyForJob(parseInt(currentJobId), applicationData);
            
            // Update apply button to show applied state
            const applyButton = document.querySelector('button[onclick="applyForJob()"]');
            if (applyButton) {
                applyButton.innerHTML = '<i class="fa-solid fa-check"></i> Applied';
                applyButton.classList.remove('btn-primary');
                applyButton.classList.add('btn-success');
                applyButton.disabled = true;
            }
        } catch (error) {
            showNotification(error.message, 'error');
            return;
        }
        
    }, 2000);
}

// Load Similar Jobs
function loadSimilarJobs() {
    const similarJobsContainer = document.querySelector('.card-body h5[style*="color:#F03737"]');
    if (similarJobsContainer && similarJobsContainer.textContent === 'Similar Jobs') {
        const currentJobId = getCurrentJobId();
        const currentJob = getJobById(parseInt(currentJobId));
        
        if (currentJob) {
            // Get similar jobs from same category
            const similarJobs = getJobsByCategory(currentJob.category)
                .filter(job => job.id !== currentJob.id)
                .slice(0, 3);
            
            const container = similarJobsContainer.parentElement;
            
            // Clear existing content except title
            const title = container.querySelector('h5');
            container.innerHTML = '';
            container.appendChild(title);
            
            // Add similar jobs
            similarJobs.forEach(job => {
                const jobElement = document.createElement('div');
                jobElement.className = 'border-bottom pb-3 mb-3';
                jobElement.style.cursor = 'pointer';
                jobElement.innerHTML = `
                    <h6 class="mb-1">${job.title}</h6>
                    <small class="text-muted">${job.company} • ${job.location} • ${job.salary}</small>
                `;
                
                jobElement.addEventListener('click', function() {
                    viewJobDetails(job.id);
                });
                
                container.appendChild(jobElement);
            });
            
            // Add view all jobs button
            const viewAllBtn = document.createElement('a');
            viewAllBtn.href = 'job.html';
            viewAllBtn.className = 'btn btn-outline-secondary w-100';
            viewAllBtn.textContent = 'View All Jobs';
            container.appendChild(viewAllBtn);
        }
    }
}

function viewJobDetails(jobId) {
    localStorage.setItem('currentJobId', jobId);
    window.location.href = `job-details.html?id=${jobId}`;
}

// Initialize Job Actions
function initializeJobActions() {
    if (authManager.isLoggedIn()) {
        const savedJobs = authManager.getSavedJobs();
        const appliedJobs = authManager.getAppliedJobs();
        const currentJobId = parseInt(getCurrentJobId());
        
        // Check if job is already saved
        if (savedJobs.includes(currentJobId)) {
            const saveButton = document.querySelector('button[onclick="saveJob()"]');
            if (saveButton) {
                const icon = saveButton.querySelector('i');
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                saveButton.innerHTML = '<i class="fa-solid fa-heart"></i> Saved';
                saveButton.classList.remove('btn-outline-danger');
                saveButton.classList.add('btn-danger');
            }
        }
        
        // Check if user has already applied for this job
        const hasApplied = appliedJobs.some(app => app.jobId === currentJobId);
        if (hasApplied) {
            const applyButton = document.querySelector('button[onclick="applyForJob()"]');
            if (applyButton) {
                applyButton.innerHTML = '<i class="fa-solid fa-check"></i> Applied';
                applyButton.classList.remove('btn-primary');
                applyButton.classList.add('btn-success');
                applyButton.disabled = true;
            }
        }
    }
    
    // Add share functionality
    addShareButton();
}

// Add Share Button
function addShareButton() {
    const saveButton = document.querySelector('button[onclick="saveJob()"]');
    if (saveButton) {
        const shareButton = document.createElement('button');
        shareButton.className = 'btn btn-outline-primary mb-2 w-100';
        shareButton.innerHTML = '<i class="fa-solid fa-share"></i> Share Job';
        shareButton.onclick = shareJob;
        
        saveButton.parentNode.insertBefore(shareButton, saveButton.nextSibling);
    }
}

// Share Job Functionality
function shareJob() {
    if (navigator.share) {
        navigator.share({
            title: 'Senior Software Developer - TechCorp Solutions',
            text: 'Check out this job opportunity on My Job Gator',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Job link copied to clipboard!', 'success');
        });
    }
}

// Utility Functions
function getCurrentJobId() {
    // Extract job ID from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || localStorage.getItem('currentJobId') || '1';
}

function saveJobToStorage() {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const currentJobId = getCurrentJobId();
    
    if (!savedJobs.includes(currentJobId)) {
        savedJobs.push(currentJobId);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }
}

function removeJobFromStorage() {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const currentJobId = getCurrentJobId();
    const index = savedJobs.indexOf(currentJobId);
    
    if (index > -1) {
        savedJobs.splice(index, 1);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }
}

function saveApplicationToStorage() {
    const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const application = {
        jobId: getCurrentJobId(),
        jobTitle: 'Senior Software Developer',
        company: 'TechCorp Solutions',
        appliedDate: new Date().toISOString(),
        status: 'submitted'
    };
    
    applications.push(application);
    localStorage.setItem('jobApplications', JSON.stringify(applications));
}

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
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}