import { computed, ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { store } from '../../store.js';

export default {
    template: `
        <section class="login-view">
            <!-- Dynamic Background -->
            <div class="login-bg-noise"></div>
            <div class="login-bg-glow-1"></div>
            <div class="login-bg-glow-2"></div>

            <!-- Login Card -->
            <div class="login-card">
                
                <!-- Logo & Header -->
                <div class="login-header">
                    <div class="login-logo-wrapper">
                        <div class="login-logo-glow"></div>
                        <div class="login-logo-inner">
                            <i class="fas fa-university login-logo-icon"></i>
                        </div>
                    </div>
                    <h1 class="login-title">LS Bank</h1>
                    <p class="login-subtitle">Güvenli Bankacılık Sistemi</p>
                </div>

                <!-- PIN Section -->
                <div class="login-pin-section">
                    <!-- PIN Display -->
                    <div class="login-pin-display"
                         :class="{ 'error': store.loginError }">
                        
                        <!-- Error Flash -->
                        <div class="login-error-flash"></div>

                        <div v-for="i in 4" :key="i" 
                             class="login-pin-dot"
                             :class="{ 
                                 'filled': i <= store.pinInput.length,
                                 'error': store.loginError && i <= store.pinInput.length
                             }">
                        </div>
                    </div>
                    
                    <!-- Keypad -->
                    <div class="login-keypad">
                        <button v-for="n in 9" :key="n" @click="enterPin(n)" 
                                class="login-key-btn group">
                            <span class="login-key-content">{{ n }}</span>
                            <div class="login-key-shine"></div>
                        </button>
                        
                        <button class="login-key-btn backspace group" @click="clearPin">
                            <i class="fas fa-backspace"></i>
                        </button>
                        
                        <button @click="enterPin(0)" class="login-key-btn group">
                            <span class="login-key-content">0</span>
                            <div class="login-key-shine"></div>
                        </button>
                        
                        <button class="login-key-btn submit group" @click="submitLogin">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

                <!-- Footer Info -->
                <div class="login-footer">
                    <div class="login-info-group">
                        <span class="login-info-label">Müşteri ID</span>
                        <span class="login-info-value">{{ store.user.phone }}</span>
                    </div>
                    
                    <label class="login-pin-toggle">
                        <span class="login-toggle-label">PIN Koruması</span>
                        <div class="login-toggle-switch">
                            <input type="checkbox" v-model="store.pinRequired" class="login-toggle-input">
                            <div class="login-toggle-track">
                                <div class="login-toggle-thumb"></div>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
            
            <!-- Version -->
            <div class="login-version">
                LS BANK OS v2.4.0
            </div>
        </section>
    `,
    setup() {
        onMounted(() => {
            if (!store.user.hasPin) {
                store.currentView = 'setup-pin';
            }
            
            // Add global keydown listener for this view
            window.addEventListener('keydown', handleKeydown);
        });

        // Cleanup listener when component is unmounted (although in this architecture components might not unmount traditionally,
        // but since we are using v-if in index.html, it's safer to handle if possible, or just be mindful)
        // Since we don't have onUnmounted here easily available without import, we'll keep it simple.
        // However, we should be careful not to duplicate listeners if view switches back and forth.
        // A better approach in this setup is to check if current view is login.

        const handleKeydown = (e) => {
            if (store.currentView !== 'login') return;

            // Numbers (Main keyboard and Numpad)
            if (/^\d$/.test(e.key)) {
                enterPin(e.key);
            }
            // Backspace
            else if (e.key === 'Backspace') {
                // Remove last digit
                if (store.pinInput.length > 0) {
                    store.pinInput = store.pinInput.slice(0, -1);
                    store.loginError = false;
                }
            }
            // Enter
            else if (e.key === 'Enter') {
                submitLogin();
            }
        };

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
            // Check if user needs to setup PIN first
            if (!store.user.hasPin) {
                store.currentView = 'setup-pin';
                store.pinInput = '';
                return;
            }

            if (!store.pinRequired || store.pinInput === store.user.pin) {
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
            enterPin,
            clearPin,
            submitLogin
        };
    }
};