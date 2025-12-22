import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../../store.js';

export default {
    template: `
        <div class="loans-grid">
            <!-- Left: Loan Calculator -->
            <div class="loans-calculator-card group">
                <!-- Decorative Backgrounds -->
                <div class="loans-bg-decoration-1"></div>
                <div class="loans-bg-decoration-2"></div>
                
                <!-- Content -->
                <div class="loans-content">
                    <!-- Top Info -->
                    <div class="loans-header">
                        <div class="loans-icon-wrapper">
                            <i class="fas fa-hand-holding-dollar loans-icon-large"></i>
                        </div>
                        <div>
                            <h3 class="loans-title">İhtiyaç Kredisi</h3>
                            <div class="loans-pre-approved-badge">
                                <span class="loans-badge-text">
                                    <i class="fas fa-check-circle mr-1"></i>Ön Onaylı
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Amount Selector -->
                    <div class="loans-amount-section">
                        <div class="text-center">
                            <span class="loans-amount-label">Kullanılacak Tutar</span>
                            <div class="loans-amount-value">
                                {{ store.formatMoney(parseInt(loanForm.amount) || 0) }}
                            </div>
                            
                            <div class="loans-slider-container group/slider">
                                <div class="loans-slider-wrapper">
                                    <!-- Track Background -->
                                    <div class="loans-slider-track-bg"></div>
                                    
                                    <!-- Active Track -->
                                    <div class="loans-slider-track-fill"
                                         :style="{ width: ((parseInt(loanForm.amount) - 1000) / 49000 * 100) + '%' }"></div>
                                    
                                    <!-- Input Range -->
                                    <input type="range" v-model="loanForm.amount" min="1000" max="50000" step="500"
                                           class="loans-slider-input">
                                    
                                    <!-- Thumb -->
                                    <div class="loans-slider-thumb"
                                         :style="{ left: ((parseInt(loanForm.amount) - 1000) / 49000 * 100) + '%' }">
                                         <div class="loans-thumb-ping"></div>
                                    </div>
                                </div>
                                <div class="loans-slider-labels">
                                    <span>$1,000</span>
                                    <span>$50,000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Details Grid -->
                    <div class="loans-details-grid">
                        <div class="loans-detail-box">
                            <span class="loans-detail-label">Faiz Oranı</span>
                            <span class="loans-detail-value accent font-mono">%5.5</span>
                        </div>
                        <div class="loans-detail-box">
                            <span class="loans-detail-label">Vade</span>
                            <span class="loans-detail-value font-mono">12 Ay</span>
                        </div>
                        <div class="loans-detail-box">
                            <span class="loans-detail-label">Geri Ödeme</span>
                            <span class="loans-detail-value font-mono">{{ store.formatMoney(Math.round((parseInt(loanForm.amount) || 0) * 1.055)) }}</span>
                        </div>
                    </div>

                    <!-- Action Button -->
                    <button @click="applyLoan"
                            class="loans-apply-btn group"
                            :disabled="!loanForm.amount || parseInt(loanForm.amount) < 1000"
                            :class="!loanForm.amount || parseInt(loanForm.amount) < 1000 ? 'disabled' : 'active'">
                        
                        <span class="loans-btn-text">
                            Krediyi Onayla
                            <i class="fas fa-arrow-right loans-btn-icon"></i>
                        </span>
                        
                        <!-- Shine Effect -->
                        <div class="loans-btn-shine" v-if="loanForm.amount && parseInt(loanForm.amount) >= 1000"></div>
                    </button>
                </div>
            </div>

            <!-- Right: Active Loans -->
            <div class="loans-right-col">
                 <div class="active-loans-card">
                    <div class="active-loans-header">
                        <h3 class="active-loans-title">
                            <i class="fas fa-file-invoice-dollar active-loans-icon"></i>
                            Aktif Kredilerim
                            <span class="active-loans-count">{{ store.loans.length }}</span>
                        </h3>
                        <div class="loans-pagination" v-if="totalPages > 1">
                            <button class="loans-page-btn" @click="prevPage" :disabled="currentPage === 1">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <span class="loans-page-text">{{ currentPage }} / {{ totalPages }}</span>
                            <button class="loans-page-btn" @click="nextPage" :disabled="currentPage === totalPages">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Empty State -->
                    <div v-if="store.loans.length === 0" class="active-loans-empty">
                        <div class="active-loans-empty-icon">
                            <i class="fas fa-folder-open"></i>
                        </div>
                        <h4 class="active-loans-empty-text">Aktif Kredi Yok</h4>
                        <p class="active-loans-empty-subtext">Şu anda ödenmesi gereken bir kredi borcunuz bulunmuyor.</p>
                    </div>

                    <!-- List -->
                    <div v-else class="active-loans-list custom-scrollbar">
                        <div v-for="loan in paginatedLoans" :key="loan.id"
                             class="loan-item group">
                            
                            <!-- Background Glow -->
                            <div class="loan-item-glow"></div>

                            <div class="loan-item-content">
                                <!-- Icon & Info -->
                                <div class="loan-item-left">
                                    <div class="loan-item-icon">
                                        <i class="fas fa-receipt"></i>
                                    </div>
                                    <div class="loan-item-info">
                                        <div class="loan-item-header">
                                            <h4 class="loan-item-title">İhtiyaç Kredisi</h4>
                                            <span class="loan-item-date">
                                                {{ loan.date }}
                                            </span>
                                        </div>
                                        <div class="loan-item-balance">
                                            <div class="loan-balance-group">
                                                <span class="loan-balance-label">Kalan</span>
                                                <span class="loan-balance-value">{{ store.formatMoney(loan.remainingAmount) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Action -->
                                <div class="loan-item-right">
                                    <span class="loan-installment-label">Taksit Tutarı</span>
                                    <button class="loan-pay-btn group/btn">
                                        <span class="loan-pay-amount group-hover/btn:text-slate-900">{{ store.formatMoney(loan.nextInstallment) }}</span>
                                        <div class="loan-pay-divider"></div>
                                        <span class="loan-pay-text group-hover/btn:text-slate-900">ÖDE</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Progress Line -->
                            <div class="loan-progress-bar">
                                <div class="loan-progress-fill"
                                     :style="{ width: (loan.remainingAmount / loan.totalAmount * 100) + '%' }"></div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    `,
    setup() {
        const loanForm = ref({
            amount: '10000'
        });

        const currentPage = ref(1);
        const itemsPerPage = 4;

        const totalPages = computed(() => Math.ceil(store.loans.length / itemsPerPage));

        const paginatedLoans = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return store.loans.slice(start, end);
        });

        const prevPage = () => {
            if (currentPage.value > 1) currentPage.value--;
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) currentPage.value++;
        };

        const applyLoan = () => {
            const amount = parseInt(loanForm.value.amount);
            const interest = amount * 1.055;
            
            store.loans.push({
                id: Date.now(),
                totalAmount: Math.round(interest),
                remainingAmount: Math.round(interest),
                nextInstallment: Math.round(interest / 12),
                date: new Date().toLocaleDateString('tr-TR')
            });
            
            store.user.balance += amount;
            
            // Add transaction log
            store.transactions.unshift({
                id: Date.now(),
                type: 'in',
                title: 'Kredi Kullanımı',
                amount: amount,
                date: new Date().toLocaleDateString('tr-TR')
            });

            store.currentView = 'loans';
        };

        return {
            store,
            loanForm,
            applyLoan,
            currentPage,
            totalPages,
            paginatedLoans,
            prevPage,
            nextPage
        };
    }
};