import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store, useStore } from '../store.js';

export default {
    template: `
        <div class="h-full flex flex-col animate-fade-in">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h2 class="text-3xl font-bold text-white tracking-tight">Ayarlar</h2>
                    <p class="text-slate-400 text-sm mt-1">Hesap ve güvenlik ayarlarınızı yönetin</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Security Settings -->
                <div class="bg-surface-dark/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-white">Güvenlik</h3>
                            <p class="text-xs text-slate-400">PIN ve giriş ayarları</p>
                        </div>
                    </div>

                    <!-- Change PIN Form -->
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Mevcut PIN</label>
                            <input type="password" v-model="currentPin" maxlength="4" placeholder="****" 
                                   class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all font-mono text-center tracking-[0.5em]">
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Yeni PIN</label>
                            <input type="password" v-model="newPin" maxlength="4" placeholder="****" 
                                   class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all font-mono text-center tracking-[0.5em]">
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Yeni PIN (Tekrar)</label>
                            <input type="password" v-model="confirmPin" maxlength="4" placeholder="****" 
                                   class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all font-mono text-center tracking-[0.5em]">
                        </div>

                        <button @click="handleChangePin" 
                                :disabled="!isValid"
                                class="w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                                :class="isValid ? 'bg-primary hover:bg-primary-light text-white shadow-lg shadow-primary/20' : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'">
                            <i class="fas fa-key"></i>
                            <span>PIN Değiştir</span>
                        </button>
                    </div>
                </div>

                <!-- Account Info -->
                <div class="bg-surface-dark/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-white">Hesap Bilgileri</h3>
                            <p class="text-xs text-slate-400">Kişisel bilgileriniz</p>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="p-4 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between">
                            <div>
                                <p class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Ad Soyad</p>
                                <p class="text-white font-medium">{{ store.user.name }}</p>
                            </div>
                            <i class="fas fa-check-circle text-emerald-500"></i>
                        </div>

                        <div class="p-4 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between">
                            <div>
                                <p class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Telefon</p>
                                <p class="text-white font-medium font-mono">{{ store.user.phone }}</p>
                            </div>
                            <i class="fas fa-check-circle text-emerald-500"></i>
                        </div>

                        <div class="p-4 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between">
                            <div>
                                <p class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Hesap Durumu</p>
                                <p class="text-emerald-400 font-medium flex items-center gap-2">
                                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Aktif
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        const { changePin, showError } = useStore();
        const currentPin = ref('');
        const newPin = ref('');
        const confirmPin = ref('');

        const isValid = ref(false);

        // Watch inputs to validate
        const validate = () => {
            isValid.value = currentPin.value.length === 4 && 
                           newPin.value.length === 4 && 
                           confirmPin.value.length === 4 &&
                           newPin.value === confirmPin.value;
        };

        // Add watchers manually since we're in a simple setup
        // In a real build step we'd use watchEffect or watch
        
        // Using an interval to check validity for simplicity in this environment
        // or we can use @input on elements, let's use @input in template implicitly by using v-model
        // but v-model updates refs, we need to react to changes.
        // Let's use a computed property for isValid if possible, but we need to return it.
        
        // Actually, let's just use a computed property for the button state
        // But we can't easily import computed here without adding it to imports
        // Let's stick to the method call on click and simple validation check
        
        const handleChangePin = async () => {
            if (newPin.value !== confirmPin.value) {
                showError('Hata', 'Yeni PINler eşleşmiyor');
                return;
            }

            try {
                await changePin(currentPin.value, newPin.value);
                // Success feedback handled by store/action usually, or we can add a toast here
                // Reset form
                currentPin.value = '';
                newPin.value = '';
                confirmPin.value = '';
                
                // Show success message (using error modal for now as generic modal)
                showError('Başarılı', 'PIN şifreniz başarıyla değiştirildi.');
            } catch (error) {
                // Error is already shown by store action
            }
        };

        // Re-implement validation logic inside the template or use a computed
        // Since we can't easily add imports to the file content string without rewriting
        // I'll just make the button check validation on click for now, 
        // or better: add a computed property to the returned object
        
        return {
            store,
            currentPin,
            newPin,
            confirmPin,
            handleChangePin,
            // Simple computed-like property
            get isValid() {
                return currentPin.value.length === 4 && 
                       newPin.value.length === 4 && 
                       confirmPin.value.length === 4 &&
                       newPin.value === confirmPin.value;
            }
        };
    }
};