import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Star, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Copy, 
  Check, 
  Download, 
  Database,
  Code,
  Ruler
} from 'lucide-react';

export default function ProductDetailModal({ 
  product, 
  onClose, 
  onAddToCart, 
  isWishlisted, 
  onToggleWishlist 
}) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[2] : 9);
  const [quantity, setQuantity] = useState(1);
  const [copiedBase64, setCopiedBase64] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'base64' | 'reviews'
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const base64Length = product.imageBase64 ? product.imageBase64.length : 0;
  const base64Preview = product.imageBase64 ? `${product.imageBase64.substring(0, 80)}...[+${base64Length - 80} chars]` : '';

  const handleCopyBase64 = () => {
    if (product.imageBase64) {
      navigator.clipboard.writeText(product.imageBase64);
      setCopiedBase64(true);
      setTimeout(() => setCopiedBase64(false), 2000);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedSize,
      quantity
    });
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1020px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'rgba(10, 14, 23, 0.96)',
          border: '1px solid var(--border-mid)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 240, 255, 0.15)',
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
            zIndex: 10,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-subtle)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)', gap: '2rem', padding: '2rem' }}>
          
          {/* Left: Product Visual Presentation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: '20px',
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.4) 80%)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              position: 'relative'
            }}>
              {product.badge && (
                <span 
                  className="badge-pill" 
                  style={{ 
                    position: 'absolute', 
                    top: '1rem', 
                    left: '1rem',
                    background: `${product.accentColor || '#00f0ff'}25`,
                    color: product.accentColor || '#00f0ff',
                    borderColor: `${product.accentColor || '#00f0ff'}50`
                  }}
                >
                  {product.badge}
                </span>
              )}

              <img 
                src={product.imageBase64} 
                alt={product.name} 
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  filter: product.cssFilter ? product.cssFilter : 'drop-shadow(0 20px 35px rgba(0,0,0,0.7))',
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>

            {/* Base64 & Firebase Metadata Badge Bar */}
            <div className="glass-panel" style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>ENCODING:</span>
                <span style={{ color: 'var(--accent-cyan)' }}>Base64 Data URI (JPEG)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>PAYLOAD SIZE:</span>
                <span>{Math.round(base64Length / 1024)} KB</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>FIREBASE STORAGE:</span>
                <span style={{ color: '#00e676' }}>gs://kinetix-store/shoes</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
              <div style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <Truck size={16} color="var(--accent-cyan)" style={{ margin: '0 auto 0.25rem' }} />
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Express Air</div>
              </div>
              <div style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <RefreshCw size={16} color="#00e676" style={{ margin: '0 auto 0.25rem' }} />
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>30-Day Wear</div>
              </div>
              <div style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <ShieldCheck size={16} color="#ffaa00" style={{ margin: '0 auto 0.25rem' }} />
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Authentic</div>
              </div>
            </div>

          </div>

          {/* Right: Product Details, Tabs, Selection */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Category and Rating */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                {product.category}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#ffb700', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                <Star size={15} fill="#ffb700" color="#ffb700" />
                <strong style={{ color: '#fff' }}>{product.rating}</strong>
                <span style={{ color: 'var(--text-muted)' }}>({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.35rem', lineHeight: 1.15 }}>
              {product.name}
            </h2>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              {product.subtitle}
            </div>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="badge-pill badge-orange" style={{ fontSize: '0.75rem' }}>
                  SAVE ${product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* Nav Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
              <button
                onClick={() => setActiveTab('overview')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'overview' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                  padding: '0.5rem 0.8rem',
                  color: activeTab === 'overview' ? '#fff' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Overview & Specs
              </button>
              
              <button
                onClick={() => setActiveTab('base64')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'base64' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                  padding: '0.5rem 0.8rem',
                  color: activeTab === 'base64' ? '#fff' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Code size={14} color="var(--accent-cyan)" />
                Base64 Inspector
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'reviews' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                  padding: '0.5rem 0.8rem',
                  color: activeTab === 'reviews' ? '#fff' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Reviews ({product.reviewsCount})
              </button>
            </div>

            {/* Tab 1: Overview & Specs */}
            {activeTab === 'overview' && (
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {product.description}
                </p>

                {product.specs && (
                  <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                      ENGINEERING SPECIFICATIONS
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', fontSize: '0.85rem' }}>
                      {Object.entries(product.specs).map(([key, val]) => (
                        <div key={key}>
                          <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key}: </span>
                          <strong style={{ color: '#fff' }}>{val}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Base64 Inspector */}
            {activeTab === 'base64' && (
              <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                    RAW BASE64 STRING ({base64Length.toLocaleString()} characters)
                  </span>
                  <button
                    onClick={handleCopyBase64}
                    className="btn-secondary"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', gap: '0.4rem' }}
                  >
                    {copiedBase64 ? <Check size={14} color="#00e676" /> : <Copy size={14} />}
                    <span>{copiedBase64 ? 'Copied Full Base64!' : 'Copy Base64'}</span>
                  </button>
                </div>
                
                <textarea
                  readOnly
                  value={product.imageBase64}
                  rows={4}
                  className="tech-input"
                  style={{ fontSize: '0.72rem', fontFamily: 'monospace', resize: 'none', background: 'rgba(0,0,0,0.5)' }}
                />
                
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.6rem' }}>
                  💡 This image is rendered directly via in-memory Base64 data URL and synchronized to Firebase Storage using <code>uploadString(ref, base64, 'data_url')</code>.
                </p>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="glass-panel" style={{ padding: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Marcus V. (Verified Runner)</span>
                      <span style={{ color: '#ffb700', fontSize: '0.8rem' }}>★★★★★</span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                      "The energy rebound in the forefoot is unbelievable. Dropped 45 seconds off my 10k PR on the very first weekend test."
                    </p>
                  </div>

                  <div className="glass-panel" style={{ padding: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Elena R. (Ultra Trail Enthusiast)</span>
                      <span style={{ color: '#ffb700', fontSize: '0.8rem' }}>★★★★★</span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                      "Looks futuristic and performs like a beast on technical gravel and rocky descents. 10/10 recommendation."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Size Selector with Size Chart trigger */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                  SELECT US SIZE:
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <Ruler size={13} />
                  <span>{showSizeGuide ? 'Hide Size Chart' : 'Size Guide'}</span>
                </button>
              </div>

              {showSizeGuide && (
                <div className="glass-panel" style={{ padding: '0.75rem', marginBottom: '0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ color: 'var(--accent-cyan)', borderBottom: '1px solid var(--border-subtle)' }}>
                        <th style={{ padding: '4px' }}>US</th>
                        <th style={{ padding: '4px' }}>UK</th>
                        <th style={{ padding: '4px' }}>EU</th>
                        <th style={{ padding: '4px' }}>CM</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: 'var(--text-secondary)' }}>
                      <tr><td style={{ padding: '4px' }}>8</td><td style={{ padding: '4px' }}>7.5</td><td style={{ padding: '4px' }}>41</td><td style={{ padding: '4px' }}>26.0</td></tr>
                      <tr><td style={{ padding: '4px' }}>9</td><td style={{ padding: '4px' }}>8.5</td><td style={{ padding: '4px' }}>42.5</td><td style={{ padding: '4px' }}>27.0</td></tr>
                      <tr><td style={{ padding: '4px' }}>10</td><td style={{ padding: '4px' }}>9.5</td><td style={{ padding: '4px' }}>44</td><td style={{ padding: '4px' }}>28.0</td></tr>
                      <tr><td style={{ padding: '4px' }}>11</td><td style={{ padding: '4px' }}>10.5</td><td style={{ padding: '4px' }}>45</td><td style={{ padding: '4px' }}>29.0</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {(product.sizes || [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12]).map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              
              {/* Quantity Stepper */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: 'var(--radius-sm)', 
                border: '1px solid var(--border-subtle)',
                height: '50px' 
              }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    width: '38px',
                    height: '100%',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  -
                </button>
                <span style={{ width: '32px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    width: '38px',
                    height: '100%',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  +
                </button>
              </div>

              {/* Add To Cart CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-primary"
                style={{
                  flex: 1,
                  height: '50px',
                  fontSize: '1rem',
                  background: addedNotice ? '#00e676' : undefined,
                  boxShadow: addedNotice ? '0 0 25px rgba(0, 230, 118, 0.5)' : undefined
                }}
              >
                {addedNotice ? (
                  <>
                    <Check size={20} color="#000" strokeWidth={3} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} color="#000" />
                    <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Wishlist toggle */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                className="btn-icon"
                style={{ height: '50px', width: '50px' }}
                title="Wishlist"
              >
                <Heart size={20} fill={isWishlisted ? '#ff3366' : 'none'} color={isWishlisted ? '#ff3366' : 'currentColor'} />
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
