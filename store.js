import { reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { mockUser, mockTransactions, mockNearbyPlayers, mockLoans, mockBills } from './mockData.js';
import { formatMoney, formatAmount } from './services/formatters.js';
import * as storeActions from './services/storeActions.js';

/**
 * Initial state configuration
 */
const createInitialState = () => ({
    // UI State
    isVisible: true,
    currentView: 'dashboard',
    loginError: false,
    pinInput: '',
    pinRequired: true,
    
    // User State
    user: {
        ...mockUser,
        cardNumberLast4: Math.floor(1000 + Math.random() * 9000),
        hasPin: !!mockUser.pin // Check if user has a PIN initially
    },
    
    // Financial State
    transactions: [...mockTransactions],
    loans: [...mockLoans],
    bills: [...mockBills],
    savingsBalance: 50000,
    savingsInterestRate: 4.5,
    
    // Players State
    nearbyPlayers: [...mockNearbyPlayers],
    
    // Modal State
    errorModal: {
        show: false,
        title: '',
        message: ''
    },
    
    // ATM State
    showAtmModal: false,
    atmMode: 'deposit',
    atmAmount: ''
});

/**
 * Reactive store instance
 */
export const store = reactive(createInitialState());

/**
 * Store API - Actions and utilities
 */
export const useStore = () => {
    return {
        // State
        state: store,
        
        // Actions
        showError: (title, message) => storeActions.showError(store, title, message),
        closeErrorModal: () => storeActions.closeErrorModal(store),
        updateUser: (userData) => storeActions.updateUser(store, userData),
        addTransaction: (transaction) => storeActions.addTransaction(store, transaction),
        updateBalance: (amount) => storeActions.updateBalance(store, amount),
        hasSufficientBalance: (amount) => storeActions.hasSufficientBalance(store, amount),
        createTransaction: storeActions.createTransaction,
        setPin: (pin) => storeActions.setPin(store, pin),
        changePin: (oldPin, newPin) => storeActions.changePin(store, oldPin, newPin),
        
        // Formatters
        formatMoney,
        formatAmount,
        
        // Getters
        get currentUser() {
            return store.user;
        },
        
        get recentTransactions() {
            return store.transactions.slice(0, 5);
        },
        
        get totalBalance() {
            return store.user.balance + store.savingsBalance;
        },
        
        get monthlyInterest() {
            return Math.round(store.savingsBalance * (store.savingsInterestRate / 100) / 12);
        },
        
        get pendingBills() {
            return store.bills.filter(bill => bill.status === 'pending');
        },
        
        get activeLoanCount() {
            return store.loans.length;
        }
    };
};

/**
 * Legacy compatibility - Direct store access with methods
 * @deprecated Use useStore() hook instead
 */
store.formatMoney = formatMoney;
store.formatAmount = formatAmount;
store.showError = (title, message) => storeActions.showError(store, title, message);
store.closeErrorModal = () => storeActions.closeErrorModal(store);
store.updateUser = (userData) => storeActions.updateUser(store, userData);
store.addTransaction = (transaction) => storeActions.addTransaction(store, transaction);
store.setPin = (pin) => storeActions.setPin(store, pin);
store.changePin = (oldPin, newPin) => storeActions.changePin(store, oldPin, newPin);