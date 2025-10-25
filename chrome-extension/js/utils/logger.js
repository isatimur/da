/**
 * Logging Utility
 * Provides structured logging with different levels and debugging capabilities
 */

class Logger {
    constructor() {
        this.levels = {
            ERROR: 0,
            WARN: 1,
            INFO: 2,
            DEBUG: 3,
            TRACE: 4
        };
        
        this.currentLevel = this.levels.INFO;
        this.logs = [];
        this.maxLogs = 1000; // Keep last 1000 logs in memory
        
        this.init();
    }

    init() {
        // Load log level from storage
        this.loadLogLevel();
        
        // Add global error handlers
        window.addEventListener('error', (event) => {
            this.error('Global Error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.error('Unhandled Promise Rejection', {
                reason: event.reason,
                promise: event.promise
            });
        });

        console.log('Logger initialized with level:', this.getLevelName(this.currentLevel));
    }

    /**
     * Log an error message
     * @param {string} message - Error message
     * @param {Object} data - Additional data
     */
    error(message, data = null) {
        this.log('ERROR', message, data);
    }

    /**
     * Log a warning message
     * @param {string} message - Warning message
     * @param {Object} data - Additional data
     */
    warn(message, data = null) {
        this.log('WARN', message, data);
    }

    /**
     * Log an info message
     * @param {string} message - Info message
     * @param {Object} data - Additional data
     */
    info(message, data = null) {
        this.log('INFO', message, data);
    }

    /**
     * Log a debug message
     * @param {string} message - Debug message
     * @param {Object} data - Additional data
     */
    debug(message, data = null) {
        this.log('DEBUG', message, data);
    }

    /**
     * Log a trace message
     * @param {string} message - Trace message
     * @param {Object} data - Additional data
     */
    trace(message, data = null) {
        this.log('TRACE', message, data);
    }

    /**
     * Internal logging method
     * @param {string} level - Log level
     * @param {string} message - Log message
     * @param {Object} data - Additional data
     */
    log(level, message, data = null) {
        const levelValue = this.levels[level];
        
        if (levelValue > this.currentLevel) {
            return; // Skip if level is too high
        }

        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            data,
            stack: level === 'ERROR' ? new Error().stack : null
        };

        // Add to memory logs
        this.logs.push(logEntry);
        if (this.logs.length > this.maxLogs) {
            this.logs.shift(); // Remove oldest log
        }

        // Console output with styling
        const style = this.getConsoleStyle(level);
        const prefix = `[${timestamp}] [${level}]`;
        
        if (data) {
            console.log(`%c${prefix} ${message}`, style, data);
        } else {
            console.log(`%c${prefix} ${message}`, style);
        }

        // Store critical errors
        if (level === 'ERROR') {
            this.storeError(logEntry);
        }
    }

    /**
     * Get console style for log level
     * @param {string} level - Log level
     * @returns {string} CSS style string
     */
    getConsoleStyle(level) {
        const styles = {
            ERROR: 'color: #ef4444; font-weight: bold;',
            WARN: 'color: #f59e0b; font-weight: bold;',
            INFO: 'color: #3b82f6;',
            DEBUG: 'color: #10b981;',
            TRACE: 'color: #6b7280;'
        };
        return styles[level] || '';
    }

    /**
     * Set the current log level
     * @param {string} level - Log level name
     */
    setLevel(level) {
        if (this.levels.hasOwnProperty(level)) {
            this.currentLevel = this.levels[level];
            chrome.storage.local.set({ logLevel: level });
            console.log(`Log level set to: ${level}`);
        }
    }

    /**
     * Get current log level name
     * @returns {string} Current log level name
     */
    getLevelName() {
        return Object.keys(this.levels).find(key => this.levels[key] === this.currentLevel);
    }

    /**
     * Load log level from storage
     */
    async loadLogLevel() {
        try {
            const { logLevel } = await chrome.storage.local.get(['logLevel']);
            if (logLevel && this.levels.hasOwnProperty(logLevel)) {
                this.currentLevel = this.levels[logLevel];
            }
        } catch (error) {
            console.error('Failed to load log level:', error);
        }
    }

    /**
     * Store error in chrome storage for debugging
     * @param {Object} logEntry - Log entry object
     */
    async storeError(logEntry) {
        try {
            const { errors = [] } = await chrome.storage.local.get(['errors']);
            errors.push(logEntry);
            
            // Keep only last 50 errors
            if (errors.length > 50) {
                errors.splice(0, errors.length - 50);
            }
            
            await chrome.storage.local.set({ errors });
        } catch (error) {
            console.error('Failed to store error:', error);
        }
    }

    /**
     * Get all logs
     * @returns {Array} Array of log entries
     */
    getLogs() {
        return [...this.logs];
    }

    /**
     * Clear all logs
     */
    clearLogs() {
        this.logs = [];
        console.log('Logs cleared');
    }

    /**
     * Export logs as JSON
     * @returns {string} JSON string of logs
     */
    exportLogs() {
        return JSON.stringify(this.logs, null, 2);
    }

    /**
     * Get stored errors
     * @returns {Promise<Array>} Array of stored errors
     */
    async getStoredErrors() {
        try {
            const { errors = [] } = await chrome.storage.local.get(['errors']);
            return errors;
        } catch (error) {
            console.error('Failed to get stored errors:', error);
            return [];
        }
    }

    /**
     * Clear stored errors
     */
    async clearStoredErrors() {
        try {
            await chrome.storage.local.remove(['errors']);
            console.log('Stored errors cleared');
        } catch (error) {
            console.error('Failed to clear stored errors:', error);
        }
    }

    /**
     * Create a performance timer
     * @param {string} label - Timer label
     * @returns {Function} End timer function
     */
    time(label) {
        const start = performance.now();
        return () => {
            const duration = performance.now() - start;
            this.debug(`Timer: ${label}`, { duration: `${duration.toFixed(2)}ms` });
            return duration;
        };
    }
}

// Create global instance
const logger = new Logger();

// Make logger available globally for debugging
window.logger = logger;

export default logger;
