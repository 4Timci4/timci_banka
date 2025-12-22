import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store, useStore } from '../../store.js';

export default {
    template: `
        <div class="settings-view">
            <!-- Header -->
            <div class="settings-header">
                <div>
                    <h2 class="settings-title">Ayarlar</h2>
                    <p class="settings-subtitle">Hesap ve güvenlik ayarlarınızı yönetin</p>
                </div>
            </div>

            <div class="settings-grid">
                <!-- Security Settings -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <div class="settings-icon-wrapper security">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div>
                            <h3 class="settings-card-title">Güvenlik</h3>
                            <p class="settings-card-subtitle">PIN ve giriş ayarları</p>
                        </div>
                    </div>

                    <!-- Change PIN Form -->
                    <div class="settings-form">
                        <div class="settings-input-group">
                            <label class="settings-label">Mevcut PIN</label>
                            <input type="password" v-model="currentPin" maxlength="4" placeholder="****" 
                                   class="settings-input">
                        </div>

                        <div class="settings-input-group">
                            <label class="settings-label">Yeni PIN</label>
                            <input type="password" v-model="newPin" maxlength="4" placeholder="****" 
                                   class="settings-input">
                        </div>

                        <div class="settings-input-group">
                            <label class="settings-label">Yeni PIN (Tekrar)</label>
                            <input type="password" v-model="confirmPin" maxlength="4" placeholder="****" 
                                   class="settings-input">
                        </div>

                        <button @click="handleChangePin" 
                                :disabled="!isValid"
                                class="settings-btn"
                                :class="isValid ? 'active' : 'disabled'">
                            <i class="fas fa-key"></i>
                            <span>PIN Değiştir</span>
                        </button>
                    </div>
                </div>

                <!-- Account Info -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <div class="settings-icon-wrapper account">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div>
                            <h3 class="settings-card-title">Hesap Bilgileri</h3>
                            <p class="settings-card-subtitle">Kişisel bilgileriniz</p>
                        </div>
                    </div>

                    <div class="settings-info-list">
                        <div class="settings-info-item">
                            <div>
                                <p class="settings-info-label">Ad Soyad</p>
                                <p class="settings-info-value">{{ store.user.name }}</p>
                            </div>
                            <i class="fas fa-check-circle text-emerald-500"></i>
                        </div>

                        <div class="settings-info-item">
                            <div>
                                <p class="settings-info-label">Telefon</p>
                                <p class="settings-info-value mono">{{ store.user.phone }}</p>
                            </div>
                            <i class="fas fa-check-circle text-emerald-500"></i>
                        </div>

                        <div class="settings-info-item">
                            <div>
                                <p class="settings-info-label">Hesap Durumu</p>
                                <div class="settings-status-active">
                                    <span class="settings-status-dot"></span>
                                    Aktif
                                </div>
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

        const handleChangePin = async () => {
            if (newPin.value !== confirmPin.value) {
                showError('Hata', 'Yeni PINler eşleşmiyor');
                return;
            }

            try {
                await changePin(currentPin.value, newPin.value);
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