// i18n utility for Quick Capture
class I18n {
  constructor() {
    this.currentLang = 'en';
    this.translations = {};
    this.fallbackLang = 'en';
    this.locales = {};
    this.init();
  }

  async init() {
    // Load all locales first
    await this.loadAllLocales();
    
    // Get language from Chrome settings or storage
    try {
      const result = await chrome.storage.local.get(['language']);
      if (result.language) {
        this.currentLang = result.language;
      } else {
        // Get from Chrome locale
        const chromeLang = chrome.i18n ? chrome.i18n.getUILanguage() : navigator.language;
        this.currentLang = chromeLang.split('-')[0] || 'en';
      }
    } catch (error) {
      this.currentLang = 'en';
    }

    this.loadTranslations();
  }

  async loadAllLocales() {
    // Define translations inline to avoid ES modules issues
    this.locales = {
      en: {
        appName: 'Quick Capture',
        placeholder: 'What to capture?',
        save: 'Save',
        saved: 'Saved!',
        error: 'Error',
        search: 'Search notes...',
        emptyTitle: 'No notes yet',
        emptySubtitle: 'Start capturing your thoughts',
        includeUrl: 'Add page link',
        export: 'Export notes',
        clear: 'Clear all',
        delete: 'Delete',
        charCount: '{count}/500',
        savedAgo: 'Saved {time} ago',
        justNow: 'just now',
        minutesAgo: '{count} {minutes} ago',
        hoursAgo: '{count} {hours} ago',
        daysAgo: '{count} {days} ago',
        minute: 'minute',
        minutes: 'minutes',
        hour: 'hour',
        hours: 'hours',
        day: 'day',
        days: 'days',
        confirmClear: 'Delete all notes? This cannot be undone.',
        exportSuccess: 'Exported!',
        deleteSuccess: 'Deleted',
        clearSuccess: 'All notes deleted',
        errorSaving: 'Error saving',
        errorDeleting: 'Error deleting',
        errorExporting: 'Error exporting',
        errorClearing: 'Error clearing',
        language: 'Language',
        selectLanguage: 'Select Language',
        settings: 'Settings',
        favorites: 'Favorites',
        allNotes: 'All Notes',
        tags: 'Tags',
        addTag: 'Add tag',
        tag: 'Tag',
        noResults: 'No results found',
        clickToOpen: 'Click to open link',
        keyboardShortcut: 'Shortcut: Ctrl/Cmd + Enter'
      },
      ru: {
        appName: 'Быстрый Захват',
        placeholder: 'Что захватить?',
        save: 'Сохранить',
        saved: 'Сохранено!',
        error: 'Ошибка',
        search: 'Поиск заметок...',
        emptyTitle: 'Пока нет заметок',
        emptySubtitle: 'Начните записывать свои мысли',
        includeUrl: 'Добавить ссылку на страницу',
        export: 'Экспорт заметок',
        clear: 'Очистить все',
        delete: 'Удалить',
        charCount: '{count}/500',
        savedAgo: 'Сохранено {time} назад',
        justNow: 'только что',
        minutesAgo: '{count} {minutes} назад',
        hoursAgo: '{count} {hours} назад',
        daysAgo: '{count} {days} назад',
        minute: 'минуту',
        minutes: 'минут',
        hour: 'час',
        hours: 'часов',
        day: 'день',
        days: 'дней',
        confirmClear: 'Удалить все заметки? Это действие нельзя отменить.',
        exportSuccess: 'Экспортировано!',
        deleteSuccess: 'Удалено',
        clearSuccess: 'Все заметки удалены',
        errorSaving: 'Ошибка при сохранении',
        errorDeleting: 'Ошибка при удалении',
        errorExporting: 'Ошибка при экспорте',
        errorClearing: 'Ошибка при очистке',
        language: 'Язык',
        selectLanguage: 'Выбрать язык',
        settings: 'Настройки',
        favorites: 'Избранное',
        allNotes: 'Все заметки',
        tags: 'Теги',
        addTag: 'Добавить тег',
        tag: 'Тег',
        noResults: 'Ничего не найдено',
        clickToOpen: 'Клик для открытия ссылки',
        keyboardShortcut: 'Горячая клавиша: Ctrl/Cmd + Enter'
      },
      es: {
        appName: 'Captura Rápida',
        placeholder: '¿Qué capturar?',
        save: 'Guardar',
        saved: '¡Guardado!',
        error: 'Error',
        search: 'Buscar notas...',
        emptyTitle: 'Aún no hay notas',
        emptySubtitle: 'Comienza a capturar tus pensamientos',
        includeUrl: 'Agregar enlace de página',
        export: 'Exportar notas',
        clear: 'Limpiar todo',
        delete: 'Eliminar',
        charCount: '{count}/500',
        savedAgo: 'Guardado hace {time}',
        justNow: 'ahora mismo',
        minutesAgo: 'hace {count} {minutes}',
        hoursAgo: 'hace {count} {hours}',
        daysAgo: 'hace {count} {days}',
        minute: 'minuto',
        minutes: 'minutos',
        hour: 'hora',
        hours: 'horas',
        day: 'día',
        days: 'días',
        confirmClear: '¿Eliminar todas las notas? Esto no se puede deshacer.',
        exportSuccess: '¡Exportado!',
        deleteSuccess: 'Eliminado',
        clearSuccess: 'Todas las notas eliminadas',
        errorSaving: 'Error al guardar',
        errorDeleting: 'Error al eliminar',
        errorExporting: 'Error al exportar',
        errorClearing: 'Error al limpiar',
        language: 'Idioma',
        selectLanguage: 'Seleccionar idioma',
        settings: 'Configuración',
        favorites: 'Favoritos',
        allNotes: 'Todas las notas',
        tags: 'Etiquetas',
        addTag: 'Agregar etiqueta',
        tag: 'Etiqueta',
        noResults: 'No se encontraron resultados',
        clickToOpen: 'Clic para abrir enlace',
        keyboardShortcut: 'Atajo: Ctrl/Cmd + Enter'
      },
      fr: {
        appName: 'Capture Rapide',
        placeholder: 'Que capturer?',
        save: 'Enregistrer',
        saved: 'Enregistré!',
        error: 'Erreur',
        search: 'Rechercher des notes...',
        emptyTitle: 'Aucune note pour l\'instant',
        emptySubtitle: 'Commencez à capturer vos pensées',
        includeUrl: 'Ajouter le lien de la page',
        export: 'Exporter les notes',
        clear: 'Tout effacer',
        delete: 'Supprimer',
        charCount: '{count}/500',
        savedAgo: 'Enregistré il y a {time}',
        justNow: 'à l\'instant',
        minutesAgo: 'il y a {count} {minutes}',
        hoursAgo: 'il y a {count} {hours}',
        daysAgo: 'il y a {count} {days}',
        minute: 'minute',
        minutes: 'minutes',
        hour: 'heure',
        hours: 'heures',
        day: 'jour',
        days: 'jours',
        confirmClear: 'Supprimer toutes les notes? Cette action ne peut pas être annulée.',
        exportSuccess: 'Exporté!',
        deleteSuccess: 'Supprimé',
        clearSuccess: 'Toutes les notes supprimées',
        errorSaving: 'Erreur lors de l\'enregistrement',
        errorDeleting: 'Erreur lors de la suppression',
        errorExporting: 'Erreur lors de l\'exportation',
        errorClearing: 'Erreur lors du nettoyage',
        language: 'Langue',
        selectLanguage: 'Sélectionner la langue',
        settings: 'Paramètres',
        favorites: 'Favoris',
        allNotes: 'Toutes les notes',
        tags: 'Étiquettes',
        addTag: 'Ajouter une étiquette',
        tag: 'Étiquette',
        noResults: 'Aucun résultat trouvé',
        clickToOpen: 'Cliquez pour ouvrir le lien',
        keyboardShortcut: 'Raccourci: Ctrl/Cmd + Enter'
      },
      de: {
        appName: 'Schnell Erfassen',
        placeholder: 'Was erfassen?',
        save: 'Speichern',
        saved: 'Gespeichert!',
        error: 'Fehler',
        search: 'Notizen suchen...',
        emptyTitle: 'Noch keine Notizen',
        emptySubtitle: 'Beginnen Sie, Ihre Gedanken zu erfassen',
        includeUrl: 'Seitenlink hinzufügen',
        export: 'Notizen exportieren',
        clear: 'Alles löschen',
        delete: 'Löschen',
        charCount: '{count}/500',
        savedAgo: 'Vor {time} gespeichert',
        justNow: 'gerade eben',
        minutesAgo: 'vor {count} {minutes}',
        hoursAgo: 'vor {count} {hours}',
        daysAgo: 'vor {count} {days}',
        minute: 'Minute',
        minutes: 'Minuten',
        hour: 'Stunde',
        hours: 'Stunden',
        day: 'Tag',
        days: 'Tage',
        confirmClear: 'Alle Notizen löschen? Dies kann nicht rückgängig gemacht werden.',
        exportSuccess: 'Exportiert!',
        deleteSuccess: 'Gelöscht',
        clearSuccess: 'Alle Notizen gelöscht',
        errorSaving: 'Fehler beim Speichern',
        errorDeleting: 'Fehler beim Löschen',
        errorExporting: 'Fehler beim Exportieren',
        errorClearing: 'Fehler beim Löschen',
        language: 'Sprache',
        selectLanguage: 'Sprache auswählen',
        settings: 'Einstellungen',
        favorites: 'Favoriten',
        allNotes: 'Alle Notizen',
        tags: 'Tags',
        addTag: 'Tag hinzufügen',
        tag: 'Tag',
        noResults: 'Keine Ergebnisse gefunden',
        clickToOpen: 'Klicken Sie, um den Link zu öffnen',
        keyboardShortcut: 'Tastenkombination: Strg/Cmd + Enter'
      },
      ja: {
        appName: 'クイックキャプチャ',
        placeholder: '何をキャプチャしますか？',
        save: '保存',
        saved: '保存しました！',
        error: 'エラー',
        search: 'ノートを検索...',
        emptyTitle: 'まだノートがありません',
        emptySubtitle: '思考をキャプチャし始めましょう',
        includeUrl: 'ページリンクを追加',
        export: 'ノートをエクスポート',
        clear: 'すべて削除',
        delete: '削除',
        charCount: '{count}/500',
        savedAgo: '{time}前に保存',
        justNow: 'たった今',
        minutesAgo: '{count}{minutes}前',
        hoursAgo: '{count}{hours}前',
        daysAgo: '{count}{days}前',
        minute: '分',
        minutes: '分',
        hour: '時間',
        hours: '時間',
        day: '日',
        days: '日',
        confirmClear: 'すべてのノートを削除しますか？この操作は元に戻せません。',
        exportSuccess: 'エクスポートしました！',
        deleteSuccess: '削除しました',
        clearSuccess: 'すべてのノートを削除しました',
        errorSaving: '保存エラー',
        errorDeleting: '削除エラー',
        errorExporting: 'エクスポートエラー',
        errorClearing: 'クリアエラー',
        language: '言語',
        selectLanguage: '言語を選択',
        settings: '設定',
        favorites: 'お気に入り',
        allNotes: 'すべてのノート',
        tags: 'タグ',
        addTag: 'タグを追加',
        tag: 'タグ',
        noResults: '結果が見つかりません',
        clickToOpen: 'クリックしてリンクを開く',
        keyboardShortcut: 'ショートカット: Ctrl/Cmd + Enter'
      },
      zh: {
        appName: '快速捕获',
        placeholder: '要捕获什么？',
        save: '保存',
        saved: '已保存！',
        error: '错误',
        search: '搜索笔记...',
        emptyTitle: '还没有笔记',
        emptySubtitle: '开始捕获您的想法',
        includeUrl: '添加页面链接',
        export: '导出笔记',
        clear: '清除全部',
        delete: '删除',
        charCount: '{count}/500',
        savedAgo: '{time}前保存',
        justNow: '刚刚',
        minutesAgo: '{count}{minutes}前',
        hoursAgo: '{count}{hours}前',
        daysAgo: '{count}{days}前',
        minute: '分钟',
        minutes: '分钟',
        hour: '小时',
        hours: '小时',
        day: '天',
        days: '天',
        confirmClear: '删除所有笔记？此操作无法撤销。',
        exportSuccess: '已导出！',
        deleteSuccess: '已删除',
        clearSuccess: '所有笔记已删除',
        errorSaving: '保存错误',
        errorDeleting: '删除错误',
        errorExporting: '导出错误',
        errorClearing: '清除错误',
        language: '语言',
        selectLanguage: '选择语言',
        settings: '设置',
        favorites: '收藏',
        allNotes: '所有笔记',
        tags: '标签',
        addTag: '添加标签',
        tag: '标签',
        noResults: '未找到结果',
        clickToOpen: '点击打开链接',
        keyboardShortcut: '快捷键: Ctrl/Cmd + Enter'
      }
    };
  }

