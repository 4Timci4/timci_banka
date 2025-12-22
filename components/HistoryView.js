import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../store.js';

export default {
    template: `
        <div class="bg-surface-dark/80 backdrop-blur-md rounded-[2rem] shadow-2xl border border-white/5 overflow-hidden animate-fade-in flex flex-col h-fit relative">
            <!-- Decorative Background -->
            <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

            <!-- Header -->
            <div class="p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white shadow-lg border border-white/10">
                        <i class="fas fa-history text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-white tracking-tight">İşlem Geçmişi</h3>
                        <p class="text-sm text-slate-400">Hesap hareketlerinizi inceleyin</p>
                    </div>
                </div>

                <!-- Filters -->
                <div class="flex bg-black/20 p-1.5 rounded-xl border border-white/5">
                    <button @click="setFilter('all')"
                            class="px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-2"
                            :class="transactionFilter === 'all' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'">
                        <i class="fas fa-list"></i>
                        <span>Tümü</span>
                    </button>
                    <button @click="setFilter('in')"
                            class="px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-2"
                            :class="transactionFilter === 'in' ? 'bg-emerald-500/10 text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'">
                        <i class="fas fa-arrow-down"></i>
                        <span>Gelen</span>
                    </button>
                    <button @click="setFilter('out')"
                            class="px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-2"
                            :class="transactionFilter === 'out' ? 'bg-red-500/10 text-red-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'">
                        <i class="fas fa-arrow-up"></i>
                        <span>Giden</span>
                    </button>
                </div>
            </div>

            <!-- List Content -->
            <div class="flex-1 overflow-y-auto custom-scrollbar relative z-10 min-h-[400px]">
                <!-- Empty State -->
                <div v-if="filteredTransactions.length === 0" class="flex flex-col items-center justify-center h-full py-20 text-slate-500 gap-4">
                    <div class="w-16 h-16 rounded-full bg-white/5 border border-white/10 border-dashed flex items-center justify-center">
                        <i class="fas fa-search text-2xl opacity-30"></i>
                    </div>
                    <div class="text-center">
                        <h4 class="text-white font-bold text-base">İşlem Bulunamadı</h4>
                        <p class="text-xs mt-1">Seçilen kriterlere uygun işlem kaydı yok.</p>
                    </div>
                </div>

                <!-- Transactions List -->
                <div v-else class="p-3 space-y-1.5">
                    <div v-for="t in paginatedTransactions" :key="t.id"
                         class="group flex items-center justify-between p-3 rounded-xl border border-transparent hover:bg-white/[0.03] hover:border-white/5 transition-all duration-300 cursor-default relative overflow-hidden">
                        
                        <!-- Hover Glow -->
                        <div class="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                        <div class="flex items-center gap-4 relative z-10">
                            <!-- Icon -->
                            <div class="w-10 h-10 rounded-xl flex items-center justify-center border transition-all shadow-sm shrink-0"
                                 :class="t.type === 'in'
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:scale-105'
                                    : 'bg-red-500/10 text-red-400 border-red-500/20 group-hover:bg-red-500/20 group-hover:scale-105'">
                                <i class="fas text-sm" :class="t.type === 'in' ? 'fa-arrow-down' : 'fa-arrow-up'"></i>
                            </div>

                            <!-- Details -->
                            <div>
                                <h4 class="font-bold text-slate-200 text-sm group-hover:text-white transition-colors">{{ t.title }}</h4>
                                <div class="flex items-center gap-2 mt-0.5">
                                    <span class="text-[9px] font-bold px-1.5 py-0.5 rounded border"
                                          :class="t.type === 'in'
                                            ? 'bg-emerald-500/5 text-emerald-500/80 border-emerald-500/10'
                                            : 'bg-red-500/5 text-red-500/80 border-red-500/10'">
                                        {{ t.type === 'in' ? 'GELEN' : 'GİDEN' }}
                                    </span>
                                    <span class="text-[10px] text-slate-500 font-mono">{{ t.date }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Amount -->
                        <div class="text-right relative z-10">
                            <div class="text-base font-bold font-mono tracking-tight transition-all group-hover:scale-105 origin-right"
                                 :class="t.type === 'in' ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.2)]' : 'text-slate-300'">
                                {{ t.type === 'out' ? '-' : '+' }}{{ store.formatMoney(t.amount) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Pagination Controls -->
            <div v-if="totalPages > 1" class="border-t border-white/5 p-4 bg-black/20 backdrop-blur-md flex items-center justify-between relative z-20">
                <div class="text-xs text-slate-500 font-medium pl-2">
                    Toplam <span class="text-white font-bold">{{ filteredTransactions.length }}</span> işlem
                </div>
                
                <div class="flex items-center gap-2">
                    <button @click="prevPage" :disabled="currentPage === 1"
                            class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95">
                        <i class="fas fa-chevron-left text-xs"></i>
                    </button>
                    
                    <div class="flex items-center gap-1 px-2">
                        <span class="text-sm font-bold text-white">{{ currentPage }}</span>
                        <span class="text-xs text-slate-600">/</span>
                        <span class="text-xs text-slate-500">{{ totalPages }}</span>
                    </div>

                    <button @click="nextPage" :disabled="currentPage === totalPages"
                            class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95">
                        <i class="fas fa-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    setup() {
        const transactionFilter = ref('all');
        const currentPage = ref(1);
        const itemsPerPage = ref(5);

        const filteredTransactions = computed(() => {
            if (transactionFilter.value === 'all') {
                return store.transactions;
            } else if (transactionFilter.value === 'in') {
                return store.transactions.filter(t => t.type === 'in');
            } else {
                return store.transactions.filter(t => t.type === 'out');
            }
        });

        const totalPages = computed(() => {
            return Math.ceil(filteredTransactions.value.length / itemsPerPage.value);
        });

        const paginatedTransactions = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return filteredTransactions.value.slice(start, end);
        });

        const setFilter = (filter) => {
            transactionFilter.value = filter;
            currentPage.value = 1; // Reset to first page on filter change
        };

        const goToPage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
            }
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        return {
            store,
            transactionFilter,
            currentPage,
            itemsPerPage,
            filteredTransactions,
            totalPages,
            paginatedTransactions,
            setFilter,
            goToPage,
            nextPage,
            prevPage
        };
    }
};
