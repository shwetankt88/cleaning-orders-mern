import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { COMPANY, API_URL } from '../config';
import './Admin.css';

const api = () => axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
});

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [ordersRes, statsRes] = await Promise.all([
        api().get(`/api/admin/orders?status=${filter}&search=${search}&page=${page}&limit=15`),
        api().get('/api/admin/stats')
      ]);
      setOrders(ordersRes.data.orders);
      setTotalPages(ordersRes.data.pages);
      setStats(statsRes.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        toast.error('Failed to load orders');
      }
    } finally {
      setLoading(false);
    }
  }, [filter, search, page, navigate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const updateStatus = async (id, status) => {
    try {
      await api().patch(`/api/admin/orders/${id}/status`, { status });
      toast.success('Status updated');
      fetchData();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Delete this order? This cannot be undone.')) return;
    try {
      await api().delete(`/api/admin/orders/${id}`);
      toast.success('Order deleted');
      fetchData();
    } catch {
      toast.error('Failed to delete order');
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="admin-page">
      {/* ── Admin Header ── */}
      <header className="admin-header">
        <div className="container admin-header-inner">
          <div className="admin-brand">
            <div className="login-logo" style={{ width: 36, height: 36, fontSize: 14 }}>FS</div>
            <div>
              <span className="admin-company">{COMPANY.name}</span>
              <span className="admin-panel-tag">Admin Panel</span>
            </div>
          </div>
          <div className="admin-header-actions">
            <a href="/" className="btn btn-ghost" style={{ fontSize: 13 }}>View Order Form ↗</a>
            <button onClick={handleLogout} className="btn btn-ghost" style={{ fontSize: 13 }}>Logout</button>
          </div>
        </div>
      </header>

      <main className="container admin-main">

        {/* ── Stats ── */}
        <div className="stats-grid fade-up">
          {[
            { label: 'Total Orders', value: stats.total || 0, color: 'var(--primary)' },
            { label: "Today's Orders", value: stats.todayOrders || 0, color: 'var(--info)' },
            { label: 'Pending', value: stats.pending || 0, color: 'var(--warning)' },
            { label: 'Confirmed', value: stats.confirmed || 0, color: 'var(--success)' },
            { label: 'Delivered', value: stats.delivered || 0, color: '#8e44ad' },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-val" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Controls ── */}
        <div className="admin-controls fade-up">
          <input
            type="text"
            placeholder="🔍 Search orders, stores, names..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="form-control"
            style={{ maxWidth: 300 }}
          />
          <div className="filter-tabs">
            {['all', 'pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'].map(s => (
              <button
                key={s}
                className={`cat-tab ${filter === s ? 'active' : ''}`}
                onClick={() => { setFilter(s); setPage(1); }}
              >{s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}</button>
            ))}
          </div>
        </div>

        {/* ── Orders Table ── */}
        <div className="card fade-up" style={{ marginTop: 0 }}>
          {loading ? (
            <div className="admin-loading"><span className="spinner" style={{ borderColor: 'rgba(0,0,0,0.1)', borderTopColor: 'var(--primary)' }}></span> Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="admin-empty">📭 No orders found</div>
          ) : (
            <div className="table-wrap">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Store</th>
                    <th>Items</th>
                    <th>Delivery Date</th>
                    <th>Signatory</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>
                        <Link to={`/admin/orders/${order._id}`} className="order-link">
                          {order.orderNumber}
                        </Link>
                        <div className="order-date">{formatDate(order.createdAt)}</div>
                      </td>
                      <td className="store-cell">{order.store}</td>
                      <td><span className="items-count">{order.items.length} items</span></td>
                      <td>{formatDate(order.deliveryDate)}</td>
                      <td>{order.signatory}</td>
                      <td>
                        <select
                          className={`status-select badge badge-${order.status}`}
                          value={order.status}
                          onChange={e => updateStatus(order._id, e.target.value)}
                        >
                          {['pending','confirmed','dispatched','delivered','cancelled'].map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <div className="row-actions">
                          <Link to={`/admin/orders/${order._id}`} className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }}>View</Link>
                          <button onClick={() => deleteOrder(order._id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: 12 }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="pagination fade-up">
            <button className="btn btn-ghost" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button className="btn btn-ghost" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</button>
          </div>
        )}

      </main>
    </div>
  );
}
