// TODO Service Module
import stateManager from '../modules/state.js';
import { withErrorBoundary } from '../utils/common.js';
import { requirePremium } from '../utils/premium.js';
import logger from '../utils/logger.js';

class TodoError extends Error {
    constructor(message, code, details = {}) {
        super(message);
        this.name = 'TodoError';
        this.code = code;
        this.details = details;
    }
}

class TodoService {
    constructor() {
        this.tasks = [];
        this.categories = ['work', 'personal', 'health', 'learning', 'shopping', 'other'];
        this.priorities = ['urgent', 'high', 'normal', 'low'];
        this.maxFreeTasks = 10;
        this.listeners = new Set();
        
        this.init();
    }

    // Initialize service
    async init() {
        try {
            await this.loadTasks();
            logger.info('TODO service initialized');
        } catch (error) {
            logger.error('Failed to initialize TODO service', { error: error.message });
        }
    }

    // Subscribe to changes
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    // Notify listeners
    notifyListeners(eventType, data) {
        this.listeners.forEach(listener => listener(eventType, data));
    }

    // Load tasks from storage
    async loadTasks() {
        try {
            // Load from local storage only
            const result = await chrome.storage.local.get('todos');
            this.tasks = result.todos || [];
            
            // If no tasks in local, try legacy backup
            if (this.tasks.length === 0) {
                const backup = await chrome.storage.local.get('todos_backup');
                if (backup.todos_backup && Array.isArray(backup.todos_backup)) {
                    this.tasks = backup.todos_backup;
                    logger.info('Loaded tasks from legacy backup', { count: this.tasks.length });
                    // Save to new location
                    await this.saveTasks();
                }
            }
            
            this.notifyListeners('tasksLoaded', this.tasks);
            logger.info('Tasks loaded successfully', { count: this.tasks.length });
            return this.tasks;
        } catch (error) {
            logger.error('Failed to load tasks', { error: error.message });
            this.tasks = [];
            return [];
        }
    }

    // Save tasks to storage
    async saveTasks() {
        try {
            // Save to local storage only (to avoid quota issues with sync storage)
            await chrome.storage.local.set({ todos: this.tasks });
            
            this.notifyListeners('tasksUpdated', this.tasks);
            logger.info('Tasks saved to local storage', { count: this.tasks.length });
            return true;
        } catch (error) {
            logger.error('Failed to save tasks', { error: error.message });
            return false;
        }
    }

    // Check free task limit
    async checkTaskLimit() {
        const settings = stateManager.getSettings();
        const isPremium = settings.subscriptionStatus === 'pro';
        
        if (isPremium) {
            return true;
        }

        const activeTasks = this.tasks.filter(task => !task.completed).length;
        return activeTasks < this.maxFreeTasks;
    }

    // Get all tasks
    getAllTasks() {
        return this.tasks;
    }

    // Get tasks by status
    getTasksByStatus(completed = null) {
        if (completed === null) {
            return this.tasks;
        }
        return this.tasks.filter(task => task.completed === completed);
    }

    // Get tasks by category
    getTasksByCategory(category) {
        return this.tasks.filter(task => task.category === category);
    }

    // Get tasks by priority
    getTasksByPriority(priority) {
        return this.tasks.filter(task => task.priority === priority);
    }

    // Get top 5 priority tasks (active only, sorted by priority)
    getTop5Tasks() {
        const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
        
        return this.tasks
            .filter(task => !task.completed) // Only active tasks
            .sort((a, b) => {
                // Sort by priority first
                const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
                if (priorityDiff !== 0) return priorityDiff;
                
                // Then by due date (earlier first)
                if (a.dueDate && b.dueDate) {
                    return new Date(a.dueDate) - new Date(b.dueDate);
                }
                if (a.dueDate && !b.dueDate) return -1;
                if (!a.dueDate && b.dueDate) return 1;
                
                // Finally by creation date (newer first)
                return (b.createdAt ? new Date(b.createdAt) : 0) - (a.createdAt ? new Date(a.createdAt) : 0);
            })
            .slice(0, 5); // Get top 5
    }

