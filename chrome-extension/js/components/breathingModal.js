/**
 * Breathing Modal Component
 * Main UI component for the breathing experience
 */

import breathingService from '../services/breathing.js';
import sessionManager from '../services/sessionManager.js';
import breathingSoundsService from '../services/breathingSounds.js';
import BreathingCircle from './breathingCircle.js';
import BreathingControls from './breathingControls.js';
import logger from '../utils/logger.js';
import i18n from '../utils/i18n.js';
import LanguageSwitcher from './languageSwitcher.js';

class BreathingModal {
    constructor() {
        this.modal = null;
        this.modalContent = null;
        this.breathingCircle = null;
        this.breathingControls = null;
        this.isVisible = false;
        this.currentSession = null;
        this.sessionProgress = null;
        
        // Initialize asynchronously
        this.init().catch(error => {
            logger.error('Failed to initialize breathing modal in constructor', { error: error.message });
        });
    }

    /**
     * Initialize the breathing modal
     */
    async init() {
        try {
            // Wait for i18n to be ready
            await this.waitForI18n();
            
            this.createModal();
            this.setupEventListeners();
            this.setupBreathingService();
            logger.debug('Breathing modal initialized');
        } catch (error) {
            logger.error('Failed to initialize breathing modal', { error: error.message });
        }
    }

    /**
     * Wait for i18n system to be ready
     */
    async waitForI18n() {
        // Wait a bit for i18n to initialize
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // If translations are still not loaded, wait more
        let attempts = 0;
        while (!i18n.translations || Object.keys(i18n.translations).length === 0) {
            if (attempts > 50) break; // Max 5 seconds
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
    }

    /**
     * Create the modal DOM structure
     */
    createModal() {
        // Create modal container
        this.modal = document.createElement('div');
        this.modal.className = 'breathing-modal';
        this.modal.id = 'breathing-modal';
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-labelledby', 'breathing-modal-title');
        this.modal.setAttribute('aria-hidden', 'true');
        
        // Create modal content
        this.modalContent = document.createElement('div');
        this.modalContent.className = 'breathing-modal-content';
        
        // Create modal header
        this.createModalHeader();
        
        // Create breathing circle container
        this.createBreathingCircleContainer();
        
        // Create controls container
        this.createControlsContainer();
        
        // Create progress container
        this.createProgressContainer();
        
        // Create reports container
        this.createReportsContainer();
        
        // Create summary container
        this.createSummaryContainer();
        
        // Assemble modal
        this.modal.appendChild(this.modalContent);
        document.body.appendChild(this.modal);
    }

    /**
     * Create modal header
     */
    createModalHeader() {
        const header = document.createElement('div');
        header.className = 'breathing-modal-header';
        
        const title = document.createElement('h2');
        title.id = 'breathing-modal-title';
        title.textContent = i18n.t('breathing.title');
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'breathing-close-btn';
        closeBtn.setAttribute('aria-label', 'Close breathing exercise');
        closeBtn.innerHTML = '<i class="material-icons-round" aria-hidden="true">close</i>';
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        this.modalContent.appendChild(header);
    }

    /**
     * Create breathing circle container
     */
    createBreathingCircleContainer() {
        const circleContainer = document.createElement('div');
        circleContainer.className = 'breathing-circle-wrapper';
        circleContainer.id = 'breathing-circle-container';
        
        this.modalContent.appendChild(circleContainer);
        
        // Initialize breathing circle
        this.breathingCircle = new BreathingCircle(circleContainer);
    }

    /**
     * Create controls container
     */
    createControlsContainer() {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'breathing-controls-wrapper';
        controlsContainer.id = 'breathing-controls-container';
        
        this.modalContent.appendChild(controlsContainer);
        
        // Initialize breathing controls
        this.breathingControls = new BreathingControls(controlsContainer, {
            showPatternSelector: true,
            showDurationSelector: true,
            showSoundToggle: false,
            showSettings: true
        });
        
        // Attach event listeners directly to controls container
        console.log('🎯 BREATHING MODAL: Attaching event listeners to controls container', controlsContainer);
        controlsContainer.addEventListener('breathingControl', this.handleControl.bind(this));
        controlsContainer.addEventListener('breathingPatternChange', this.handlePatternChange.bind(this));
        controlsContainer.addEventListener('breathingDurationChange', this.handleDurationChange.bind(this));
        controlsContainer.addEventListener('breathingSettings', this.handleSettings.bind(this));
        
        // Also attach to modal content as fallback
        this.modalContent.addEventListener('breathingControl', this.handleControl.bind(this));
        this.modalContent.addEventListener('breathingPatternChange', this.handlePatternChange.bind(this));
        this.modalContent.addEventListener('breathingDurationChange', this.handleDurationChange.bind(this));
        this.modalContent.addEventListener('breathingSettings', this.handleSettings.bind(this));
    }

    /**
     * Create progress container
     */
    createProgressContainer() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'breathing-progress';
        progressContainer.id = 'breathing-progress';
        progressContainer.style.display = 'none';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'breathing-progress-bar';
        
        const progressFill = document.createElement('div');
        progressFill.className = 'breathing-progress-fill';
        
        const sessionInfo = document.createElement('div');
        sessionInfo.className = 'breathing-session-info';
        
        const timeRemaining = document.createElement('span');
        timeRemaining.id = 'breathing-time-remaining';
        timeRemaining.textContent = '0:00';
        
        const cyclesCompleted = document.createElement('span');
        cyclesCompleted.id = 'breathing-cycles-completed';
        cyclesCompleted.textContent = '0 cycles';
        
        sessionInfo.appendChild(timeRemaining);
        sessionInfo.appendChild(cyclesCompleted);
        
        progressBar.appendChild(progressFill);
        progressContainer.appendChild(progressBar);
        progressContainer.appendChild(sessionInfo);
        
        this.modalContent.appendChild(progressContainer);
    }

