// State Management Module
const STATE_VERSION = '1.0.0';

// Default settings with types
const SUBSCRIPTION_STATUS = {
    FREE: 'free',
    PRO: 'pro',
    TRIAL: 'trial'
};

const defaultSettings = {
    showWeather: true,
    showClock: true,
    showTop5Tasks: true,
    backgroundTheme: 'nature',
    cardStyle: 'glass',
    weatherWidgetPosition: { top: '20px', left: 'auto', right: '20px' },
    fontStyle: 'default',
    textColor: '#FFFFFF',
    enableNotifications: false,
    subscriptionStatus: SUBSCRIPTION_STATUS.FREE,
    trialEndsAt: null,
    customAffirmations: [],
    customCollections: {
        personal: [],
        motivation: [],
        gratitude: [],
        success: []
    },
    favorites: {
        affirmations: [],
        backgrounds: []
    },
    favoritesMetadata: {}, // Stores metadata for favorite affirmations
    statistics: {
        totalViews: 0,
        favorites: {},
        categories: {},
        dailyStreak: 0,
        lastViewed: null,
        viewHistory: [],
        mostViewed: [],
        leastViewed: []
    },
    breathing: {
        defaultPattern: 'box',
        defaultDuration: 5,
        autoStart: false,
        soundEnabled: false,
        theme: 'default',
        showAnalytics: true,
        sessionHistory: [],
        streakData: {
            current: 0,
            longest: 0,
            lastSessionDate: null
        },
        statistics: {
            totalSessions: 0,
            totalMinutes: 0,
            totalCycles: 0,
            averageSessionDuration: 0,
            completionRate: 0,
            favoritePattern: null,
            sessionsThisWeek: 0,
            sessionsThisMonth: 0
        }
    }
};

class StateError extends Error {
    constructor(message, code, details = {}) {
        super(message);
        this.name = 'StateError';
        this.code = code;
        this.details = details;
    }
}

class StateManager {
    constructor() {
        this.version = STATE_VERSION;
        this.currentSettings = { ...defaultSettings };
        this.listeners = new Set();
    }

    // Type validators
    validators = {
        subscriptionStatus: (value) => Object.values(SUBSCRIPTION_STATUS).includes(value),
        trialEndsAt: (value) => !value || !isNaN(new Date(value).getTime()),
        customAffirmations: (value) => Array.isArray(value),
        customCollections: (value) => value && typeof value === 'object' &&
            Object.values(value).every(collection => Array.isArray(collection)),
        favorites: (value) => value && typeof value === 'object' && 
            Array.isArray(value.affirmations) && Array.isArray(value.backgrounds),
        favoritesMetadata: (value) => value && typeof value === 'object',
        weatherWidgetPosition: (value) => value && typeof value === 'object' &&
            'top' in value && 'left' in value && 'right' in value,
        statistics: (value) => value && typeof value === 'object'
    };

