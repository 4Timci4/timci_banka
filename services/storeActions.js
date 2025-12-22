/**
 * Store actions - Business logic separated from state management
 */

/**
 * Shows an error modal with title and message
 * @param {Object} store - The reactive store object
 * @param {string} title - Error title
 * @param {string} message - Error message
 */
export const showError = (store, title, message) => {
    store.errorModal.show = true;
    store.errorModal.title = title;
    store.errorModal.message = message;
};

/**
 * Closes the error modal
 * @param {Object} store - The reactive store object
 */
export const closeErrorModal = (store) => {
    store.errorModal.show = false;
    store.errorModal.title = '';
    store.errorModal.message = '';
};

/**
 * Updates user information
 * @param {Object} store - The reactive store object
 * @param {Object} userData - New user data to merge
 */
export const updateUser = (store, userData) => {
    store.user = { ...store.user, ...userData };
};

/**
 * Adds a new transaction to the beginning of the transactions array
 * @param {Object} store - The reactive store object
 * @param {Object} transaction - Transaction object to add
 */
export const addTransaction = (store, transaction) => {
    const newTransaction = {
        id: transaction.id || Date.now(),
        type: transaction.type,
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.date || new Date().toLocaleDateString('tr-TR')
    };
    store.transactions.unshift(newTransaction);
};

/**
 * Creates a new transaction object with current date
 * @param {string} type - Transaction type ('in' or 'out')
 * @param {string} title - Transaction title
 * @param {number} amount - Transaction amount
 * @returns {Object} Transaction object
 */
export const createTransaction = (type, title, amount) => {
    return {
        id: Date.now(),
        type,
        title,
        amount,
        date: new Date().toLocaleDateString('tr-TR')
    };
};

/**
 * Updates user balance (used for deposits/withdrawals)
 * @param {Object} store - The reactive store object
 * @param {number} amount - Amount to add/subtract (negative for withdrawals)
 */
export const updateBalance = (store, amount) => {
    store.user.balance += amount;
};

/**
 * Validates if user has sufficient balance for a transaction
 * @param {Object} store - The reactive store object
 * @param {number} amount - Amount to check
 * @returns {boolean} True if sufficient balance
 */
export const hasSufficientBalance = (store, amount) => {
    return store.user.balance >= amount;
};