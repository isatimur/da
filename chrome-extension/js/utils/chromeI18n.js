/**
 * Chrome i18n Bridge Utility
 * Provides integration between Chrome's native i18n and custom i18n system
 */

class ChromeI18n {
    /**
     * Get message from Chrome's i18n system
     * @param {string} key - Message key
     * @param {Object} substitutions - Substitution parameters
     * @returns {string} Translated message
     */
    static getMessage(key, substitutions = {}) {
        try {
            if (typeof chrome !== 'undefined' && chrome.i18n) {
                return chrome.i18n.getMessage(key, Object.values(substitutions));
            }
            // Fallback if chrome.i18n is not available
            return key;
        } catch (error) {
            console.warn('Failed to get Chrome i18n message:', key, error);
            return key;
        }
    }

    /**
     * Get the current locale
     * @returns {string} Current locale code
     */
    static getLocale() {
        try {
            if (typeof chrome !== 'undefined' && chrome.i18n) {
                return chrome.i18n.getUILanguage();
            }
            return 'en';
        } catch (error) {
            console.warn('Failed to get Chrome locale:', error);
            return 'en';
        }
    }

    /**
     * Check if a message exists for the current locale
     * @param {string} key - Message key
     * @returns {boolean} True if message exists
     */
    static hasMessage(key) {
        try {
            if (typeof chrome !== 'undefined' && chrome.i18n) {
                const message = chrome.i18n.getMessage(key);
                return message && message.length > 0;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    /**
     * Initialize Chrome i18n for HTML attributes
     * Processes data-i18n attributes in the document
     */
    static initializeHTMLTranslations() {
        try {
            // Process all elements with data-i18n attribute
            const elements = document.querySelectorAll('[data-i18n]');
            
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = this.getMessage(key);
                
                if (translation && translation !== key) {
                    // Check if this should update innerHTML or textContent
                    const updateType = element.getAttribute('data-i18n-html') !== null
                        ? 'innerHTML'
                        : 'textContent';
                    
                    if (updateType === 'innerHTML') {
                        element.innerHTML = translation;
                    } else {
                        element.textContent = translation;
                    }
                    
                    // Update title attribute if it exists
                    if (element.hasAttribute('title')) {
                        const titleKey = element.getAttribute('data-i18n-title') || key + 'Title';
                        if (this.hasMessage(titleKey)) {
                            element.setAttribute('title', this.getMessage(titleKey));
                        }
                    }
                }
            });

            // Process aria-label attributes
            const labeledElements = document.querySelectorAll('[data-i18n-aria]');
            labeledElements.forEach(element => {
                const key = element.getAttribute('data-i18n-aria');
                const translation = this.getMessage(key);
                
                if (translation && translation !== key) {
                    element.setAttribute('aria-label', translation);
                }
            });
        } catch (error) {
            console.error('Failed to initialize HTML translations:', error);
        }
    }

    /**
     * Get available locales
     * @returns {Array} Array of locale objects
     */
    static getAvailableLocales() {
        return [
            { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
            { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
            { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳' },
            { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
            { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
            { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' }
        ];
    }
}

export default ChromeI18n;
