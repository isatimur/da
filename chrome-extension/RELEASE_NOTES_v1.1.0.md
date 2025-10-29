# Release Notes - Version 1.1.0

## 🌍 Major Update: Full Multi-Language Support

### New Features

**6 Languages Now Supported:**
- 🇬🇧 English
- 🇷🇺 Russian (Русский)
- 🇨🇳 Chinese Simplified (中文)
- 🇸🇦 Arabic (العربية) - with full RTL (Right-to-Left) support
- 🇵🇹 Portuguese (Português)
- 🇮🇳 Hindi (हिन्दी)

### What's Been Translated

✅ **All User Interface Elements:**
- Main menu items
- Settings panel
- All buttons and controls
- Notifications and messages

✅ **All Modal Windows:**
- Help dialog
- Feedback form
- About dialog
- Saved Backgrounds
- Custom Affirmations
- Favorites
- Daily Reminders
- Premium features

✅ **Complete User Experience:**
- Help text
- Error messages
- Success notifications
- Form placeholders
- Action buttons
- Keyboard shortcuts descriptions

### Improvements

🔧 **Technical Enhancements:**
- Automatic language detection based on browser settings
- Smooth language switching without page reload
- Chrome Sync support for language preference
- RTL layout for Arabic language
- Locale-aware date/time/number formatting

🐛 **Bug Fixes:**
- Fixed breathing exercise session saving error
- Improved menu translation updates
- Enhanced stability during language changes

### Technical Details

**Added Files:**
- `js/locales/zh.js` - Chinese translations
- `js/locales/ar.js` - Arabic translations (with RTL CSS)
- `js/locales/pt.js` - Portuguese translations
- `js/locales/hi.js` - Hindi translations
- `css/rtl.css` - Right-to-Left layout support
- Chrome `_locales` structure for all 6 languages

**Updated Components:**
- `info-dialogs.js` - i18n support
- `saved-backgrounds.js` - i18n support
- `customAffirmations.js` - i18n support
- `favoriteAffirmations.js` - i18n support
- `reminder-settings.js` - i18n support
- `app.js` - Enhanced menu translation logic
- `sessionManager.js` - Fixed statistics calculation

### How to Use

1. The extension will automatically detect your browser language
2. To change language manually, click the settings icon (⚙️)
3. Select your preferred language from the dropdown
4. All interface elements will update instantly
5. Your language preference is saved and synced across devices

### Migration from 1.0.0

- No data migration needed
- All existing settings and favorites are preserved
- Simply update and enjoy the new languages!

---

**Release Date:** October 26, 2025  
**Version:** 1.1.0  
**Build:** Production Ready

