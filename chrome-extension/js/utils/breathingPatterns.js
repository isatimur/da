/**
 * Breathing Patterns Utility
 * Defines preset breathing patterns and supports custom user patterns
 */

class BreathingPattern {
    constructor(name, phases, description, difficulty = 'beginner', benefits = []) {
        this.name = name;
        this.phases = phases; // Array of {type: 'inhale'|'hold'|'exhale', duration: number}
        this.description = description;
        this.difficulty = difficulty;
        this.benefits = benefits;
        this.totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);
    }

    validate() {
        if (!this.name || typeof this.name !== 'string') {
            throw new Error('Pattern name is required');
        }
        if (!Array.isArray(this.phases) || this.phases.length === 0) {
            throw new Error('Pattern must have at least one phase');
        }
        for (const phase of this.phases) {
            if (!['inhale', 'hold', 'exhale'].includes(phase.type)) {
                throw new Error(`Invalid phase type: ${phase.type}`);
            }
            if (typeof phase.duration !== 'number' || phase.duration <= 0) {
                throw new Error(`Invalid phase duration: ${phase.duration}`);
            }
        }
        return true;
    }

    toJSON() {
        return {
            name: this.name,
            phases: this.phases,
            description: this.description,
            difficulty: this.difficulty,
            benefits: this.benefits,
            totalDuration: this.totalDuration
        };
    }

    static fromJSON(data) {
        const pattern = new BreathingPattern(
            data.name,
            data.phases,
            data.description,
            data.difficulty,
            data.benefits
        );
        pattern.validate();
        return pattern;
    }
}

// Preset breathing patterns
const PRESET_PATTERNS = {
    box: new BreathingPattern(
        'Box Breathing',
        [
            { type: 'inhale', duration: 4 },
            { type: 'hold', duration: 4 },
            { type: 'exhale', duration: 4 },
            { type: 'hold', duration: 4 }
        ],
        'A balanced breathing technique used by Navy SEALs for stress management and focus.',
        'beginner',
        ['Reduces stress', 'Improves focus', 'Balances nervous system']
    ),

    '4-7-8': new BreathingPattern(
        '4-7-8 Breathing',
        [
            { type: 'inhale', duration: 4 },
            { type: 'hold', duration: 7 },
            { type: 'exhale', duration: 8 }
        ],
        'A calming technique that helps reduce anxiety and promote relaxation.',
        'intermediate',
        ['Reduces anxiety', 'Promotes sleep', 'Calms nervous system']
    ),

    triangle: new BreathingPattern(
        'Triangle Breathing',
        [
            { type: 'inhale', duration: 3 },
            { type: 'hold', duration: 3 },
            { type: 'exhale', duration: 3 }
        ],
        'A simple, balanced breathing pattern perfect for beginners.',
        'beginner',
        ['Easy to learn', 'Promotes calm', 'Good for beginners']
    ),

    relaxing: new BreathingPattern(
        'Relaxing Breath',
        [
            { type: 'inhale', duration: 5 },
            { type: 'hold', duration: 5 },
            { type: 'exhale', duration: 7 },
            { type: 'hold', duration: 5 }
        ],
        'A gentle pattern designed for deep relaxation and stress relief.',
        'intermediate',
        ['Deep relaxation', 'Stress relief', 'Better sleep']
    ),

    energizing: new BreathingPattern(
        'Energizing Breath',
        [
            { type: 'inhale', duration: 2 },
            { type: 'exhale', duration: 2 }
        ],
        'A quick, energizing pattern to boost alertness and energy.',
        'beginner',
        ['Increases energy', 'Improves alertness', 'Quick activation']
    ),

    mindful: new BreathingPattern(
        'Mindful Breathing',
        [
            { type: 'inhale', duration: 6 },
            { type: 'exhale', duration: 6 }
        ],
        'A simple pattern focused on mindful awareness and presence.',
        'beginner',
        ['Mindfulness', 'Present moment awareness', 'Mental clarity']
    )
};

class BreathingPatternsManager {
    constructor() {
        this.customPatterns = new Map();
        this.loadCustomPatterns();
    }

    /**
     * Get all available patterns (preset + custom)
     * @returns {Map} Map of pattern ID to BreathingPattern
     */
    getAllPatterns() {
        const allPatterns = new Map();
        
        // Add preset patterns
        Object.entries(PRESET_PATTERNS).forEach(([id, pattern]) => {
            allPatterns.set(id, pattern);
        });
        
        // Add custom patterns
        this.customPatterns.forEach((pattern, id) => {
            allPatterns.set(id, pattern);
        });
        
        return allPatterns;
    }

    /**
     * Get a specific pattern by ID
     * @param {string} id - Pattern ID
     * @returns {BreathingPattern|null}
     */
    getPattern(id) {
        if (PRESET_PATTERNS[id]) {
            return PRESET_PATTERNS[id];
        }
        return this.customPatterns.get(id) || null;
    }

    /**
     * Get patterns by difficulty level
     * @param {string} difficulty - 'beginner', 'intermediate', 'advanced'
     * @returns {Array} Array of {id, pattern} objects
     */
    getPatternsByDifficulty(difficulty) {
        const patterns = [];
        this.getAllPatterns().forEach((pattern, id) => {
            if (pattern.difficulty === difficulty) {
                patterns.push({ id, pattern });
            }
        });
        return patterns;
    }

