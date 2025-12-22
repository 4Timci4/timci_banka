import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../store.js';

export default {
    template: `
        <div class="animate-fade-in pb-10 h-fit flex flex-col">
            <!-- Header Section -->
            <div class="flex items-center justify-between mb-6 px-1 shrink-0">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <i class="fas fa-file-invoice-dollar text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-white tracking-tight">Faturalar</h3>
                        <p class="text-slate-400 text-sm mt-1">Bekleyen ödemelerinizi yönetin</p>
                    </div>
                </div>
                
                <!-- Filter & Actions -->
                <div class="flex items-center gap-3">
                    <div class="bg-black/20 p-1 rounded-xl border border-white/10 flex items-center">
                        <button @click="setFilter('all')"
                                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300"
                                :class="filter === 'all' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'">
                            Tümü
                        </button>
                        <button @click="setFilter('pending')"
                                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300"
                                :class="filter === 'pending' ? 'bg-amber-500/20 text-amber-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'">
                            Bekleyenler
                        </button>
                    </div>
                    
                    <button v-if="pendingTotal > 0" 
                            @click="payAllBills"
                            class="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2">
                        <i class="fas fa-check-double"></i>
                        Tümünü Öde ({{ store.formatMoney(pendingTotal) }})
                    </button>
                </div>
            </div>

            <!-- Bills Grid -->
            <div class="overflow-y-auto custom-scrollbar pr-2 -mr-2 mb-4">
                <div v-if="filteredBills.length === 0" class="flex flex-col items-center justify-center py-12 text-slate-500 gap-3">
                    <div class="w-16 h-16 rounded-full bg-white/5 border border-white/15 border-dashed flex items-center justify-center">
                        <i class="fas fa-clipboard-check text-2xl opacity-50"></i>
                    </div>
                    <span class="text-sm font-medium">Görüntülenecek fatura bulunmuyor</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
                    <div v-for="bill in paginatedBills" :key="bill.id"
                         class="group bg-surface-dark/80 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.02] relative overflow-hidden"
                         :class="bill.status === 'paid' ? 'opacity-60 grayscale-[0.5]' : 'hover:shadow-xl hover:shadow-black/20'">
                        
                        <!-- Status Stripe -->
                        <div class="absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300"
                             :class="bill.status === 'pending' ? 'bg-amber-500' : 'bg-emerald-500'"></div>

                        <!-- Card Header -->
                        <div class="flex items-start justify-between mb-4 pl-2">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-inner border border-white/10"
                                     :class="getCategoryStyle(bill.icon).bg">
                                    <span v-html="bill.icon" :class="getCategoryStyle(bill.icon).text"></span>
                                </div>
                                <div>
                                    <h4 class="font-bold text-white text-sm tracking-wide">{{ bill.title }}</h4>
                                    <p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-0.5">{{ bill.company }}</p>
                                </div>
                            </div>
                            
                            <div class="flex flex-col items-end">
                                <span class="text-xs font-bold px-2 py-1 rounded-lg border"
                                      :class="bill.status === 'pending' 
                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'">
                                    {{ bill.status === 'pending' ? 'Ödeme Bekliyor' : 'Ödendi' }}
                                </span>
                            </div>
                        </div>

                        <!-- Card Details -->
                        <div class="grid grid-cols-2 gap-2 mb-4 pl-2">
                            <div class="bg-black/20 rounded-lg p-2 border border-white/10">
                                <span class="text-[9px] text-slate-500 uppercase font-bold block mb-0.5">Fatura No</span>
                                <span class="text-xs text-slate-300 font-mono">#{{ bill.id }}</span>
                            </div>
                            <div class="bg-black/20 rounded-lg p-2 border border-white/10">
                                <span class="text-[9px] text-slate-500 uppercase font-bold block mb-0.5">Son Ödeme</span>
                                <span class="text-xs font-mono" :class="bill.status === 'pending' ? 'text-red-400 font-bold' : 'text-slate-400'">
                                    {{ bill.dueDate }}
                                </span>
                            </div>
                        </div>

                        <!-- Card Footer -->
                        <div class="flex items-center justify-between pt-3 border-t border-white/10 pl-2">
                            <div>
                                <div class="text-[10px] text-slate-500 uppercase font-bold mb-0.5">Tutar</div>
                                <div class="text-xl font-bold text-white font-mono tracking-tight"
                                     :class="bill.status === 'paid' ? 'line-through decoration-slate-600 text-slate-500' : ''">
                                    {{ store.formatMoney(bill.amount) }}
                                </div>
                            </div>

                            <button v-if="bill.status === 'pending'"
                                    @click="payBill(bill)"
                                    class="group/btn bg-white text-slate-900 hover:bg-primary hover:text-white px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 shadow-lg shadow-white/5 hover:shadow-primary/30 active:scale-95 flex items-center gap-2">
                                <span>ÖDE</span>
                                <i class="fas fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
                            </button>
                            
                            <div v-else class="flex items-center gap-1.5 text-emerald-500 text-xs font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                                <i class="fas fa-check-circle"></i>
                                <span>Tahsil Edildi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="pt-2 border-t border-white/10 flex items-center justify-center gap-4 shrink-0 mt-auto">
                <button @click="prevPage" :disabled="currentPage === 1"
                        class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <i class="fas fa-chevron-left text-xs"></i>
                </button>
                <span class="text-xs font-mono text-slate-500">
                    {{ currentPage }} / {{ totalPages }}
                </span>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                        class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <i class="fas fa-chevron-right text-xs"></i>
                </button>
            </div>
        </div>
    `,
    setup() {
        const filter = ref('all'); // 'all' | 'pending'
        const currentPage = ref(1);
        const itemsPerPage = 6;

        const filteredBills = computed(() => {
            if (filter.value === 'pending') {
                return store.bills.filter(bill => bill.status === 'pending');
            }
            return store.bills;
        });

        const totalPages = computed(() => Math.ceil(filteredBills.value.length / itemsPerPage));

        const paginatedBills = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return filteredBills.value.slice(start, end);
        });

        const nextPage = () => {
            if (currentPage.value < totalPages.value) currentPage.value++;
        };

        const prevPage = () => {
            if (currentPage.value > 1) currentPage.value--;
        };

        // Reset page when filter changes
        const setFilter = (newFilter) => {
            filter.value = newFilter;
            currentPage.value = 1;
        };

        const pendingTotal = computed(() => {
            return store.bills
                .filter(bill => bill.status === 'pending')
                .reduce((total, bill) => total + parseInt(bill.amount), 0);
        });

        const getCategoryStyle = (iconHtml) => {
            // Simple heuristic based on icon content or you could add a 'type' field to bill data
            if (iconHtml.includes('bolt')) return { bg: 'bg-yellow-500/20', text: 'text-yellow-500' }; // Electricity
            if (iconHtml.includes('tint')) return { bg: 'bg-blue-500/20', text: 'text-blue-400' }; // Water
            if (iconHtml.includes('wifi')) return { bg: 'bg-indigo-500/20', text: 'text-indigo-400' }; // Internet
            if (iconHtml.includes('mobile')) return { bg: 'bg-purple-500/20', text: 'text-purple-400' }; // Phone
            return { bg: 'bg-slate-700/50', text: 'text-slate-300' }; // Default
        };

        const payBill = (bill) => {
            const amount = parseInt(bill.amount);
            
            if (amount > store.user.balance) {
                store.showError('Yetersiz Bakiye', `Bu faturayı ödemek için hesabınızda yeterli bakiye bulunmuyor.`);
                return;
            }

            store.user.balance -= amount;
            bill.status = 'paid';
            
            store.transactions.unshift({
                id: Date.now(),
                type: 'out',
                title: 'Fatura Ödemesi: ' + bill.title,
                amount: amount,
                date: new Date().toLocaleDateString('tr-TR')
            });
        };

        const payAllBills = () => {
            const total = pendingTotal.value;
            if (total > store.user.balance) {
                store.showError('Yetersiz Bakiye', `Tüm faturaları ödemek için hesabınızda yeterli bakiye bulunmuyor.`);
                return;
            }

            store.bills.forEach(bill => {
                if (bill.status === 'pending') {
                    bill.status = 'paid';
                }
            });

            store.user.balance -= total;
            
            store.transactions.unshift({
                id: Date.now(),
                type: 'out',
                title: 'Toplu Fatura Ödemesi',
                amount: total,
                date: new Date().toLocaleDateString('tr-TR')
            });
        };

        return {
            store,
            filter,
            filteredBills,
            paginatedBills,
            currentPage,
            totalPages,
            nextPage,
            prevPage,
            setFilter,
            pendingTotal,
            getCategoryStyle,
            payBill,
            payAllBills
        };
    }
};