    // Get task by ID
    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }

    // Add new task
    async addTask(taskData) {
        try {
            const canAdd = await this.checkTaskLimit();
            
            if (!canAdd) {
                throw new TodoError(
                    `Free version limited to ${this.maxFreeTasks} active tasks`,
                    'TASK_LIMIT_EXCEEDED',
                    { maxTasks: this.maxFreeTasks }
                );
            }

            const task = {
                id: Date.now(),
                title: taskData.title.trim(),
                description: taskData.description || '',
                completed: false,
                priority: taskData.priority || 'normal',
                category: taskData.category || 'other',
                dueDate: taskData.dueDate || null,
                createdAt: new Date().toISOString(),
                completedAt: null,
                subtasks: taskData.subtasks || [],
                recurring: taskData.recurring || null,
                pomodoroSessions: 0,
                tags: taskData.tags || [],
                note: taskData.note || ''
            };

            this.tasks.push(task);
            await this.saveTasks();
            
            logger.info('Task added', { id: task.id, title: task.title });
            
            return task;
        } catch (error) {
            logger.error('Failed to add task', { error: error.message });
            throw error;
        }
    }

    // Update task
    async updateTask(id, updates) {
        try {
            const taskIndex = this.tasks.findIndex(task => task.id === id);
            
            if (taskIndex === -1) {
                throw new TodoError('Task not found', 'TASK_NOT_FOUND', { id });
            }

            this.tasks[taskIndex] = {
                ...this.tasks[taskIndex],
                ...updates
            };

            await this.saveTasks();
            
            logger.info('Task updated', { id });
            
            return this.tasks[taskIndex];
        } catch (error) {
            logger.error('Failed to update task', { error: error.message });
            throw error;
        }
    }

    // Complete task with motivational affirmation
    async completeTask(id, showAffirmation = true) {
        try {
            const task = await this.updateTask(id, {
                completed: true,
                completedAt: new Date().toISOString()
            });

            logger.info('Task completed', { id });

            if (showAffirmation) {
                this.notifyListeners('taskCompleted', { task, showAffirmation: true });
                
                // Show motivational affirmation when task is completed
                this.showCompletionAffirmation(task);
            }

            return task;
        } catch (error) {
            logger.error('Failed to complete task', { error: error.message });
            throw error;
        }
    }

    // Show motivational affirmation on task completion
    showCompletionAffirmation(task) {
        const taskCompletionAffirmations = [
            "You accomplished something great today!",
            "Every task you complete brings you closer to your goals.",
            "Your consistency is building your future success.",
            "Well done! You're making excellent progress.",
            "Success comes from completing tasks, one at a time.",
            "You're building momentum with each completed task.",
            "Celebrate this achievement! You deserve it.",
            "Your dedication is paying off beautifully.",
            "Another task mastered! You're unstoppable.",
            "Progress, no matter how small, is still progress."
        ];

        // Get random affirmation
        const randomAffirmation = taskCompletionAffirmations[
            Math.floor(Math.random() * taskCompletionAffirmations.length)
        ];

        // Trigger custom event to show affirmation
        document.dispatchEvent(new CustomEvent('showCompletionAffirmation', {
            detail: {
                message: randomAffirmation,
                task: task
            }
        }));
    }

    // Uncomplete task
    async uncompleteTask(id) {
        try {
            const task = await this.updateTask(id, {
                completed: false,
                completedAt: null
            });

            logger.info('Task uncompleted', { id });
            return task;
        } catch (error) {
            logger.error('Failed to uncomplete task', { error: error.message });
            throw error;
        }
    }

    // Delete task
    async deleteTask(id) {
        try {
            const taskIndex = this.tasks.findIndex(task => task.id === id);
            
            if (taskIndex === -1) {
                throw new TodoError('Task not found', 'TASK_NOT_FOUND', { id });
            }

            this.tasks.splice(taskIndex, 1);
            await this.saveTasks();
            
            logger.info('Task deleted', { id });
            
            return true;
        } catch (error) {
            logger.error('Failed to delete task', { error: error.message });
            throw error;
        }
    }

    // Add subtask
    async addSubtask(taskId, subtaskData) {
        try {
            const task = this.getTaskById(taskId);
            
            if (!task) {
                throw new TodoError('Task not found', 'TASK_NOT_FOUND', { id: taskId });
            }

            const subtask = {
                id: Date.now(),
                title: subtaskData.title.trim(),
                completed: false
            };

            task.subtasks.push(subtask);
            await this.saveTasks();
            
            logger.info('Subtask added', { taskId, subtaskId: subtask.id });
            
            return subtask;
        } catch (error) {
            logger.error('Failed to add subtask', { error: error.message });
            throw error;
        }
    }

    // Toggle subtask
    async toggleSubtask(taskId, subtaskId) {
        try {
            const task = this.getTaskById(taskId);
            
            if (!task) {
                throw new TodoError('Task not found', 'TASK_NOT_FOUND', { id: taskId });
            }

            const subtask = task.subtasks.find(st => st.id === subtaskId);
            
            if (!subtask) {
                throw new TodoError('Subtask not found', 'SUBTASK_NOT_FOUND', { id: subtaskId });
            }

            subtask.completed = !subtask.completed;
            await this.saveTasks();
            
            logger.info('Subtask toggled', { taskId, subtaskId });
            
            return subtask;
        } catch (error) {
            logger.error('Failed to toggle subtask', { error: error.message });
            throw error;
        }
    }

    // Delete subtask
    async deleteSubtask(taskId, subtaskId) {
        try {
            const task = this.getTaskById(taskId);
            
            if (!task) {
                throw new TodoError('Task not found', 'TASK_NOT_FOUND', { id: taskId });
            }

            task.subtasks = task.subtasks.filter(st => st.id !== subtaskId);
            await this.saveTasks();
            
            logger.info('Subtask deleted', { taskId, subtaskId });
            
            return true;
        } catch (error) {
            logger.error('Failed to delete subtask', { error: error.message });
            throw error;
        }
    }

    // Get statistics
    getStatistics() {
        const activeTasks = this.tasks.filter(t => !t.completed);
        const completedTasks = this.tasks.filter(t => t.completed);
        const tasksByPriority = {
            urgent: this.getTasksByPriority('urgent').filter(t => !t.completed).length,
            high: this.getTasksByPriority('high').filter(t => !t.completed).length,
            normal: this.getTasksByPriority('normal').filter(t => !t.completed).length,
            low: this.getTasksByPriority('low').filter(t => !t.completed).length
        };

        const tasksByCategory = this.categories.reduce((acc, category) => {
            acc[category] = this.getTasksByCategory(category).filter(t => !t.completed).length;
            return acc;
        }, {});

        const dueToday = this.tasks.filter(task => {
            if (!task.dueDate || task.completed) return false;
            const today = new Date().toISOString().split('T')[0];
            return task.dueDate === today;
        }).length;

        const overdue = this.tasks.filter(task => {
            if (!task.dueDate || task.completed) return false;
            return new Date(task.dueDate) < new Date();
        }).length;

        return {
            total: this.tasks.length,
            active: activeTasks.length,
            completed: completedTasks.length,
            completionRate: this.tasks.length > 0 
                ? Math.round((completedTasks.length / this.tasks.length) * 100) 
                : 0,
            tasksByPriority,
            tasksByCategory,
            dueToday,
            overdue
        };
    }

    // Search tasks
    searchTasks(query) {
        const lowerQuery = query.toLowerCase();
        return this.tasks.filter(task => 
            task.title.toLowerCase().includes(lowerQuery) ||
            task.description.toLowerCase().includes(lowerQuery) ||
            task.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }

    // Reorder tasks
    async reorderTasks(order) {
        try {
            const orderedTasks = order.map(id => this.tasks.find(task => task.id === id)).filter(Boolean);
            
            // Add any tasks not in the order array at the end
            const remainingTasks = this.tasks.filter(task => !order.includes(task.id));
            this.tasks = [...orderedTasks, ...remainingTasks];
            
            await this.saveTasks();
            
            logger.info('Tasks reordered', { count: orderedTasks.length });
            
            return true;
        } catch (error) {
            logger.error('Failed to reorder tasks', { error: error.message });
            throw error;
        }
    }

    // Clear completed tasks
    async clearCompleted() {
        try {
            this.tasks = this.tasks.filter(task => !task.completed);
            await this.saveTasks();
            
            logger.info('Completed tasks cleared');
            
            return true;
        } catch (error) {
            logger.error('Failed to clear completed tasks', { error: error.message });
            throw error;
        }
    }

    // Get tasks due soon (next 7 days)
    getTasksDueSoon() {
        const now = new Date();
        const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        return this.tasks.filter(task => {
            if (!task.dueDate || task.completed) return false;
            const dueDate = new Date(task.dueDate);
            return dueDate >= now && dueDate <= in7Days;
        });
    }

    // Get overdue tasks
    getOverdueTasks() {
        const now = new Date();
        
        return this.tasks.filter(task => {
            if (!task.dueDate || task.completed) return false;
            return new Date(task.dueDate) < now;
        });
    }

    // Get progress for a task
    getTaskProgress(taskId) {
        const task = this.getTaskById(taskId);
        if (!task || !task.subtasks || task.subtasks.length === 0) {
            return null;
        }

        const completed = task.subtasks.filter(st => st.completed).length;
        return {
            completed,
            total: task.subtasks.length,
            percentage: Math.round((completed / task.subtasks.length) * 100)
        };
    }

    // Export tasks
    exportTasks() {
        return {
            tasks: this.tasks,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };
    }

    // Import tasks
    async importTasks(data) {
        try {
            if (data.tasks && Array.isArray(data.tasks)) {
                this.tasks = data.tasks;
                await this.saveTasks();
                logger.info('Tasks imported', { count: data.tasks.length });
                return true;
            }
            throw new TodoError('Invalid import data', 'INVALID_IMPORT_DATA');
        } catch (error) {
            logger.error('Failed to import tasks', { error: error.message });
            throw error;
        }
    }
}

// Create and export singleton instance
const todoService = new TodoService();
export default todoService;
export { TodoError };

