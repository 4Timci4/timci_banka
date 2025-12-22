import { store } from '../store.js';

export default {
    template: `
        <transition name="modal">
            <div v-if="store.errorModal.show" class="fixed inset-0 flex items-center justify-center z-[60] bg-black/90 backdrop-blur-md" @click="store.closeErrorModal">
                <div @click.stop class="bg-surface-dark border border-red-500/20 rounded-[2rem] shadow-2xl shadow-red-900/20 w-[400px] overflow-hidden animate-bounce-in relative">
                    
                    <!-- Background Glow -->
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/20 rounded-full blur-[60px] pointer-events-none"></div>

                    <!-- Icon -->
                    <div class="pt-8 flex justify-center relative z-10">
                        <div class="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                            <i class="fas fa-exclamation-triangle text-4xl text-red-500 drop-shadow-md"></i>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-8 text-center relative z-10">
                        <h3 class="text-2xl font-bold text-white mb-3 tracking-tight">{{ store.errorModal.title }}</h3>
                        <p class="text-slate-400 leading-relaxed text-sm">{{ store.errorModal.message }}</p>
                    </div>

                    <!-- Footer -->
                    <div class="p-6 pt-0 relative z-10">
                        <button @click="store.closeErrorModal" 
                                class="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 group">
                            <span>Tamam</span>
                            <i class="fas fa-check group-hover:scale-110 transition-transform"></i>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    `,
    setup() {
        return {
            store
        };
    }
};
