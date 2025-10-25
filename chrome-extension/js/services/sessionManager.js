/**
 * Session Manager
 * Handles session history, streaks, and statistics
 */

import logger from '../utils/logger.js';

class SessionManager {
    constructor() {
        this.sessionHistory = [];
        this.streakData = {
            current: 0,
            longest: 0,
            lastSessionDate: null
        };
        this.statistics = {
            totalSessions: 0,
            totalMinutes: 0,
            totalCycles: 0,
            averageSessionDuration: 0,
            completionRate: 0,
            favoritePattern: null,
            sessionsThisWeek: 0,
            sessionsThisMonth: 0
        };
        
        this.loadData();
    }

    /**
     * Save a completed session
     * @param {Object} sessionData - Session data from breathing service
     */
    async saveSession(sessionData) {
        try {
            const session = {
                id: this.generateSessionId(),
                date: new Date().toISOString(),
                pattern: sessionData.pattern.name,
                patternId: this.getPatternId(sessionData.pattern),
                duration: sessionData.duration,
                actualDuration: sessionData.actualDuration,
                cycleCount: sessionData.cycleCount,
                completed: sessionData.completed,
                startTime: sessionData.startTime,
                endTime: sessionData.endTime
            };

            this.sessionHistory.unshift(session); // Add to beginning
            
            // Keep only last 100 sessions to manage storage size
            if (this.sessionHistory.length > 100) {
                this.sessionHistory = this.sessionHistory.slice(0, 100);
            }

            this.updateStreak(session);
            this.updateStatistics();
            
            await this.saveData();
            
            logger.info('Session saved', {
                sessionId: session.id,
                pattern: session.pattern,
                duration: session.duration,
                completed: session.completed
            });
            
            return session;
            
        } catch (error) {
            logger.error('Failed to save session', { error: error.message });
            throw error;
        }
    }

    /**
     * Get session history
     * @param {Object} options - Filter options
     * @returns {Array} Session history
     */
    getSessionHistory(options = {}) {
        let history = [...this.sessionHistory];
        
        const { 
            limit = 50, 
            pattern = null, 
            startDate = null, 
            endDate = null,
            completed = null 
        } = options;
        
        // Filter by pattern
        if (pattern) {
            history = history.filter(session => session.pattern === pattern);
        }
        
        // Filter by date range
        if (startDate) {
            history = history.filter(session => new Date(session.date) >= new Date(startDate));
        }
        if (endDate) {
            history = history.filter(session => new Date(session.date) <= new Date(endDate));
        }
        
        // Filter by completion status
        if (completed !== null) {
            history = history.filter(session => session.completed === completed);
        }
        
        return history.slice(0, limit);
    }

    /**
     * Get streak information
     * @returns {Object} Streak data
     */
    getStreakData() {
        return { ...this.streakData };
    }

    /**
     * Get session statistics
     * @returns {Object} Statistics data
     */
    getStatistics() {
        return { ...this.statistics };
    }

    /**
     * Get weekly progress
     * @returns {Array} Array of daily session counts for current week
     */
    getWeeklyProgress() {
        const week = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            const sessions = this.sessionHistory.filter(session => {
                const sessionDate = new Date(session.date);
                return sessionDate.toDateString() === date.toDateString();
            });
            
            week.push({
                date: date.toISOString().split('T')[0],
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                sessions: sessions.length,
                minutes: sessions.reduce((sum, s) => sum + s.actualDuration / (1000 * 60), 0)
            });
        }
        
