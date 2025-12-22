import { store } from '../store.js';

export default {
    template: `
        <!-- Realistic Credit Card (Theme Compatible) -->
        <div class="w-full max-w-[420px] aspect-[1.586/1] relative rounded-[1.25rem] shadow-2xl transition-all hover:scale-[1.02] duration-500 perspective-1000 group mx-auto lg:mx-0 overflow-hidden">
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
                    <div class="text-1xl font-mono font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
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
                                <div class="text-[7px] uppercase text-slate-500 tracking-wider mb-0.5">Kart Sahibi</div>
                                <div class="text-xs uppercase text-slate-200 tracking-widest font-bold drop-shadow-md">{{ formatName(store.user.name) }}</div>
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
    `,
    setup() {
        const formatName = (name) => {
            if (!name) return '';
            return name.replace(/i/g, 'I').toUpperCase();
        };

        return {
            store,
            formatName
        };
    }
};