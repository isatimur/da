// Popup logic for Quick Capture with i18n support
// Note: i18n is loaded globally from js/utils/i18n.js

let currentUrl = null;
let currentDomain = null;

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  // Wait for i18n to initialize
  await i18n.init();
  
  initializeElements();
  await loadCurrentTab();
  await loadNotes();
  setupEventListeners();
  updateTranslations();
  focusInput();
});

// Get DOM elements
const elements = {
  captureInput: null,
  saveBtn: null,
  includeUrl: null,
  charCount: null,
  searchInput: null,
  notesList: null,
  emptyState: null,
  noResults: null,
  exportBtn: null,
  settingsBtn: null,
  settingsPanel: null,
  closeSettings: null,
  languageSelect: null,
  clearSearch: null
};

function initializeElements() {
  elements.captureInput = document.getElementById('captureInput');
  elements.saveBtn = document.getElementById('saveBtn');
  elements.includeUrl = document.getElementById('includeUrl');
  elements.charCount = document.getElementById('charCount');
  elements.searchInput = document.getElementById('searchInput');
  elements.notesList = document.getElementById('notesList');
  elements.emptyState = document.getElementById('emptyState');
  elements.noResults = document.getElementById('noResults');
  elements.exportBtn = document.getElementById('exportBtn');
  elements.settingsBtn = document.getElementById('settingsBtn');
  elements.settingsPanel = document.getElementById('settingsPanel');
  elements.closeSettings = document.getElementById('closeSettings');
  elements.languageSelect = document.getElementById('languageSelect');
  elements.clearSearch = document.getElementById('clearSearch');
}

function updateTranslations() {
  // Update all data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18n.t(key);
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = i18n.t(key);
  });

  // Update titles
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = i18n.t(key);
  });
}

// Load current tab info
async function loadCurrentTab() {
  try {
    const response = await chrome.runtime.sendMessage({ action: 'getCurrentTab' });
    currentUrl = response.url;
    currentDomain = response.domain;
  } catch (error) {
    console.error('Error getting current tab:', error);
  }
}

// Setup event listeners
function setupEventListeners() {
  // Save button click
  elements.saveBtn.addEventListener('click', handleSave);

  // Enter key to save (Ctrl/Cmd + Enter)
  elements.captureInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  });

  // Character count
  elements.captureInput.addEventListener('input', () => {
    const length = elements.captureInput.value.length;
    elements.charCount.textContent = length;
    if (length > 450) {
      elements.charCount.style.color = 'var(--error)';
    } else {
      elements.charCount.style.color = '';
    }
  });

  // Search input
  elements.searchInput.addEventListener('input', handleSearch);
  
  // Clear search button
  elements.clearSearch.addEventListener('click', () => {
    elements.searchInput.value = '';
    elements.clearSearch.style.display = 'none';
    loadNotes();
  });

  // Settings
  elements.settingsBtn.addEventListener('click', () => {
    elements.settingsPanel.style.display = 'block';
    // Set current language in select
    elements.languageSelect.value = i18n.currentLang;
  });

  elements.closeSettings.addEventListener('click', () => {
    elements.settingsPanel.style.display = 'none';
  });

  // Language selection
  elements.languageSelect.addEventListener('change', async (e) => {
    await i18n.setLanguage(e.target.value);
    updateTranslations();
    await loadNotes(); // Reload to update date formatting
  });

  // Export button
  elements.exportBtn.addEventListener('click', handleExport);
}

// Focus on input
function focusInput() {
  setTimeout(() => {
    elements.captureInput.focus();
  }, 100);
}

// Handle save
async function handleSave() {
  const text = elements.captureInput.value.trim();
  
  if (!text) {
    showNotification(i18n.t('errorSaving'), 'error');
    return;
  }

  try {
    const url = elements.includeUrl.checked ? currentUrl : null;
    const domain = elements.includeUrl.checked ? currentDomain : null;

    await storageManager.addNote(text, url, domain);
    
    // Clear input
    elements.captureInput.value = '';
    elements.charCount.textContent = '0';
    elements.charCount.style.color = '';
    
    // Reload notes
    await loadNotes();
    
    // Show success feedback with animation
    elements.saveBtn.classList.add('saved');
    setTimeout(() => elements.saveBtn.classList.remove('saved'), 600);
    showNotification(i18n.t('saved'), 'success');
    
    // Refocus input
    focusInput();
  } catch (error) {
    console.error('Error saving note:', error);
    showNotification(i18n.t('errorSaving'), 'error');
  }
}

