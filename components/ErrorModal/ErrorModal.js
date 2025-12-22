import { store } from '../../store.js';

export default {
    template: `
        <transition name="modal">
            <div v-if="store.errorModal.show" class="error-modal-overlay" @click="store.closeErrorModal">
                <div @click.stop class="error-modal-container">
                    
                    <!-- Background Glow -->
                    <div class="error-modal-glow"></div>

                    <!-- Icon -->
                    <div class="error-modal-icon-wrapper">
                        <div class="error-modal-icon-circle">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="error-modal-content">
                        <h3 class="error-modal-title">{{ store.errorModal.title }}</h3>
                        <p class="error-modal-message">{{ store.errorModal.message }}</p>
                    </div>

                    <!-- Footer -->
                    <div class="error-modal-footer">
                        <button @click="store.closeErrorModal" 
                                class="error-modal-btn group">
                            <span>Tamam</span>
                            <i class="fas fa-check"></i>
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