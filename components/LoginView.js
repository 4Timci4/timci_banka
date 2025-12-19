import { computed, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../store.js';

export default {
    template: `
        <section class="w-full h-full flex flex-col justify-center items-center text-white relative overflow-hidden">
            <!-- Decorational Background Elements -->
            <div class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"></div>
            <div class="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"></div>

            <div class="bg-surface-light/30 backdrop-blur-xl border border-white/10 p-12 rounded-3xl w-[400px] text-center shadow-glass relative z-10">
                <div class="mb-10">
                    <div class="w-20 h-20 mx-auto mb-6 text-accent bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 shadow-glow-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><line x1="16" y1="21" x2="16" y2="17"></line><line x1="12" y1="21" x2="12" y2="17"></line><line x1="8" y1="21" x2="8" y2="17"></line><line x1="2" y1="11" x2="22" y2="11"></line></svg>
                    </div>
                    <h1 class="text-3xl font-bold tracking-tight text-white">LS Bank</h1>
                    <p class="text-slate-300 text-sm mt-2 font-light">Secure Banking Systems v2.0</p>
                </div>

                <div class="space-y-8">
                    <!-- PIN Display -->
                    <div class="h-16 bg-black/50 rounded-2xl flex items-center justify-center text-4xl tracking-[0.5em] font-mono border border-white/5 shadow-inner transition-colors duration-200 group relative overflow-hidden" 
                         :class="store.loginError ? 'border-danger/50 shadow-danger/20 animate-shake' : 'border-white/10'">
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shimmer"></div>
                        <span :class="store.loginError ? 'text-danger' : 'text-accent'">{{ pinDisplay }}</span>
                    </div>
                    
                    <!-- Keypad -->
                    <div class="grid grid-cols-3 gap-4 px-2">
                        <button v-for="n in 9" :key="n" @click="enterPin(n)" 
                                class="h-14 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center text-xl font-medium border border-white/5 hover:border-white/20 shadow-sm">
                            {{ n }}
                        </button>
                        <button class="h-14 rounded-xl text-danger hover:bg-danger/10 active:scale-95 transition-all flex items-center justify-center font-bold border border-transparent hover:border-danger/20" @click="clearPin">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                        <button @click="enterPin(0)" class="h-14 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center text-xl font-medium border border-white/5 hover:border-white/20">0</button>
                        <button class="h-14 rounded-xl bg-success/10 text-success hover:bg-success/20 active:scale-95 transition-all flex items-center justify-center border border-success/20" @click="submitLogin">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-8 text-xs text-slate-500 font-mono">ID: {{ store.user.phone }}</div>
        </section>
    `,
    setup() {
        const pinDisplay = computed(() => {
            return store.pinInput.padEnd(4, '•').split('').map((char, index) => {
                return index < store.pinInput.length ? '*' : '•';
            }).join('');
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
            if (store.pinInput === store.user.pin) {
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
            pinDisplay,
            enterPin,
            clearPin,
            submitLogin
        };
    }
};
