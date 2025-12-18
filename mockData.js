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
];

export const mockNearbyPlayers = [
    { id: 101, name: 'Franklin Clinton', phone: '555-0199' },
    { id: 204, name: 'Trevor Philips', phone: '555-0145' },
    { id: 355, name: 'Lamar Davis', phone: '555-0162' },
    { id: 402, name: 'Lester Crest', phone: '555-0178' }
];

export const mockLoans = [
    { id: 1, totalAmount: 50000, remainingAmount: 35000, nextInstallment: 2500, date: '01.11.2025' }
];

export const mockBills = [
    {
        id: 1,
        title: 'Elektrik Faturası',
        company: 'LS Power & Light',
        amount: 450,
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
    }
];