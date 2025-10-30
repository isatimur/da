# Daily Affirmations Chrome Extension

**Version 1.2.3**

Transform your new tab experience with daily affirmations, beautiful backgrounds, breathing exercises, and mindfulness features.

![Daily Affirmations Interface](public/affirmations.png)

## 📋 Latest Version: 1.2.3

### What's New in 1.2.3
- 🔧 **Storage quota management** with intelligent LRU eviction system
- 🔧 **Fixed service worker** handling for better API key management
- 🎯 **Improved background image loading** with proper extension URL resolution
- ⚡ **Weather API timeout** handling with proper AbortController
- 🚫 **Disabled text selection** on page (except form inputs)
- 📦 **unlimitedStorage permission** added for better quota management

## 🌟 Special Early Access

Currently offering **FREE ACCESS** to all premium features during our early access period! Install now to get:
- Custom affirmation library
- Premium background themes
- Cloud sync & backup
- Smart daily reminders
- Advanced focus mode
- And more!

## ✨ Key Features

### Basic Features (Free)
- 🎯 Daily curated affirmations
- 🖼️ Basic nature backgrounds
- ⏰ Weather & clock widgets
- 🎯 Basic focus mode
- 💾 Local storage
- 🫁 Basic breathing exercises

![Basic Features](public/mindfulness-practice.jpg)

### Premium Features (Currently Free)
- 📝 Custom affirmations library
- 🎨 Premium background themes
- ☁️ Cloud sync & backup
- 🔔 Smart daily reminders
- 🎯 Advanced focus mode
- 🫁 Advanced breathing exercises with reports & sounds
- 🎉 Early access to new features
- 💬 Priority support

![Premium Features](public/premium-feature.png)

## 🎨 Feature Highlights

| Feature | Description |
|---------|-------------|
| Custom Backgrounds | ![Custom Backgrounds](public/custom-background.png) Choose from our premium collection or upload your own |
| Daily Reminders | ![Daily Reminders](public/daily-reminders.png) Never miss your daily affirmation practice |
| Cloud Backup | ![Cloud Backup](public/backup_and_sync.png) Your data is always safe and synced |
| Theme Customization | ![Theme Customization](public/theme_customization.png) Personalize your experience |
| Breathing Exercises | 🫁 Guided breathing exercises with real-time reports and soothing sounds |

## 🫁 Breathing Exercises

Our latest feature includes comprehensive breathing exercises designed to help you relax and focus:

### Features
- **Multiple Breathing Patterns**: Choose from relaxing, energizing, and focus patterns
- **Real-time Reports**: Track each breathing phase (inhale, exhale, hold) with detailed analytics
- **Sound Effects**: Immersive audio feedback with customizable volume
- **Session Management**: Save and track your breathing practice sessions
- **Responsive Design**: Works perfectly on all screen sizes
- **Glassmorphism UI**: Modern, beautiful interface with smooth animations

### Supported Patterns
- **Relaxing Breath**: 4-4-4 pattern for stress relief
- **Energizing Breath**: 2-1-2 pattern for energy boost
- **Focus Breath**: 4-7-8 pattern for concentration
- **Custom Patterns**: Create your own breathing sequences

## 🚀 Getting Started

### Installation

1. **For Users:**
   - Visit our [Chrome Web Store page](https://chrome.google.com/webstore)
   - Click "Add to Chrome"
   - Open a new tab to start your mindfulness journey

2. **For Developers:**

```bash
# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Clone the repository
git clone https://github.com/yourusername/daily-affirmations.git

# Install dependencies
bun install

# Run development server
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the landing page.

### Environment Setup

Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY=your_resend_api_key_here
# Additional environment variables will be added for payment integration
```

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Package Manager:** Bun
- **Styling:** Tailwind CSS
- **Email Service:** Resend
- **State Management:** Custom state manager
- **Chrome Extension:** Vanilla JavaScript

## 📦 Project Structure

```
├── app/                  # Next.js application
│   ├── components/       # React components
│   ├── api/             # API routes
│   └── pages/           # Page components
├── chrome-extension/     # Extension source
│   ├── js/              # JavaScript modules
│   ├── css/             # Styles
│   └── manifest.json    # Extension manifest
└── public/              # Static assets
```

## 🔄 Development Workflow

1. Make changes to the codebase
2. Run tests: `bun test`
3. Build extension: `bun run build:extension`
4. Load unpacked extension in Chrome for testing

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Roadmap

- [x] Breathing exercises with real-time reports
- [x] Sound effects for breathing exercises
- [x] Enhanced UI with glassmorphism design
- [x] Responsive design improvements
- [ ] Integration with LemonSqueezy for payments
- [ ] Mobile companion app
- [ ] Social sharing features
- [ ] Advanced analytics dashboard
- [ ] AI-powered affirmation suggestions

## 📞 Support

Need help? Contact us at support@daily-affirmation.today

---

Built with ❤️ for mindfulness and productivity