    /**
     * Create reports container
     */
    createReportsContainer() {
        const reportsContainer = document.createElement('div');
        reportsContainer.className = 'breathing-reports';
        reportsContainer.id = 'breathing-reports';
        reportsContainer.style.display = 'none';
        
        const title = document.createElement('div');
        title.className = 'breathing-reports-title';
        title.textContent = i18n.t('breathing.reports.title') || 'Breathing Reports';
        
        const reportsList = document.createElement('div');
        reportsList.className = 'breathing-reports-list';
        reportsList.id = 'breathing-reports-list';
        
        reportsContainer.appendChild(title);
        reportsContainer.appendChild(reportsList);
        
        this.modalContent.appendChild(reportsContainer);
    }

    /**
     * Create summary container
     */
    createSummaryContainer() {
        const summaryContainer = document.createElement('div');
        summaryContainer.className = 'breathing-summary';
        summaryContainer.id = 'breathing-summary';
        summaryContainer.style.display = 'none';
        
        const title = document.createElement('h3');
        title.textContent = i18n.t('breathing.sessionComplete');
        
        const message = document.createElement('p');
        message.id = 'breathing-summary-message';
        message.textContent = i18n.t('breathing.sessionCompleteMessage');
        
        const statsContainer = document.createElement('div');
        statsContainer.className = 'breathing-summary-stats';
        statsContainer.id = 'breathing-summary-stats';
        
        const restartBtn = document.createElement('button');
        restartBtn.className = 'breathing-control-btn primary';
        restartBtn.textContent = 'Start New Session';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'breathing-control-btn';
        closeBtn.textContent = 'Close';
        
        summaryContainer.appendChild(title);
        summaryContainer.appendChild(message);
        summaryContainer.appendChild(statsContainer);
        summaryContainer.appendChild(restartBtn);
        summaryContainer.appendChild(closeBtn);
        
        this.modalContent.appendChild(summaryContainer);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Close button
        const closeBtn = this.modalContent.querySelector('.breathing-close-btn');
        closeBtn.addEventListener('click', this.hide.bind(this));
        
        // Modal backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
        
        // Controls events are now attached directly to controls container in createControlsContainer()
        
        // Summary events
        const summaryContainer = this.modalContent.querySelector('#breathing-summary');
        const restartBtn = summaryContainer.querySelector('.breathing-control-btn.primary');
        const summaryCloseBtn = summaryContainer.querySelector('.breathing-control-btn:not(.primary)');
        
        restartBtn.addEventListener('click', () => {
            this.showSessionSetup();
        });
        
        summaryCloseBtn.addEventListener('click', this.hide.bind(this));
    }

