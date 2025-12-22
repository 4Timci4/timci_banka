import { createApp, computed, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from './store.js';
import { menuItems } from './constants/menuItems.js';
import { validateStore, getPageTitle as getPageTitleUtil } from './utils/validation.js';

// Initialize and validate store
try {
    validateStore(store);
} catch (error) {
    throw new Error(`Store initialization failed: ${error.message}`);
}

// Components
import LoginView from './components/LoginView.js';
import Sidebar from './components/Sidebar.js';
import DashboardView from './components/DashboardView.js';
import TransferView from './components/TransferView.js';
import HistoryView from './components/HistoryView.js';
import BillsView from './components/BillsView.js';
import SavingsView from './components/SavingsView.js';
import LoansView from './components/LoansView.js';
import AtmModal from './components/AtmModal.js';
import ErrorModal from './components/ErrorModal.js';
import CreditCard from './components/CreditCard.js';

const app = createApp({
    setup() {
        const getPageTitle = computed(() => {
            return getPageTitleUtil(store, menuItems);
        });

        const currentDate = computed(() => {
            return new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        });

        // --- NUI Event Listeners ---
        onMounted(() => {
            // NUI Message Handler
            window.addEventListener('message', (event) => {
                const item = event.data;
                
                // UI Visibility Control
                if (item.type === 'ui') {
                    store.isVisible = item.status;
                    // NUI Focus Management
                    if (item.status) {
                        setNuiFocus(true, true);
                    } else {
                        setNuiFocus(false, false);
                    }
                }
                
                // Balance Updates
                if (item.type === 'updateBalance') {
                    store.user.balance = item.balance;
                }
                
                // User Data Updates
                if (item.type === 'updateUser') {
                    store.updateUser(item.userData);
                }
                
                // Transaction Updates
                if (item.type === 'newTransaction') {
                    store.addTransaction(item.transaction);
                }
                
                // Account Status Updates
                if (item.type === 'accountStatus') {
                    store.user.accountStatus = item.status;
                }
                
                // Nearby Players Update (for transfers)
                if (item.type === 'updateNearbyPlayers') {
                    store.nearbyPlayers = item.players;
                }
                
                // Error Handling from Server
                if (item.type === 'showError') {
                    store.showError(item.title || 'Hata', item.message || 'Bir hata oluştu');
                }
            });

            // ESC Key Handler
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && store.isVisible) {
                    closeUI();
                }
            });
            
            // Click outside handler for focus management
            document.addEventListener('click', () => {
                if (store.isVisible) {
                    maintainNuiFocus();
                }
            });
        });

        // NUI Helper Functions
        const setNuiFocus = (hasFocus, hasCursor) => {
            try {
                if (typeof GetParentResourceName !== 'undefined') {
                    fetch(`https://${GetParentResourceName()}/setNuiFocus`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ focus: hasFocus, cursor: hasCursor })
                    });
                }
            } catch (error) {
                console.warn('Failed to set NUI focus:', error.message);
            }
        };

        const closeUI = () => {
            try {
                if (typeof GetParentResourceName !== 'undefined') {
                    setNuiFocus(false, false);
                    fetch(`https://${GetParentResourceName()}/close`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }
                    });
                    store.isVisible = false;
                }
            } catch (error) {
                console.warn('Failed to close FiveM UI:', error.message);
            }
        };

        const maintainNuiFocus = () => {
            if (store.isVisible) {
                setNuiFocus(true, true);
            }
        };

        // NUI Callback System
        const sendNuiCallback = (callback, data = {}) => {
            try {
                if (typeof GetParentResourceName !== 'undefined') {
                    return fetch(`https://${GetParentResourceName()}/${callback}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                }
            } catch (error) {
                console.error(`NUI Callback failed for ${callback}:`, error.message);
                return Promise.reject(error);
            }
        };

        // Explicitly exposing store to template
        return {
            store,
            getPageTitle,
            currentDate,
            menuItems,
            sendNuiCallback,
            closeUI
        };
    }
});

// Register Components
app.component('login-view', LoginView);
app.component('sidebar', Sidebar);
app.component('dashboard-view', DashboardView);
app.component('transfer-view', TransferView);
app.component('history-view', HistoryView);
app.component('bills-view', BillsView);
app.component('savings-view', SavingsView);
app.component('loans-view', LoansView);
app.component('atm-modal', AtmModal);
app.component('error-modal', ErrorModal);
app.component('credit-card', CreditCard);

// Provide store globally for template access
app.config.globalProperties.store = store;

app.mount('#app');
