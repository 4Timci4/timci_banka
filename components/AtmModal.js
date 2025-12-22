import { store } from '../store.js';

export default {
    template: `
        <transition name="modal">
            <div v-if="store.showAtmModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-md" @click="closeAtmModal">
                <div @click.stop class="bg-surface-dark border border-white/10 rounded-[2.5rem] shadow-2xl w-[480px] overflow-hidden animate-scale-in relative">
                    
                    <!-- Dynamic Background Glow -->
                    <div class="absolute top-0 left-0 w-full h-32 opacity-20 blur-[60px] pointer-events-none transition-colors duration-500"
                         :class="store.atmMode === 'deposit' ? 'bg-emerald-500' : 'bg-red-500'"></div>

                    <!-- Header -->
                    <div class="relative p-8 pb-4 flex items-center justify-between z-10">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border border-white/15 transition-colors duration-300"
                                 :class="store.atmMode === 'deposit' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'">
                                <i class="fas text-2xl" :class="store.atmMode === 'deposit' ? 'fa-arrow-down' : 'fa-arrow-up'"></i>
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-white tracking-tight">{{ store.atmMode === 'deposit' ? 'Para Yatır' : 'Para Çek' }}</h3>
                                <p class="text-sm text-slate-400">ATM İşlemi</p>
                            </div>
                        </div>
                        <button @click="closeAtmModal" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Body -->
                    <div class="p-8 pt-4 space-y-6 relative z-10">
                        
                        <!-- Balance Card -->
                        <div class="bg-black/30 border border-white/10 rounded-2xl p-5 flex items-center justify-between backdrop-blur-sm">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <span class="text-sm font-medium text-slate-300">Mevcut Bakiye</span>
                            </div>
                            <span class="text-2xl font-bold text-white font-mono tracking-tight">{{ store.formatMoney(store.user.balance) }}</span>
                        </div>

                        <!-- Amount Input -->
                        <div class="space-y-3">
                            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                {{ store.atmMode === 'deposit' ? 'Yatırılacak Tutar' : 'Çekilecek Tutar' }}
                            </label>
                            <div class="relative group">
                                <input type="text" v-model="store.atmAmount" placeholder="0"
                                       @input="store.atmAmount = store.formatAmount(store.atmAmount)"
                                       class="w-full bg-surface border border-slate-700 rounded-2xl py-6 pl-14 pr-6 text-4xl font-bold text-white placeholder-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono tracking-tight text-center group-hover:border-slate-600">
                                <span class="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-500 transition-colors group-focus-within:text-primary">$</span>
                            </div>
                        </div>

                        <!-- Quick Amounts -->
                        <div class="grid grid-cols-4 gap-3">
                            <button v-for="amount in [100, 500, 1000, 5000]" :key="amount"
                                    @click="store.atmAmount = amount.toLocaleString('en-US')"
                                    class="py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold font-mono transition-all active:scale-95">
                                \${{ amount.toLocaleString('en-US') }}
                            </button>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-4 pt-2">
                            <button @click="closeAtmModal"
                                    class="flex-1 py-4 rounded-xl font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                                İptal
                            </button>
                            <button @click="handleAtmTransaction"
                                    class="flex-[2] py-4 rounded-xl font-bold text-white shadow-lg transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                                    :class="[
                                        store.atmMode === 'deposit' 
                                            ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:shadow-emerald-500/30' 
                                            : 'bg-gradient-to-r from-red-600 to-red-500 hover:shadow-red-500/30',
                                        (!store.atmAmount || parseInt(store.atmAmount.replace(/\D/g, '')) <= 0) ? 'opacity-50 cursor-not-allowed grayscale' : ''
                                    ]"
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
