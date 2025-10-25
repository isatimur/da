/**
 * Backup and Restore functionality
 * Handles backup and restore operations for user data
 */

import logger from '../utils/logger.js';
import loadingManager from '../utils/loading.js';

class BackupRestore {
    constructor() {
        this.init();
    }

    init() {
        logger.info('BackupRestore initialized');
        this.setupEventListeners();
    }

    async initialize() {
        logger.info('BackupRestore initialize called');
        try {
            // Check if backup dialog exists
            const backupDialog = document.getElementById('backupDialog');
            if (!backupDialog) {
                logger.debug('Backup dialog not found - this is normal for new installations');
                return Promise.resolve();
            }
            
            // Initialize backup/restore functionality
            this.setupEventListeners();
            return Promise.resolve();
        } catch (error) {
            logger.error('Error initializing backup restore', { error: error.message });
            return Promise.resolve();
        }
    }

    setupEventListeners() {
        // Download backup button
        const downloadButton = document.querySelector('.backup-button.primary');
        if (downloadButton) {
            downloadButton.addEventListener('click', () => {
                this.handleDownloadBackup();
            });
        }

        // Restore backup button
        const restoreButton = document.querySelector('.backup-button.secondary');
        if (restoreButton) {
            restoreButton.addEventListener('click', () => {
                this.handleRestoreBackup();
            });
        }

        logger.debug('Backup restore event listeners setup');
    }

    async handleDownloadBackup() {
        try {
            logger.info('Starting backup download');
            const loaderId = loadingManager.showLoading(
                document.querySelector('#backupDialog .dialog-content'),
                'Creating backup...',
                true
            );

            const backup = await this.createBackup();
            await this.downloadBackup(backup);
            
            loadingManager.hideLoading(loaderId);
            loadingManager.showSuccess('Backup downloaded successfully!');
            
            logger.info('Backup download completed');
        } catch (error) {
            logger.error('Backup download failed', { error: error.message });
            loadingManager.showError('Failed to create backup: ' + error.message);
        }
    }

    async handleRestoreBackup() {
        try {
            logger.info('Starting backup restore');
            
            // Create file input
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.style.display = 'none';
            
            input.addEventListener('change', async (event) => {
                const file = event.target.files[0];
                if (!file) return;

                try {
                    const loaderId = loadingManager.showLoading(
                        document.querySelector('#backupDialog .dialog-content'),
                        'Restoring backup...',
                        true
                    );

                    await this.uploadBackup(file);
                    
                    loadingManager.hideLoading(loaderId);
                    loadingManager.showSuccess('Backup restored successfully!');
                    
                    // Reload the page to apply restored settings
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                    
                    logger.info('Backup restore completed');
                } catch (error) {
                    logger.error('Backup restore failed', { error: error.message });
                    loadingManager.showError('Failed to restore backup: ' + error.message);
                }
            });

            document.body.appendChild(input);
            input.click();
            document.body.removeChild(input);
            
        } catch (error) {
            logger.error('Backup restore setup failed', { error: error.message });
            loadingManager.showError('Failed to setup backup restore: ' + error.message);
        }
    }

    async createBackup() {
        try {
            logger.debug('Creating backup data');
            const data = await chrome.storage.local.get();
            
            // Filter out sensitive data
            const filteredData = this.filterSensitiveData(data);
            
            const backup = {
                timestamp: new Date().toISOString(),
                version: '1.0',
                extensionVersion: chrome.runtime.getManifest().version,
                data: filteredData,
                metadata: {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    language: navigator.language
                }
            };
            
            logger.info('Backup created successfully', { 
                dataSize: JSON.stringify(backup).length,
                itemCount: Object.keys(filteredData).length 
            });
            
            return backup;
        } catch (error) {
            logger.error('Error creating backup', { error: error.message });
            throw error;
        }
    }

    filterSensitiveData(data) {
        const sensitiveKeys = ['apiKey', 'token', 'password', 'secret'];
        const filtered = {};
        
        Object.entries(data).forEach(([key, value]) => {
            const isSensitive = sensitiveKeys.some(sensitive => 
                key.toLowerCase().includes(sensitive.toLowerCase())
            );
            
            if (!isSensitive) {
                filtered[key] = value;
            }
        });
        
        return filtered;
    }

    async restoreBackup(backupData) {
        try {
            logger.debug('Starting backup restore');
            
            if (!backupData || !backupData.data) {
                throw new Error('Invalid backup data');
            }
            
            // Validate backup version compatibility
            if (backupData.version && backupData.version !== '1.0') {
                logger.warn('Backup version mismatch', { 
                    backupVersion: backupData.version,
                    currentVersion: '1.0' 
                });
            }
            
            // Clear existing data
            await chrome.storage.local.clear();
            
            // Restore data
            await chrome.storage.local.set(backupData.data);
            
            logger.info('Backup restored successfully', { 
                itemCount: Object.keys(backupData.data).length,
                backupTimestamp: backupData.timestamp 
            });
            
            return true;
        } catch (error) {
            logger.error('Error restoring backup', { error: error.message });
            throw error;
        }
    }

    async downloadBackup(backup) {
        try {
            const blob = new Blob([JSON.stringify(backup, null, 2)], {
                type: 'application/json'
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `daily-affirmations-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.style.display = 'none';
            
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            logger.debug('Backup file downloaded');
        } catch (error) {
            logger.error('Error downloading backup', { error: error.message });
            throw error;
        }
    }

    async uploadBackup(file) {
        try {
            logger.debug('Processing uploaded backup file');
            
            const text = await file.text();
            const backupData = JSON.parse(text);
            
            // Validate backup structure
            if (!this.validateBackup(backupData)) {
                throw new Error('Invalid backup file format');
            }
            
            await this.restoreBackup(backupData);
            return true;
        } catch (error) {
            logger.error('Error uploading backup', { error: error.message });
            throw error;
        }
    }

    validateBackup(backupData) {
        const requiredFields = ['timestamp', 'version', 'data'];
        return requiredFields.every(field => backupData.hasOwnProperty(field));
    }

    async getBackupInfo() {
        try {
            const data = await chrome.storage.local.get();
            const filteredData = this.filterSensitiveData(data);
            
            return {
                itemCount: Object.keys(filteredData).length,
                dataSize: JSON.stringify(filteredData).length,
                lastModified: new Date().toISOString()
            };
        } catch (error) {
            logger.error('Error getting backup info', { error: error.message });
            throw error;
        }
    }

    show() {
        logger.debug('BackupRestore show called');
        const backupDialog = document.getElementById('backupDialog');
        if (backupDialog) {
            backupDialog.classList.remove('hidden');
            this.updateBackupInfo();
        }
    }

    hide() {
        logger.debug('BackupRestore hide called');
        const backupDialog = document.getElementById('backupDialog');
        if (backupDialog) {
            backupDialog.classList.add('hidden');
        }
    }

    async updateBackupInfo() {
        try {
            const info = await this.getBackupInfo();
            const lastBackupTime = document.querySelector('.last-backup-time');
            
            if (lastBackupTime) {
                lastBackupTime.textContent = `Last backup: ${info.lastModified}`;
            }
        } catch (error) {
            logger.error('Error updating backup info', { error: error.message });
        }
    }
}

// Initialize backup restore functionality
const backupRestore = new BackupRestore();

export default backupRestore;
