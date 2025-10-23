// Simple in-memory database (for demo - replace with real DB in production)
let users = [
  {
    id: 1,
    name: "Demo User",
    email: "demo@quicktop.com",
    phone: "08012345678",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    balance: 5000.00,
    createdAt: new Date().toISOString()
  }
];

let transactions = [
  {
    id: 1,
    userId: 1,
    type: "credit",
    amount: 5000.00,
    description: "Initial deposit",
    createdAt: new Date().toISOString()
  }
];

let services = [
  {
    id: 1,
    name: "Airtime",
    description: "Mobile airtime top-up"
  },
  {
    id: 2,
    name: "Data",
    description: "Internet data bundles"
  }
];

// User methods
export const usersDB = {
  create: (user) => {
    const newUser = {
      id: users.length + 1,
      ...user,
      balance: 0.00,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  },

  findByEmail: (email) => {
    return users.find(user => user.email === email);
  },

  findById: (id) => {
    return users.find(user => user.id === parseInt(id));
  },

  updateBalance: (userId, newBalance) => {
    const user = users.find(u => u.id === parseInt(userId));
    if (user) {
      user.balance = newBalance;
      return user;
    }
    return null;
  }
};

// Transaction methods
export const transactionsDB = {
  create: (transaction) => {
    const newTransaction = {
      id: transactions.length + 1,
      ...transaction,
      createdAt: new Date().toISOString()
    };
    transactions.push(newTransaction);
    return newTransaction;
  },

  findByUserId: (userId) => {
    return transactions.filter(t => t.userId === parseInt(userId));
  }
};

// Service methods
export const servicesDB = {
  findAll: () => {
    return services;
  },

  findById: (id) => {
    return services.find(service => service.id === parseInt(id));
  }
};
