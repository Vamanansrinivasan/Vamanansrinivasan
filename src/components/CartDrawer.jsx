import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Tag, Check, Truck } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const qualifiesFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = subtotal === 0 ? 0 : qualifiesFreeShipping ? 0 : 15;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  let discount = 0;
  if (appliedPromo === 'KINETIX20') {
    discount = subtotal * 0.20;
  } else if (appliedPromo === 'VIP50') {
    discount = Math.min(subtotal, 50);
  }

  const grandTotal = Math.max(0, subtotal - discount + shippingCost);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'KINETIX20' || code === 'VIP50') {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "KINETIX20" for 20% off or "VIP50" for $50 off.');
    }
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div 
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>YOUR GEAR BAG</h3>
            <span style={{
              background: 'rgba(0, 240, 255, 0.12)',
              color: 'var(--accent-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '999px'
            }}>
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} ITEMS
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div style={{ padding: '0.9rem 1.5rem', background: 'rgba(0, 240, 255, 0.04)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginBottom: '0.45rem' }}>
            <Truck size={15} color={qualifiesFreeShipping ? '#00e676' : 'var(--accent-cyan)'} />
            {qualifiesFreeShipping ? (
              <span style={{ color: '#00e676', fontWeight: 700 }}>FREE EXPRESS AIR SHIPPING UNLOCKED!</span>
            ) : (
              <span>Add <strong style={{ color: '#fff' }}>${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}</strong> for FREE Express Air</span>
            )}
          </div>
          
          <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: qualifiesFreeShipping ? '#00e676' : 'linear-gradient(90deg, #00f0ff, #0088ff)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '2rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <ShoppingBag size={28} color="var(--text-muted)" />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: '#fff' }}>Your Bag is Empty</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Discover our latest high-performance releases engineered with Base64 speed.
              </p>
              <button onClick={onClose} className="btn-secondary" style={{ fontSize: '0.85rem', margin: '0 auto' }}>
                Explore Sneakers
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={`${item.id}-${item.selectedSize}`} 
                className="glass-panel"
                style={{ padding: '0.9rem', display: 'flex', gap: '1rem', alignItems: 'center' }}
              >
                {/* Base64 Thumbnail */}
                <div style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  flexShrink: 0
                }}>
                  <img 
                    src={item.imageBase64} 
                    alt={item.name} 
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', margin: '2px 0 6px' }}>
                    Size {item.selectedSize} (US)
                  </div>
                  
                  {/* Quantity Stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      background: 'rgba(255, 255, 255, 0.05)', 
                      borderRadius: '6px',
                      border: '1px solid var(--border-subtle)',
                      height: '28px'
                    }}>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        style={{ background: 'transparent', border: 'none', color: '#fff', width: '24px', cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', padding: '0 4px', fontWeight: 700 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        style={{ background: 'transparent', border: 'none', color: '#fff', width: '24px', cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id, item.selectedSize)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 800, color: '#fff' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    ${item.price} each
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-mid)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9rem'
          }}>
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text"
                placeholder="Promo code (e.g. KINETIX20)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="tech-input"
                style={{ padding: '0.5rem 0.75rem', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '0.5rem 0.9rem', fontSize: '0.82rem' }}>
                Apply
              </button>
            </form>

            {appliedPromo && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#00e676', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                <Check size={14} />
                <span>Promo code "{appliedPromo}" applied!</span>
              </div>
            )}
            {promoError && (
              <div style={{ color: '#ff4444', fontSize: '0.75rem' }}>
                {promoError}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#fff' }}>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00e676' }}>
                  <span>Promo Discount</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Express Air Delivery</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: shippingCost === 0 ? '#00e676' : '#fff' }}>
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontWeight: 800, 
                fontSize: '1.2rem', 
                borderTop: '1px solid var(--border-subtle)', 
                paddingTop: '0.6rem',
                marginTop: '0.2rem'
              }}>
                <span>Total</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onProceedCheckout({ subtotal, discount, shippingCost, grandTotal, appliedPromo });
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', gap: '0.6rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
