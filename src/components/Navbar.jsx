import React from 'react';
import { ShoppingBag, Heart, Database, Plus, Search, Sparkles } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  wishlistCount, 
  onOpenWishlist, 
  onOpenFirebaseStudio, 
  onOpenAddProduct,
  activeCategory,
  onSelectCategory
}) {
  return (
    <header className="glass-navbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div 
            onClick={() => onSelectCategory('All Shoes')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none' }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
            }}>
              <Sparkles size={22} color="#000" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.45rem', 
                fontWeight: 900, 
                letterSpacing: '-0.03em',
                background: 'linear-gradient(90deg, #fff 0%, #94a3b8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                KINETIX
                <span style={{ 
                  fontSize: '0.65rem', 
                  fontFamily: 'var(--font-mono)', 
                  color: 'var(--accent-cyan)', 
                  border: '1px solid var(--accent-cyan)', 
                  padding: '1px 5px', 
                  borderRadius: '4px',
                  letterSpacing: '0.05em' 
                }}>
                  LABS
                </span>
              </div>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Base64 // Firebase Engine
              </div>
            </div>
          </div>

          {/* Category Navigation (Desktop) */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '1.5rem', marginLeft: '1rem' }}>
            {['All Shoes', 'Road Racing', 'Streetwear & Lifestyle', 'Trail & Outdoor', 'Limited Drop'].map(cat => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeCategory === cat ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: activeCategory === cat ? 700 : 500,
                  cursor: 'pointer',
                  padding: '0.4rem 0',
                  position: 'relative',
                  transition: 'color var(--transition-fast)'
                }}
              >
                {cat}
                {activeCategory === cat && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'var(--accent-cyan)',
                    boxShadow: '0 0 10px var(--accent-cyan)'
                  }} />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Firebase Storage Studio button */}
          <button 
            onClick={onOpenFirebaseStudio}
            className="btn-secondary"
            title="Firebase Storage & Base64 Assets"
            style={{
              padding: '0.55rem 0.95rem',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
              gap: '0.45rem',
              borderColor: 'rgba(0, 240, 255, 0.25)',
              background: 'rgba(0, 240, 255, 0.05)'
            }}
          >
            <Database size={15} color="var(--accent-cyan)" />
            <span style={{ color: 'var(--accent-cyan)' }}>Firebase Storage</span>
          </button>

          {/* Add Sneaker button */}
          <button 
            onClick={onOpenAddProduct}
            className="btn-secondary"
            title="Add New Sneaker via Base64"
            style={{
              padding: '0.55rem 0.95rem',
              fontSize: '0.82rem',
              gap: '0.45rem'
            }}
          >
            <Plus size={16} />
            <span>Add Shoe</span>
          </button>

          {/* Wishlist toggle */}
          <button 
            onClick={onOpenWishlist}
            className="btn-icon"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart size={19} color={wishlistCount > 0 ? '#ff3366' : 'currentColor'} fill={wishlistCount > 0 ? '#ff3366' : 'none'} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#ff3366',
                color: '#fff',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 8px rgba(255, 51, 102, 0.6)'
              }}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button 
            onClick={onOpenCart}
            className="btn-primary"
            style={{
              padding: '0.65rem 1.25rem',
              fontSize: '0.9rem',
              gap: '0.6rem'
            }}
            aria-label="Cart"
          >
            <ShoppingBag size={18} color="#000" />
            <span style={{ fontWeight: 800 }}>Cart</span>
            <span style={{
              background: '#000',
              color: 'var(--accent-cyan)',
              padding: '2px 7px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800
            }}>
              {cartCount}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
}
