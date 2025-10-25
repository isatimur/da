/**
 * Resilient API Service
 * Handles API calls with retry logic, circuit breakers, and fallbacks
 */

import logger from './logger.js';
import errorBoundary from './errorBoundary.js';

class ResilientAPIService {
    constructor() {
        this.defaultConfig = {
            timeout: 10000,
            retries: 3,
            retryDelay: 1000,
            retryMultiplier: 2,
            circuitBreakerThreshold: 5,
            circuitBreakerTimeout: 30000
        };
        
        this.circuitBreakers = new Map();
        this.requestCounts = new Map();
    }

    /**
     * Make a resilient API call
     * @param {string} url - API endpoint URL
     * @param {Object} options - Fetch options
     * @param {Object} config - Resilient config
     * @returns {Promise<any>} API response
     */
    async call(url, options = {}, config = {}) {
        const finalConfig = { ...this.defaultConfig, ...config };
        const circuitKey = this.getCircuitKey(url);
        
        // Check circuit breaker
        if (this.isCircuitOpen(circuitKey)) {
            logger.warn(`Circuit breaker open for ${url}`);
            throw new Error(`Service temporarily unavailable: ${url}`);
        }

        return this.executeWithRetry(url, options, finalConfig, circuitKey);
    }

    /**
     * Execute API call with retry logic
     * @param {string} url - API endpoint URL
     * @param {Object} options - Fetch options
     * @param {Object} config - Retry config
     * @param {string} circuitKey - Circuit breaker key
     * @returns {Promise<any>} API response
     */
    async executeWithRetry(url, options, config, circuitKey) {
        let lastError;
        
        for (let attempt = 0; attempt <= config.retries; attempt++) {
            try {
                logger.debug(`API call attempt ${attempt + 1} for ${url}`);
                
                const response = await this.makeRequest(url, options, config.timeout);
                
                // Success - reset circuit breaker
                this.resetCircuitBreaker(circuitKey);
                this.trackSuccess(circuitKey);
                
                return response;
                
            } catch (error) {
                lastError = error;
                this.trackFailure(circuitKey);
                
                logger.warn(`API call attempt ${attempt + 1} failed for ${url}`, {
                    error: error.message,
                    attempt: attempt + 1,
                    maxRetries: config.retries + 1
                });
                
                // Don't retry on last attempt
                if (attempt === config.retries) {
                    break;
                }
                
                // Calculate delay for next attempt
                const delay = config.retryDelay * Math.pow(config.retryMultiplier, attempt);
                logger.debug(`Waiting ${delay}ms before retry`);
                await this.delay(delay);
            }
        }
        
        // All retries failed
        throw lastError;
    }

    /**
     * Make a single API request with timeout
     * @param {string} url - API endpoint URL
     * @param {Object} options - Fetch options
     * @param {number} timeout - Request timeout
     * @returns {Promise<any>} API response
     */
    async makeRequest(url, options, timeout) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text();
            
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error(`Request timeout after ${timeout}ms`);
            }
            
            throw error;
        }
    }

    /**
     * Get circuit breaker key for URL
     * @param {string} url - API endpoint URL
     * @returns {string} Circuit breaker key
     */
    getCircuitKey(url) {
        try {
            const urlObj = new URL(url);
            return `${urlObj.hostname}${urlObj.pathname}`;
        } catch {
            return url;
        }
    }

    /**
     * Check if circuit breaker is open
     * @param {string} circuitKey - Circuit breaker key
     * @returns {boolean} True if circuit is open
     */
    isCircuitOpen(circuitKey) {
        const breaker = this.circuitBreakers.get(circuitKey);
        if (!breaker) return false;
        
        const now = Date.now();
        if (now - breaker.lastFailureTime > breaker.timeout) {
            // Circuit breaker timeout expired
            this.circuitBreakers.delete(circuitKey);
            return false;
        }
        
        return breaker.failureCount >= breaker.threshold;
    }

    /**
     * Track successful request
     * @param {string} circuitKey - Circuit breaker key
     */
    trackSuccess(circuitKey) {
        const breaker = this.circuitBreakers.get(circuitKey);
        if (breaker) {
            breaker.failureCount = Math.max(0, breaker.failureCount - 1);
        }
    }

    /**
     * Track failed request
     * @param {string} circuitKey - Circuit breaker key
     */
    trackFailure(circuitKey) {
        const breaker = this.circuitBreakers.get(circuitKey) || {
            failureCount: 0,
            lastFailureTime: 0,
            threshold: this.defaultConfig.circuitBreakerThreshold,
            timeout: this.defaultConfig.circuitBreakerTimeout
        };
        
        breaker.failureCount++;
        breaker.lastFailureTime = Date.now();
        
        this.circuitBreakers.set(circuitKey, breaker);
    }

    /**
     * Reset circuit breaker
     * @param {string} circuitKey - Circuit breaker key
     */
    resetCircuitBreaker(circuitKey) {
        this.circuitBreakers.delete(circuitKey);
    }

    /**
     * Create a delay
     * @param {number} ms - Delay in milliseconds
     * @returns {Promise<void>}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get API service status
     * @returns {Object} Service status
     */
    getStatus() {
        const status = {};
        this.circuitBreakers.forEach((breaker, key) => {
            status[key] = {
                failureCount: breaker.failureCount,
                threshold: breaker.threshold,
                isOpen: this.isCircuitOpen(key),
                lastFailureTime: breaker.lastFailureTime
            };
        });
        return status;
    }

    /**
     * Reset all circuit breakers
     */
    resetAllCircuitBreakers() {
        this.circuitBreakers.clear();
        logger.info('All circuit breakers reset');
    }

    /**
     * Create a resilient API wrapper for a specific service
     * @param {string} baseUrl - Base URL for the service
     * @param {Object} defaultOptions - Default fetch options
     * @param {Object} config - Resilient config
     * @returns {Object} API wrapper object
     */
    createServiceWrapper(baseUrl, defaultOptions = {}, config = {}) {
        return {
            get: (path, options = {}) => this.call(
                `${baseUrl}${path}`,
                { ...defaultOptions, ...options, method: 'GET' },
                config
            ),
            
            post: (path, data, options = {}) => this.call(
                `${baseUrl}${path}`,
                {
                    ...defaultOptions,
                    ...options,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...defaultOptions.headers,
                        ...options.headers
                    },
                    body: JSON.stringify(data)
                },
                config
            ),
            
            put: (path, data, options = {}) => this.call(
                `${baseUrl}${path}`,
                {
                    ...defaultOptions,
                    ...options,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        ...defaultOptions.headers,
                        ...options.headers
                    },
                    body: JSON.stringify(data)
                },
                config
            ),
            
            delete: (path, options = {}) => this.call(
                `${baseUrl}${path}`,
                { ...defaultOptions, ...options, method: 'DELETE' },
                config
            )
        };
    }
}

// Create global instance
const resilientAPI = new ResilientAPIService();

export default resilientAPI;
