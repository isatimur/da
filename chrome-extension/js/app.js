// Main App Module
import stateManager from './modules/state.js';
import weatherService from './services/weather.js';
import backgroundService from './services/background.js';
import affirmationsService from './services/affirmations.js';
import premiumService from './services/premium.js';
import customAffirmationsService from './services/customAffirmations.js';
import dailyReminderService from './services/dailyReminder.js';
import reminderSettings from './components/reminder-settings.js';
import { animations, makeDraggable, showNotification } from './utils/common.js';
import { setupAffirmationActions } from './actions/affirmationActions.js';
import favoriteAffirmations from './components/favoriteAffirmations.js';
import { requirePremium } from './utils/premium.js';
import favoritesManager from './components/favorites-manager.js';
import savedBackgroundsManager from './components/saved-backgrounds.js';
import backupRestoreDialog from './components/backup-restore.js';
import loadingManager from './utils/loading.js';
import keyboardShortcuts from './utils/keyboard.js';
import logger from './utils/logger.js';
import i18n from './utils/i18n.js';
import ChromeI18n from './utils/chromeI18n.js';
import breathingModal from './components/breathingModal.js';
import breathingSettings from './components/breathing-settings.js';
import todoService from './services/todoService.js';
import todoWidget from './components/todoWidget.js';
import todoManager from './components/todoManager.js';
import top5Tasks from './components/top5Tasks.js';
import pomodoroTimer from './components/pomodoroTimer.js';
import productivityDashboard from './components/productivityDashboard.js';
import onboardingModal from './components/onboarding.js';

// API Keys management
async function getApiKeys() {
    try {
        // First check if we have cached keys in chrome.storage
        const cachedKeys = await chrome.storage.local.get(['unsplashKey', 'weatherKey']);
        
        if (cachedKeys.unsplashKey && cachedKeys.weatherKey) {
            return {
                unsplash: cachedKeys.unsplashKey,
                weather: cachedKeys.weatherKey
            };
        }

        // If no cached keys, fetch from your secure backend
        const response = await fetch('https://www.daily-affirmation.today/api/get-api-keys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Add any authentication tokens if needed
            // credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch API keys');
        }

        const keys = await response.json();
        
        // Cache the keys
        await chrome.storage.local.set({
            unsplashKey: keys.unsplash,
            weatherKey: keys.weather
        });

        return keys;
    } catch (error) {
        console.error('Error fetching API keys:', error);
        throw error;
    }
}

class App {
    constructor() {
        this.initialized = false;
        this.cleanup = {
            draggable: new Set(),
            animations: animations
        };
    }

    // Initialize all services
    async initializeServices() {
        logger.info('Starting service initialization');
        const timer = logger.time('Service Initialization');
        
        const serviceStatus = {
            state: false,
            weather: false,
            background: false,
            premium: false,
            affirmations: false,
            customAffirmations: false,
            dailyReminder: false,
            backup: false,
            breathing: false,
            todo: false
        };

        try {
            // Initialize state first as other services depend on it
            await stateManager.loadState();
            serviceStatus.state = true;

            // Get API keys first
            const keys = await getApiKeys();
            if (!keys) {
                throw new Error('Failed to get API keys');
            }

            // Initialize services in parallel
            await Promise.all([
                // Weather service initialization
                weatherService.init(keys.weather)
                    .then(() => serviceStatus.weather = true)
                    .catch(error => {
                        console.error('Weather service initialization failed:', error);
                        return false;
                    }),

                // Background service initialization
                backgroundService.init(keys.unsplash)
                    .then(() => serviceStatus.background = true)
                    .catch(error => {
                        console.error('Background service initialization failed:', error);
                        return false;
                    }),

                // Premium service initialization
                premiumService.initialize()
                    .then(() => serviceStatus.premium = true)
                    .catch(error => {
                        console.error('Premium service initialization failed:', error);
                        return false;
                    }),

                // Custom Affirmations service initialization
                customAffirmationsService.init()
                    .then(() => serviceStatus.customAffirmations = true)
                    .catch(error => {
                        console.error('Custom Affirmations service initialization failed:', error);
                        return false;
                    }),

                // Daily Reminder service initialization
                dailyReminderService.init()
                    .then(() => serviceStatus.dailyReminder = true)
                    .catch(error => {
                        console.error('Daily Reminder service initialization failed:', error);
                        return false;
                    }),

                // Favorite Affirmations initialization
                favoriteAffirmations.initialize()
                    .then(() => serviceStatus.favoriteAffirmations = true)
                    .catch(error => {
                        console.error('Favorite Affirmations initialization failed:', error);
                        return false;
                    }),

                // Initialize backup service
                backupRestoreDialog.initialize()
                    .then(() => serviceStatus.backup = true)
                    .catch(error => {
                        console.error('Backup service initialization failed:', error);
                        return false;
                    }),

                // Initialize breathing settings
                breathingSettings.init()
                    .then(() => serviceStatus.breathing = true)
                    .catch(error => {
                        console.error('Breathing settings initialization failed:', error);
                        return false;
                    }),

                // Initialize TODO widget
                Promise.resolve(todoWidget.init())
                    .then(() => serviceStatus.todo = true)
                    .catch(error => {
                        console.error('TODO widget initialization failed:', error);
                        return false;
                    }),

                // Initialize Top 5 Tasks widget
                Promise.resolve(top5Tasks.init())
                    .then(() => serviceStatus.top5Tasks = true)
                    .catch(error => {
                        console.error('Top 5 Tasks initialization failed:', error);
                        return false;
                    })
            ]);

            // Update services that successfully initialized
            const updatePromises = [];
            
            if (serviceStatus.weather) {
                updatePromises.push(
                    weatherService.update().catch(error => {
                        console.error('Weather update failed:', error);
                    })
                );
            }

            if (serviceStatus.background) {
                updatePromises.push(
                    backgroundService.update().catch(error => {
                        console.error('Background update failed:', error);
                    })
                );
            }

            // Affirmations don't require initialization
            updatePromises.push(
                affirmationsService.update().catch(error => {
                    console.error('Affirmations update failed:', error);
                })
            );

            await Promise.all(updatePromises);

            // Store service status for debugging
            this.serviceStatus = serviceStatus;

            // If any critical service failed, throw error
            if (!serviceStatus.state) {
                throw new Error('Critical service (state) failed to initialize');
            }

            timer();
            logger.info('Service initialization completed', serviceStatus);

        } catch (error) {
            logger.error('Service initialization failed', { error: error.message, serviceStatus });
            this.handleInitializationError(error);
            throw error;
        }
    }

