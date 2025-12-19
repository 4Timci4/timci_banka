import { store } from '../store.js';

export default {
    template: `
        <transition name="modal">
            <div v-if="store.errorModal.show" class="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm" @click="store.closeErrorModal">
                <div @click.stop class="bg-surface border border-danger/30 rounded-3xl shadow-2xl w-[450px] overflow-hidden animate-fade-in">
                    <!-- Modal Header -->
                    <div class="p-6 border-b border-danger/20 bg-danger/10">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-xl bg-danger/20 text-danger flex items-center justify-center border border-danger/30">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-white">{{ store.errorModal.title }}</h3>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Body -->
                    <div class="p-8">
                        <p class="text-slate-300 text-center leading-relaxed">{{ store.errorModal.message }}</p>
                    </div>

                    <!-- Modal Footer -->
                    <div class="p-6 border-t border-slate-700">
                        <button @click="store.closeErrorModal" class="w-full bg-danger hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all">
                            Tamam
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
