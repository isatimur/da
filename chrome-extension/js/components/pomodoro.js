// Constants
const WORK_DURATION = 25 * 60; // seconds
const SHORT_BREAK_DURATION = 5 * 60;
const LONG_BREAK_DURATION = 15 * 60;
const POMODOROS_BEFORE_LONG_BREAK = 4;

// State Variables
let currentTime = WORK_DURATION;
let timerInterval = null;
let currentSessionType = 'Work'; // 'Work', 'Short Break', 'Long Break'
let pomodoroCount = 0;
let isPaused = true;

// DOM Element References
let pomodoroDisplayEl;
let pomodoroStatusEl;
let startButtonEl;
let pauseButtonEl;
let resetButtonEl;

/**
 * Updates the timer display with the current time and session type.
 */
function updateDisplay() {
    if (!pomodoroDisplayEl || !pomodoroStatusEl) return;

    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    pomodoroDisplayEl.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    pomodoroStatusEl.textContent = currentSessionType;
}

/**
 * Updates the visibility and disabled states of control buttons.
 */
function updateButtonStates() {
    if (!startButtonEl || !pauseButtonEl || !resetButtonEl) return;

    if (isPaused) {
        startButtonEl.style.display = 'inline-block';
        pauseButtonEl.style.display = 'none';
        resetButtonEl.disabled = false; // Enable reset when paused
    } else {
        startButtonEl.style.display = 'none';
        pauseButtonEl.style.display = 'inline-block';
        resetButtonEl.disabled = true; // Disable reset when timer is running (or choose to keep enabled)
    }
}

/**
 * Handles the end of a Pomodoro session (Work, Short Break, or Long Break).
 */
function handleSessionEnd() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    isPaused = true;

    // Optional: Play sound or show notification here
    // chrome.notifications.create(...);

    if (currentSessionType === 'Work') {
        pomodoroCount++;
        if (pomodoroCount % POMODOROS_BEFORE_LONG_BREAK === 0) {
            currentSessionType = 'Long Break';
            currentTime = LONG_BREAK_DURATION;
        } else {
            currentSessionType = 'Short Break';
            currentTime = SHORT_BREAK_DURATION;
        }
    } else { // If it was a 'Short Break' or 'Long Break'
        currentSessionType = 'Work';
        currentTime = WORK_DURATION;
    }

    updateDisplay();
    updateButtonStates();
    // Consider auto-starting the next timer or requiring user to click start.
    // For now, requires user to click start.
}

/**
 * Starts the Pomodoro timer.
 */
function startTimer() {
    isPaused = false;
    updateButtonStates();

    if (!timerInterval) { // Ensure only one interval is running
        timerInterval = setInterval(() => {
            currentTime--;
            updateDisplay();
            if (currentTime <= 0) {
                handleSessionEnd();
            }
        }, 1000);
    }
}

/**
 * Pauses the Pomodoro timer.
 */
function pauseTimer() {
    isPaused = true;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    updateButtonStates();
}

/**
 * Resets the Pomodoro timer.
 */
function resetTimer() {
    pauseTimer(); // Stop any active interval and set isPaused to true

    // Reset currentTime based on the current session type
    switch (currentSessionType) {
        case 'Work':
            currentTime = WORK_DURATION;
            break;
        case 'Short Break':
            currentTime = SHORT_BREAK_DURATION;
            break;
        case 'Long Break':
            currentTime = LONG_BREAK_DURATION;
            break;
        default: // Should not happen
            currentTime = WORK_DURATION;
            currentSessionType = 'Work';
    }
    // If we want to reset pomodoroCount on any manual reset:
    // pomodoroCount = 0; // Uncomment if manual reset should clear pomodoro progress

    updateDisplay();
    updateButtonStates(); // Buttons should reflect the new paused state
}


/**
 * Initializes the Pomodoro Timer Widget.
 */
function initPomodoroWidget() {
    pomodoroDisplayEl = document.getElementById('pomodoro-display');
    pomodoroStatusEl = document.getElementById('pomodoro-status');
    startButtonEl = document.getElementById('pomodoro-start');
    pauseButtonEl = document.getElementById('pomodoro-pause');
    resetButtonEl = document.getElementById('pomodoro-reset');

    if (!pomodoroDisplayEl || !pomodoroStatusEl || !startButtonEl || !pauseButtonEl || !resetButtonEl) {
        console.warn('Pomodoro widget DOM elements not found. Skipping initialization.');
        return;
    }

    startButtonEl.addEventListener('click', startTimer);
    pauseButtonEl.addEventListener('click', pauseTimer);
    resetButtonEl.addEventListener('click', resetTimer);

    updateDisplay(); // Show initial time (e.g., 25:00)
    updateButtonStates(); // Set initial button states

    // console.log('Pomodoro widget initialized.');
}

export { initPomodoroWidget };