    // Initialize UI components
    async initializeUI() {
        try {
            this.initializeDraggableWidgets();
            this.initializeTimeUpdate();
            await reminderSettings.initialize();
            this.setupEventListeners();
            this.setupPanelInteractions();
            setupAffirmationActions();
            this.setupKeyboardShortcuts();
            this.initializeHTMLTranslations();
            this.setupLanguageChangeListener();
            this.setupTaskCompletionAffirmations();
        } catch (error) {
            console.error('UI initialization failed:', error);
            this.handleInitializationError(error);
        }
    }
    
    // Initialize HTML translations
    initializeHTMLTranslations() {
        // Initialize Chrome i18n for HTML attributes
        if (typeof ChromeI18n !== 'undefined') {
            ChromeI18n.initializeHTMLTranslations();
        }
        
        // Update all text content that should be translated
        this.updateTranslatableElements();
    }
    
    // Update translatable elements in the DOM
    updateTranslatableElements() {
        // Settings panel title
        const settingsTitle = document.getElementById('settings-title');
        if (settingsTitle) {
            settingsTitle.textContent = i18n.t('settings.title');
        }
        
        // Menu title
        const menuTitle = document.getElementById('menu-title');
        if (menuTitle) {
            menuTitle.textContent = i18n.t('app.title');
        }
        
        // Affirmation loading text
        const affirmationText = document.getElementById('affirmation');
        if (affirmationText && affirmationText.textContent.includes('Loading')) {
            affirmationText.textContent = i18n.t('affirmations.loading');
        }
        
        // Action buttons in affirmation menu
        this.updateAffirmationActionButtons();
        
        // Menu group headings
        const menuGroups = document.querySelectorAll('.menu-group h4');
        menuGroups.forEach(h4 => {
            const text = h4.textContent.trim();
            if (text === 'My Collections') {
                h4.textContent = i18n.t('menu.myCollections');
            } else if (text === 'Settings') {
                h4.textContent = i18n.t('settings.title');
            }
        });
        
        // Group headings
        const groups = document.querySelectorAll('.settings-group h4');
        groups.forEach(group => {
            const text = group.textContent.trim();
            if (text === 'Language') {
                group.textContent = i18n.t('settings.language');
            } else if (text === 'Display') {
                group.textContent = i18n.t('common.display');
            } else if (text === 'Theme') {
                group.textContent = i18n.t('settings.theme');
            } else if (text === 'Breathing Exercise') {
                group.textContent = i18n.t('breathing.title');
            }
        });
        
        // Setting item labels
        this.updateSettingLabels();
        
        // Menu items
        this.updateMenuItems();
        
        logger.debug('HTML translations updated');
    }
    
    // Update affirmation action buttons
    updateAffirmationActionButtons() {
        const actionButtons = document.querySelectorAll('.affirmation-actions .action-button span');
        actionButtons.forEach(span => {
            const text = span.textContent.trim();
            const button = span.closest('.action-button');
            
            if (text === 'New Affirmation') {
                span.textContent = i18n.t('affirmations.new');
            } else if (text === 'Copy') {
                span.textContent = i18n.t('affirmations.copy');
            } else if (text === 'Add to Favorites') {
                span.textContent = i18n.t('affirmations.addToFavorites');
            } else if (text === 'Manage Favorites') {
                span.textContent = i18n.t('affirmations.manageFavorites');
            } else if (text === 'Share') {
                span.textContent = i18n.t('affirmations.share');
            }
        });
    }
    
