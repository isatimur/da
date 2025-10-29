/**
 * Breathing Circle Animation Component
 * Handles the visual breathing circle animation
 */

import logger from '../utils/logger.js';
import i18n from '../utils/i18n.js';

class BreathingCircle {
    constructor(container) {
        this.container = container;
        this.circle = null;
        this.phaseText = null;
        this.instructionText = null;
        this.currentPhase = null;
        this.isAnimating = false;
        
        this.init();
    }

    /**
     * Initialize the breathing circle
     */
    init() {
        try {
            this.createCircle();
            this.setupEventListeners();
            logger.debug('Breathing circle initialized');
        } catch (error) {
            logger.error('Failed to initialize breathing circle', { error: error.message });
        }
    }

    /**
     * Create the breathing circle DOM elements
     */
    createCircle() {
        // Create circle container
        const circleContainer = document.createElement('div');
        circleContainer.className = 'breathing-circle-container';
        
        // Create breathing circle
        this.circle = document.createElement('div');
        this.circle.className = 'breathing-circle';
        
        // Create phase text
        this.phaseText = document.createElement('div');
        this.phaseText.className = 'breathing-phase-text';
        this.phaseText.textContent = i18n.t('breathing.ready');
        
        // Create instruction text
        this.instructionText = document.createElement('div');
        this.instructionText.className = 'breathing-instruction';
        this.instructionText.textContent = i18n.t('breathing.clickStart');
        
        // Assemble the circle
        this.circle.appendChild(this.phaseText);
        this.circle.appendChild(this.instructionText);
        circleContainer.appendChild(this.circle);
        
        // Add to container
        this.container.appendChild(circleContainer);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for reduced motion preference changes
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', this.handleMotionPreferenceChange.bind(this));
    }

    /**
     * Update the circle for a new phase
     * @param {Object} phase - Phase data
     * @param {number} progress - Phase progress (0-1)
     */
    updatePhase(phase, progress = 0) {
        if (!this.circle || !phase) return;
        
        this.currentPhase = phase;
        
        // Update circle class for styling
        this.circle.className = 'breathing-circle';
        this.circle.classList.add(phase.type);
        
        // Update phase text
        this.updatePhaseText(phase);
        
        // Update instruction text
        this.updateInstructionText(phase);
        
        // Update animation based on phase
        this.updateAnimation(phase, progress);
        
        logger.debug('Breathing circle phase updated', {
            phase: phase.type,
            progress: progress
        });
    }

    /**
     * Update phase text based on current phase
     * @param {Object} phase - Phase data
     */
    updatePhaseText(phase) {
        if (!this.phaseText) return;
        
        this.phaseText.textContent = i18n.t(`breathing.phases.${phase.type}`);
    }

    /**
     * Update instruction text based on current phase
     * @param {Object} phase - Phase data
     */
    updateInstructionText(phase) {
        if (!this.instructionText) return;
        
        this.instructionText.textContent = i18n.t(`breathing.instructions.${phase.type}`);
    }

    /**
     * Update animation based on phase and progress
     * @param {Object} phase - Phase data
     * @param {number} progress - Phase progress (0-1)
     */
    updateAnimation(phase, progress) {
        if (!this.circle) return;
        
        // Remove existing animation classes
        this.circle.classList.remove('breathing-inhale', 'breathing-exhale', 'breathing-hold');
        
        // Add appropriate animation class and scale based on phase type
        switch (phase.type) {
            case 'inhale':
                this.circle.classList.add('breathing-inhale');
                // Smooth expansion from 1 to 1.3 during inhale
                this.updateScale(1 + (progress * 0.3));
                break;
            case 'exhale':
                this.circle.classList.add('breathing-exhale');
                // Smooth contraction from 1.3 to 1 during exhale
                this.updateScale(1.3 - (progress * 0.3));
                break;
            case 'hold':
            case 'hold_after_exhale':
                this.circle.classList.add('breathing-hold');
                // Gentle pulsing during hold phases
                const pulseIntensity = 0.1;
                this.updateScale(1 + (Math.sin(progress * Math.PI * 2) * pulseIntensity));
                break;
            default:
                // Fallback for any unknown phase types
                this.updateScale(1);
                break;
        }
    }

    /**
     * Update circle scale
     * @param {number} scale - Scale factor
     */
    updateScale(scale) {
        if (!this.circle) return;
        
        this.circle.style.transform = `scale(${scale})`;
    }

    /**
     * Start breathing animation
     */
    startAnimation() {
        this.isAnimating = true;
        this.circle.classList.add('breathing-active');
        logger.debug('Breathing animation started');
    }

    /**
     * Stop breathing animation
     */
    stopAnimation() {
        this.isAnimating = false;
        this.circle.classList.remove('breathing-active', 'breathing-inhale', 'breathing-exhale', 'breathing-hold');
        this.circle.style.transform = 'scale(1)';
        
        // Reset to idle state with translations
        if (this.phaseText) {
            this.phaseText.textContent = i18n.t('breathing.sessionComplete');
        }
        
        if (this.instructionText) {
            this.instructionText.textContent = i18n.t('breathing.sessionCompleteMessage');
        }
        
        logger.debug('Breathing animation stopped');
    }
    
