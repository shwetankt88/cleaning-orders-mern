const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { sendOrderEmail } = require('../utils/emailService');

// ─── POST /api/orders — Submit new order ──────────────────────
router.post('/', async (req, res) => {
  try {
    const { store, items, otherItems, deliveryDate, signatory } = req.body;

    // Validate
    if (!store || !deliveryDate || !signatory) {
      return res.status(400).json({ error: 'Store, delivery date, and signatory are required.' });
    }
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Please select at least one item.' });
    }

    const order = new Order({ store, items, otherItems, deliveryDate, signatory });
    await order.save();

    // Send email (non-blocking — don't fail submission if email fails)
    try {
      await sendOrderEmail(order);
      order.emailSent = true;
      await order.save();
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Order submitted successfully!',
      orderNumber: order.orderNumber
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to submit order. Please try again.' });
  }
});

module.exports = router;