    // Update setting item labels
    updateSettingLabels() {
        const settingItems = document.querySelectorAll('.setting-item span');
        settingItems.forEach(span => {
            const text = span.textContent.trim();
            
            // Map of hardcoded texts to translation keys
            const translationMap = {
                'Language': 'settings.labels.language',
                'Show Weather': 'settings.labels.showWeather',
                'Show Clock': 'settings.labels.showClock',
                'Show Today\'s Focus': 'settings.labels.showTodaysFocus',
                'Background Theme': 'settings.labels.backgroundTheme',
                'Card Style': 'settings.labels.cardStyle',
                'Font Style': 'settings.labels.fontStyle',
                'Text Color': 'settings.labels.textColor',
                'Default Pattern': 'settings.labels.defaultPattern',
                'Default Duration': 'settings.labels.defaultDuration',
                'Auto-start on new tab': 'settings.labels.autoStartNewTab',
                'Breathing theme': 'settings.labels.breathingTheme',
                'Keyboard Shortcuts': 'settings.labels.keyboardShortcuts',
                'Help & FAQ': 'settings.labels.helpFaq'
            };
            
            if (translationMap[text]) {
                span.textContent = i18n.t(translationMap[text]);
            }
        });
        
        // Update setting group headers
        this.updateSettingGroupHeaders();
        
        // Update select options
        this.updateSelectOptions();
    }
    
    // Update setting group headers
    updateSettingGroupHeaders() {
        const groups = document.querySelectorAll('.settings-group h4');
        groups.forEach(group => {
            const text = group.textContent.trim();
            const translationMap = {
                'Language': 'settings.sections.language',
                'Display': 'settings.sections.display',
                'Theme': 'settings.sections.theme',
                'Breathing Exercise': 'settings.sections.breathingExercise',
                'Help & Shortcuts': 'settings.sections.helpShortcuts'
            };
            
            if (translationMap[text]) {
                group.textContent = i18n.t(translationMap[text]);
            }
        });
    }
    
    // Update select options
    updateSelectOptions() {
        // Update background theme options
        const bgThemeSelect = document.getElementById('backgroundTheme');
        if (bgThemeSelect) {
            const options = {
                'nature': 'settings.values.nature',
                'minimal': 'settings.values.minimal',
                'architecture': 'settings.values.architecture',
                'abstract': 'settings.values.abstract'
            };
            bgThemeSelect.querySelectorAll('option').forEach(option => {
                if (options[option.value]) {
                    option.textContent = i18n.t(options[option.value]);
                }
            });
        }
        
        // Update card style options
        const cardStyleSelect = document.getElementById('cardStyle');
        if (cardStyleSelect) {
            const options = {
                'glass': 'settings.values.glass',
                'solid': 'settings.values.solid',
                'minimal': 'settings.values.minimal'
            };
            cardStyleSelect.querySelectorAll('option').forEach(option => {
                if (options[option.value]) {
                    option.textContent = i18n.t(options[option.value]);
                }
            });
        }
        
        // Update font style options
        const fontStyleSelect = document.getElementById('fontStyle');
        if (fontStyleSelect) {
            const options = {
                'default': 'settings.values.default',
                'serif': 'settings.values.serif',
                'monospace': 'settings.values.monospace'
            };
            fontStyleSelect.querySelectorAll('option').forEach(option => {
                if (options[option.value]) {
                    option.textContent = i18n.t(options[option.value]);
                }
            });
        }
        
        // Update breathing pattern options
        const breathingPatternSelect = document.getElementById('breathingDefaultPattern');
        if (breathingPatternSelect) {
            const options = {
                'box': 'settings.values.box',
                '4-7-8': 'settings.values.4-7-8',
                'triangle': 'settings.values.triangle',
                'relaxing': 'settings.values.relaxing',
                'energizing': 'settings.values.energizing',
                'mindful': 'settings.values.mindful'
            };
            breathingPatternSelect.querySelectorAll('option').forEach(option => {
                if (options[option.value]) {
                    option.textContent = i18n.t(options[option.value]);
                }
            });
        }
        
        // Update breathing duration options
        const breathingDurationSelect = document.getElementById('breathingDefaultDuration');
        if (breathingDurationSelect) {
            const options = {
                '1': 'settings.values.oneMinute',
                '3': 'settings.values.threeMinutes',
                '5': 'settings.values.fiveMinutes',
                '10': 'settings.values.tenMinutes',
                '15': 'settings.values.fifteenMinutes'
            };
            breathingDurationSelect.querySelectorAll('option').forEach(option => {
                if (options[option.value]) {
                    option.textContent = i18n.t(options[option.value]);
                }
            });
        }
        
        // Update breathing theme options
        const breathingThemeSelect = document.getElementById('breathingTheme');
        if (breathingThemeSelect) {
            const options = {
                'default': 'settings.values.default',
                'calm': 'settings.values.calm',
                'energizing': 'settings.values.energizingTheme'
            };
            breathingThemeSelect.querySelectorAll('option').forEach(option => {
                if (options[option.value]) {
                    option.textContent = i18n.t(options[option.value]);
                }
            });
        }
    }
    
