// Premium Features Service Module
import stateManager from '../modules/state.js';
import premiumModal from './premiumModal.js';
import { showNotification } from '../utils/common.js';
import { SUBSCRIPTION_STATUS } from '../modules/state.js';
import logger from '../utils/logger.js';
import errorBoundary from '../utils/errorBoundary.js';

class PremiumError extends Error {
    constructor(message, code, details = {}) {
        super(message);
        this.name = 'PremiumError';
        this.code = code;
        this.details = details;
    }
}

class PremiumService {
    constructor() {
        this.features = {
            favorite_affirmations: {
                name: "Favorite Affirmations",
                description: "Save your favorite affirmations",
                icon: "favorite",
                tier: "pro",
                fallback: () => this.handleFavoriteAffirmationsFallback()
            },
            share_affirmations: {
                name: "Share Affirmations",
                description: "Share your favorite affirmations",
                icon: "share",
                tier: "pro",
                fallback: () => this.handleShareAffirmationsFallback()
            },
            custom_affirmations: {
                name: "Custom Affirmations",
                description: "Create and manage your own affirmations",
                icon: "format_quote",
                tier: "pro",
                fallback: () => this.handleCustomAffirmationsFallback()
            },
            custom_backgrounds: {
                name: "Custom Backgrounds",
                description: "Upload and use your own background images",
                icon: "photo_library",
                tier: "pro",
                fallback: () => this.handleCustomBackgroundsFallback()
            },
            daily_reminders: {
                name: "Daily Reminders",
                description: "Get notified at your preferred time",
                icon: "notifications",
                tier: "pro",
                fallback: () => this.handleDailyRemindersFallback()
            },
            backup_sync: {
                name: "Backup & Sync",
                description: "Keep your data safe across devices",
                icon: "backup",
                tier: "pro"
            },
            theme_settings: {
                name: "Theme Settings",
                description: "Customize colors, fonts, and styles",
                icon: "palette",
                tier: "pro"
            },
            affirmation_categories: {
                name: "Affirmation Categories",
                description: "Organize affirmations into categories",
                icon: "category",
                tier: "pro"
            },
            usage_statistics: {
                name: "Usage Statistics",
                description: "Track your affirmation journey",
                icon: "analytics",
                tier: "pro"
            },
            daily_reminder: true
        };

        this.plans = {
            free: {
                name: "Free",
                features: ["basic_affirmations", "basic_backgrounds"]
            },
            pro: {
                name: "Pro",
                features: Object.keys(this.features)
            }
        };

        this.initialize();
    }

    /**
     * Handle graceful degradation for premium features
     * @param {string} featureName - Name of the feature
     * @param {Function} premiumAction - Premium action to execute
     * @param {Object} options - Options for degradation
     * @returns {Promise<any>} Result of action or fallback
     */
    async handleGracefulDegradation(featureName, premiumAction, options = {}) {
        const {
            showUpgradePrompt = true,
            allowTrial = true,
            fallbackAction = null
        } = options;

        try {
            // Check if user has premium access
            if (this.isPremium) {
                return await premiumAction();
            }

            // Handle trial access
            if (allowTrial && this.isTrialActive()) {
                logger.info(`Trial access granted for ${featureName}`);
                return await premiumAction();
            }

            // Show upgrade prompt if enabled
            if (showUpgradePrompt) {
                this.showUpgradePrompt(featureName);
            }

            // Execute fallback if provided
            if (fallbackAction) {
                logger.info(`Executing fallback for ${featureName}`);
                return await fallbackAction();
            }

            // Default fallback behavior
            const feature = this.features[featureName];
            if (feature && feature.fallback) {
                return await feature.fallback();
            }

            throw new PremiumError('Premium feature not available', 'PREMIUM_REQUIRED', {
                feature: featureName
            });

        } catch (error) {
            logger.error(`Graceful degradation failed for ${featureName}`, {
                error: error.message,
                feature: featureName
            });
            
            // Final fallback - show error message
            this.showFeatureUnavailableMessage(featureName);
            throw error;
        }
    }

    /**
     * Show upgrade prompt for premium features
     * @param {string} featureName - Name of the feature
     */
    showUpgradePrompt(featureName) {
        const feature = this.features[featureName];
        if (feature) {
            showNotification(
                'Premium Feature',
                `${feature.name} is available with Pro subscription. Upgrade to unlock this feature!`
            );
        }
        
        // Show premium modal after a short delay
        setTimeout(() => {
            premiumModal.show();
        }, 2000);
    }

    /**
     * Show feature unavailable message
     * @param {string} featureName - Name of the feature
     */
    showFeatureUnavailableMessage(featureName) {
        const feature = this.features[featureName];
        const message = feature 
            ? `${feature.name} is currently unavailable. Please try again later.`
            : 'This feature is currently unavailable. Please try again later.';
            
        showNotification('Feature Unavailable', message);
    }

    /**
     * Fallback handlers for each premium feature
     */
    async handleFavoriteAffirmationsFallback() {
        showNotification(
            'Limited Functionality',
            'You can view affirmations but cannot save favorites. Upgrade to Pro for full functionality.'
        );
        return { limited: true, message: 'Favorites not available in free version' };
    }

    async handleShareAffirmationsFallback() {
        // Provide basic sharing via copy to clipboard
        const affirmation = document.getElementById('affirmation')?.textContent;
        if (affirmation) {
            try {
                await navigator.clipboard.writeText(affirmation);
                showNotification('Copied!', 'Affirmation copied to clipboard. Share it manually!');
                return { shared: true, method: 'clipboard' };
            } catch (error) {
                logger.error('Failed to copy affirmation', { error: error.message });
            }
        }
        
        showNotification(
            'Limited Sharing',
            'Copy the affirmation manually. Upgrade to Pro for advanced sharing options.'
        );
        return { limited: true, message: 'Manual sharing only' };
    }

