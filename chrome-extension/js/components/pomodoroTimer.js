// Pomodoro Timer Component
import todoService from '../services/todoService.js';
import { showNotification } from '../utils/common.js';
import logger from '../utils/logger.js';
import i18n from '../utils/i18n.js';

class PomodoroTimer {
    constructor() {
        this.isRunning = false;
        this.isBreak = false;
        this.remainingTime = 25 * 60; // 25 minutes in seconds
        this.breakTime = 5 * 60; // 5 minutes in seconds
        this.currentTime = this.remainingTime;
        this.interval = null;
        this.currentTaskId = null;
        this.completedPomodoros = 0;
        this.sessionStartTime = null;
        
        this.timerDisplay = null;
        this.progressCircle = null;
        
        this.initialize();
    }

    initialize() {
        this.createTimer();
        this.setupEventListeners();
        
        // Subscribe to task changes
        todoService.subscribe((eventType, data) => {
            if (eventType === 'taskCompleted' && data.task.id === this.currentTaskId) {
                this.stop();
            }
        });
        
        logger.info('Pomodoro Timer initialized');
    }

    createTimer() {
        // Check if timer already exists
        if (document.getElementById('pomodoroTimer')) {
            this.timerDisplay = document.getElementById('pomodoroTimer');
            return;
        }

        const timer = document.createElement('div');
        timer.id = 'pomodoroTimer';
        timer.className = 'pomodoro-timer glass hidden';
        timer.setAttribute('role', 'dialog');
        
        timer.innerHTML = `
            <div class="pomodoro-header">
                <div class="pomodoro-title">
                    <i class="material-icons-round">timer</i>
                    <h3>Pomodoro Timer</h3>
                </div>
                <button class="close-button glass-button" aria-label="Close timer">
                    <i class="material-icons-round">close</i>
                </button>
            </div>
            
            <div class="pomodoro-content">
                <div class="pomodoro-display">
                    <div class="pomodoro-circle">
                        <svg class="pomodoro-progress">
                            <circle cx="100" cy="100" r="90" class="progress-bg" />
                            <circle cx="100" cy="100" r="90" class="progress-bar" />
                        </svg>
                        <div class="pomodoro-time">
                            <span id="pomodoroMinutes">25</span>
                            <span>:</span>
                            <span id="pomodoroSeconds">00</span>
                        </div>
                        <div class="pomodoro-mode" id="pomodoroMode">Focus Time</div>
                    </div>
                </div>
                
                <div class="pomodoro-controls">
                    <button class="pomodoro-btn play-btn" id="pomodoroPlay" aria-label="Start/Pause">
                        <i class="material-icons-round">play_arrow</i>
                        <span>Start</span>
                    </button>
                    <button class="pomodoro-btn reset-btn" id="pomodoroReset" aria-label="Reset">
                        <i class="material-icons-round">replay</i>
                        <span>Reset</span>
                    </button>
                    <button class="pomodoro-btn skip-btn" id="pomodoroSkip" aria-label="Skip">
                        <i class="material-icons-round">skip_next</i>
                        <span>Skip</span>
                    </button>
                </div>
                
                <div class="pomodoro-task-selection">
                    <label>Working on:</label>
                    <select id="pomodoroTaskSelect">
                        <option value="">Select a task...</option>
                    </select>
                </div>
                
                <div class="pomodoro-settings">
                    <div class="setting-item">
                        <label>Focus Duration (minutes)</label>
                        <input type="number" id="pomodoroFocusDuration" value="25" min="1" max="60" />
                    </div>
                    <div class="setting-item">
                        <label>Break Duration (minutes)</label>
                        <input type="number" id="pomodoroBreakDuration" value="5" min="1" max="30" />
                    </div>
                </div>
                
                <div class="pomodoro-stats">
                    <div class="stat-item">
                        <span class="stat-value" id="completedPomodoros">0</span>
                        <span class="stat-label">Completed</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value" id="sessionTime">0</span>
                        <span class="stat-label">Minutes Today</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(timer);
        this.timerDisplay = timer;
        this.progressCircle = timer.querySelector('.progress-bar');
        
        this.updateTaskSelect();
    }

    setupEventListeners() {
        if (!this.timerDisplay) return;

        // Close button
        this.timerDisplay.querySelector('.close-button').addEventListener('click', () => {
            this.hide();
        });

        // Play/Pause button
        this.timerDisplay.querySelector('#pomodoroPlay').addEventListener('click', () => {
            if (this.isRunning) {
                this.pause();
            } else {
                this.start();
            }
        });

        // Reset button
        this.timerDisplay.querySelector('#pomodoroReset').addEventListener('click', () => {
            this.reset();
        });

        // Skip button
        this.timerDisplay.querySelector('#pomodoroSkip').addEventListener('click', () => {
            this.skip();
        });

        // Task selection
        this.timerDisplay.querySelector('#pomodoroTaskSelect').addEventListener('change', (e) => {
            this.currentTaskId = e.target.value ? parseInt(e.target.value) : null;
        });

        // Duration settings
        this.timerDisplay.querySelector('#pomodoroFocusDuration').addEventListener('change', (e) => {
            const minutes = parseInt(e.target.value);
            if (!this.isRunning && !this.isBreak) {
                this.remainingTime = minutes * 60;
                this.currentTime = minutes * 60;
                this.updateDisplay();
            }
        });

        this.timerDisplay.querySelector('#pomodoroBreakDuration').addEventListener('change', (e) => {
            const minutes = parseInt(e.target.value);
            if (!this.isRunning || this.isBreak) {
                this.breakTime = minutes * 60;
                if (this.isBreak) {
                    this.currentTime = minutes * 60;
                    this.updateDisplay();
                }
            }
        });
    }

    updateTaskSelect() {
        if (!this.timerDisplay) return;
        
        const select = this.timerDisplay.querySelector('#pomodoroTaskSelect');
        const tasks = todoService.getTasksByStatus(false);
        
        select.innerHTML = '<option value="">Select a task...</option>';
        
        tasks.forEach(task => {
            const option = document.createElement('option');
            option.value = task.id;
            option.textContent = task.title;
            if (task.id === this.currentTaskId) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.sessionStartTime = Date.now();
        
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.tick();
            }, 1000);
        }

        this.updatePlayButton(true);
        logger.info('Pomodoro timer started', { isBreak: this.isBreak });
    }

    pause() {
        if (!this.isRunning) return;

        this.isRunning = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        this.updatePlayButton(false);
        logger.info('Pomodoro timer paused');
    }

    reset() {
        this.isRunning = false;
        this.isBreak = false;
        
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        const durationInput = this.timerDisplay.querySelector('#pomodoroFocusDuration');
        this.remainingTime = parseInt(durationInput.value) * 60;
        this.currentTime = this.remainingTime;
        
        this.updateDisplay();
        this.updatePlayButton(false);
        logger.info('Pomodoro timer reset');
    }

    skip() {
        this.pause();
        
        if (this.isBreak) {
            // Skip break, start focus time
            this.isBreak = false;
            const durationInput = this.timerDisplay.querySelector('#pomodoroFocusDuration');
            this.currentTime = parseInt(durationInput.value) * 60;
            this.remainingTime = this.currentTime;
            this.updateDisplay();
            this.updateModeDisplay();
            showNotification('Skipped', 'Break skipped, starting focus time');
        } else {
            // Skip focus, start break
            this.isBreak = true;
            const durationInput = this.timerDisplay.querySelector('#pomodoroBreakDuration');
            this.currentTime = parseInt(durationInput.value) * 60;
            this.remainingTime = this.currentTime;
            this.updateDisplay();
            this.updateModeDisplay();
            
            if (this.currentTaskId) {
                this.incrementPomodoroSessions();
            }
            
            showNotification('Pomodoro Complete!', 'Take a well-deserved break');
            this.playCompletionSound();
        }
    }

    tick() {
        this.currentTime--;
        this.updateDisplay();

        if (this.currentTime <= 0) {
            this.complete();
        }
    }

    complete() {
        this.pause();
        
        if (this.isBreak) {
            // Break completed, start focus time
            this.isBreak = false;
            const durationInput = this.timerDisplay.querySelector('#pomodoroFocusDuration');
            this.currentTime = parseInt(durationInput.value) * 60;
            this.remainingTime = this.currentTime;
            
            showNotification('Break Over', 'Time to focus!');
            this.playCompletionSound();
        } else {
            // Focus time completed, start break
            this.isBreak = true;
            const durationInput = this.timerDisplay.querySelector('#pomodoroBreakDuration');
            this.currentTime = parseInt(durationInput.value) * 60;
            this.remainingTime = this.currentTime;
            
            this.completedPomodoros++;
            this.updateStats();
            
            if (this.currentTaskId) {
                this.incrementPomodoroSessions();
            }
            
            showNotification('Pomodoro Complete!', 'Take a 5-minute break');
            this.playCompletionSound();
        }
        
        this.updateDisplay();
        this.updateModeDisplay();
    }

    async incrementPomodoroSessions() {
        try {
            const task = todoService.getTaskById(this.currentTaskId);
            if (task) {
                task.pomodoroSessions = (task.pomodoroSessions || 0) + 1;
                await todoService.saveTasks();
            }
        } catch (error) {
            logger.error('Failed to increment Pomodoro sessions', { error: error.message });
        }
    }

    updateDisplay() {
        if (!this.timerDisplay) return;

        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;

        const minutesElement = this.timerDisplay.querySelector('#pomodoroMinutes');
        const secondsElement = this.timerDisplay.querySelector('#pomodoroSeconds');

        if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
        if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');

        // Update progress circle
        this.updateProgress();
    }

    updateProgress() {
        if (!this.timerDisplay || !this.progressCircle) return;

        const totalTime = this.isBreak ? this.breakTime : this.remainingTime;
        const percentage = ((totalTime - this.currentTime) / totalTime) * 100;
        const circumference = 2 * Math.PI * 90;
        const offset = circumference - (percentage / 100) * circumference;

        this.progressCircle.style.strokeDashoffset = offset;
    }

    updateModeDisplay() {
        const modeElement = this.timerDisplay.querySelector('#pomodoroMode');
        if (modeElement) {
            modeElement.textContent = this.isBreak ? 'Break Time' : 'Focus Time';
        }
    }

    updatePlayButton(isPlaying) {
        const button = this.timerDisplay.querySelector('#pomodoroPlay');
        const icon = button.querySelector('.material-icons-round');
        const text = button.querySelector('span');
        
        icon.textContent = isPlaying ? 'pause' : 'play_arrow';
        text.textContent = isPlaying ? 'Pause' : 'Start';
    }

    updateStats() {
        const statsElement = this.timerDisplay.querySelector('#completedPomodoros');
        if (statsElement) {
            statsElement.textContent = this.completedPomodoros;
        }
    }

    playCompletionSound() {
        // Play a gentle notification sound
        // Note: Chrome extensions can't use Audio API without user interaction
        // This would require user permission for notifications
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1fDMeSwFJHfH8N2QQAoUXrDp66hVFApGn+DyvmwhBjGF0/LMeSwFJHTG79yNPwgUXa7r56dWEwxMouPwuGIcBjiQ1fDLdy0FJHLH8OCQQAoUX7Do66hYFgpHoOD0u2kgBjGI0/LLeSwFJHLH8NyOOQsUUK/r56hVFgtGn+DyvmwhBjCH0/HNeSwFJHLG79yNPwsUXq7r56pXEwxOn+PwuGMcBjeP1fDOeSwFJHLH8N2QQAoUX67r56hVFgpGoOD0u2ohBjGK0/LNeSwFJHLG79yNPwsUXrDr66hXFwxMn+PwuGMcBj+C1v/MeiwFJHLH8N2QQAoUXa/r5KFYFgpHn+DyvmwhBjGG0/LMeSsFJHLH78uOPwgUX67r56hXFgpHn+DyvmwhBjGJ0/LMeSsFJHLG89yOPwsUX6/r56hVFgpGn+DyvmwhBjGI1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq7r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLH89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLH89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq7r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLH89yNPwsUXq7r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq7r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq7r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq/r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq7r56hXFgpGn+DyvmwhBjGK1PLMeSsFJHLG89yNPwsUXq7r56hVFgpGn+DyvmwhBjGK1PLMeSsFJHLG79yNPwsUXq7r56hVEw1Mo+Ow==');
            audio.play().catch(() => {});
        } catch (e) {
            // Silently fail if audio play fails
        }
    }

    show() {
        if (!this.timerDisplay) return;
        
        this.timerDisplay.classList.remove('hidden');
        this.timerDisplay.setAttribute('aria-hidden', 'false');
        this.updateTaskSelect();
    }

    hide() {
        if (!this.timerDisplay) return;
        
        this.timerDisplay.classList.add('hidden');
        this.timerDisplay.setAttribute('aria-hidden', 'true');
        this.pause();
    }

    cleanup() {
        this.pause();
        
        if (this.timerDisplay && this.timerDisplay.parentNode) {
            this.timerDisplay.parentNode.removeChild(this.timerDisplay);
        }
        
        this.timerDisplay = null;
        this.progressCircle = null;
    }
}

// Create and export singleton instance
const pomodoroTimer = new PomodoroTimer();
export default pomodoroTimer;

