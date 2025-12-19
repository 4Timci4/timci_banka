import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../store.js';

export default {
    template: `
        <div class="animate-fade-in pb-10 space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-2 px-1">
                <div>
                    <h3 class="text-2xl font-bold text-white tracking-tight">Krediler & Finansman</h3>
                    <p class="text-slate-400 text-sm mt-1">Nakit ihtiyaçlarınız için size özel çözümler</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                <!-- Left: Loan Calculator (7 cols) -->
                <div class="lg:col-span-7 flex flex-col">
                    <div class="bg-surface border border-slate-700 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex-1 flex flex-col justify-between group">
                        <!-- Decorative Backgrounds -->
                        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
                        <div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>
                        
                        <!-- Content -->
                        <div class="relative z-10">
                            <div class="flex items-center gap-4 mb-8">
                                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center text-white shadow-lg shadow-accent/20">
                                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-white">İhtiyaç Kredisi</h3>
                                    <div class="flex items-center gap-2">
                                        <span class="px-2 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider border border-accent/20">Ön Onaylı</span>
                                        <span class="text-slate-500 text-sm">Hemen hesabınızda</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Amount Selector -->
                            <div class="mb-10 text-center">
                                <span class="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 block">Kullanılacak Tutar</span>
                                <div class="text-5xl lg:text-6xl font-bold text-white font-mono tracking-tight mb-8 drop-shadow-lg">
                                    {{ store.formatMoney(parseInt(loanForm.amount) || 0) }}
                                </div>
                                
                                <div class="px-4">
                                    <div class="relative h-14 flex items-center group/slider">
                                        <!-- Track Background -->
                                        <div class="absolute inset-x-0 h-4 bg-surface-dark rounded-full border border-slate-700 overflow-hidden">
                                            <div class="h-full bg-gradient-to-r from-accent/50 to-accent w-full origin-left transform scale-x-0 transition-transform duration-75 ease-out"
                                                 :style="{ transform: \`scaleX(\${(parseInt(loanForm.amount) - 1000) / 49000})\` }"></div>
                                        </div>
                                        <!-- Native Input -->
                                        <input type="range" v-model="loanForm.amount" min="1000" max="50000" step="500"
                                               class="w-full absolute inset-0 opacity-0 cursor-pointer z-20">
                                        <!-- Thumb (Visual Only - Follows Input) -->
                                        <div class="absolute h-8 w-8 bg-white rounded-full shadow-lg shadow-black/50 border-4 border-accent z-10 pointer-events-none transition-all duration-75 ease-out"
                                             :style="{ left: \`calc(\${((parseInt(loanForm.amount) - 1000) / 49000) * 100}% - 16px)\` }"></div>
                                    </div>
                                    <div class="flex justify-between text-xs text-slate-500 font-bold font-mono mt-2 px-1">
                                        <span>$1,000</span>
                                        <span>$50,000</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Details Grid -->
                            <div class="grid grid-cols-3 gap-4 mb-8">
                                <div class="bg-surface-dark/50 p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center gap-1 backdrop-blur-sm">
                                    <span class="text-xs text-slate-500 uppercase font-bold">Faiz</span>
                                    <span class="text-lg font-bold text-accent font-mono">%5.5</span>
                                </div>
                                <div class="bg-surface-dark/50 p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center gap-1 backdrop-blur-sm">
                                    <span class="text-xs text-slate-500 uppercase font-bold">Vade</span>
                                    <span class="text-lg font-bold text-white font-mono">12 Ay</span>
                                </div>
                                <div class="bg-surface-dark/50 p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center gap-1 backdrop-blur-sm">
                                    <span class="text-xs text-slate-500 uppercase font-bold">Geri Ödeme</span>
                                    <span class="text-lg font-bold text-white font-mono">{{ store.formatMoney(Math.round((parseInt(loanForm.amount) || 0) * 1.055)) }}</span>
                                </div>
                            </div>
                        </div>

                        <button @click="applyLoan"
                                class="w-full bg-gradient-to-r from-accent to-yellow-400 text-slate-900 font-bold text-lg py-5 rounded-2xl shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 relative overflow-hidden group/btn"
                                :disabled="!loanForm.amount || parseInt(loanForm.amount) < 1000"
                                :class="!loanForm.amount || parseInt(loanForm.amount) < 1000 ? 'opacity-50 cursor-not-allowed grayscale' : ''">
                            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                            <span class="relative z-10 flex items-center justify-center gap-2">
                                Krediyi Hemen Kullan
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                            </span>
                        </button>
                    </div>
                </div>

                <!-- Right: Active Loans (5 cols) -->
                <div class="lg:col-span-5 flex flex-col h-full">
                     <div class="bg-surface border border-slate-700 rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col h-full relative">
                        <div class="p-8 pb-4 bg-surface relative z-10">
                            <h3 class="text-xl font-bold text-white flex items-center gap-2">
                                Aktif Kredilerim
                                <span class="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-mono">{{ store.loans.length }}</span>
                            </h3>
                        </div>
                        
                        <!-- Empty State -->
                        <div v-if="store.loans.length === 0" class="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-50">
                            <div class="w-24 h-24 rounded-full bg-slate-800/50 border border-slate-700 border-dashed flex items-center justify-center mb-4">
                                <svg class="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <h4 class="text-white font-bold text-lg">Aktif Kredi Yok</h4>
                            <p class="text-slate-500 text-sm mt-1 max-w-[200px]">Şu anda ödenmesi gereken bir kredi borcunuz bulunmuyor.</p>
                        </div>

                        <!-- List -->
                        <div v-else class="flex-1 overflow-y-auto px-6 pb-6 space-y-4 custom-scrollbar relative z-10">
                            <div v-for="loan in store.loans" :key="loan.id"
                                 class="group bg-surface-dark border border-slate-700 hover:border-primary/50 rounded-[1.5rem] p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden">
                                
                                <!-- Progress Bar Background -->
                                <div class="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
                                     <div class="h-full bg-primary shadow-[0_0_10px_rgba(37,99,235,0.5)] transition-all duration-1000"
                                          :style="{ width: (loan.remainingAmount / loan.totalAmount * 100) + '%' }"></div>
                                </div>

                                <div class="flex justify-between items-start mb-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                        </div>
                                        <div>
                                            <h4 class="font-bold text-slate-200 text-sm">İhtiyaç Kredisi</h4>
                                            <span class="text-[10px] text-slate-500 font-mono">{{ loan.date }}</span>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-[10px] text-slate-500 uppercase block font-bold">Kalan</span>
                                        <span class="text-lg font-bold text-white font-mono tracking-tight">{{ store.formatMoney(loan.remainingAmount) }}</span>
                                    </div>
                                </div>

                                <div class="flex items-end justify-between gap-3">
                                    <div class="flex-1 bg-surface rounded-xl p-2 border border-slate-700/50">
                                        <span class="text-[10px] text-slate-500 block mb-0.5">Sonraki Taksit</span>
                                        <span class="text-sm font-bold text-white font-mono">{{ store.formatMoney(loan.nextInstallment) }}</span>
                                    </div>
                                    <button class="bg-slate-800 hover:bg-primary text-slate-300 hover:text-white px-4 py-3 rounded-xl font-bold text-xs transition-colors border border-slate-700 hover:border-primary/50 shadow-sm">
                                        Öde
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Fade for scroll -->
                        <div class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-surface to-transparent pointer-events-none z-20" v-if="store.loans.length > 0"></div>
                     </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        const loanForm = ref({
            amount: '10000'
        });

        const applyLoan = () => {
            const amount = parseInt(loanForm.value.amount);
            const interest = amount * 1.055;
            
            store.loans.push({
                id: Date.now(),
                totalAmount: Math.round(interest),
                remainingAmount: Math.round(interest),
                nextInstallment: Math.round(interest / 12),
                date: new Date().toLocaleDateString('tr-TR')
            });
            
            store.user.balance += amount;
            
            // Add transaction log
            store.transactions.unshift({
                id: Date.now(),
                type: 'in',
                title: 'Kredi Kullanımı',
                amount: amount,
                date: new Date().toLocaleDateString('tr-TR')
            });

            store.currentView = 'loans';
        };

        return {
            store,
            loanForm,
            applyLoan
        };
    }
};
