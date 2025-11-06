// Session Management to prevent automatic logout
class SessionManager {
    constructor() {
        this.init();
    }

    init() {
        // Prevent automatic logout by maintaining session
        this.maintainSession();
        
        // Override any existing alert functions that might show backend integration message
        this.overrideAlerts();
        
        // Update navigation on page load
        setTimeout(() => {
            if (window.authManager) {
                window.authManager.updateNavigation();
            }
        }, 500);
    }

    maintainSession() {
        // Check and maintain user session every 30 seconds
        setInterval(() => {
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser && window.authManager) {
                try {
                    const user = JSON.parse(currentUser);
                    if (user && user.id) {
                        // Session is valid, update auth manager
                        window.authManager.currentUser = user;
                        
                        // Update navigation if needed
                        if (!window.authManager.isLoggedIn()) {
                            window.authManager.updateNavigation();
                        }
                    }
                } catch (error) {
                    console.log('Session check error:', error);
                }
            }
        }, 30000); // Check every 30 seconds
    }

    overrideAlerts() {
        // Override any potential alert messages about backend integration
        const originalAlert = window.alert;
        window.alert = function(message) {
            // Block specific alert messages
            if (message && typeof message === 'string') {
                const blockedMessages = [
                    'login functionality will be implemented',
                    'backend integration',
                    'will be implemented with backend',
                    'functionality will be implemented'
                ];
                
                const shouldBlock = blockedMessages.some(blocked => 
                    message.toLowerCase().includes(blocked.toLowerCase())
                );
                
                if (shouldBlock) {
                    console.log('Blocked alert:', message);
                    return; // Don't show the alert
                }
            }
            
            // Show other alerts normally
            originalAlert.call(window, message);
        };
    }

    // Method to ensure user stays logged in across pages
    ensureLoginState() {
        if (window.authManager && window.authManager.isLoggedIn()) {
            const currentUser = window.authManager.getCurrentUser();
            if (currentUser) {
                // Update localStorage to ensure persistence
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Update navigation
                window.authManager.updateNavigation();
                
                return true;
            }
        }
        return false;
    }

    // Method to update profile counts in navigation
    updateProfileCounts() {
        if (window.authManager && window.authManager.isLoggedIn()) {
            const savedJobs = window.authManager.getSavedJobs();
            const appliedJobs = window.authManager.getAppliedJobs();
            
            // Update any profile icons with counts
            this.updateIconBadge('fa-heart', savedJobs.length, 'danger');
            this.updateIconBadge('fa-briefcase', appliedJobs.length, 'primary');
        }
    }

    updateIconBadge(iconClass, count, badgeColor) {
        const icons = document.querySelectorAll(`.${iconClass}`);
        icons.forEach(icon => {
            const parent = icon.parentElement;
            if (parent && count > 0) {
                // Remove existing badge
                const existingBadge = parent.querySelector('.badge');
                if (existingBadge) {
                    existingBadge.remove();
                }
                
                // Add new badge
                if (count > 0) {
                    const badge = document.createElement('span');
                    badge.className = `badge bg-${badgeColor} position-absolute top-0 start-100 translate-middle`;
                    badge.textContent = count;
                    badge.style.fontSize = '0.7em';
                    badge.style.zIndex = '10';
                    
                    parent.style.position = 'relative';
                    parent.appendChild(badge);
                }
            }
        });
    }
}

// Initialize session manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        window.sessionManager = new SessionManager();
        
        // Update profile counts every 5 seconds
        setInterval(() => {
            if (window.sessionManager) {
                window.sessionManager.updateProfileCounts();
            }
        }, 5000);
    }, 1000);
});

// Export for use in other files
window.SessionManager = SessionManager;