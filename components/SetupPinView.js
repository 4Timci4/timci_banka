import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store, useStore } from '../store.js';

export default {
    template: `
        <section class="w-full h-full flex flex-col justify-center items-center text-white relative overflow-hidden">
            <!-- Dynamic Background -->
            <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div class="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div class="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow" style="animation-delay: 2s;"></div>

            <!-- Setup Card -->
            <div class="bg-surface-dark/40 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] w-[420px] text-center shadow-2xl relative z-10 flex flex-col gap-8 animate-scale-in">
                
                <!-- Header -->
                <div class="flex flex-col items-center">
                    <div class="w-20 h-20 mb-6 relative group">
                        <div class="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                        <div class="relative w-full h-full bg-gradient-to-br from-surface-light to-surface border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
                            <i class="fas fa-shield-alt text-3xl text-transparent bg-clip-text bg-gradient-to-br from-primary-light to-accent"></i>
                        </div>
                    </div>
                    <h1 class="text-3xl font-bold tracking-tight text-white mb-2">PIN Oluştur</h1>
                    <p class="text-slate-400 text-sm font-medium">Hesabınızın güvenliği için 4 haneli bir PIN belirleyin.</p>
                </div>

                <!-- PIN Section -->
                <div class="space-y-6 w-full">
                    <!-- PIN Display -->
                    <div class="h-20 bg-black/40 rounded-2xl flex items-center justify-center gap-4 border border-white/5 shadow-inner transition-all duration-300 relative overflow-hidden group"
                         :class="error ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-shake' : 'hover:border-white/10'">
                        
                        <!-- Error Flash -->
                        <div class="absolute inset-0 bg-red-500/10 opacity-0 transition-opacity duration-200" :class="{ 'opacity-100': error }"></div>

                        <div v-for="i in 4" :key="i" 
                             class="w-4 h-4 rounded-full transition-all duration-300 transform"
                             :class="[
                                 i <= pinInput.length 
                                    ? (error ? 'bg-red-500 scale-110' : 'bg-accent scale-110 shadow-[0_0_10px_rgba(251,191,36,0.5)]') 
                                    : 'bg-slate-700 scale-100'
                             ]">
                        </div>
                    </div>
                    
                    <!-- Keypad -->
                    <div class="grid grid-cols-3 gap-3 px-2">
                        <button v-for="n in 9" :key="n" @click="enterPin(n)" 
                                class="h-16 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center text-2xl font-medium text-white border border-white/5 hover:border-white/20 shadow-sm group relative overflow-hidden">
                            <span class="relative z-10">{{ n }}</span>
                            <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                        
                        <button class="h-16 rounded-2xl text-red-400 hover:bg-red-500/10 active:scale-95 transition-all flex items-center justify-center border border-transparent hover:border-red-500/20 group" @click="clearPin">
                            <i class="fas fa-backspace text-xl group-hover:scale-110 transition-transform"></i>
                        </button>
                        
                        <button @click="enterPin(0)" class="h-16 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center text-2xl font-medium text-white border border-white/5 hover:border-white/20">0</button>
                        
                        <button class="h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white active:scale-95 transition-all flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-500/20 group" 
                                @click="submitPin"
                                :disabled="pinInput.length !== 4"
                                :class="{'opacity-50 cursor-not-allowed': pinInput.length !== 4}">
                            <i class="fas fa-check text-xl group-hover:scale-110 transition-transform"></i>
                        </button>
                    </div>
                </div>

                <!-- Footer Info -->
                <div class="flex items-center justify-center px-4 pt-4 border-t border-white/5">
                    <p class="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                        <i class="fas fa-lock mr-1"></i> Güvenli Kurulum
                    </p>
                </div>
            </div>
        </section>
    `,
    setup() {
        const { setPin } = useStore();
        const pinInput = ref('');
        const error = ref(false);

        const enterPin = (num) => {
            if (pinInput.value.length < 4) {
                pinInput.value += num;
                error.value = false;
            }
        };

        const clearPin = () => {
            pinInput.value = '';
            error.value = false;
        };

        const submitPin = async () => {
            if (pinInput.value.length === 4) {
                try {
                    await setPin(pinInput.value);
                    store.currentView = 'dashboard';
                } catch (err) {
                    error.value = true;
                    setTimeout(() => {
                        pinInput.value = '';
                        error.value = false;
                    }, 500);
                }
            }
        };

        return {
            pinInput,
            error,
            enterPin,
            clearPin,
            submitPin
        };
    }
};