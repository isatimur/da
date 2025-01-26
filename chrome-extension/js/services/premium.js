// Premium Features Service Module
import stateManager from '../modules/state.js';
import premiumModal from './premiumModal.js';
import { showNotification } from '../utils/common.js';
import { SUBSCRIPTION_STATUS } from '../modules/state.js';

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
                tier: "pro"
            },
            share_affirmations: {
                name: "Share Affirmations",
                description: "Share your favorite affirmations",
                icon: "share",
                tier: "pro"
            },
            custom_affirmations: {
                name: "Custom Affirmations",
                description: "Create and manage your own affirmations",
                icon: "format_quote",
                tier: "pro"
            },
            custom_backgrounds: {
                name: "Custom Backgrounds",
                description: "Upload and use your own background images",
                icon: "photo_library",
                tier: "pro"
            },
            daily_reminders: {
                name: "Daily Reminders",
                description: "Get notified at your preferred time",
                icon: "notifications",
                tier: "pro"
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
    }

    async initialize() {
        try {
            // Load initial settings if not present
            const settings = stateManager.getSettings();
            if (!settings.hasOwnProperty('trialUsed')) {
                await stateManager.updateSettings({
                    trialUsed: false,
                    subscriptionStatus: SUBSCRIPTION_STATUS.FREE
                });
            }

            // Load subscription status
            await this.loadSubscriptionStatus();

            // Initialize premium features if available
            if (this.isPremiumUser()) {
                await this.initializePremiumFeatures();
            }

            // Setup premium feature listeners
            this.setupEventListeners();
        } catch (error) {
            console.error('Failed to initialize premium service:', error);
        }
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

    isPremiumUser() {
      
        // Check actual subscription status
        const status = stateManager.getSettings().subscriptionStatus;
        return status === SUBSCRIPTION_STATUS.PRO || status === SUBSCRIPTION_STATUS.TRIAL;
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
        try {
            // Check if already premium or in trial
            if (this.isPremiumUser()) {
                throw new PremiumError('Already a premium user', 'ALREADY_PREMIUM');
            }

            const settings = stateManager.getSettings();

            console.log('settings', settings);
            // Initialize trial status if not present
            if (!settings.hasOwnProperty('trialUsed')) {
                await stateManager.updateSettings({ trialUsed: false });
            }

            if (settings.trialUsed) {
                throw new PremiumError('Trial already used', 'TRIAL_USED');
            }

            // Set trial status first
            await stateManager.updateSettings({
                subscriptionStatus: SUBSCRIPTION_STATUS.TRIAL,
                trialStartDate: new Date().toISOString(),
                trialUsed: true
            });

            // Initialize premium features
            await this.initializePremiumFeatures();

            // Update UI
            this.updatePremiumUI(true);

            // Show success notification
            showNotification('Trial Started', 'Welcome to your 7-day free trial!');

            return { success: true };
        } catch (error) {
            // Show specific error messages
            if (error instanceof PremiumError) {
                if (error.code === 'ALREADY_PREMIUM') {
                    showNotification('Trial Error', 'You are already a premium user');
                } else if (error.code === 'TRIAL_USED') {
                    showNotification('Trial Error', 'You have already used your free trial');
                }
            } else {
                showNotification('Error', 'Failed to start trial. Please try again.');
                console.error('Trial start error:', error);
            }
            throw error;
        }
    }

    async upgradeToPro() {
        try {
            // Implement payment processing here
            // For now, just update the status
            await stateManager.updateSettings({
                subscriptionStatus: SUBSCRIPTION_STATUS.PRO,
                subscriptionDate: new Date().toISOString()
            });

            // Initialize premium features
            await this.initializePremiumFeatures();

            // Update UI
            this.updatePremiumUI(true);

            return { success: true };
        } catch (error) {
            throw new PremiumError(
                'Failed to upgrade to pro',
                'UPGRADE_ERROR',
                { originalError: error }
            );
        }
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

    async checkFeatureAccess(featureKey) {
        try {
            const feature = this.features[featureKey];
            if (!feature) {
                throw new PremiumError(
                    'Feature not found',
                    'FEATURE_NOT_FOUND'
                );
            }

            const isPremium = this.isPremiumUser();
            if (!isPremium && feature.tier !== 'free') {
                throw new PremiumError(
                    'Premium feature not available',
                    'PREMIUM_REQUIRED'
                );
            }

            return true;
        } catch (error) {
            if (error instanceof PremiumError) {
                if (error.code === 'PREMIUM_REQUIRED') {
                    return false;
                }
                throw error;
            }
            throw new PremiumError(
                'Failed to check feature access',
                'ACCESS_CHECK_ERROR',
                { originalError: error }
            );
        }
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