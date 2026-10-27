import React, { useState } from 'react';
import { ArrowRight, Zap, ShieldCheck, Flame, Layers, Database, Sparkles, Check } from 'lucide-react';

export default function HeroSection({ heroProducts, onSelectProduct, onOpenFirebaseStudio, onShopAll }) {
  const [activeShoeIndex, setActiveShoeIndex] = useState(0);
  const currentShoe = heroProducts[activeShoeIndex] || heroProducts[0];

  return (
    <section style={{ 
      position: 'relative', 
      padding: '4rem 0 3rem 0',
      overflow: 'hidden'
    }}>
      {/* Background radial accent that tracks the shoe's accent color */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '450px',
        background: `radial-gradient(circle, ${currentShoe?.accentColor || '#00f0ff'}22 0%, transparent 70%)`,
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'background 0.6s ease'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.1fr)', 
          gap: '3rem', 
          alignItems: 'center' 
        }}>

          {/* Left Column: Typography & CTAs */}
          <div>
            {/* Tech Drop Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <span className="badge-pill badge-cyan animate-pulse-glow">
                <Sparkles size={13} />
                NEXT-GEN 2026 DROP
              </span>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.78rem', 
                color: 'var(--text-secondary)',
                letterSpacing: '0.05em' 
              }}>
                BASE64 HIGH-PERFORMANCE PIPELINE
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
              lineHeight: 1.05, 
              marginBottom: '1.25rem',
              fontWeight: 900
            }}>
              THE VELOCITY <br />
              <span style={{
                background: `linear-gradient(135deg, #ffffff 30%, ${currentShoe?.accentColor || '#00f0ff'} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 0 40px ${currentShoe?.accentColor || '#00f0ff'}44`
              }}>
                OF HYPER-LIGHT.
              </span>
            </h1>

            {/* Description */}
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.1rem', 
              lineHeight: 1.6, 
              maxWidth: '540px',
              marginBottom: '2rem' 
            }}>
              Engineered with dual-density nitrogen cushioning, sculpted 3D carbon plates, and 
              an instantaneous Base64 asset engine linked to Firebase Storage for ultra-fast, zero-latency rendering.
            </p>

            {/* Hero Specifications Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1rem', 
              marginBottom: '2.5rem',
              maxWidth: '520px'
            }}>
              <div className="glass-panel" style={{ padding: '0.9rem', textAlign: 'center' }}>
                <div style={{ color: currentShoe?.accentColor || 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 800 }}>
                  215g
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Ultra-Light
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '0.9rem', textAlign: 'center' }}>
                <div style={{ color: currentShoe?.accentColor || 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 800 }}>
                  89%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Energy Return
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '0.9rem', textAlign: 'center' }}>
                <div style={{ color: currentShoe?.accentColor || 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 800 }}>
                  Base64
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Cloud Asset
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onSelectProduct(currentShoe)}
                className="btn-primary" 
                style={{
                  background: `linear-gradient(135deg, ${currentShoe?.accentColor || '#00f0ff'} 0%, #0077ff 100%)`,
                  padding: '1rem 2rem',
                  fontSize: '1rem'
                }}
              >
                <span>Experience {currentShoe?.name?.split(' ')[1] || 'Quantum'}</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={onShopAll}
                className="btn-secondary"
                style={{ padding: '1rem 1.6rem' }}
              >
                <span>Browse All Models</span>
              </button>

              <button 
                onClick={onOpenFirebaseStudio}
                className="btn-secondary"
                style={{ 
                  padding: '1rem 1.25rem',
                  borderColor: 'rgba(0, 240, 255, 0.3)',
                  color: 'var(--accent-cyan)'
                }}
                title="View Firebase Storage Sync"
              >
                <Database size={16} />
                <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>Storage Sync</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive 3D Showcase */}
          <div style={{ position: 'relative' }}>
            
            {/* Card Frame */}
            <div className="glass-panel" style={{ 
              borderRadius: '28px', 
              padding: '2.5rem', 
              position: 'relative',
              boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 50px ${currentShoe?.accentColor || '#00f0ff'}20`,
              border: `1px solid ${currentShoe?.accentColor || '#00f0ff'}40`,
              overflow: 'hidden'
            }}>
              
              {/* Top Badge & Price */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge-pill" style={{ 
                  background: `${currentShoe?.accentColor || '#00f0ff'}20`,
                  color: currentShoe?.accentColor || '#00f0ff',
                  borderColor: `${currentShoe?.accentColor || '#00f0ff'}40`
                }}>
                  {currentShoe?.badge || 'Flagship Edition'}
                </span>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.65rem', fontWeight: 800, color: '#fff' }}>
                    ${currentShoe?.price}
                  </div>
                  {currentShoe?.originalPrice && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                      ${currentShoe?.originalPrice}
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Base64 Shoe Image */}
              <div 
                onClick={() => onSelectProduct(currentShoe)}
                style={{ 
                  width: '100%', 
                  height: '380px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <img 
                  src={currentShoe?.imageBase64} 
                  alt={currentShoe?.name}
                  className="animate-float"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    filter: currentShoe?.cssFilter ? currentShoe.cssFilter : `drop-shadow(0 25px 35px rgba(0,0,0,0.7))`
                  }}
                />
              </div>

              {/* Shoe Info Bar */}
              <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                    {currentShoe?.name}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: currentShoe?.accentColor || 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                    ★ {currentShoe?.rating} ({currentShoe?.reviewsCount} reviews)
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  {currentShoe?.subtitle}
                </p>
              </div>

              {/* Interactive Colorway / Model Switcher */}
              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  SELECT EDITION:
                </span>
                
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  {heroProducts.slice(0, 4).map((shoe, idx) => (
                    <button
                      key={shoe.id}
                      onClick={() => setActiveShoeIndex(idx)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: activeShoeIndex === idx ? `2px solid #fff` : `2px solid transparent`,
                        background: shoe.accentColor || '#fff',
                        boxShadow: activeShoeIndex === idx ? `0 0 15px ${shoe.accentColor}` : 'none',
                        cursor: 'pointer',
                        transform: activeShoeIndex === idx ? 'scale(1.15)' : 'scale(1)',
                        transition: 'all var(--transition-fast)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title={shoe.name}
                    >
                      {activeShoeIndex === idx && <Check size={16} color="#000" strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
