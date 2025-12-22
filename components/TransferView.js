import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../store.js';

export default {
    template: `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in pb-10 items-start">
            <!-- Left Column: Transfer Form (7 cols) -->
            <div class="lg:col-span-7 flex flex-col gap-6">
                <!-- Main Card -->
                <div class="bg-surface-dark/80 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl border border-white/10 relative overflow-hidden flex flex-col h-fit">
                    <!-- Decorative Background -->
                    <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div class="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                    <!-- Header -->
                    <div class="flex items-center justify-between mb-8 relative z-10">
                        <div>
                            <h3 class="text-2xl font-bold text-white flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                    <i class="fas fa-paper-plane text-sm"></i>
                                </div>
                                Para Transferi
                            </h3>
                            <p class="text-slate-400 text-sm mt-1 ml-13">Güvenli ve hızlı para gönderimi</p>
                        </div>
                        <div class="text-right">
                            <div class="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Mevcut Bakiye</div>
                            <div class="text-xl font-mono font-bold text-white drop-shadow-md">{{ store.formatMoney(store.user.balance) }}</div>
                        </div>
                    </div>

                    <!-- Form Content -->
                    <div class="space-y-5 relative z-10 mt-2 max-w-xl mx-auto w-full">
                        
                        <!-- Input: Phone -->
                        <div class="group relative">
                            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-primary transition-colors">
                                <i class="fas fa-hashtag mr-1"></i> Alıcı Hesap / Telefon
                            </label>
                            <div class="relative transition-all duration-300 transform group-focus-within:scale-[1.02]">
                                <input type="text" v-model="transferForm.phone" placeholder="555-0100" maxlength="10" 
                                       class="w-full pl-12 pr-4 py-4 rounded-xl bg-black/20 border border-white/15 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-black/30 outline-none transition-all text-white placeholder-slate-600 font-mono text-lg shadow-inner">
                                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Input: Amount -->
                        <div class="group relative">
                            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-accent transition-colors">
                                <i class="fas fa-coins mr-1"></i> Gönderilecek Tutar
                            </label>
                            <div class="relative transition-all duration-300 transform group-focus-within:scale-[1.02]">
                                <input type="text" v-model="transferForm.amount" placeholder="0"
                                       @input="formatAmountInput"
                                       class="w-full pl-12 pr-24 py-4 rounded-xl bg-black/20 border border-white/15 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 focus:bg-black/30 outline-none transition-all text-white placeholder-slate-600 font-mono text-xl font-bold shadow-inner tracking-wide">
                                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors text-lg">
                                    <i class="fas fa-dollar-sign"></i>
                                </div>
                                <button class="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold text-accent hover:text-white transition-all active:scale-95"
                                        @click="setMaxAmount">
                                    TÜMÜ
                                </button>
                            </div>
                            
                            <!-- Quick Amounts -->
                            <div class="flex gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
                                <button v-for="amount in quickAmounts" :key="amount"
                                        @click="setAmount(amount)"
                                        class="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/15 text-[10px] font-mono text-slate-300 transition-all active:scale-95 whitespace-nowrap">
                                    \${{ amount.toLocaleString() }}
                                </button>
                            </div>
                        </div>

                        <!-- Input: Description -->
                        <div class="group relative">
                            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-primary transition-colors">
                                <i class="fas fa-align-left mr-1"></i> Açıklama (Opsiyonel)
                            </label>
                            <div class="relative transition-all duration-300 transform group-focus-within:scale-[1.02]">
                                <input type="text" v-model="transferForm.description" placeholder="Ödeme notu..." 
                                       class="w-full pl-12 pr-4 py-4 rounded-xl bg-black/20 border border-white/15 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-black/30 outline-none transition-all text-white placeholder-slate-600 shadow-inner">
                                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                                    <i class="fas fa-pen"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Action Button -->
                        <button class="w-full py-4 rounded-xl font-bold text-base shadow-lg shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden mt-2"
                                @click="handleTransfer"
                                :disabled="!isValidTransfer"
                                :class="isValidTransfer ? 'bg-gradient-to-r from-primary to-primary-dark hover:shadow-primary/40 hover:-translate-y-1 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'">
                            
                            <span class="relative z-10">Transferi Onayla</span>
                            <i class="fas fa-arrow-right relative z-10 group-hover:translate-x-1 transition-transform"></i>
                            
                            <!-- Shine Effect -->
                            <div class="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" v-if="isValidTransfer"></div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Column: Nearby & Recent (5 cols) -->
            <div class="lg:col-span-5 flex flex-col gap-6">
                
                <!-- Nearby Players -->
                <div class="bg-surface-dark/80 backdrop-blur-md rounded-[2rem] shadow-xl border border-white/10 flex flex-col overflow-hidden relative h-fit">
                    <div class="p-6 border-b border-white/10 bg-black/20">
                        <h3 class="text-lg font-bold text-slate-200 flex items-center gap-2">
                            <i class="fas fa-map-marker-alt text-accent"></i>
                            Yakındaki Kişiler
                        </h3>
                    </div>
                    
                    <div class="overflow-y-auto custom-scrollbar p-4 space-y-2 max-h-[500px]">
                        <div v-if="store.nearbyPlayers.length === 0" class="flex flex-col items-center justify-center py-10 text-slate-500 gap-2">
                            <i class="fas fa-users-slash text-2xl opacity-50"></i>
                            <span class="text-sm">Yakında kimse yok</span>
                        </div>

                        <div v-for="player in paginatedPlayers" :key="player.id"
                             @click="selectContact(player)"
                             class="flex items-center p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/15 cursor-pointer transition-all group active:scale-[0.98]">
                            
                            <!-- Avatar -->
                            <div class="relative">
                                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center font-bold text-lg text-slate-300 shadow-inner group-hover:text-white transition-colors border border-white/10">
                                    {{ player.name.charAt(0).toUpperCase() }}
                                </div>
                                <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-success border-2 border-surface-dark rounded-full shadow-sm"></div>
                            </div>
                            
                            <!-- Info -->
                            <div class="flex-1 ml-4 overflow-hidden">
                                <div class="font-bold text-slate-200 group-hover:text-primary-light transition-colors truncate">{{ player.name }}</div>
                                <div class="flex items-center gap-2 mt-0.5">
                                    <span class="text-[10px] text-slate-400 font-mono bg-black/30 px-1.5 py-0.5 rounded border border-white/10">
                                        {{ player.phone }}
                                    </span>
                                    <span class="text-[10px] text-slate-500">Mesafe: Yakın</span>
                                </div>
                            </div>
                            
                            <!-- Action Icon -->
                            <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                <i class="fas fa-chevron-right text-xs"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Pagination Controls -->
                    <div v-if="totalPages > 1" class="p-4 border-t border-white/10 bg-black/20 flex items-center justify-between">
                        <button @click="prevPage" :disabled="currentPage === 1"
                                class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                            <i class="fas fa-chevron-left text-xs"></i>
                        </button>
                        <span class="text-xs font-mono text-slate-500">
                            {{ currentPage }} / {{ totalPages }}
                        </span>
                        <button @click="nextPage" :disabled="currentPage === totalPages"
                                class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                            <i class="fas fa-chevron-right text-xs"></i>
                        </button>
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

        // Pagination State
        const currentPage = ref(1);
        const itemsPerPage = 5;

        const totalPages = computed(() => Math.ceil(store.nearbyPlayers.length / itemsPerPage));

        const paginatedPlayers = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return store.nearbyPlayers.slice(start, end);
        });

        const nextPage = () => {
            if (currentPage.value < totalPages.value) currentPage.value++;
        };

        const prevPage = () => {
            if (currentPage.value > 1) currentPage.value--;
        };

        const quickAmounts = [100, 500, 1000, 5000, 10000];

        const isValidTransfer = computed(() => {
            const rawAmount = parseInt(transferForm.value.amount.replace(/\D/g, '')) || 0;
            return transferForm.value.phone.length > 0 && 
                   rawAmount > 0 && 
                   rawAmount <= store.user.balance;
        });

        const formatAmountInput = (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value) {
                transferForm.value.amount = parseInt(value).toLocaleString('en-US');
            } else {
                transferForm.value.amount = '';
            }
        };

        const setAmount = (val) => {
            transferForm.value.amount = val.toLocaleString('en-US');
        };

        const setMaxAmount = () => {
            transferForm.value.amount = Math.floor(store.user.balance).toLocaleString('en-US');
        };

        const selectContact = (player) => {
            transferForm.value.phone = player.phone;
        };

        const handleTransfer = async () => {
            if (!isValidTransfer.value) return;
            
            const amount = parseInt(transferForm.value.amount.replace(/\D/g, ''));
            
            // FiveM Server Communication
            try {
                if (typeof GetParentResourceName !== 'undefined') {
                    const response = await fetch(`https://${GetParentResourceName()}/transferMoney`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            targetPhone: transferForm.value.phone,
                            amount: amount,
                            description: transferForm.value.description || 'Transfer'
                        })
                    });

                    const result = await response.json();
                    
                    if (result.success) {
                        transferForm.value = { phone: '', amount: '', description: '' };
                        store.currentView = 'dashboard';
                    } else {
                        store.showError('Transfer Hatası', result.message || 'Transfer işlemi başarısız');
                    }
                } else {
                    // Development/Test mode
                    store.user.balance -= amount;
                    store.addTransaction({
                        id: Date.now(),
                        type: 'out',
                        title: transferForm.value.description || 'Transfer: ' + transferForm.value.phone,
                        amount: amount,
                        date: new Date().toLocaleDateString('tr-TR')
                    });
                    
                    transferForm.value = { phone: '', amount: '', description: '' };
                    store.currentView = 'dashboard';
                }
            } catch (error) {
                console.error('Transfer error:', error);
                store.showError('Bağlantı Hatası', 'Server ile bağlantı kurulamadı');
            }
        };

        return {
            store,
            transferForm,
            quickAmounts,
            isValidTransfer,
            formatAmountInput,
            setAmount,
            setMaxAmount,
            selectContact,
            handleTransfer,
            currentPage,
            totalPages,
            paginatedPlayers,
            nextPage,
            prevPage
        };
    }
};
