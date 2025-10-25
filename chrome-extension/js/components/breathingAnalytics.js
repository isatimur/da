/**
 * Breathing Analytics Dashboard Component
 * Displays session history, statistics, and progress tracking
 */

import sessionManager from '../services/sessionManager.js';
import breathingPatternsManager from '../utils/breathingPatterns.js';
import logger from '../utils/logger.js';

class BreathingAnalytics {
    constructor(container) {
        this.container = container;
        this.currentView = 'overview'; // overview, weekly, monthly, patterns
        this.isVisible = false;
        
        this.init();
    }

    /**
     * Initialize the analytics dashboard
     */
    init() {
        try {
            this.createDashboard();
            this.setupEventListeners();
            logger.debug('Breathing analytics initialized');
        } catch (error) {
            logger.error('Failed to initialize breathing analytics', { error: error.message });
        }
    }

    /**
     * Create the analytics dashboard DOM structure
     */
    createDashboard() {
        // Create main dashboard container
        const dashboard = document.createElement('div');
        dashboard.className = 'breathing-analytics';
        dashboard.id = 'breathing-analytics';
        
        // Create header
        this.createHeader(dashboard);
        
        // Create navigation tabs
        this.createNavigation(dashboard);
        
        // Create content areas
        this.createContentAreas(dashboard);
        
        // Add to container
        this.container.appendChild(dashboard);
    }

    /**
     * Create dashboard header
     * @param {HTMLElement} container - Container element
     */
    createHeader(container) {
        const header = document.createElement('div');
        header.className = 'breathing-analytics-header';
        
        const title = document.createElement('h3');
        title.textContent = 'Breathing Analytics';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'breathing-analytics-close';
        closeBtn.setAttribute('aria-label', 'Close analytics');
        closeBtn.innerHTML = '<i class="material-icons-round" aria-hidden="true">close</i>';
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        container.appendChild(header);
    }

    /**
     * Create navigation tabs
     * @param {HTMLElement} container - Container element
     */
    createNavigation(container) {
        const nav = document.createElement('div');
        nav.className = 'breathing-analytics-nav';
        
        const tabs = [
            { id: 'overview', label: 'Overview', icon: 'dashboard' },
            { id: 'weekly', label: 'Weekly', icon: 'calendar_view_week' },
            { id: 'monthly', label: 'Monthly', icon: 'calendar_view_month' },
            { id: 'patterns', label: 'Patterns', icon: 'timeline' }
        ];
        
        tabs.forEach(tab => {
            const tabBtn = document.createElement('button');
            tabBtn.className = 'breathing-analytics-tab';
            tabBtn.dataset.view = tab.id;
            tabBtn.innerHTML = `
                <i class="material-icons-round" aria-hidden="true">${tab.icon}</i>
                <span>${tab.label}</span>
            `;
            
            if (tab.id === this.currentView) {
                tabBtn.classList.add('active');
            }
            
            nav.appendChild(tabBtn);
        });
        
        container.appendChild(nav);
    }

    /**
     * Create content areas
     * @param {HTMLElement} container - Container element
     */
    createContentAreas(container) {
        const content = document.createElement('div');
        content.className = 'breathing-analytics-content';
        
        // Overview tab content
        this.createOverviewContent(content);
        
        // Weekly tab content
        this.createWeeklyContent(content);
        
        // Monthly tab content
        this.createMonthlyContent(content);
        
        // Patterns tab content
        this.createPatternsContent(content);
        
        container.appendChild(content);
    }

    /**
     * Create overview content
     * @param {HTMLElement} container - Container element
     */
    createOverviewContent(container) {
        const overview = document.createElement('div');
        overview.className = 'breathing-analytics-tab-content';
        overview.id = 'analytics-overview';
        
        // Stats grid
        const statsGrid = document.createElement('div');
        statsGrid.className = 'breathing-stats-grid';
        statsGrid.id = 'breathing-stats-grid';
        
        // Streak section
        const streakSection = document.createElement('div');
        streakSection.className = 'breathing-streak-section';
        streakSection.innerHTML = `
            <h4>Current Streak</h4>
            <div class="streak-display" id="streak-display">
                <div class="streak-number">0</div>
                <div class="streak-label">days</div>
            </div>
        `;
        
        // Recent sessions
        const recentSessions = document.createElement('div');
        recentSessions.className = 'breathing-recent-sessions';
        recentSessions.innerHTML = `
            <h4>Recent Sessions</h4>
            <div class="sessions-list" id="recent-sessions-list"></div>
        `;
        
        overview.appendChild(statsGrid);
        overview.appendChild(streakSection);
        overview.appendChild(recentSessions);
        container.appendChild(overview);
    }