    // Update menu items
    updateMenuItems() {
        // Use IDs and classes for reliable translation
        const favoritesBtn = document.getElementById('favoritesButton');
        if (favoritesBtn) {
            const premiumTag = favoritesBtn.querySelector('.premium-tag');
            const premiumTagHTML = premiumTag ? '<span class="premium-tag">Pro</span>' : '';
            favoritesBtn.innerHTML = `<i class="material-icons-round">favorite</i>${i18n.t('menu.favoriteAffirmations')}${premiumTagHTML}`;
        }
        
        const customBtn = document.getElementById('customAffirmationsButton');
        if (customBtn) {
            const premiumTag = customBtn.querySelector('.premium-tag');
            const premiumTagHTML = premiumTag ? '<span class="premium-tag">Pro</span>' : '';
            customBtn.innerHTML = `<i class="material-icons-round">format_quote</i>${i18n.t('menu.customAffirmations')}${premiumTagHTML}`;
        }
        
        const backgroundsBtn = document.getElementById('backgroundsButton');
        if (backgroundsBtn) {
            backgroundsBtn.innerHTML = `<i class="material-icons-round">photo_library</i>${i18n.t('menu.savedBackgrounds')}`;
        }
        
        const breathingBtn = document.getElementById('breathingExerciseButton');
        if (breathingBtn) {
            breathingBtn.innerHTML = `<i class="material-icons-round">air</i>${i18n.t('breathing.title')}`;
        }
        
        const remindersBtn = document.querySelector('.daily-reminders-item');
        if (remindersBtn) {
            const premiumTag = remindersBtn.querySelector('.premium-tag');
            const premiumTagHTML = premiumTag ? '<span class="premium-tag">Pro</span>' : '';
            remindersBtn.innerHTML = `<i class="material-icons-round">notifications</i>${i18n.t('menu.dailyReminders')}${premiumTagHTML}`;
        }
        
        // Settings section items - find by specific structure
        const menuLists = document.querySelectorAll('#menuPanel .menu-group ul');
        menuLists.forEach(ul => {
            const settingsUl = Array.from(ul.children).find(li => 
                li.querySelector('i.palette') || li.querySelector('i.backup')
            );
            if (!settingsUl) return;
            
            ul.querySelectorAll('li').forEach(li => {
                const iconElement = li.querySelector('i');
                if (!iconElement) return;
                
                const iconClass = iconElement.className;
                const premiumTag = li.querySelector('.premium-tag');
                const premiumTagHTML = premiumTag ? '<span class="premium-tag">Pro</span>' : '';
                
                if (iconClass.includes('palette') && !li.id) {
                    li.innerHTML = `<i class="material-icons-round">palette</i>${i18n.t('menu.themeSettings')}`;
                } else if (iconClass.includes('backup') && !li.id) {
                    li.innerHTML = `<i class="material-icons-round">backup</i>${i18n.t('menu.backup')}${premiumTagHTML}`;
                }
            });
        });
        
        // Update menu footer buttons
        const menuFooterBtns = document.querySelectorAll('.menu-footer-btn');
        menuFooterBtns.forEach(btn => {
            const span = btn.querySelector('span');
            if (span) {
                const text = span.textContent.trim();
                if (text === 'Help') span.textContent = i18n.t('menu.help');
                if (text === 'Feedback') span.textContent = i18n.t('menu.feedback');
                if (text === 'About') span.textContent = i18n.t('menu.about');
            }
        });
        
        // Update reset button
        const resetButton = document.getElementById('resetSettings');
        if (resetButton) {
            resetButton.textContent = i18n.t('settings.resetToDefaults');
        }
        
        // Update premium badge
        const premiumBadge = document.querySelector('.premium-badge');
        if (premiumBadge) {
            premiumBadge.textContent = i18n.t('premium.free');
        }
    }
    
    // Setup language change listener
    setupLanguageChangeListener() {
        document.addEventListener('languageChanged', () => {
            logger.info('Language changed, updating UI');
            this.updateTranslatableElements();
            
            // Update breathing modal if it's visible
            if (breathingModal && typeof breathingModal.updateTranslations === 'function') {
                breathingModal.updateTranslations();
            }
        });
    }

    // Initialize draggable widgets
    initializeDraggableWidgets() {
        const widgets = document.querySelectorAll('.draggable-widget');
        
        widgets.forEach(widget => {
            const cleanup = makeDraggable(widget, {
                handle: widget.querySelector('.widget-handle'),
                onDragEnd: (e, position) => {
                    if (widget.id === 'weather-widget') {
                        stateManager.updateSettings({
                            weatherWidgetPosition: {
                                top: `${position.y}px`,
                                left: `${position.x}px`,
                                right: 'auto'
                            }
                        });
                    }
                }
            });
            
            if (cleanup) this.cleanup.draggable.add(cleanup);
        });
    }

