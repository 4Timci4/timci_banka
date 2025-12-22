import { store } from '../../store.js';
import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
    template: `
        <!-- 3D Perspective Container -->
        <div class="credit-card-container"
             @mousemove="handleMouseMove"
             @mouseleave="handleMouseLeave"
             @mouseenter="handleMouseEnter">
            
            <!-- Card Element (Rotatable) -->
            <div ref="cardRef" 
                 class="credit-card"
                 :style="cardStyle">
                
                <!-- 1. Background Layers -->
                <div class="card-background-layer">
                    <!-- Dynamic Mesh Gradient -->
                    <div class="card-noise"></div>
                    <div class="card-gradient-1"></div>
                    <div class="card-glow-1"></div>
                    <div class="card-glow-2"></div>
                    
                    <!-- Glass Reflection (Dynamic) -->
                    <div class="card-glass-reflection"></div>
                </div>

                <!-- 2. Content Layer -->
                <div class="card-content">
                    
                    <!-- Header: Chip & Bank Logo -->
                    <div class="card-header">
                        <div class="card-chip-container">
                            <!-- Realistic EMV Chip -->
                            <div class="card-chip">
                                <svg width="100%" height="100%" viewBox="0 0 48 36" class="card-chip-svg">
                                    <path d="M0 18H48M16 0V36M32 0V36" stroke="#451a03" stroke-width="1"/>
                                    <rect x="16" y="10" width="16" height="16" rx="4" stroke="#451a03" stroke-width="1"/>
                                </svg>
                                <!-- Shine on Chip -->
                                <div class="card-chip-shine"></div>
                            </div>
                            
                            <!-- Contactless Icon -->
                            <svg class="card-contactless-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                            </svg>
                        </div>
                        
                        <!-- Bank Brand -->
                        <div class="card-brand">
                            <div class="card-bank-name">LS BANK</div>
                            <div class="card-tier">Platinum</div>
                        </div>
                    </div>

                    <!-- Middle: Balance (Interactive) -->
                    <div class="card-balance-section group/balance" @click="toggleBalance">
                        <div class="card-balance-label">
                            <span>Toplam Bakiye</span>
                            <i :class="showBalance ? 'fas fa-eye-slash' : 'fas fa-eye'" class="card-balance-eye"></i>
                        </div>
                        <div class="card-balance-value-wrapper">
                            <div class="card-balance-value"
                                 :class="{'hidden': !showBalance}">
                                {{ store.formatMoney(store.user.balance) }}
                            </div>
                            <!-- Privacy Overlay Text -->
                            <div v-if="!showBalance" class="card-balance-hidden-text">
                                ****.***,**
                            </div>
                        </div>
                    </div>

                    <!-- Footer: Card Info -->
                    <div class="card-footer">
                        <div class="card-details-col">
                            <!-- Card Number (Copyable) -->
                            <div class="card-number-wrapper group/number" @click="copyCardNumber">
                                <div class="card-number">
                                    **** **** **** {{ store.user.cardNumberLast4 }}
                                </div>
                                <!-- Copy Tooltip -->
                                <div class="card-copy-tooltip group-hover/number:opacity-100">
                                    {{ copied ? 'Kopyalandı!' : 'Kopyalamak için tıkla' }}
                                </div>
                            </div>
                            
                            <div class="card-info-row">
                                <div>
                                    <div class="card-holder-label">Kart Sahibi</div>
                                    <div class="card-holder-name">
                                        {{ formatName(store.user.name) }}
                                    </div>
                                </div>
                                <div class="card-expiry-box">
                                    <div class="card-expiry-label">SKT</div>
                                    <div class="card-expiry-date">12/28</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 3. Glossy Sheen (Interactive) -->
                <div class="card-sheen"
                     :style="sheenStyle"></div>
                     
                <!-- 4. Border Glow -->
                <div class="card-border-glow"></div>
            </div>
        </div>
    `,
    setup() {
        const cardRef = ref(null);
        const showBalance = ref(true);
        const copied = ref(false);
        
        // Reactive styles for 3D effect
        const rotateX = ref(0);
        const rotateY = ref(0);
        const sheenX = ref(50);
        const sheenY = ref(50);

        const formatName = (name) => {
            if (!name) return 'ISIMSIZ';
            return name.replace(/i/g, 'I').toUpperCase();
        };

        const toggleBalance = () => {
            showBalance.value = !showBalance.value;
        };

        const copyCardNumber = () => {
            // Gerçek senaryoda tam numara store'da olmalı, şimdilik görseli simüle ediyoruz
            // veya son 4 haneyi kopyalıyoruz.
            const textToCopy = `**** **** **** ${store.user.cardNumberLast4}`;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                copied.value = true;
                setTimeout(() => copied.value = false, 2000);
            }).catch(err => console.error('Copy failed', err));
        };

        // 3D Tilt Logic
        const handleMouseMove = (e) => {
            if (!cardRef.value) return;

            const rect = cardRef.value.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (max 15 degrees)
            rotateX.value = ((y - centerY) / centerY) * -10;
            rotateY.value = ((x - centerX) / centerX) * 10;

            // Calculate sheen position
            sheenX.value = (x / rect.width) * 100;
            sheenY.value = (y / rect.height) * 100;
        };

        const handleMouseLeave = () => {
            // Reset position smoothly
            rotateX.value = 0;
            rotateY.value = 0;
            sheenX.value = 50;
            sheenY.value = 50;
        };

        const handleMouseEnter = () => {
            // Optional: Add specific enter animation logic here if needed
        };

        const cardStyle = computed(() => ({
            transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale3d(1.02, 1.02, 1.02)`,
        }));

        const sheenStyle = computed(() => ({
            background: `radial-gradient(circle at ${sheenX.value}% ${sheenY.value}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
        }));

        return {
            store,
            cardRef,
            showBalance,
            copied,
            formatName,
            toggleBalance,
            copyCardNumber,
            handleMouseMove,
            handleMouseLeave,
            handleMouseEnter,
            cardStyle,
            sheenStyle
        };
    }
};