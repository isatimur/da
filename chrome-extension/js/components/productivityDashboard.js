// Productivity Dashboard Component
import todoService from '../services/todoService.js';
import logger from '../utils/logger.js';
import i18n from '../utils/i18n.js';

class ProductivityDashboard {
    constructor() {
        this.modal = null;
        this.chartData = null;
        this.initialize();
    }

    initialize() {
        this.createModal();
        this.setupEventListeners();
        
        // Listen for open event
        document.addEventListener('openProductivityDashboard', () => {
            this.show();
        });
        
        logger.info('Productivity Dashboard initialized');
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.id = 'productivityDashboardModal';
        this.modal.className = 'productivity-dashboard-modal dialog-base hidden';
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-labelledby', 'productivity-dashboard-title');
        
        this.modal.innerHTML = `
            <div class="productivity-dashboard-content glass">
                <div class="dashboard-header">
                    <div class="header-content">
                        <i class="material-icons-round" aria-hidden="true">insights</i>
                        <h2 id="productivity-dashboard-title">Productivity Dashboard</h2>
                    </div>
                    <button class="close-button glass-button" aria-label="Close">
                        <i class="material-icons-round">close</i>
                    </button>
                </div>

                <div class="dashboard-body">
                    <!-- Summary Stats -->
                    <div class="stats-grid">
                        <div class="stat-card glass">
                            <div class="stat-icon">
                                <i class="material-icons-round">check_circle</i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-value" id="totalCompleted">0</span>
                                <span class="stat-label">Completed Tasks</span>
                            </div>
                        </div>
                        
                        <div class="stat-card glass">
                            <div class="stat-icon">
                                <i class="material-icons-round">pending</i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-value" id="totalActive">0</span>
                                <span class="stat-label">Active Tasks</span>
                            </div>
                        </div>
                        
                        <div class="stat-card glass">
                            <div class="stat-icon">
                                <i class="material-icons-round">trending_up</i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-value" id="completionRate">0%</span>
                                <span class="stat-label">Completion Rate</span>
                            </div>
                        </div>
                        
                        <div class="stat-card glass">
                            <div class="stat-icon">
                                <i class="material-icons-round">timer</i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-value" id="pomodoroSessions">0</span>
                                <span class="stat-label">Pomodoro Sessions</span>
                            </div>
                        </div>
                    </div>

                    <!-- Tasks by Priority -->
                    <div class="chart-section">
                        <h3>Tasks by Priority</h3>
                        <div class="priority-chart" id="priorityChart">
                            <!-- Priority bars will be rendered here -->
                        </div>
                    </div>

                    <!-- Tasks by Category -->
                    <div class="chart-section">
                        <h3>Tasks by Category</h3>
                        <div class="category-chart" id="categoryChart">
                            <!-- Category bars will be rendered here -->
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="activity-section">
                        <h3>Recent Activity</h3>
                        <div class="activity-list" id="activityList">
                            <!-- Activity items will be rendered here -->
                        </div>
                    </div>

                    <!-- Daily Completion Chart -->
                    <div class="chart-section">
                        <h3>Daily Completion (Last 7 Days)</h3>
                        <div class="completion-chart" id="completionChart">
                            <!-- Completion bars will be rendered here -->
                        </div>
                    </div>

                    <!-- Productivity Insights -->
                    <div class="insights-section">
                        <h3>Productivity Insights</h3>
                        <div class="insights-list" id="insightsList">
                            <!-- Insights will be rendered here -->
                        </div>
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
                }
            }
        });
    }

    async show() {
        this.modal.classList.remove('hidden');
        this.modal.setAttribute('aria-hidden', 'false');
        
        await this.renderDashboard();
    }

    hide() {
        this.modal.classList.add('hidden');
        this.modal.setAttribute('aria-hidden', 'true');
    }

    async renderDashboard() {
        const stats = todoService.getStatistics();
        
        // Update summary stats
        this.modal.querySelector('#totalCompleted').textContent = stats.completed;
        this.modal.querySelector('#totalActive').textContent = stats.active;
        this.modal.querySelector('#completionRate').textContent = `${stats.completionRate}%`;
        
        // Calculate Pomodoro sessions
        const allTasks = todoService.getAllTasks();
        const totalPomodoros = allTasks.reduce((sum, task) => sum + (task.pomodoroSessions || 0), 0);
        this.modal.querySelector('#pomodoroSessions').textContent = totalPomodoros;
        
        // Render priority chart
        this.renderPriorityChart(stats.tasksByPriority);
        
        // Render category chart
        this.renderCategoryChart(stats.tasksByCategory);
        
        // Render recent activity
        this.renderRecentActivity();
        
        // Render completion chart
        this.renderCompletionChart();
        
        // Render insights
        this.renderInsights(stats);
    }

    renderPriorityChart(tasksByPriority) {
        const chart = this.modal.querySelector('#priorityChart');
        const maxCount = Math.max(...Object.values(tasksByPriority), 1);
        
        chart.innerHTML = `
            <div class="priority-bar">
                <div class="priority-label">Urgent</div>
                <div class="priority-bar-container">
                    <div class="priority-bar-fill priority-urgent" style="width: ${(tasksByPriority.urgent / maxCount) * 100}%"></div>
                </div>
                <span class="priority-count">${tasksByPriority.urgent}</span>
            </div>
            <div class="priority-bar">
                <div class="priority-label">High</div>
                <div class="priority-bar-container">
                    <div class="priority-bar-fill priority-high" style="width: ${(tasksByPriority.high / maxCount) * 100}%"></div>
                </div>
                <span class="priority-count">${tasksByPriority.high}</span>
            </div>
            <div class="priority-bar">
                <div class="priority-label">Normal</div>
                <div class="priority-bar-container">
                    <div class="priority-bar-fill priority-normal" style="width: ${(tasksByPriority.normal / maxCount) * 100}%"></div>
                </div>
                <span class="priority-count">${tasksByPriority.normal}</span>
            </div>
            <div class="priority-bar">
                <div class="priority-label">Low</div>
                <div class="priority-bar-container">
                    <div class="priority-bar-fill priority-low" style="width: ${(tasksByPriority.low / maxCount) * 100}%"></div>
                </div>
                <span class="priority-count">${tasksByPriority.low}</span>
            </div>
        `;
    }

    renderCategoryChart(tasksByCategory) {
        const chart = this.modal.querySelector('#categoryChart');
        const maxCount = Math.max(...Object.values(tasksByCategory), 1);
        const categories = Object.entries(tasksByCategory).filter(([_, count]) => count > 0);
        
        if (categories.length === 0) {
            chart.innerHTML = '<p class="empty-state">No tasks categorized yet</p>';
            return;
        }
        
        chart.innerHTML = categories.map(([category, count]) => `
            <div class="category-bar">
                <div class="category-label">${this.capitalize(category)}</div>
                <div class="category-bar-container">
                    <div class="category-bar-fill" style="width: ${(count / maxCount) * 100}%"></div>
                </div>
                <span class="category-count">${count}</span>
            </div>
        `).join('');
    }

    renderRecentActivity() {
        const activityList = this.modal.querySelector('#activityList');
        const allTasks = todoService.getAllTasks();
        
        // Get recently completed tasks (last 5)
        const recentCompleted = allTasks
            .filter(task => task.completed && task.completedAt)
            .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
            .slice(0, 5);
        
        if (recentCompleted.length === 0) {
            activityList.innerHTML = '<p class="empty-state">No recent activity</p>';
            return;
        }
        
        activityList.innerHTML = recentCompleted.map(task => `
            <div class="activity-item glass">
                <i class="material-icons-round">check_circle</i>
                <div class="activity-content">
                    <div class="activity-title">${this.escapeHtml(task.title)}</div>
                    <div class="activity-time">${this.timeAgo(task.completedAt)}</div>
                </div>
            </div>
        `).join('');
    }

    renderCompletionChart() {
        const chart = this.modal.querySelector('#completionChart');
        const allTasks = todoService.getAllTasks();
        const completedTasks = allTasks.filter(task => task.completed && task.completedAt);
        
        // Group by date (last 7 days)
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            const tasksOnDate = completedTasks.filter(task => {
                const completedDate = new Date(task.completedAt).toISOString().split('T')[0];
                return completedDate === dateStr;
            });
            
            last7Days.push({
                date: dateStr,
                count: tasksOnDate.length,
                label: date.toLocaleDateString('en-US', { weekday: 'short' })
            });
        }
        
        const maxCount = Math.max(...last7Days.map(d => d.count), 1);
        
        chart.innerHTML = last7Days.map(day => `
            <div class="completion-day">
                <div class="completion-bar-container">
                    <div class="completion-bar-fill" style="height: ${(day.count / maxCount) * 100}%"></div>
                </div>
                <div class="completion-label">${day.label}</div>
                <div class="completion-count">${day.count}</div>
            </div>
        `).join('');
    }

    renderInsights(stats) {
        const insightsList = this.modal.querySelector('#insightsList');
        const insights = [];
        
        if (stats.completionRate >= 80) {
            insights.push({
                icon: 'trending_up',
                type: 'success',
                message: 'Excellent productivity! You\'re completing tasks at a high rate.'
            });
        } else if (stats.completionRate >= 50) {
            insights.push({
                icon: 'thumb_up',
                type: 'info',
                message: 'Good progress! Keep up the momentum.'
            });
        } else if (stats.completionRate > 0) {
            insights.push({
                icon: 'lightbulb',
                type: 'warning',
                message: 'Try to increase your completion rate by focusing on one task at a time.'
            });
        }
        
        if (stats.overdue > 0) {
            insights.push({
                icon: 'error',
                type: 'error',
                message: `You have ${stats.overdue} overdue task${stats.overdue > 1 ? 's' : ''}. Consider adjusting deadlines.`
            });
        }
        
        if (stats.active === 0 && stats.completed > 0) {
            insights.push({
                icon: 'celebration',
                type: 'success',
                message: 'All done! Great job completing all your tasks. Keep up the excellent work!'
            });
        }
        
        if (stats.active > 10) {
            insights.push({
                icon: 'info',
                type: 'info',
                message: 'You have many active tasks. Consider breaking them down into smaller subtasks.'
            });
        }
        
        // Add more specific insights based on category distribution
        const categories = Object.entries(stats.tasksByCategory).filter(([_, count]) => count > 0);
        if (categories.length > 0) {
            const topCategory = categories.sort((a, b) => b[1] - a[1])[0];
            if (topCategory[1] > 5) {
                insights.push({
                    icon: 'category',
                    type: 'info',
                    message: `Most of your tasks are in "${this.capitalize(topCategory[0])}" category. Consider diversifying your focus.`
                });
            }
        }
        
        if (insights.length === 0) {
            insightsList.innerHTML = '<p class="empty-state">No insights available yet. Complete some tasks to see personalized insights!</p>';
            return;
        }
        
        insightsList.innerHTML = insights.map(insight => `
            <div class="insight-item glass ${insight.type}">
                <i class="material-icons-round">${insight.icon}</i>
                <p>${this.escapeHtml(insight.message)}</p>
            </div>
        `).join('');
    }

    timeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        if (seconds < 60) return 'just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
        const weeks = Math.floor(days / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Create and export singleton instance
const productivityDashboard = new ProductivityDashboard();
export default productivityDashboard;

