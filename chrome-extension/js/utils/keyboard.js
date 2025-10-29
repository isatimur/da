/**
 * Keyboard Shortcuts Manager
 * Handles keyboard shortcuts for the extension
 */

class KeyboardShortcuts {
    constructor() {
        this.shortcuts = new Map();
        this.isEnabled = true;
        this.init();
    }

    init() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        console.log('Keyboard shortcuts initialized');
    }

    /**
     * Register a keyboard shortcut
     * @param {string} key - Key to listen for
     * @param {Function} callback - Function to call
     * @param {Object} options - Additional options
     */
    register(key, callback, options = {}) {
        const shortcut = {
            key: key.toLowerCase(),
            callback,
            ctrl: options.ctrl || false,
            shift: options.shift || false,
            alt: options.alt || false,
            meta: options.meta || false,
            preventDefault: options.preventDefault !== false,
            description: options.description || ''
        };
        
        this.shortcuts.set(key.toLowerCase(), shortcut);
        console.log(`Registered shortcut: ${key} - ${shortcut.description}`);
    }

    /**
     * Handle keydown events
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeyDown(event) {
        if (!this.isEnabled) return;

        // Don't trigger shortcuts if user is typing in input fields
        const activeElement = document.activeElement;
        const isInputActive = activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.tagName === 'SELECT' ||
            activeElement.isContentEditable ||
            activeElement.getAttribute('contenteditable') === 'true'
        );

        // Block shortcuts if typing in input (except for Escape to close)
        if (isInputActive && event.key !== 'Escape') {
            return;
        }

        // Also check if a modal/dialog is open (except for Escape key)
        const hasOpenModal = event.key !== 'Escape' && document.querySelector('.dialog-base:not(.hidden).show, .premium-modal:not(.hidden), .modal-open');

        // Block shortcuts if modal is open (except Escape to close)
        if (hasOpenModal && event.key !== 'Escape') {
            return;
        }

        const key = event.key.toLowerCase();
        const shortcut = this.shortcuts.get(key);

        if (!shortcut) return;

        // Check modifier keys
        const modifiersMatch = 
            shortcut.ctrl === event.ctrlKey &&
            shortcut.shift === event.shiftKey &&
            shortcut.alt === event.altKey &&
            shortcut.meta === event.metaKey;

        if (!modifiersMatch) return;

        // Prevent default if specified
        if (shortcut.preventDefault) {
            event.preventDefault();
        }

        // Execute callback
        try {
            shortcut.callback(event);
        } catch (error) {
            console.error('Error executing keyboard shortcut:', error);
        }
    }

    /**
     * Enable/disable shortcuts
     * @param {boolean} enabled - Whether to enable shortcuts
     */
    setEnabled(enabled) {
        this.isEnabled = enabled;
        console.log(`Keyboard shortcuts ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Get all registered shortcuts
     * @returns {Array} Array of shortcut objects
     */
    getAllShortcuts() {
        return Array.from(this.shortcuts.values());
    }

    /**
     * Remove a shortcut
     * @param {string} key - Key to remove
     */
    remove(key) {
        this.shortcuts.delete(key.toLowerCase());
        console.log(`Removed shortcut: ${key}`);
    }

    /**
     * Clear all shortcuts
     */
    clear() {
        this.shortcuts.clear();
        console.log('All shortcuts cleared');
    }
}

// Create global instance
const keyboardShortcuts = new KeyboardShortcuts();

export default keyboardShortcuts;
