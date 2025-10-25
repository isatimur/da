import { authService } from './services/auth.js';

// This will be replaced during build with actual key
const DEFAULT_EXTENSION_KEY = '7a7b999d1630dce17af8ab7ca94088ebd4f59d3b09017d40f21f256f757704a8';

// Initialize extension configuration
export async function initializeConfig() {
    try {
        // Set up extension key if not already configured
        const { extension_key } = await chrome.storage.local.get(['extension_key']);
        if (!extension_key && DEFAULT_EXTENSION_KEY !== '6d24b0d811e30f8c8f86f27131f45c18bc79692bcb0cc81a7960a02d2b1aa022') {
            await authService.setExtensionKey(DEFAULT_EXTENSION_KEY);
        }
    } catch (error) {
        console.error('Failed to initialize extension config:', error);
    }
} 