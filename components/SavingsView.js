import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../store.js';

export default {
    template: `
        <div class="animate-fade-in pb-10 flex flex-col h-full">
            <!-- Header -->
            <div class="flex items-center justify-between px-1 mb-6 shrink-0">
                <div>
                    <h3 class="text-2xl font-bold text-white tracking-tight">Vadeli Mevduat</h3>
                    <p class="text-slate-400 text-sm mt-1">Geleceğiniz için birikim yapın</p>
                </div>
                <div class="px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg flex items-center gap-2 shadow-glow-accent">
                    <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                    <span class="text-accent font-bold text-xs uppercase tracking-wider">%{{ store.savingsInterestRate }} Yıllık Faiz</span>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
                <!-- Main Balance Card (More compact) -->
                <div class="bg-surface border border-slate-700 p-6 rounded-[2rem] shadow-xl relative overflow-hidden text-center group shrink-0">
                    <!-- Background Elements (Same but subtle) -->
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-yellow-300"></div>
                    <div class="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none"></div>
                    
                    <div class="relative z-10 flex flex-col items-center justify-center py-4">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center text-white shadow-lg shadow-accent/20 mb-3 rotate-3 group-hover:rotate-6 transition-transform">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        
                        <h4 class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Toplam Birikim</h4>
                        <div class="text-5xl font-bold text-white font-mono tracking-tighter mb-4 drop-shadow-xl">
                            {{ store.formatMoney(store.savingsBalance) }}
                        </div>
                        
                        <div class="inline-flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 backdrop-blur-sm">
                            <span class="text-slate-400 text-[10px] uppercase font-bold">Aylık Getiri</span>
                            <span class="text-accent font-bold font-mono text-sm">+{{ store.formatMoney(Math.round(store.savingsBalance * (store.savingsInterestRate / 100) / 12)) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions (Compact Grid) -->
                <div class="bg-surface border border-slate-700 p-6 rounded-[2rem] shadow-lg relative overflow-hidden shrink-0">
                    <h4 class="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                        <div class="w-1 h-4 bg-primary rounded-full"></div>
                        Hızlı İşlem
                    </h4>
                    
                    <div class="flex flex-col gap-4">
                        <!-- Amount Input -->
                        <div class="relative group">
                            <input type="text" v-model="savingsForm.amount" placeholder="0"
                                   @input="savingsForm.amount = store.formatAmount(savingsForm.amount)"
                                   class="w-full pl-4 pr-16 py-3 rounded-xl bg-surface-dark border border-slate-700 focus:border-accent focus:ring-1 focus:ring-accent/50 outline-none transition-all text-white font-mono text-xl font-bold">
                            <button class="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-800 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white transition-colors border border-slate-700"
                                    @click="savingsForm.amount = store.user.balance.toLocaleString('en-US')">TÜMÜ</button>
                        </div>

                        <!-- Action Buttons -->
                        <div class="grid grid-cols-2 gap-3">
                            <button @click="handleSavingsTransaction('deposit')"
                                    class="flex items-center justify-center gap-2 bg-success/10 hover:bg-success text-success hover:text-white border border-success/20 hover:border-success py-3 rounded-xl transition-all font-bold group text-sm"
                                    :disabled="!savingsForm.amount || parseInt(savingsForm.amount.replace(/\D/g, '')) <= 0">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                                Yatır
                            </button>

                            <button @click="handleSavingsTransaction('withdraw')"
                                    class="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 py-3 rounded-xl transition-all font-bold group text-sm"
                                    :disabled="!savingsForm.amount || parseInt(savingsForm.amount.replace(/\D/g, '')) <= 0">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                Çek
                            </button>
                        </div>

                         <div class="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-slate-700/50">
                             <span>Vadesiz: <span class="text-slate-300 font-mono">{{ store.formatMoney(store.user.balance) }}</span></span>
                             <span>Vadeli: <span class="text-slate-300 font-mono">{{ store.formatMoney(store.savingsBalance) }}</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        const savingsForm = ref({ amount: '' });

        const handleSavingsTransaction = (mode) => {
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
            handleSavingsTransaction
        };
    }
};
