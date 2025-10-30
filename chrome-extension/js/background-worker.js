// Enhanced Background Service Worker with Caching
const CACHE_NAME = 'daily-affirmations-v1.2.3';
const STATIC_CACHE_NAME = 'daily-affirmations-static-v1.2.3';
const DYNAMIC_CACHE_NAME = 'daily-affirmations-dynamic-v1.2.3';

// Static assets to cache (only external URLs, not chrome-extension://)
const STATIC_ASSETS = [
    // Only include external assets that can be cached
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Merriweather:wght@300;400;700&family=JetBrains+Mono:wght@400;500&display=swap',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
    /\/api\/affirmations/,
    /\/api\/weather/,
    /\/api\/backgrounds/,
    /api\.unsplash\.com/,
    /api\.openweathermap\.org/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(cache => {
                console.log('Caching external static assets...');
                // Only cache external assets that can be cached
                return cache.addAll(STATIC_ASSETS.filter(url => url.startsWith('http')));
            })
            .then(() => {
                console.log('External static assets cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Failed to cache static assets:', error);
                // Don't fail the installation if caching fails
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE_NAME && 
                            cacheName !== DYNAMIC_CACHE_NAME) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Handle messages from the main app
self.addEventListener('message', (event) => {
    if (event.data.type === 'INIT') {
        console.log('Service Worker initialized with API keys');
    } else if (event.data.type === 'CACHE_CLEAR') {
        clearAllCaches();
    } else if (event.data.type === 'CACHE_STATUS') {
        getCacheStatus().then(status => {
            event.ports[0].postMessage(status);
        });
    }
});

// Enhanced fetch event with comprehensive caching
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension:// URLs - they can't be cached
    if (url.protocol === 'chrome-extension:') {
        return;
    }
    
    // Handle different types of requests
    if (isStaticAsset(request)) {
        event.respondWith(handleStaticAsset(request));
    } else if (isAPIRequest(request)) {
        event.respondWith(handleAPIRequest(request));
    } else if (isImageRequest(request)) {
        event.respondWith(handleImageRequest(request));
    } else {
        event.respondWith(handleOtherRequest(request));
    }
});

// Check if request is for static assets
function isStaticAsset(request) {
    const url = new URL(request.url);
    return STATIC_ASSETS.some(asset => url.href === asset) ||
           url.hostname === 'fonts.googleapis.com' ||
           url.hostname === 'fonts.gstatic.com';
}

// Check if request is for API
function isAPIRequest(request) {
    return API_CACHE_PATTERNS.some(pattern => pattern.test(request.url));
}

// Check if request is for images
function isImageRequest(request) {
    const url = new URL(request.url);
    return url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ||
           url.hostname.includes('unsplash.com') ||
           url.hostname.includes('images.unsplash.com');
}

// Handle static asset requests
async function handleStaticAsset(request) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('Serving static asset from cache:', request.url);
            return cachedResponse;
        }
        
        // Fetch from network
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Failed to handle static asset:', error);
        return new Response('Asset not available', { status: 404 });
    }
}

// Handle API requests with cache-first strategy
async function handleAPIRequest(request) {
    try {
        // Try cache first for GET requests
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('Serving API response from cache:', request.url);
            
            // Check if cache is still fresh (5 minutes for API responses)
            const cacheDate = cachedResponse.headers.get('sw-cache-date');
            if (cacheDate && Date.now() - new Date(cacheDate).getTime() < 5 * 60 * 1000) {
                return cachedResponse;
            }
        }
        
        // Fetch from network without mutating request headers
        const networkResponse = await fetch(request.clone());
        
        // Cache successful responses
        if (networkResponse.ok) {
            // Create a new Response with augmented headers since Response headers are immutable
            const responseClone = networkResponse.clone();
            // Create new headers object and copy existing headers
            const cacheHeaders = new Headers();
            
            // Copy all existing headers
            responseClone.headers.forEach((value, key) => {
                cacheHeaders.append(key, value);
            });
            
            // Add cache date header
            cacheHeaders.set('sw-cache-date', new Date().toISOString());
            
            const responseToCache = new Response(await responseClone.blob(), {
                status: responseClone.status,
                statusText: responseClone.statusText,
                headers: cacheHeaders
            });

            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, responseToCache);
        }
        
        return networkResponse;
    } catch (error) {
        console.error('API request failed:', error);
        
        // Return cached response if available
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('Serving stale API response from cache:', request.url);
            return cachedResponse;
        }
        
        return new Response('Service unavailable', { status: 503 });
    }
}

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('Serving image from cache:', request.url);
            return cachedResponse;
        }
        
        // Fetch from network
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Image request failed:', error);
        
        // Return placeholder image or cached version
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return a placeholder image
        return new Response('', { status: 404 });
    }
}

// Handle other requests
async function handleOtherRequest(request) {
    try {
        return await fetch(request);
    } catch (error) {
        console.error('Request failed:', error);
        return new Response('Request failed', { status: 503 });
    }
}

// Clear all caches
async function clearAllCaches() {
    try {
        const cacheNames = await caches.keys();
        await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
        );
        console.log('All caches cleared');
    } catch (error) {
        console.error('Failed to clear caches:', error);
    }
}

// Get cache status
async function getCacheStatus() {
    try {
        const cacheNames = await caches.keys();
        const status = {};
        
        for (const cacheName of cacheNames) {
            const cache = await caches.open(cacheName);
            const keys = await cache.keys();
            status[cacheName] = {
                size: keys.length,
                urls: keys.map(request => request.url)
            };
        }
        
        return status;
    } catch (error) {
        console.error('Failed to get cache status:', error);
        return {};
    }
}

// Periodic cache cleanup
setInterval(async () => {
    try {
        const cache = await caches.open(DYNAMIC_CACHE_NAME);
        const keys = await cache.keys();
        
        // Keep only the most recent 50 items
        if (keys.length > 50) {
            const itemsToDelete = keys.slice(0, keys.length - 50);
            await Promise.all(
                itemsToDelete.map(request => cache.delete(request))
            );
            console.log(`Cleaned up ${itemsToDelete.length} old cache entries`);
        }
    } catch (error) {
        console.error('Cache cleanup failed:', error);
    }
}, 60 * 60 * 1000); // Run every hour 