import { store } from '../store.js';
import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
    template: `
        <!-- 3D Perspective Container -->
        <div class="w-full max-w-[420px] aspect-[1.586/1] relative group mx-auto lg:mx-0 perspective-1000"
             @mousemove="handleMouseMove"
             @mouseleave="handleMouseLeave"
             @mouseenter="handleMouseEnter">
            
            <!-- Card Element (Rotatable) -->
            <div ref="cardRef" 
                 class="w-full h-full relative rounded-[1.5rem] shadow-2xl transition-all duration-200 ease-out transform-gpu"
                 :style="cardStyle">
                
                <!-- 1. Background Layers -->
                <div class="absolute inset-0 rounded-[1.5rem] overflow-hidden bg-[#0f172a] border border-white/15 z-0">
                    <!-- Dynamic Mesh Gradient -->
                    <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div class="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-emerald-900/40 via-[#0f172a] to-blue-900/40 animate-pulse-slow"></div>
                    <div class="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] mix-blend-screen"></div>
                    <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] mix-blend-screen"></div>
                    
                    <!-- Glass Reflection (Dynamic) -->
                    <div class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none"></div>
                </div>

                <!-- 2. Content Layer -->
                <div class="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10 text-white select-none">
                    
                    <!-- Header: Chip & Bank Logo -->
                    <div class="flex justify-between items-start">
                        <div class="flex items-center gap-4">
                            <!-- Realistic EMV Chip -->
                            <div class="w-12 h-9 bg-gradient-to-br from-[#fbbf24] via-[#d97706] to-[#b45309] rounded-[6px] relative overflow-hidden shadow-inner border border-[#78350f]/30">
                                <svg width="100%" height="100%" viewBox="0 0 48 36" class="opacity-60 mix-blend-overlay">
                                    <path d="M0 18H48M16 0V36M32 0V36" stroke="#451a03" stroke-width="1"/>
                                    <rect x="16" y="10" width="16" height="16" rx="4" stroke="#451a03" stroke-width="1"/>
                                </svg>
                                <!-- Shine on Chip -->
                                <div class="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-50"></div>
                            </div>
                            
                            <!-- Contactless Icon -->
                            <svg class="w-6 h-6 text-white/80 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                            </svg>
                        </div>
                        
                        <!-- Bank Brand -->
                        <div class="text-right">
                            <div class="font-bold italic text-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-sm">LS BANK</div>
                            <div class="text-[10px] uppercase tracking-[0.4em] text-yellow-500/80 font-semibold mt-1">Platinum</div>
                        </div>
                    </div>

                    <!-- Middle: Balance (Interactive) -->
                    <div class="mt-2 pl-1 group/balance cursor-pointer w-fit" @click="toggleBalance">
                        <div class="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-medium mb-1 transition-colors group-hover/balance:text-white">
                            <span>Toplam Bakiye</span>
                            <i :class="showBalance ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-xs opacity-50"></i>
                        </div>
                        <div class="relative overflow-hidden">
                            <div class="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white drop-shadow-md transition-all duration-300"
                                 :class="{'blur-md select-none opacity-50': !showBalance}">
                                {{ store.formatMoney(store.user.balance) }}
                            </div>
                            <!-- Privacy Overlay Text -->
                            <div v-if="!showBalance" class="absolute inset-0 flex items-center text-sm font-mono tracking-widest text-white/40">
                                ****.***,**
                            </div>
                        </div>
                    </div>

                    <!-- Footer: Card Info -->
                    <div class="flex justify-between items-end">
                        <div class="flex flex-col gap-3 w-full">
                            <!-- Card Number (Copyable) -->
                            <div class="relative group/number w-fit cursor-pointer" @click="copyCardNumber">
                                <div class="font-mono text-lg sm:text-xl text-slate-100 tracking-[0.15em] drop-shadow-md transition-all group-hover/number:text-yellow-400/90" 
                                     style="word-spacing: 0.3em; text-shadow: 0px 2px 3px rgba(0,0,0,0.5);">
                                    **** **** **** {{ store.user.cardNumberLast4 }}
                                </div>
                                <!-- Copy Tooltip -->
                                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover/number:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-sm border border-white/15">
                                    {{ copied ? 'Kopyalandı!' : 'Kopyalamak için tıkla' }}
                                </div>
                            </div>
                            
                            <div class="flex items-center justify-between w-full pr-4">
                                <div>
                                    <div class="text-[8px] uppercase text-slate-500 tracking-wider mb-0.5">Kart Sahibi</div>
                                    <div class="text-xs sm:text-sm uppercase text-slate-200 tracking-widest font-bold drop-shadow-md truncate max-w-[180px]">
                                        {{ formatName(store.user.name) }}
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-[8px] uppercase text-slate-500 tracking-wider mb-0.5">SKT</div>
                                    <div class="text-xs sm:text-sm font-mono text-slate-200 tracking-widest font-bold drop-shadow-md">12/28</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 3. Glossy Sheen (Interactive) -->
                <div class="absolute inset-0 rounded-[1.5rem] bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
                     :style="sheenStyle"></div>
                     
                <!-- 4. Border Glow -->
                <div class="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all duration-500 z-30"></div>
            </div>
        </div>
    `,
    setup() {
        const cardRef = ref(null);
        const showBalance = ref(true);
        const copied = ref(false);
        
        // Reactive styles for 3D effect
        const rotateX = ref(0);
        const rotateY = ref(0);
        const sheenX = ref(50);
        const sheenY = ref(50);

        const formatName = (name) => {
            if (!name) return 'ISIMSIZ';
            return name.replace(/i/g, 'I').toUpperCase();
        };

        const toggleBalance = () => {
            showBalance.value = !showBalance.value;
        };

        const copyCardNumber = () => {
            // Gerçek senaryoda tam numara store'da olmalı, şimdilik görseli simüle ediyoruz
            // veya son 4 haneyi kopyalıyoruz.
            const textToCopy = `**** **** **** ${store.user.cardNumberLast4}`;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                copied.value = true;
                setTimeout(() => copied.value = false, 2000);
            }).catch(err => console.error('Copy failed', err));
        };

        // 3D Tilt Logic
        const handleMouseMove = (e) => {
            if (!cardRef.value) return;

            const rect = cardRef.value.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (max 15 degrees)
            rotateX.value = ((y - centerY) / centerY) * -10;
            rotateY.value = ((x - centerX) / centerX) * 10;

            // Calculate sheen position
            sheenX.value = (x / rect.width) * 100;
            sheenY.value = (y / rect.height) * 100;
        };

        const handleMouseLeave = () => {
            // Reset position smoothly
            rotateX.value = 0;
            rotateY.value = 0;
            sheenX.value = 50;
            sheenY.value = 50;
        };

        const handleMouseEnter = () => {
            // Optional: Add specific enter animation logic here if needed
        };

        const cardStyle = computed(() => ({
            transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale3d(1.02, 1.02, 1.02)`,
        }));

        const sheenStyle = computed(() => ({
            background: `radial-gradient(circle at ${sheenX.value}% ${sheenY.value}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
        }));

        return {
            store,
            cardRef,
            showBalance,
            copied,
            formatName,
            toggleBalance,
            copyCardNumber,
            handleMouseMove,
            handleMouseLeave,
            handleMouseEnter,
            cardStyle,
            sheenStyle
        };
    }
};
