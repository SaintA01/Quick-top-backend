import { authenticate } from '../../middleware/auth.js';
import { usersDB, transactionsDB } from '../../lib/db.js';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { network, phone, amount } = req.body;
    const user = req.user;

    // Validation
    if (!network || !phone || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Network, phone, and amount are required'
      });
    }

    const purchaseAmount = parseFloat(amount);

    if (isNaN(purchaseAmount) || purchaseAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      });
    }

    // Check balance
    if (user.balance < purchaseAmount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance'
      });
    }

    // Simulate airtime purchase (in real app, integrate with VTU provider)
    const newBalance = user.balance - purchaseAmount;
    
    // Update user balance
    usersDB.updateBalance(user.id, newBalance);

    // Create transaction record
    transactionsDB.create({
      userId: user.id,
      type: 'debit',
      amount: purchaseAmount,
      description: `Airtime purchase - ${network} ${phone}`,
      service: 'airtime'
    });

    res.status(200).json({
      success: true,
      message: `Airtime purchase successful! ${network} ${phone} credited with ₦${purchaseAmount}`,
      newBalance,
      transaction: {
        network,
        phone,
        amount: purchaseAmount
      }
    });

  } catch (error) {
    console.error('Airtime purchase error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export default authenticate(handler);
