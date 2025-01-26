// Info Dialogs Component
class InfoDialogs {
    constructor() {
        this.helpContent = {
            title: 'Help & FAQ',
            sections: [
                {
                    title: 'Getting Started',
                    items: [
                        'New Tab: Opens automatically in new tabs',
                        'Weather: Shows local weather (requires location)',
                        'Backgrounds: Changes daily or on refresh',
                        'Affirmations: Updates daily or on demand'
                    ]
                },
                {
                    title: 'Features',
                    items: [
                        'Focus Mode: Hide UI elements for distraction-free view',
                        'Custom Themes: Change background themes and styles',
                        'Save Favorites: Bookmark your favorite affirmations',
                        'Daily Reminders: Get notifications at chosen times'
                    ]
                }
            ]
        };

        this.aboutContent = {
            title: 'About Daily Affirmations',
            version: '1.0.0',
            description: 'Start each day with positivity and mindfulness. Daily Affirmations brings you inspiring messages and beautiful backgrounds to enhance your daily routine.',
            credits: [
                'Photos by Unsplash',
                'Weather data by OpenWeather',
                'Made with ❤️ by Daily Apps'
            ],
            links: [
                { text: 'Privacy Policy', url: 'https://daily-affirmations.today/privacy' },
                { text: 'Terms of Service', url: 'https://daily-affirmations.today/terms' }
            ]
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Find all menu footer buttons
        const footerButtons = document.querySelectorAll('.menu-footer-btn');
        
        footerButtons.forEach(button => {
            const icon = button.querySelector('i.material-icons-round');
            if (!icon) return;

            switch (icon.textContent.trim()) {
                case 'help':
                    button.addEventListener('click', () => this.showHelpDialog());
                    break;
                case 'feedback':
                    button.addEventListener('click', () => this.showFeedbackDialog());
                    break;
                case 'info':
                    button.addEventListener('click', () => this.showAboutDialog());
                    break;
            }
        });
    }

    showHelpDialog() {
        const content = this.helpContent;
        const dialog = this.createDialog(content.title);

        const helpContent = document.createElement('div');
        helpContent.className = 'help-content';

        content.sections.forEach(section => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'help-section menu-group';
            
            sectionEl.innerHTML = `
                <h4>${section.title}</h4>
                <ul>
                    ${section.items.map(item => `
                        <li>
                            <i class="material-icons-round">arrow_right</i>
                            ${item}
                        </li>
                    `).join('')}
                </ul>
            `;
            
            helpContent.appendChild(sectionEl);
        });

        dialog.querySelector('.dialog-content').appendChild(helpContent);
        document.body.appendChild(dialog);
    }

    showFeedbackDialog() {
        const dialog = this.createDialog('Send Feedback');
        const content = document.createElement('div');
        content.className = 'feedback-content';
        
        content.innerHTML = `
            <div class="menu-group">
                <h4>Share Your Thoughts</h4>
                <p class="feedback-intro">Help us improve Daily Affirmations! Share your thoughts, report issues, or suggest new features.</p>
                <form class="feedback-form">
                    <select required>
                        <option value="">Select feedback type...</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="bug">Report a bug</option>
                        <option value="content">Content feedback</option>
                        <option value="other">Other</option>
                    </select>
                    <textarea required placeholder="Your feedback..." rows="4"></textarea>
                    <button type="submit" class="primary-button">Send Feedback</button>
                </form>
            </div>
        `;

        content.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            // TODO: Implement feedback submission
            dialog.remove();
            this.showNotification('Thank you!', 'Your feedback has been sent.');
        });

        dialog.querySelector('.dialog-content').appendChild(content);
        document.body.appendChild(dialog);
    }

    showAboutDialog() {
        const content = this.aboutContent;
        const dialog = this.createDialog(content.title);
        
        const aboutContent = document.createElement('div');
        aboutContent.className = 'about-content';
        
        aboutContent.innerHTML = `
            <div class="about-header">
                <img src="images/icon-128.png" alt="Daily Affirmations" />
                <span class="version">Version ${content.version}</span>
            </div>
            <p class="description">${content.description}</p>
            <div class="menu-group">
                <h4>Credits</h4>
                <div class="credits">
                    ${content.credits.map(credit => `<div>${credit}</div>`).join('')}
                </div>
            </div>
            <div class="menu-group">
                <h4>Legal</h4>
                <div class="links">
                    ${content.links.map(link => 
                        `<a href="${link.url}" target="_blank" rel="noopener">${link.text}</a>`
                    ).join(' • ')}
                </div>
            </div>
        `;

        dialog.querySelector('.dialog-content').appendChild(aboutContent);
        document.body.appendChild(dialog);
    }

    createDialog(title) {
        const dialog = document.createElement('div');
        dialog.className = 'info-dialog glass';
        
        dialog.innerHTML = `
            <div class="dialog-header">
                <h3>${title}</h3>
                <button class="close-button">
                    <i class="material-icons-round">close</i>
                </button>
            </div>
            <div class="dialog-content"></div>
        `;

        dialog.querySelector('.close-button').addEventListener('click', () => {
            dialog.remove();
        });

        return dialog;
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
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

export default new InfoDialogs(); 