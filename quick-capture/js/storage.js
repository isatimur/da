// Storage utilities for Quick Capture
const STORAGE_KEY = 'quick_capture_notes';
const MAX_NOTES = 1000;

class StorageManager {
  constructor() {
    this.notes = [];
  }

  // Load all notes from storage
  async loadNotes() {
    try {
      const result = await chrome.storage.local.get([STORAGE_KEY]);
      this.notes = result[STORAGE_KEY] || [];
      return this.notes;
    } catch (error) {
      console.error('Error loading notes:', error);
      return [];
    }
  }

  // Save notes to storage
  async saveNotes(notes) {
    try {
      // Keep only the most recent notes if limit exceeded
      const notesToSave = notes.slice(0, MAX_NOTES);
      await chrome.storage.local.set({ [STORAGE_KEY]: notesToSave });
      this.notes = notesToSave;
      return notesToSave;
    } catch (error) {
      console.error('Error saving notes:', error);
      throw error;
    }
  }

  // Add a new note
  async addNote(text, url = null, domain = null) {
    const notes = await this.loadNotes();
    const newNote = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text: text.trim(),
      url: url || null,
      domain: domain || null,
      timestamp: Date.now()
    };

    // Add to the beginning of the array (newest first)
    notes.unshift(newNote);
    await this.saveNotes(notes);
    return newNote;
  }

  // Delete a note by ID
  async deleteNote(id) {
    const notes = await this.loadNotes();
    const filteredNotes = notes.filter(note => note.id !== id);
    await this.saveNotes(filteredNotes);
    return filteredNotes;
  }

  // Delete all notes
  async clearAllNotes() {
    await this.saveNotes([]);
    return [];
  }

  // Search notes by text
  async searchNotes(query) {
    const notes = await this.loadNotes();
    if (!query.trim()) {
      return notes;
    }

    const lowerQuery = query.toLowerCase();
    return notes.filter(note => 
      note.text.toLowerCase().includes(lowerQuery) ||
      (note.url && note.url.toLowerCase().includes(lowerQuery)) ||
      (note.domain && note.domain.toLowerCase().includes(lowerQuery))
    );
  }

  // Get current notes array
  getNotes() {
    return this.notes;
  }

  // Export notes as JSON
  async exportNotes() {
    const notes = await this.loadNotes();
    return JSON.stringify(notes, null, 2);
  }

  // Export notes as plain text
  async exportNotesAsText() {
    const notes = await this.loadNotes();
    return notes.map(note => {
      let text = `[${new Date(note.timestamp).toLocaleString('ru-RU')}] ${note.text}`;
      if (note.url) {
        text += `\n${note.url}`;
      }
      return text;
    }).join('\n\n');
  }
}

// Create singleton instance
const storageManager = new StorageManager();

