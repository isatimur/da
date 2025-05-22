// DOM Elements
let notesWidgetEl;
let notesListEl;
let newNoteInputEl;
let addNoteButtonEl;

/**
 * Loads notes from chrome.storage.local.
 * @param {function(Array<{id: number, text: string}>)} callback - Called with the array of notes.
 */
function loadNotes(callback) {
  chrome.storage.local.get(['notes'], (result) => {
    if (chrome.runtime.lastError) {
      console.error('Error loading notes:', chrome.runtime.lastError);
      callback([]);
    } else {
      callback(result.notes || []);
    }
  });
}

/**
 * Saves notes to chrome.storage.local.
 * @param {Array<{id: number, text: string}>} notes - The array of notes to save.
 */
function saveNotes(notes) {
  chrome.storage.local.set({ notes: notes }, () => {
    if (chrome.runtime.lastError) {
      console.error('Error saving notes:', chrome.runtime.lastError);
    } else {
      // console.log('Notes saved successfully.');
    }
  });
}

/**
 * Deletes a note by its ID.
 * @param {number} noteId - The ID of the note to delete.
 */
function deleteNote(noteId) {
  loadNotes((notes) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    saveNotes(updatedNotes);
    renderNotes(updatedNotes);
  });
}

/**
 * Renders the notes in the notes list.
 * @param {Array<{id: number, text: string}>} notesArray - The array of notes to render.
 */
function renderNotes(notesArray) {
  if (!notesListEl) return;

  notesListEl.innerHTML = ''; // Clear existing notes

  if (notesArray && notesArray.length > 0) {
    notesArray.forEach(note => {
      const noteItem = document.createElement('div');
      noteItem.classList.add('note-item');
      noteItem.setAttribute('data-id', note.id);

      const noteText = document.createElement('span');
      noteText.classList.add('note-text');
      noteText.textContent = note.text;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-note-button');
      deleteButton.innerHTML = '<i class="material-icons-round" style="font-size: 18px;">delete</i>'; // Using Material Icon
      deleteButton.setAttribute('title', 'Delete note');
      deleteButton.addEventListener('click', () => {
        deleteNote(note.id);
      });

      noteItem.appendChild(noteText);
      noteItem.appendChild(deleteButton);
      notesListEl.appendChild(noteItem);
    });
  } else {
    // Optional: Display a message if there are no notes
    // const emptyMessage = document.createElement('p');
    // emptyMessage.textContent = 'No notes yet. Add one below!';
    // emptyMessage.style.textAlign = 'center';
    // emptyMessage.style.opacity = '0.7';
    // notesListEl.appendChild(emptyMessage);
  }
}

/**
 * Adds a new note from the input field.
 */
function addNote() {
  if (!newNoteInputEl || !newNoteInputEl.value.trim()) {
    // Optionally, provide visual feedback for empty input
    if (newNoteInputEl) newNoteInputEl.focus();
    return;
  }

  const newNoteText = newNoteInputEl.value.trim();
  const newNote = {
    id: Date.now(), // Simple unique ID
    text: newNoteText,
  };

  loadNotes((notes) => {
    const updatedNotes = [...notes, newNote];
    saveNotes(updatedNotes);
    renderNotes(updatedNotes);
    newNoteInputEl.value = ''; // Clear input field
    newNoteInputEl.focus();
  });
}

/**
 * Initializes the Notes Widget.
 */
function initNotesWidget() {
  notesWidgetEl = document.getElementById('notes-widget');
  notesListEl = document.getElementById('notes-list');
  newNoteInputEl = document.getElementById('new-note-input');
  addNoteButtonEl = document.getElementById('add-note-button');

  if (!notesWidgetEl || !notesListEl || !newNoteInputEl || !addNoteButtonEl) {
    console.warn('Notes widget DOM elements not found. Skipping initialization.');
    return;
  }

  addNoteButtonEl.addEventListener('click', addNote);
  newNoteInputEl.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addNote();
    }
  });

  // Load and render existing notes
  loadNotes((notes) => {
    renderNotes(notes);
  });

  // console.log('Notes widget initialized.');
}

export { initNotesWidget };
