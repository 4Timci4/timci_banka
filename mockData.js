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