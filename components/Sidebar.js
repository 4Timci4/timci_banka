import { store } from '../store.js';
import { menuItems } from '../constants/menuItems.js';

export default {
    template: `
        <aside class="w-80 bg-surface border-r border-slate-800 p-6 flex flex-col shrink-0 relative z-20">
            <!-- Brand -->
            <div class="mb-12 flex items-center gap-4 px-2">
                <div class="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <span class="font-bold text-lg">LS</span>
                </div>
                <div>
                    <h2 class="font-bold text-xl text-white tracking-tight">LS Bank</h2>
                    <p class="text-xs text-slate-500">Personal Banking</p>
                </div>
            </div>
            
            <!-- Navigation -->
            <nav class="flex-1 space-y-2">
                <p class="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Menu</p>
                <button v-for="item in menuItems" :key="item.id"
                        @click="store.currentView = item.id"
                        class="w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden"
                        :class="store.currentView === item.id ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'">
                    
                    <div class="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" v-if="store.currentView !== item.id"></div>
                    <div class="w-1 h-6 bg-primary rounded-full absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300"
                         :class="store.currentView === item.id ? 'opacity-100' : 'opacity-0'"></div>
                    
                    <span class="relative z-10" v-html="item.icon"></span>
                    <span class="relative z-10 font-medium">{{ item.label }}</span>
                </button>
            </nav>

            <!-- User Profile (Bottom) -->
            <div class="mt-auto bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-lg font-bold text-slate-300 border border-slate-600">
                    {{ store.user.name.charAt(0) }}
                </div>
                <div class="flex-1 min-w-0">
                    <div class="font-bold text-sm text-white truncate">{{ store.user.name }}</div>
                    <div class="text-xs text-slate-400 font-mono truncate">{{ store.user.phone }}</div>
                </div>
                <button @click="logout" class="text-slate-400 hover:text-danger transition-colors p-2" title="Çıkış Yap">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </button>
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
