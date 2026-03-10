import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { COMPANY, STORES, PRODUCTS, CATEGORIES, API_URL } from '../config';
import './OrderForm.css';

export default function OrderForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [form, setForm] = useState({
    store: '',
    customStore: '',
    deliveryDate: '',
    signatory: '',
    otherItems: '',
  });

  const [quantities, setQuantities] = useState({}); // { productId: qty string }
  const [errors, setErrors] = useState({});

  // ── Filter products ────────────────────────────────────────
  const filteredProducts = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const selectedItems = PRODUCTS.filter(p => quantities[p.id] && quantities[p.id].trim() !== '');

  // ── Handlers ───────────────────────────────────────────────
  const handleQtyChange = (id, val) => {
    setQuantities(prev => ({ ...prev, [id]: val }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    const storeVal = form.store === 'Other' ? form.customStore.trim() : form.store;
    if (!storeVal) e.store = 'Please select a store/address';
    if (!form.deliveryDate) e.deliveryDate = 'Please select a delivery date';
    if (!form.signatory.trim()) e.signatory = 'Please enter your name';
    if (selectedItems.length === 0) e.items = 'Please add at least one item with a quantity';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Please fill in all required fields');
      return;
    }

    const storeVal = form.store === 'Other' ? form.customStore.trim() : form.store;
    const items = selectedItems.map(p => ({ name: p.name, quantity: quantities[p.id] }));

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/orders`, {
        store: storeVal,
        items,
        otherItems: form.otherItems,
        deliveryDate: form.deliveryDate,
        signatory: form.signatory,
      });
      navigate('/success', { state: { orderNumber: res.data.orderNumber, store: storeVal } });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="order-page">
      {/* ── Header ── */}
      <header className="order-header">
        <div className="header-inner container">
          <div className="header-brand">
            {/* EDIT LOGO: Replace the div below with <img src="/logo.png" alt="Logo" className="header-logo" /> */}
            <div className="logo-placeholder">SE</div>
            <div>
              {/* ── COMPANY NAME — edit in src/config.js ── */}
              <h1 className="brand-name">{COMPANY.name}</h1>
              <p className="brand-tagline">{COMPANY.tagline}</p>
            </div>
          </div>
          <a href="/admin/login" className="admin-link">Admin ↗</a>
        </div>
      </header>

      <main className="container order-main">
        <div className="form-intro fade-up">
          <h2>Cleaning Supplies Order Form</h2>
          <p>Fill in the details below to request cleaning supplies for your location.</p>
        </div>

        <form onSubmit={handleSubmit} className="order-form fade-up">

          {/* ── Section 1: Shipping ── */}
          <section className="form-section">
            <div className="section-header">
              <span className="section-num">01</span>
              <div>
                <h3>Shipping Address</h3>
                <p>Select the store or location for delivery</p>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Store / Location *</label>
              <select
                name="store"
                value={form.store}
                onChange={handleFormChange}
                className={`form-control ${errors.store ? 'error' : ''}`}
              >
                <option value="">— Select a store —</option>
                {STORES.map(s => <option key={s} value={s}>{s}</option>)}
                <option value="Other">Other (specify below)</option>
              </select>
              {errors.store && <p className="error-msg">{errors.store}</p>}
            </div>

            {form.store === 'Other' && (
              <div className="form-group">
                <label className="form-label">Custom Store / Address *</label>
                <input
                  type="text"
                  name="customStore"
                  value={form.customStore}
                  onChange={handleFormChange}
                  className="form-control"
                  placeholder="Enter store name or full address"
                />
              </div>
            )}
          </section>

          {/* ── Section 2: Items ── */}
          <section className="form-section">
            <div className="section-header">
              <span className="section-num">02</span>
              <div>
                <h3>Order Items</h3>
                <p>Enter quantity for each item you need — leave blank to skip</p>
              </div>
            </div>

            {errors.items && (
              <div className="items-error-banner">⚠ {errors.items}</div>
            )}

            {/* Selected Items Summary */}
            {selectedItems.length > 0 && (
              <div className="selected-summary">
                <span className="summary-badge">{selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected</span>
                {selectedItems.map(p => (
                  <span key={p.id} className="summary-chip">
                    {p.name} <em>×{quantities[p.id]}</em>
                    <button type="button" onClick={() => handleQtyChange(p.id, '')} className="chip-remove">✕</button>
                  </span>
                ))}
              </div>
            )}

            {/* Search & Filter */}
            <div className="items-controls">
              <input
                type="text"
                placeholder="🔍 Search items..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="form-control search-input"
              />
              <div className="category-tabs">
                <button
                  type="button"
                  className={`cat-tab ${activeCategory === 'All' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('All')}
                >All</button>
                {CATEGORIES.map(cat => (
                  <button
                    type="button"
                    key={cat}
                    className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >{cat}</button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.length === 0 ? (
                <p className="no-results">No items found for "{searchQuery}"</p>
              ) : filteredProducts.map(product => (
                <div
                  key={product.id}
                  className={`product-card ${quantities[product.id] ? 'selected' : ''}`}
                >
                  <div className="product-name">{product.name}</div>
                  <div className="product-qty-row">
                    <input
                      type="text"
                      value={quantities[product.id] || ''}
                      onChange={e => handleQtyChange(product.id, e.target.value)}
                      placeholder="Qty"
                      className="qty-input"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Other Items */}
            <div className="form-group" style={{ marginTop: '24px' }}>
              <label className="form-label">Other Items / Special Requests</label>
              <textarea
                name="otherItems"
                value={form.otherItems}
                onChange={handleFormChange}
                className="form-control"
                rows={3}
                placeholder="e.g. 2x Special Polish, 1x Custom Mop — describe any items not listed above"
              />
            </div>
          </section>

          {/* ── Section 3: Delivery & Signatory ── */}
          <section className="form-section">
            <div className="section-header">
              <span className="section-num">03</span>
              <div>
                <h3>Delivery Details</h3>
                <p>When do you need it and who is requesting</p>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Delivery Date *</label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={form.deliveryDate}
                  onChange={handleFormChange}
                  min={minDate}
                  className={`form-control ${errors.deliveryDate ? 'error' : ''}`}
                />
                {errors.deliveryDate && <p className="error-msg">{errors.deliveryDate}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Your Name (Signatory) *</label>
                <input
                  type="text"
                  name="signatory"
                  value={form.signatory}
                  onChange={handleFormChange}
                  placeholder="Enter your full name"
                  className={`form-control ${errors.signatory ? 'error' : ''}`}
                />
                {errors.signatory && <p className="error-msg">{errors.signatory}</p>}
              </div>
            </div>
          </section>

          {/* ── Submit ── */}
          <div className="form-submit-area">
            <div className="submit-info">
              <strong>{selectedItems.length}</strong> item{selectedItems.length !== 1 ? 's' : ''} ready to submit
            </div>
            <button type="submit" className="btn btn-accent submit-btn" disabled={loading}>
              {loading ? <><span className="spinner" style={{borderTopColor:'var(--primary)'}}></span> Submitting...</> : '📦 Submit Order'}
            </button>
          </div>

        </form>
      </main>

      <footer className="order-footer">
        <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
