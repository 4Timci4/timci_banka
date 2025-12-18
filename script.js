import { createApp, ref, computed, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { mockUser, mockTransactions, mockNearbyPlayers, mockLoans } from './mockData.js';

createApp({
    setup() {
        // --- State ---
        const isVisible = ref(true); // Control NUI visibility
        const currentView = ref('login');
        const pinInput = ref('');
        const loginError = ref(false);
        
        // Data
        const user = ref({ ...mockUser });
        const transactions = ref([...mockTransactions]);
        const nearbyPlayers = ref([...mockNearbyPlayers]);
        const loans = ref([...mockLoans]);

        // Forms
        const transferForm = ref({
            phone: '',
            amount: null,
            description: ''
        });

        const loanForm = ref({
            amount: 10000
        });

        // Menu Configuration
        const menuItems = [
            { 
                id: 'dashboard', 
                label: 'Hesap Özeti', 
                icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>'
            },
            { 
                id: 'transfer', 
                label: 'Para Transferi', 
                icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>' 
            },
            { 
                id: 'history', 
                label: 'İşlem Geçmişi', 
                icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            },
            { 
                id: 'loans', 
                label: 'Krediler', 
                icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            }
        ];

        // --- Computed ---
        const pinDisplay = computed(() => {
            return pinInput.value.padEnd(4, '•').split('').map((char, index) => {
                return index < pinInput.value.length ? '*' : '•';
            }).join('');
        });

        const recentTransactions = computed(() => {
            return transactions.value.slice(0, 4);
        });

        const currentDate = computed(() => {
            return new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        });

        const getPageTitle = computed(() => {
            const item = menuItems.find(i => i.id === currentView.value);
            return item ? item.label : 'Bankacılık';
        });

        // --- Methods ---
        const enterPin = (num) => {
            if (pinInput.value.length < 4) {
                pinInput.value += num;
                loginError.value = false;
            }
        };

        const clearPin = () => {
            pinInput.value = '';
            loginError.value = false;
        };

        const submitLogin = () => {
            if (pinInput.value === user.value.pin) {
                currentView.value = 'dashboard';
                pinInput.value = '';
            } else {
                loginError.value = true;
                setTimeout(() => {
                    pinInput.value = '';
                    loginError.value = false;
                }, 500);
            }
        };

        const logout = () => {
            currentView.value = 'login';
            pinInput.value = '';
        };

        const formatMoney = (value) => {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        };

        const handleTransfer = () => {
            if (!transferForm.value.phone || !transferForm.value.amount) return;
            
            if (transferForm.value.amount > user.value.balance) {
                console.log('Yetersiz bakiye');
                return;
            }

            // Simulate API call
            user.value.balance -= transferForm.value.amount;
            transactions.value.unshift({
                id: Date.now(),
                type: 'out',
                title: transferForm.value.description || 'Transfer: ' + transferForm.value.phone,
                amount: transferForm.value.amount,
                date: new Date().toLocaleDateString('tr-TR')
            });

            // Reset form
            transferForm.value = { phone: '', amount: null, description: '' };
            currentView.value = 'dashboard';
        };

        const applyLoan = () => {
            const amount = loanForm.value.amount;
            const interest = amount * 1.055;
            
            loans.value.push({
                id: Date.now(),
                totalAmount: interest,
                remainingAmount: interest,
                nextInstallment: interest / 12,
                date: new Date().toLocaleDateString('tr-TR')
            });
            
            user.value.balance += amount;
            
            // Add transaction log
            transactions.value.unshift({
                id: Date.now(),
                type: 'in',
                title: 'Kredi Kullanımı',
                amount: amount,
                date: new Date().toLocaleDateString('tr-TR')
            });

            currentView.value = 'loans';
        };

        // --- NUI Event Listeners ---
        onMounted(() => {
            window.addEventListener('message', (event) => {
                const item = event.data;
                if (item.type === 'ui') {
                    isVisible.value = item.status;
                }
                if (item.type === 'updateBalance') {
                    user.value.balance = item.balance;
                }
                if (item.type === 'updateUser') {
                    // Update user info including phone if passed from client
                    user.value = { ...user.value, ...item.userData };
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

        return {
            isVisible,
            currentView,
            user,
            pinInput,
            pinDisplay,
            loginError,
            transactions,
            recentTransactions,
            nearbyPlayers,
            transferForm,
            loans,
            loanForm,
            currentDate,
            menuItems,
            getPageTitle,
            enterPin,
            clearPin,
            submitLogin,
            logout,
            formatMoney,
            handleTransfer,
            applyLoan
        };
    }
}).mount('#app');