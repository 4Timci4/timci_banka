import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
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

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div v-for="bill in paginatedBills" :key="bill.id"
                     class="group bg-surface border border-slate-700 rounded-xl p-4 transition-all duration-300 hover:border-slate-600 hover:shadow-lg"
                     :class="bill.status === 'paid' ? 'opacity-70' : ''">
                    
                    <!-- Card Header -->
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                                 :class="bill.categoryColor + ' bg-opacity-20'">
                                <span v-html="bill.icon"></span>
                            </div>
                            <div>
                                <h4 class="font-semibold text-white text-sm">{{ bill.title }}</h4>
                                <p class="text-xs text-slate-400">{{ bill.company }}</p>
                            </div>
                        </div>
                        
                        <div class="text-xs px-2 py-1 rounded-md"
                             :class="bill.status === 'pending'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-emerald-500/20 text-emerald-400'">
                            {{ bill.status === 'pending' ? 'Bekliyor' : 'Ödendi' }}
                        </div>
                    </div>

                    <!-- Card Details -->
                    <div class="space-y-2 mb-4">
                        <div class="flex justify-between text-xs">
                            <span class="text-slate-500">Fatura No</span>
                            <span class="text-slate-300 font-mono">#{{ bill.id }}</span>
                        </div>
                        <div class="flex justify-between text-xs">
                            <span class="text-slate-500">Son Ödeme</span>
                            <span :class="bill.status === 'pending' ? 'text-red-400 font-medium' : 'text-slate-400'">
                                {{ bill.dueDate }}
                            </span>
                        </div>
                    </div>

                    <!-- Card Footer -->
                    <div class="flex items-center justify-between pt-3 border-t border-slate-700/50">
                        <div>
                            <div class="text-xl font-bold text-white"
                                 :class="bill.status === 'paid' ? 'line-through decoration-slate-600' : ''">
                                {{ store.formatMoney(bill.amount) }}
                            </div>
                        </div>

                        <button v-if="bill.status === 'pending'"
                                @click="payBill(bill)"
                                class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                            Öde
                        </button>
                        
                        <div v-else class="flex items-center gap-1 text-emerald-400 text-xs">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Ödendi</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-8">
                <button @click="goToPage(currentPage - 1)"
                        :disabled="currentPage === 1"
                        class="w-10 h-10 rounded-lg bg-surface border border-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors duration-200">
                    <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>

                <button v-for="page in visiblePages" :key="page"
                        @click="goToPage(page)"
                        class="w-10 h-10 rounded-lg text-sm font-medium transition-colors duration-200"
                        :class="page === currentPage
                            ? 'bg-primary text-white'
                            : 'bg-surface border border-slate-700 text-slate-300 hover:bg-slate-700'">
                    {{ page }}
                </button>

                <button @click="goToPage(currentPage + 1)"
                        :disabled="currentPage === totalPages"
                        class="w-10 h-10 rounded-lg bg-surface border border-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors duration-200">
                    <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>
    `,
    setup() {
        const currentPage = ref(1);
        const itemsPerPage = 6;

        const totalPages = computed(() => {
            return Math.ceil(store.bills.length / itemsPerPage);
        });

        const paginatedBills = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return store.bills.slice(start, end);
        });

        const visiblePages = computed(() => {
            const total = totalPages.value;
            const current = currentPage.value;
            const pages = [];

            if (total <= 5) {
                for (let i = 1; i <= total; i++) {
                    pages.push(i);
                }
            } else {
                if (current <= 3) {
                    for (let i = 1; i <= 5; i++) {
                        pages.push(i);
                    }
                } else if (current >= total - 2) {
                    for (let i = total - 4; i <= total; i++) {
                        pages.push(i);
                    }
                } else {
                    for (let i = current - 2; i <= current + 2; i++) {
                        pages.push(i);
                    }
                }
            }

            return pages;
        });

        const goToPage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
            }
        };

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
            payBill,
            currentPage,
            totalPages,
            paginatedBills,
            visiblePages,
            goToPage
        };
    }
};
