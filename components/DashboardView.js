import { store } from '../store.js';

export default {
    template: `
        <div class="grid grid-cols-12 gap-8 h-fit animate-fade-in pb-4">
            <!-- Left Column: Card & Actions -->
            <div class="col-span-12 lg:col-span-8 flex flex-col gap-6">
                <!-- Realistic Credit Card (Theme Compatible) -->
                <credit-card></credit-card>

                <!-- Quick Actions -->
                <div>
                    <h3 class="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                        <span class="w-1 h-4 bg-accent rounded-full"></span>
                        Hızlı İşlemler
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        <button @click="openAtmModal('deposit')" class="relative overflow-hidden bg-surface p-4 rounded-2xl border border-slate-700 hover:border-success/50 transition-all group shadow-lg flex flex-col items-center justify-center gap-2 h-28 w-5/12">
                            <div class="w-10 h-10 bg-success/10 text-success rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-success/20">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            </div>
                            <div class="text-center">
                                <span class="block font-bold text-sm text-slate-200 group-hover:text-white">Para Yatır</span>
                            </div>
                        </button>

                        <button @click="openAtmModal('withdraw')" class="relative overflow-hidden bg-surface p-4 rounded-2xl border border-slate-700 hover:border-red-500/50 transition-all group shadow-lg flex flex-col items-center justify-center gap-2 h-28 w-5/12">
                            <div class="w-10 h-10 bg-red-500/10 text-red-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-red-500/20">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                            </div>
                            <div class="text-center">
                                <span class="block font-bold text-sm text-slate-200 group-hover:text-white">Para Çek</span>
                            </div>
                        </button>
                        
                        <button @click="store.currentView = 'transfer'" class="relative overflow-hidden bg-surface p-4 rounded-2xl border border-slate-700 hover:border-primary/50 transition-all group shadow-lg flex flex-col items-center justify-center gap-2 h-28 w-5/12">
                            <div class="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                            </div>
                            <div class="text-center">
                                <span class="block font-bold text-sm text-slate-200 group-hover:text-white">Para Transferi</span>
                            </div>
                        </button>
                        
                        <button @click="store.currentView = 'loans'" class="relative overflow-hidden bg-surface p-4 rounded-2xl border border-slate-700 hover:border-accent/50 transition-all group shadow-lg flex flex-col items-center justify-center gap-2 h-28 w-5/12">
                            <div class="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-accent/20">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div class="text-center">
                                <span class="block font-bold text-sm text-slate-200 group-hover:text-white">Kredi Başvurusu</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Column: Recent Activity -->
            <div class="col-span-12 lg:col-span-4">
                <div class="bg-surface p-6 rounded-3xl border border-slate-700 shadow-lg flex flex-col h-fit">
                    <div class="flex justify-between items-center mb-6 shrink-0">
                        <h3 class="text-lg font-bold text-white">Son İşlemler</h3>
                        <button @click="store.currentView = 'history'" class="text-xs text-primary hover:text-primary-light font-medium">Tümünü Gör</button>
                    </div>
                    <div class="space-y-2 overflow-hidden">
                        <div v-for="t in store.transactions.slice(0, 5)" :key="t.id" class="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors group cursor-default">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full flex items-center justify-center border transition-colors shrink-0"
                                     :class="t.type === 'in' ? 'bg-success/10 text-success border-success/20 group-hover:border-success/50' : 'bg-white/5 text-slate-400 border-slate-700 group-hover:border-slate-500'">
                                    <svg v-if="t.type === 'in'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                </div>
                                <div class="min-w-0">
                                    <div class="font-medium text-slate-200 text-sm truncate pr-2">{{ t.title }}</div>
                                    <div class="text-[10px] text-slate-500 uppercase tracking-wide">{{ t.date }}</div>
                                </div>
                            </div>
                            <div class="font-bold font-mono text-sm whitespace-nowrap" :class="t.type === 'in' ? 'text-success' : 'text-slate-300'">
                                {{ t.type === 'out' ? '-' : '+' }}{{ store.formatMoney(t.amount) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        const openAtmModal = (mode) => {
            store.atmMode = mode;
            store.showAtmModal = true;
            store.atmAmount = '';
        };

        return {
            store,
            openAtmModal
        };
    }
};
