const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');

// ─── Middleware: Verify JWT ───────────────────────────────────
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ─── POST /api/admin/login ────────────────────────────────────
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, username });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// ─── GET /api/admin/orders ────────────────────────────────────
router.get('/orders', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const query = {};

    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { store: { $regex: search, $options: 'i' } },
        { signatory: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ orders, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// ─── GET /api/admin/orders/:id ────────────────────────────────
router.get('/orders/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// ─── PATCH /api/admin/orders/:id/status ──────────────────────
router.patch('/orders/:id/status', auth, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const update = { status };
    if (adminNotes !== undefined) update.adminNotes = adminNotes;

    const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// ─── DELETE /api/admin/orders/:id ────────────────────────────
router.delete('/orders/:id', auth, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// ─── GET /api/admin/stats ─────────────────────────────────────
router.get('/stats', auth, async (req, res) => {
  try {
    const total = await Order.countDocuments();
    const pending = await Order.countDocuments({ status: 'pending' });
    const confirmed = await Order.countDocuments({ status: 'confirmed' });
    const delivered = await Order.countDocuments({ status: 'delivered' });
    const today = new Date(); today.setHours(0,0,0,0);
    const todayOrders = await Order.countDocuments({ createdAt: { $gte: today } });

    res.json({ total, pending, confirmed, delivered, todayOrders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
