import { store } from '../store.js';

export default {
    template: `
        <div class="animate-fade-in pb-10 space-y-6">
            <!-- Summary Header -->
            <div class="flex items-center justify-between mb-8 px-1">
                <div>
                    <h3 class="text-2xl font-bold text-white tracking-tight">Faturalar</h3>
                    <p class="text-slate-400 text-sm mt-1">Bekleyen ödemelerinizi güvenle gerçekleştirin</p>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 shadow-lg">
                     <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div v-for="bill in store.bills" :key="bill.id"
                     class="relative group rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-1"
                     :class="bill.status === 'pending' ? 'bg-surface border border-slate-700 hover:shadow-2xl hover:shadow-primary/10' : 'bg-surface-dark/50 border border-slate-800 opacity-60 grayscale-[0.8] hover:opacity-80 hover:grayscale-0'">
                    
                    <!-- Background Glow for Pending -->
                    <div v-if="bill.status === 'pending'" class="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-colors duration-500"></div>

                    <div class="p-7 relative z-10 flex flex-col h-full">
                        <!-- Header -->
                        <div class="flex justify-between items-start mb-8">
                            <div class="flex items-center gap-4">
                                <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/5 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105"
                                     :class="bill.categoryColor + ' bg-opacity-20'">
                                    <span v-html="bill.icon" class="drop-shadow-lg filter"></span>
                                </div>
                                <div>
                                    <h4 class="font-bold text-white text-lg tracking-tight leading-tight">{{ bill.title }}</h4>
                                    <div class="flex items-center gap-2 text-xs text-slate-400 font-medium mt-1">
                                        <span class="w-1.5 h-1.5 rounded-full" :class="bill.status === 'pending' ? 'bg-primary' : 'bg-slate-600'"></span>
                                        {{ bill.company }}
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Status Badge -->
                            <div class="px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest border backdrop-blur-md shadow-sm transition-colors duration-300"
                                 :class="bill.status === 'pending'
                                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-amber-500/5 group-hover:bg-amber-500/20'
                                    : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-emerald-500/5'">
                                {{ bill.status === 'pending' ? 'Ödenecek' : 'Ödendi' }}
                            </div>
                        </div>

                        <!-- Invoice Details -->
                        <div class="space-y-4 mb-8 flex-1 bg-surface-dark/30 rounded-xl p-4 border border-white/5">
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-slate-500 font-medium text-xs uppercase tracking-wide">Fatura No</span>
                                <span class="font-mono text-slate-300 tracking-wider">#{{ bill.id }}</span>
                            </div>
                            <div class="w-full h-px bg-slate-700/50 border-t border-dashed border-slate-700/50"></div>
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-slate-500 font-medium text-xs uppercase tracking-wide">Son Ödeme</span>
                                <div class="flex items-center gap-2">
                                    <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" v-if="bill.status === 'pending'"></span>
                                    <span class="font-mono font-bold" :class="bill.status === 'pending' ? 'text-red-400' : 'text-slate-400'">{{ bill.dueDate }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Footer: Amount & Action -->
                        <div class="flex items-end justify-between gap-4">
                            <div class="flex flex-col">
                                <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Toplam Tutar</span>
                                <span class="text-3xl font-bold font-mono tracking-tighter"
                                      :class="bill.status === 'pending' ? 'text-white' : 'text-slate-500 line-through decoration-slate-600 decoration-2'">
                                    {{ store.formatMoney(bill.amount) }}
                                </span>
                            </div>

                            <button v-if="bill.status === 'pending'" @click="payBill(bill)"
                                    class="btn-primary h-12 px-6 flex items-center gap-2 group/btn">
                                <span>Öde</span>
                                <svg class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                            
                            <div v-else class="h-12 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-emerald-400 font-bold text-xs cursor-default">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                Tahsil Edildi
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        const payBill = (bill) => {
            const amount = parseInt(bill.amount);
            
            if (amount > store.user.balance) {
                store.showError('Yetersiz Bakiye', `Bu faturayı ödemek için hesabınızda yeterli bakiye bulunmuyor. Gerekli tutar: ${store.formatMoney(amount)}, Mevcut bakiyeniz: ${store.formatMoney(store.user.balance)}`);
                return;
            }

            store.user.balance -= amount;
            bill.status = 'paid';
            
            store.transactions.unshift({
                id: Date.now(),
                type: 'out',
                title: bill.title,
                amount: amount,
                date: new Date().toLocaleDateString('tr-TR')
            });
        };

        return {
            store,
            payBill
        };
    }
};