    // Initialize time updates
    initializeTimeUpdate() {
        const updateDateTime = () => {
            const now = new Date();
            const timeElement = document.querySelector('.time');
            const dateElement = document.querySelector('.date');
            const timeWidget = document.querySelector('.time-widget');
            const settings = stateManager.getSettings();

            if (timeWidget) {
                timeWidget.style.display = settings.showClock ? 'block' : 'none';
            }

            if (settings.showClock) {
                if (timeElement) {
                    timeElement.textContent = now.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit'
                    });
                }

                if (dateElement) {
                    dateElement.textContent = now.toLocaleDateString([], {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                    });
                }
            }
        };

        // Update immediately and then every second
        updateDateTime();
        this.cleanup.animations.setInterval(updateDateTime, 1000);
    }

    // Setup event listeners
    setupEventListeners() {
        // Refresh button
        document.querySelector('.refresh-button')?.addEventListener('click', () => {
            affirmationsService.update();
        });

        // Focus mode button
        document.getElementById('focusModeButton')?.addEventListener('click', () => {
            this.toggleFocusMode();
        });

        // Favorites menu item
        document.querySelector('.favorite-affirmations-item')?.addEventListener('click', async () => {
            try {
                await requirePremium('favorite_affirmations', () => {
                    favoritesManager.show();
                });
            } catch (error) {
                if (error.message === 'Premium feature not available') {
                    showNotification(i18n.t('notifications.premiumRequired'), i18n.t('notifications.upgradeToPro'));
                } else {
                    console.error('Failed to show favorites manager:', error);
                    showNotification(i18n.t('common.error'), i18n.t('errors.unknown'));
                }
            }
        });

        // Saved backgrounds menu item
        document.querySelector('#backgroundsButton')?.addEventListener('click', async () => {
            try {
                await requirePremium('saved_backgrounds', () => {
                    savedBackgroundsManager.show();
                });
            } catch (error) {
                if (error.message === 'Premium feature not available') {
                    showNotification(i18n.t('notifications.premiumRequired'), i18n.t('notifications.upgradeToPro'));
                } else {
                    console.error('Failed to show saved backgrounds:', error);
                    showNotification(i18n.t('common.error'), i18n.t('errors.unknown'));
                }
            }
        });

        // Save background button
        document.querySelector('.save-background-button')?.addEventListener('click', async () => {
            try {
                await requirePremium('saved_backgrounds', async () => {
                    await backgroundService.toggleSaveBackground();
                });
            } catch (error) {
                if (error.message === 'Premium feature not available') {
                    showNotification(i18n.t('notifications.premiumRequired'), i18n.t('notifications.upgradeToPro'));
                } else {
                    console.error('Failed to toggle background:', error);
                    showNotification(i18n.t('common.error'), error.message || i18n.t('errors.unknown'));
                }
            }
        });

        // Daily Reminders menu item
        document.querySelector('.daily-reminders-item')?.addEventListener('click', async () => {
            try {
                await requirePremium('daily_reminder', () => {
                    reminderSettings.show();
                });
            } catch (error) {
                if (error.message === 'Premium feature not available') {
                    showNotification(i18n.t('notifications.premiumRequired'), i18n.t('notifications.upgradeToPro'));
                } else {
                    console.error('Failed to show reminder settings:', error);
                    showNotification(i18n.t('common.error'), i18n.t('errors.unknown'));
                }
            }
        });

        // Backup & Sync menu item
        const backupMenuItem = Array.from(document.querySelectorAll('li')).find(li => {
            const icon = li.querySelector('i.material-icons-round');
            return icon && icon.textContent.trim() === 'backup';
        });
        
        if (backupMenuItem) {
            backupMenuItem.addEventListener('click', async () => {
                try {
                    await requirePremium('backup_sync', () => {
                        backupRestoreDialog.show();
                    });
                } catch (error) {
                    if (error.message === 'Premium feature not available') {
                        showNotification(i18n.t('notifications.premiumRequired'), i18n.t('notifications.upgradeToPro'));
                    } else {
                        console.error('Failed to show backup dialog:', error);
                        showNotification(i18n.t('common.error'), i18n.t('errors.unknown'));
                    }
                }
            });
        }

        // Breathing exercise button
        document.getElementById('breathingButton')?.addEventListener('click', () => {
            breathingModal.show();
        });

        // Breathing exercise menu item
        document.getElementById('breathingExerciseButton')?.addEventListener('click', () => {
            breathingModal.show();
        });

        // Task Manager menu item
        document.getElementById('taskManagerButton')?.addEventListener('click', () => {
            todoManager.show();
        });

        // Keyboard Shortcuts menu item
        document.getElementById('keyboardShortcutsButton')?.addEventListener('click', () => {
            const dialog = document.getElementById('keyboardShortcutsDialog');
            if (dialog) {
                dialog.classList.remove('hidden');
                dialog.classList.add('show');
                dialog.setAttribute('aria-hidden', 'false');
                // Close menu panel
                const menuPanel = document.getElementById('menuPanel');
                if (menuPanel) {
                    menuPanel.classList.add('hidden');
                }
            }
        });

        // Close keyboard shortcuts dialog
        document.getElementById('closeShortcutsDialog')?.addEventListener('click', () => {
            const dialog = document.getElementById('keyboardShortcutsDialog');
            if (dialog) {
                dialog.classList.remove('show');
                dialog.classList.add('hidden');
                dialog.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Setup panel interactions
    async setupPanelInteractions() {
        const settingsButton = document.getElementById('settingsButton');
        const settingsPanel = document.getElementById('settingsPanel');
        const menuButton = document.getElementById('menuButton');
        const menuPanel = document.getElementById('menuPanel');

        if (!settingsButton || !settingsPanel || !menuButton || !menuPanel) {
            console.warn('Some panel elements not found');
            return;
        }

        // Settings controls
        const showWeatherCheckbox = document.getElementById('showWeather');
        const showClockCheckbox = document.getElementById('showClock');
        const showTop5TasksCheckbox = document.getElementById('showTop5Tasks');
        const backgroundThemeSelect = document.getElementById('backgroundTheme');
        const cardStyleSelect = document.getElementById('cardStyle');
        const fontStyleSelect = document.getElementById('fontStyle');
        const textColorInput = document.getElementById('textColor');

        // Initialize settings with current values
        const settings = stateManager.getSettings();
        if (showWeatherCheckbox) showWeatherCheckbox.checked = settings.showWeather;
        if (showClockCheckbox) showClockCheckbox.checked = settings.showClock;
        if (showTop5TasksCheckbox) showTop5TasksCheckbox.checked = settings.showTop5Tasks;
        if (backgroundThemeSelect) backgroundThemeSelect.value = settings.backgroundTheme;
        if (cardStyleSelect) cardStyleSelect.value = settings.cardStyle;
        if (fontStyleSelect) fontStyleSelect.value = settings.fontStyle;
        if (textColorInput) textColorInput.value = settings.textColor;

        // Apply initial styles
        this.applyThemeSettings(settings);
        
        // Apply initial display settings
        const top5TasksWidget = document.getElementById('top5TasksContainer');
        if (top5TasksWidget && typeof settings.showTop5Tasks !== 'undefined') {
            top5TasksWidget.style.display = settings.showTop5Tasks ? 'block' : 'none';
        }

        // Add event listeners for settings changes
        showWeatherCheckbox?.addEventListener('change', (e) => {
            stateManager.updateSettings({ showWeather: e.target.checked });
            const weatherWidget = document.querySelector('.weather');
            if (weatherWidget) {
                weatherWidget.style.display = e.target.checked ? 'block' : 'none';
            }
        });

        showClockCheckbox?.addEventListener('change', (e) => {
            stateManager.updateSettings({ showClock: e.target.checked });
            const timeWidget = document.querySelector('.time-widget');
            if (timeWidget) {
                timeWidget.style.display = e.target.checked ? 'block' : 'none';
            }
        });

        showTop5TasksCheckbox?.addEventListener('change', (e) => {
            stateManager.updateSettings({ showTop5Tasks: e.target.checked });
            const top5TasksWidget = document.getElementById('top5TasksContainer');
            if (top5TasksWidget) {
                top5TasksWidget.style.display = e.target.checked ? 'block' : 'none';
            }
        });

        backgroundThemeSelect?.addEventListener('change', async (e) => {
            const newTheme = e.target.value;
            await stateManager.updateSettings({ backgroundTheme: newTheme });
            
            // Clear the background cache to force new image fetch
            await chrome.storage.local.remove('background_data');
            
            // Update background with new theme
            await backgroundService.update();
            
            // Show notification
            showNotification(i18n.t('notifications.themeUpdated'), i18n.t('notifications.themeChanged', { theme: newTheme }));
        });

        cardStyleSelect?.addEventListener('change', (e) => {
            const newStyle = e.target.value;
            stateManager.updateSettings({ cardStyle: newStyle });
            this.updateCardStyles(newStyle);
        });

        fontStyleSelect?.addEventListener('change', (e) => {
            const newFont = e.target.value;
            stateManager.updateSettings({ fontStyle: newFont });
            
            // Remove all font classes using a more robust approach
            const classes = document.body.className.split(' ');
            const nonFontClasses = classes.filter(cls => !cls.startsWith('font-'));
            document.body.className = nonFontClasses.join(' ');
            
            // Add the new font class and ensure font-fallback is present
            document.body.classList.add(`font-${newFont}`, 'font-fallback');
        });

        textColorInput?.addEventListener('change', (e) => {
            const newColor = e.target.value;
            stateManager.updateSettings({ textColor: newColor });
            document.documentElement.style.setProperty('--color-text-primary', newColor);
            document.documentElement.style.setProperty('--color-text-secondary', this.adjustColorOpacity(newColor, 0.7));
        });

        // Language switcher
        const languageSelect = document.getElementById('languageSelect');
        
        languageSelect?.addEventListener('change', async (e) => {
            const language = e.target.value;
            await chrome.storage.sync.set({ language });
            await i18n.setLanguage(language);
            
            // Emit language change event to update all components
            document.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language }
            }));
        });
        
        // Load and set current language
        const savedLanguage = await chrome.storage.sync.get('language');
        const language = savedLanguage.language || 'en';
        
        if (languageSelect) {
            languageSelect.value = language;
        }
        
        // Load initial language
        await i18n.setLanguage(language);
        
        // Help & Shortcuts buttons
        const kbShortcutsBtn = document.getElementById('showKeyboardShortcutsSettings');
        if (kbShortcutsBtn) {
            kbShortcutsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Keyboard Shortcuts button clicked');
                const dialog = document.getElementById('keyboardShortcutsDialog');
                if (dialog) {
                    dialog.classList.remove('hidden');
                    dialog.classList.add('show');
                    dialog.setAttribute('aria-hidden', 'false');
                    // Close settings panel
                    const settingsPanel = document.getElementById('settingsPanel');
                    if (settingsPanel) {
                        settingsPanel.classList.add('hidden');
                        settingsPanel.setAttribute('aria-hidden', 'true');
                    }
                    console.log('Keyboard Shortcuts dialog opened');
                } else {
                    console.error('Keyboard Shortcuts dialog not found');
                }
            });
        }

        const helpBtn = document.getElementById('showHelpSettings');
        if (helpBtn) {
            helpBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Help button clicked');
                const helpDialog = document.getElementById('helpDialog');
                if (helpDialog) {
                    helpDialog.classList.remove('hidden');
                    // Close settings panel
                    const settingsPanel = document.getElementById('settingsPanel');
                    if (settingsPanel) {
                        settingsPanel.classList.add('hidden');
                        settingsPanel.setAttribute('aria-hidden', 'true');
                    }
                    console.log('Help dialog opened');
                } else {
                    console.error('Help dialog not found');
                }
            });
        }

        // Breathing exercise settings
        const breathingDefaultPattern = document.getElementById('breathingDefaultPattern');
        const breathingDefaultDuration = document.getElementById('breathingDefaultDuration');
        
        breathingDefaultPattern?.addEventListener('change', async (e) => {
            const pattern = e.target.value;
            await chrome.storage.local.set({
                breathingSettings: {
                    pattern: pattern,
                    duration: parseInt(breathingDefaultDuration?.value || '5')
                }
            });
            showNotification(i18n.t('notifications.settingsUpdated'), i18n.t('breathing.settings.patternChanged'));
        });

        breathingDefaultDuration?.addEventListener('change', async (e) => {
            const duration = parseInt(e.target.value);
            await chrome.storage.local.set({
                breathingSettings: {
                    pattern: breathingDefaultPattern?.value || 'box',
                    duration: duration
                }
            });
            showNotification(i18n.t('notifications.settingsUpdated'), i18n.t('breathing.settings.durationChanged'));
        });

        // Settings panel toggle
        settingsButton.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsPanel.classList.toggle('hidden');
            menuPanel.classList.add('hidden');
        });

        // Menu panel toggle
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            menuPanel.classList.toggle('hidden');
            settingsPanel.classList.add('hidden');
        });

        // Close panels when clicking outside
        document.addEventListener('click', (e) => {
            if (!settingsPanel.contains(e.target) && !settingsButton.contains(e.target)) {
                settingsPanel.classList.add('hidden');
            }
            if (!menuPanel.contains(e.target) && !menuButton.contains(e.target)) {
                menuPanel.classList.add('hidden');
            }
        });
    }

    // Setup keyboard shortcuts
    setupKeyboardShortcuts() {
        // Space - New affirmation
        keyboardShortcuts.register(' ', () => {
            const refreshButton = document.querySelector('[data-action="refresh"]');
            if (refreshButton) {
                refreshButton.click();
            }
        }, { 
            description: 'Get new affirmation',
            preventDefault: true 
        });

        // S - Settings
        keyboardShortcuts.register('s', () => {
            const settingsButton = document.getElementById('settingsButton');
            if (settingsButton) {
                settingsButton.click();
            }
        }, { 
            description: 'Open settings' 
        });

        // M - Menu
        keyboardShortcuts.register('m', () => {
            const menuButton = document.getElementById('menuButton');
            if (menuButton) {
                menuButton.click();
            }
        }, { 
            description: 'Open menu' 
        });

        // B - Breathing exercise
        keyboardShortcuts.register('b', () => {
            breathingModal.show();
        }, { 
            description: 'Start breathing exercise' 
        });

        // T - Task Manager
        keyboardShortcuts.register('t', () => {
            todoManager.show();
        }, { 
            description: 'Open Task Manager' 
        });

        // F - Focus mode
        keyboardShortcuts.register('f', () => {
            this.toggleFocusMode();
        }, { 
            description: 'Toggle focus mode' 
        });

        // C - Copy affirmation
        keyboardShortcuts.register('c', () => {
            const copyButton = document.querySelector('[data-action="copy"]');
            if (copyButton) {
                copyButton.click();
            }
        }, { 
            description: 'Copy affirmation' 
        });

        // Escape - Close dialogs
        keyboardShortcuts.register('Escape', () => {
            const dialogs = document.querySelectorAll('.dialog-base:not(.hidden), .premium-modal:not(.hidden)');
            dialogs.forEach(dialog => {
                dialog.classList.add('hidden');
            });
        }, { 
            description: 'Close dialogs' 
        });

        console.log('Keyboard shortcuts registered');
    }

    // Apply theme settings
    applyThemeSettings(settings) {
        // Apply card style
        this.updateCardStyles(settings.cardStyle);

        // Apply font style while maintaining font-fallback
        document.body.className = document.body.className
            .replace(/font-\w+/, '')
            .trim();
        document.body.classList.add(`font-${settings.fontStyle}`, 'font-fallback');

        // Apply text color
        document.documentElement.style.setProperty('--color-text-primary', settings.textColor);
        document.documentElement.style.setProperty('--color-text-secondary', this.adjustColorOpacity(settings.textColor, 0.7));
    }

    // Update card styles
    updateCardStyles(style) {
        const widgets = document.querySelectorAll('.glass, .solid, .minimal');
        widgets.forEach(widget => {
            widget.classList.remove('glass', 'solid', 'minimal');
            widget.classList.add(style);
        });
    }

    // Adjust color opacity
    adjustColorOpacity(color, opacity) {
        const r = parseInt(color.substr(1,2), 16);
        const g = parseInt(color.substr(3,2), 16);
        const b = parseInt(color.substr(5,2), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    // Toggle focus mode
    async toggleFocusMode() {
        const body = document.body;
        const focusModeClass = 'focus-mode';
        const elements = document.querySelectorAll('.weather, .time-widget, .settings-button, .menu-button, .photo-credit');
        
        const toggleElements = (show) => {
            elements.forEach(el => {
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                el.style.opacity = show ? '1' : '0';
                el.style.transform = show ? 'none' : 'scale(0.9)';
                el.style.pointerEvents = show ? 'auto' : 'none';
            });
        };

        const isFocusModeActive = body.classList.contains(focusModeClass);
        
        if (isFocusModeActive) {
            // Exit focus mode
            body.classList.remove(focusModeClass);
            toggleElements(true);
            document.getElementById('background-overlay').style.filter = 'brightness(0.85) saturate(1.1)';
        } else {
            // Enter focus mode
            body.classList.add(focusModeClass);
            toggleElements(false);
            document.getElementById('background-overlay').style.filter = 'brightness(0.6) saturate(1.2) blur(3px)';
        }

        // Save state
        await stateManager.updateSettings({
            focusMode: !isFocusModeActive
        });
    }

    // Handle initialization errors
    handleInitializationError(error) {
        console.error('Failed to initialize the application:', error);
        
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-container glass';
        errorContainer.innerHTML = `
            <div class="error-content">
                <h2>Something went wrong</h2>
                <p>We couldn't initialize some features. Please try refreshing the page.</p>
                <button onclick="window.location.reload()">Refresh Page</button>
            </div>
        `;
        
        document.body.appendChild(errorContainer);
    }

    // Initialize the app
    async initialize() {
        if (this.initialized) return;

        try {
            // Initialize services
            await this.initializeServices();
            await this.initializeUI();
            
            // Show onboarding for new users (after a small delay to let page render)
            setTimeout(() => {
                onboardingModal.show();
            }, 1500);
            
            this.initialized = true;
        } catch (error) {
            this.handleInitializationError(error);
        }
    }

    // Setup task completion affirmations
    setupTaskCompletionAffirmations() {
        document.addEventListener('showCompletionAffirmation', async (e) => {
            const { message, task } = e.detail;
            
            // Show notification
            showNotification('Task Completed! 🎉', message);
            
            // Update main affirmation display with motivational message
            const affirmationElement = document.getElementById('affirmation');
            if (affirmationElement) {
                // Add fade animation
                affirmationElement.style.opacity = '0';
                affirmationElement.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    affirmationElement.textContent = message;
                    affirmationElement.style.opacity = '1';
                    affirmationElement.style.transform = 'translateY(0)';
                }, 300);
            }
        });
    }

    // Cleanup resources
    cleanup() {
        // Clean up draggable widgets
        if (this.cleanup && this.cleanup.draggable) {
            this.cleanup.draggable.forEach(cleanup => cleanup());
            this.cleanup.draggable.clear();
        }

        // Clean up animations
        if (this.cleanup && this.cleanup.animations) {
            this.cleanup.animations.clearAll();
        }

        // Clean up daily reminder service
        dailyReminderService.cleanup();
        
        // Clean up TODO components
        if (todoWidget && typeof todoWidget.cleanup === 'function') {
            todoWidget.cleanup();
        }
        
        if (pomodoroTimer && typeof pomodoroTimer.cleanup === 'function') {
            pomodoroTimer.cleanup();
        }
    }
}

// Create and initialize app when DOM is loaded
const app = new App();
document.addEventListener('DOMContentLoaded', () => app.initialize());

// Cleanup before page unload
window.addEventListener('beforeunload', () => {
    if (app && typeof app.cleanup === 'function') {
        app.cleanup();
    }
});

// Export for debugging
window.app = app;