import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../store.js';

export default {
    template: `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in pb-10">
            <!-- Left: Loan Calculator -->
            <div class="bg-surface border border-slate-700 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col justify-between group h-[370px]">
                <!-- Decorative Backgrounds (Scaled down) -->
                <div class="absolute top-0 right-0 w-[350px] h-[350px] bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
                <div class="absolute bottom-0 left-0 w-[250px] h-[250px] bg-primary/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>
                
                <!-- Content -->
                <div class="relative z-10 flex flex-col h-full">
                    <!-- Top Info -->
                    <div class="flex items-center gap-3 mb-4 shrink-0">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center text-white shadow-lg shadow-accent/20">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div>
                            <h3 class="text-base font-bold text-white">İhtiyaç Kredisi</h3>
                            <div class="flex items-center gap-2">
                                <span class="px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[9px] font-bold uppercase tracking-wider border border-accent/20">Ön Onaylı</span>
                            </div>
                        </div>
                    </div>

                    <!-- Amount Selector (Centered & Compact) -->
                    <div class="flex-1 flex flex-col justify-center mb-4">
                        <div class="text-center">
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Kullanılacak Tutar</span>
                            <div class="text-3xl lg:text-4xl font-bold text-white font-mono tracking-tight mb-4 drop-shadow-lg">
                                {{ store.formatMoney(parseInt(loanForm.amount) || 0) }}
                            </div>
                            
                            <div class="px-2">
                                <div class="relative h-8 flex items-center group/slider">
                                    <!-- Track -->
                                    <div class="absolute inset-x-0 h-2 bg-surface-dark rounded-full border border-slate-700 overflow-hidden">
                                        <div class="h-full bg-gradient-to-r from-accent/50 to-accent w-full origin-left transform scale-x-0 transition-transform duration-75 ease-out"
                                             :style="{ transform: 'scaleX(' + ((parseInt(loanForm.amount) - 1000) / 49000) + ')' }"></div>
                                    </div>
                                    <!-- Input -->
                                    <input type="range" v-model="loanForm.amount" min="1000" max="50000" step="500"
                                           class="w-full absolute inset-0 opacity-0 cursor-pointer z-20">
                                    <!-- Thumb -->
                                    <div class="absolute h-5 w-5 bg-white rounded-full shadow-lg shadow-black/50 border-4 border-accent z-10 pointer-events-none transition-all duration-75 ease-out"
                                         :style="{ left: 'calc(' + (((parseInt(loanForm.amount) - 1000) / 49000) * 100) + '% - 10px)' }"></div>
                                </div>
                                <div class="flex justify-between text-[9px] text-slate-500 font-bold font-mono mt-1 px-1">
                                    <span>$1,000</span>
                                    <span>$50,000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Details Grid -->
                    <div class="grid grid-cols-3 gap-2 mb-4 shrink-0">
                        <div class="bg-surface-dark/50 p-2 rounded-lg border border-slate-700/50 flex flex-col items-center justify-center gap-0.5 backdrop-blur-sm">
                            <span class="text-[9px] text-slate-500 uppercase font-bold">Faiz</span>
                            <span class="text-sm font-bold text-accent font-mono">%5.5</span>
                        </div>
                        <div class="bg-surface-dark/50 p-2 rounded-lg border border-slate-700/50 flex flex-col items-center justify-center gap-0.5 backdrop-blur-sm">
                            <span class="text-[9px] text-slate-500 uppercase font-bold">Vade</span>
                            <span class="text-sm font-bold text-white font-mono">12 Ay</span>
                        </div>
                        <div class="bg-surface-dark/50 p-2 rounded-lg border border-slate-700/50 flex flex-col items-center justify-center gap-0.5 backdrop-blur-sm">
                            <span class="text-[9px] text-slate-500 uppercase font-bold">Toplam</span>
                            <span class="text-sm font-bold text-white font-mono">{{ store.formatMoney(Math.round((parseInt(loanForm.amount) || 0) * 1.055)) }}</span>
                        </div>
                    </div>

                    <!-- Action Button -->
                    <button @click="applyLoan"
                            class="w-full bg-gradient-to-r from-accent to-yellow-400 text-slate-900 font-bold text-sm py-2.5 rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 relative overflow-hidden group/btn shrink-0 mt-auto"
                            :disabled="!loanForm.amount || parseInt(loanForm.amount) < 1000"
                            :class="!loanForm.amount || parseInt(loanForm.amount) < 1000 ? 'opacity-50 cursor-not-allowed grayscale' : ''">
                        <div class="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                        <span class="relative z-10 flex items-center justify-center gap-2">
                            Krediyi Onayla
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                        </span>
                    </button>
                </div>
            </div>

            <!-- Right: Active Loans -->
            <div class="flex flex-col h-[370px]">
                 <div class="bg-surface border border-slate-700 rounded-[2rem] shadow-xl overflow-hidden flex flex-col h-full relative">
                    <div class="p-5 pb-3 bg-surface relative z-10 shrink-0">
                        <h3 class="text-base font-bold text-white flex items-center gap-2">
                            Aktif Kredilerim
                            <span class="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono">{{ store.loans.length }}</span>
                        </h3>
                    </div>
                    
                    <!-- Empty State -->
                    <div v-if="store.loans.length === 0" class="flex-1 flex flex-col items-center justify-center p-6 text-center opacity-50">
                        <div class="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 border-dashed flex items-center justify-center mb-3">
                            <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <h4 class="text-white font-bold text-sm">Aktif Kredi Yok</h4>
                        <p class="text-slate-500 text-xs mt-1 max-w-[150px]">Şu anda ödenmesi gereken bir kredi borcunuz bulunmuyor.</p>
                    </div>

                    <!-- List -->
                    <div v-else class="flex-1 overflow-y-auto px-4 pb-4 space-y-2 custom-scrollbar relative z-10">
                        <div v-for="loan in store.loans" :key="loan.id"
                             class="group bg-surface-dark/50 border border-slate-700/50 hover:border-primary/30 rounded-xl p-3 transition-all duration-300 hover:bg-surface-dark relative">
                            
                            <div class="flex items-center justify-between gap-3">
                                <!-- Icon & Info -->
                                <div class="flex items-center gap-3 min-w-0 flex-1">
                                    <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400 group-hover:text-primary group-hover:border-primary/30 transition-colors shrink-0">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <div class="min-w-0">
                                        <div class="flex items-center gap-2">
                                            <h4 class="font-bold text-slate-200 text-sm truncate">İhtiyaç Kredisi</h4>
                                            <span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono hidden sm:inline-block">{{ loan.date }}</span>
                                        </div>
                                        <div class="flex items-center gap-2 mt-0.5">
                                            <span class="text-[10px] text-slate-500">Kalan:</span>
                                            <span class="text-xs font-bold text-white font-mono">{{ store.formatMoney(loan.remainingAmount) }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Action -->
                                <div class="flex flex-col items-end gap-1.5 shrink-0 pl-2">
                                    <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Taksit</span>
                                    <button class="flex flex-col items-center justify-center bg-slate-800 hover:bg-primary border border-slate-700 hover:border-primary/50 text-white px-3 py-1.5 rounded-lg transition-all group/btn shadow-sm min-w-[80px]">
                                        <span class="text-xs font-bold font-mono">{{ store.formatMoney(loan.nextInstallment) }}</span>
                                        <span class="text-[9px] font-bold text-slate-400 group-hover/btn:text-white/90 uppercase tracking-widest mt-0.5">ÖDE</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Progress Line (Subtle) -->
                            <div class="absolute bottom-0 left-3 right-3 h-[2px] bg-slate-800 rounded-full overflow-hidden mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div class="h-full bg-primary" :style="{ width: (loan.remainingAmount / loan.totalAmount * 100) + '%' }"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Fade for scroll -->
                    <div class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-surface to-transparent pointer-events-none z-20" v-if="store.loans.length > 0"></div>
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