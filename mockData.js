export const mockUser = {
    name: 'Michael De Santa',
    phone: '555-0184',
    balance: 1450250,
    pin: '1234'
};

export const mockTransactions = [
    { id: 1, type: 'in', title: 'Fleeca Bank Deposit', amount: 5500, date: '18.12.2025' },
    { id: 2, type: 'out', title: 'Benny\'s Motorworks', amount: 1200, date: '17.12.2025' },
    { id: 3, type: 'out', title: '24/7 Store', amount: 450, date: '16.12.2025' },
    { id: 4, type: 'in', title: 'ATM Deposit', amount: 2000, date: '15.12.2025' },
    { id: 5, type: 'out', title: 'Vanilla Unicorn', amount: 350, date: '14.12.2025' },
    { id: 6, type: 'out', title: 'LTD Gasoline', amount: 950, date: '13.12.2025' },
    { id: 7, type: 'in', title: 'Maze Bank Transfer', amount: 1500, date: '12.12.2025' },
    { id: 8, type: 'in', title: 'Bank of Liberty Transfer', amount: 3200, date: '11.12.2025' },
    { id: 9, type: 'out', title: 'Ammu-Nation', amount: 2800, date: '10.12.2025' },
    { id: 10, type: 'out', title: 'Hair Salon', amount: 150, date: '09.12.2025' },
    { id: 11, type: 'in', title: 'Salary Payment', amount: 8000, date: '08.12.2025' },
    { id: 12, type: 'out', title: 'Vehicle Insurance', amount: 1200, date: '07.12.2025' },
    { id: 13, type: 'in', title: 'Investment Return', amount: 4500, date: '06.12.2025' },
    { id: 14, type: 'out', title: 'Premium Deluxe Motorsport', amount: 45000, date: '05.12.2025' },
    { id: 15, type: 'out', title: 'DockTeq', amount: 800, date: '04.12.2025' },
    { id: 16, type: 'in', title: 'Online Banking Transfer', amount: 1800, date: '03.12.2025' },
    { id: 17, type: 'out', title: 'Tax Payment', amount: 2500, date: '02.12.2025' },
    { id: 18, type: 'in', title: 'Refund', amount: 750, date: '01.12.2025' },
    { id: 19, type: 'out', title: 'Phone Bill', amount: 89, date: '30.11.2025' },
    { id: 20, type: 'out', title: 'Internet Bill', amount: 120, date: '29.11.2025' },
    { id: 21, type: 'in', title: 'Freelance Payment', amount: 3200, date: '28.11.2025' },
    { id: 22, type: 'out', title: 'Restaurant', amount: 450, date: '27.11.2025' },
    { id: 23, type: 'in', title: 'Loan Approval', amount: 15000, date: '26.11.2025' },
    { id: 24, type: 'out', title: 'Medical Services', amount: 1800, date: '25.11.2025' },
    { id: 25, type: 'in', title: 'Dividend Payment', amount: 2200, date: '24.11.2025' },
    { id: 26, type: 'out', title: 'Clothing Store', amount: 1200, date: '23.11.2025' },
    { id: 27, type: 'out', title: 'Gym Membership', amount: 150, date: '22.11.2025' },
    { id: 28, type: 'in', title: 'Stock Market Profit', amount: 6800, date: '21.11.2025' },
    { id: 29, type: 'out', title: 'Car Repair', amount: 2400, date: '20.11.2025' },
    { id: 30, type: 'in', title: 'Gift Transfer', amount: 500, date: '19.11.2025' },
];

export const mockNearbyPlayers = [
    { id: 101, name: 'Franklin Clinton', phone: '555-0199' },
    { id: 204, name: 'Trevor Philips', phone: '555-0145' },
    { id: 355, name: 'Lamar Davis', phone: '555-0162' },
    { id: 402, name: 'Lester Crest', phone: '555-0178' },
    { id: 512, name: 'Jimmy De Santa', phone: '555-0112' },
    { id: 623, name: 'Tracey De Santa', phone: '555-0134' },
    { id: 745, name: 'Ron Jakowski', phone: '555-0189' },
    { id: 856, name: 'Wade Hebert', phone: '555-0167' },
    { id: 967, name: 'Amanda De Santa', phone: '555-0123' },
    { id: 108, name: 'Dave Norton', phone: '555-0156' },
    { id: 119, name: 'Dr. Friedlander', phone: '555-0190' },
    { id: 130, name: 'Simeon Yetarian', phone: '555-0111' },
    { id: 141, name: 'Martin Madrazo', phone: '555-0177' },
    { id: 152, name: 'Solomon Richards', phone: '555-0155' }
];

