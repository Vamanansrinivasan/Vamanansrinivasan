import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  checkoutSummary, 
  onOrderComplete 
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [shippingData, setShippingData] = useState({
    fullName: 'Alex Vance',
    email: 'alex.vance@kinetix-runner.io',
    address: '742 Evergreen Hyper-Way',
    city: 'San Francisco',
    postalCode: '94107',
    country: 'United States'
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '•••• •••• •••• 4242',
    cardName: 'Alex Vance',
    expiry: '08/29',
    cvv: '921'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ff5500', '#b026ff', '#ffffff', '#00e676']
      });
    } catch (e) {
      // safe fallback if confetti fails
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        const generatedId = `KNX-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderId(generatedId);
        setStep(3);
        triggerCelebration();
        onOrderComplete();
      }, 1400);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'rgba(10, 14, 23, 0.98)',
          border: '1px solid var(--border-mid)',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 40px rgba(0, 240, 255, 0.2)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Progress Step Indicator */}
        {step < 3 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 1 ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: step >= 1 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.8rem'
              }}>
                1
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600 }}>SHIPPING</span>
            </div>

            <div style={{ width: '40px', height: '2px', background: step >= 2 ? 'var(--accent-cyan)' : 'var(--border-subtle)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 2 ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: step >= 2 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.8rem'
              }}>
                2
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600 }}>PAYMENT</span>
            </div>
          </div>
        )}

        {/* Step 1: Shipping Form */}
        {step === 1 && (
          <form onSubmit={handleNextStep}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              Express Shipping Details
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              All shipments are verified, carbon-neutral, and dispatched in aerospace protective packaging.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  RECIPIENT FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={shippingData.fullName}
                  onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                  className="tech-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  EMAIL ADDRESS (FOR TRACKING & RECEIPT)
                </label>
                <input
                  type="email"
                  required
                  value={shippingData.email}
                  onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                  className="tech-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  STREET ADDRESS
                </label>
                <input
                  type="text"
                  required
                  value={shippingData.address}
                  onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                  className="tech-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    CITY
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                    className="tech-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    POSTAL CODE
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.postalCode}
                    onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                    className="tech-input"
                  />
                </div>
              </div>
            </div>

            {/* Total summary bar */}
            <div style={{ 
              marginTop: '1.75rem', 
              paddingTop: '1rem', 
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>DUE NOW</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                  ${checkoutSummary?.grandTotal?.toFixed(2) || '0.00'}
                </span>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '0.8rem 1.6rem' }}>
                <span>Continue to Payment</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Simulation */}
        {step === 2 && (
          <form onSubmit={handleNextStep}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <Lock size={18} color="var(--accent-cyan)" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Encrypted Checkout</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Transactions are encrypted using 256-bit SSL protocols.
            </p>

            {/* Simulated Cyber Card Visual */}
            <div style={{
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #161f30 0%, #0d121c 100%)',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              boxShadow: '0 10px 30px rgba(0, 240, 255, 0.15)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--accent-cyan)' }}>
                  KINETIX PLATINUM RUNNER
                </span>
                <Sparkles size={18} color="var(--accent-cyan)" />
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', letterSpacing: '0.2em', color: '#fff', marginBottom: '1.2rem' }}>
                {paymentData.cardNumber}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>CARDHOLDER</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>{paymentData.cardName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>EXPIRES</div>
                  <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>{paymentData.expiry}</div>
                </div>
              </div>
            </div>

            {/* Quick Apple / Google Pay */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <button
                type="button"
                onClick={handleNextStep}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.85rem', gap: '0.4rem' }}
              >
                <span> Apple Pay</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.85rem', gap: '0.4rem' }}
              >
                <span>G Google Pay</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>OR CREDIT CARD</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>

            {/* Card Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  CARD NUMBER
                </label>
                <input
                  type="text"
                  required
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                  className="tech-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    EXPIRY (MM/YY)
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentData.expiry}
                    onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                    className="tech-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    CVV SECURITY CODE
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                    className="tech-input"
                  />
                </div>
              </div>
            </div>

            {/* Back & Authorize Row */}
            <div style={{ 
              marginTop: '1.75rem', 
              paddingTop: '1rem', 
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="btn-secondary" 
                style={{ padding: '0.8rem 1.25rem', gap: '0.4rem' }}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="btn-primary" 
                style={{ padding: '0.8rem 1.8rem', gap: '0.5rem' }}
              >
                {isProcessing ? (
                  <span>Authorizing via Token...</span>
                ) : (
                  <>
                    <Lock size={16} color="#000" />
                    <span>Pay ${checkoutSummary?.grandTotal?.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmed & Receipt */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(0, 230, 118, 0.15)',
              border: '2px solid #00e676',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              boxShadow: '0 0 30px rgba(0, 230, 118, 0.4)'
            }}>
              <CheckCircle2 size={38} color="#00e676" />
            </div>

            <span className="badge-pill" style={{ background: 'rgba(0, 230, 118, 0.15)', color: '#00e676', borderColor: '#00e676', marginBottom: '0.75rem' }}>
              ORDER DISPATCH AUTHORIZED
            </span>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              Gear On Its Way!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
              Your order confirmation and tracking credentials have been dispatched to <strong style={{ color: '#fff' }}>{shippingData.email}</strong>.
            </p>

            {/* Order Details Card */}
            <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>TRACKING ID:</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>ESTIMATED DELIVERY:</span>
                <span style={{ color: '#fff' }}>2-3 Business Days (Express Air)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>DESTINATION:</span>
                <span style={{ color: '#fff' }}>{shippingData.city}, {shippingData.postalCode}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.6rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>TOTAL PAID:</span>
                <span style={{ color: '#00e676', fontWeight: 800 }}>${checkoutSummary?.grandTotal?.toFixed(2)}</span>
              </div>
            </div>

            {/* Ordered Items Preview */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
              {cartItems.map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <img src={item.imageBase64} alt={item.name} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '0.75rem', color: '#fff' }}>{item.name} (x{item.quantity})</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  window.print();
                }}
                className="btn-secondary"
                style={{ padding: '0.8rem 1.4rem', gap: '0.5rem', fontSize: '0.9rem' }}
              >
                <Download size={16} />
                <span>Save Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="btn-primary"
                style={{ padding: '0.8rem 1.6rem', fontSize: '0.9rem' }}
              >
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
