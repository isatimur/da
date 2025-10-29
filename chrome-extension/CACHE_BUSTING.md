# Cache Busting Instructions

## Problem
When making changes to the extension, especially to translation files and JavaScript modules, the browser cache may serve old files instead of the new ones.

## Solutions Implemented

### 1. Version-Based Cache Busting
All resource URLs now include a version query parameter (`?v=1.2.2`):
- JavaScript files: `js/app.js?v=1.2.2`
- CSS files: `css/bundle.min.css?v=1.2.2`

### 2. Updated Cache Names
Service worker cache names updated to version 1.2.2:
- `daily-affirmations-v1.2.2`
- `daily-affirmations-static-v1.2.2`
- `daily-affirmations-dynamic-v1.2.2`

## How to Clear Cache During Development

### Method 1: Developer Tools (Recommended)
1. Open Chrome DevTools (F12)
2. Go to **Application** tab
3. Click **Storage** in the left sidebar
4. Under "Clear site data", click the button
5. Check all checkboxes:
   - Local and session storage
   - IndexedDB
   - Cookies
   - Cache storage
6. Click "Clear site data"

### Method 2: Hard Refresh
1. Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. This forces a hard refresh without cache

### Method 3: Reload Extension
1. Go to `chrome://extensions/`
2. Find "Daily Affirmations" extension
3. Click the **Reload** button (circular arrow icon)
4. Open a new tab

### Method 4: Disable Cache (While DevTools Open)
1. Open Chrome DevTools (F12)
2. Press `F1` to open Settings
3. Under "Network", check "Disable cache"
4. Keep DevTools open while testing

## Updating Versions for New Builds

When creating a new build:
1. Update version in `manifest.json`: `"version": "1.2.3"`
2. Update version query parameters in `newtab.html`
3. Update cache names in `js/background-worker.js`
4. Rebuild with `node build.js`

## Automatic Cache Clearing

The service worker automatically clears old cache when a new version is detected. Old caches (from previous versions) are deleted during the activate event.

