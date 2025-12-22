import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../store.js';

export default {
    template: `
        <div class="flex flex-col h-full p-2 animate-fade-in">
            <!-- Header Section -->
            <div class="flex items-center justify-between mb-6 shrink-0">
                <div>
                    <h2 class="text-xl font-bold text-white tracking-tight">Vadeli Hesap</h2>
                    <p class="text-slate-400 text-xs mt-0.5">Birikim ve faiz yönetimi</p>
                </div>
                <div class="bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-lg">
                    <span class="text-accent font-bold text-xs">%{{ store.savingsInterestRate }} Yıllık Faiz</span>
                </div>
            </div>

            <!-- Main Content Grid -->
            <div class="flex flex-col gap-4">
                <!-- Balance Info Card -->
                <div class="bg-surface border border-slate-700/60 rounded-xl p-5 flex items-center justify-between relative overflow-hidden group shadow-lg">
                    <div class="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                        <svg class="w-32 h-32 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    
                    <div class="relative z-10">
                        <span class="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Toplam Birikim</span>
                        <div class="text-3xl font-bold text-white mt-1 font-mono tracking-tight">
                            {{ store.formatMoney(store.savingsBalance) }}
                        </div>
                    </div>

                    <div class="text-right relative z-10">
                        <span class="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Aylık Getiri</span>
                        <div class="text-emerald-400 font-bold text-lg mt-1 font-mono">
                            +{{ store.formatMoney(monthlyReturn) }}
                        </div>
                    </div>
                </div>

                <!-- Action Area -->
                <div class="bg-surface border border-slate-700/60 rounded-xl p-5 shadow-lg">
                    <!-- Source Balance -->
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-slate-400 text-xs font-medium">Kullanılabilir Vadesiz Bakiye</span>
                        <span class="text-white font-mono text-sm font-bold">{{ store.formatMoney(store.user.balance) }}</span>
                    </div>

                    <!-- Input -->
                    <div class="relative mb-4 group">
                        <input 
                            type="text" 
                            v-model="savingsForm.amount"
                            @input="formatInput"
                            placeholder="Tutar giriniz..."
                            class="input-primary pr-20"
                        >
                        <button 
                            @click="setMaxAmount"
                            class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1.5 rounded border border-slate-700 transition-colors"
                        >
                            TÜMÜ
                        </button>
                    </div>

                    <!-- Action Buttons -->
                    <div class="grid grid-cols-2 gap-3">
                        <button 
                            @click="handleTransaction('deposit')"
                            :disabled="!isValidAmount"
                            class="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 hover:border-emerald-500/50 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            Yatır
                        </button>
                        <button 
                            @click="handleTransaction('withdraw')"
                            :disabled="!isValidAmount"
                            class="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 hover:border-red-500/50 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                            Çek
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Info Note -->
            <div class="mt-auto pt-4 text-center">
                <p class="text-slate-600 text-[10px]">
                    * Faiz getirileri sunucu saatiyle her ayın 1'inde hesabınıza otomatik olarak yansıtılır.
                </p>
            </div>
        </div>
    `,
    setup() {
        const savingsForm = ref({ amount: '' });

        const monthlyReturn = computed(() => {
            return Math.round(store.savingsBalance * (store.savingsInterestRate / 100) / 12);
        });

        const isValidAmount = computed(() => {
            const amount = parseInt(savingsForm.value.amount.replace(/\D/g, '')) || 0;
            return amount > 0;
        });

        const formatInput = () => {
            savingsForm.value.amount = store.formatAmount(savingsForm.value.amount);
        };

        const setMaxAmount = () => {
            savingsForm.value.amount = store.user.balance.toLocaleString('en-US');
        };

        const handleTransaction = (mode) => {
            if (!savingsForm.value.amount) return;
            const amount = parseInt(savingsForm.value.amount.replace(/\D/g, ''));

            if (amount <= 0) {
                store.showError('Hata', 'Geçersiz tutar');
                return;
            }

            if (mode === 'deposit') {
                if (amount > store.user.balance) {
                    store.showError('Yetersiz Bakiye', `Vadesiz hesabınızda yeterli bakiye yok. Mevcut: ${store.formatMoney(store.user.balance)}`);
                    return;
                }
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
                if (amount > store.savingsBalance) {
                    store.showError('Yetersiz Bakiye', `Vadeli hesabınızda yeterli bakiye yok. Mevcut: ${store.formatMoney(store.savingsBalance)}`);
                    return;
                }
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
            savingsForm,
            monthlyReturn,
            isValidAmount,
            formatInput,
            setMaxAmount,
            handleTransaction
        };
    }
};
