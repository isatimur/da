/**
 * Breathing Sounds Service
 * Provides audio feedback for breathing exercises
 */

import logger from '../utils/logger.js';

class BreathingSoundsService {
    constructor() {
        this.isEnabled = true;
        this.volume = 0.5;
        this.audioContext = null;
        this.sounds = {
            inhale: null,
            exhale: null,
            hold: null,
            phaseChange: null
        };
        
        this.init();
    }

    /**
     * Initialize the sounds service
     */
    async init() {
        try {
            // Check if audio is supported
            if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
                this.audioContext = new (AudioContext || webkitAudioContext)();
                this.createSounds();
                logger.debug('Breathing sounds service initialized');
            } else {
                logger.warn('Web Audio API not supported, sounds disabled');
                this.isEnabled = false;
            }
        } catch (error) {
            logger.error('Failed to initialize breathing sounds', { error: error.message });
            this.isEnabled = false;
        }
    }

    /**
     * Create synthetic sounds using Web Audio API
     */
    createSounds() {
        if (!this.audioContext) return;

        // Create inhale sound (ascending tone)
        this.sounds.inhale = this.createTone(220, 440, 0.3); // A3 to A4
        
        // Create exhale sound (descending tone)
        this.sounds.exhale = this.createTone(440, 220, 0.3); // A4 to A3
        
        // Create hold sound (steady tone)
        this.sounds.hold = this.createTone(330, 330, 0.2); // E4 steady
        
        // Create phase change sound (short beep)
        this.sounds.phaseChange = this.createTone(660, 660, 0.1); // E5 short
    }

    /**
     * Create a tone with frequency sweep
     * @param {number} startFreq - Starting frequency in Hz
     * @param {number} endFreq - Ending frequency in Hz
     * @param {number} duration - Duration in seconds
     * @returns {Function} Function to play the sound
     */
    createTone(startFreq, endFreq, duration) {
        return () => {
            if (!this.isEnabled || !this.audioContext) return;

            try {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                // Set frequency
                oscillator.frequency.setValueAtTime(startFreq, this.audioContext.currentTime);
                
                // If frequencies are different, create a sweep
                if (startFreq !== endFreq) {
                    oscillator.frequency.exponentialRampToValueAtTime(
                        endFreq, 
                        this.audioContext.currentTime + duration
                    );
                }
                
                // Set volume envelope
                gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
                
                // Set waveform
                oscillator.type = 'sine';
                
                // Play the sound
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + duration);
                
            } catch (error) {
                logger.warn('Failed to play breathing sound', { error: error.message });
            }
        };
    }

    /**
     * Play sound for a specific breathing phase
     * @param {string} phase - Phase type ('inhale', 'exhale', 'hold', 'hold_after_exhale')
     */
    playPhaseSound(phase) {
        if (!this.isEnabled) return;

        switch (phase) {
            case 'inhale':
                this.sounds.inhale?.();
                break;
            case 'exhale':
                this.sounds.exhale?.();
                break;
            case 'hold':
            case 'hold_after_exhale':
                this.sounds.hold?.();
                break;
            default:
                this.sounds.phaseChange?.();
                break;
        }
    }

    /**
     * Play phase change notification sound
     */
    playPhaseChangeSound() {
        if (this.isEnabled) {
            this.sounds.phaseChange?.();
        }
    }

    /**
     * Enable or disable sounds
     * @param {boolean} enabled - Whether sounds should be enabled
     */
    setEnabled(enabled) {
        this.isEnabled = enabled;
        logger.debug('Breathing sounds enabled', { enabled });
    }

    /**
     * Set volume level
     * @param {number} volume - Volume level (0.0 to 1.0)
     */
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        logger.debug('Breathing sounds volume set', { volume: this.volume });
    }

    /**
     * Check if sounds are enabled
     * @returns {boolean} Whether sounds are enabled
     */
    isSoundsEnabled() {
        return this.isEnabled;
    }

    /**
     * Get current volume
     * @returns {number} Current volume level
     */
    getVolume() {
        return this.volume;
    }

    /**
     * Resume audio context if suspended
     */
    async resumeAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
                logger.debug('Audio context resumed');
            } catch (error) {
                logger.warn('Failed to resume audio context', { error: error.message });
            }
        }
    }

    /**
     * Cleanup and destroy the service
     */
    destroy() {
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        
        this.sounds = {};
        this.isEnabled = false;
        
        logger.debug('Breathing sounds service destroyed');
    }
}

// Create global instance
const breathingSoundsService = new BreathingSoundsService();

export default breathingSoundsService;