    /**
     * Setup breathing service event listeners
     */
    setupBreathingService() {
        breathingService.on('sessionStarted', this.handleSessionStarted.bind(this));
        breathingService.on('sessionStopped', this.handleSessionStopped.bind(this));
        breathingService.on('sessionPaused', this.handleSessionPaused.bind(this));
        breathingService.on('sessionResumed', this.handleSessionResumed.bind(this));
        breathingService.on('phaseChanged', this.handlePhaseChanged.bind(this));
        breathingService.on('progressUpdate', this.handleProgressUpdate.bind(this));
        breathingService.on('cycleCompleted', this.handleCycleCompleted.bind(this));
    }

    /**
     * Show the modal
     */
    show() {
        if (this.isVisible) return;
        
        this.isVisible = true;
        this.modal.classList.add('show');
        this.modal.setAttribute('aria-hidden', 'false');
        
        // Focus trap
        this.setupFocusTrap();
        
        // Show session setup by default
        this.showSessionSetup();
        
        logger.debug('Breathing modal shown');
    }

    /**
     * Hide the modal
     */
    hide() {
        if (!this.isVisible) return;
        
        // Stop any running session
        if (breathingService.getSessionData().isRunning) {
            breathingService.stopSession();
        }
        
        this.isVisible = false;
        this.modal.classList.remove('show');
        this.modal.setAttribute('aria-hidden', 'true');
        
        // Reset to initial state
        this.showSessionSetup();
        
        logger.debug('Breathing modal hidden');
    }

    /**
     * Show session setup interface
     */
    showSessionSetup() {
        // Hide progress, reports and summary
        this.modalContent.querySelector('#breathing-progress').style.display = 'none';
        this.modalContent.querySelector('#breathing-reports').style.display = 'none';
        this.modalContent.querySelector('#breathing-summary').style.display = 'none';
        
        // Show controls
        this.modalContent.querySelector('#breathing-controls-container').style.display = 'block';
        
        // Reset circle
        this.breathingCircle.reset();
        
        // Update controls state
        this.breathingControls.updateState('idle');
        
        // Populate pattern options
        const patterns = Array.from(breathingService.getAvailablePatterns().entries())
            .map(([id, pattern]) => ({ id, name: pattern.name }));
        this.breathingControls.populatePatternOptions(patterns);
    }

    /**
     * Show session in progress
     */
    showSessionInProgress() {
        // Hide controls and summary
        this.modalContent.querySelector('#breathing-controls-container').style.display = 'none';
        this.modalContent.querySelector('#breathing-summary').style.display = 'none';
        
        // Show progress and reports
        this.modalContent.querySelector('#breathing-progress').style.display = 'block';
        this.modalContent.querySelector('#breathing-reports').style.display = 'block';
        
        // Start circle animation
        this.breathingCircle.startAnimation();
    }

    /**
     * Show session summary
     */
    showSessionSummary(sessionData) {
        // Hide controls and progress
        this.modalContent.querySelector('#breathing-controls-container').style.display = 'none';
        this.modalContent.querySelector('#breathing-progress').style.display = 'none';
        
        // Show summary
        const summaryContainer = this.modalContent.querySelector('#breathing-summary');
        summaryContainer.style.display = 'block';
        
        // Update summary content
        this.updateSummaryContent(sessionData);
        
        // Stop circle animation
        this.breathingCircle.stopAnimation();
    }

    /**
     * Update summary content
     * @param {Object} sessionData - Session data
     */
    updateSummaryContent(sessionData) {
        const message = this.modalContent.querySelector('#breathing-summary-message');
        const statsContainer = this.modalContent.querySelector('#breathing-summary-stats');
        
        // Update message
        if (sessionData.completed) {
            message.textContent = 'Excellent! You completed your breathing session.';
        } else {
            message.textContent = 'Good effort! You\'ve made progress on your breathing practice.';
        }
        
        // Update stats
        statsContainer.innerHTML = `
            <div class="summary-stat">
                <div class="summary-stat-value">${sessionData.cycleCount}</div>
                <div class="summary-stat-label">Cycles</div>
            </div>
            <div class="summary-stat">
                <div class="summary-stat-value">${Math.round(sessionData.actualDuration / (1000 * 60))}</div>
                <div class="summary-stat-label">Minutes</div>
            </div>
            <div class="summary-stat">
                <div class="summary-stat-value">${sessionData.pattern.name}</div>
                <div class="summary-stat-label">Pattern</div>
            </div>
        `;
    }