export const mockLoans = [
    { id: 1, totalAmount: 50000, remainingAmount: 35000, nextInstallment: 2500, date: '01.11.2025' },
    { id: 2, totalAmount: 15000, remainingAmount: 12000, nextInstallment: 850, date: '15.11.2025' },
    { id: 3, totalAmount: 75000, remainingAmount: 72000, nextInstallment: 3200, date: '20.11.2025' },
    { id: 4, totalAmount: 25000, remainingAmount: 10000, nextInstallment: 1500, date: '05.10.2025' },
    { id: 5, totalAmount: 100000, remainingAmount: 95000, nextInstallment: 4500, date: '01.12.2025' },
    { id: 6, totalAmount: 5000, remainingAmount: 2000, nextInstallment: 500, date: '10.09.2025' },
    { id: 7, totalAmount: 30000, remainingAmount: 28000, nextInstallment: 1800, date: '25.11.2025' },
    { id: 8, totalAmount: 12000, remainingAmount: 6000, nextInstallment: 1000, date: '15.08.2025' },
    { id: 9, totalAmount: 60000, remainingAmount: 58000, nextInstallment: 2800, date: '28.11.2025' },
    { id: 10, totalAmount: 20000, remainingAmount: 18000, nextInstallment: 1200, date: '05.12.2025' }
];

export const mockBills = [
    {
        id: 1,
        title: 'Elektrik Faturası',
        company: 'LS Power & Light',
        amount: 4321321350,
        dueDate: '25.12.2025',
        status: 'pending',
        categoryColor: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
    },
    {
        id: 2,
        title: 'Su Faturası',
        company: 'LS Water Department',
        amount: 125,
        dueDate: '28.12.2025',
        status: 'pending',
        categoryColor: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>'
    },
    {
        id: 3,
        title: 'Telefon Faturası',
        company: 'Eyefind Mobile',
        amount: 89,
        dueDate: '30.12.2025',
        status: 'pending',
        categoryColor: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>'
    },
    {
        id: 4,
        title: 'İnternet Faturası',
        company: 'LifeInvader',
        amount: 120,
        dueDate: '29.12.2025',
        status: 'pending',
        categoryColor: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />'
    },
    {
        id: 5,
        title: 'Kira Ödemesi',
        company: 'Dynasty 8 Real Estate',
        amount: 3500,
        dueDate: '01.01.2026',
        status: 'pending',
        categoryColor: 'bg-green-500/10 text-green-400 border border-green-500/20',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>'
    },
    {
        id: 6,
        title: 'Araç Sigortası',
        company: 'Mors Mutual Insurance',
        amount: 850,
        dueDate: '05.01.2026',
        status: 'pending',
        categoryColor: 'bg-red-500/10 text-red-400 border border-red-500/20',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>'
    },
    {
        id: 7,
        title: 'Kredi Kartı',
        company: 'Maze Bank',
        amount: 1200,
        dueDate: '10.01.2026',
        status: 'pending',
        categoryColor: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>'
    },
    {
        id: 8,
        title: 'Kablolu TV',
        company: 'Weazel News',
        amount: 65,
        dueDate: '15.01.2026',
        status: 'pending',
        categoryColor: 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>'
    },
    {
        id: 9,
        title: 'Spor Salonu',
        company: 'Muscle Sands Gym',
        amount: 45,
        dueDate: '02.01.2026',
        status: 'pending',
        categoryColor: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>'
    },
    {
        id: 10,
        title: 'Güvenlik Hizmeti',
        company: 'Merryweather Security',
        amount: 550,
        dueDate: '20.01.2026',
        status: 'pending',
        categoryColor: 'bg-gray-500/10 text-gray-400 border border-gray-500/20',
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>'
    }
];
