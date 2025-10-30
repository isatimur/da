# Daily Affirmations Chrome Extension

A mindful new tab experience that transforms your daily browsing with inspirational affirmations, beautiful backgrounds, and productivity features.

## 📋 Version 1.2.3

### Storage & Performance Fixes
- 🔧 **Storage quota management** with LRU eviction system
- 🔧 **Fixed service worker** headers immutable error
- 🎯 **Improved background image loading** with proper extension URL resolution
- ⚡ **Weather API timeout** handling with AbortController
- 🚫 **Disabled text selection** on page (except form inputs)
- 📦 **unlimitedStorage permission** added for better quota management

### Previous Version: 1.2.2

### Critical Storage Fix
- 🔧 **Complete storage quota solution**
- Moved ALL large data to local storage
- Background images and weather now load correctly
- Sync storage freed up completely

## Version 1.2.0

### What's New

🎯 **Complete Task Management System**
- Full-featured task manager with priorities, categories, due dates, and tags
- "Today's Focus" widget showing top 5 priority tasks
- Integrated Pomodoro timer for productivity
- Productivity dashboard with statistics and insights
- Task completion motivators with inspirational affirmations
- Reliable dual-storage system (sync + local backup)

⌨️ **Keyboard Shortcuts Reference**
- New visible shortcuts dialog accessible from menu
- Shows all available keyboard shortcuts
- Complete help system for productivity features

🎨 **UI/UX Improvements**
- Renamed "Top 5 Priority" to "Today's Focus"
- Enhanced z-index management for proper layering
- Motivational message card design
- Improved settings panel layout
- Better action menu visibility (3 items visible with scroll)

🐛 **Bug Fixes**
- Fixed task persistence on refresh
- Fixed keyboard shortcuts triggering while typing
- Fixed task editing functionality
- Fixed settings menu overflow and positioning
- Fixed z-index conflicts between components

🗺️ **Supported Languages**
- 🇬🇧 English
- 🇷🇺 Russian (Русский)
- 🇨🇳 Chinese Simplified (中文)
- 🇸🇦 Arabic (العربية) - with RTL support
- 🇵🇹 Portuguese (Português)
- 🇮🇳 Hindi (हिन्दी)

**Previous Version: 1.1.0**
- Full Internationalization Support (6 languages)
- Breathing Exercises
- Weather Information
- Custom Affirmations

## 🚀 Quick Start

1. **Development Setup**
```bash
# Install dependencies
bun install

# Build the extension
bun run build

# Watch for changes during development
bun run watch
```

2. **Load in Chrome**
- Open Chrome and go to `chrome://extensions/`
- Enable "Developer mode" in the top right
- Click "Load unpacked"
- Select the `chrome-extension` directory

## 📁 Project Structure

```
chrome-extension/
├── js/                    # JavaScript modules
│   ├── actions/          # User interaction handlers
│   ├── components/       # UI components
│   ├── modules/          # Core modules
│   ├── services/         # Feature services
│   └── utils/            # Utility functions
├── css/                  # Stylesheets
│   ├── fonts.css        # Font definitions
│   ├── styles.css       # Main styles
│   └── premium.css      # Premium feature styles
├── fonts/               # Local font files
├── images/              # Extension icons and assets
├── newtab.html         # New tab page
├── manifest.json       # Extension manifest
└── build.js           # Build script
```

## 🛠️ Features

### Core Features
- **Daily Affirmations**: Fresh inspirational quotes on each new tab
- **Weather Widget**: Current weather with detailed information
- **Clock Widget**: Time and date display
- **Focus Mode**: Distraction-free interface
- **Theme Customization**: Background themes and card styles

### Premium Features
- **Custom Affirmations**: Create and manage personal affirmations
- **Daily Reminders**: Customizable notification schedules
- **Cloud Sync**: Backup and sync across devices
- **Premium Backgrounds**: Access to premium background collection
- **Advanced Focus Mode**: Enhanced focus features

## 🔧 Development

### Building the Extension

The extension uses a custom build process:

```bash
# Production build
npm run build

# Development build with watch
npm run watch
```

### Key Files

- `newtab.html`: The main new tab page
- `js/app.js`: Main application logic
- `js/services/`: Individual feature services
- `manifest.json`: Extension configuration

### Adding New Features

1. Create a new service in `js/services/`
2. Add UI components in `js/components/`
3. Register in `app.js`
4. Update manifest if needed

## 🔒 Security

- API keys are managed securely through backend services
- Sensitive data is encrypted before storage
- Premium features are validated server-side

## 📦 Building for Production

1. Update version in `manifest.json`
2. Build the extension:
```bash
npm run build
```
3. ZIP the contents:
```bash
npm run package
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --suite=premium
```

## 🔄 State Management

The extension uses a custom state management system:

```javascript
// Example state update
stateManager.updateSettings({
    showWeather: true,
    backgroundTheme: 'nature'
});
```

## 🎨 Styling

- Uses CSS variables for theming
- Supports multiple card styles (glass, solid, minimal)
- Responsive design for different screen sizes

## 📝 API Documentation

### State Manager
```javascript
stateManager.getSettings()
stateManager.updateSettings(newSettings)
stateManager.loadState()
```

### Weather Service
```javascript
weatherService.update()
weatherService.getWeather()
```

### Background Service
```javascript
backgroundService.update()
backgroundService.saveBackground()
```

## 🐛 Debugging

1. Open Chrome DevTools in the new tab
2. Access debug console:
```javascript
window.app.serviceStatus  // Check service status
window.app.cleanup       // Manual cleanup
```

## 📱 Chrome API Usage

- `chrome.storage` for data persistence
- `chrome.notifications` for reminders
- `chrome.permissions` for feature access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and feature requests:
- Open an issue on GitHub
- Email: support@daily-affirmation.today 