    /**
     * Create weekly content
     * @param {HTMLElement} container - Container element
     */
    createWeeklyContent(container) {
        const weekly = document.createElement('div');
        weekly.className = 'breathing-analytics-tab-content';
        weekly.id = 'analytics-weekly';
        weekly.style.display = 'none';
        
        const chart = document.createElement('div');
        chart.className = 'breathing-weekly-chart';
        chart.id = 'breathing-weekly-chart';
        
        const summary = document.createElement('div');
        summary.className = 'breathing-weekly-summary';
        summary.id = 'breathing-weekly-summary';
        
        weekly.appendChild(chart);
        weekly.appendChild(summary);
        container.appendChild(weekly);
    }

    /**
     * Create monthly content
     * @param {HTMLElement} container - Container element
     */
    createMonthlyContent(container) {
        const monthly = document.createElement('div');
        monthly.className = 'breathing-analytics-tab-content';
        monthly.id = 'analytics-monthly';
        monthly.style.display = 'none';
        
        const chart = document.createElement('div');
        chart.className = 'breathing-monthly-chart';
        chart.id = 'breathing-monthly-chart';
        
        const summary = document.createElement('div');
        summary.className = 'breathing-monthly-summary';
        summary.id = 'breathing-monthly-summary';
        
        monthly.appendChild(chart);
        monthly.appendChild(summary);
        container.appendChild(monthly);
    }

