/**
 * Onboarding Modal Component
 * Beautiful interactive onboarding for first-time users
 */

import logger from '../utils/logger.js';
import i18n from '../utils/i18n.js';

class OnboardingModal {
    constructor() {
        this.modal = null;
        this.currentStep = 0;
        this.totalSteps = 5;
        this.hasSeenOnboarding = false;
        this.init();
    }

    async init() {
        try {
            // Check if user has already seen onboarding
            const result = await chrome.storage.local.get(['hasSeenOnboarding']);
            this.hasSeenOnboarding = result.hasSeenOnboarding || false;
            
            // Create modal (hidden by default)
            this.createModal();
            logger.info('Onboarding modal initialized');
        } catch (error) {
            logger.error('Failed to initialize onboarding modal', { error: error.message });
        }
    }

    createModal() {
        // Remove existing modal if present
        const existing = document.getElementById('onboardingModal');
        if (existing) {
            existing.remove();
        }

        this.modal = document.createElement('div');
        this.modal.id = 'onboardingModal';
        this.modal.className = 'onboarding-modal';
        this.modal.setAttribute('aria-hidden', 'true');
        this.modal.innerHTML = this.getModalHTML();
        
        document.body.appendChild(this.modal);
        this.attachEventListeners();
    }

    getModalHTML() {
        return `
            <div class="onboarding-modal-backdrop"></div>
            <div class="onboarding-modal-container">
                <div class="onboarding-modal-header">
                    <div class="onboarding-logo">
                        <i class="material-icons-round">auto_awesome</i>
                    </div>
                    <h2 class="onboarding-title">Welcome to Daily Affirmations!</h2>
                    <p class="onboarding-subtitle">Let's get you started with a quick tour</p>
                </div>
                
                <div class="onboarding-modal-content">
                    <div class="onboarding-progress">
                        <div class="onboarding-progress-bar" id="onboardingProgressBar"></div>
                    </div>
                    
                    <div class="onboarding-steps" id="onboardingSteps">
                        ${this.getStepHTML(0)}
                    </div>
                </div>
                
                <div class="onboarding-modal-footer">
                    <button class="onboarding-skip-btn" id="onboardingSkipBtn">
                        Skip Tour
                    </button>
                    <div class="onboarding-nav-buttons">
                        <button class="onboarding-prev-btn hidden" id="onboardingPrevBtn">
                            <i class="material-icons-round">arrow_back</i>
                            Previous
                        </button>
                        <button class="onboarding-next-btn" id="onboardingNextBtn">
                            Next
                            <i class="material-icons-round">arrow_forward</i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getStepHTML(stepIndex) {
        const steps = [
            {
                icon: '🌅',
                title: 'Start Your Day Right',
                description: 'Get a beautiful daily affirmation to inspire and motivate you.',
                features: ['Daily inspirational quotes', 'Beautiful backgrounds', 'Weather & time widgets']
            },
            {
                icon: '⌨️',
                title: 'Keyboard Shortcuts',
                description: 'Navigate quickly with these powerful shortcuts:',
                features: [
                    '<kbd>T</kbd> - Open Task Manager',
                    '<kbd>B</kbd> - Start Breathing Exercise',
                    '<kbd>S</kbd> - Open Settings',
                    '<kbd>F</kbd> - Toggle Focus Mode',
                    '<kbd>Space</kbd> - Get New Affirmation'
                ],
                special: 'keyboard'
            },
            {
                icon: '✅',
                title: 'Task Management',
                description: 'Organize your day with our powerful task manager:',
                features: ['Create & manage tasks', 'Set priorities & due dates', 'Track your progress', 'Focus mode for productivity']
            },
            {
                icon: '🧘',
                title: 'Breathing Exercises',
                description: 'Take a mindful break with guided breathing:',
                features: ['Multiple breathing patterns', 'Adjustable duration', 'Track your sessions', 'Statistics & streaks']
            },
            {
                icon: '⚙️',
                title: 'Customize Everything',
                description: 'Make it your own:',
                features: ['Beautiful themes', 'Custom backgrounds', 'Font styles', 'Multiple languages']
            }
        ];

        const step = steps[stepIndex];
        if (!step) return '';

        return `
            <div class="onboarding-step active" data-step="${stepIndex}">
                <div class="onboarding-step-icon">${step.icon}</div>
                <h3 class="onboarding-step-title">${step.title}</h3>
                <p class="onboarding-step-description">${step.description}</p>
                <ul class="onboarding-step-features ${step.special || ''}">
                    ${step.features.map(feature => `
                        <li>${feature}</li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    attachEventListeners() {
        // Skip button
        const skipBtn = document.getElementById('onboardingSkipBtn');
        skipBtn?.addEventListener('click', () => {
            this.close();
        });

        // Next button
        const nextBtn = document.getElementById('onboardingNextBtn');
        nextBtn?.addEventListener('click', () => {
            this.nextStep();
        });

        // Previous button
        const prevBtn = document.getElementById('onboardingPrevBtn');
        prevBtn?.addEventListener('click', () => {
            this.prevStep();
        });

        // Close on backdrop click
        const backdrop = this.modal.querySelector('.onboarding-modal-backdrop');
        backdrop?.addEventListener('click', () => {
            this.close();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.close();
            }
        });
    }

    async show() {
        if (this.hasSeenOnboarding) {
            logger.debug('User has already seen onboarding, skipping');
            return;
        }

        this.modal.classList.remove('hidden');
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Animate in
        requestAnimationFrame(() => {
            this.modal.classList.add('active');
        });

        this.currentStep = 0;
        this.updateStep();
        logger.info('Onboarding modal shown');
    }

    nextStep() {
        if (this.currentStep < this.totalSteps - 1) {
            this.currentStep++;
            this.updateStep();
        } else {
            this.complete();
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateStep();
        }
    }

    updateStep() {
        const stepsContainer = document.getElementById('onboardingSteps');
        if (!stepsContainer) return;

        // Update step content
        stepsContainer.innerHTML = this.getStepHTML(this.currentStep);

        // Update progress bar
        const progressBar = document.getElementById('onboardingProgressBar');
        if (progressBar) {
            const progress = ((this.currentStep + 1) / this.totalSteps) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Update navigation buttons
        const prevBtn = document.getElementById('onboardingPrevBtn');
        const nextBtn = document.getElementById('onboardingNextBtn');
        
        if (prevBtn) {
            if (this.currentStep === 0) {
                prevBtn.classList.add('hidden');
            } else {
                prevBtn.classList.remove('hidden');
            }
        }

        if (nextBtn) {
            if (this.currentStep === this.totalSteps - 1) {
                nextBtn.innerHTML = `
                    Get Started
                    <i class="material-icons-round">check_circle</i>
                `;
            } else {
                nextBtn.innerHTML = `
                    Next
                    <i class="material-icons-round">arrow_forward</i>
                `;
            }
        }
    }

    async complete() {
        // Mark onboarding as complete
        await chrome.storage.local.set({ hasSeenOnboarding: true });
        this.hasSeenOnboarding = true;
        
        // Close modal
        this.close();
        
        logger.info('Onboarding completed');
    }

    close() {
        this.modal.classList.remove('active');
        
        setTimeout(() => {
            this.modal.classList.add('hidden');
            this.modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }, 300);
    }

    // Public method to manually trigger onboarding
    async resetOnboarding() {
        await chrome.storage.local.remove('hasSeenOnboarding');
        this.hasSeenOnboarding = false;
        this.show();
    }
}

// Create singleton instance
const onboardingModal = new OnboardingModal();

export default onboardingModal;

