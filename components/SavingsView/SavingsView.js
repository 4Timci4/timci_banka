import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../../store.js';

export default {
    template: `
        <div class="savings-view custom-scrollbar">
            <!-- Header -->
            <div class="savings-header">
                <div>
                    <h2 class="savings-title">Vadeli Hesap</h2>
                    <p class="savings-subtitle">Geleceğiniz için birikim yapın</p>
                </div>
                <div class="interest-badge">
                    <div class="interest-dot animate-pulse"></div>
                    <span class="interest-text">%{{ store.savingsInterestRate }} Yıllık Faiz</span>
                </div>
            </div>

            <div class="savings-grid">
                <!-- Left Column: Stats & Info -->
                <div class="savings-col-left flex flex-col gap-4">
                    <!-- Main Balance Card -->
                    <div class="balance-card group">
                        <div class="balance-card-glow"></div>
                        
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-4 text-emerald-100/80">
                                <div class="balance-icon-wrapper">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <span class="font-medium tracking-wide text-sm uppercase">Toplam Birikim</span>
                            </div>
                            
                            <div class="balance-amount">
                                {{ store.formatMoney(store.savingsBalance) }}
                            </div>
                            
                            <div class="monthly-return-badge">
                                <span>Aylık Tahmini Getiri:</span>
                                <span class="text-white font-bold">+{{ store.formatMoney(monthlyReturn) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Interest Info Card -->
                    <div class="info-card">
                        <h3 class="text-white font-bold mb-4 flex items-center gap-2">
                            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Bilgilendirme
                        </h3>
                        <ul class="space-y-3">
                            <li class="info-list-item">
                                <div class="info-dot"></div>
                                <p>Faiz ödemeleri her ayın <span class="text-white font-medium">1'inde</span> hesabınıza otomatik olarak yatırılır.</p>
                            </li>
                            <li class="info-list-item">
                                <div class="info-dot"></div>
                                <p>İstediğiniz zaman ceza ödemeden para çekebilir veya yatırabilirsiniz.</p>
                            </li>
                            <li class="info-list-item">
                                <div class="info-dot"></div>
                                <p>Yıllık <span class="text-emerald-400 font-bold">%{{ store.savingsInterestRate }}</span> faiz oranı üzerinden günlük bileşik faiz uygulanmaz.</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Right Column: Actions -->
                <div class="savings-col-right flex flex-col h-fit">
                    <div class="tab-container">
                        <button 
                            v-for="tab in ['deposit', 'withdraw']" 
                            :key="tab"
                            @click="activeTab = tab; savingsForm.amount = ''"
                            class="tab-button"
                            :class="activeTab === tab ? 'active' : 'inactive'"
                        >
                            <svg v-if="tab === 'deposit'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                            {{ tab === 'deposit' ? 'Para Yatır' : 'Para Çek' }}
                        </button>
                    </div>

                    <div class="action-card">
                        <div class="mb-6">
                            <div class="flex justify-between items-center mb-2">
                                <label class="text-slate-400 text-xs font-bold uppercase tracking-wider">İşlem Tutarı</label>
                                <span class="text-xs font-medium" :class="activeTab === 'deposit' ? 'text-emerald-400' : 'text-red-400'">
                                    Mevcut: {{ activeTab === 'deposit' ? store.formatMoney(store.user.balance) : store.formatMoney(store.savingsBalance) }}
                                </span>
                            </div>
                            
                            <div class="amount-input-wrapper group">
                                <span class="amount-currency-symbol">$</span>
                                <input 
                                    type="text" 
                                    v-model="savingsForm.amount"
                                    @input="formatInput"
                                    placeholder="0"
                                    class="amount-input"
                                >
                            </div>

                            <!-- Quick Amounts -->
                            <div class="quick-amount-grid">
                                <button 
                                    v-for="percent in [10, 25, 50, 100]" 
                                    :key="percent"
                                    @click="setPercentage(percent)"
                                    class="quick-amount-btn"
                                >
                                    %{{ percent }}
                                </button>
                            </div>
                        </div>

                        <!-- Simulation / Preview -->
                        <div v-if="previewAmount > 0" class="preview-box animate-fade-in">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-slate-400 text-sm">İşlem Sonrası Bakiye</span>
                                <span class="text-white font-mono font-bold">{{ store.formatMoney(projectedBalance) }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-slate-400 text-sm">Yeni Aylık Getiri</span>
                                <div class="flex items-center gap-2">
                                    <span class="text-emerald-400 font-mono font-bold">+{{ store.formatMoney(projectedMonthlyReturn) }}</span>
                                    <span class="text-xs text-emerald-500/70 bg-emerald-500/10 px-1.5 py-0.5 rounded" v-if="returnDifference !== 0">
                                        {{ returnDifference > 0 ? '+' : '' }}{{ store.formatMoney(returnDifference) }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-auto">
                            <button 
                                @click="handleTransaction"
                                :disabled="!isValidAmount"
                                class="action-btn"
                                :class="activeTab === 'deposit' ? 'deposit' : 'withdraw'"
                            >
                                <span v-if="activeTab === 'deposit'">Yatırımı Onayla</span>
                                <span v-else>Çekimi Onayla</span>
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        const activeTab = ref('deposit');
        const savingsForm = ref({ amount: '' });

        // Mevcut aylık getiri
        const monthlyReturn = computed(() => {
            return Math.round(store.savingsBalance * (store.savingsInterestRate / 100) / 12);
        });

        // Inputtaki ham sayısal değer
        const rawAmount = computed(() => {
            return parseInt(savingsForm.value.amount.replace(/\D/g, '')) || 0;
        });

        // Geçerlilik kontrolü
        const isValidAmount = computed(() => {
            const amount = rawAmount.value;
            if (amount <= 0) return false;
            
            if (activeTab.value === 'deposit') {
                return amount <= store.user.balance;
            } else {
                return amount <= store.savingsBalance;
            }
        });

        // Tahmini yeni bakiye
        const projectedBalance = computed(() => {
            if (activeTab.value === 'deposit') {
                return store.savingsBalance + rawAmount.value;
            } else {
                return store.savingsBalance - rawAmount.value;
            }
        });

        // Tahmini yeni aylık getiri
        const projectedMonthlyReturn = computed(() => {
            return Math.round(projectedBalance.value * (store.savingsInterestRate / 100) / 12);
        });

        // Getiri farkı
        const returnDifference = computed(() => {
            return projectedMonthlyReturn.value - monthlyReturn.value;
        });

        const formatInput = () => {
            savingsForm.value.amount = store.formatAmount(savingsForm.value.amount);
        };

        const setPercentage = (percent) => {
            const sourceBalance = activeTab.value === 'deposit' ? store.user.balance : store.savingsBalance;
            const amount = Math.floor(sourceBalance * (percent / 100));
            savingsForm.value.amount = amount.toLocaleString('en-US');
        };

        const handleTransaction = () => {
            if (!isValidAmount.value) return;
            
            const amount = rawAmount.value;

            if (activeTab.value === 'deposit') {
                store.user.balance -= amount;
                store.savingsBalance += amount;
                store.transactions.unshift({
                    id: Date.now(),
                    type: 'out',
                    title: 'Vadeli Hesaba Transfer',
                    amount: amount,
                    date: new Date().toLocaleDateString('tr-TR')
                });
            } else {
                store.savingsBalance -= amount;
                store.user.balance += amount;
                store.transactions.unshift({
                    id: Date.now(),
                    type: 'in',
                    title: 'Vadeli Hesaptan Transfer',
                    amount: amount,
                    date: new Date().toLocaleDateString('tr-TR')
                });
            }
            
            savingsForm.value.amount = '';
        };

        return {
            store,
            activeTab,
            savingsForm,
            monthlyReturn,
            isValidAmount,
            previewAmount: rawAmount,
            projectedBalance,
            projectedMonthlyReturn,
            returnDifference,
            formatInput,
            setPercentage,
            handleTransaction
        };
    }
};