import { store } from '../store.js';

export default {
    template: `
        <transition name="modal">
            <div v-if="store.showAtmModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm" @click="closeAtmModal">
                <div @click.stop class="bg-surface border border-slate-700 rounded-3xl shadow-2xl w-[500px] overflow-hidden animate-fade-in">
                    <!-- Modal Header -->
                    <div class="p-6 border-b border-slate-700 flex items-center justify-between" :class="store.atmMode === 'deposit' ? 'bg-success/10' : 'bg-red-500/10'">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="store.atmMode === 'deposit' ? 'bg-success/20 text-success border border-success/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'">
                                <svg v-if="store.atmMode === 'deposit'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-white">{{ store.atmMode === 'deposit' ? 'Para Yatır' : 'Para Çek' }}</h3>
                                <p class="text-xs text-slate-400">ATM İşlemi</p>
                            </div>
                        </div>
                        <button @click="closeAtmModal" class="text-slate-400 hover:text-white transition-colors p-2">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    <!-- Modal Body -->
                    <div class="p-8 space-y-6">
                        <!-- Current Balance Display -->
                        <div class="bg-surface-dark/50 border border-slate-700 rounded-2xl p-4 flex justify-between items-center">
                            <span class="text-sm text-slate-400">Mevcut Bakiye</span>
                            <span class="text-2xl font-bold text-white font-mono">{{ store.formatMoney(store.user.balance) }}</span>
                        </div>

                        <!-- Amount Input -->
                        <div class="group">
                            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                                {{ store.atmMode === 'deposit' ? 'Yatırılacak Tutar' : 'Çekilecek Tutar' }}
                            </label>
                            <div class="relative">
                                <input type="text" v-model="store.atmAmount" placeholder="0"
                                       @input="store.atmAmount = store.formatAmount(store.atmAmount)"
                                       class="input-primary pl-12 text-3xl font-bold text-center py-6">
                                <span class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-2xl">$</span>
                            </div>
                        </div>

                        <!-- Quick Amount Buttons -->
                        <div class="grid grid-cols-4 gap-3">
                            <button v-for="amount in [100, 500, 1000, 5000]" :key="amount"
                                    @click="store.atmAmount = amount.toLocaleString('en-US')"
                                    class="py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all text-sm font-bold">
                                \${{ amount.toLocaleString('en-US') }}
                            </button>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-4 pt-4">
                            <button @click="closeAtmModal"
                                    class="flex-1 py-4 bg-surface-dark border border-slate-700 text-slate-300 hover:text-white rounded-xl transition-all font-bold">
                                İptal
                            </button>
                            <button @click="handleAtmTransaction"
                                    class="flex-1 py-4 rounded-xl font-bold transition-all hover:-translate-y-1 active:scale-95 shadow-lg"
                                    :class="[
                                        store.atmMode === 'deposit' ? 'bg-success hover:bg-emerald-400 text-white shadow-success/30' : 'bg-red-500 hover:bg-red-400 text-white shadow-red-500/30',
                                        (!store.atmAmount || parseInt(store.atmAmount.replace(/\D/g, '')) <= 0) ? 'opacity-50 cursor-not-allowed' : ''
                                    ]"
                                    :disabled="!store.atmAmount || parseInt(store.atmAmount.replace(/\D/g, '')) <= 0">
                                {{ store.atmMode === 'deposit' ? 'Yatır' : 'Çek' }}
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
            } else {
                store.user.balance -= amount;
                store.transactions.unshift({
                    id: Date.now(),
                    type: 'out',
                    title: 'ATM Para Çekme',
                    amount: amount,
                    date: new Date().toLocaleDateString('tr-TR')
                });
            }

            closeAtmModal();
        };

        return {
            store,
            closeAtmModal,
            handleAtmTransaction
        };
    }
};
