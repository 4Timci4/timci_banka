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

/**
 * Enhanced NUI callback system for FiveM integration
 * @param {string} callback - Callback endpoint name
 * @param {Object} data - Data to send
 * @returns {Promise} Response promise
 */
export const sendNuiCallback = async (callback, data = {}) => {
    try {
        if (typeof GetParentResourceName !== 'undefined') {
            const response = await fetch(`https://${GetParentResourceName()}/${callback}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } else {
            console.warn(`NUI Callback '${callback}' called in development mode`);
            return Promise.resolve({ success: true, message: 'Development mode' });
        }
    } catch (error) {
        console.error(`NUI Callback failed for ${callback}:`, error.message);
        throw error;
    }
};

/**
 * Validates transaction data before processing
 * @param {Object} transactionData - Transaction data to validate
 * @returns {Object} Validation result
 */
export const validateTransaction = (transactionData) => {
    const errors = [];
    
    if (!transactionData.amount || transactionData.amount <= 0) {
        errors.push('Geçersiz tutar');
    }
    
    if (transactionData.type === 'transfer' && !transactionData.targetPhone) {
        errors.push('Alıcı telefon numarası gerekli');
    }
    
    if (transactionData.amount > 999999999) {
        errors.push('Tutar çok yüksek');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Handles ATM operations (deposit/withdraw)
 * @param {Object} store - The reactive store object
 * @param {string} operation - 'deposit' or 'withdraw'
 * @param {number} amount - Amount to process
 * @returns {Promise} Operation result
 */
export const handleAtmOperation = async (store, operation, amount) => {
    try {
        const validation = validateTransaction({ amount, type: operation });
        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }
        
        if (operation === 'withdraw' && !hasSufficientBalance(store, amount)) {
            throw new Error('Yetersiz bakiye');
        }
        
        const result = await sendNuiCallback('atmOperation', {
            operation,
            amount
        });
        
        if (result.success) {
            updateBalance(store, operation === 'deposit' ? amount : -amount);
            addTransaction(store, createTransaction(
                operation === 'deposit' ? 'in' : 'out',
                operation === 'deposit' ? 'ATM Para Yatırma' : 'ATM Para Çekme',
                amount
            ));
        }
        
        return result;
    } catch (error) {
        showError(store, 'ATM Hatası', error.message);
        throw error;
    }
};