    /**
     * Handle control events
     * @param {CustomEvent} event - Control event
     */
    handleControl(event) {
        console.log('🎯 BREATHING MODAL: Received control event', event.detail);
        console.log('🎯 BREATHING MODAL: Event target:', event.target);
        console.log('🎯 BREATHING MODAL: Event currentTarget:', event.currentTarget);
        
        const { action, pattern, duration } = event.detail;
        
        switch (action) {
            case 'play':
                console.log('🎯 BREATHING MODAL: Starting session with', { pattern, duration });
                this.startSession(pattern, duration);
                break;
            case 'pause':
                console.log('🎯 BREATHING MODAL: Pausing session');
                this.pauseSession();
                break;
            case 'stop':
                console.log('🎯 BREATHING MODAL: Stopping session');
                this.stopSession();
                break;
        }
    }

    /**
     * Handle pattern change
     * @param {CustomEvent} event - Pattern change event
     */
    handlePatternChange(event) {
        logger.debug('Pattern changed', { pattern: event.detail.pattern });
    }

    /**
     * Handle duration change
     * @param {CustomEvent} event - Duration change event
     */
    handleDurationChange(event) {
        logger.debug('Duration changed', { duration: event.detail.duration });
    }

    /**
     * Handle settings
     * @param {CustomEvent} event - Settings event
     */
    handleSettings(event) {
        console.log('🎯 BREATHING MODAL: Settings button clicked!', event.detail);
        
        // Show breathing settings panel
        this.showBreathingSettings();
        
        logger.debug('Settings requested');
    }
    
