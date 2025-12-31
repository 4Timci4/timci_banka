import { store } from '../../store.js';

export default {
    template: `
        <transition name="modal">
            <div v-if="store.successModal.show" class="success-modal-overlay" @click="closeSuccessModal">
                <div class="success-modal-container" @click.stop>
                    <div class="success-modal-content">
                        <div class="success-icon-wrapper">
                            <i class="fas fa-check"></i>
                        </div>
                        <h3 class="success-title">{{ store.successModal.title }}</h3>
                        <p class="success-message">{{ store.successModal.message }}</p>
                        <button @click="closeSuccessModal" class="success-btn">Tamam</button>
                    </div>
                    <!-- Confetti Particles (CSS Only) -->
                    <div class="confetti-container">
                        <div v-for="n in 20" :key="n" class="confetti"></div>
                    </div>
                </div>
            </div>
        </transition>
    `,
    setup() {
        const closeSuccessModal = () => {
            store.closeSuccessModal();
        };

        return {
            store,
            closeSuccessModal
        };
    }
};