import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { COMPANY } from '../config';
import './Success.css';

export default function Success() {
  const { state } = useLocation();
  const orderNumber = state?.orderNumber || 'ORD-XXXX';
  const store = state?.store || 'Your store';

  return (
    <div className="success-page">
      <div className="success-card fade-up">
        <div className="success-icon">✓</div>
        <h1>Order Submitted!</h1>
        <p className="success-sub">Your cleaning supplies request has been received.</p>

        <div className="success-meta">
          <div className="meta-row">
            <span>Order Number</span>
            <strong className="order-num">{orderNumber}</strong>
          </div>
          <div className="meta-row">
            <span>Destination</span>
            <strong>{store}</strong>
          </div>
        </div>

        <p className="success-note">
          A confirmation email has been sent to the operations team. 
          You'll be contacted if there are any issues with your order.
        </p>

        <Link to="/" className="btn btn-accent" style={{ marginTop: '8px', justifyContent: 'center' }}>
          ← Submit Another Order
        </Link>
      </div>

      <footer className="order-footer" style={{ marginTop: 'auto' }}>
        <p>© {new Date().getFullYear()} {COMPANY.name}</p>
      </footer>
    </div>
  );
}