    /**
     * Show breathing settings panel
     */
    showBreathingSettings() {
        console.log('🎯 BREATHING MODAL: Opening breathing settings');

        // Create a simple settings modal
        const settingsModal = document.createElement('div');
        settingsModal.className = 'breathing-settings-modal';
        settingsModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        const settingsContent = document.createElement('div');
        settingsContent.className = 'breathing-settings-content';
        settingsContent.style.cssText = `
            background: var(--glass-bg);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            padding: 2rem;
            max-width: 500px;
            max-height: 80vh;
            width: 90%;
            color: var(--color-text-primary);
            position: relative;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
            overflow-y: auto;
        `;

        // Header
        const header = document.createElement('div');
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        `;

        const title = document.createElement('h3');
        title.textContent = i18n.t('breathing.settings.title');
        title.style.cssText = `
            margin: 0;
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="material-icons-round">close</i>';
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: var(--color-text-primary);
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: background 0.3s ease;
        `;
        closeBtn.onclick = () => settingsModal.remove();

        header.appendChild(title);
        header.appendChild(closeBtn);

        // Language switcher container
        const languageContainer = document.createElement('div');
        languageContainer.id = 'breathing-language-switcher';

        // Settings info
        const info = document.createElement('div');
        info.style.cssText = `
            margin-top: 1.5rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            font-size: 0.9rem;
            color: var(--color-text-secondary);
        `;
        info.innerHTML = `
            <strong>${i18n.t('breathing.settings.defaultPattern')}:</strong> ${i18n.t('breathing.patterns.box')}<br>
            <strong>${i18n.t('breathing.settings.defaultDuration')}:</strong> 5 ${i18n.t('breathing.minutes')}<br>
            <strong>${i18n.t('breathing.settings.autoStart')}:</strong> ${i18n.t('common.no')}<br>
            <strong>${i18n.t('breathing.settings.sound')}:</strong> ${i18n.t('common.yes')}
        `;

        settingsContent.appendChild(header);
        settingsContent.appendChild(languageContainer);
        settingsContent.appendChild(info);

        settingsModal.appendChild(settingsContent);
        document.body.appendChild(settingsModal);

        // Initialize language switcher
        if (typeof LanguageSwitcher !== 'undefined') {
            new LanguageSwitcher(languageContainer);
        }

        // Close on backdrop click
        settingsModal.onclick = (e) => {
            if (e.target === settingsModal) {
                settingsModal.remove();
            }
        };
    }

    /**
     * Start a breathing session
     * @param {string} pattern - Pattern ID
     * @param {number} duration - Duration in minutes
     */
    async startSession(pattern, duration) {
        console.log('🎯 BREATHING MODAL: startSession called with', { pattern, duration });
        
        try {
            // Validate session parameters
            const validation = breathingService.validateSession(pattern, duration);
            console.log('🎯 BREATHING MODAL: Validation result', validation);
            
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '));
            }
            
            // Start the session
            console.log('🎯 BREATHING MODAL: Calling breathingService.startSession');
            await breathingService.startSession(pattern, duration);
            
            console.log('🎯 BREATHING MODAL: Session started successfully');
            logger.info('Breathing session started', { pattern, duration });
            
        } catch (error) {
            console.error('🎯 BREATHING MODAL: Error starting session', error);
            logger.error('Failed to start breathing session', { error: error.message });
            
            // Show error message to user
            this.showErrorMessage(error.message);
        }
    }

    /**
     * Pause the current session
     */
    pauseSession() {
        breathingService.pauseSession();
    }

    /**
     * Stop the current session
     */
    stopSession() {
        const sessionData = breathingService.stopSession();
        if (sessionData) {
            this.showSessionSummary(sessionData);
        }
    }

    /**
     * Handle session started event
     * @param {Object} data - Session data
     */
    handleSessionStarted(data) {
        logger.debug('Modal received sessionStarted event', data);
        this.currentSession = data;
        this.showSessionInProgress();
        this.breathingControls.updateState('running');
        
        // Resume audio context and play start sound
        breathingSoundsService.resumeAudioContext();
        breathingSoundsService.playPhaseChangeSound();
        
        logger.debug('Session started in modal', data);
    }

    /**
     * Handle session stopped event
     * @param {Object} data - Session data
     */
    async handleSessionStopped(data) {
        this.currentSession = null;
        this.breathingControls.updateState('idle');
        
        // Save session to history
        try {
            await sessionManager.saveSession(data);
        } catch (error) {
            logger.error('Failed to save session', { error: error.message });
        }
        
        this.showSessionSummary(data);
        
        logger.debug('Session stopped in modal', data);
    }

    /**
     * Handle session paused event
     * @param {Object} data - Session data
     */
    handleSessionPaused(data) {
        this.breathingControls.updateState('paused');
        this.breathingCircle.pauseAnimation();
        
        logger.debug('Session paused in modal', data);
    }

    /**
     * Handle session resumed event
     * @param {Object} data - Session data
     */
    handleSessionResumed(data) {
        this.breathingControls.updateState('running');
        this.breathingCircle.resumeAnimation();
        
        logger.debug('Session resumed in modal', data);
    }

    /**
     * Handle phase changed event
     * @param {Object} data - Phase data
     */
    handlePhaseChanged(data) {
        this.breathingCircle.updatePhase(data.phase, 0);
        
        // Add breathing report
        this.addBreathingReport(data.phase, data.duration);
        
        // Play phase sound
        breathingSoundsService.playPhaseSound(data.phase.type);
        
        logger.debug('Phase changed in modal', data);
    }

    /**
     * Add breathing report for a phase
     * @param {Object} phase - Phase data
     * @param {number} duration - Phase duration in seconds
     */
    addBreathingReport(phase, duration) {
        const reportsList = this.modalContent.querySelector('#breathing-reports-list');
        if (!reportsList) return;

        const reportItem = document.createElement('div');
        reportItem.className = 'breathing-report-item';
        
        const phaseElement = document.createElement('div');
        phaseElement.className = `breathing-report-phase ${phase.type}`;
        
        const phaseIcon = document.createElement('div');
        phaseIcon.className = 'breathing-report-phase-icon';
        
        const phaseText = document.createElement('span');
        phaseText.textContent = i18n.t(`breathing.phases.${phase.type}`) || phase.type;
        
        phaseElement.appendChild(phaseIcon);
        phaseElement.appendChild(phaseText);
        
        const detailsElement = document.createElement('div');
        detailsElement.className = 'breathing-report-details';
        
        const durationElement = document.createElement('span');
        durationElement.className = 'breathing-report-duration';
        durationElement.textContent = `${duration}s`;
        
        const timestampElement = document.createElement('span');
        timestampElement.className = 'breathing-report-timestamp';
        timestampElement.textContent = new Date().toLocaleTimeString();
        
        detailsElement.appendChild(durationElement);
        detailsElement.appendChild(timestampElement);
        
        reportItem.appendChild(phaseElement);
        reportItem.appendChild(detailsElement);
        
        // Add to top of list
        reportsList.insertBefore(reportItem, reportsList.firstChild);
        
        // Keep only last 10 reports
        const reports = reportsList.querySelectorAll('.breathing-report-item');
        if (reports.length > 10) {
            reports[reports.length - 1].remove();
        }
        
        // Scroll to top
        reportsList.scrollTop = 0;
    }

    /**
     * Handle progress update event
     * @param {Object} data - Progress data
     */
    handleProgressUpdate(data) {
        logger.debug('Modal received progressUpdate event', data);
        
        // Update circle animation
        this.breathingCircle.updatePhase(data.phase, data.progress);
        
        // Update progress bar
        this.updateProgressBar(data);
        
        // Update session info
        this.updateSessionInfo();
    }

    /**
     * Handle cycle completed event
     * @param {Object} data - Cycle data
     */
    handleCycleCompleted(data) {
        this.updateSessionInfo();
        
        logger.debug('Cycle completed in modal', data);
    }

    /**
     * Update progress bar
     * @param {Object} data - Progress data
     */
    updateProgressBar(data) {
        const progressFill = this.modalContent.querySelector('.breathing-progress-fill');
        if (progressFill) {
            const sessionProgress = breathingService.getSessionProgress();
            progressFill.style.width = `${sessionProgress * 100}%`;
        }
    }

    /**
     * Update session info
     */
    updateSessionInfo() {
        const sessionData = breathingService.getSessionData();
        
        const timeRemaining = this.modalContent.querySelector('#breathing-time-remaining');
        const cyclesCompleted = this.modalContent.querySelector('#breathing-cycles-completed');
        
        if (timeRemaining) {
            const minutes = Math.floor(sessionData.remainingTime / (1000 * 60));
            const seconds = Math.floor((sessionData.remainingTime % (1000 * 60)) / 1000);
            timeRemaining.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (cyclesCompleted) {
            cyclesCompleted.textContent = `${sessionData.cycleCount} cycle${sessionData.cycleCount !== 1 ? 's' : ''}`;
        }
    }

    /**
     * Setup focus trap for accessibility
     */
    setupFocusTrap() {
        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
        
        // Focus first element
        if (firstElement) {
            firstElement.focus();
        }
    }

    /**
     * Show error message to user
     * @param {string} message - Error message
     */
    showErrorMessage(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'breathing-error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(239, 68, 68, 0.9);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 1002;
            font-size: 0.9rem;
            max-width: 400px;
            text-align: center;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    /**
     * Get modal state
     * @returns {Object} Modal state
     */
    getState() {
        return {
            isVisible: this.isVisible,
            currentSession: this.currentSession,
            sessionProgress: this.sessionProgress
        };
    }

    /**
     * Update translations when language changes
     */
    updateTranslations() {
        // Update modal title
        const title = document.getElementById('breathing-modal-title');
        if (title) {
            title.textContent = i18n.t('breathing.title');
        }

        // Update session complete title
        const sessionTitle = this.modalContent?.querySelector('.breathing-summary h3');
        if (sessionTitle) {
            sessionTitle.textContent = i18n.t('breathing.sessionComplete');
        }

        // Update session complete message
        const sessionMessage = document.getElementById('breathing-summary-message');
        if (sessionMessage) {
            sessionMessage.textContent = i18n.t('breathing.sessionCompleteMessage');
        }

        // Update breathing controls
        if (this.breathingControls) {
            this.breathingControls.updateTranslations();
        }

        logger.debug('Breathing modal translations updated');
    }

    /**
     * Cleanup and destroy the modal
     */
    destroy() {
        // Stop any running session
        if (breathingService.getSessionData().isRunning) {
            breathingService.stopSession();
        }
        
        // Destroy components
        if (this.breathingCircle) {
            this.breathingCircle.destroy();
        }
        
        if (this.breathingControls) {
            this.breathingControls.destroy();
        }
        
        // Remove modal from DOM
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
        }
        
        // Clear references
        this.modal = null;
        this.modalContent = null;
        this.breathingCircle = null;
        this.breathingControls = null;
        this.isVisible = false;
        this.currentSession = null;
        this.sessionProgress = null;
        
        logger.debug('Breathing modal destroyed');
    }
}

// Create global instance
const breathingModal = new BreathingModal();

export default breathingModal;
