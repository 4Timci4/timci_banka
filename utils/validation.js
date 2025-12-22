/**
 * Store validation utility
 * Provides centralized store validation and error handling
 */

/**
 * Validates store object and its required properties
 * @param {Object} store - The store object to validate
 * @throws {Error} If store is invalid
 * @returns {Object} Validated store object
 */
export const validateStore = (store) => {
    if (!store) {
        throw new Error('Store is not initialized');
    }
    
    if (typeof store !== 'object') {
        throw new Error('Store must be an object');
    }
    
    // Ensure currentView has a default value
    if (!store.currentView) {
        store.currentView = 'dashboard';
    }
    
    return store;
};

/**
 * Safely gets page title from menu items
 * @param {Object} store - The store object
 * @param {Array} menuItems - Array of menu items
 * @returns {String} Page title or default
 */
export const getPageTitle = (store, menuItems) => {
    try {
        validateStore(store);
        const item = menuItems.find(i => i.id === store.currentView);
        return item ? item.label : 'Bankacılık';
    } catch (error) {
        console.warn('Failed to get page title:', error.message);
        return 'Bankacılık';
    }
};

/**
 * Development mode flag (can be set via environment or build process)
 */
export const isDevelopment = false; // Set to true during development

/**
 * Safe console logging that only works in development mode
 */
export const devLog = {
    log: (...args) => isDevelopment && console.log(...args),
    warn: (...args) => isDevelopment && console.warn(...args),
    error: (...args) => console.error(...args) // Errors always shown
};