    /**
     * Create patterns content
     * @param {HTMLElement} container - Container element
     */
    createPatternsContent(container) {
        const patterns = document.createElement('div');
        patterns.className = 'breathing-analytics-tab-content';
        patterns.id = 'analytics-patterns';
        patterns.style.display = 'none';
        
        const usageChart = document.createElement('div');
        usageChart.className = 'breathing-patterns-usage';
        usageChart.id = 'breathing-patterns-usage';
        
        const patternsList = document.createElement('div');
        patternsList.className = 'breathing-patterns-list';
        patternsList.id = 'breathing-patterns-list';
        
        patterns.appendChild(usageChart);
        patterns.appendChild(patternsList);
        container.appendChild(patterns);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Close button
        const closeBtn = this.container.querySelector('.breathing-analytics-close');
        closeBtn.addEventListener('click', this.hide.bind(this));
        
        // Tab navigation
        const tabs = this.container.querySelectorAll('.breathing-analytics-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchView(e.target.dataset.view);
            });
        });
        
        // Backdrop click
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.hide();
            }
        });
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
    }

    /**
     * Show the analytics dashboard
     */
    show() {
        if (this.isVisible) return;
        
        this.isVisible = true;
        this.container.classList.add('show');
        
        // Load data and update display
        this.loadData();
        
        logger.debug('Breathing analytics shown');
    }

    /**
     * Hide the analytics dashboard
     */
    hide() {
        if (!this.isVisible) return;
        
        this.isVisible = false;
        this.container.classList.remove('show');
        
        logger.debug('Breathing analytics hidden');
    }

    /**
     * Switch to a different view
     * @param {string} view - View ID
     */
    switchView(view) {
        if (view === this.currentView) return;
        
        // Update tab states
        const tabs = this.container.querySelectorAll('.breathing-analytics-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.view === view);
        });
        
        // Hide all content
        const contents = this.container.querySelectorAll('.breathing-analytics-tab-content');
        contents.forEach(content => {
            content.style.display = 'none';
        });
        
        // Show selected content
        const selectedContent = this.container.querySelector(`#analytics-${view}`);
        if (selectedContent) {
            selectedContent.style.display = 'block';
        }
        
        this.currentView = view;
        
        // Load view-specific data
        this.loadViewData(view);
        
        logger.debug('Analytics view switched', { view: view });
    }

    /**
     * Load all analytics data
     */
    async loadData() {
        try {
            const [statistics, streakData, sessionHistory] = await Promise.all([
                sessionManager.getStatistics(),
                sessionManager.getStreakData(),
                sessionManager.getSessionHistory({ limit: 10 })
            ]);
            
            this.updateOverviewStats(statistics, streakData, sessionHistory);
            
        } catch (error) {
            logger.error('Failed to load analytics data', { error: error.message });
        }
    }

    /**
     * Load view-specific data
     * @param {string} view - View ID
     */
    async loadViewData(view) {
        try {
            switch (view) {
                case 'weekly':
                    await this.loadWeeklyData();
                    break;
                case 'monthly':
                    await this.loadMonthlyData();
                    break;
                case 'patterns':
                    await this.loadPatternsData();
                    break;
            }
        } catch (error) {
            logger.error('Failed to load view data', { view: view, error: error.message });
        }
    }

    /**
     * Update overview statistics
     * @param {Object} statistics - Statistics data
     * @param {Object} streakData - Streak data
     * @param {Array} sessionHistory - Recent sessions
     */
    updateOverviewStats(statistics, streakData, sessionHistory) {
        // Update stats grid
        const statsGrid = this.container.querySelector('#breathing-stats-grid');
        if (statsGrid) {
            statsGrid.innerHTML = `
                <div class="stat-card">
                    <div class="stat-value">${statistics.totalSessions}</div>
                    <div class="stat-label">Total Sessions</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${Math.round(statistics.totalMinutes)}</div>
                    <div class="stat-label">Minutes Breathed</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${statistics.totalCycles}</div>
                    <div class="stat-label">Total Cycles</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${Math.round(statistics.completionRate * 100)}%</div>
                    <div class="stat-label">Completion Rate</div>
                </div>
            `;
        }
        
        // Update streak display
        const streakDisplay = this.container.querySelector('#streak-display .streak-number');
        if (streakDisplay) {
            streakDisplay.textContent = streakData.current;
        }
        
        // Update recent sessions
        this.updateRecentSessions(sessionHistory);
    }

    /**
     * Update recent sessions list
     * @param {Array} sessions - Recent sessions
     */
    updateRecentSessions(sessions) {
        const sessionsList = this.container.querySelector('#recent-sessions-list');
        if (!sessionsList) return;
        
        if (sessions.length === 0) {
            sessionsList.innerHTML = '<p class="no-sessions">No sessions yet. Start your first breathing exercise!</p>';
            return;
        }
        
        sessionsList.innerHTML = sessions.map(session => `
            <div class="session-item">
                <div class="session-pattern">${session.pattern}</div>
                <div class="session-details">
                    <span class="session-duration">${Math.round(session.actualDuration / (1000 * 60))} min</span>
                    <span class="session-cycles">${session.cycleCount} cycles</span>
                    <span class="session-date">${new Date(session.date).toLocaleDateString()}</span>
                </div>
                <div class="session-status ${session.completed ? 'completed' : 'incomplete'}">
                    ${session.completed ? '✓' : '○'}
                </div>
            </div>
        `).join('');
    }

    /**
     * Load weekly data
     */
    async loadWeeklyData() {
        const weeklyProgress = sessionManager.getWeeklyProgress();
        this.updateWeeklyChart(weeklyProgress);
    }

    /**
     * Update weekly chart
     * @param {Array} weeklyData - Weekly progress data
     */
    updateWeeklyChart(weeklyData) {
        const chart = this.container.querySelector('#breathing-weekly-chart');
        if (!chart) return;
        
        const maxSessions = Math.max(...weeklyData.map(day => day.sessions), 1);
        
        chart.innerHTML = `
            <div class="chart-header">
                <h4>This Week's Activity</h4>
            </div>
            <div class="chart-bars">
                ${weeklyData.map(day => `
                    <div class="chart-bar-container">
                        <div class="chart-bar" style="height: ${(day.sessions / maxSessions) * 100}%"></div>
                        <div class="chart-label">${day.day}</div>
                        <div class="chart-value">${day.sessions}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Update weekly summary
        const summary = this.container.querySelector('#breathing-weekly-summary');
        if (summary) {
            const totalSessions = weeklyData.reduce((sum, day) => sum + day.sessions, 0);
            const totalMinutes = weeklyData.reduce((sum, day) => sum + day.minutes, 0);
            
            summary.innerHTML = `
                <div class="summary-stat">
                    <div class="summary-value">${totalSessions}</div>
                    <div class="summary-label">Sessions This Week</div>
                </div>
                <div class="summary-stat">
                    <div class="summary-value">${Math.round(totalMinutes)}</div>
                    <div class="summary-label">Minutes This Week</div>
                </div>
            `;
        }
    }

    /**
     * Load monthly data
     */
    async loadMonthlyData() {
        const monthlyProgress = sessionManager.getMonthlyProgress();
        this.updateMonthlyChart(monthlyProgress);
    }

    /**
     * Update monthly chart
     * @param {Array} monthlyData - Monthly progress data
     */
    updateMonthlyChart(monthlyData) {
        const chart = this.container.querySelector('#breathing-monthly-chart');
        if (!chart) return;
        
        const maxSessions = Math.max(...monthlyData.map(week => week.sessions), 1);
        
        chart.innerHTML = `
            <div class="chart-header">
                <h4>This Month's Activity</h4>
            </div>
            <div class="chart-bars">
                ${monthlyData.map(week => `
                    <div class="chart-bar-container">
                        <div class="chart-bar" style="height: ${(week.sessions / maxSessions) * 100}%"></div>
                        <div class="chart-label">${week.week}</div>
                        <div class="chart-value">${week.sessions}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Update monthly summary
        const summary = this.container.querySelector('#breathing-monthly-summary');
        if (summary) {
            const totalSessions = monthlyData.reduce((sum, week) => sum + week.sessions, 0);
            const totalMinutes = monthlyData.reduce((sum, week) => sum + week.minutes, 0);
            
            summary.innerHTML = `
                <div class="summary-stat">
                    <div class="summary-value">${totalSessions}</div>
                    <div class="summary-label">Sessions This Month</div>
                </div>
                <div class="summary-stat">
                    <div class="summary-value">${Math.round(totalMinutes)}</div>
                    <div class="summary-label">Minutes This Month</div>
                </div>
            `;
        }
    }

    /**
     * Load patterns data
     */
    async loadPatternsData() {
        const patternUsage = sessionManager.getPatternUsage();
        this.updatePatternsChart(patternUsage);
    }

    /**
     * Update patterns chart
     * @param {Object} patternUsage - Pattern usage data
     */
    updatePatternsChart(patternUsage) {
        const usageChart = this.container.querySelector('#breathing-patterns-usage');
        const patternsList = this.container.querySelector('#breathing-patterns-list');
        
        if (!usageChart || !patternsList) return;
        
        const patterns = Object.entries(patternUsage).sort((a, b) => b[1].count - a[1].count);
        const maxCount = Math.max(...patterns.map(([, data]) => data.count), 1);
        
        // Update usage chart
        usageChart.innerHTML = `
            <div class="chart-header">
                <h4>Pattern Usage</h4>
            </div>
            <div class="chart-bars">
                ${patterns.map(([pattern, data]) => `
                    <div class="chart-bar-container">
                        <div class="chart-bar" style="height: ${(data.count / maxCount) * 100}%"></div>
                        <div class="chart-label">${pattern}</div>
                        <div class="chart-value">${data.count}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Update patterns list
        patternsList.innerHTML = `
            <div class="patterns-header">
                <h4>Pattern Statistics</h4>
            </div>
            <div class="patterns-list">
                ${patterns.map(([pattern, data]) => `
                    <div class="pattern-item">
                        <div class="pattern-name">${pattern}</div>
                        <div class="pattern-stats">
                            <div class="pattern-stat">
                                <span class="stat-label">Sessions:</span>
                                <span class="stat-value">${data.count}</span>
                            </div>
                            <div class="pattern-stat">
                                <span class="stat-label">Avg Duration:</span>
                                <span class="stat-value">${Math.round(data.averageMinutes)} min</span>
                            </div>
                            <div class="pattern-stat">
                                <span class="stat-label">Completion:</span>
                                <span class="stat-value">${Math.round(data.completionRate * 100)}%</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Get current analytics state
     * @returns {Object} Current state
     */
    getState() {
        return {
            isVisible: this.isVisible,
            currentView: this.currentView
        };
    }

    /**
     * Cleanup and destroy the component
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        
        this.isVisible = false;
        this.currentView = 'overview';
        
        logger.debug('Breathing analytics destroyed');
    }
}

export default BreathingAnalytics;
