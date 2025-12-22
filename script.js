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
            window.addEventListener('message', (event) => {
                const item = event.data;
                if (item.type === 'ui') {
                    store.isVisible = item.status;
                }
                if (item.type === 'updateBalance') {
                    store.user.balance = item.balance;
                }
                if (item.type === 'updateUser') {
                    // Update user info including phone if passed from client
                    store.updateUser(item.userData);
                }
            });

            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    // Close UI in FiveM environment
                    try {
                        if (typeof GetParentResourceName !== 'undefined') {
                            fetch(`https://${GetParentResourceName()}/close`, { method: 'POST' });
                        }
                    } catch (error) {
                        console.warn('Failed to close FiveM UI:', error.message);
                    }
                }
            });
        });

        // Explicitly exposing store to template
        return {
            store,
            getPageTitle,
            currentDate,
            menuItems
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
