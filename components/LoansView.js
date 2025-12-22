import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../store.js';

export default {
    template: `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in pb-10 items-start">
            <!-- Left: Loan Calculator -->
            <div class="bg-surface-dark/80 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col group h-fit">
                <!-- Decorative Backgrounds -->
                <div class="absolute top-0 right-0 w-[350px] h-[350px] bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
                <div class="absolute bottom-0 left-0 w-[250px] h-[250px] bg-primary/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>
                
                <!-- Content -->
                <div class="relative z-10 flex flex-col h-fit">
                    <!-- Top Info -->
                    <div class="flex items-center gap-4 mb-8 shrink-0">
                        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center text-white shadow-lg shadow-accent/20">
                            <i class="fas fa-hand-holding-dollar text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white">İhtiyaç Kredisi</h3>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="px-2 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider border border-accent/20">
                                    <i class="fas fa-check-circle mr-1"></i>Ön Onaylı
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Amount Selector -->
                    <div class="flex-1 flex flex-col justify-center mb-8">
                        <div class="text-center">
                            <span class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Kullanılacak Tutar</span>
                            <div class="text-4xl lg:text-5xl font-bold text-white font-mono tracking-tight mb-6 drop-shadow-lg transition-all duration-300">
                                {{ store.formatMoney(parseInt(loanForm.amount) || 0) }}
                            </div>
                            
                            <div class="px-2 relative group/slider">
                                <div class="relative h-10 flex items-center">
                                    <!-- Track Background -->
                                    <div class="absolute inset-x-0 h-3 bg-black/40 rounded-full border border-white/5 overflow-hidden shadow-inner"></div>
                                    
                                    <!-- Active Track -->
                                    <div class="absolute left-0 h-3 bg-gradient-to-r from-accent/50 to-accent rounded-full pointer-events-none transition-all duration-75 ease-out shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                                         :style="{ width: ((parseInt(loanForm.amount) - 1000) / 49000 * 100) + '%' }"></div>
                                    
                                    <!-- Input Range -->
                                    <input type="range" v-model="loanForm.amount" min="1000" max="50000" step="500"
                                           class="w-full absolute inset-0 opacity-0 cursor-pointer z-20">
                                    
                                    <!-- Thumb -->
                                    <div class="absolute h-7 w-7 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] border-4 border-accent z-10 pointer-events-none transition-all duration-75 ease-out -ml-3.5 top-1.5 group-hover/slider:scale-110"
                                         :style="{ left: ((parseInt(loanForm.amount) - 1000) / 49000 * 100) + '%' }">
                                         <div class="absolute inset-0 rounded-full bg-accent opacity-20 animate-ping"></div>
                                    </div>
                                </div>
                                <div class="flex justify-between text-[10px] text-slate-500 font-bold font-mono mt-2 px-1">
                                    <span>$1,000</span>
                                    <span>$50,000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Details Grid -->
                    <div class="grid grid-cols-3 gap-3 mb-8 shrink-0">
                        <div class="bg-black/20 p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-1 backdrop-blur-sm group hover:bg-white/5 transition-colors">
                            <span class="text-[10px] text-slate-500 uppercase font-bold group-hover:text-slate-300">Faiz Oranı</span>
                            <span class="text-lg font-bold text-accent font-mono">%5.5</span>
                        </div>
                        <div class="bg-black/20 p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-1 backdrop-blur-sm group hover:bg-white/5 transition-colors">
                            <span class="text-[10px] text-slate-500 uppercase font-bold group-hover:text-slate-300">Vade</span>
                            <span class="text-lg font-bold text-white font-mono">12 Ay</span>
                        </div>
                        <div class="bg-black/20 p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-1 backdrop-blur-sm group hover:bg-white/5 transition-colors">
                            <span class="text-[10px] text-slate-500 uppercase font-bold group-hover:text-slate-300">Geri Ödeme</span>
                            <span class="text-lg font-bold text-white font-mono">{{ store.formatMoney(Math.round((parseInt(loanForm.amount) || 0) * 1.055)) }}</span>
                        </div>
                    </div>

                    <!-- Action Button -->
                    <button @click="applyLoan"
                            class="w-full py-4 rounded-xl font-bold text-base shadow-lg shadow-accent/20 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                            :disabled="!loanForm.amount || parseInt(loanForm.amount) < 1000"
                            :class="!loanForm.amount || parseInt(loanForm.amount) < 1000 ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-accent to-yellow-500 text-slate-900 hover:shadow-accent/40 hover:-translate-y-1'">
                        
                        <span class="relative z-10 flex items-center gap-2">
                            Krediyi Onayla
                            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                        </span>
                        
                        <!-- Shine Effect -->
                        <div class="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" v-if="loanForm.amount && parseInt(loanForm.amount) >= 1000"></div>
                    </button>
                </div>
            </div>

            <!-- Right: Active Loans -->
            <div class="flex flex-col gap-6">
                 <div class="bg-surface-dark/80 backdrop-blur-md border border-white/5 rounded-[2rem] shadow-xl overflow-hidden flex flex-col h-fit relative">
                    <div class="p-6 border-b border-white/5 bg-black/20">
                        <h3 class="text-lg font-bold text-white flex items-center gap-3">
                            <i class="fas fa-file-invoice-dollar text-accent"></i>
                            Aktif Kredilerim
                            <span class="px-2 py-0.5 rounded-lg bg-white/10 text-white text-xs font-mono border border-white/5">{{ store.loans.length }}</span>
                        </h3>
                    </div>
                    
                    <!-- Empty State -->
                    <div v-if="store.loans.length === 0" class="flex flex-col items-center justify-center py-12 text-center opacity-50">
                        <div class="w-20 h-20 rounded-full bg-white/5 border border-white/10 border-dashed flex items-center justify-center mb-4">
                            <i class="fas fa-folder-open text-3xl text-slate-500"></i>
                        </div>
                        <h4 class="text-white font-bold text-base">Aktif Kredi Yok</h4>
                        <p class="text-slate-500 text-sm mt-2 max-w-[200px]">Şu anda ödenmesi gereken bir kredi borcunuz bulunmuyor.</p>
                    </div>

                    <!-- List -->
                    <div v-else class="overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar relative z-10 max-h-[500px]">
                        <div v-for="loan in store.loans" :key="loan.id"
                             class="group bg-white/[0.02] border border-white/5 hover:border-accent/30 hover:bg-white/[0.05] rounded-xl p-4 transition-all duration-300 relative overflow-hidden">
                            
                            <!-- Background Glow -->
                            <div class="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                            <div class="flex items-center justify-between gap-4 relative z-10">
                                <!-- Icon & Info -->
                                <div class="flex items-center gap-4 min-w-0 flex-1">
                                    <div class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 text-slate-400 group-hover:text-accent group-hover:border-accent/30 transition-colors shrink-0 shadow-inner">
                                        <i class="fas fa-receipt text-lg"></i>
                                    </div>
                                    <div class="min-w-0">
                                        <div class="flex items-center gap-2">
                                            <h4 class="font-bold text-slate-200 text-sm truncate group-hover:text-white transition-colors">İhtiyaç Kredisi</h4>
                                            <span class="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-slate-400 border border-white/5 font-mono hidden sm:inline-block">
                                                {{ loan.date }}
                                            </span>
                                        </div>
                                        <div class="flex items-center gap-3 mt-1">
                                            <div class="flex items-center gap-1.5">
                                                <span class="text-[10px] text-slate-500 uppercase font-bold">Kalan</span>
                                                <span class="text-xs font-bold text-white font-mono">{{ store.formatMoney(loan.remainingAmount) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Action -->
                                <div class="flex flex-col items-end gap-1 shrink-0">
                                    <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Taksit Tutarı</span>
                                    <button class="flex items-center gap-2 bg-slate-800 hover:bg-accent border border-white/10 hover:border-accent/50 text-white pl-3 pr-4 py-2 rounded-lg transition-all group/btn shadow-sm hover:shadow-accent/20 active:scale-95">
                                        <span class="text-xs font-bold font-mono group-hover/btn:text-slate-900 transition-colors">{{ store.formatMoney(loan.nextInstallment) }}</span>
                                        <div class="w-px h-3 bg-white/20 group-hover/btn:bg-black/20"></div>
                                        <span class="text-[10px] font-bold text-slate-400 group-hover/btn:text-slate-900 uppercase tracking-widest">ÖDE</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Progress Line -->
                            <div class="mt-4 relative h-1.5 bg-black/40 rounded-full overflow-hidden">
                                <div class="absolute inset-y-0 left-0 bg-gradient-to-r from-accent/50 to-accent rounded-full transition-all duration-500"
                                     :style="{ width: (loan.remainingAmount / loan.totalAmount * 100) + '%' }"></div>
                            </div>
                        </div>
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