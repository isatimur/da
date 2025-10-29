// Top 5 Tasks Component - Shows top 5 priority tasks on main page
import todoService from '../services/todoService.js';
import { showNotification } from '../utils/common.js';
import logger from '../utils/logger.js';
import i18n from '../utils/i18n.js';

class Top5Tasks {
    constructor() {
        this.container = null;
        this.isInitialized = false;
    }

    // Initialize component
    init() {
        try {
            this.createContainer();
            this.setupEventListeners();
            this.updateTasks();
            this.applyInitialVisibility();
            
            logger.info('Top 5 Tasks widget initialized');
            return Promise.resolve();
        } catch (error) {
            logger.error('Failed to initialize Top 5 Tasks widget', { error: error.message });
            return Promise.reject(error);
        }
    }
    
    // Apply initial visibility based on settings
    applyInitialVisibility() {
        try {
            // Import stateManager dynamically to avoid circular dependency
            import('../modules/state.js').then(module => {
                const stateManager = module.default;
                const settings = stateManager.getSettings();
                
                if (this.container && typeof settings.showTop5Tasks !== 'undefined') {
                    this.container.style.display = settings.showTop5Tasks ? 'block' : 'none';
                }
            });
        } catch (error) {
            logger.error('Failed to apply initial visibility', { error: error.message });
        }
    }

    // Create container DOM
    createContainer() {
        // Remove existing container if it exists
        const existing = document.getElementById('top5TasksContainer');
        if (existing) {
            existing.remove();
        }

        const container = document.createElement('div');
        container.id = 'top5TasksContainer';
        container.className = 'top5-tasks-container glass';
        
        container.innerHTML = `
            <div class="top5-tasks-header">
                <div class="header-left">
                    <i class="material-icons-round">priority_high</i>
                    <h3>Today's Focus</h3>
                </div>
                <button class="view-all-btn" id="viewAllTasksBtn">
                    View All Tasks
                    <i class="material-icons-round">arrow_forward</i>
                </button>
            </div>
            <div class="top5-tasks-list" id="top5TasksList">
                <div class="empty-state">
                    <i class="material-icons-round">task_alt</i>
                    <p>Focus on your priorities</p>
                </div>
            </div>
        `;
        
        // Insert after affirmation card
        const affirmationCard = document.querySelector('.affirmation-card');
        if (affirmationCard) {
            affirmationCard.insertAdjacentElement('afterend', container);
        } else {
            document.body.appendChild(container);
        }
        
        this.container = container;
    }

    // Setup event listeners
    setupEventListeners() {
        if (!this.container) return;

        // "View All" button
        const viewAllBtn = this.container.querySelector('#viewAllTasksBtn');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                // Dispatch event to open todo manager
                document.dispatchEvent(new CustomEvent('openTodoManager'));
                
                // Import and show TODO manager
                import('./todoManager.js').then((module) => {
                    module.default.show();
                });
            });
        }

        // Subscribe to task changes
        todoService.subscribe((eventType) => {
            if (eventType === 'tasksUpdated' || eventType === 'taskCompleted') {
                this.updateTasks();
            }
        });
    }

    // Update tasks display
    async updateTasks() {
        try {
            // Check if container exists
            if (!this.container) {
                logger.warn('Container not found, recreating...');
                this.createContainer();
                this.setupEventListeners();
            }

            const tasks = todoService.getTop5Tasks();
            logger.info('Top 5 tasks retrieved', { count: tasks.length, tasks });
            
            const listContainer = this.container?.querySelector('#top5TasksList');
            
            if (!listContainer) {
                logger.error('List container not found');
                return;
            }

            if (tasks.length === 0) {
                listContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="material-icons-round">check_circle</i>
                        <p>No pending tasks</p>
                    </div>
                `;
                return;
            }

            listContainer.innerHTML = tasks.map((task, index) => this.renderTask(task, index)).join('');
            
            // Setup click handlers
            this.setupTaskClickHandlers();
            
        } catch (error) {
            logger.error('Failed to update Top 5 tasks', { error: error.message });
        }
    }

    // Render single task
    renderTask(task, index) {
        const priorityMap = {
            urgent: { color: '#ef4444', icon: 'error' },
            high: { color: '#f59e0b', icon: 'priority' },
            normal: { color: '#3b82f6', icon: 'radio_button_unchecked' },
            low: { color: '#6b7280', icon: 'remove_circle_outline' }
        };
        
        const priorityInfo = priorityMap[task.priority] || priorityMap.normal;
        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
        
        return `
            <div class="top5-task-item ${isOverdue ? 'overdue' : ''}" data-task-id="${task.id}" data-index="${index}">
                <div class="task-checkbox-wrapper">
                    <input 
                        type="checkbox" 
                        id="task-${task.id}" 
                        class="modern-checkbox"
                        ${task.completed ? 'checked' : ''}
                        data-task-id="${task.id}"
                    />
                    <label for="task-${task.id}" class="checkbox-label"></label>
                </div>
                <div class="task-content">
                    <div class="task-title-wrapper">
                        <h4 class="task-title ${task.completed ? 'completed' : ''}">${this.escapeHtml(task.title)}</h4>
                        <span class="task-number">${index + 1}</span>
                    </div>
                    ${task.dueDate ? `
                        <div class="task-meta ${isOverdue ? 'overdue' : ''}">
                            <i class="material-icons-round">schedule</i>
                            <span>${new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="task-priority" style="--priority-color: ${priorityInfo.color};">
                    <i class="material-icons-round">${priorityInfo.icon}</i>
                </div>
            </div>
        `;
    }

    // Setup click handlers for checkboxes
    setupTaskClickHandlers() {
        if (!this.container) return;
        
        const checkboxes = this.container.querySelectorAll('.modern-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', async (e) => {
                const taskId = parseInt(e.target.dataset.taskId);
                const isCompleted = e.target.checked;
                
                try {
                    logger.info('Toggling task', { taskId, isCompleted });
                    
                    if (isCompleted) {
                        await todoService.completeTask(taskId, true);
                    } else {
                        await todoService.uncompleteTask(taskId);
                    }
                    
                    // Show brief notification
                    showNotification(
                        isCompleted ? 'Task Completed!' : 'Task Reactivated',
                        ''
                    );
                } catch (error) {
                    logger.error('Failed to toggle task', { error: error.message, taskId });
                    showNotification('Error', 'Failed to update task. Please try again.');
                }
            });
        });
    }

    // Utility: escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Cleanup
    cleanup() {
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
    }
}

// Create and export singleton
const top5Tasks = new Top5Tasks();
export default top5Tasks;

