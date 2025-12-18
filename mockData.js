export const mockUser = {
    name: 'Michael De Santa',
    phone: '555-0184',
    balance: 1450250.50,
    pin: '1234'
};

export const mockTransactions = [
    { id: 1, type: 'in', title: 'Fleeca Bank Deposit', amount: 5500, date: '18.12.2025' },
    { id: 2, type: 'out', title: 'Benny\'s Motorworks', amount: 1200, date: '17.12.2025' },
    { id: 3, type: 'out', title: '24/7 Store', amount: 450.75, date: '16.12.2025' },
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