/**
 * Breathing Settings Component
 * Manages breathing exercise settings and preferences
 */

import stateManager from '../modules/state.js';
import breathingPatternsManager from '../utils/breathingPatterns.js';
import logger from '../utils/logger.js';

class BreathingSettings {
    constructor() {
        this.settings = {
            defaultPattern: 'box',
            defaultDuration: 5,
            autoStart: false,
            showAnalytics: true,
            theme: 'default'
        };
        
        this.init();
    }

    /**
     * Initialize the breathing settings
     */
    async init() {
        try {
            await this.loadSettings();
            this.setupEventListeners();
            this.updateUI();
            logger.debug('Breathing settings initialized');
        } catch (error) {
            logger.error('Failed to initialize breathing settings', { error: error.message });
        }
    }

    /**
     * Load settings from state manager
     */
    async loadSettings() {
        try {
            const breathingSettings = stateManager.getBreathingSettings();
            this.settings = {
                defaultPattern: breathingSettings.defaultPattern || 'box',
                defaultDuration: breathingSettings.defaultDuration || 5,
                autoStart: breathingSettings.autoStart || false,
                showAnalytics: breathingSettings.showAnalytics !== false,
                theme: breathingSettings.theme || 'default'
            };
        } catch (error) {
            logger.error('Failed to load breathing settings', { error: error.message });
        }
    }

    /**
     * Save settings to state manager
     */
    async saveSettings() {
        try {
            await stateManager.updateBreathingSettings(this.settings);
            logger.debug('Breathing settings saved', this.settings);
        } catch (error) {
            logger.error('Failed to save breathing settings', { error: error.message });
        }
    }

