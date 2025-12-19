import { store } from '../store.js';

export default {
    template: `
        <div class="grid grid-cols-12 gap-8 h-full animate-fade-in pb-4">
            <!-- Left Column: Card & Actions -->
            <div class="col-span-12 lg:col-span-8 flex flex-col gap-6">
                <!-- Realistic Credit Card (Theme Compatible) -->
                <div class="w-full max-w-[420px] aspect-[1.586/1] relative rounded-[1.25rem] shadow-2xl transition-all hover:scale-[1.02] duration-500 perspective-1000 group mx-auto lg:mx-0">
                    <!-- Card Background -->
                    <div class="absolute inset-0 rounded-[1.25rem] overflow-hidden bg-[#0f172a] border border-white/10 shadow-inner z-0">
                        <!-- Base Gradient -->
                        <div class="absolute inset-0 bg-gradient-to-br from-[#334155] via-[#0f172a] to-[#020617]"></div>
                        
                        <!-- Noise Texture for Matte Finish -->
                        <div class="absolute inset-0 opacity-[0.35] mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
                        
                        <!-- Subtle Pattern -->
                        <div class="absolute inset-0 opacity-[0.1]" style="background-image: radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);"></div>
                        
                        <!-- Glossy Reflection -->
                        <div class="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-40"></div>
                    </div>

                    <!-- Card Content -->
                    <div class="absolute inset-0 p-7 flex flex-col justify-between z-10 text-white select-none">
                        <!-- Top Row: Chip, Signal, Bank -->
                        <div class="flex justify-between items-start">
                            <div class="flex items-center gap-4">
                                <!-- Enhanced Chip -->
                                <div class="w-12 h-9 bg-gradient-to-br from-[#fcd34d] via-[#d97706] to-[#b45309] rounded-[4px] border border-[#78350f]/40 relative overflow-hidden flex items-center justify-center shadow-md">
                                    <svg width="40" height="32" viewBox="0 0 40 32" class="opacity-50 mix-blend-overlay">
                                        <path d="M0 16H40M14 0V32M26 0V32" stroke="#451a03" stroke-width="0.5"/>
                                        <rect x="14" y="8" width="12" height="16" rx="2" stroke="#451a03" stroke-width="0.5"/>
                                    </svg>
                                </div>
                                <!-- Contactless -->
                                <svg class="w-6 h-6 text-white/70 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                </svg>
                            </div>
                            
                            <div class="text-right">
                                <div class="font-bold italic text-xl tracking-widest text-white drop-shadow-md">LS BANK</div>
                                <div class="text-[9px] uppercase tracking-[0.3em] text-slate-300 font-medium mt-0.5">Platinum</div>
                            </div>
                        </div>

                        <!-- Middle Row: Balance -->
                        <div class="mt-2 pl-1">
                            <div class="text-[10px] text-slate-400 uppercase tracking-widest font-medium mb-1">Toplam Bakiye</div>
                            <div class="text-3xl font-mono font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                {{ store.formatMoney(store.user.balance) }}
                            </div>
                        </div>

                        <!-- Bottom Row: Number, Name, Logo -->
                        <div class="flex justify-between items-end">
                            <div class="flex flex-col gap-2">
                                <!-- Card Number -->
                                <div class="font-mono text-xl text-slate-200 tracking-[0.15em] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]" style="word-spacing: 0.2em; text-shadow: 0px 1px 2px rgba(0,0,0,0.8);">
                                    **** **** **** {{ store.user.cardNumberLast4 }}
                                </div>
                                
                                <div class="flex items-center gap-8">
                                    <div>
                                        <div class="text-[7px] uppercase text-slate-500 tracking-wider mb-0.5">Sahibi</div>
                                        <div class="text-xs uppercase text-slate-200 tracking-widest font-bold drop-shadow-md">{{ store.user.name }}</div>
                                    </div>
                                    <div>
                                        <div class="text-[7px] uppercase text-slate-500 tracking-wider mb-0.5">SKT</div>
                                        <div class="text-xs font-mono text-slate-200 tracking-widest font-bold drop-shadow-md">12/28</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Logo -->
                            <div class="flex -space-x-4 opacity-90 mix-blend-screen pb-1">
                                <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm shadow-sm"></div>
                                <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm shadow-sm"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Holographic Sheen Animation -->
                    <div class="absolute -top-[150%] -left-[150%] w-[300%] h-[300%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-45 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out pointer-events-none z-20"></div>
                </div>

                <!-- Quick Actions -->
                <div>
                    <h3 class="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                        <span class="w-1 h-4 bg-accent rounded-full"></span>
                        Hızlı İşlemler
                    </h3>
                    <div class="grid grid-cols-4 gap-4">
                        <button @click="openAtmModal('deposit')" class="relative overflow-hidden bg-surface p-4 rounded-2xl border border-slate-700 hover:border-success/50 transition-all group shadow-lg flex flex-col items-center justify-center gap-2 h-28">
                            <div class="w-10 h-10 bg-success/10 text-success rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-success/20">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            </div>
                            <div class="text-center">
                                <span class="block font-bold text-sm text-slate-200 group-hover:text-white">Para Yatır</span>
                            </div>
                        </button>

                        <button @click="openAtmModal('withdraw')" class="relative overflow-hidden bg-surface p-4 rounded-2xl border border-slate-700 hover:border-red-500/50 transition-all group shadow-lg flex flex-col items-center justify-center gap-2 h-28">
                            <div class="w-10 h-10 bg-red-500/10 text-red-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-red-500/20">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                            </div>
                            <div class="text-center">
                                <span class="block font-bold text-sm text-slate-200 group-hover:text-white">Para Çek</span>
                            </div>
                        </button>
                        
                        <button @click="store.currentView = 'transfer'" class="relative overflow-hidden bg-surface p-4 rounded-2xl border border-slate-700 hover:border-primary/50 transition-all group shadow-lg flex flex-col items-center justify-center gap-2 h-28">
                            <div class="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                            </div>
                            <div class="text-center">
                                <span class="block font-bold text-sm text-slate-200 group-hover:text-white">Para Transferi</span>
                            </div>
                        </button>
                        
                        <button @click="store.currentView = 'loans'" class="relative overflow-hidden bg-surface p-4 rounded-2xl border border-slate-700 hover:border-accent/50 transition-all group shadow-lg flex flex-col items-center justify-center gap-2 h-28">
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