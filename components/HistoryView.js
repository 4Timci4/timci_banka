import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../store.js';

export default {
    template: `
        <div class="bg-surface rounded-[2rem] shadow-lg border border-slate-700 overflow-hidden animate-fade-in flex flex-col h-50">
            <div class="p-6 border-b border-slate-700 flex justify-between items-center bg-surface-light">
                <h3 class="text-xl font-bold text-white">İşlem Dökümü</h3>
                <div class="flex gap-2">
                    <button @click="transactionFilter = 'all'"
                            class="px-4 py-2 rounded-lg text-xs font-medium transition-all"
                            :class="transactionFilter === 'all' ? 'bg-surface border border-slate-600 text-slate-300' : 'bg-surface border border-slate-700 text-slate-500 hover:bg-slate-700 hover:text-slate-300'">
                        Tümü
                    </button>
                    <button @click="transactionFilter = 'in'"
                            class="px-4 py-2 rounded-lg text-xs font-medium transition-all"
                            :class="transactionFilter === 'in' ? 'bg-surface border border-slate-600 text-slate-300' : 'bg-surface border border-slate-700 text-slate-500 hover:bg-slate-700 hover:text-slate-300'">
                        Gelen
                    </button>
                    <button @click="transactionFilter = 'out'"
                            class="px-4 py-2 rounded-lg text-xs font-medium transition-all"
                            :class="transactionFilter === 'out' ? 'bg-surface border border-slate-600 text-slate-300' : 'bg-surface border border-slate-700 text-slate-500 hover:bg-slate-700 hover:text-slate-300'">
                        Giden
                    </button>
                </div>
            </div>
            <div class="overflow-y-auto flex-1 custom-scrollbar">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-surface-dark/50 sticky top-0 z-10 backdrop-blur-md">
                        <tr>
                            <th class="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Durum</th>
                            <th class="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Tarih</th>
                            <th class="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Açıklama</th>
                            <th class="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Tutar</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800">
                        <tr v-for="t in paginatedTransactions" :key="t.id" class="hover:bg-white/[0.02] transition-colors group">
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-2">
                                    <div class="w-2 h-2 rounded-full" :class="t.type === 'in' ? 'bg-success shadow-glow-success' : 'bg-slate-500'"></div>
                                    <span class="text-sm font-medium"
                                          :class="t.type === 'in' ? 'text-success' : 'text-slate-400'">
                                        {{ t.type === 'in' ? 'Gelen Transfer' : 'Harcama' }}
                                    </span>
                                </div>
                            </td>
                            <td class="px-4 py-3 text-slate-500 text-sm font-mono">{{ t.date }}</td>
                            <td class="px-4 py-3 font-medium text-slate-300 group-hover:text-white transition-colors">{{ t.title }}</td>
                            <td class="px-4 py-3 text-right font-mono font-bold" :class="t.type === 'in' ? 'text-success' : 'text-slate-200'">
                                {{ t.type === 'out' ? '-' : '+' }}{{ store.formatMoney(t.amount) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Pagination Controls -->
            <div class="border-t border-slate-700 p-3 bg-surface-light">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <span class="text-sm text-slate-400">
                            Toplam {{ filteredTransactions.length }} işlemden {{ ((currentPage - 1) * itemsPerPage) + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredTransactions.length) }} arası gösteriliyor
                        </span>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <button @click="goToPage(1)"
                                :disabled="currentPage === 1"
                                class="px-3 py-1 bg-surface border border-slate-600 rounded-lg text-sm text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>
                        </button>
                        <button @click="prevPage"
                                :disabled="currentPage === 1"
                                class="px-3 py-1 bg-surface border border-slate-600 rounded-lg text-sm text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        
                        <div class="flex items-center gap-1">
                            <template v-for="page in 5" :key="page">
                                <button v-if="page <= totalPages"
                                        @click="goToPage(page)"
                                        :class="currentPage === page ? 'bg-primary text-white' : 'bg-surface text-slate-300 hover:bg-slate-700'"
                                        class="px-3 py-1 border border-slate-600 rounded-lg text-sm font-medium transition-colors">
                                    {{ page }}
                                </button>
                            </template>
                            <span v-if="totalPages > 5" class="text-slate-500">...</span>
                            <button v-if="totalPages > 5" @click="goToPage(totalPages)"
                                    :class="currentPage === totalPages ? 'bg-primary text-white' : 'bg-surface text-slate-300 hover:bg-slate-700'"
                                    class="px-3 py-1 border border-slate-600 rounded-lg text-sm font-medium transition-colors">
                                {{ totalPages }}
                            </button>
                        </div>
                        
                        <button @click="nextPage"
                                :disabled="currentPage === totalPages"
                                class="px-3 py-1 bg-surface border border-slate-600 rounded-lg text-sm text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        <button @click="goToPage(totalPages)"
                                :disabled="currentPage === totalPages"
                                class="px-3 py-1 bg-surface border border-slate-600 rounded-lg text-sm text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        const transactionFilter = ref('all');
        const currentPage = ref(1);
        const itemsPerPage = ref(8);

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
            goToPage,
            nextPage,
            prevPage
        };
    }
};
