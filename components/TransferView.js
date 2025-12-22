import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../store.js';

export default {
    template: `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in pb-10">
            <!-- Send Money Form -->
            <div class="bg-surface p-8 rounded-[2rem] shadow-lg border border-slate-700 relative overflow-hidden h-[600px] flex flex-col">
                <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem]"></div>
                
                <h3 class="text-xl font-bold text-white mb-8 flex items-center gap-2 relative z-10 shrink-0">
                    <div class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    Para Transferi
                </h3>

                <div class="space-y-6 relative z-10 flex-1 flex flex-col justify-center">
                    <div class="group">
                        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-primary transition-colors">Alıcı Telefon No</label>
                        <div class="relative">
                            <input type="text" v-model="transferForm.phone" placeholder="555-0100" maxlength="30" 
                                   class="input-primary">
                            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="group">
                        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-primary transition-colors">Gönderilecek Tutar</label>
                        <div class="relative">
                            <input type="text" v-model="transferForm.amount" placeholder="0"
                                   @input="transferForm.amount = store.formatAmount(transferForm.amount)"
                                   class="w-full pl-8 pr-16 py-4 rounded-xl bg-surface-dark border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-glow-primary outline-none transition-all text-white placeholder-slate-700">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xl">$</span>
                            <button class="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-800 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors" @click="transferForm.amount = Math.floor(store.user.balance).toLocaleString('en-US')">TÜMÜ</button>
                        </div>
                    </div>

                    <div class="group">
                        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-primary transition-colors">Açıklama (Opsiyonel)</label>
                        <input type="text" v-model="transferForm.description" placeholder="Ödeme..." 
                               class="input-primary">
                    </div>

                    <button class="btn-primary w-full mt-4" 
                              @click="handleTransfer"
                              :disabled="!transferForm.amount || !transferForm.phone || parseInt(transferForm.amount.replace(/\D/g, '')) <= 0"
                              :class="!transferForm.amount || !transferForm.phone || parseInt(transferForm.amount.replace(/\D/g, '')) <= 0 ? 'opacity-50 cursor-not-allowed' : ''">
                        Transferi Onayla
                    </button>
                </div>
            </div>

            <!-- Contacts List -->
            <div class="flex flex-col h-[600px] space-y-4">
                <h3 class="text-lg font-bold text-slate-300 flex items-center gap-2 px-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    Yakındaki Kişiler
                </h3>
                <div class="bg-surface rounded-[2rem] shadow-lg border border-slate-700 flex-1 overflow-hidden flex flex-col">
                    <div class="p-2 space-y-1 overflow-y-auto custom-scrollbar flex-1">
                        <div v-for="player in store.nearbyPlayers" :key="player.id"
                             @click="transferForm.phone = player.phone"
                             class="flex items-center p-3 rounded-2xl border border-transparent hover:border-slate-600 hover:bg-white/5 cursor-pointer transition-all group">
                            <div class="relative">
                                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center font-bold text-lg text-slate-300 shadow-inner group-hover:text-white transition-colors border border-white/5">
                                    {{ player.name.charAt(0) }}
                                </div>
                                <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-4 border-surface rounded-full"></div>
                            </div>
                            <div class="flex-1 ml-4">
                                <div class="font-bold text-slate-200 group-hover:text-primary-light transition-colors">{{ player.name }}</div>
                                <div class="text-xs text-slate-500 font-mono bg-black/20 inline-block px-1.5 py-0.5 rounded mt-1">{{ player.phone }}</div>
                            </div>
                            <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        const transferForm = ref({
            phone: '',
            amount: '',
            description: ''
        });

        const handleTransfer = () => {
            if (!transferForm.value.phone || !transferForm.value.amount) return;
            
            const amount = parseInt(transferForm.value.amount.replace(/\D/g, ''));
            
            if (amount <= 0) {
                store.showError('Hata', 'Geçersiz tutar');
                return;
            }
            
            if (amount > store.user.balance) {
                store.showError('Yetersiz Bakiye', `Hesabınızda yeterli bakiye bulunmuyor. Mevcut bakiyeniz: ${store.formatMoney(store.user.balance)}`);
                return;
            }

            // Simulate API call
            store.user.balance -= amount;
            store.transactions.unshift({
                id: Date.now(),
                type: 'out',
                title: transferForm.value.description || 'Transfer: ' + transferForm.value.phone,
                amount: amount,
                date: new Date().toLocaleDateString('tr-TR')
            });

            // Reset form
            transferForm.value = { phone: '', amount: '', description: '' };
            store.currentView = 'dashboard';
        };

        return {
            store,
            transferForm,
            handleTransfer
        };
    }
};
