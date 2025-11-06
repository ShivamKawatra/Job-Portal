// Client-Side Authentication System

// User Management Functions
class AuthManager {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.updateNavigation();
    }

    // Register new user
    register(userData) {
        const users = this.getUsers();
        
        // Check if email already exists
        if (users.find(user => user.email === userData.email)) {
            throw new Error('Email already registered');
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password, // In real app, this would be hashed
            registeredDate: new Date().toISOString(),
            savedJobs: [],
            appliedJobs: []
        };

        users.push(newUser);
        localStorage.setItem('jobPortalUsers', JSON.stringify(users));
        
        return newUser;
    }

    // Login user
    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Set current user session
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;
        this.updateNavigation();
        
        return user;
    }

    // Logout user
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.updateNavigation();
        window.location.href = 'index.html';
    }

    // Get all users
    getUsers() {
        return JSON.parse(localStorage.getItem('jobPortalUsers') || '[]');
    }

    // Get current logged-in user
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser') || 'null');
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Update navigation based on login status
    updateNavigation() {
        // Wait for DOM to be ready
        setTimeout(() => {
            const loginLinks = document.querySelectorAll('a[href="login.html"], a[style*="color:#F03737"][href="login.html"], a[style*="color:#5D61BF"][href="login.html"]');
            const signupLinks = document.querySelectorAll('a[href="register.html"], a[style*="color:#F03737"][href="register.html"], a[style*="color:#5D61BF"][href="register.html"]');

            if (this.isLoggedIn()) {
                // Update login links to show user name
                loginLinks.forEach(link => {
                    if (!link.href.includes('dashboard.html')) {
                        link.textContent = this.currentUser.fullName.split(' ')[0];
                        link.href = 'dashboard.html';
                        link.style.color = '#28a745';
                        link.onclick = null;
                    }
                });

                // Update signup links to logout
                signupLinks.forEach(link => {
                    if (!link.textContent.includes('Logout')) {
                        link.textContent = 'Logout';
                        link.href = '#';
                        link.style.color = '#dc3545';
                        link.onclick = (e) => {
                            e.preventDefault();
                            this.logout();
                        };
                    }
                });
            } else {
                // Reset to default login/signup links
                loginLinks.forEach(link => {
                    if (!link.href.includes('login.html') || link.textContent !== 'Login') {
                        link.textContent = 'Login';
                        link.href = 'login.html';
                        link.style.color = '#F03737';
                        link.onclick = null;
                    }
                });

                signupLinks.forEach(link => {
                    if (!link.href.includes('register.html') || link.textContent !== 'Sign Up') {
                        link.textContent = 'Sign Up';
                        link.href = 'register.html';
                        link.style.color = '#F03737';
                        link.onclick = null;
                    }
                });
            }
        }, 100);
    }

    // Save job for current user
    saveJob(jobId) {
        if (!this.isLoggedIn()) {
            throw new Error('Please login to save jobs');
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (!users[userIndex].savedJobs.includes(jobId)) {
            users[userIndex].savedJobs.push(jobId);
            localStorage.setItem('jobPortalUsers', JSON.stringify(users));
            
            // Update current user session
            this.currentUser.savedJobs = users[userIndex].savedJobs;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
    }

    // Apply for job
    applyForJob(jobId, applicationData) {
        if (!this.isLoggedIn()) {
            throw new Error('Please login to apply for jobs');
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        const application = {
            jobId: jobId,
            appliedDate: new Date().toISOString(),
            status: 'Applied',
            ...applicationData
        };

        users[userIndex].appliedJobs.push(application);
        localStorage.setItem('jobPortalUsers', JSON.stringify(users));
        
        // Update current user session
        this.currentUser.appliedJobs = users[userIndex].appliedJobs;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    // Get user's saved jobs
    getSavedJobs() {
        if (!this.isLoggedIn()) return [];
        return this.currentUser.savedJobs || [];
    }

    // Get user's applied jobs
    getAppliedJobs() {
        if (!this.isLoggedIn()) return [];
        return this.currentUser.appliedJobs || [];
    }
}

// Initialize Auth Manager
const authManager = new AuthManager();

// Form Handlers
document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth.js loaded');
    
    // Check current page and add appropriate handlers
    const currentPage = window.location.href;
    console.log('Current page:', currentPage);
    
    // Login Form Handler
    if (currentPage.includes('login.html')) {
        console.log('Setting up login form handler');
        const loginForm = document.querySelector('form');
        if (loginForm) {
            console.log('Login form found');
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Login form submitted');
                
                const emailInput = this.querySelector('input[type="email"]');
                const passwordInput = this.querySelector('input[type="password"]');
                
                if (!emailInput || !passwordInput) {
                    showNotification('Please fill in all fields', 'error');
                    return;
                }
                
                const email = emailInput.value.trim();
                const password = passwordInput.value;
                
                console.log('Login attempt:', email);
                
                if (!email || !password) {
                    showNotification('Please fill in all fields', 'error');
                    return;
                }
                
                try {
                    authManager.login(email, password);
                    showNotification('Login successful! Welcome back.', 'success');
                    
                    // Redirect to dashboard or return URL
                    const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
                    setTimeout(() => {
                        window.location.href = returnUrl || 'dashboard.html';
                    }, 1500);
                    
                } catch (error) {
                    console.error('Login error:', error);
                    showNotification(error.message, 'error');
                }
            });
        } else {
            console.log('Login form not found');
        }
    }

    // Register Form Handler
    if (currentPage.includes('register.html')) {
        console.log('Setting up register form handler');
        const registerForm = document.querySelector('form');
        if (registerForm) {
            console.log('Register form found');
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Register form submitted');
                
                const fullNameInput = this.querySelector('input[placeholder="Full Name"]');
                const emailInput = this.querySelector('input[type="email"]');
                const passwordInput = this.querySelector('input[placeholder="Password"]');
                const confirmPasswordInput = this.querySelector('input[placeholder="Confirm Password"]');
                
                if (!fullNameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
                    showNotification('Form inputs not found', 'error');
                    return;
                }
                
                const fullName = fullNameInput.value.trim();
                const email = emailInput.value.trim();
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;
                
                console.log('Registration data:', { fullName, email, password: '***' });
                
                if (!fullName || !email || !password || !confirmPassword) {
                    showNotification('Please fill in all fields', 'error');
                    return;
                }
                
                // Validation
                if (password !== confirmPassword) {
                    showNotification('Passwords do not match', 'error');
                    return;
                }
                
                if (password.length < 6) {
                    showNotification('Password must be at least 6 characters', 'error');
                    return;
                }
                
                try {
                    const newUser = authManager.register({ fullName, email, password });
                    console.log('Registration successful:', newUser);
                    showNotification('Registration successful! Please login.', 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                    
                } catch (error) {
                    console.error('Registration error:', error);
                    showNotification(error.message, 'error');
                }
            });
        } else {
            console.log('Register form not found');
        }
    }
});

// Utility function for notifications
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
    }, 5000);
}

// Export for use in other files
window.authManager = authManager;