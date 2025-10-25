/**
 * Breathing Controls Component
 * Handles session controls and user interactions
 */

import logger from '../utils/logger.js';
import i18n from '../utils/i18n.js';
import breathingPatternsManager from '../utils/breathingPatterns.js';

class BreathingControls {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            showPatternSelector: true,
            showDurationSelector: true,
            showSoundToggle: false,
            showSettings: true,
            ...options
        };
        
        this.controls = {
            playPauseBtn: null,
            stopBtn: null,
            patternSelector: null,
            durationSelector: null,
            soundToggle: null,
            settingsBtn: null
        };
        
        this.currentState = 'idle'; // idle, running, paused
        this.selectedPattern = 'box';
        this.selectedDuration = 5;
        
        this.init();
    }

    /**
     * Initialize the controls
     */
    init() {
        try {
            this.createControls();
            this.setupEventListeners();
            logger.debug('Breathing controls initialized');
        } catch (error) {
            logger.error('Failed to initialize breathing controls', { error: error.message });
        }
    }

    /**
     * Create the controls DOM elements
     */
    createControls() {
        // Create main controls container
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'breathing-controls';
        
        // Create pattern selector if enabled
        if (this.options.showPatternSelector) {
            this.createPatternSelector(controlsContainer);
        }
        
        // Create duration selector if enabled
        if (this.options.showDurationSelector) {
            this.createDurationSelector(controlsContainer);
        }
        
        // Create main control buttons
        this.createMainButtons(controlsContainer);
        
        // Create sound toggle if enabled
        if (this.options.showSoundToggle) {
            this.createSoundToggle(controlsContainer);
        }
        
        // Create settings button if enabled
        if (this.options.showSettings) {
            this.createSettingsButton(controlsContainer);
        }
        
        // Add to container
        this.container.appendChild(controlsContainer);
    }

    /**
     * Create pattern selector
     * @param {HTMLElement} container - Container element
     */
    createPatternSelector(container) {
        const selectorContainer = document.createElement('div');
        selectorContainer.className = 'breathing-pattern-selector';
        
        const label = document.createElement('label');
        label.textContent = i18n.t('breathing.pattern');
        
        this.controls.patternSelector = document.createElement('select');
        this.controls.patternSelector.id = 'breathing-pattern-select';
        
        // Load patterns with translations
        const patterns = breathingPatternsManager.getAllPatterns();
        patterns.forEach((pattern, id) => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = i18n.t(`breathing.patterns.${id}`) || pattern.name;
            this.controls.patternSelector.appendChild(option);
        });
        
        // Set default selection
        this.controls.patternSelector.value = 'box';
        this.selectedPattern = 'box';
        
        selectorContainer.appendChild(label);
        selectorContainer.appendChild(this.controls.patternSelector);
        container.appendChild(selectorContainer);
    }

    /**
     * Create duration selector
     * @param {HTMLElement} container - Container element
     */
    createDurationSelector(container) {
        const selectorContainer = document.createElement('div');
        selectorContainer.className = 'breathing-duration-selector';
        
        const durations = [1, 3, 5, 10, 15];
        
        durations.forEach(duration => {
            const btn = document.createElement('button');
            btn.className = 'duration-btn';
            btn.textContent = `${duration} ${i18n.t('breathing.minutes')}`;
            btn.dataset.duration = duration;
            
            if (duration === this.selectedDuration) {
                btn.classList.add('active');
            }
            
            this.controls.durationSelector = this.controls.durationSelector || [];
            this.controls.durationSelector.push(btn);
            
            selectorContainer.appendChild(btn);
        });
        
        container.appendChild(selectorContainer);
    }

    /**
     * Create main control buttons
     * @param {HTMLElement} container - Container element
     */
    createMainButtons(container) {
        // Play/Pause button
        this.controls.playPauseBtn = document.createElement('button');
        this.controls.playPauseBtn.className = 'breathing-control-btn primary';
        this.controls.playPauseBtn.id = 'breathing-play-pause';
        this.controls.playPauseBtn.innerHTML = `
            <i class="material-icons-round" aria-hidden="true">play_arrow</i>
            <span>${i18n.t('common.start')}</span>
        `;
        
        // Stop button
        this.controls.stopBtn = document.createElement('button');
        this.controls.stopBtn.className = 'breathing-control-btn danger';
        this.controls.stopBtn.id = 'breathing-stop';
        this.controls.stopBtn.innerHTML = `
            <i class="material-icons-round" aria-hidden="true">stop</i>
            <span>${i18n.t('common.stop')}</span>
        `;
        this.controls.stopBtn.disabled = true;
        
        container.appendChild(this.controls.playPauseBtn);
        container.appendChild(this.controls.stopBtn);
    }

    /**
     * Create sound toggle
     * @param {HTMLElement} container - Container element
     */
    createSoundToggle(container) {
        this.controls.soundToggle = document.createElement('button');
        this.controls.soundToggle.className = 'breathing-control-btn';
        this.controls.soundToggle.id = 'breathing-sound-toggle';
        this.controls.soundToggle.innerHTML = `
            <i class="material-icons-round" aria-hidden="true">volume_off</i>
            <span>Sound Off</span>
        `;
        
        container.appendChild(this.controls.soundToggle);
    }

    /**
     * Create settings button
     * @param {HTMLElement} container - Container element
     */
    createSettingsButton(container) {
        this.controls.settingsBtn = document.createElement('button');
        this.controls.settingsBtn.className = 'breathing-control-btn secondary';
        this.controls.settingsBtn.id = 'breathing-settings';
        this.controls.settingsBtn.innerHTML = `
            <i class="material-icons-round" aria-hidden="true">settings</i>
            <span>${i18n.t('common.settings')}</span>
        `;
        
        container.appendChild(this.controls.settingsBtn);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Play/Pause button
        if (this.controls.playPauseBtn) {
            this.controls.playPauseBtn.addEventListener('click', this.handlePlayPause.bind(this));
        }
        
        // Stop button
        if (this.controls.stopBtn) {
            this.controls.stopBtn.addEventListener('click', this.handleStop.bind(this));
        }
        
        // Pattern selector
        if (this.controls.patternSelector) {
            this.controls.patternSelector.addEventListener('change', this.handlePatternChange.bind(this));
        }
        
        // Duration selector
        if (this.controls.durationSelector) {
            this.controls.durationSelector.forEach(btn => {
                btn.addEventListener('click', this.handleDurationChange.bind(this));
            });
        }
        
        // Sound toggle
        if (this.controls.soundToggle) {
            this.controls.soundToggle.addEventListener('click', this.handleSoundToggle.bind(this));
        }
        
        // Settings button
        if (this.controls.settingsBtn) {
            this.controls.settingsBtn.addEventListener('click', this.handleSettings.bind(this));
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Listen for language changes
        document.addEventListener('languageChanged', () => {
            this.updateTranslations();
        });
    }

    /**
     * Handle play/pause button click
     */
    handlePlayPause() {
        console.log('🎯 BREATHING CONTROLS: Play/pause button clicked!', {
            currentState: this.currentState,
            selectedPattern: this.selectedPattern,
            selectedDuration: this.selectedDuration
        });
        
        const event = new CustomEvent('breathingControl', {
            detail: {
                action: this.currentState === 'running' ? 'pause' : 'play',
                pattern: this.selectedPattern,
                duration: this.selectedDuration
            }
        });
        
        console.log('🎯 BREATHING CONTROLS: Dispatching event', event.detail);
        this.container.dispatchEvent(event);
        logger.debug('Play/pause button clicked', { action: event.detail.action });
    }

    /**
     * Handle stop button click
     */
    handleStop() {
        const event = new CustomEvent('breathingControl', {
            detail: { action: 'stop' }
        });
        
        this.container.dispatchEvent(event);
        logger.debug('Stop button clicked');
    }

    /**
     * Handle pattern change
     */
    handlePatternChange(event) {
        this.selectedPattern = event.target.value;
        
        const eventObj = new CustomEvent('breathingPatternChange', {
            detail: { pattern: this.selectedPattern }
        });
        
        this.container.dispatchEvent(eventObj);
        logger.debug('Pattern changed', { pattern: this.selectedPattern });
    }

    /**
     * Handle duration change
     */
    handleDurationChange(event) {
        const duration = parseInt(event.target.dataset.duration);
        this.selectedDuration = duration;
        
        // Update active state
        this.controls.durationSelector.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.duration === duration.toString());
        });
        
        const eventObj = new CustomEvent('breathingDurationChange', {
            detail: { duration: duration }
        });
        
        this.container.dispatchEvent(eventObj);
        logger.debug('Duration changed', { duration: duration });
    }

    /**
     * Handle sound toggle
     */
    handleSoundToggle() {
        const isEnabled = this.controls.soundToggle.classList.contains('active');
        
        this.controls.soundToggle.classList.toggle('active');
        
        const icon = this.controls.soundToggle.querySelector('.material-icons-round');
        const text = this.controls.soundToggle.querySelector('span');
        
        if (isEnabled) {
            icon.textContent = 'volume_off';
            text.textContent = 'Sound Off';
        } else {
            icon.textContent = 'volume_up';
            text.textContent = 'Sound On';
        }
        
        const event = new CustomEvent('breathingSoundToggle', {
            detail: { enabled: !isEnabled }
        });
        
        this.container.dispatchEvent(event);
        logger.debug('Sound toggle clicked', { enabled: !isEnabled });
    }

    /**
     * Handle settings button click
     */
    handleSettings() {
        console.log('🎯 BREATHING CONTROLS: Settings button clicked!');
        
        const event = new CustomEvent('breathingSettings', {
            detail: {}
        });
        
        console.log('🎯 BREATHING CONTROLS: Dispatching settings event', event.detail);
        this.container.dispatchEvent(event);
        logger.debug('Settings button clicked');
    }

    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeyboard(event) {
        // Only handle if controls are visible and focused
        if (!this.container.contains(document.activeElement)) return;
        
        switch (event.key) {
            case ' ':
                event.preventDefault();
                this.handlePlayPause();
                break;
            case 'Escape':
                event.preventDefault();
                this.handleStop();
                break;
            case 's':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    this.handleSettings();
                }
                break;
        }
    }

    /**
     * Update control state
     * @param {string} state - New state (idle, running, paused)
     */
    updateState(state) {
        this.currentState = state;
        
        switch (state) {
            case 'idle':
                this.updatePlayPauseButton('play', i18n.t('common.start'));
                if (this.controls.stopBtn) {
                    this.controls.stopBtn.disabled = true;
                }
                break;
            case 'running':
                this.updatePlayPauseButton('pause', i18n.t('common.pause'));
                if (this.controls.stopBtn) {
                    this.controls.stopBtn.disabled = false;
                }
                break;
            case 'paused':
                this.updatePlayPauseButton('play', i18n.t('common.resume'));
                if (this.controls.stopBtn) {
                    this.controls.stopBtn.disabled = false;
                }
                break;
        }
        
        logger.debug('Controls state updated', { state: state });
    }

    /**
     * Update play/pause button
     * @param {string} icon - Icon name
     * @param {string} text - Button text
     */
    updatePlayPauseButton(icon, text) {
        if (!this.controls.playPauseBtn) return;
        
        const iconElement = this.controls.playPauseBtn.querySelector('.material-icons-round');
        const textElement = this.controls.playPauseBtn.querySelector('span');
        
        if (iconElement) {
            iconElement.textContent = icon === 'play' ? 'play_arrow' : 'pause';
        }
        
        if (textElement) {
            textElement.textContent = text;
        }
    }

    /**
     * Populate pattern options
     * @param {Array} patterns - Available patterns
     */
    populatePatternOptions(patterns = []) {
        if (!this.controls.patternSelector) return;
        
        // Clear existing options
        this.controls.patternSelector.innerHTML = '';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select a pattern...';
        this.controls.patternSelector.appendChild(defaultOption);
        
        // Add pattern options
        patterns.forEach(pattern => {
            const option = document.createElement('option');
            option.value = pattern.id;
            option.textContent = pattern.name;
            this.controls.patternSelector.appendChild(option);
        });
        
        // Set selected pattern
        this.controls.patternSelector.value = this.selectedPattern;
    }

    /**
     * Set selected pattern
     * @param {string} patternId - Pattern ID
     */
    setSelectedPattern(patternId) {
        this.selectedPattern = patternId;
        
        if (this.controls.patternSelector) {
            this.controls.patternSelector.value = patternId;
        }
    }

    /**
     * Set selected duration
     * @param {number} duration - Duration in minutes
     */
    setSelectedDuration(duration) {
        this.selectedDuration = duration;
        
        if (this.controls.durationSelector) {
            this.controls.durationSelector.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.duration === duration.toString());
            });
        }
    }

    /**
     * Enable/disable controls
     * @param {boolean} enabled - Whether controls should be enabled
     */
    setEnabled(enabled) {
        const controls = [
            this.controls.playPauseBtn,
            this.controls.stopBtn,
            this.controls.patternSelector,
            ...(this.controls.durationSelector || []),
            this.controls.soundToggle,
            this.controls.settingsBtn
        ].filter(Boolean);
        
        controls.forEach(control => {
            control.disabled = !enabled;
        });
    }

    /**
     * Get current control state
     * @returns {Object} Current state
     */
    getState() {
        return {
            state: this.currentState,
            selectedPattern: this.selectedPattern,
            selectedDuration: this.selectedDuration,
            soundEnabled: this.controls.soundToggle?.classList.contains('active') || false
        };
    }

    /**
     * Update translations when language changes
     */
    updateTranslations() {
        // Update pattern selector label
        const patternLabel = this.container.querySelector('.breathing-pattern-selector label');
        if (patternLabel) {
            patternLabel.textContent = i18n.t('breathing.pattern');
        }

        // Update pattern options
        const patternSelect = this.controls.patternSelector;
        if (patternSelect) {
            const patterns = breathingPatternsManager.getAllPatterns();
            Array.from(patternSelect.options).forEach(option => {
                const patternId = option.value;
                if (patterns.has(patternId)) {
                    option.textContent = i18n.t(`breathing.patterns.${patternId}`) || patterns.get(patternId).name;
                }
            });
        }

        // Update duration buttons
        if (this.controls.durationSelector) {
            this.controls.durationSelector.forEach(btn => {
                const duration = btn.dataset.duration;
                btn.textContent = `${duration} ${i18n.t('breathing.minutes')}`;
            });
        }

        // Update main buttons
        this.updateState(this.currentState);

        logger.debug('Breathing controls translations updated');
    }

    /**
     * Cleanup and destroy the component
     */
    destroy() {
        // Remove event listeners
        document.removeEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Clear container
        if (this.container) {
            this.container.innerHTML = '';
        }
        
        // Clear references
        Object.keys(this.controls).forEach(key => {
            this.controls[key] = null;
        });
        
        logger.debug('Breathing controls destroyed');
    }
}

export default BreathingControls;
