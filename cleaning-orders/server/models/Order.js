const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  store: {
    type: String,
    required: [true, 'Shipping address/store is required']
  },
  items: [orderItemSchema],
  otherItems: {
    type: String,
    default: ''
  },
  deliveryDate: {
    type: Date,
    required: [true, 'Delivery date is required']
  },
  signatory: {
    type: String,
    required: [true, 'Signatory name is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'],
    default: 'pending'
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Auto-generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    this.orderNumber = `ORD-${year}${month}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