// Load and display notes
async function loadNotes(filtered = null) {
  try {
    const notes = filtered !== null ? filtered : await storageManager.loadNotes();
    displayNotes(notes);
  } catch (error) {
    console.error('Error loading notes:', error);
  }
}

// Display notes
function displayNotes(notes) {
  // Check if we're searching
  const isSearching = elements.searchInput.value.trim().length > 0;
  
  if (notes.length === 0) {
    elements.emptyState.style.display = isSearching ? 'none' : 'flex';
    elements.noResults.style.display = isSearching ? 'flex' : 'none';
    elements.notesList.style.display = 'none';
    return;
  }

  elements.emptyState.style.display = 'none';
  elements.noResults.style.display = 'none';
  elements.notesList.style.display = 'block';
  
  // Clear and animate
  elements.notesList.style.opacity = '0';
  setTimeout(() => {
    elements.notesList.innerHTML = notes.map(note => createNoteElement(note)).join('');
    attachNoteListeners();
    elements.notesList.style.opacity = '1';
  }, 100);
}

function attachNoteListeners() {
  // Attach event listeners to delete buttons
  document.querySelectorAll('.note-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const noteId = btn.dataset.id;
      await handleDelete(noteId);
    });
  });

  // Attach event listeners to note clicks
  document.querySelectorAll('.note').forEach(noteEl => {
    noteEl.addEventListener('click', (e) => {
      if (!e.target.closest('.note-delete') && !e.target.closest('.note-favorite')) {
        const url = noteEl.dataset.url;
        if (url) {
          chrome.tabs.create({ url });
        }
      }
    });
  });
}

// Create note element
function createNoteElement(note) {
  const date = new Date(note.timestamp);
  const formattedDate = formatDate(date, i18n);
  
  return `
    <div class="note" data-url="${note.url || ''}" data-id="${note.id}">
      <div class="note-content">
        <p class="note-text">${escapeHtml(note.text)}</p>
        ${note.url ? `
          <div class="note-url">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M8.5 3.5H11.5C12.0523 3.5 12.5 3.94772 12.5 4.5V10.5C12.5 11.0523 12.0523 11.5 11.5 11.5H2.5C1.94772 11.5 1.5 11.0523 1.5 10.5V2.5C1.5 1.94772 1.94772 1.5 2.5 1.5H5.5M9 1H6M9 1L5.5 4.5M9 1V4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>${escapeHtml(note.domain || note.url)}</span>
          </div>
        ` : ''}
        <div class="note-meta">
          <span class="note-date">${formattedDate}</span>
        </div>
      </div>
      <button class="note-delete" data-id="${note.id}" data-i18n-title="delete">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `;
}

// Handle delete
async function handleDelete(noteId) {
  try {
    await storageManager.deleteNote(noteId);
    await loadNotes();
    showNotification(i18n.t('deleteSuccess'), 'success');
  } catch (error) {
    console.error('Error deleting note:', error);
    showNotification(i18n.t('errorDeleting'), 'error');
  }
}

// Handle search
async function handleSearch(e) {
  const query = e.target.value;
  elements.clearSearch.style.display = query ? 'block' : 'none';
  
  try {
    const notes = await storageManager.searchNotes(query);
    await loadNotes(notes);
  } catch (error) {
    console.error('Error searching notes:', error);
  }
}

// Handle export
async function handleExport() {
  try {
    const json = await storageManager.exportNotes();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quick-capture-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification(i18n.t('exportSuccess'), 'success');
  } catch (error) {
    console.error('Error exporting notes:', error);
    showNotification(i18n.t('errorExporting'), 'error');
  }
}

// Format date with i18n support
function formatDate(date, i18n) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return i18n.t('justNow');
  } else if (minutes < 60) {
    const plural = minutes === 1 ? 'minute' : 'minutes';
    return i18n.t('minutesAgo', { 
      count: minutes, 
      minutes: i18n.t(plural) 
    });
  } else if (hours < 24) {
    const plural = hours === 1 ? 'hour' : 'hours';
    return i18n.t('hoursAgo', { 
      count: hours, 
      hours: i18n.t(plural) 
    });
  } else if (days < 7) {
    const plural = days === 1 ? 'day' : 'days';
    return i18n.t('daysAgo', { 
      count: days, 
      days: i18n.t(plural) 
    });
  } else {
    return date.toLocaleDateString(i18n.currentLang === 'en' ? 'en-US' : i18n.currentLang === 'ru' ? 'ru-RU' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 2000);
}
