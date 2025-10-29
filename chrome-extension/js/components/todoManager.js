// TODO Manager Component
import todoService from '../services/todoService.js';
import { showNotification } from '../utils/common.js';
import logger from '../utils/logger.js';
import i18n from '../utils/i18n.js';
import { requirePremium } from '../utils/premium.js';

class TodoManager {
    constructor() {
        this.modal = null;
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.sortBy = 'priority';
        this.editingTaskId = null; // Track which task is being edited
        this.initialize();
    }

    async initialize() {
        this.createModal();
        this.setupEventListeners();
        
        // Don't listen for custom event - instead export show method

        // Subscribe to task updates
        todoService.subscribe(() => {
            if (!this.modal.classList.contains('hidden')) {
                this.renderTasks();
            }
        });

        logger.info('TODO Manager initialized');
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.id = 'todoManagerModal';
        this.modal.className = 'todo-manager-modal dialog-base hidden';
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-labelledby', 'todo-manager-title');
        
        this.modal.innerHTML = `
            <div class="todo-manager-content glass">
                <div class="todo-manager-header">
                    <div class="header-content">
                        <i class="material-icons-round" aria-hidden="true">task_alt</i>
                        <h2 id="todo-manager-title">Task Manager</h2>
                    </div>
                    <button class="close-button glass-button" aria-label="Close">
                        <i class="material-icons-round">close</i>
                    </button>
                </div>

                <div class="todo-manager-toolbar">
                    <div class="todo-search">
                        <i class="material-icons-round search-icon">search</i>
                        <input type="text" id="todoSearch" placeholder="Search tasks..." />
                    </div>
                    <div class="todo-filters">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="active">Active</button>
                        <button class="filter-btn" data-filter="completed">Completed</button>
                        <button class="filter-btn" data-filter="dueToday">Due Today</button>
                    </div>
                </div>

                <div class="todo-manager-body">
                    <div class="todo-stats">
                        <div class="stat-item">
                            <span class="stat-value" id="totalTasks">0</span>
                            <span class="stat-label">Total</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value" id="activeTasks">0</span>
                            <span class="stat-label">Active</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value" id="completedTasks">0</span>
                            <span class="stat-label">Completed</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value" id="dueTodayTasks">0</span>
                            <span class="stat-label">Due Today</span>
                        </div>
                    </div>

                    <div class="todo-list" id="todoList">
                        <!-- Tasks will be rendered here -->
                    </div>

                    <div class="todo-list-empty hidden" id="todoListEmpty">
                        <i class="material-icons-round">task_alt</i>
                        <p>No tasks yet. Create your first task!</p>
                    </div>
                </div>

                <div class="todo-manager-footer">
                    <button class="add-task-btn glass-button" id="addTaskBtn">
                        <i class="material-icons-round">add</i>
                        <span>Add Task</span>
                    </button>
                </div>
            </div>

            <!-- Add Task Modal -->
            <div class="add-task-modal hidden" id="addTaskModal">
                <div class="add-task-content glass">
                    <div class="add-task-header">
                        <h3>Add New Task</h3>
                        <button class="close-button glass-button" id="closeAddTask">
                            <i class="material-icons-round">close</i>
                        </button>
                    </div>
                    <div class="add-task-body">
                        <div class="form-group">
                            <label>Title *</label>
                            <input type="text" id="taskTitle" placeholder="Enter task title" required />
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea id="taskDescription" placeholder="Enter task description" rows="3"></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Priority</label>
                                <select id="taskPriority">
                                    <option value="low">Low</option>
                                    <option value="normal" selected>Normal</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Category</label>
                                <select id="taskCategory">
                                    <option value="work">Work</option>
                                    <option value="personal">Personal</option>
                                    <option value="health">Health</option>
                                    <option value="learning">Learning</option>
                                    <option value="shopping">Shopping</option>
                                    <option value="other" selected>Other</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Due Date</label>
                            <input type="date" id="taskDueDate" />
                        </div>
                        <div class="form-group">
                            <label>Tags (comma separated)</label>
                            <input type="text" id="taskTags" placeholder="tag1, tag2, tag3" />
                        </div>
                    </div>
                    <div class="add-task-footer">
                        <button class="btn-secondary glass-button" id="cancelAddTask">Cancel</button>
                        <button class="btn-primary glass-button" id="saveTask">Save Task</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.modal);
    }

    setupEventListeners() {
        // Close button
        this.modal.querySelector('.close-button').addEventListener('click', () => {
            this.hide();
        });

        // Filter buttons
        this.modal.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.modal.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderTasks();
            });
        });

        // Search input
        const searchInput = this.modal.querySelector('#todoSearch');
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.renderTasks();
        });

        // Add task button
        this.modal.querySelector('#addTaskBtn').addEventListener('click', () => {
            this.showAddTaskModal();
        });

        // Close add task modal
        this.modal.querySelector('#closeAddTask').addEventListener('click', () => {
            this.hideAddTaskModal();
        });
        this.modal.querySelector('#cancelAddTask').addEventListener('click', () => {
            this.hideAddTaskModal();
        });

        // Save task
        this.modal.querySelector('#saveTask').addEventListener('click', async () => {
            await this.saveNewTask();
        });

        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('hidden')) {
                if (e.key === 'Escape') {
                    this.hide();
                } else if (e.key === 'Enter' && e.ctrlKey) {
                    this.showAddTaskModal();
                }
            }
        });
    }

    async show() {
        try {
            logger.info('TODO Manager show() called', { modal: this.modal, hasClass: this.modal?.classList });
            
            if (!this.modal) {
                logger.error('Modal is null!');
                return;
            }
            
            this.modal.classList.remove('hidden');
            this.modal.setAttribute('aria-hidden', 'false');
            
            logger.info('TODO Manager modal shown');
            
            await this.renderTasks();
            this.updateStats();
        } catch (error) {
            logger.error('Error in TODO Manager show()', { error: error.message, stack: error.stack });
        }
    }

    hide() {
        this.modal.classList.add('hidden');
        this.modal.setAttribute('aria-hidden', 'true');
        this.hideAddTaskModal();
    }

    async renderTasks() {
        let tasks = [];

        // Filter tasks
        switch (this.currentFilter) {
            case 'active':
                tasks = todoService.getTasksByStatus(false);
                break;
            case 'completed':
                tasks = todoService.getTasksByStatus(true);
                break;
            case 'dueToday':
                tasks = todoService.getTasksDueSoon().filter(t => {
                    const today = new Date().toISOString().split('T')[0];
                    return t.dueDate === today;
                });
                break;
            default:
                tasks = todoService.getAllTasks();
        }

        // Search filter
        if (this.searchQuery) {
            tasks = todoService.searchTasks(this.searchQuery);
        }

        // Sort tasks
        tasks = this.sortTasks(tasks);

        const todoList = this.modal.querySelector('#todoList');
        const emptyState = this.modal.querySelector('#todoListEmpty');

        if (!todoList || !emptyState) {
            logger.error('Could not find todo list elements');
            return;
        }

        if (tasks.length === 0) {
            // Hide task list, show empty state
            todoList.innerHTML = '';
            todoList.style.display = 'none';
            emptyState.classList.remove('hidden');
            return;
        }

        // Show task list, hide empty state
        todoList.style.display = 'flex';
        emptyState.classList.add('hidden');

        todoList.innerHTML = tasks.map(task => this.renderTask(task)).join('');
        
        // Setup task action listeners
        this.setupTaskActionListeners();
    }

    renderTask(task) {
        const priorityClass = `priority-${task.priority}`;
        const overdueClass = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed ? 'overdue' : '';
        const completedClass = task.completed ? 'completed' : '';
        
        const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;
        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
        
        return `
            <div class="todo-item glass ${priorityClass} ${overdueClass} ${completedClass}" data-task-id="${task.id}">
                <div class="todo-item-main">
                    <div class="todo-checkbox">
                        <input type="checkbox" ${task.completed ? 'checked' : ''} data-action="toggle" />
                    </div>
                    <div class="todo-content">
                        <div class="todo-header">
                            <h3 class="todo-title">${this.escapeHtml(task.title)}</h3>
                            <div class="todo-badges">
                                <span class="todo-priority-badge">${task.priority}</span>
                                <span class="todo-category-badge">${task.category}</span>
                            </div>
                        </div>
                        ${task.description ? `<p class="todo-description">${this.escapeHtml(task.description)}</p>` : ''}
                        ${task.dueDate ? `
                            <div class="todo-due-date">
                                <i class="material-icons-round">schedule</i>
                                <span class="${isOverdue ? 'overdue-text' : ''}">${dueDate}</span>
                            </div>
                        ` : ''}
                        ${task.tags && task.tags.length > 0 ? `
                            <div class="todo-tags">
                                ${task.tags.map(tag => `
                                    <span class="todo-tag">${this.escapeHtml(tag)}</span>
                                `).join('')}
                            </div>
                        ` : ''}
                        ${task.subtasks && task.subtasks.length > 0 ? `
                            <div class="todo-subtasks">
                                <div class="subtask-progress">
                                    ${task.subtasks.filter(st => st.completed).length}/${task.subtasks.length} completed
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    <div class="todo-actions">
                        <button class="todo-action-btn" data-action="edit" title="Edit">
                            <i class="material-icons-round">edit</i>
                        </button>
                        <button class="todo-action-btn" data-action="delete" title="Delete">
                            <i class="material-icons-round">delete</i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    sortTasks(tasks) {
        return tasks.sort((a, b) => {
            const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }

    setupTaskActionListeners() {
        const todoList = this.modal.querySelector('#todoList');
        
        todoList.addEventListener('click', async (e) => {
            const button = e.target.closest('[data-action]');
            if (!button) return;

            const taskId = parseInt(button.closest('.todo-item').dataset.taskId);
            const action = button.dataset.action;

            try {
                switch (action) {
                    case 'toggle':
                        const task = todoService.getTaskById(taskId);
                        if (task.completed) {
                            await todoService.uncompleteTask(taskId);
                        } else {
                            await todoService.completeTask(taskId);
                        }
                        await this.renderTasks();
                        this.updateStats();
                        break;

                    case 'edit':
                        this.editTask(taskId);
                        break;

                    case 'delete':
                        if (confirm('Are you sure you want to delete this task?')) {
                            await todoService.deleteTask(taskId);
                            await this.renderTasks();
                            this.updateStats();
                        }
                        break;
                }
            } catch (error) {
                logger.error('Failed to handle task action', { error: error.message, action });
                showNotification('Error', 'Failed to perform action');
            }
        });
    }

    updateStats() {
        const stats = todoService.getStatistics();
        
        this.modal.querySelector('#totalTasks').textContent = stats.total;
        this.modal.querySelector('#activeTasks').textContent = stats.active;
        this.modal.querySelector('#completedTasks').textContent = stats.completed;
        this.modal.querySelector('#dueTodayTasks').textContent = stats.dueToday;
    }

    showAddTaskModal() {
        this.modal.querySelector('#addTaskModal').classList.remove('hidden');
    }

    hideAddTaskModal() {
        this.modal.querySelector('#addTaskModal').classList.add('hidden');
        this.resetAddTaskForm();
        this.editingTaskId = null;
        
        // Reset modal title
        const modalTitle = this.modal.querySelector('#addTaskModal h3');
        if (modalTitle) {
            modalTitle.textContent = 'Add New Task';
        }
    }

    resetAddTaskForm() {
        this.modal.querySelector('#taskTitle').value = '';
        this.modal.querySelector('#taskDescription').value = '';
        this.modal.querySelector('#taskPriority').value = 'normal';
        this.modal.querySelector('#taskCategory').value = 'other';
        this.modal.querySelector('#taskDueDate').value = '';
        this.modal.querySelector('#taskTags').value = '';
        
        // Reset save button text and handler
        const saveBtn = this.modal.querySelector('#saveTask');
        if (saveBtn) {
            saveBtn.textContent = 'Save Task';
            // Remove old event listeners by cloning
            const newBtn = saveBtn.cloneNode(true);
            saveBtn.parentNode.replaceChild(newBtn, saveBtn);
            newBtn.addEventListener('click', async () => await this.saveNewTask());
        }
    }
    
    editTask(taskId) {
        const task = todoService.getTaskById(taskId);
        if (!task) {
            showNotification('Error', 'Task not found');
            return;
        }
        
        // Populate form with task data
        this.modal.querySelector('#taskTitle').value = task.title;
        this.modal.querySelector('#taskDescription').value = task.description || '';
        this.modal.querySelector('#taskPriority').value = task.priority;
        this.modal.querySelector('#taskCategory').value = task.category;
        this.modal.querySelector('#taskDueDate').value = task.dueDate || '';
        this.modal.querySelector('#taskTags').value = task.tags ? task.tags.join(', ') : '';
        
        // Store task ID for update
        this.editingTaskId = taskId;
        
        // Change save button to update button
        const saveBtn = this.modal.querySelector('#saveTask');
        saveBtn.textContent = 'Update Task';
        
        // Remove old listener and add new one
        const newBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(newBtn, saveBtn);
        newBtn.addEventListener('click', async () => await this.updateTask(taskId));
        
        // Update modal title
        const modalTitle = this.modal.querySelector('#addTaskModal h3');
        if (modalTitle) {
            modalTitle.textContent = 'Edit Task';
        }
        
        // Show modal
        this.modal.querySelector('#addTaskModal').classList.remove('hidden');
    }
    
    async updateTask(taskId) {
        try {
            const title = this.modal.querySelector('#taskTitle').value.trim();
            if (!title) {
                showNotification('Error', 'Title is required');
                return;
            }
            
            const taskData = {
                title,
                description: this.modal.querySelector('#taskDescription').value.trim(),
                priority: this.modal.querySelector('#taskPriority').value,
                category: this.modal.querySelector('#taskCategory').value,
                dueDate: this.modal.querySelector('#taskDueDate').value || null,
                tags: this.modal.querySelector('#taskTags').value
                    .split(',')
                    .map(t => t.trim())
                    .filter(t => t.length > 0)
            };
            
            await todoService.updateTask(taskId, taskData);
            await this.renderTasks();
            this.updateStats();
            this.hideAddTaskModal();
            
            showNotification('Success', 'Task updated successfully');
        } catch (error) {
            logger.error('Failed to update task', { error: error.message });
            showNotification('Error', 'Failed to update task');
        }
    }

    async saveNewTask() {
        const title = this.modal.querySelector('#taskTitle').value.trim();
        
        if (!title) {
            showNotification('Error', 'Task title is required');
            return;
        }

        try {
            const taskData = {
                title,
                description: this.modal.querySelector('#taskDescription').value.trim(),
                priority: this.modal.querySelector('#taskPriority').value,
                category: this.modal.querySelector('#taskCategory').value,
                dueDate: this.modal.querySelector('#taskDueDate').value || null,
                tags: this.modal.querySelector('#taskTags').value.split(',').map(t => t.trim()).filter(t => t)
            };

            await todoService.addTask(taskData);
            
            this.hideAddTaskModal();
            await this.renderTasks();
            this.updateStats();
            
            showNotification('Success', 'Task added successfully');
        } catch (error) {
            logger.error('Failed to save task', { error: error.message });
            showNotification('Error', error.message || 'Failed to add task');
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Create and export singleton instance
const todoManager = new TodoManager();
export default todoManager;

