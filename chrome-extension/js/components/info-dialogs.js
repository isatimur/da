// Info Dialogs Component
import i18n from '../utils/i18n.js';

class InfoDialogs {
    constructor() {
        this.dialogs = new Map();
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.createDialogs();
        this.setupLanguageChangeListener();
    }

    setupLanguageChangeListener() {
        document.addEventListener('languageChanged', () => {
            this.updateTranslations();
        });
    }

    updateTranslations() {
        this.createDialogs(); // Recreate dialogs with new translations
    }

    setupEventListeners() {
        const footerButtons = document.querySelectorAll('.menu-footer-btn');
        footerButtons.forEach(button => {
            const action = button.getAttribute('title')?.toLowerCase();
            if (action) {
                button.addEventListener('click', () => {
                    const dialogId = `${action.replace('send ', '')}Dialog`;
                    const dialog = document.getElementById(dialogId);
                    if (dialog) {
                        dialog.classList.add('visible');
                        dialog.classList.add('show');
                    }
                });
            }
        });
    }

    createDialogs() {
        // Remove old dialogs
        document.querySelectorAll('[id$="Dialog"]').forEach(d => {
            if (['helpDialog', 'feedbackDialog', 'aboutDialog'].includes(d.id)) {
                d.remove();
            }
        });

        // Create Help dialog
        this.createDialog('help', {
            title: i18n.t('help.title'),
            content: `
                <div class="help-list">
                    <div class="help-item">
                        <i class="material-icons-round">new_releases</i>
                        <div>
                            <strong>${i18n.t('help.gettingStarted')}</strong>
                            <p>${i18n.t('help.gettingStartedDesc')}</p>
                        </div>
                    </div>
                    <div class="help-item">
                        <i class="material-icons-round">favorite</i>
                        <div>
                            <strong>${i18n.t('help.favorites')}</strong>
                            <p>${i18n.t('help.favoritesDesc')}</p>
                        </div>
                    </div>
                    <div class="help-item">
                        <i class="material-icons-round">edit</i>
                        <div>
                            <strong>${i18n.t('help.customAffirmations')}</strong>
                            <p>${i18n.t('help.customAffirmationsDesc')}</p>
                        </div>
                    </div>
                </div>
            `
        });

        // Create Feedback dialog
        this.createDialog('feedback', {
            title: i18n.t('feedback.title'),
            content: `
                <div class="feedback-intro">
                    <i class="material-icons-round">chat</i>
                    <div>
                        <h4>${i18n.t('feedback.intro')}</h4>
                        <p>${i18n.t('feedback.description')}</p>
                    </div>
                </div>
                <form class="feedback-form">
                    <select class="dialog-input" name="type" required>
                        <option value="" disabled selected>${i18n.t('feedback.selectFeedbackType')}</option>
                        <option value="suggestion">${i18n.t('feedback.suggestion')}</option>
                        <option value="bug">${i18n.t('feedback.bugReport')}</option>
                        <option value="other">${i18n.t('feedback.other')}</option>
                    </select>
                    <input type="email" class="dialog-input" name="email" placeholder="${i18n.t('feedback.yourEmail')}">
                    <textarea class="dialog-input" name="message" rows="4" placeholder="${i18n.t('feedback.tellUs')}" required></textarea>
                    <label class="checkbox-label">
                        <input type="checkbox" name="subscribe">
                        ${i18n.t('feedback.keepMeUpdated')}
                    </label>
                    <button type="submit" class="dialog-button primary">
                        <i class="material-icons-round">send</i>
                        ${i18n.t('feedback.sendFeedback')}
                    </button>
                </form>
            `
        });

        // Create About dialog
        this.createDialog('about', {
            title: i18n.t('about.title'),
            content: `
                <div class="about-header">
                    <h4>${i18n.t('about.version')} 1.2.3</h4>
                    <p>${i18n.t('about.description')}</p>
                </div>
                <div class="about-features">
                    <ul>
                        <li><i class="material-icons-round">auto_awesome</i> ${i18n.t('about.dailyCuratedAffirmations')}</li>
                        <li><i class="material-icons-round">favorite</i> ${i18n.t('about.saveFavorites')}</li>
                        <li><i class="material-icons-round">edit</i> ${i18n.t('about.createCustom')}</li>
                        <li><i class="material-icons-round">backup</i> ${i18n.t('about.cloudBackup')}</li>
                    </ul>
                </div>
                <div class="about-footer">
                    <div class="about-links">
                        <a href="/privacy" target="_blank">${i18n.t('about.privacyPolicy')}</a>
                        <span class="separator">${i18n.t('about.separator')}</span>
                        <a href="/terms" target="_blank">${i18n.t('about.termsOfService')}</a>
                    </div>
                    <p class="copyright">${i18n.t('about.copyright')}</p>
                </div>
            `
        });
    }

    createDialog(id, { title, content }) {
        const dialog = document.createElement('div');
        dialog.id = `${id}Dialog`;
        dialog.className = 'dialog-base';
        
        dialog.innerHTML = `
            <div class="dialog-content">
                <div class="dialog-header">
                    <h3>${title}</h3>
                    <button class="close-button">
                        <i class="material-icons-round">close</i>
                    </button>
                </div>
                <div class="dialog-body">
                    ${content}
                </div>
            </div>
        `;

        // Add event listeners
        const closeButton = dialog.querySelector('.close-button');
        closeButton?.addEventListener('click', () => {
            dialog.classList.remove('visible');
            dialog.classList.remove('show');
        });

        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.classList.remove('visible');
                dialog.classList.remove('show');
            }
        });

        // Handle feedback form submission
        if (id === 'feedback') {
            const form = dialog.querySelector('.feedback-form');
            form?.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Get submit button reference before try block
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                try {
                    // Show loading state
                    submitButton.disabled = true;
                    submitButton.innerHTML = `<i class="material-icons-round">hourglass_top</i> ${i18n.t('feedback.sending')}`;
                    
                    // Send feedback to API
                    const response = await fetch('https://daily-affirmation.today/api/feedback', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            type: data.type,
                            email: data.email || undefined,
                            message: data.message,
                            subscribe: data.subscribe === 'on',
                            source: 'chrome_extension',
                            version: chrome.runtime.getManifest().version
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to send feedback');
                    }
                    
                    // Success
                    dialog.classList.remove('visible');
                    dialog.classList.remove('show');
                    this.showNotification(i18n.t('feedback.thankYou'), i18n.t('feedback.thankYouDesc'));
                    form.reset();
                } catch (error) {
                    console.error('Failed to submit feedback:', error);
                    this.showNotification(i18n.t('feedback.error'), i18n.t('feedback.errorDesc'));
                } finally {
                    // Reset button state
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                }
            });
        }

        document.body.appendChild(dialog);
    }

    showNotification(title, message) {
        const notification = document.createElement('div');
        notification.className = 'notification glass';
        notification.innerHTML = `
            <div class="notification-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Create and export singleton instance
const infoDialogs = new InfoDialogs();
export default infoDialogs; 