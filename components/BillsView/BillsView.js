import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../../store.js';

export default {
    template: `
        <div class="bills-view">
            <!-- Header Section -->
            <div class="bills-header">
                <div class="flex items-center gap-4">
                    <div class="bills-icon-wrapper">
                        <i class="fas fa-file-invoice-dollar bills-icon-large"></i>
                    </div>
                    <div>
                        <h3 class="bills-title">Faturalar</h3>
                        <p class="bills-subtitle">Bekleyen ödemelerinizi yönetin</p>
                    </div>
                </div>
                
                <!-- Filter & Actions -->
                <div class="bills-actions">
                    <div class="bills-filter-group">
                        <button @click="setFilter('all')"
                                class="bills-filter-btn"
                                :class="filter === 'all' ? 'active-all' : ''">
                            Tümü
                        </button>
                        <button @click="setFilter('pending')"
                                class="bills-filter-btn"
                                :class="filter === 'pending' ? 'active-pending' : ''">
                            Bekleyenler
                        </button>
                    </div>
                    
                    <button v-if="pendingTotal > 0" 
                            @click="payAllBills"
                            class="bills-pay-all-btn">
                        <i class="fas fa-check-double"></i>
                        Tümünü Öde ({{ store.formatMoney(pendingTotal) }})
                    </button>
                </div>
            </div>

            <!-- Bills Grid -->
            <div class="bills-grid-container custom-scrollbar">
                <div v-if="filteredBills.length === 0" class="bills-empty-state">
                    <div class="bills-empty-icon">
                        <i class="fas fa-clipboard-check text-2xl opacity-50"></i>
                    </div>
                    <span class="bills-empty-text">Görüntülenecek fatura bulunmuyor</span>
                </div>

                <div class="bills-grid">
                    <div v-for="bill in paginatedBills" :key="bill.id"
                         class="bill-card group"
                         :class="bill.status === 'paid' ? 'paid' : ''">
                        
                        <!-- Status Stripe -->
                        <div class="bill-status-stripe"
                             :class="bill.status === 'pending' ? 'pending' : 'paid'"></div>

                        <!-- Card Header -->
                        <div class="bill-card-header">
                            <div class="flex items-center gap-3">
                                <div class="bill-icon-box"
                                     :class="getCategoryStyle(bill.icon).bg">
                                    <span v-html="bill.icon" :class="getCategoryStyle(bill.icon).text"></span>
                                </div>
                                <div>
                                    <h4 class="bill-title">{{ bill.title }}</h4>
                                    <p class="bill-company">{{ bill.company }}</p>
                                </div>
                            </div>
                            
                            <div class="flex flex-col items-end">
                                <span class="bill-status-badge"
                                      :class="bill.status === 'pending' ? 'pending' : 'paid'">
                                    {{ bill.status === 'pending' ? 'Ödeme Bekliyor' : 'Ödendi' }}
                                </span>
                            </div>
                        </div>

                        <!-- Card Details -->
                        <div class="bill-details-grid">
                            <div class="bill-detail-box">
                                <span class="bill-detail-label">Fatura No</span>
                                <span class="bill-detail-value normal">#{{ bill.id }}</span>
                            </div>
                            <div class="bill-detail-box">
                                <span class="bill-detail-label">Son Ödeme</span>
                                <span class="bill-detail-value" :class="bill.status === 'pending' ? 'urgent' : 'normal'">
                                    {{ bill.dueDate }}
                                </span>
                            </div>
                        </div>

                        <!-- Card Footer -->
                        <div class="bill-card-footer">
                            <div>
                                <div class="bill-amount-label">Tutar</div>
                                <div class="bill-amount-value"
                                     :class="bill.status === 'paid' ? 'paid' : ''">
                                    {{ store.formatMoney(bill.amount) }}
                                </div>
                            </div>

                            <button v-if="bill.status === 'pending'"
                                    @click="payBill(bill)"
                                    class="bill-pay-btn">
                                <span>ÖDE</span>
                                <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                            </button>
                            
                            <div v-else class="bill-paid-badge">
                                <i class="fas fa-check-circle"></i>
                                <span>Tahsil Edildi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="bills-pagination">
                <button @click="prevPage" :disabled="currentPage === 1"
                        class="bills-page-btn">
                    <i class="fas fa-chevron-left text-xs"></i>
                </button>
                <span class="bills-page-info">
                    {{ currentPage }} / {{ totalPages }}
                </span>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                        class="bills-page-btn">
                    <i class="fas fa-chevron-right text-xs"></i>
                </button>
            </div>
        </div>
    `,
    setup() {
        const filter = ref('all'); // 'all' | 'pending'
        const currentPage = ref(1);
        const itemsPerPage = 6;

        const filteredBills = computed(() => {
            if (filter.value === 'pending') {
                return store.bills.filter(bill => bill.status === 'pending');
            }
            return store.bills;
        });

        const totalPages = computed(() => Math.ceil(filteredBills.value.length / itemsPerPage));

        const paginatedBills = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return filteredBills.value.slice(start, end);
        });

        const nextPage = () => {
            if (currentPage.value < totalPages.value) currentPage.value++;
        };

        const prevPage = () => {
            if (currentPage.value > 1) currentPage.value--;
        };

        // Reset page when filter changes
        const setFilter = (newFilter) => {
            filter.value = newFilter;
            currentPage.value = 1;
        };

        const pendingTotal = computed(() => {
            return store.bills
                .filter(bill => bill.status === 'pending')
                .reduce((total, bill) => total + parseInt(bill.amount), 0);
        });

        const getCategoryStyle = (iconHtml) => {
            // Simple heuristic based on icon content or you could add a 'type' field to bill data
            if (iconHtml.includes('bolt')) return { bg: 'bill-cat-electricity', text: 'text-yellow-500' }; // Electricity
            if (iconHtml.includes('tint')) return { bg: 'bill-cat-water', text: 'text-blue-400' }; // Water
            if (iconHtml.includes('wifi')) return { bg: 'bill-cat-internet', text: 'text-indigo-400' }; // Internet
            if (iconHtml.includes('mobile')) return { bg: 'bill-cat-phone', text: 'text-purple-400' }; // Phone
            return { bg: 'bill-cat-default', text: 'text-slate-300' }; // Default
        };

        const payBill = (bill) => {
            const amount = parseInt(bill.amount);
            
            if (amount > store.user.balance) {
                store.showError('Yetersiz Bakiye', `Bu faturayı ödemek için hesabınızda yeterli bakiye bulunmuyor.`);
                return;
            }

            store.user.balance -= amount;
            bill.status = 'paid';
            
            store.transactions.unshift({
                id: Date.now(),
                type: 'out',
                title: 'Fatura Ödemesi: ' + bill.title,
                amount: amount,
                date: new Date().toLocaleDateString('tr-TR')
            });
        };

        const payAllBills = () => {
            const total = pendingTotal.value;
            if (total > store.user.balance) {
                store.showError('Yetersiz Bakiye', `Tüm faturaları ödemek için hesabınızda yeterli bakiye bulunmuyor.`);
                return;
            }

            store.bills.forEach(bill => {
                if (bill.status === 'pending') {
                    bill.status = 'paid';
                }
            });

            store.user.balance -= total;
            
            store.transactions.unshift({
                id: Date.now(),
                type: 'out',
                title: 'Toplu Fatura Ödemesi',
                amount: total,
                date: new Date().toLocaleDateString('tr-TR')
            });
        };

        return {
            store,
            filter,
            filteredBills,
            paginatedBills,
            currentPage,
            totalPages,
            nextPage,
            prevPage,
            setFilter,
            pendingTotal,
            getCategoryStyle,
            payBill,
            payAllBills
        };
    }
};