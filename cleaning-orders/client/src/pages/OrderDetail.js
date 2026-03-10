import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from '../config';
import './Admin.css';

const api = () => axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
});
export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api().get(`/api/admin/orders/${id}`)
      .then(res => { setOrder(res.data); setNotes(res.data.adminNotes || ''); })
      .catch(() => { toast.error('Order not found'); navigate('/admin'); })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const updateStatus = async (status) => {
    try {
      const res = await api().patch(`/api/admin/orders/${id}/status`, { status, adminNotes: notes });
      setOrder(res.data.order);
      toast.success('Updated');
    } catch { toast.error('Failed to update'); }
  };

  const saveNotes = async () => {
    setSaving(true);
    try {
      await api().patch(`/api/admin/orders/${id}/status`, { status: order.status, adminNotes: notes });
      toast.success('Notes saved');
    } catch { toast.error('Failed to save notes'); }
    finally { setSaving(false); }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) return <div className="admin-loading full-page"><span className="spinner" style={{ width: 30, height: 30, borderColor: 'rgba(0,0,0,0.1)', borderTopColor: 'var(--primary)' }}></span></div>;
  if (!order) return null;

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="container admin-header-inner">
          <Link to="/admin" className="btn btn-ghost" style={{ fontSize: 13 }}>← Back to Dashboard</Link>
          <div className="admin-header-actions">
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Order: <strong>{order.orderNumber}</strong></span>
          </div>
        </div>
      </header>

      <main className="container admin-main">
        <div className="detail-grid fade-up">

          {/* ── Order Info ── */}
          <div className="card detail-main">
            <div className="detail-card-header">
              <div>
                <h2 className="detail-order-num">{order.orderNumber}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                  Submitted {new Date(order.createdAt).toLocaleString('en-IN')}
                </p>
              </div>
              <span className={`badge badge-${order.status}`}>{order.status}</span>
            </div>

            <div className="detail-meta">
              <div className="meta-item">
                <span className="meta-key">📍 Store</span>
                <span className="meta-val">{order.store}</span>
              </div>
              <div className="meta-item">
                <span className="meta-key">📅 Delivery Date</span>
                <span className="meta-val">{formatDate(order.deliveryDate)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-key">✍️ Signatory</span>
                <span className="meta-val">{order.signatory}</span>
              </div>
              <div className="meta-item">
                <span className="meta-key">📧 Email Sent</span>
                <span className="meta-val">{order.emailSent ? '✅ Yes' : '❌ No'}</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="detail-items">
              <h3>Items ({order.items.length})</h3>
              <table className="items-table">
                <thead>
                  <tr><th>#</th><th>Item</th><th>Quantity</th></tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td><strong>{item.quantity}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {order.otherItems && (
              <div className="detail-other">
                <strong>Other Items / Notes:</strong>
                <p>{order.otherItems}</p>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="detail-sidebar">
            <div className="card sidebar-card">
              <h3>Update Status</h3>
              <div className="status-buttons">
                {['pending','confirmed','dispatched','delivered','cancelled'].map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(s)}
                    className={`status-btn ${order.status === s ? 'active' : ''}`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="card sidebar-card">
              <h3>Admin Notes</h3>
              <textarea
                className="form-control"
                rows={5}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add internal notes about this order..."
              />
              <button onClick={saveNotes} className="btn btn-primary" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }} disabled={saving}>
                {saving ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
