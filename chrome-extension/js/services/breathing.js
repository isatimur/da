/**
 * Breathing Service
 * Core breathing timer with precise timing and state management
 */

import breathingPatternsManager from '../utils/breathingPatterns.js';
import logger from '../utils/logger.js';

class BreathingService {
    constructor() {
        this.state = 'idle'; // idle, inhale, hold, exhale, hold_after_exhale, paused
        this.currentPattern = null;
        this.currentPhaseIndex = 0;
        this.currentPhase = null;
        this.phaseStartTime = 0;
        this.phaseProgress = 0; // 0-1
        this.cycleCount = 0;
        this.sessionStartTime = 0;
        this.sessionDuration = 0; // in minutes
        this.isRunning = false;
        this.isPaused = false;
        
        // Timing
        this.timer = null;
        this.animationFrame = null;
        this.lastUpdateTime = 0;
        
        // Event listeners
        this.listeners = new Map();
        
        // Performance tracking
        this.driftCompensation = 0;
        this.expectedNextPhase = 0;
        
        logger.debug('BreathingService initialized');
    }

    /**
     * Start a breathing session
     * @param {string} patternId - Pattern ID to use
     * @param {number} duration - Session duration in minutes
     */
    async startSession(patternId, duration = 5) {
        try {
            const pattern = breathingPatternsManager.getPattern(patternId);
            if (!pattern) {
                throw new Error(`Pattern not found: ${patternId}`);
            }

            this.currentPattern = pattern;
            this.sessionDuration = duration;
            this.sessionStartTime = Date.now();
            this.cycleCount = 0;
            this.currentPhaseIndex = 0;
            this.state = 'inhale';
            this.isRunning = true;
            this.isPaused = false;
            this.driftCompensation = 0;
            
            this.setupCurrentPhase();
            this.startTimer();
            
            this.emit('sessionStarted', {
                pattern: pattern,
                duration: duration,
                startTime: this.sessionStartTime
            });
            
            logger.info('Breathing session started', {
                pattern: pattern.name,
                duration: duration
            });
            
        } catch (error) {
            logger.error('Failed to start breathing session', { error: error.message });
            throw error;
        }
    }

    /**
     * Pause the current session
     */
    pauseSession() {
        if (!this.isRunning || this.isPaused) return;
        
        this.isPaused = true;
        this.state = 'paused';
        this.stopTimer();
        
        this.emit('sessionPaused', {
            cycleCount: this.cycleCount,
            elapsedTime: this.getElapsedTime()
        });
        
        logger.debug('Breathing session paused');
    }

    /**
     * Resume the paused session
     */
    resumeSession() {
        if (!this.isRunning || !this.isPaused) return;
        
        this.isPaused = false;
        this.state = 'inhale';
        this.setupCurrentPhase();
        this.startTimer();
        
        this.emit('sessionResumed', {
            cycleCount: this.cycleCount,
            elapsedTime: this.getElapsedTime()
        });
        
        logger.debug('Breathing session resumed');
    }

    /**
     * Stop the current session
     */
    stopSession() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        this.isPaused = false;
        this.state = 'idle';
        this.stopTimer();
        
        const sessionData = {
            pattern: this.currentPattern,
            duration: this.sessionDuration,
            actualDuration: this.getElapsedTime(),
            cycleCount: this.cycleCount,
            startTime: this.sessionStartTime,
            endTime: Date.now(),
            completed: this.isSessionComplete()
        };
        
        this.emit('sessionStopped', sessionData);
        
        // Reset state
        this.reset();
        
        logger.info('Breathing session stopped', sessionData);
        
