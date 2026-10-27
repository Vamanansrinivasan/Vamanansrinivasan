import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check, Star, Sparkles } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onSelectProduct, 
  onAddToCart, 
  isWishlisted, 
  onToggleWishlist 
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[2] : 9);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      selectedSize,
      quantity: 1
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div 
      className="glass-card"
      onClick={() => onSelectProduct(product)}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
    >
      {/* Top Media Container */}
      <div className="shoe-img-container">
        
        {/* Badge */}
        {product.badge && (
          <span 
            className="badge-pill"
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              zIndex: 2,
              background: `${product.accentColor || '#00f0ff'}20`,
              color: product.accentColor || '#00f0ff',
              borderColor: `${product.accentColor || '#00f0ff'}40`
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 2,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(10, 14, 23, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isWishlisted ? '#ff3366' : '#fff',
            transition: 'all var(--transition-fast)'
          }}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={16} fill={isWishlisted ? '#ff3366' : 'none'} color={isWishlisted ? '#ff3366' : 'currentColor'} />
        </button>

        {/* Sneaker Image (Base64) */}
        <img 
          src={product.imageBase64} 
          alt={product.name}
          loading="lazy"
          style={{
            filter: product.cssFilter ? product.cssFilter : `drop-shadow(0 15px 25px rgba(0,0,0,0.6))`
          }}
        />

        {/* Base64 Asset Tag */}
        <div style={{
          position: 'absolute',
          bottom: '0.6rem',
          right: '0.8rem',
          fontSize: '0.65rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          background: 'rgba(0,0,0,0.6)',
          padding: '2px 6px',
          borderRadius: '4px',
          letterSpacing: '0.05em'
        }}>
          BASE64 ASSET
        </div>
      </div>

      {/* Product Content Details */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Category & Rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {product.category}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: '#ffb700', fontFamily: 'var(--font-mono)' }}>
            <Star size={12} fill="#ffb700" color="#ffb700" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.2rem', color: '#fff' }}>
          {product.name}
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {product.subtitle}
        </p>

        {/* Size Selector Strip */}
        <div style={{ marginBottom: '1rem' }} onClick={(e) => e.stopPropagation()}>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>SELECT SIZE (US)</span>
            <span style={{ color: 'var(--accent-cyan)' }}>Size {selectedSize}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '2px' }}>
            {(product.sizes || [8, 9, 10, 11]).slice(0, 5).map(size => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                style={{ height: '34px', minWidth: '34px', fontSize: '0.8rem' }}
              >
                {size}
              </button>
            ))}
            {product.sizes && product.sizes.length > 5 && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                +{product.sizes.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
              ${product.price}
            </div>
            {product.originalPrice && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ${product.originalPrice}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleQuickAdd}
              className="btn-primary"
              style={{
                padding: '0.55rem 0.95rem',
                fontSize: '0.85rem',
                background: justAdded ? '#00e676' : undefined,
                boxShadow: justAdded ? '0 0 15px rgba(0, 230, 118, 0.5)' : undefined
              }}
              title="Add to Cart"
            >
              {justAdded ? (
                <>
                  <Check size={16} color="#000" strokeWidth={3} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={15} color="#000" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
