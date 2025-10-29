// TODO Widget Component
import todoService from '../services/todoService.js';
import { showNotification } from '../utils/common.js';
import logger from '../utils/logger.js';
import i18n from '../utils/i18n.js';
import todoManager from './todoManager.js';

class TodoWidget {
    constructor() {
        this.widget = null;
        this.countElement = null;
        this.isInitialized = false;
        this.updateInterval = null;
    }

    // Initialize widget
    init() {
        try {
            this.createWidget();
            this.setupEventListeners();
            this.startUpdateInterval();
            
            // Initial update (don't await, let it happen async)
            this.updateWidget();
            
            logger.info('TODO widget initialized');
            return Promise.resolve();
        } catch (error) {
            logger.error('Failed to initialize TODO widget', { error: error.message });
            return Promise.reject(error);
        }
    }

    // Create widget DOM
    createWidget() {
        const widget = document.createElement('button');
        widget.id = 'todoWidget';
        widget.className = 'todo-widget';
        widget.setAttribute('aria-label', 'Task Manager');
        widget.setAttribute('title', 'Task Manager (T)');
        
        widget.innerHTML = `
            <div class="todo-widget-content">
                <i class="material-icons-round" aria-hidden="true">task_alt</i>
                <span class="todo-widget-count" id="todoWidgetCount">0</span>
            </div>
            <div class="todo-widget-pulse" aria-hidden="true"></div>
        `;
        
        document.body.appendChild(widget);
        this.widget = widget;
        this.countElement = document.getElementById('todoWidgetCount');
        
        // Update translations
        widget.setAttribute('title', i18n.t('todo.widget.title', 'Task Manager (T)'));
        widget.setAttribute('aria-label', i18n.t('todo.widget.ariaLabel', 'Task Manager'));
    }

    // Setup event listeners
    setupEventListeners() {
        if (!this.widget) return;

        // Click to open TODO manager
        this.widget.addEventListener('click', async (e) => {
            e.stopPropagation();
            await this.openTodoManager();
        });

        // Subscribe to task changes
        todoService.subscribe((eventType, data) => {
            if (eventType === 'tasksUpdated' || eventType === 'taskCompleted') {
                this.updateWidget();
            }
        });
    }

    // Update widget display
    async updateWidget() {
        try {
            const activeTasks = todoService.getTasksByStatus(false);
            const count = activeTasks.length;
            
            if (this.countElement) {
                this.countElement.textContent = count;
                
                // Add animation for new tasks
                if (count > 0) {
                    this.countElement.classList.add('bounce');
                    setTimeout(() => {
                        this.countElement.classList.remove('bounce');
                    }, 300);
                }
            }

            // Show/hide pulse for overdue tasks
            const overdue = todoService.getOverdueTasks();
            if (overdue.length > 0 && this.widget) {
                this.widget.classList.add('has-overdue');
            } else if (this.widget) {
                this.widget.classList.remove('has-overdue');
            }

            // Update title with detailed info
            if (this.widget) {
                let title = `${i18n.t('todo.widget.title', 'Task Manager')} - `;
                
                if (count === 0) {
                    title += i18n.t('todo.widget.noTasks', 'No active tasks');
                } else {
                    title += i18n.t('todo.widget.activeTasks', `${count} active tasks`, { count });
                }
                
                if (overdue.length > 0) {
                    title += ` (${overdue.length} ${i18n.t('todo.widget.overdue', 'overdue')})`;
                }
                
                this.widget.setAttribute('title', title);
            }
        } catch (error) {
            logger.error('Failed to update TODO widget', { error: error.message });
        }
    }

    // Open TODO manager
    async openTodoManager() {
        try {
            logger.info('Opening TODO manager...');
            
            // Use the imported todoManager instance
            if (todoManager && typeof todoManager.show === 'function') {
                await todoManager.show();
                logger.info('TODO manager opened successfully');
            } else {
                logger.error('TODO manager not properly initialized', { todoManager });
                showNotification(
                    i18n.t('common.error', 'Error'),
                    'TODO Manager not initialized'
                );
            }
        } catch (error) {
            logger.error('Failed to open TODO manager', { error: error.message, stack: error.stack });
            showNotification(
                i18n.t('common.error', 'Error'),
                i18n.t('errors.todoManagerFailed', 'Failed to open task manager')
            );
        }
    }

    // Start update interval (updates every 30 seconds)
    startUpdateInterval() {
        // Clear existing interval
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        // Update widget every 30 seconds
        this.updateInterval = setInterval(() => {
            this.updateWidget();
        }, 30000);
    }

    // Stop update interval
    stopUpdateInterval() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    // Cleanup
    cleanup() {
        this.stopUpdateInterval();
        
        if (this.widget && this.widget.parentNode) {
            this.widget.parentNode.removeChild(this.widget);
        }
        
        this.widget = null;
        this.countElement = null;
    }
}

// Create and export singleton instance
const todoWidget = new TodoWidget();
export default todoWidget;

