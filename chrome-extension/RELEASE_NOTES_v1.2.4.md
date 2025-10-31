# Release Notes v1.2.4

**Release Date:** October 31, 2025

## 🐛 Bug Fixes

### Critical Fixes
- **Fixed Headers immutable error** in background-worker.js
  - Changed from `forEach` to `for...of` with `entries()` for proper header copying
  - Resolved "Failed to execute 'set' on 'Headers': Headers are immutable" error
  
### Performance Improvements
- **CSS optimization**: 25% size reduction in bundled CSS
  - Bundle size: 157KB → 118KB (minified)
  - Faster load times for extension

## 📦 Build Improvements
- Optimized CSS bundling process
- Improved build manifest generation
- Better cache management for static assets

## 🔧 Technical Changes
- Updated build.js to handle header copying correctly
- Improved error handling in service worker
- Enhanced build manifest with better file tracking

## 📝 Notes
This is a maintenance release focusing on stability and performance improvements. All existing features remain unchanged.

---

**Installation:**
1. Download `daily-affirmations-v1.2.4.zip`
2. Go to Chrome Extensions (chrome://extensions/)
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extracted folder
5. Or upload the zip to Chrome Web Store Developer Dashboard

**File Size:** 2.1 MB (compressed)