        return sessionData;
    }

    /**
     * Setup the current phase
     */
    setupCurrentPhase() {
        if (!this.currentPattern) return;
        
        this.currentPhase = this.currentPattern.phases[this.currentPhaseIndex];
        this.phaseStartTime = Date.now();
        this.phaseProgress = 0;
        this.expectedNextPhase = this.phaseStartTime + (this.currentPhase.duration * 1000);
        
        this.emit('phaseChanged', {
            phase: this.currentPhase,
            phaseIndex: this.currentPhaseIndex,
            cycleCount: this.cycleCount
        });
    }

    /**
     * Move to the next phase
     */
    nextPhase() {
        if (!this.currentPattern) return;
        
        this.currentPhaseIndex++;
        
        // Check if cycle is complete
        if (this.currentPhaseIndex >= this.currentPattern.phases.length) {
            this.cycleCount++;
            this.currentPhaseIndex = 0;
            
            this.emit('cycleCompleted', {
                cycleCount: this.cycleCount,
                elapsedTime: this.getElapsedTime()
            });
            
            // Check if session is complete
            if (this.isSessionComplete()) {
                this.stopSession();
                return;
            }
        }
        
        this.setupCurrentPhase();
    }

    /**
     * Start the breathing timer
     */
    startTimer() {
        this.stopTimer(); // Clear any existing timer
        
        logger.debug('Starting breathing timer', {
            phase: this.currentPhase?.type,
            duration: this.currentPhase?.duration,
            isRunning: this.isRunning
        });
        
        const update = () => {
            if (!this.isRunning || this.isPaused) return;
            
            const now = Date.now();
            const elapsed = now - this.phaseStartTime;
            const phaseDuration = this.currentPhase.duration * 1000;
            
            // Calculate progress
            this.phaseProgress = Math.min(elapsed / phaseDuration, 1);
            
            // Emit progress update
            this.emit('progressUpdate', {
                phase: this.currentPhase,
                progress: this.phaseProgress,
                elapsed: elapsed,
                remaining: phaseDuration - elapsed
            });
            
            // Check if phase is complete
            if (elapsed >= phaseDuration) {
                this.nextPhase();
            }
            
            // Schedule next update
            this.animationFrame = requestAnimationFrame(update);
        };
        
        // Start the timer with precise timing
        this.timer = setTimeout(() => {
            this.expectedNextPhase = Date.now() + (this.currentPhase.duration * 1000);
            // Start the animation loop
            this.animationFrame = requestAnimationFrame(update);
        }, 0);
    }

    /**
     * Stop the breathing timer
     */
    stopTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    /**
     * Check if session is complete
     * @returns {boolean}
     */
    isSessionComplete() {
        const elapsedMinutes = this.getElapsedTime() / (1000 * 60);
        return elapsedMinutes >= this.sessionDuration;
    }

    /**
     * Get elapsed time in milliseconds
     * @returns {number}
     */
    getElapsedTime() {
        return Date.now() - this.sessionStartTime;
    }

    /**
     * Get remaining time in milliseconds
     * @returns {number}
     */
    getRemainingTime() {
        const elapsed = this.getElapsedTime();
        const total = this.sessionDuration * 60 * 1000;
        return Math.max(0, total - elapsed);
    }

    /**
     * Get session progress (0-1)
     * @returns {number}
     */
    getSessionProgress() {
        const elapsed = this.getElapsedTime();
        const total = this.sessionDuration * 60 * 1000;
        return Math.min(elapsed / total, 1);
    }

    /**
     * Get current session data
     * @returns {Object}
     */
    getSessionData() {
        return {
            isRunning: this.isRunning,
            isPaused: this.isPaused,
            state: this.state,
            pattern: this.currentPattern,
            currentPhase: this.currentPhase,
            phaseIndex: this.currentPhaseIndex,
            phaseProgress: this.phaseProgress,
            cycleCount: this.cycleCount,
            sessionDuration: this.sessionDuration,
            elapsedTime: this.getElapsedTime(),
            remainingTime: this.getRemainingTime(),
            sessionProgress: this.getSessionProgress()
        };
    }

    /**
     * Reset the service to idle state
     */
    reset() {
        this.state = 'idle';
        this.currentPattern = null;
        this.currentPhaseIndex = 0;
        this.currentPhase = null;
        this.phaseStartTime = 0;
        this.phaseProgress = 0;
        this.cycleCount = 0;
        this.sessionStartTime = 0;
        this.sessionDuration = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.driftCompensation = 0;
        this.stopTimer();
    }

    /**
     * Add event listener
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    /**
     * Remove event listener
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    off(event, callback) {
        if (!this.listeners.has(event)) return;
        
        const callbacks = this.listeners.get(event);
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    /**
     * Emit event to listeners
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    emit(event, data) {
        if (!this.listeners.has(event)) return;
        
        const callbacks = this.listeners.get(event);
        callbacks.forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                logger.error(`Error in breathing service event listener for ${event}:`, error);
            }
        });
    }

    /**
     * Get available patterns
     * @returns {Map} Map of pattern ID to pattern
     */
    getAvailablePatterns() {
        return breathingPatternsManager.getAllPatterns();
    }

    /**
     * Get pattern recommendations
     * @param {Object} preferences - User preferences
     * @returns {Array} Recommended patterns
     */
    getPatternRecommendations(preferences = {}) {
        return breathingPatternsManager.getRecommendations(preferences);
    }

    /**
     * Validate session parameters
     * @param {string} patternId - Pattern ID
     * @param {number} duration - Duration in minutes
     * @returns {Object} Validation result
     */
    validateSession(patternId, duration) {
        const errors = [];
        
        if (!patternId) {
            errors.push('Pattern is required');
        } else if (!breathingPatternsManager.getPattern(patternId)) {
            errors.push('Invalid pattern');
        }
        
        if (!duration || typeof duration !== 'number' || duration <= 0) {
            errors.push('Duration must be a positive number');
        } else if (duration > 60) {
            errors.push('Duration cannot exceed 60 minutes');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// Create global instance
const breathingService = new BreathingService();

export default breathingService;
