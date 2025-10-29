# Changelog

## Version 1.2.2 (2025-10-27)

### 🐛 Critical Storage Fix

#### Complete Storage Quota Solution:
- **Fixed all chrome.storage.sync quota exceeded errors**
- Moved ALL large data to chrome.storage.local:
  - Tasks (todos)
  - Custom affirmations & collections
  - Favorites (affirmations & backgrounds)
  - Statistics (views, streaks, history)
  - Breathing session data
- Sync storage now only contains: language, theme, cardStyle, fontStyle, showClock, showWeather
- **Background images and weather data now load correctly**

#### What stays in sync (critical settings):
- Language preference
- Theme settings
- UI preferences
- Small user preferences

#### What moved to local storage:
- All task data
- All breathing session data
- All statistics and analytics
- All favorites and collections
- Custom affirmations

## Version 1.2.1 (2025-10-27)

### 🐛 Critical Fixes

#### Storage Quota Issue:
- **Fixed chrome.storage.sync quota exceeded error**
- Tasks now saved in chrome.storage.local only (no size limit)
- Prevents background images and weather data from failing to load
- Sync storage freed up for critical settings only

#### Technical Changes:
- Moved todos array from sync storage to local storage
- Removed todos from defaultSettings and validators
- Updated saveTasks() to use local storage exclusively
- Updated loadTasks() to migrate from legacy backup
- Prevents 100KB quota exhaustion

#### RTL Layout Fixes:
- **Fixed RTL positioning for Arabic language**
- Settings button moved to top-right (mirror of LTR)
- Menu button moved to top-left (mirror of LTR)
- Clock widget stays centered (no mirroring)
- Breathing button stays in bottom-right (no mirroring)
- Focus mode button moves to bottom-left
- Panels open from correct side based on button position

## Version 1.2.0 (2025-10-27)

### 🎯 Major Update: Task Manager & Productivity Features

#### 🆕 New Features:
- ✅ **Task Management System**: Full-featured task manager with priorities, categories, due dates, and tags
- ✅ **"Today's Focus" Widget**: Shows top 5 priority tasks on the main screen
- ✅ **Pomodoro Timer**: Integrated productivity timer with task association
- ✅ **Productivity Dashboard**: Statistics and insights for task completion
- ✅ **Task Completion Motivations**: Inspirational affirmations when completing tasks
- ✅ **Keyboard Shortcuts Dialog**: Visible shortcuts reference for all features
- ✅ **Reliable Task Storage**: Backup to local storage with automatic recovery
- ✅ **Task Limits**: Free users - 10 tasks, Premium - unlimited

#### 🎨 UI/UX Improvements:
- Renamed "Top 5 Priority" to "Today's Focus" for better clarity
- Enhanced z-index management for proper layering
- Motivational message card instead of affirmation card
- Limited actions menu to 3 visible items with scroll
- Improved settings panel layout and sizing
- Modern glassmorphic design for all task components

#### 🌍 Localization:
- Added translations for all Task Manager features in all 6 languages
- Added "Keyboard Shortcuts" dialog translations
- Added "Today's Focus" widget translations
- Complete localization for task priorities, categories, and actions

#### 🐛 Bug Fixes:
- Fixed z-index conflict between affirmation actions and Today's Focus container
- Fixed task persistence on refresh/lost data issue
- Fixed keyboard shortcuts triggering while typing in input fields
- Fixed task editing functionality
- Fixed settings menu height and positioning
- Fixed keyboard shortcuts not working in modals

#### ⚡ Performance:
- Debounced storage operations to prevent quota errors
- Optimized task loading with backup recovery
- Improved state management for tasks

### 📝 Technical Details
- **New Files**: `todoService.js`, `todoWidget.js`, `todoManager.js`, `top5Tasks.js`, `todo.css`
- **Updated Files**: `app.js`, `state.js`, `manifest.json`, all locale files
- **Storage**: Dual storage (sync + local backup) for reliability
- **State Management**: Enhanced with force-save for critical data

## Version 1.1.0 (2025-10-26)

### 🌍 Полная поддержка интернационализации (i18n)

#### Добавлены новые языки:
- 🇨🇳 Китайский (Simplified)
- 🇸🇦 Арабский (с поддержкой RTL)
- 🇵🇹 Португальский
- 🇮🇳 Хинди

#### Улучшена локализация:
- ✅ Все модальные окна переведены (Help, Feedback, About, Saved Backgrounds, Custom Affirmations, Daily Reminders)
- ✅ Все пункты меню переведены
- ✅ Все уведомления переведены
- ✅ Все диалоги переведены
- ✅ Все компоненты используют систему переводов
- ✅ Поддержка Right-to-Left (RTL) для арабского языка

### 🐛 Исправления
- Исправлена ошибка сохранения сессий дыхательных упражнений
- Исправлена проблема с обновлением элементов меню при смене языка
- Улучшена стабильность при переключении языков

### ✨ Улучшения
- Динамическое обновление интерфейса при смене языка
- Автоматическое определение языка браузера
- Синхронизация выбранного языка через Chrome Sync
- Локализованные форматы дат, времени и чисел

### 📝 Технические детали
- Обновлены компоненты: `info-dialogs.js`, `saved-backgrounds.js`, `customAffirmations.js`, `favoriteAffirmations.js`, `reminder-settings.js`
- Добавлены файлы локализации для всех 6 языков
- Исправлен `sessionManager.js` для корректного сохранения статистики

## Version 1.0.0 (Initial Release)

### Features
- Daily positive affirmations
- Beautiful backgrounds from Unsplash
- Breathing exercises
- Weather information
- Custom affirmations
- Favorite affirmations
- Daily reminders
- Backup & Sync
- Keyboard shortcuts
- Focus mode
- Premium features

