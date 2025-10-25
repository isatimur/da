/**
 * Theme Management Utility
 * Handles dynamic theme switching and CSS custom properties
 */

class ThemeManager {
    constructor() {
        this.themes = {
            light: {
                '--color-background': 'rgba(255, 255, 255, 0.9)',
                '--color-text-primary': 'rgba(0, 0, 0, 0.9)',
                '--color-text-secondary': 'rgba(0, 0, 0, 0.7)',
                '--glass-bg': 'rgba(255, 255, 255, 0.8)',
                '--glass-border': 'rgba(0, 0, 0, 0.1)',
                '--accent-color': '#4f46e5',
                '--theme-surface': 'rgba(255, 255, 255, 0.8)'
            },
            dark: {
                '--color-background': 'rgba(23, 23, 23, 0.8)',
                '--color-text-primary': 'rgba(255, 255, 255, 0.9)',
                '--color-text-secondary': 'rgba(255, 255, 255, 0.7)',
                '--glass-bg': 'rgba(255, 255, 255, 0.08)',
                '--glass-border': 'rgba(255, 255, 255, 0.1)',
                '--accent-color': '#4f46e5',
                '--theme-surface': 'rgba(255, 255, 255, 0.08)'
            },
            auto: {} // Will be set based on system preference
        };
        
        this.currentTheme = 'dark'; // Default theme
        this.init();
    }

    init() {
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
            
            // Set initial auto theme
            if (this.currentTheme === 'auto') {
                this.setTheme('auto');
            }
        }
        
        console.log('Theme manager initialized');
    }

    /**
     * Set the current theme
     * @param {string} themeName - Name of the theme to apply
     */
    setTheme(themeName) {
        if (!this.themes[themeName]) {
            console.warn(`Theme '${themeName}' not found`);
            return;
        }

        this.currentTheme = themeName;
        
        // Apply theme variables
        const root = document.documentElement;
        const theme = this.themes[themeName];
        
        Object.entries(theme).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });

        // Update body class for theme-specific styles
        document.body.className = document.body.className
            .replace(/theme-\w+/, '')
            .trim();
        document.body.classList.add(`theme-${themeName}`);

        // Store theme preference
        chrome.storage.local.set({ theme: themeName });
        
        console.log(`Theme changed to: ${themeName}`);
    }

    /**
     * Get the current theme
     * @returns {string} Current theme name
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Handle system theme changes for auto theme
     * @param {MediaQueryListEvent} event - Media query change event
     */
    handleSystemThemeChange(event) {
        if (this.currentTheme === 'auto') {
            const isDark = event.matches;
            const systemTheme = isDark ? 'dark' : 'light';
            
            // Apply system theme without changing the auto setting
            const root = document.documentElement;
            const theme = this.themes[systemTheme];
            
            Object.entries(theme).forEach(([property, value]) => {
                root.style.setProperty(property, value);
            });
            
            console.log(`Auto theme updated to: ${systemTheme}`);
        }
    }

    /**
     * Load theme from storage
     */
    async loadTheme() {
        try {
            const { theme } = await chrome.storage.local.get(['theme']);
            if (theme && this.themes[theme]) {
                this.setTheme(theme);
            }
        } catch (error) {
            console.error('Failed to load theme:', error);
        }
    }

    /**
     * Add a custom theme
     * @param {string} name - Theme name
     * @param {Object} variables - CSS custom properties
     */
    addTheme(name, variables) {
        this.themes[name] = variables;
        console.log(`Added custom theme: ${name}`);
    }

    /**
     * Get all available themes
     * @returns {Array} Array of theme names
     */
    getAvailableThemes() {
        return Object.keys(this.themes);
    }

    /**
     * Update a specific CSS custom property
     * @param {string} property - CSS property name
     * @param {string} value - CSS property value
     */
    updateProperty(property, value) {
        document.documentElement.style.setProperty(property, value);
        console.log(`Updated CSS property: ${property} = ${value}`);
    }

    /**
     * Reset theme to default
     */
    resetTheme() {
        this.setTheme('dark');
    }
}

// Create global instance
const themeManager = new ThemeManager();

export default themeManager;