    // Subscribe to state changes
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    // Notify all listeners
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.currentSettings));
    }

    // Load state with error handling
    async loadState() {
        try {
            // Load critical settings from sync storage
            const syncResult = await new Promise(resolve => {
                chrome.storage.sync.get(['settings', 'version'], resolve);
            });

            let state = syncResult.settings || defaultSettings;
            const version = syncResult.version || '1.0.0';

            // Load large data from local storage
            const localResult = await chrome.storage.local.get([
                'customBackgrounds',
                'customAffirmations',
                'customCollections',
                'favorites',
                'statistics',
                'breathing'
            ]);

            // Merge local storage data into state
            if (localResult.customBackgrounds) state.customBackgrounds = localResult.customBackgrounds;
            if (localResult.customAffirmations) state.customAffirmations = localResult.customAffirmations;
            if (localResult.customCollections) state.customCollections = localResult.customCollections;
            if (localResult.favorites) state.favorites = localResult.favorites;
            if (localResult.statistics) state.statistics = localResult.statistics;
            if (localResult.breathing) state.breathing = localResult.breathing;

            // Validate and repair state
            state = this.validateState(state);
            this.currentSettings = state;
            this.notifyListeners();

            return state;
        } catch (error) {
            throw new StateError(
                'Failed to load state',
                'LOAD_ERROR',
                { originalError: error }
            );
        }
    }

    // Save state with validation
    async saveState(state) {
        try {
            const validatedState = this.validateState(state);
            
            // Split large data items into local storage
            const { 
                customBackgrounds, 
                customAffirmations,
                customCollections,
                favorites,
                statistics,
                breathing,
                ...mainState 
            } = validatedState;
            
            // Save critical settings to sync storage
            await new Promise(resolve => {
                chrome.storage.sync.set({
                    settings: mainState,
                    version: this.version
                }, resolve);
            });

            // Save large data to local storage
            await chrome.storage.local.set({
                customBackgrounds: customBackgrounds || [],
                customAffirmations: customAffirmations || [],
                customCollections: customCollections || {},
                favorites: favorites || { affirmations: [], backgrounds: [] },
                statistics: statistics || {},
                breathing: breathing || {}
            });

            this.currentSettings = validatedState;
            this.notifyListeners();
            
            return true;
        } catch (error) {
            throw new StateError(
                'Failed to save state',
                'SAVE_ERROR',
                { originalError: error }
            );
        }
    }

    // Validate state with detailed error reporting
    validateState(state) {
        const validated = { ...defaultSettings };
        const errors = [];

        for (const [key, validator] of Object.entries(this.validators)) {
            if (key in state) {
                if (validator(state[key])) {
                    validated[key] = state[key];
                } else {
                    errors.push(`Invalid value for ${key}`);
                }
            }
        }

        // Copy non-validated fields
        for (const key in state) {
            if (!(key in this.validators)) {
                validated[key] = state[key];
            }
        }

        if (errors.length > 0) {
            console.warn('State validation warnings:', errors);
        }

        return validated;
    }

    // Backup state to local storage (skip large items)
    async backupState(state) {
        try {
            const { customBackgrounds, ...backupState } = state;
            const backup = {
                state: backupState,
                timestamp: Date.now(),
                version: this.version
            };
            localStorage.setItem('settingsBackup', JSON.stringify(backup));
        } catch (error) {
            console.error('Backup creation failed:', error);
        }
    }

    // Restore from backup
    async restoreFromBackup() {
        try {
            const backup = localStorage.getItem('settingsBackup');
            if (!backup) return null;

            const { state } = JSON.parse(backup);
            return this.validateState(state);
        } catch (error) {
            throw new StateError(
                'Failed to restore from backup',
                'RESTORE_ERROR',
                { originalError: error }
            );
        }
    }

    // Debounce timer for batched updates
    saveTimeout = null;
    
    // Force save without debouncing (for critical data like tasks)
    async forceSaveSettings(updates) {
        try {
            // Don't save tasks to sync - they go to local storage only
            if (updates.todos !== undefined) {
                // Tasks are saved separately in todoService
                logger.info('Tasks are saved to local storage, skipping sync storage');
                return;
            }
            
            // Update current settings immediately
            this.currentSettings = {
                ...this.currentSettings,
                ...updates
            };
            
            // Notify listeners immediately
            this.notifyListeners();
            
            // Save immediately without debouncing
            await this.saveState(this.currentSettings);
        } catch (error) {
            logger.error('Failed to force save settings', { error: error.message });
            // For quota errors, don't fail the app
            if (error.message && error.message.includes('MAX_WRITE_OPERATIONS')) {
                console.warn('Storage quota exceeded');
                return;
            }
            throw error;
        }
    }
    
    // Update specific settings with debouncing to avoid quota errors
    async updateSettings(updates) {
        try {
            // Clear any pending save
            if (this.saveTimeout) {
                clearTimeout(this.saveTimeout);
            }
            
            // Update current settings immediately
            this.currentSettings = {
                ...this.currentSettings,
                ...updates
            };
            
            // Notify listeners immediately
            this.notifyListeners();
            
            // Debounce the actual save to disk
            return new Promise((resolve, reject) => {
                this.saveTimeout = setTimeout(async () => {
                    try {
                        await this.saveState(this.currentSettings);
                        resolve();
                    } catch (error) {
                        // If it's a quota error, don't throw, just log
                        if (error.message && error.message.includes('MAX_WRITE_OPERATIONS')) {
                            console.warn('Storage quota exceeded, skipping save');
                            resolve(); // Still resolve to not break app flow
                        } else {
                            reject(new StateError(
                                'Failed to update settings',
                                'UPDATE_ERROR',
                                { originalError: error }
                            ));
                        }
                    }
                }, 300); // Wait 300ms to batch multiple updates
            });
        } catch (error) {
            // For quota errors, don't fail the app
            if (error.message && error.message.includes('MAX_WRITE_OPERATIONS')) {
                console.warn('Storage quota exceeded');
                return; // Return silently
            }
            throw new StateError(
                'Failed to update settings',
                'UPDATE_ERROR',
                { originalError: error }
            );
        }
    }

    // Reset to defaults
    async resetToDefaults() {
        try {
            await this.saveState(defaultSettings);
        } catch (error) {
            throw new StateError(
                'Failed to reset settings',
                'RESET_ERROR',
                { originalError: error }
            );
        }
    }

    // Get current settings
    getSettings() {
        return { ...this.currentSettings };
    }

    // Breathing-specific methods
    async updateBreathingSettings(updates) {
        try {
            const newBreathingSettings = {
                ...this.currentSettings.breathing,
                ...updates
            };
            
            await this.updateSettings({
                breathing: newBreathingSettings
            });
            
            this.notifyListeners('breathingSettingsUpdated', newBreathingSettings);
        } catch (error) {
            throw new StateError(
                'Failed to update breathing settings',
                'BREATHING_UPDATE_ERROR',
                { originalError: error }
            );
        }
    }

    getBreathingSettings() {
        return { ...this.currentSettings.breathing };
    }

    async saveBreathingSession(sessionData) {
        try {
            const breathingSettings = this.getBreathingSettings();
            const updatedHistory = [sessionData, ...breathingSettings.sessionHistory];
            
            // Keep only last 100 sessions
            const trimmedHistory = updatedHistory.slice(0, 100);
            
            await this.updateBreathingSettings({
                sessionHistory: trimmedHistory
            });
            
            this.notifyListeners('breathingSessionSaved', sessionData);
        } catch (error) {
            throw new StateError(
                'Failed to save breathing session',
                'BREATHING_SESSION_SAVE_ERROR',
                { originalError: error }
            );
        }
    }

    getBreathingSessionHistory(limit = 50) {
        const breathingSettings = this.getBreathingSettings();
        return breathingSettings.sessionHistory.slice(0, limit);
    }

    async updateBreathingStreak(streakData) {
        try {
            await this.updateBreathingSettings({
                streakData: streakData
            });
            
            this.notifyListeners('breathingStreakUpdated', streakData);
        } catch (error) {
            throw new StateError(
                'Failed to update breathing streak',
                'BREATHING_STREAK_UPDATE_ERROR',
                { originalError: error }
            );
        }
    }

    getBreathingStreak() {
        const breathingSettings = this.getBreathingSettings();
        return { ...breathingSettings.streakData };
    }

    async updateBreathingStatistics(statistics) {
        try {
            await this.updateBreathingSettings({
                statistics: statistics
            });
            
            this.notifyListeners('breathingStatisticsUpdated', statistics);
        } catch (error) {
            throw new StateError(
                'Failed to update breathing statistics',
                'BREATHING_STATS_UPDATE_ERROR',
                { originalError: error }
            );
        }
    }

    getBreathingStatistics() {
        const breathingSettings = this.getBreathingSettings();
        return { ...breathingSettings.statistics };
    }

    async clearBreathingData() {
        try {
            await this.updateBreathingSettings({
                sessionHistory: [],
                streakData: {
                    current: 0,
                    longest: 0,
                    lastSessionDate: null
                },
                statistics: {
                    totalSessions: 0,
                    totalMinutes: 0,
                    totalCycles: 0,
                    averageSessionDuration: 0,
                    completionRate: 0,
                    favoritePattern: null,
                    sessionsThisWeek: 0,
                    sessionsThisMonth: 0
                }
            });
            
            this.notifyListeners('breathingDataCleared');
        } catch (error) {
            throw new StateError(
                'Failed to clear breathing data',
                'BREATHING_CLEAR_ERROR',
                { originalError: error }
            );
        }
    }
}

// Create and export singleton instance
const stateManager = new StateManager();
export default stateManager;
export { SUBSCRIPTION_STATUS, StateError }; 