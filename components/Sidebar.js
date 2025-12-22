import { store } from '../store.js';
import { menuItems } from '../constants/menuItems.js';

export default {
    template: `
        <aside class="w-80 bg-surface-dark/95 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col shrink-0 relative z-20 h-full">
            <!-- Brand -->
            <div class="mb-10 px-2 flex items-center gap-4 group cursor-default">
                <div class="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300 border border-white/10">
                    <i class="fas fa-university text-xl"></i>
                </div>
                <div>
                    <h2 class="font-bold text-2xl text-white tracking-tight group-hover:text-primary-light transition-colors">LS Bank</h2>
                    <p class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Personal Banking</p>
                </div>
            </div>
            
            <!-- Navigation -->
            <nav class="flex-1 space-y-2 overflow-y-auto custom-scrollbar -mr-2 pr-2">
                <p class="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 opacity-70">Ana Menü</p>
                
                <button v-for="item in menuItems" :key="item.id"
                        @click="store.currentView = item.id"
                        class="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden"
                        :class="store.currentView === item.id ? 'bg-primary/10 text-white shadow-lg shadow-primary/5' : 'text-slate-400 hover:bg-white/5 hover:text-white'">
                    
                    <!-- Active Indicator -->
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full transition-all duration-300"
                         :class="store.currentView === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'"></div>
                    
                    <!-- Hover Glow -->
                    <div class="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
                    <!-- Icon -->
                    <span class="relative z-10 w-6 h-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                          :class="store.currentView === item.id ? 'text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'group-hover:text-slate-200'">
                        <span v-html="item.icon"></span>
                    </span>
                    
                    <!-- Label -->
                    <span class="relative z-10 font-medium text-sm tracking-wide">{{ item.label }}</span>
                    
                    <!-- Chevron -->
                    <i class="fas fa-chevron-right absolute right-4 text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-slate-500"></i>
                </button>
            </nav>

            <!-- User Profile (Bottom) -->
            <div class="mt-6 pt-6 border-t border-white/5">
                <div class="bg-black/20 rounded-2xl p-3 border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden">
                    <div class="flex items-center gap-3 relative z-10">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-lg font-bold text-white border border-white/10 shadow-inner">
                            {{ store.user.name.charAt(0) }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-bold text-sm text-white truncate group-hover:text-primary-light transition-colors">{{ store.user.name }}</div>
                            <div class="text-[10px] text-slate-500 font-mono truncate bg-black/30 inline-block px-1.5 rounded mt-0.5">{{ store.user.phone }}</div>
                        </div>
                        <button @click="logout" 
                                class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all" 
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
