import { store } from '../../store.js';

export default {
    template: `
        <transition name="modal">
            <div v-if="store.showAtmModal" class="atm-modal-overlay" @click="closeAtmModal">
                <div @click.stop class="atm-modal-container">
                    
                    <!-- Dynamic Background Glow -->
                    <div class="atm-modal-glow"
                         :class="store.atmMode === 'deposit' ? 'deposit' : 'withdraw'"></div>

                    <!-- Header -->
                    <div class="atm-modal-header">
                        <div class="flex items-center gap-4">
                            <div class="atm-icon-wrapper"
                                 :class="store.atmMode === 'deposit' ? 'deposit' : 'withdraw'">
                                <i class="fas atm-icon-large" :class="store.atmMode === 'deposit' ? 'fa-arrow-down' : 'fa-arrow-up'"></i>
                            </div>
                            <div>
                                <h3 class="atm-title">{{ store.atmMode === 'deposit' ? 'Para Yatır' : 'Para Çek' }}</h3>
                                <p class="atm-subtitle">ATM İşlemi</p>
                            </div>
                        </div>
                        <button @click="closeAtmModal" class="atm-close-btn">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Body -->
                    <div class="atm-modal-body">
                        
                        <!-- Balance Card -->
                        <div class="atm-balance-card">
                            <div class="flex items-center gap-3">
                                <div class="atm-balance-icon">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <span class="text-sm font-medium text-slate-300">Mevcut Bakiye</span>
                            </div>
                            <span class="atm-balance-amount">{{ store.formatMoney(store.user.balance) }}</span>
                        </div>

                        <!-- Amount Input -->
                        <div>
                            <label class="atm-input-label">
                                {{ store.atmMode === 'deposit' ? 'Yatırılacak Tutar' : 'Çekilecek Tutar' }}
                            </label>
                            <div class="atm-input-wrapper group">
                                <input type="text" v-model="store.atmAmount" placeholder="0"
                                       @input="store.atmAmount = store.formatAmount(store.atmAmount)"
                                       @keydown="handleKeydown"
                                       class="atm-input">
                                <span class="atm-currency-symbol">$</span>
                            </div>
                        </div>

                        <!-- Quick Amounts -->
                        <div class="atm-quick-grid">
                            <button v-for="amount in [100, 500, 1000, 5000]" :key="amount"
                                    @click="store.atmAmount = amount.toLocaleString('en-US')"
                                    class="atm-quick-btn">
                                \${{ amount.toLocaleString('en-US') }}
                            </button>
                        </div>

                        <!-- Action Buttons -->
                        <div class="atm-actions">
                            <button @click="closeAtmModal"
                                    class="atm-btn-cancel">
                                İptal
                            </button>
                            <button @click="handleAtmTransaction"
                                    class="atm-btn-confirm"
                                    :class="store.atmMode === 'deposit' ? 'deposit' : 'withdraw'"
                                    :disabled="!store.atmAmount || parseInt(store.atmAmount.replace(/\D/g, '')) <= 0">
                                <span>{{ store.atmMode === 'deposit' ? 'Para Yatır' : 'Para Çek' }}</span>
                                <i class="fas" :class="store.atmMode === 'deposit' ? 'fa-arrow-down' : 'fa-arrow-up'"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    `,
    setup() {
        const closeAtmModal = () => {
            store.showAtmModal = false;
            store.atmAmount = '';
        };

        const handleAtmTransaction = () => {
            if (!store.atmAmount || store.atmAmount <= 0) return;
            const amount = parseInt(store.atmAmount.replace(/\D/g, ''));

            if (amount <= 0) {
                store.showError('Hata', 'Geçersiz tutar');
                return;
            }

            if (store.atmMode === 'withdraw' && amount > store.user.balance) {
                store.showError('Yetersiz Bakiye', `Hesabınızdan bu kadar para çekemezsiniz. Mevcut bakiyeniz: ${store.formatMoney(store.user.balance)}`);
                return;
            }

            if (store.atmMode === 'deposit') {
                store.user.balance += amount;
                store.transactions.unshift({
                    id: Date.now(),
                    type: 'in',
                    title: 'ATM Para Yatırma',
                    amount: amount,
                    date: new Date().toLocaleDateString('tr-TR')
                });
                store.showSuccess('İşlem Başarılı', `${store.formatMoney(amount)} başarıyla yatırıldı.`);
            } else {
                store.user.balance -= amount;
                store.transactions.unshift({
                    id: Date.now(),
                    type: 'out',
                    title: 'ATM Para Çekme',
                    amount: amount,
                    date: new Date().toLocaleDateString('tr-TR')
                });
                store.showSuccess('İşlem Başarılı', `${store.formatMoney(amount)} başarıyla çekildi.`);
            }

            closeAtmModal();
        };

        const handleKeydown = (e) => {
            if (e.key === 'Enter') {
                handleAtmTransaction();
            }
        };

        return {
            store,
            closeAtmModal,
            handleAtmTransaction,
            handleKeydown
        };
    }
};