import { store } from '../store.js';

export default {
    template: `
        <div class="grid grid-cols-12 gap-8 h-fit animate-fade-in pb-4">
            <!-- Left Column: Card & Actions -->
            <div class="col-span-12 lg:col-span-8 flex flex-col gap-8">
                <!-- Realistic Credit Card (Theme Compatible) -->
                <div class="transform hover:scale-[1.01] transition-transform duration-500">
                    <credit-card></credit-card>
                </div>

                <!-- Quick Actions -->
                <div>
                    <h3 class="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider pl-1">
                        <span class="w-1 h-4 bg-accent rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></span>
                        Hızlı İşlemler
                    </h3>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <!-- Deposit -->
                        <button @click="openAtmModal('deposit')" 
                                class="group relative overflow-hidden bg-surface-dark/80 backdrop-blur-sm p-4 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10 flex flex-col items-center justify-center gap-3 h-32">
                            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div class="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300 border border-emerald-500/20 shadow-inner relative z-10">
                                <i class="fas fa-arrow-down text-xl"></i>
                            </div>
                            <span class="font-bold text-sm text-slate-300 group-hover:text-white relative z-10">Para Yatır</span>
                        </button>

                        <!-- Withdraw -->
                        <button @click="openAtmModal('withdraw')" 
                                class="group relative overflow-hidden bg-surface-dark/80 backdrop-blur-sm p-4 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-300 shadow-lg hover:shadow-red-500/10 flex flex-col items-center justify-center gap-3 h-32">
                            <div class="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div class="w-12 h-12 bg-red-500/10 text-red-400 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-300 border border-red-500/20 shadow-inner relative z-10">
                                <i class="fas fa-arrow-up text-xl"></i>
                            </div>
                            <span class="font-bold text-sm text-slate-300 group-hover:text-white relative z-10">Para Çek</span>
                        </button>
                        
                        <!-- Transfer -->
                        <button @click="store.currentView = 'transfer'" 
                                class="group relative overflow-hidden bg-surface-dark/80 backdrop-blur-sm p-4 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 flex flex-col items-center justify-center gap-3 h-32">
                            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div class="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300 border border-blue-500/20 shadow-inner relative z-10">
                                <i class="fas fa-paper-plane text-xl"></i>
                            </div>
                            <span class="font-bold text-sm text-slate-300 group-hover:text-white relative z-10">Transfer</span>
                        </button>
                        
                        <!-- Loans -->
                        <button @click="store.currentView = 'loans'" 
                                class="group relative overflow-hidden bg-surface-dark/80 backdrop-blur-sm p-4 rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-300 shadow-lg hover:shadow-accent/10 flex flex-col items-center justify-center gap-3 h-32">
                            <div class="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div class="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300 border border-accent/20 shadow-inner relative z-10">
                                <i class="fas fa-hand-holding-dollar text-xl"></i>
                            </div>
                            <span class="font-bold text-sm text-slate-300 group-hover:text-white relative z-10">Kredi</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Column: Recent Activity -->
            <div class="col-span-12 lg:col-span-4">
                <div class="bg-surface-dark/80 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 shadow-xl flex flex-col h-full relative overflow-hidden">
                    <!-- Header -->
                    <div class="flex justify-between items-center mb-6 shrink-0 relative z-10">
                        <h3 class="text-lg font-bold text-white flex items-center gap-2">
                            <i class="fas fa-history text-slate-400 text-sm"></i>
                            Son İşlemler
                        </h3>
                        <button @click="store.currentView = 'history'" 
                                class="text-xs font-bold text-accent hover:text-white bg-accent/10 hover:bg-accent/20 px-3 py-1.5 rounded-lg transition-all border border-accent/20">
                            Tümünü Gör
                        </button>
                    </div>

                    <!-- List -->
                    <div class="space-y-3 overflow-y-auto custom-scrollbar pr-1 -mr-1 relative z-10 max-h-[400px]">
                        <div v-if="store.transactions.length === 0" class="flex flex-col items-center justify-center py-10 text-slate-500 gap-2">
                            <i class="fas fa-exchange-alt text-2xl opacity-30"></i>
                            <span class="text-xs">Henüz işlem yok</span>
                        </div>

                        <div v-for="t in store.transactions.slice(0, 6)" :key="t.id" 
                             class="flex items-center justify-between p-3 rounded-xl border border-transparent hover:bg-white/5 hover:border-white/5 transition-all group cursor-default">
                            
                            <div class="flex items-center gap-3 min-w-0">
                                <div class="w-10 h-10 rounded-xl flex items-center justify-center border transition-all shrink-0 shadow-sm"
                                     :class="t.type === 'in' 
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/20' 
                                        : 'bg-red-500/10 text-red-400 border-red-500/20 group-hover:bg-red-500/20'">
                                    <i class="fas text-sm" :class="t.type === 'in' ? 'fa-arrow-down' : 'fa-arrow-up'"></i>
                                </div>
                                <div class="min-w-0">
                                    <div class="font-bold text-slate-200 text-sm truncate pr-2 group-hover:text-white transition-colors">{{ t.title }}</div>
                                    <div class="text-[10px] text-slate-500 uppercase tracking-wide font-bold">{{ t.date }}</div>
                                </div>
                            </div>
                            
                            <div class="font-bold font-mono text-sm whitespace-nowrap tracking-tight" 
                                 :class="t.type === 'in' ? 'text-emerald-400' : 'text-slate-300'">
                                {{ t.type === 'out' ? '-' : '+' }}{{ store.formatMoney(t.amount) }}
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Fade -->
                    <div class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none z-20"></div>
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
