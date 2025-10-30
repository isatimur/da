/**
 * Internationalization (i18n) Utility
 * Provides multi-language support for the extension
 */

import logger from './logger.js';

class I18nManager {
    constructor() {
        this.currentLanguage = 'en'; // Default to English
        this.translations = {};
        this.fallbackLanguage = 'en';
        this.rtlLanguages = ['ar', 'he', 'fa', 'ur']; // Right-to-left languages
        
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
        const supportedLanguages = ['en', 'ru', 'zh', 'ar', 'pt', 'hi'];
        
        if (supportedLanguages.includes(langCode)) {
            return langCode;
        }
        
        // Map similar languages to supported ones
        const languageMapping = {
            // Slavic languages -> Russian
            'uk': 'ru', 'be': 'ru', 'bg': 'ru', 'mk': 'ru', 'sr': 'ru', 'hr': 'ru', 'sk': 'ru', 'cs': 'ru', 'pl': 'ru',
            // Chinese variants -> Chinese
            'zh-hans': 'zh', 'zh-hant': 'zh',
            // Portuguese variants -> Portuguese
            'pt-br': 'pt',
            // Arabic variants -> Arabic
            'ar-sa': 'ar', 'ar-eg': 'ar', 'ar-ma': 'ar',
            // Hindi variants -> Hindi
            'hi-in': 'hi'
        };
        
        if (languageMapping[langCode]) {
            return languageMapping[langCode];
        }
        
        // Default to English
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
            let translationModule;
            
            // Import the appropriate translation file
            const localeMap = {
                'en': () => import('../locales/en.js'),
                'ru': () => import('../locales/ru.js'),
                'zh': () => import('../locales/zh.js'),
                'ar': () => import('../locales/ar.js'),
                'pt': () => import('../locales/pt.js'),
                'hi': () => import('../locales/hi.js')
            };
            
            if (localeMap[this.currentLanguage]) {
                translationModule = await localeMap[this.currentLanguage]();
                translations = translationModule.default;
            } else {
                // Fallback to English
                translationModule = await import('../locales/en.js');
                translations = translationModule.default;
            }
            
            this.translations = translations;
            
            // Update document direction for RTL languages
            this.updateDocumentDirection();
            
            if (typeof logger !== 'undefined' && logger.debug) {
                logger.debug('Translations loaded', { 
                    language: this.currentLanguage,
                    keysCount: Object.keys(this.translations).length,
                    isRTL: this.isRTL()
                });
            }
        } catch (error) {
            if (typeof logger !== 'undefined' && logger.warn) {
                logger.warn('Failed to load translations, using fallback', { 
                    language: this.currentLanguage,
                    error: error.message 
                });
            }
            
            // Load fallback language (English)
            try {
                const enModule = await import('../locales/en.js');
                this.translations = enModule.default;
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
    
    /**
     * Update document direction based on current language
     */
    updateDocumentDirection() {
        const htmlElement = document.documentElement;
        const bodyElement = document.body;
        
        if (this.isRTL()) {
            htmlElement.setAttribute('dir', 'rtl');
            bodyElement.classList.add('rtl');
        } else {
            htmlElement.setAttribute('dir', 'ltr');
            bodyElement.classList.remove('rtl');
        }
    }
    
    /**
     * Check if current language is RTL
     */
    isRTL() {
        return this.rtlLanguages.includes(this.currentLanguage);
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
                // Try to get partial translation (e.g., if key is "settings.labels.showWeather" but "labels" doesn't exist)
                const parts = key.split('.');
                if (parts.length > 1) {
                    // Try without the last part
                    const fallbackKey = parts.slice(0, -1).join('.');
                    const fallbackTranslation = this.getNestedValue(this.translations, fallbackKey);
                    if (fallbackTranslation && typeof fallbackTranslation === 'object') {
                        // If it's an object, return the original key
                        if (typeof logger !== 'undefined' && logger.debug) {
                            logger.debug('Translation structure issue', { key, language: this.currentLanguage });
                        }
                        return key; // Return key if translation not found
                    }
                }
                
                // Only log missing translations in development mode or for critical keys
                if (typeof logger !== 'undefined') {
                    // Only warn for keys that start with common UI elements, debug for others
                    if (key.startsWith('common.') || key.startsWith('ui.') || key.startsWith('button.')) {
                        if (logger.warn) {
                            logger.warn('Translation not found', { key, language: this.currentLanguage });
                        }
                    } else if (logger.debug) {
                        logger.debug('Translation not found', { key, language: this.currentLanguage });
                    }
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
            { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
            { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
            { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳' },
            { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
            { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
            { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' }
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
