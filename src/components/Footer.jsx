import React from 'react';
import { Sparkles, Shield, Cpu, Database, ArrowUp } from 'lucide-react';

export default function Footer({ onScrollTop, onOpenFirebaseStudio }) {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'rgba(5, 7, 12, 0.95)',
      marginTop: '5rem',
      padding: '4rem 0 2rem 0'
    }}>
      <div className="container">
        
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.5fr) repeat(3, minmax(0, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={16} color="#000" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900, color: '#fff' }}>
                KINETIX LABS
              </span>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '340px', marginBottom: '1.25rem' }}>
              Next-generation performance footwear designed for runners seeking maximum energy efficiency and futuristic aesthetic precision.
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <span className="badge-pill badge-cyan" style={{ fontSize: '0.7rem' }}>
                React 19 + Vite
              </span>
              <span className="badge-pill" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.7rem' }}>
                Firebase Storage
              </span>
              <span className="badge-pill" style={{ background: 'rgba(255, 85, 0, 0.15)', color: '#ff7733', fontSize: '0.7rem' }}>
                Base64 Pipeline
              </span>
            </div>
          </div>

          {/* Quick Links 1: Collections */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li><a href="#catalog" style={{ color: 'inherit', textDecoration: 'none' }}>Road Racing Series</a></li>
              <li><a href="#catalog" style={{ color: 'inherit', textDecoration: 'none' }}>Streetwear High-Tops</a></li>
              <li><a href="#catalog" style={{ color: 'inherit', textDecoration: 'none' }}>Trail & Alpine Off-Road</a></li>
              <li><a href="#catalog" style={{ color: 'inherit', textDecoration: 'none' }}>Limited 2026 Drops</a></li>
            </ul>
          </div>

          {/* Quick Links 2: Engineering */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Innovation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li>Nitro-Air Foam Tech</li>
              <li>3D Carbon Plate Geometry</li>
              <li>VaporWeave Seamless Upper</li>
              <li><button onClick={onOpenFirebaseStudio} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', padding: 0, fontSize: '0.88rem' }}>Firebase Storage Studio</button></li>
            </ul>
          </div>

          {/* Newsletter signup */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Drop Alerts
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
              Sign up for private access codes to upcoming limited footwear drops.
            </p>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <input 
                type="email" 
                placeholder="runner@speed.io" 
                className="tech-input" 
                style={{ padding: '0.5rem 0.75rem', fontSize: '0.82rem' }} 
              />
              <button className="btn-primary" style={{ padding: '0.5rem 0.9rem', fontSize: '0.82rem' }}>
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)'
        }}>
          <div>
            © 2026 KINETIX FOOTWEAR LABS. ALL PERFORMANCE RIGHTS RESERVED.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>BASE64 OPTIMIZED ASSETS</span>
            <span>FIREBASE CLOUD INTEGRATION</span>
            <button
              onClick={onScrollTop}
              className="btn-icon"
              style={{ width: '32px', height: '32px' }}
              title="Back to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
