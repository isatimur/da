/**
 * Loading and Error Handling Utilities
 * Provides loading states, error messages, and user feedback
 */

class LoadingManager {
    constructor() {
        this.activeLoaders = new Set();
    }

    /**
     * Show loading spinner on an element
     * @param {HTMLElement} element - Element to show loading on
     * @param {string} text - Loading text to display
     * @param {boolean} overlay - Whether to show overlay
     */
    showLoading(element, text = 'Loading...', overlay = false) {
        const loaderId = `loader-${Date.now()}-${Math.random()}`;
        
        if (overlay) {
            const overlayEl = document.createElement('div');
            overlayEl.className = 'loading-overlay';
            overlayEl.id = loaderId;
            overlayEl.innerHTML = `
                <div class="loading-spinner large"></div>
                <div class="loading-text">${text}</div>
            `;
            element.style.position = 'relative';
            element.appendChild(overlayEl);
        } else {
            const spinner = document.createElement('div');
            spinner.className = 'loading-spinner';
            spinner.id = loaderId;
            element.appendChild(spinner);
        }
        
        this.activeLoaders.add(loaderId);
        return loaderId;
    }

    /**
     * Hide loading spinner
     * @param {string} loaderId - ID of the loader to hide
     */
    hideLoading(loaderId) {
        const loader = document.getElementById(loaderId);
        if (loader) {
            loader.remove();
            this.activeLoaders.delete(loaderId);
        }
    }

    /**
     * Hide all active loaders
     */
    hideAllLoading() {
        this.activeLoaders.forEach(loaderId => {
            this.hideLoading(loaderId);
        });
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     * @param {string} type - Type of error (error, warning, info)
     * @param {number} duration - Duration to show message (ms)
     */
    showError(message, type = 'error', duration = 5000) {
        const errorEl = document.createElement('div');
        errorEl.className = `error-message error-${type}`;
        errorEl.innerHTML = `
            <div class="error-content">
                <i class="material-icons-round">${this.getErrorIcon(type)}</i>
                <span>${message}</span>
                <button class="error-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="material-icons-round">close</i>
                </button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(errorEl);
        
        // Auto remove after duration
        setTimeout(() => {
            if (errorEl.parentElement) {
                errorEl.remove();
            }
        }, duration);
        
        return errorEl;
    }

    /**
     * Show success message
     * @param {string} message - Success message to display
     * @param {number} duration - Duration to show message (ms)
     */
    showSuccess(message, duration = 3000) {
        return this.showError(message, 'success', duration);
    }

    /**
     * Get appropriate icon for error type
     * @param {string} type - Error type
     * @returns {string} Icon name
     */
    getErrorIcon(type) {
        const icons = {
            error: 'error',
            warning: 'warning',
            info: 'info',
            success: 'check_circle'
        };
        return icons[type] || 'info';
    }

    /**
     * Wrap async function with loading state
     * @param {Function} asyncFn - Async function to wrap
     * @param {HTMLElement} element - Element to show loading on
     * @param {string} loadingText - Loading text
     * @returns {Function} Wrapped function
     */
    withLoading(asyncFn, element, loadingText = 'Loading...') {
        return async (...args) => {
            const loaderId = this.showLoading(element, loadingText);
            try {
                const result = await asyncFn(...args);
                return result;
            } catch (error) {
                this.showError(error.message || 'An error occurred');
                throw error;
            } finally {
                this.hideLoading(loaderId);
            }
        };
    }
}

// Create global instance
const loadingManager = new LoadingManager();

export default loadingManager;
