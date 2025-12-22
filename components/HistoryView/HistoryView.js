import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../../store.js';

export default {
    template: `
        <div class="history-view">
            <!-- Decorative Background -->
            <div class="history-bg-glow"></div>

            <!-- Header -->
            <div class="history-header">
                <div class="history-title-group">
                    <div class="history-icon-wrapper">
                        <i class="fas fa-history history-icon-large"></i>
                    </div>
                    <div>
                        <h3 class="history-title">İşlem Geçmişi</h3>
                        <p class="history-subtitle">Hesap hareketlerinizi inceleyin</p>
                    </div>
                </div>

                <!-- Filters -->
                <div class="history-filters">
                    <button @click="setFilter('all')"
                            class="history-filter-btn"
                            :class="transactionFilter === 'all' ? 'active-all' : ''">
                        <i class="fas fa-list"></i>
                        <span>Tümü</span>
                    </button>
                    <button @click="setFilter('in')"
                            class="history-filter-btn"
                            :class="transactionFilter === 'in' ? 'active-in' : ''">
                        <i class="fas fa-arrow-down"></i>
                        <span>Gelen</span>
                    </button>
                    <button @click="setFilter('out')"
                            class="history-filter-btn"
                            :class="transactionFilter === 'out' ? 'active-out' : ''">
                        <i class="fas fa-arrow-up"></i>
                        <span>Giden</span>
                    </button>
                </div>
            </div>

            <!-- List Content -->
            <div class="history-list-container custom-scrollbar">
                <!-- Empty State -->
                <div v-if="filteredTransactions.length === 0" class="history-empty-state">
                    <div class="history-empty-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <div class="text-center">
                        <h4 class="history-empty-text">İşlem Bulunamadı</h4>
                        <p class="history-empty-subtext">Seçilen kriterlere uygun işlem kaydı yok.</p>
                    </div>
                </div>

                <!-- Transactions List -->
                <div v-else class="history-list">
                    <div v-for="t in paginatedTransactions" :key="t.id"
                         class="history-item group">
                        
                        <!-- Hover Glow -->
                        <div class="history-item-glow"></div>

                        <div class="history-item-content">
                            <!-- Icon -->
                            <div class="history-item-icon"
                                 :class="t.type === 'in' ? 'in' : 'out'">
                                <i class="fas" :class="t.type === 'in' ? 'fa-arrow-down' : 'fa-arrow-up'"></i>
                            </div>

                            <!-- Details -->
                            <div class="history-item-details">
                                <h4 class="history-item-title">{{ t.title }}</h4>
                                <div class="history-item-meta">
                                    <span class="history-type-badge"
                                          :class="t.type === 'in' ? 'in' : 'out'">
                                        {{ t.type === 'in' ? 'GELEN' : 'GİDEN' }}
                                    </span>
                                    <span class="history-item-date">{{ t.date }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Amount -->
                        <div class="history-item-amount">
                            <div class="history-amount-value"
                                 :class="t.type === 'in' ? 'in' : 'out'">
                                {{ t.type === 'out' ? '-' : '+' }}{{ store.formatMoney(t.amount) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Pagination Controls -->
            <div v-if="totalPages > 1" class="history-pagination">
                <div class="history-total-count">
                    Toplam <span class="history-total-number">{{ filteredTransactions.length }}</span> işlem
                </div>
                
                <div class="history-page-controls">
                    <button @click="prevPage" :disabled="currentPage === 1"
                            class="history-page-btn">
                        <i class="fas fa-chevron-left text-xs"></i>
                    </button>
                    
                    <div class="history-page-info">
                        <span class="history-current-page">{{ currentPage }}</span>
                        <span class="history-page-separator">/</span>
                        <span class="history-total-pages">{{ totalPages }}</span>
                    </div>

                    <button @click="nextPage" :disabled="currentPage === totalPages"
                            class="history-page-btn">
                        <i class="fas fa-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    setup() {
        const transactionFilter = ref('all');
        const currentPage = ref(1);
        const itemsPerPage = ref(5);

        const filteredTransactions = computed(() => {
            if (transactionFilter.value === 'all') {
                return store.transactions;
            } else if (transactionFilter.value === 'in') {
                return store.transactions.filter(t => t.type === 'in');
            } else {
                return store.transactions.filter(t => t.type === 'out');
            }
        });

        const totalPages = computed(() => {
            return Math.ceil(filteredTransactions.value.length / itemsPerPage.value);
        });

        const paginatedTransactions = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return filteredTransactions.value.slice(start, end);
        });

        const setFilter = (filter) => {
            transactionFilter.value = filter;
            currentPage.value = 1; // Reset to first page on filter change
        };

        const goToPage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
            }
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        return {
            store,
            transactionFilter,
            currentPage,
            itemsPerPage,
            filteredTransactions,
            totalPages,
            paginatedTransactions,
            setFilter,
            goToPage,
            nextPage,
            prevPage
        };
    }
};