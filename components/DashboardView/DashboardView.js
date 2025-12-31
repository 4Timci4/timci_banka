import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../../store.js';

export default {
    template: `
        <div class="dashboard-grid">
            <!-- Left Column: Card & Actions -->
            <div class="dashboard-left-col">
                <!-- Realistic Credit Card (Theme Compatible) -->
                <div class="card-wrapper">
                    <credit-card></credit-card>
                </div>

                <!-- Quick Actions -->
                <div class="quick-actions-section">
                    <h3 class="quick-actions-title">
                        <span class="quick-actions-indicator"></span>
                        Hızlı İşlemler
                    </h3>
                    <div class="quick-actions-grid">
                        <!-- Deposit -->
                        <button @click="openAtmModal('deposit')" 
                                class="quick-action-btn deposit group">
                            <div class="quick-action-glow"></div>
                            <div class="quick-action-icon">
                                <i class="fas fa-arrow-down"></i>
                            </div>
                            <span class="quick-action-label">Para Yatır</span>
                        </button>

                        <!-- Withdraw -->
                        <button @click="openAtmModal('withdraw')" 
                                class="quick-action-btn withdraw group">
                            <div class="quick-action-glow"></div>
                            <div class="quick-action-icon">
                                <i class="fas fa-arrow-up"></i>
                            </div>
                            <span class="quick-action-label">Para Çek</span>
                        </button>
                        
                        <!-- Transfer -->
                        <button @click="store.currentView = 'transfer'" 
                                class="quick-action-btn transfer group">
                            <div class="quick-action-glow"></div>
                            <div class="quick-action-icon">
                                <i class="fas fa-paper-plane"></i>
                            </div>
                            <span class="quick-action-label">Transfer</span>
                        </button>
                        
                        <!-- Loans -->
                        <button @click="store.currentView = 'loans'" 
                                class="quick-action-btn loans group">
                            <div class="quick-action-glow"></div>
                            <div class="quick-action-icon">
                                <i class="fas fa-hand-holding-dollar"></i>
                            </div>
                            <span class="quick-action-label">Kredi</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Column: Recent Activity -->
            <div class="dashboard-right-col">
                <div class="recent-activity-card">
                    <!-- Header -->
                    <div class="recent-header">
                        <h3 class="recent-title">
                            <i class="fas fa-history"></i>
                            Son İşlemler
                        </h3>
                        
                        <!-- Quick Filters -->
                        <div class="dashboard-filters">
                            <button @click="setFilter('all')" class="dashboard-filter-btn" :class="{ 'active': filter === 'all' }">Tümü</button>
                            <button @click="setFilter('in')" class="dashboard-filter-btn in" :class="{ 'active': filter === 'in' }">Gelen</button>
                            <button @click="setFilter('out')" class="dashboard-filter-btn out" :class="{ 'active': filter === 'out' }">Giden</button>
                        </div>

                        <div class="recent-pagination" v-if="totalPages > 1">
                            <button class="recent-page-btn" @click="prevPage" :disabled="currentPage === 1">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <span class="recent-page-text">{{ currentPage }} / {{ totalPages }}</span>
                            <button class="recent-page-btn" @click="nextPage" :disabled="currentPage === totalPages">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                    <!-- List -->
                    <div class="recent-list custom-scrollbar">
                        <div v-if="filteredTransactions.length === 0" class="recent-empty">
                            <i class="fas fa-exchange-alt"></i>
                            <span>Henüz işlem yok</span>
                        </div>

                        <div v-for="t in paginatedTransactions" :key="t.id"
                             class="recent-item group">
                            
                            <div class="recent-item-left">
                                <div class="recent-icon"
                                     :class="t.type === 'in' ? 'in' : 'out'">
                                    <i class="fas" :class="t.type === 'in' ? 'fa-arrow-down' : 'fa-arrow-up'"></i>
                                </div>
                                <div class="recent-info">
                                    <div class="recent-desc">{{ t.title }}</div>
                                    <div class="recent-date">{{ t.date }}</div>
                                </div>
                            </div>
                            
                            <div class="recent-amount" 
                                 :class="t.type === 'in' ? 'in' : 'out'">
                                {{ t.type === 'out' ? '-' : '+' }}{{ store.formatMoney(t.amount) }}
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Fade -->
                    <div class="recent-fade"></div>
                </div>
            </div>
        </div>
    `,
    setup() {
        const openAtmModal = (mode) => {
            store.atmMode = mode;
            store.showAtmModal = true;
            store.atmAmount = '';
        };

        const filter = ref('all');
        const currentPage = ref(1);
        const itemsPerPage = 5;

        const filteredTransactions = computed(() => {
            if (filter.value === 'all') return store.transactions;
            return store.transactions.filter(t => t.type === filter.value);
        });

        const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / itemsPerPage));

        const paginatedTransactions = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return filteredTransactions.value.slice(start, end);
        });

        const setFilter = (newFilter) => {
            filter.value = newFilter;
            currentPage.value = 1;
        };

        const prevPage = () => {
            if (currentPage.value > 1) currentPage.value--;
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) currentPage.value++;
        };

        return {
            store,
            openAtmModal,
            filter,
            setFilter,
            filteredTransactions,
            currentPage,
            totalPages,
            paginatedTransactions,
            prevPage,
            nextPage
        };
    }
};