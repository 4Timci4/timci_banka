import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store, useStore } from '../../store.js';

export default {
    template: `
        <section class="setup-pin-view">
            <!-- Dynamic Background -->
            <div class="setup-bg-noise"></div>
            <div class="setup-bg-glow-1"></div>
            <div class="setup-bg-glow-2"></div>

            <!-- Setup Card -->
            <div class="setup-card">
                
                <!-- Header -->
                <div class="setup-header">
                    <div class="setup-icon-wrapper">
                        <div class="setup-icon-glow"></div>
                        <div class="setup-icon-inner">
                            <i class="fas fa-shield-alt setup-icon"></i>
                        </div>
                    </div>
                    <h1 class="setup-title">PIN Oluştur</h1>
                    <p class="setup-subtitle">Hesabınızın güvenliği için 4 haneli bir PIN belirleyin.</p>
                </div>

                <!-- PIN Section -->
                <div class="setup-pin-section">
                    <!-- PIN Display -->
                    <div class="setup-pin-display"
                         :class="{ 'error': error }">
                        
                        <!-- Error Flash -->
                        <div class="setup-error-flash"></div>

                        <div v-for="i in 4" :key="i" 
                             class="setup-pin-dot"
                             :class="{ 
                                 'filled': i <= pinInput.length,
                                 'error': error && i <= pinInput.length
                             }">
                        </div>
                    </div>
                    
                    <!-- Keypad -->
                    <div class="setup-keypad">
                        <button v-for="n in 9" :key="n" @click="enterPin(n)" 
                                class="setup-key-btn group">
                            <span class="setup-key-content">{{ n }}</span>
                            <div class="setup-key-shine"></div>
                        </button>
                        
                        <button class="setup-key-btn backspace group" @click="clearPin">
                            <i class="fas fa-backspace"></i>
                        </button>
                        
                        <button @click="enterPin(0)" class="setup-key-btn group">
                            <span class="setup-key-content">0</span>
                            <div class="setup-key-shine"></div>
                        </button>
                        
                        <button class="setup-key-btn submit group" 
                                @click="submitPin"
                                :disabled="pinInput.length !== 4">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </div>

                <!-- Footer Info -->
                <div class="setup-footer">
                    <p class="setup-footer-text">
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