    async handleCustomAffirmationsFallback() {
        showNotification(
            'Limited Customization',
            'You can use the default affirmations. Upgrade to Pro to create your own.'
        );
        return { limited: true, message: 'Custom affirmations not available' };
    }

    async handleCustomBackgroundsFallback() {
        showNotification(
            'Limited Backgrounds',
            'You can use the default backgrounds. Upgrade to Pro to upload your own.'
        );
        return { limited: true, message: 'Custom backgrounds not available' };
    }

    async handleDailyRemindersFallback() {
        showNotification(
            'Limited Reminders',
            'Manual reminders only. Upgrade to Pro for automated daily reminders.'
        );
        return { limited: true, message: 'Automated reminders not available' };
    }

    async handleBackupSyncFallback() {
        showNotification(
            'Limited Backup',
            'Manual backup only. Upgrade to Pro for automatic cloud sync.'
        );
        return { limited: true, message: 'Cloud sync not available' };
    }

    async initialize() {
        // Temporarily enable all premium features
        this.isPremium = true;
        this.isTrialActive = false;
        this.trialEndDate = null;
        await this.setupEventListeners();
    }

    async isPremiumUser() {
        // Temporarily return true for all users
        return true;
    }

    async checkFeatureAccess(featureId) {
        // Temporarily grant access to all features
        return true;
    }

    async requirePremium(featureId) {
        // Temporarily allow all features
        return true;
    }

    setupEventListeners() {
        // Add click listeners to premium feature buttons
        document.querySelectorAll('[data-premium-feature]').forEach(element => {
            const featureId = element.dataset.premiumFeature;
            if (!this.isPremiumUser()) {
                element.classList.add('disabled');
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    premiumModal.show(featureId);
                });
            } else {
                element.classList.remove('disabled');
                // For premium users, let the default click behavior work
                // No need to show upgrade modal
            }
        });

        // Add click listener to upgrade buttons - only show for non-premium users
        document.querySelectorAll('.upgrade-button').forEach(button => {
            if (!this.isPremiumUser()) {
                button.style.display = 'block';
                button.addEventListener('click', () => {
                    premiumModal.show();
                });
            } else {
                button.style.display = 'none';
            }
        });
    }

    isTrialUser() {
       
        // Check actual trial status
        const status = stateManager.getSettings().subscriptionStatus;
        return status === SUBSCRIPTION_STATUS.TRIAL;
    }

    async resetTrialStatus() {
        try {
            await stateManager.updateSettings({
                trialUsed: false,
                subscriptionStatus: SUBSCRIPTION_STATUS.FREE,
                trialStartDate: null
            });
            return true;
        } catch (error) {
            console.error('Failed to reset trial status:', error);
            return false;
        }
    }

    async startFreeTrial() {
        // Temporarily auto-enable premium without trial
        this.isPremium = true;
        this.isTrialActive = false;
        await this.initialize();
        return true;
    }

    async upgradeToPro() {
        // Temporarily auto-enable premium
        this.isPremium = true;
        await this.initialize();
        return true;
    }

    updatePremiumUI(isPremium) {
        // Update premium badges
        document.querySelectorAll('.premium-badge').forEach(badge => {
            badge.textContent = isPremium ? 'Pro' : 'Free';
        });

        // Update premium tags visibility
        document.querySelectorAll('.premium-tag').forEach(tag => {
            tag.style.display = isPremium ? 'none' : 'inline-flex';
        });

        // Update premium banner visibility
        const premiumBanner = document.querySelector('.premium-banner');
        if (premiumBanner) {
            premiumBanner.style.display = isPremium ? 'none' : 'block';
        }

        // Update body class
        document.body.classList.toggle('premium-user', isPremium);
        document.body.classList.toggle('free-user', !isPremium);
    }

    async initializePremiumFeatures() {
        try {
            // Initialize all premium services
            const services = [
                import('./customAffirmations.js'),
                import('./backup.js'),
                import('./theme.js'),
                import('./categories.js'),
                import('./statistics.js')
            ];

            await Promise.all(services);

            // Update UI to reflect premium status
            this.updatePremiumUI(true);
        } catch (error) {
            console.error('Failed to initialize premium features:', error);
        }
    }

    getAvailableFeatures() {
        const isPremium = this.isPremiumUser();
        return Object.entries(this.features).reduce((acc, [key, feature]) => {
            acc[key] = {
                ...feature,
                available: isPremium || feature.tier === 'free'
            };
            return acc;
        }, {});
    }

    getTrialDaysLeft() {
        if (!this.isTrialUser()) return 0;

        const settings = stateManager.getSettings();
        const trialStart = new Date(settings.trialStartDate);
        const now = new Date();
        const trialLength = 7; // 7 days trial
        const daysLeft = trialLength - Math.floor((now - trialStart) / (1000 * 60 * 60 * 24));

        return Math.max(0, daysLeft);
    }

    async loadSubscriptionStatus() {
        try {
            const settings = stateManager.getSettings();

            // Check if trial has expired
            if (settings.subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL) {
                const daysLeft = this.getTrialDaysLeft();
                if (daysLeft <= 0) {
                    await stateManager.updateSettings({
                        subscriptionStatus: SUBSCRIPTION_STATUS.FREE
                    });
                    // Update UI to reflect free status
                    this.updatePremiumUI(false);
                    showNotification('Trial Ended', 'Your free trial has expired');
                }
            }

            // Update UI based on current status
            this.updatePremiumUI(this.isPremiumUser());
        } catch (error) {
            console.error('Failed to load subscription status:', error);
        }
    }
}

// Create and export singleton instance
const premiumService = new PremiumService();
export default premiumService;
export { PremiumError }; 