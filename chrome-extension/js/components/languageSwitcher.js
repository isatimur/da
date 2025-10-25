/**
 * Language Switcher Component
 * Provides language selection functionality
 */

import logger from '../utils/logger.js';
import i18n from '../utils/i18n.js';

class LanguageSwitcher {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            showFlags: true,
            showNames: true,
            ...options
        };
        
        this.init();
    }

    /**
     * Initialize the language switcher
     */
    init() {
        this.createSwitcher();
        this.setupEventListeners();
        this.updateDisplay();
    }

    /**
     * Create the language switcher UI
     */
    createSwitcher() {
        this.container.innerHTML = '';
        this.container.className = 'language-switcher';

        // Create label
        const label = document.createElement('label');
        label.textContent = i18n.t('settings.language');
        label.className = 'language-switcher-label';

        // Create select element
        this.select = document.createElement('select');
        this.select.className = 'language-switcher-select';
        this.select.id = 'language-select';

        // Populate with available languages
        const languages = i18n.getAvailableLanguages();
        languages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang.code;
            option.textContent = this.options.showFlags ? 
                `${lang.flag} ${lang.name}` : lang.name;
            this.select.appendChild(option);
        });

        // Set current language
        this.select.value = i18n.getCurrentLanguage();

        this.container.appendChild(label);
        this.container.appendChild(this.select);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        this.select.addEventListener('change', (e) => {
            this.handleLanguageChange(e.target.value);
        });

        // Listen for language change events
        document.addEventListener('languageChanged', () => {
            this.updateDisplay();
        });
    }

    /**
     * Handle language change
     */
    async handleLanguageChange(languageCode) {
        try {
            await i18n.setLanguage(languageCode);
            logger.info('Language changed via switcher', { language: languageCode });
        } catch (error) {
            logger.error('Failed to change language', { error: error.message });
            // Revert selection
            this.select.value = i18n.getCurrentLanguage();
        }
    }

    /**
     * Update display after language change
     */
    updateDisplay() {
        // Update label
        const label = this.container.querySelector('.language-switcher-label');
        if (label) {
            label.textContent = i18n.t('settings.language');
        }

        // Update select value
        this.select.value = i18n.getCurrentLanguage();
    }

    /**
     * Destroy the component
     */
    destroy() {
        if (this.select) {
            this.select.removeEventListener('change', this.handleLanguageChange);
        }
        this.container.innerHTML = '';
    }
}

// Export for use in other modules
export default LanguageSwitcher;
