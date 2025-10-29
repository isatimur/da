// Favorite Affirmations Component
import affirmationsService from '../services/affirmations.js';
import { showNotification } from '../utils/common.js';
import i18n from '../utils/i18n.js';

class FavoriteAffirmations {
    constructor() {
        this.container = document.querySelector('.favorite-affirmations-list');
        this.emptyState = document.querySelector('.favorite-affirmations-empty');
    }

    async initialize() {
        try {
            await this.loadFavorites();
            this.setupEventListeners();
        } catch (error) {
            console.error('Failed to initialize favorite affirmations:', error);
        }
    }

    async loadFavorites() {
        try {
            const favorites = await affirmationsService.getFavoriteAffirmationsWithMetadata();
            this.renderFavorites(favorites);
        } catch (error) {
            if (error.code === 'PREMIUM_REQUIRED') {
                this.showPremiumRequired();
            } else {
                console.error('Failed to load favorites:', error);
            }
        }
    }

    renderFavorites(favorites) {
        if (!this.container) return;

        if (!favorites.length) {
            this.showEmptyState();
            return;
        }

        this.container.innerHTML = favorites.map(favorite => `
            <div class="favorite-item">
                <div class="favorite-content">
                    <p class="favorite-text">${favorite.text}</p>
                    <div class="favorite-metadata">
                        <span class="favorite-date">${new Date(favorite.addedAt).toLocaleDateString()}</span>
                        ${favorite.tags.map(tag => `<span class="favorite-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="favorite-actions">
                    <button class="action-icon" data-action="remove" title="${i18n.t('common.removeFromSaved')}">
                        <i class="material-icons-round">close</i>
                    </button>
                    <button class="action-icon" data-action="use" title="${i18n.t('dialogs.useAffirmation')}">
                        <i class="material-icons-round">refresh</i>
                    </button>
                </div>
            </div>
        `).join('');

        this.hideEmptyState();
    }

    showEmptyState() {
        if (this.emptyState) {
            this.emptyState.style.display = 'flex';
        }
        if (this.container) {
            this.container.style.display = 'none';
        }
    }

    hideEmptyState() {
        if (this.emptyState) {
            this.emptyState.style.display = 'none';
        }
        if (this.container) {
            this.container.style.display = 'block';
        }
    }

    showPremiumRequired() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="premium-required">
                    <i class="material-icons-round">star</i>
                    <h3>${i18n.t('premium.title')}</h3>
                    <p>${i18n.t('premium.upgrade')}</p>
                    <button class="upgrade-button">${i18n.t('premium.upgrade')}</button>
                </div>
            `;
        }
    }

    setupEventListeners() {
        if (!this.container) return;

        this.container.addEventListener('click', async (e) => {
            const button = e.target.closest('.action-icon');
            if (!button) return;

            const action = button.dataset.action;
            const favoriteItem = button.closest('.favorite-item');
            const text = favoriteItem?.querySelector('.favorite-text')?.textContent;

            if (!text) return;

            try {
                switch (action) {
                    case 'remove':
                        await affirmationsService.removeFromFavorites(text);
                        await this.loadFavorites();
                        showNotification(i18n.t('common.success'), i18n.t('notifications.favoritesRemoved'));
                        break;

                    case 'use':
                        affirmationsService.updateDisplay(text);
                        showNotification(i18n.t('common.success'), i18n.t('common.success'));
                        break;
                }
            } catch (error) {
                console.error('Failed to handle favorite action:', error);
                showNotification('Error', 'Failed to perform action');
            }
        });
    }
}

const favoriteAffirmations = new FavoriteAffirmations();
export default favoriteAffirmations; 