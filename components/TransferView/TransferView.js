import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../../store.js';

export default {
    template: `
        <div class="transfer-view">
            <!-- Left Column: Transfer Form -->
            <div class="transfer-left-col">
                <!-- Main Card -->
                <div class="transfer-card">
                    <!-- Decorative Background -->
                    <div class="transfer-bg-glow-1"></div>
                    <div class="transfer-bg-glow-2"></div>

                    <!-- Header -->
                    <div class="transfer-header">
                        <div>
                            <h3 class="transfer-title-group">
                                <div class="transfer-icon-wrapper">
                                    <i class="fas fa-paper-plane text-sm"></i>
                                </div>
                                <span class="transfer-title">Para Transferi</span>
                            </h3>
                            <p class="transfer-subtitle">Güvenli ve hızlı para gönderimi</p>
                        </div>
                        <div class="transfer-balance-info">
                            <div class="transfer-balance-label">Mevcut Bakiye</div>
                            <div class="transfer-balance-value">{{ store.formatMoney(store.user.balance) }}</div>
                        </div>
                    </div>

                    <!-- Form Content -->
                    <div class="transfer-form">
                        
                        <!-- Input: Phone -->
                        <div class="transfer-input-group group">
                            <label class="transfer-label">
                                <i class="fas fa-hashtag mr-1"></i> Alıcı Hesap / Telefon
                            </label>
                            <div class="transfer-input-wrapper">
                                <input type="text" v-model="transferForm.phone" placeholder="555-0100" maxlength="10" 
                                       class="transfer-input">
                                <div class="transfer-input-icon">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Input: Amount -->
                        <div class="transfer-input-group group">
                            <label class="transfer-label accent">
                                <i class="fas fa-coins mr-1"></i> Gönderilecek Tutar
                            </label>
                            <div class="transfer-input-wrapper">
                                <input type="text" v-model="transferForm.amount" placeholder="0"
                                       @input="formatAmountInput"
                                       class="transfer-input amount">
                                <div class="transfer-input-icon accent">
                                    <i class="fas fa-dollar-sign"></i>
                                </div>
                                <button class="transfer-max-btn" @click="setMaxAmount">
                                    TÜMÜ
                                </button>
                            </div>
                            
                            <!-- Quick Amounts -->
                            <div class="transfer-quick-amounts custom-scrollbar">
                                <button v-for="amount in quickAmounts" :key="amount"
                                        @click="setAmount(amount)"
                                        class="transfer-quick-btn">
                                    \${{ amount.toLocaleString() }}
                                </button>
                            </div>
                        </div>
                        
                        <!-- Input: Description -->
                        <div class="transfer-input-group group">
                            <label class="transfer-label">
                                <i class="fas fa-align-left mr-1"></i> Açıklama (Opsiyonel)
                            </label>
                            <div class="transfer-input-wrapper">
                                <input type="text" v-model="transferForm.description" placeholder="Ödeme notu..." 
                                       class="transfer-input">
                                <div class="transfer-input-icon">
                                    <i class="fas fa-pen"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Action Button -->
                        <button class="transfer-submit-btn group"
                                @click="handleTransfer"
                                :disabled="!isValidTransfer"
                                :class="isValidTransfer ? 'active' : 'disabled'">
                            
                            <span class="transfer-btn-content">
                                <span>Transferi Onayla</span>
                                <i class="fas fa-arrow-right transfer-btn-icon"></i>
                            </span>
                            
                            <!-- Shine Effect -->
                            <div class="transfer-btn-shine" v-if="isValidTransfer"></div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Column: Nearby & Recent -->
            <div class="transfer-right-col">
                
                <!-- Nearby Players -->
                <div class="nearby-card">
                    <div class="nearby-header">
                        <h3 class="nearby-title">
                            <i class="fas fa-map-marker-alt"></i>
                            Yakındaki Kişiler
                        </h3>
                    </div>
                    
                    <div class="nearby-list custom-scrollbar">
                        <div v-if="store.nearbyPlayers.length === 0" class="nearby-empty">
                            <i class="fas fa-users-slash"></i>
                            <span>Yakında kimse yok</span>
                        </div>

                        <div v-for="player in paginatedPlayers" :key="player.id"
                             @click="selectContact(player)"
                             class="nearby-item group">
                            
                            <!-- Avatar -->
                            <div class="nearby-avatar-wrapper">
                                <div class="nearby-avatar">
                                    {{ player.name.charAt(0).toUpperCase() }}
                                </div>
                                <div class="nearby-status-dot"></div>
                            </div>
                            
                            <!-- Info -->
                            <div class="nearby-info">
                                <div class="nearby-name">{{ player.name }}</div>
                                <div class="nearby-meta">
                                    <span class="nearby-phone">
                                        {{ player.phone }}
                                    </span>
                                    <span class="nearby-distance">Mesafe: Yakın</span>
                                </div>
                            </div>
                            
                            <!-- Action Icon -->
                            <div class="nearby-action-icon">
                                <i class="fas fa-chevron-right text-xs"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Pagination Controls -->
                    <div v-if="totalPages > 1" class="nearby-pagination">
                        <button @click="prevPage" :disabled="currentPage === 1"
                                class="nearby-page-btn">
                            <i class="fas fa-chevron-left text-xs"></i>
                        </button>
                        <span class="nearby-page-info">
                            {{ currentPage }} / {{ totalPages }}
                        </span>
                        <button @click="nextPage" :disabled="currentPage === totalPages"
                                class="nearby-page-btn">
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