    /**
     * Show completion message
     */
    showCompletion() {
        this.isAnimating = false;
        this.circle.classList.remove('breathing-active', 'breathing-inhale', 'breathing-exhale', 'breathing-hold');
        this.circle.classList.add('breathing-complete');
        this.circle.style.transform = 'scale(1.1)';
        this.circle.style.opacity = '0.95';
        
        // Show completion message with translations
        if (this.phaseText) {
            this.phaseText.textContent = i18n.t('breathing.completeMessage');
        }
        
        if (this.instructionText) {
            this.instructionText.textContent = i18n.t('breathing.wellDoneMessage');
        }
        
        logger.debug('Breathing circle showing completion');
    }

    /**
     * Pause breathing animation
     */
    pauseAnimation() {
        this.isAnimating = false;
        this.circle.classList.remove('breathing-inhale', 'breathing-exhale', 'breathing-hold');
        
        if (this.phaseText) {
            this.phaseText.textContent = i18n.t('common.pause');
        }
        
        if (this.instructionText) {
            this.instructionText.textContent = i18n.t('common.resume');
        }
        
        logger.debug('Breathing animation paused');
    }

    /**
     * Resume breathing animation
     */
    resumeAnimation() {
        this.isAnimating = true;
        this.circle.classList.add('breathing-active');
        
        logger.debug('Breathing animation resumed');
    }

    /**
     * Reset circle to initial state
     */
    reset() {
        this.isAnimating = false;
        this.currentPhase = null;
        
        if (this.circle) {
            this.circle.className = 'breathing-circle';
            this.circle.style.transform = 'scale(1)';
            this.circle.style.opacity = '1';
        }
        
        if (this.phaseText) {
            this.phaseText.textContent = i18n.t('breathing.ready');
        }
        
        if (this.instructionText) {
            this.instructionText.textContent = i18n.t('breathing.clickStart');
        }
        
        logger.debug('Breathing circle reset');
    }

    /**
     * Handle motion preference changes
     * @param {MediaQueryListEvent} event - Media query change event
     */
    handleMotionPreferenceChange(event) {
        if (event.matches) {
            // Reduced motion preferred - disable animations
            this.circle.classList.remove('breathing-inhale', 'breathing-exhale', 'breathing-hold');
            this.circle.style.transform = 'scale(1)';
        } else {
            // Motion allowed - re-enable animations if active
            if (this.isAnimating && this.currentPhase) {
                this.updateAnimation(this.currentPhase, 0);
            }
        }
    }

    /**
     * Update circle size for different screen sizes
     * @param {string} size - Size variant ('small', 'medium', 'large')
     */
    updateSize(size = 'medium') {
        if (!this.circle) return;
        
        const sizes = {
            small: { width: '120px', height: '120px' },
            medium: { width: '200px', height: '200px' },
            large: { width: '300px', height: '300px' }
        };
        
        const sizeConfig = sizes[size] || sizes.medium;
        this.circle.style.width = sizeConfig.width;
        this.circle.style.height = sizeConfig.height;
    }

    /**
     * Update circle colors for different themes
     * @param {string} theme - Theme name
     */
    updateTheme(theme = 'default') {
        if (!this.circle) return;
        
        const themes = {
            default: {
                inhale: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                hold: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                exhale: 'linear-gradient(135deg, #22c55e, #16a34a)',
                hold_after_exhale: 'linear-gradient(135deg, #f59e0b, #d97706)'
            },
            calm: {
                inhale: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                hold: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                exhale: 'linear-gradient(135deg, #10b981, #059669)',
                hold_after_exhale: 'linear-gradient(135deg, #f59e0b, #d97706)'
            },
            energizing: {
                inhale: 'linear-gradient(135deg, #f59e0b, #d97706)',
                hold: 'linear-gradient(135deg, #ef4444, #dc2626)',
                exhale: 'linear-gradient(135deg, #22c55e, #16a34a)',
                hold_after_exhale: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
            }
        };
        
        const themeConfig = themes[theme] || themes.default;
        
        // Update CSS custom properties for theme
        const root = document.documentElement;
        Object.entries(themeConfig).forEach(([phase, gradient]) => {
            root.style.setProperty(`--breathing-${phase}-color`, gradient);
        });
    }

    /**
     * Get current circle state
     * @returns {Object} Current state
     */
    getState() {
        return {
            isAnimating: this.isAnimating,
            currentPhase: this.currentPhase,
            phaseText: this.phaseText?.textContent,
            instructionText: this.instructionText?.textContent
        };
    }

    /**
     * Cleanup and destroy the component
     */
    destroy() {
        if (this.container && this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        
        this.circle = null;
        this.phaseText = null;
        this.instructionText = null;
        this.currentPhase = null;
        this.isAnimating = false;
        
        logger.debug('Breathing circle destroyed');
    }
}

export default BreathingCircle;