  loadTranslations() {
    this.translations = this.locales[this.currentLang] || this.locales[this.fallbackLang] || this.getDefaultTranslations();
  }

  getDefaultTranslations() {
    return {
      appName: 'Quick Capture',
      placeholder: 'What to capture?',
      save: 'Save',
      saved: 'Saved!',
      error: 'Error',
      search: 'Search notes...',
      emptyTitle: 'No notes yet',
      emptySubtitle: 'Start capturing your thoughts',
      includeUrl: 'Add page link',
      export: 'Export notes',
      clear: 'Clear all',
      delete: 'Delete',
      charCount: '{count}/500',
      savedAgo: 'Saved {time} ago',
      justNow: 'just now',
      minutesAgo: '{count} {minutes} ago',
      hoursAgo: '{count} {hours} ago',
      daysAgo: '{count} {days} ago',
      minute: 'minute',
      minutes: 'minutes',
      hour: 'hour',
      hours: 'hours',
      day: 'day',
      days: 'days',
      confirmClear: 'Delete all notes? This cannot be undone.',
      exportSuccess: 'Exported!',
      deleteSuccess: 'Deleted',
      clearSuccess: 'All notes deleted',
      errorSaving: 'Error saving',
      errorDeleting: 'Error deleting',
      errorExporting: 'Error exporting',
      errorClearing: 'Error clearing'
    };
  }

  t(key, params = {}) {
    let translation = this.translations[key] || key;
    
    // Replace parameters
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });

    return translation;
  }

  async setLanguage(lang) {
    this.currentLang = lang;
    await chrome.storage.local.set({ language: lang });
    await this.loadTranslations();
    this.updateUI();
  }

  updateUI() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    });

    // Update title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.title = this.t(key);
    });
  }
}

// Create singleton
const i18n = new I18n();

