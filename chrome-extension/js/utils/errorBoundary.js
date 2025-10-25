/**
 * Error Boundary System
 * Provides comprehensive error handling and recovery mechanisms
 */

import logger from './logger.js';
import loadingManager from './loading.js';

class ErrorBoundary {
    constructor() {
        this.errorCounts = new Map();
        this.maxRetries = 3;
        this.retryDelays = [1000, 2000, 5000]; // Progressive delays
        this.circuitBreakerThreshold = 5;
        this.circuitBreakerTimeout = 30000; // 30 seconds
        this.circuitBreakers = new Map();
    }

    /**
     * Wrap a function with error boundary
     * @param {Function} fn - Function to wrap
     * @param {Object} options - Error boundary options
     * @returns {Function} Wrapped function
     */
    wrap(fn, options = {}) {
        const {
            context = 'Unknown',
            fallback = null,
            retry = false,
            silent = false
        } = options;

        return async (...args) => {
            try {
                return await fn(...args);
            } catch (error) {
                return this.handleError(error, {
                    context,
                    fallback,
                    retry,
                    silent,
                    args
                });
            }
        };
    }

    /**
     * Handle errors with comprehensive recovery
     * @param {Error} error - The error to handle
     * @param {Object} options - Error handling options
     */
    async handleError(error, options = {}) {
        const {
            context = 'Unknown',
            fallback = null,
            retry = false,
            silent = false,
            args = []
        } = options;

        // Log the error
        if (!silent) {
            logger.error(`Error in ${context}`, {
                message: error.message,
                stack: error.stack,
                context,
                args: args.length
            });
        }

        // Track error frequency
        this.trackError(context);

        // Check circuit breaker
        if (this.isCircuitOpen(context)) {
            logger.warn(`Circuit breaker open for ${context}`);
            return this.executeFallback(fallback, context);
        }

        // Attempt retry if enabled
        if (retry && this.shouldRetry(context)) {
            return this.attemptRetry(fn, args, context, options);
        }

        // Execute fallback
        return this.executeFallback(fallback, context);
    }

    /**
     * Track error frequency for circuit breaker
     * @param {string} context - Error context
     */
    trackError(context) {
        const now = Date.now();
        const errors = this.errorCounts.get(context) || [];
        
        // Remove errors older than 1 minute
        const recentErrors = errors.filter(time => now - time < 60000);
        recentErrors.push(now);
        
        this.errorCounts.set(context, recentErrors);
    }

    /**
     * Check if circuit breaker is open
     * @param {string} context - Error context
     * @returns {boolean} True if circuit is open
     */
    isCircuitOpen(context) {
        const errors = this.errorCounts.get(context) || [];
        const recentErrors = errors.filter(time => Date.now() - time < 60000);
        
        return recentErrors.length >= this.circuitBreakerThreshold;
    }

    /**
     * Check if function should retry
     * @param {string} context - Error context
     * @returns {boolean} True if should retry
     */
    shouldRetry(context) {
        const errors = this.errorCounts.get(context) || [];
        return errors.length < this.maxRetries;
    }

    /**
     * Attempt to retry a failed function
     * @param {Function} fn - Function to retry
     * @param {Array} args - Function arguments
     * @param {string} context - Error context
     * @param {Object} options - Retry options
     */
    async attemptRetry(fn, args, context, options) {
        const retryCount = this.errorCounts.get(context)?.length || 0;
        const delay = this.retryDelays[Math.min(retryCount - 1, this.retryDelays.length - 1)];
        
        logger.info(`Retrying ${context} in ${delay}ms (attempt ${retryCount + 1})`);
        
        await this.delay(delay);
        
        try {
            return await fn(...args);
        } catch (error) {
            return this.handleError(error, options);
        }
    }

    /**
     * Execute fallback function
     * @param {Function} fallback - Fallback function
     * @param {string} context - Error context
     */
    async executeFallback(fallback, context) {
        if (typeof fallback === 'function') {
            try {
                logger.info(`Executing fallback for ${context}`);
                return await fallback();
            } catch (fallbackError) {
                logger.error(`Fallback failed for ${context}`, {
                    error: fallbackError.message
                });
            }
        }
        
        return null;
    }

    /**
     * Create a delay
     * @param {number} ms - Delay in milliseconds
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Reset error tracking for a context
     * @param {string} context - Context to reset
     */
    resetContext(context) {
        this.errorCounts.delete(context);
        logger.info(`Reset error tracking for ${context}`);
    }

    /**
     * Get error statistics
     * @returns {Object} Error statistics
     */
    getErrorStats() {
        const stats = {};
        this.errorCounts.forEach((errors, context) => {
            stats[context] = {
                totalErrors: errors.length,
                recentErrors: errors.filter(time => Date.now() - time < 60000).length,
                isCircuitOpen: this.isCircuitOpen(context)
            };
        });
        return stats;
    }

    /**
     * Create a resilient API wrapper
     * @param {Function} apiCall - API function to wrap
     * @param {Object} options - Wrapper options
     */
    createResilientAPI(apiCall, options = {}) {
        const {
            context = 'API Call',
            fallbackData = null,
            retry = true,
            timeout = 10000
        } = options;

        return this.wrap(async (...args) => {
            // Add timeout
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Request timeout')), timeout);
            });

            const apiPromise = apiCall(...args);
            
            return Promise.race([apiPromise, timeoutPromise]);
        }, {
            context,
            fallback: () => fallbackData,
            retry,
            silent: false
        });
    }

    /**
     * Create a resilient service wrapper
     * @param {Object} service - Service object to wrap
     * @param {Array} methods - Methods to wrap
     * @param {Object} options - Wrapper options
     */
    wrapService(service, methods = [], options = {}) {
        const wrappedService = { ...service };
        
        methods.forEach(methodName => {
            if (typeof service[methodName] === 'function') {
                wrappedService[methodName] = this.wrap(service[methodName], {
                    context: `${service.constructor?.name || 'Service'}.${methodName}`,
                    ...options
                });
            }
        });
        
        return wrappedService;
    }

    /**
     * Handle global errors
     */
    setupGlobalErrorHandling() {
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            logger.error('Unhandled Promise Rejection', {
                reason: event.reason,
                promise: event.promise
            });
            
            // Prevent default browser behavior
            event.preventDefault();
        });

        // Global JavaScript errors
        window.addEventListener('error', (event) => {
            logger.error('Global JavaScript Error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
        });

        logger.info('Global error handling setup complete');
    }
}

// Create global instance
const errorBoundary = new ErrorBoundary();

// Setup global error handling
errorBoundary.setupGlobalErrorHandling();

export default errorBoundary;
