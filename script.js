import { createApp, computed, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store, menuItems } from './store.js';

// Debug check
console.log('Script.js: Importing store...', store);

if (!store) {
    console.error('CRITICAL ERROR: Store is undefined in script.js import!');
} else {
    console.log('Store imported successfully:', store);
    if (!store.currentView) {
        console.warn('WARNING: store.currentView is undefined! Resetting to "login".');
        store.currentView = 'login';
    }
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

const app = createApp({
    setup() {
        console.log('App Setup running. Store in setup:', store);
        
        const getPageTitle = computed(() => {
            if (!store) {
                 console.error('Store is undefined in getPageTitle computed property');
                 return 'Bankacılık';
            }
            if (!store.currentView) {
                 store.currentView = 'login';
                 return 'Bankacılık';
            }
            const item = menuItems.find(i => i.id === store.currentView);
            return item ? item.label : 'Bankacılık';
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
                    // Fetch to close UI in FiveM
                    // fetch(`https://${GetParentResourceName()}/close`, { method: 'POST' });
                    console.log('ESC Pressed');
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
    },
    // Adding global properties for safer access (backup)
    created() {
        console.log('App Created');
        this.store = store;
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

// Also provide globally
app.config.globalProperties.store = store;

app.mount('#app');
