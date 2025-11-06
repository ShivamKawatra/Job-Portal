// Dashboard Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!authManager.isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    loadDashboardData();
});

function loadDashboardData() {
    const user = authManager.getCurrentUser();
    
    // Update welcome message
    document.getElementById('welcomeMessage').textContent = `Welcome back, ${user.fullName}!`;
    
    // Update profile information
    document.getElementById('profileName').value = user.fullName;
    document.getElementById('profileEmail').value = user.email;
    document.getElementById('memberSince').value = new Date(user.registeredDate).toLocaleDateString();
    
    // Load applied jobs
    loadAppliedJobs();
    
    // Load saved jobs
    loadSavedJobs();
    
    // Update stats
    updateStats();
}

function loadAppliedJobs() {
    const appliedJobs = authManager.getAppliedJobs();
    const container = document.getElementById('appliedJobsList');
    
    if (appliedJobs.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">No job applications yet. <a href="job.html">Browse jobs</a> to get started!</p>';
        return;
    }
    
    container.innerHTML = '';
    
    appliedJobs.forEach(application => {
        const job = getJobById(application.jobId);
        if (job) {
            const jobElement = createAppliedJobCard(job, application);
            container.appendChild(jobElement);
        }
    });
}

function loadSavedJobs() {
    const savedJobIds = authManager.getSavedJobs();
    const container = document.getElementById('savedJobsList');
    
    if (savedJobIds.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">No saved jobs yet. <a href="job.html">Browse jobs</a> and save your favorites!</p>';
        return;
    }
    
    container.innerHTML = '';
    
    savedJobIds.forEach(jobId => {
        const job = getJobById(jobId);
        if (job) {
            const jobElement = createSavedJobCard(job);
            container.appendChild(jobElement);
        }
    });
}

function createAppliedJobCard(job, application) {
    const div = document.createElement('div');
    div.className = 'border-bottom pb-3 mb-3';
    
    const statusColor = {
        'Applied': 'primary',
        'Under Review': 'warning',
        'Interview': 'info',
        'Rejected': 'danger',
        'Hired': 'success'
    };
    
    div.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-8">
                <h6 class="mb-1">${job.title}</h6>
                <p class="text-muted mb-1">${job.company} • ${job.location}</p>
                <small class="text-muted">Applied on: ${new Date(application.appliedDate).toLocaleDateString()}</small>
            </div>
            <div class="col-md-4 text-end">
                <span class="badge bg-${statusColor[application.status] || 'primary'}">${application.status}</span>
                <br>
                <a href="job-details.html?id=${job.id}" class="btn btn-sm btn-outline-primary mt-2">View Job</a>
            </div>
        </div>
    `;
    
    return div;
}

function createSavedJobCard(job) {
    const div = document.createElement('div');
    div.className = 'border-bottom pb-3 mb-3';
    
    div.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-8">
                <h6 class="mb-1">${job.title}</h6>
                <p class="text-muted mb-1">${job.company} • ${job.location}</p>
                <p class="text-success mb-1">${job.salary}</p>
                <small class="text-muted">Posted: ${job.posted}</small>
            </div>
            <div class="col-md-4 text-end">
                <a href="job-details.html?id=${job.id}" class="btn btn-sm btn-primary me-2">View Details</a>
                <button class="btn btn-sm btn-outline-danger" onclick="removeSavedJob(${job.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    return div;
}

function removeSavedJob(jobId) {
    if (confirm('Remove this job from saved jobs?')) {
        const user = authManager.getCurrentUser();
        const users = authManager.getUsers();
        const userIndex = users.findIndex(u => u.id === user.id);
        
        // Remove job from saved jobs
        users[userIndex].savedJobs = users[userIndex].savedJobs.filter(id => id !== jobId);
        localStorage.setItem('jobPortalUsers', JSON.stringify(users));
        
        // Update current user session
        authManager.currentUser.savedJobs = users[userIndex].savedJobs;
        localStorage.setItem('currentUser', JSON.stringify(authManager.currentUser));
        
        // Reload saved jobs
        loadSavedJobs();
        updateStats();
        
        showNotification('Job removed from saved jobs', 'success');
    }
}

function updateStats() {
    const appliedJobs = authManager.getAppliedJobs();
    const savedJobs = authManager.getSavedJobs();
    
    document.getElementById('appliedJobsCount').textContent = appliedJobs.length;
    document.getElementById('savedJobsCount').textContent = savedJobs.length;
    
    // Update navigation icons if they exist
    const savedJobsIcon = document.querySelector('.fa-heart');
    const appliedJobsIcon = document.querySelector('.fa-briefcase');
    
    if (savedJobsIcon && savedJobs.length > 0) {
        const badge = savedJobsIcon.parentElement.querySelector('.badge') || document.createElement('span');
        badge.className = 'badge bg-danger position-absolute top-0 start-100 translate-middle';
        badge.textContent = savedJobs.length;
        badge.style.fontSize = '0.7em';
        if (!savedJobsIcon.parentElement.querySelector('.badge')) {
            savedJobsIcon.parentElement.style.position = 'relative';
            savedJobsIcon.parentElement.appendChild(badge);
        }
    }
    
    if (appliedJobsIcon && appliedJobs.length > 0) {
        const badge = appliedJobsIcon.parentElement.querySelector('.badge') || document.createElement('span');
        badge.className = 'badge bg-primary position-absolute top-0 start-100 translate-middle';
        badge.textContent = appliedJobs.length;
        badge.style.fontSize = '0.7em';
        if (!appliedJobsIcon.parentElement.querySelector('.badge')) {
            appliedJobsIcon.parentElement.style.position = 'relative';
            appliedJobsIcon.parentElement.appendChild(badge);
        }
    }
}

function updateProfile() {
    const bioTextarea = document.querySelector('#profile textarea');
    const bio = bioTextarea ? bioTextarea.value.trim() : '';
    
    // Update user profile in localStorage
    const user = authManager.getCurrentUser();
    const users = authManager.getUsers();
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
        users[userIndex].bio = bio;
        users[userIndex].lastUpdated = new Date().toISOString();
        
        localStorage.setItem('jobPortalUsers', JSON.stringify(users));
        
        // Update current user session
        authManager.currentUser.bio = bio;
        authManager.currentUser.lastUpdated = users[userIndex].lastUpdated;
        localStorage.setItem('currentUser', JSON.stringify(authManager.currentUser));
        
        showNotification('Profile updated successfully!', 'success');
        
        // Immediately update the profile display
        document.getElementById('profileName').value = authManager.currentUser.fullName;
        document.getElementById('profileEmail').value = authManager.currentUser.email;
        document.getElementById('memberSince').value = new Date(authManager.currentUser.registeredDate).toLocaleDateString();
        
        // Update stats to reflect any changes
        updateStats();
    }
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
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
}