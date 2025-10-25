/**
 * Internationalization (i18n) Utility
 * Provides multi-language support for the extension
 */

import logger from './logger.js';

class I18nManager {
    constructor() {
        this.currentLanguage = 'ru'; // Default to Russian
        this.translations = {};
        this.fallbackLanguage = 'en';
        
        this.init();
    }

    /**
     * Initialize the i18n system
     */
    async init() {
        try {
            // Load saved language preference
            const savedLanguage = await this.getSavedLanguage();
            if (savedLanguage) {
                this.currentLanguage = savedLanguage;
            } else {
                // Auto-detect language from browser
                this.currentLanguage = this.detectLanguage();
            }

            // Load translations
            await this.loadTranslations();
            
            // Only log if logger is available
            if (typeof logger !== 'undefined' && logger.info) {
                logger.info('I18n system initialized', { 
                    language: this.currentLanguage 
                });
            }
        } catch (error) {
            // Only log if logger is available
            if (typeof logger !== 'undefined' && logger.error) {
                logger.error('Failed to initialize i18n system', { error: error.message });
            }
            // Fallback to default language
            this.currentLanguage = this.fallbackLanguage;
        }
    }

    /**
     * Detect browser language
     */
    detectLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();
        
        // Supported languages
        const supportedLanguages = ['ru', 'en'];
        
        if (supportedLanguages.includes(langCode)) {
            return langCode;
        }
        
        // Default to Russian for Slavic languages, English for others
        const slavicLanguages = ['ru', 'uk', 'be', 'bg', 'mk', 'sr', 'hr', 'sk', 'cs', 'pl'];
        if (slavicLanguages.includes(langCode)) {
            return 'ru';
        }
        
        return 'en';
    }

    /**
     * Get saved language preference
     */
    async getSavedLanguage() {
        try {
            const result = await chrome.storage.sync.get(['language']);
            return result.language;
        } catch (error) {
            if (typeof logger !== 'undefined' && logger.warn) {
                logger.warn('Failed to get saved language', { error: error.message });
            }
            return null;
        }
    }

    /**
     * Save language preference
     */
    async setLanguage(language) {
        try {
            await chrome.storage.sync.set({ language });
            this.currentLanguage = language;
            await this.loadTranslations();
            
            // Trigger language change event
            this.emitLanguageChange();
            
            if (typeof logger !== 'undefined' && logger.info) {
                logger.info('Language changed', { language });
            }
        } catch (error) {
            if (typeof logger !== 'undefined' && logger.error) {
                logger.error('Failed to save language', { error: error.message });
            }
        }
    }

    /**
     * Load translations for current language
     */
    async loadTranslations() {
        try {
            let translations;
            
            if (this.currentLanguage === 'ru') {
                const ruModule = await import('../locales/ru.js');
                translations = ruModule.default;
            } else {
                const enModule = await import('../locales/en.js');
                translations = enModule.default;
            }
            
            this.translations = translations;
            
            if (typeof logger !== 'undefined' && logger.debug) {
                logger.debug('Translations loaded', { 
                    language: this.currentLanguage,
                    keysCount: Object.keys(this.translations).length
                });
            }
        } catch (error) {
            if (typeof logger !== 'undefined' && logger.warn) {
                logger.warn('Failed to load translations, using fallback', { 
                    language: this.currentLanguage,
                    error: error.message 
                });
            }
            
            // Load fallback language
            if (this.currentLanguage !== this.fallbackLanguage) {
                try {
                    let fallbackTranslations;
                    if (this.fallbackLanguage === 'ru') {
                        const ruModule = await import('../locales/ru.js');
                        fallbackTranslations = ruModule.default;
                    } else {
                        const enModule = await import('../locales/en.js');
                        fallbackTranslations = enModule.default;
                    }
                    this.translations = fallbackTranslations;
                } catch (fallbackError) {
                    if (typeof logger !== 'undefined' && logger.error) {
                        logger.error('Failed to load fallback translations', { 
                            error: fallbackError.message 
                        });
                    }
                    this.translations = {};
                }
            }
        }
    }

    /**
     * Get translation for a key
     * @param {string} key - Translation key (supports dot notation)
     * @param {Object} params - Parameters for interpolation
     * @returns {string} Translated text
     */
    t(key, params = {}) {
        try {
            let translation = this.getNestedValue(this.translations, key);
            
            if (!translation) {
                if (typeof logger !== 'undefined' && logger.warn) {
                    logger.warn('Translation not found', { key, language: this.currentLanguage });
                }
                return key; // Return key if translation not found
            }

            // Handle pluralization
            if (typeof translation === 'object') {
                const count = params.count || 0;
                if (count === 1 && translation.one) {
                    translation = translation.one;
                } else if (count > 1 && translation.many) {
                    translation = translation.many;
                } else if (translation.other) {
                    translation = translation.other;
                } else {
                    translation = Object.values(translation)[0];
                }
            }

            // Interpolate parameters
            return this.interpolate(translation, params);
        } catch (error) {
            if (typeof logger !== 'undefined' && logger.error) {
                logger.error('Translation error', { key, error: error.message });
            }
            return key;
        }
    }

    /**
     * Get nested value from object using dot notation
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    /**
     * Interpolate parameters in translation string
     */
    interpolate(str, params) {
        return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return params[key] !== undefined ? params[key] : match;
        });
    }

    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Get available languages
     */
    getAvailableLanguages() {
        return [
            { code: 'ru', name: 'Русский', flag: '🇷🇺' },
            { code: 'en', name: 'English', flag: '🇺🇸' }
        ];
    }

    /**
     * Emit language change event
     */
    emitLanguageChange() {
        const event = new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        });
        document.dispatchEvent(event);
    }

    /**
     * Format number according to locale
     */
    formatNumber(number, options = {}) {
        try {
            return new Intl.NumberFormat(this.currentLanguage, options).format(number);
        } catch (error) {
            if (typeof logger !== 'undefined' && logger.warn) {
                logger.warn('Number formatting failed', { error: error.message });
            }
            return number.toString();
        }
    }

    /**
     * Format date according to locale
     */
    formatDate(date, options = {}) {
        try {
            return new Intl.DateTimeFormat(this.currentLanguage, options).format(date);
        } catch (error) {
            if (typeof logger !== 'undefined' && logger.warn) {
                logger.warn('Date formatting failed', { error: error.message });
            }
            return date.toString();
        }
    }

    /**
     * Format time according to locale
     */
    formatTime(date, options = {}) {
        try {
            return new Intl.DateTimeFormat(this.currentLanguage, {
                hour: '2-digit',
                minute: '2-digit',
                ...options
            }).format(date);
        } catch (error) {
            if (typeof logger !== 'undefined' && logger.warn) {
                logger.warn('Time formatting failed', { error: error.message });
            }
            return date.toString();
        }
    }
}

// Create global instance
const i18n = new I18nManager();

// Export for use in other modules
export default i18n;
export { I18nManager };
