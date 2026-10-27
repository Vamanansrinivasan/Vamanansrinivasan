import React, { useState } from 'react';
import { X, UploadCloud, Plus, Check, Sparkles } from 'lucide-react';
import { uploadBase64ToFirebase, saveCustomProduct } from '../services/firebase';

export default function AddProductModal({ isOpen, onClose, onProductCreated, initialBase64 = '' }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('Next-Gen Engineered Cushioning');
  const [category, setCategory] = useState('Road Racing');
  const [price, setPrice] = useState(250);
  const [accentColor, setAccentColor] = useState('#00f0ff');
  const [badge, setBadge] = useState('New Release');
  const [description, setDescription] = useState('Engineered for peak performance and ultra-light propulsion.');
  const [imageBase64, setImageBase64] = useState(initialBase64);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageBase64(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !imageBase64) {
      alert('Please specify a Shoe Name and upload or provide a Base64 image.');
      return;
    }

    setIsUploading(true);
    setStatusMsg('Synchronizing Base64 asset to Firebase Storage...');

    // Upload to Firebase Storage
    await uploadBase64ToFirebase(imageBase64, `${name.toLowerCase().replace(/\s+/g, '_')}.jpg`, {
      productName: name,
      category,
      price
    });

    const newShoe = {
      id: `custom-${Date.now()}`,
      name,
      subtitle,
      category,
      price: Number(price),
      originalPrice: Number(price) + 30,
      rating: 5.0,
      reviewsCount: 1,
      badge,
      accentColor,
      colorway: 'Custom Lab Edition',
      sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
      description,
      specs: {
        weight: '210g (Size 9)',
        drop: '8mm',
        upper: 'Custom engineered knit',
        midsole: 'Nitro-Air propulsion foam',
        outsole: 'Multi-directional rubber'
      },
      imageBase64,
      isCustom: true
    };

    saveCustomProduct(newShoe);
    setIsUploading(false);
    onProductCreated(newShoe);
    onClose();
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
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.3rem' }}>
          Publish New Sneaker Drop
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Upload an image to convert to Base64 and push to Firebase Storage.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          {/* Image Upload / Preview Zone */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              SHOE IMAGE (ENCODED DIRECTLY TO BASE64)
            </label>
            
            {imageBase64 ? (
              <div style={{
                position: 'relative',
                width: '100%',
                height: '200px',
                borderRadius: '14px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img src={imageBase64} alt="Preview" style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }} />
                <button
                  type="button"
                  onClick={() => setImageBase64('')}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'rgba(0,0,0,0.7)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={15} />
                </button>
              </div>
            ) : (
              <div style={{
                border: '2px dashed var(--border-mid)',
                borderRadius: '14px',
                padding: '2rem',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.02)',
                position: 'relative',
                cursor: 'pointer'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
                <UploadCloud size={32} color="var(--accent-cyan)" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Click or drag shoe photo</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-converts to Base64</div>
              </div>
            )}
          </div>

          {/* Shoe Name & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                SHOE MODEL NAME
              </label>
              <input
                type="text"
                required
                placeholder="e.g. KINETIX Vortex 9"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="tech-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="tech-input"
                style={{ background: '#0f141f' }}
              >
                <option value="Road Racing">Road Racing</option>
                <option value="Streetwear & Lifestyle">Streetwear & Lifestyle</option>
                <option value="Trail & Outdoor">Trail & Outdoor</option>
                <option value="Limited Drop">Limited Drop</option>
              </select>
            </div>
          </div>

          {/* Price, Badge, Accent Color */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                PRICE ($USD)
              </label>
              <input
                type="number"
                required
                min="50"
                max="999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="tech-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                BADGE TAG
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="tech-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                GLOW ACCENT
              </label>
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                style={{ width: '100%', height: '42px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              PERFORMANCE OVERVIEW
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="tech-input"
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={isUploading} className="btn-primary" style={{ padding: '0.8rem 1.6rem' }}>
              {isUploading ? statusMsg : (
                <>
                  <Plus size={16} />
                  <span>Publish to Store</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