    /**
     * Setup event listeners for settings controls
     */
    setupEventListeners() {
        // Default pattern selector
        const patternSelect = document.getElementById('breathingDefaultPattern');
        if (patternSelect) {
            patternSelect.addEventListener('change', (e) => {
                this.settings.defaultPattern = e.target.value;
                this.saveSettings();
            });
        }

        // Default duration selector
        const durationSelect = document.getElementById('breathingDefaultDuration');
        if (durationSelect) {
            durationSelect.addEventListener('change', (e) => {
                this.settings.defaultDuration = parseInt(e.target.value);
                this.saveSettings();
            });
        }

        // Auto-start checkbox
        const autoStartCheckbox = document.getElementById('breathingAutoStart');
        if (autoStartCheckbox) {
            autoStartCheckbox.addEventListener('change', (e) => {
                this.settings.autoStart = e.target.checked;
                this.saveSettings();
            });
        }

        // Show analytics checkbox
        const analyticsCheckbox = document.getElementById('breathingShowAnalytics');
        if (analyticsCheckbox) {
            analyticsCheckbox.addEventListener('change', (e) => {
                this.settings.showAnalytics = e.target.checked;
                this.saveSettings();
            });
        }

        // Theme selector
        const themeSelect = document.getElementById('breathingTheme');
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                this.settings.theme = e.target.value;
                this.saveSettings();
            });
        }

        // Listen for settings panel visibility changes
        const settingsPanel = document.getElementById('settingsPanel');
        if (settingsPanel) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
                        if (settingsPanel.getAttribute('aria-hidden') === 'false') {
                            this.updateUI();
                        }
                    }
                });
            });
            
            observer.observe(settingsPanel, { attributes: true });
        }
    }

    /**
     * Update UI elements with current settings
     */
    updateUI() {
        // Update pattern selector
        const patternSelect = document.getElementById('breathingDefaultPattern');
        if (patternSelect) {
            patternSelect.value = this.settings.defaultPattern;
        }

        // Update duration selector
        const durationSelect = document.getElementById('breathingDefaultDuration');
        if (durationSelect) {
            durationSelect.value = this.settings.defaultDuration.toString();
        }

        // Update auto-start checkbox
        const autoStartCheckbox = document.getElementById('breathingAutoStart');
        if (autoStartCheckbox) {
            autoStartCheckbox.checked = this.settings.autoStart;
        }

        // Update analytics checkbox
        const analyticsCheckbox = document.getElementById('breathingShowAnalytics');
        if (analyticsCheckbox) {
            analyticsCheckbox.checked = this.settings.showAnalytics;
        }

        // Update theme selector
        const themeSelect = document.getElementById('breathingTheme');
        if (themeSelect) {
            themeSelect.value = this.settings.theme;
        }
    }

    /**
     * Get current settings
     * @returns {Object} Current settings
     */
    getSettings() {
        return { ...this.settings };
    }

    /**
     * Update a specific setting
     * @param {string} key - Setting key
     * @param {*} value - Setting value
     */
    async updateSetting(key, value) {
        if (this.settings.hasOwnProperty(key)) {
            this.settings[key] = value;
            await this.saveSettings();
            this.updateUI();
        }
    }

    /**
     * Reset settings to defaults
     */
    async resetToDefaults() {
        this.settings = {
            defaultPattern: 'box',
            defaultDuration: 5,
            autoStart: false,
            showAnalytics: true,
            theme: 'default'
        };
        
        await this.saveSettings();
        this.updateUI();
        
        logger.info('Breathing settings reset to defaults');
    }

    /**
     * Get default pattern for new sessions
     * @returns {string} Pattern ID
     */
    getDefaultPattern() {
        return this.settings.defaultPattern;
    }

    /**
     * Get default duration for new sessions
     * @returns {number} Duration in minutes
     */
    getDefaultDuration() {
        return this.settings.defaultDuration;
    }

    /**
     * Check if auto-start is enabled
     * @returns {boolean} Auto-start status
     */
    isAutoStartEnabled() {
        return this.settings.autoStart;
    }

    /**
     * Check if analytics should be shown
     * @returns {boolean} Analytics visibility status
     */
    shouldShowAnalytics() {
        return this.settings.showAnalytics;
    }

    /**
     * Get current theme
     * @returns {string} Theme name
     */
    getTheme() {
        return this.settings.theme;
    }

    /**
     * Validate settings
     * @param {Object} settings - Settings to validate
     * @returns {Object} Validation result
     */
    validateSettings(settings) {
        const errors = [];
        
        // Validate pattern
        if (!settings.defaultPattern) {
            errors.push('Default pattern is required');
        } else {
            const pattern = breathingPatternsManager.getPattern(settings.defaultPattern);
            if (!pattern) {
                errors.push('Invalid default pattern');
            }
        }
        
        // Validate duration
        if (!settings.defaultDuration || typeof settings.defaultDuration !== 'number' || settings.defaultDuration <= 0) {
            errors.push('Default duration must be a positive number');
        } else if (settings.defaultDuration > 60) {
            errors.push('Default duration cannot exceed 60 minutes');
        }
        
        // Validate theme
        const validThemes = ['default', 'calm', 'energizing'];
        if (!validThemes.includes(settings.theme)) {
            errors.push('Invalid theme');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Export settings
     * @returns {Object} Exported settings
     */
    exportSettings() {
        return {
            ...this.settings,
            exportedAt: new Date().toISOString(),
            version: '1.0.0'
        };
    }

    /**
     * Import settings
     * @param {Object} importedSettings - Settings to import
     * @returns {Object} Import result
     */
    async importSettings(importedSettings) {
        try {
            const validation = this.validateSettings(importedSettings);
            if (!validation.isValid) {
                return {
                    success: false,
                    errors: validation.errors
                };
            }
            
            this.settings = {
                defaultPattern: importedSettings.defaultPattern,
                defaultDuration: importedSettings.defaultDuration,
                autoStart: importedSettings.autoStart || false,
                showAnalytics: importedSettings.showAnalytics !== false,
                theme: importedSettings.theme || 'default'
            };
            
            await this.saveSettings();
            this.updateUI();
            
            logger.info('Breathing settings imported successfully');
            
            return {
                success: true,
                settings: this.settings
            };
            
        } catch (error) {
            logger.error('Failed to import breathing settings', { error: error.message });
            return {
                success: false,
                errors: ['Failed to import settings']
            };
        }
    }

    /**
     * Get settings summary for display
     * @returns {Object} Settings summary
     */
    getSettingsSummary() {
        const pattern = breathingPatternsManager.getPattern(this.settings.defaultPattern);
        
        return {
            defaultPattern: pattern ? pattern.name : 'Unknown',
            defaultDuration: `${this.settings.defaultDuration} minutes`,
            autoStart: this.settings.autoStart ? 'Enabled' : 'Disabled',
            showAnalytics: this.settings.showAnalytics ? 'Enabled' : 'Disabled',
            theme: this.settings.theme.charAt(0).toUpperCase() + this.settings.theme.slice(1)
        };
    }

    /**
     * Cleanup and destroy the component
     */
    destroy() {
        // Remove event listeners
        const patternSelect = document.getElementById('breathingDefaultPattern');
        const durationSelect = document.getElementById('breathingDefaultDuration');
        const autoStartCheckbox = document.getElementById('breathingAutoStart');
        const analyticsCheckbox = document.getElementById('breathingShowAnalytics');
        const themeSelect = document.getElementById('breathingTheme');
        
        if (patternSelect) patternSelect.removeEventListener('change', this.handlePatternChange);
        if (durationSelect) durationSelect.removeEventListener('change', this.handleDurationChange);
        if (autoStartCheckbox) autoStartCheckbox.removeEventListener('change', this.handleAutoStartChange);
        if (analyticsCheckbox) analyticsCheckbox.removeEventListener('change', this.handleAnalyticsChange);
        if (themeSelect) themeSelect.removeEventListener('change', this.handleThemeChange);
        
        logger.debug('Breathing settings destroyed');
    }
}

// Create global instance
const breathingSettings = new BreathingSettings();

export default breathingSettings;
