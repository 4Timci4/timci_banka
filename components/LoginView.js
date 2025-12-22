import { computed, ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../store.js';

export default {
    template: `
        <section class="w-full h-full flex flex-col justify-center items-center text-white relative overflow-hidden">
            <!-- Dynamic Background -->
            <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div class="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div class="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow" style="animation-delay: 2s;"></div>

            <!-- Login Card -->
            <div class="bg-surface-dark/40 backdrop-blur-2xl border border-white/15 p-10 rounded-[2.5rem] w-[420px] text-center shadow-2xl relative z-10 flex flex-col gap-8 animate-scale-in">
                
                <!-- Logo & Header -->
                <div class="flex flex-col items-center">
                    <div class="w-24 h-24 mb-6 relative group">
                        <div class="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                        <div class="relative w-full h-full bg-gradient-to-br from-surface-light to-surface border border-white/15 rounded-3xl flex items-center justify-center shadow-2xl">
                            <i class="fas fa-university text-4xl text-transparent bg-clip-text bg-gradient-to-br from-primary-light to-accent"></i>
                        </div>
                    </div>
                    <h1 class="text-4xl font-bold tracking-tight text-white mb-1">LS Bank</h1>
                    <p class="text-slate-400 text-sm font-medium tracking-wide uppercase">Güvenli Bankacılık Sistemi</p>
                </div>

                <!-- PIN Section -->
                <div class="space-y-6 w-full">
                    <!-- PIN Display -->
                    <div class="h-20 bg-black/40 rounded-2xl flex items-center justify-center gap-4 border border-white/10 shadow-inner transition-all duration-300 relative overflow-hidden group"
                         :class="store.loginError ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-shake' : 'hover:border-white/15'">
                        
                        <!-- Error Flash -->
                        <div class="absolute inset-0 bg-red-500/10 opacity-0 transition-opacity duration-200" :class="{ 'opacity-100': store.loginError }"></div>

                        <div v-for="i in 4" :key="i" 
                             class="w-4 h-4 rounded-full transition-all duration-300 transform"
                             :class="[
                                 i <= store.pinInput.length 
                                    ? (store.loginError ? 'bg-red-500 scale-110' : 'bg-accent scale-110 shadow-[0_0_10px_rgba(251,191,36,0.5)]') 
                                    : 'bg-slate-700 scale-100'
                             ]">
                        </div>
                    </div>
                    
                    <!-- Keypad -->
                    <div class="grid grid-cols-3 gap-3 px-2">
                        <button v-for="n in 9" :key="n" @click="enterPin(n)" 
                                class="h-16 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center text-2xl font-medium text-white border border-white/10 hover:border-white/20 shadow-sm group relative overflow-hidden">
                            <span class="relative z-10">{{ n }}</span>
                            <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                        
                        <button class="h-16 rounded-2xl text-red-400 hover:bg-red-500/10 active:scale-95 transition-all flex items-center justify-center border border-transparent hover:border-red-500/20 group" @click="clearPin">
                            <i class="fas fa-backspace text-xl group-hover:scale-110 transition-transform"></i>
                        </button>
                        
                        <button @click="enterPin(0)" class="h-16 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center text-2xl font-medium text-white border border-white/10 hover:border-white/20">0</button>
                        
                        <button class="h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white active:scale-95 transition-all flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-500/20 group" @click="submitLogin">
                            <i class="fas fa-arrow-right text-xl group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </div>
                </div>

                <!-- Footer Info -->
                <div class="flex items-center justify-between px-4 pt-2 border-t border-white/10">
                    <div class="flex flex-col items-start">
                        <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Müşteri ID</span>
                        <span class="text-sm font-mono text-slate-300">{{ store.user.phone }}</span>
                    </div>
                    
                    <label class="flex items-center gap-3 cursor-pointer group select-none">
                        <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wider group-hover:text-slate-300 transition-colors">PIN Koruması</span>
                        <div class="relative">
                            <input type="checkbox" v-model="store.pinRequired" class="sr-only peer">
                            <div class="w-10 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border border-slate-600 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 shadow-inner"></div>
                        </div>
                    </label>
                </div>
            </div>
            
            <!-- Version -->
            <div class="absolute bottom-8 text-slate-600 text-xs font-mono tracking-widest opacity-50">
                LS BANK OS v2.4.0
            </div>
        </section>
    `,
    setup() {
        onMounted(() => {
            if (!store.user.hasPin) {
                store.currentView = 'setup-pin';
            }
        });

        const enterPin = (num) => {
            if (store.pinInput.length < 4) {
                store.pinInput += num;
                store.loginError = false;
            }
        };

        const clearPin = () => {
            store.pinInput = '';
            store.loginError = false;
        };

        const submitLogin = () => {
            // Check if user needs to setup PIN first
            if (!store.user.hasPin) {
                store.currentView = 'setup-pin';
                store.pinInput = '';
                return;
            }

            if (!store.pinRequired || store.pinInput === store.user.pin) {
                store.currentView = 'dashboard';
                store.pinInput = '';
            } else {
                store.loginError = true;
                setTimeout(() => {
                    store.pinInput = '';
                    store.loginError = false;
                }, 500);
            }
        };

        return {
            store,
            enterPin,
            clearPin,
            submitLogin
        };
    }
};
