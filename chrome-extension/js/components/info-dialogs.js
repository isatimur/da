// Info Dialogs Component
class InfoDialogs {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.createDialogs();
    }

    setupEventListeners() {
        const footerButtons = document.querySelectorAll('.menu-footer-btn');
        footerButtons.forEach(button => {
            const action = button.getAttribute('title')?.toLowerCase();
            if (action) {
                button.addEventListener('click', () => {
                    const dialogId = `${action}Dialog`;
                    const dialog = document.getElementById(dialogId);
                    if (dialog) {
                        dialog.classList.add('show');
                    }
                });
            }
        });
    }

    createDialogs() {
        // Help Dialog
        this.createDialog('help', {
            title: 'Help & Tips',
            content: `
                <div class="dialog-section">
                    <h4>Getting Started</h4>
                    <div class="help-list">
                        <div class="help-item">
                            <i class="material-icons-round">tab</i>
                            <div>
                                <strong>New Tab</strong>
                                <p>Each new tab shows a fresh daily affirmation with a beautiful background</p>
                            </div>
                        </div>
                        <div class="help-item">
                            <i class="material-icons-round">refresh</i>
                            <div>
                                <strong>Refresh Affirmation</strong>
                                <p>Click the refresh button to see a different affirmation anytime</p>
                            </div>
                        </div>
                        <div class="help-item">
                            <i class="material-icons-round">center_focus_strong</i>
                            <div>
                                <strong>Focus Mode</strong>
                                <p>Toggle focus mode to hide UI elements and focus on your affirmation</p>
                            </div>
                        </div>
                        <div class="help-item">
                            <i class="material-icons-round">settings</i>
                            <div>
                                <strong>Customize</strong>
                                <p>Personalize your experience with themes, fonts, and display options</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog-section">
                    <h4>Pro Features</h4>
                    <div class="help-list">
                        <div class="help-item">
                            <i class="material-icons-round">favorite</i>
                            <div>
                                <strong>Favorites</strong>
                                <p>Save and organize your most meaningful affirmations</p>
                            </div>
                        </div>
                        <div class="help-item">
                            <i class="material-icons-round">edit</i>
                            <div>
                                <strong>Custom Affirmations</strong>
                                <p>Create and manage your personal collection of affirmations</p>
                            </div>
                        </div>
                        <div class="help-item">
                            <i class="material-icons-round">notifications</i>
                            <div>
                                <strong>Reminders</strong>
                                <p>Set custom times to receive your daily affirmation notifications</p>
                            </div>
                        </div>
                        <div class="help-item">
                            <i class="material-icons-round">cloud_sync</i>
                            <div>
                                <strong>Sync & Backup</strong>
                                <p>Keep your affirmations and settings synced across all devices</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        });

        // Feedback Dialog
        this.createDialog('feedback', {
            title: 'Send Feedback',
            content: `
                <div class="dialog-section">
                    <div class="feedback-intro">
                        <i class="material-icons-round">chat</i>
                        <div>
                            <h4>We'd Love to Hear from You!</h4>
                            <p>Your feedback helps us improve Daily Affirmations for everyone.</p>
                        </div>
                    </div>
                    <form class="feedback-form">
                        <select class="dialog-input" required>
                            <option value="">What type of feedback do you have?</option>
                            <option value="suggestion">Feature Suggestion</option>
                            <option value="bug">Report an Issue</option>
                            <option value="content">Affirmation Content</option>
                            <option value="other">Other Feedback</option>
                        </select>
                        <textarea class="dialog-input" required 
                            placeholder="Tell us what's on your mind... We read every message!" 
                            rows="4"></textarea>
                        <button type="submit" class="dialog-button">
                            <i class="material-icons-round">send</i>
                            Send Feedback
                        </button>
                    </form>
                </div>
            `
        });

        // About Dialog
        this.createDialog('about', {
            title: 'About Daily Affirmations',
            content: `
                <div class="dialog-section">
                    <div class="about-header">
                        <img src="images/icon-128.png" alt="Daily Affirmations" />
                        <div>
                            <h4>Daily Affirmations</h4>
                            <span class="version">Version 1.0.0</span>
                        </div>
                    </div>
                    <p class="about-description">
                        Transform your mindset with daily positive affirmations. Our mission is to help you start each day with intention, positivity, and mindfulness.
                    </p>
                </div>
                <div class="dialog-section">
                    <h4>Features</h4>
                    <ul class="about-features">
                        <li>✨ Beautiful backgrounds from Unsplash</li>
                        <li>🎯 Personalized daily affirmations</li>
                        <li>🌤️ Local weather integration</li>
                        <li>💫 Focus mode for mindfulness</li>
                        <li>🔄 Cross-device synchronization</li>
                    </ul>
                </div>
                <div class="dialog-section">
                    <div class="about-footer">
                        <div class="about-links">
                            <a href="https://daily-affirmations.today/privacy" target="_blank">Privacy Policy</a>
                            <span class="separator">•</span>
                            <a href="https://daily-affirmations.today/terms" target="_blank">Terms of Service</a>
                        </div>
                        <p class="copyright">Made with ❤️ by Daily Apps</p>
                    </div>
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
        closeButton?.addEventListener('click', () => dialog.classList.remove('show'));

        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.classList.remove('show');
            }
        });

        // Handle feedback form submission
        if (id === 'feedback') {
            const form = dialog.querySelector('.feedback-form');
            form?.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                console.log('Feedback submitted:', Object.fromEntries(formData));
                dialog.classList.remove('show');
                this.showNotification('Thank you!', 'Your feedback has been received.');
                form.reset();
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