    /**
     * Create a custom pattern
     * @param {string} name - Pattern name
     * @param {Array} phases - Array of phase objects
     * @param {string} description - Pattern description
     * @param {string} difficulty - Difficulty level
     * @param {Array} benefits - Array of benefits
     * @returns {string} Pattern ID
     */
    createCustomPattern(name, phases, description, difficulty = 'beginner', benefits = []) {
        const id = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const pattern = new BreathingPattern(name, phases, description, difficulty, benefits);
        pattern.validate();
        
        this.customPatterns.set(id, pattern);
        this.saveCustomPatterns();
        
        return id;
    }

    /**
     * Update a custom pattern
     * @param {string} id - Pattern ID
     * @param {Object} updates - Updates to apply
     * @returns {boolean} Success status
     */
    updateCustomPattern(id, updates) {
        const pattern = this.customPatterns.get(id);
        if (!pattern) {
            return false;
        }

        try {
            const updatedPattern = new BreathingPattern(
                updates.name || pattern.name,
                updates.phases || pattern.phases,
                updates.description || pattern.description,
                updates.difficulty || pattern.difficulty,
                updates.benefits || pattern.benefits
            );
            updatedPattern.validate();
            
            this.customPatterns.set(id, updatedPattern);
            this.saveCustomPatterns();
            return true;
        } catch (error) {
            console.error('Failed to update custom pattern:', error);
            return false;
        }
    }

    /**
     * Delete a custom pattern
     * @param {string} id - Pattern ID
     * @returns {boolean} Success status
     */
    deleteCustomPattern(id) {
        if (this.customPatterns.has(id)) {
            this.customPatterns.delete(id);
            this.saveCustomPatterns();
            return true;
        }
        return false;
    }

    /**
     * Get pattern recommendations based on user preferences
     * @param {Object} preferences - User preferences
     * @returns {Array} Recommended patterns
     */
    getRecommendations(preferences = {}) {
        const { difficulty = 'beginner', duration = 5, goals = [] } = preferences;
        
        let patterns = Array.from(this.getAllPatterns().entries())
            .map(([id, pattern]) => ({ id, pattern }))
            .filter(({ pattern }) => pattern.difficulty === difficulty);

        // Filter by duration (approximate)
        patterns = patterns.filter(({ pattern }) => {
            const cycleDuration = pattern.totalDuration;
            const cyclesInSession = Math.floor((duration * 60) / cycleDuration);
            return cyclesInSession >= 3; // At least 3 cycles in session
        });

        // Sort by relevance to goals
        if (goals.length > 0) {
            patterns.sort((a, b) => {
                const aScore = a.pattern.benefits.filter(benefit => 
                    goals.some(goal => benefit.toLowerCase().includes(goal.toLowerCase()))
                ).length;
                const bScore = b.pattern.benefits.filter(benefit => 
                    goals.some(goal => benefit.toLowerCase().includes(goal.toLowerCase()))
                ).length;
                return bScore - aScore;
            });
        }

        return patterns.slice(0, 3); // Return top 3 recommendations
    }

    /**
     * Load custom patterns from storage
     */
    async loadCustomPatterns() {
        try {
            const result = await chrome.storage.local.get(['breathingCustomPatterns']);
            if (result.breathingCustomPatterns) {
                const patterns = JSON.parse(result.breathingCustomPatterns);
                Object.entries(patterns).forEach(([id, data]) => {
                    try {
                        this.customPatterns.set(id, BreathingPattern.fromJSON(data));
                    } catch (error) {
                        console.error(`Failed to load custom pattern ${id}:`, error);
                    }
                });
            }
        } catch (error) {
            console.error('Failed to load custom patterns:', error);
        }
    }

    /**
     * Save custom patterns to storage
     */
    async saveCustomPatterns() {
        try {
            const patterns = {};
            this.customPatterns.forEach((pattern, id) => {
                patterns[id] = pattern.toJSON();
            });
            
            await chrome.storage.local.set({
                breathingCustomPatterns: JSON.stringify(patterns)
            });
        } catch (error) {
            console.error('Failed to save custom patterns:', error);
        }
    }

    /**
     * Get pattern statistics
     * @returns {Object} Statistics about available patterns
     */
    getStatistics() {
        const allPatterns = Array.from(this.getAllPatterns().values());
        
        return {
            total: allPatterns.length,
            preset: Object.keys(PRESET_PATTERNS).length,
            custom: this.customPatterns.size,
            byDifficulty: {
                beginner: allPatterns.filter(p => p.difficulty === 'beginner').length,
                intermediate: allPatterns.filter(p => p.difficulty === 'intermediate').length,
                advanced: allPatterns.filter(p => p.difficulty === 'advanced').length
            },
            averageCycleDuration: allPatterns.reduce((sum, p) => sum + p.totalDuration, 0) / allPatterns.length
        };
    }
}

// Create global instance
const breathingPatternsManager = new BreathingPatternsManager();

export default breathingPatternsManager;
export { BreathingPattern, PRESET_PATTERNS };
