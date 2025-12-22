import { store } from '../../store.js';
import { menuItems } from '../../constants/menuItems.js';

export default {
    template: `
        <aside class="sidebar">
            <!-- Brand -->
            <div class="sidebar-brand group">
                <div class="sidebar-logo-wrapper">
                    <i class="fas fa-university sidebar-logo-icon"></i>
                </div>
                <div class="sidebar-brand-text">
                    <h2 class="sidebar-brand-title">LS Bank</h2>
                    <p class="sidebar-brand-subtitle">Personal Banking</p>
                </div>
            </div>
            
            <!-- Navigation -->
            <nav class="sidebar-nav custom-scrollbar">
                <p class="sidebar-section-title">Ana Menü</p>
                
                <button v-for="item in menuItems" :key="item.id"
                        @click="store.currentView = item.id"
                        class="sidebar-nav-btn group"
                        :class="store.currentView === item.id ? 'active' : ''">
                    
                    <!-- Active Indicator -->
                    <div class="sidebar-active-indicator"></div>
                    
                    <!-- Hover Glow -->
                    <div class="sidebar-hover-glow"></div>
                    
                    <!-- Icon -->
                    <span class="sidebar-icon-box">
                        <span v-html="item.icon"></span>
                    </span>
                    
                    <!-- Label -->
                    <span class="sidebar-label">{{ item.label }}</span>
                    
                    <!-- Chevron -->
                    <i class="fas fa-chevron-right sidebar-chevron"></i>
                </button>
            </nav>

            <!-- User Profile (Bottom) -->
            <div class="sidebar-footer">
                <div class="sidebar-profile-card group">
                    <div class="sidebar-profile-content">
                        <div class="sidebar-avatar">
                            {{ store.user.name.charAt(0) }}
                        </div>
                        <div class="sidebar-profile-info">
                            <div class="sidebar-profile-name">{{ store.user.name }}</div>
                            <div class="sidebar-profile-id">{{ store.user.phone }}</div>
                        </div>
                        <button @click="logout" 
                                class="sidebar-logout-btn" 
                                title="Çıkış Yap">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    `,
    setup() {
        const logout = () => {
            store.currentView = 'login';
            store.pinInput = '';
        };

        return {
            store,
            menuItems,
            logout
        };
    }
};