        return week;
    }

    /**
     * Get monthly progress
     * @returns {Array} Array of weekly session counts for current month
     */
    getMonthlyProgress() {
        const month = [];
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        
        // Get all weeks in current month
        let currentWeek = new Date(firstDay);
        while (currentWeek.getMonth() === today.getMonth()) {
            const weekStart = new Date(currentWeek);
            const weekEnd = new Date(currentWeek);
            weekEnd.setDate(weekEnd.getDate() + 6);
            
            const sessions = this.sessionHistory.filter(session => {
                const sessionDate = new Date(session.date);
                return sessionDate >= weekStart && sessionDate <= weekEnd;
            });
            
            month.push({
                week: `Week ${Math.ceil(currentWeek.getDate() / 7)}`,
                sessions: sessions.length,
                minutes: sessions.reduce((sum, s) => sum + s.actualDuration / (1000 * 60), 0)
            });
            
            currentWeek.setDate(currentWeek.getDate() + 7);
        }
        
        return month;
    }

    /**
     * Get pattern usage statistics
     * @returns {Object} Pattern usage data
     */
    getPatternUsage() {
        const usage = {};
        
        this.sessionHistory.forEach(session => {
            if (!usage[session.pattern]) {
                usage[session.pattern] = {
                    count: 0,
                    totalMinutes: 0,
                    totalCycles: 0,
                    completionRate: 0,
                    completedSessions: 0
                };
            }
            
            usage[session.pattern].count++;
            usage[session.pattern].totalMinutes += session.actualDuration / (1000 * 60);
            usage[session.pattern].totalCycles += session.cycleCount;
            
            if (session.completed) {
                usage[session.pattern].completedSessions++;
            }
        });
        
        // Calculate completion rates
        Object.keys(usage).forEach(pattern => {
            const data = usage[pattern];
            data.completionRate = data.completedSessions / data.count;
            data.averageMinutes = data.totalMinutes / data.count;
            data.averageCycles = data.totalCycles / data.count;
        });
        
        return usage;
    }

    /**
     * Export session data
     * @param {string} format - Export format ('json' or 'csv')
     * @returns {string} Exported data
     */
    exportData(format = 'json') {
        if (format === 'json') {
            return JSON.stringify({
                sessionHistory: this.sessionHistory,
                streakData: this.streakData,
                statistics: this.statistics,
                exportDate: new Date().toISOString()
            }, null, 2);
        } else if (format === 'csv') {
            const headers = ['Date', 'Pattern', 'Duration (min)', 'Actual Duration (min)', 'Cycles', 'Completed'];
            const rows = this.sessionHistory.map(session => [
                session.date.split('T')[0],
                session.pattern,
                session.duration,
                (session.actualDuration / (1000 * 60)).toFixed(2),
                session.cycleCount,
                session.completed ? 'Yes' : 'No'
            ]);
            
            return [headers, ...rows].map(row => row.join(',')).join('\n');
        }
        
        throw new Error('Invalid export format');
    }

    /**
     * Clear all session data
     */
    async clearAllData() {
        this.sessionHistory = [];
        this.streakData = {
            current: 0,
            longest: 0,
            lastSessionDate: null
        };
        this.statistics = {
            totalSessions: 0,
            totalMinutes: 0,
            totalCycles: 0,
            averageSessionDuration: 0,
            completionRate: 0,
            favoritePattern: null,
            sessionsThisWeek: 0,
            sessionsThisMonth: 0
        };
        
        await this.saveData();
        logger.info('All session data cleared');
    }

    /**
     * Update streak data
     * @param {Object} session - Session data
     */
    updateStreak(session) {
        const sessionDate = new Date(session.date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Check if this is the first session or if we're continuing a streak
        if (!this.streakData.lastSessionDate) {
            this.streakData.current = 1;
            this.streakData.longest = 1;
        } else {
            const lastSessionDate = new Date(this.streakData.lastSessionDate);
            
            // Check if session is today or yesterday (continuing streak)
            if (sessionDate.toDateString() === today.toDateString() || 
                sessionDate.toDateString() === yesterday.toDateString()) {
                this.streakData.current++;
            } else {
                // Streak broken, reset
                this.streakData.current = 1;
            }
            
            // Update longest streak
            this.streakData.longest = Math.max(this.streakData.longest, this.streakData.current);
        }
        
        this.streakData.lastSessionDate = session.date;
    }

    /**
     * Update statistics
     */
    updateStatistics() {
        const totalSessions = this.sessionHistory.length;
        const completedSessions = this.sessionHistory.filter(s => s.completed).length;
        
        this.statistics.totalSessions = totalSessions;
        this.statistics.totalMinutes = this.sessionHistory.reduce((sum, s) => sum + s.actualDuration / (1000 * 60), 0);
        this.statistics.totalCycles = this.sessionHistory.reduce((sum, s) => sum + s.cycleCount, 0);
        this.statistics.averageSessionDuration = totalSessions > 0 ? this.statistics.totalMinutes / totalSessions : 0;
        this.statistics.completionRate = totalSessions > 0 ? completedSessions / totalSessions : 0;
        
        // Find favorite pattern
        const patternUsage = this.getPatternUsage();
        this.statistics.favoritePattern = Object.keys(patternUsage).reduce((a, b) => 
            patternUsage[a].count > patternUsage[b].count ? a : b, null);
        
        // Calculate sessions this week/month
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        
        this.statistics.sessionsThisWeek = this.sessionHistory.filter(s => 
            new Date(s.date) >= weekAgo).length;
        this.statistics.sessionsThisMonth = this.sessionHistory.filter(s => 
            new Date(s.date) >= monthAgo).length;
    }

    /**
     * Generate unique session ID
     * @returns {string}
     */
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get pattern ID from pattern object
     * @param {Object} pattern - Pattern object
     * @returns {string}
     */
    getPatternId(pattern) {
        // This is a simplified approach - in a real implementation,
        // you'd want to store the actual pattern ID
        return pattern.name.toLowerCase().replace(/\s+/g, '_');
    }

    /**
     * Load data from storage
     */
    async loadData() {
        try {
            const result = await chrome.storage.sync.get([
                'breathingSessionHistory',
                'breathingStreakData',
                'breathingStatistics'
            ]);
            
            if (result.breathingSessionHistory) {
                this.sessionHistory = result.breathingSessionHistory;
            }
            
            if (result.breathingStreakData) {
                this.streakData = result.breathingStreakData;
            }
            
            if (result.breathingStatistics) {
                this.statistics = result.breathingStatistics;
            }
            
            logger.debug('Session data loaded', {
                sessions: this.sessionHistory.length,
                streak: this.streakData.current
            });
            
        } catch (error) {
            logger.error('Failed to load session data', { error: error.message });
            // Fallback to local storage if sync fails
            await this.loadFromLocalStorage();
        }
    }

    /**
     * Save data to storage
     */
    async saveData() {
        try {
            await chrome.storage.sync.set({
                breathingSessionHistory: this.sessionHistory,
                breathingStreakData: this.streakData,
                breathingStatistics: this.statistics
            });
            
            logger.debug('Session data saved to sync storage');
            
        } catch (error) {
            logger.error('Failed to save session data to sync storage', { error: error.message });
            // Fallback to local storage
            await this.saveToLocalStorage();
        }
    }

    /**
     * Load data from local storage (fallback)
     */
    async loadFromLocalStorage() {
        try {
            const result = await chrome.storage.local.get([
                'breathingSessionHistory',
                'breathingStreakData',
                'breathingStatistics'
            ]);
            
            if (result.breathingSessionHistory) {
                this.sessionHistory = result.breathingSessionHistory;
            }
            
            if (result.breathingStreakData) {
                this.streakData = result.breathingStreakData;
            }
            
            if (result.breathingStatistics) {
                this.statistics = result.breathingStatistics;
            }
            
            logger.debug('Session data loaded from local storage');
            
        } catch (error) {
            logger.error('Failed to load session data from local storage', { error: error.message });
        }
    }

    /**
     * Save data to local storage (fallback)
     */
    async saveToLocalStorage() {
        try {
            await chrome.storage.local.set({
                breathingSessionHistory: this.sessionHistory,
                breathingStreakData: this.streakData,
                breathingStatistics: this.statistics
            });
            
            logger.debug('Session data saved to local storage');
            
        } catch (error) {
            logger.error('Failed to save session data to local storage', { error: error.message });
        }
    }
}

// Create global instance
const sessionManager = new SessionManager();

export default sessionManager;
