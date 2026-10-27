import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  UploadCloud, 
  Check, 
  Copy, 
  Sparkles, 
  Trash2, 
  ExternalLink,
  ShieldAlert,
  Code
} from 'lucide-react';
import { 
  getActiveFirebaseConfig, 
  saveFirebaseConfig, 
  uploadBase64ToFirebase, 
  getBase64Gallery 
} from '../services/firebase';

export default function FirebaseStudioModal({ isOpen, onClose, onAddCustomShoe }) {
  if (!isOpen) return null;

  const [config, setConfig] = useState(getActiveFirebaseConfig());
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [gallery, setGallery] = useState(getBase64Gallery());
  const [uploadStatus, setUploadStatus] = useState('');
  const [copiedItem, setCopiedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('uploader'); // 'uploader' | 'config' | 'gallery'

  useEffect(() => {
    setGallery(getBase64Gallery());
  }, [isOpen]);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    const success = saveFirebaseConfig(config);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }

    setUploadStatus('Encoding to Base64...');
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64String = event.target.result;
      setUploadStatus('Uploading to Firebase Storage via uploadString()...');
      
      const result = await uploadBase64ToFirebase(base64String, file.name, {
        originalSize: file.size,
        mimeType: file.type
      });

      setUploadStatus('Uploaded Successfully!');
      setGallery(getBase64Gallery());
      setTimeout(() => setUploadStatus(''), 2500);
    };
    reader.readAsDataURL(file);
  };

  const handleCopyBase64 = (item) => {
    navigator.clipboard.writeText(item.base64);
    setCopiedItem(item.id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'rgba(10, 14, 23, 0.98)',
          border: '1px solid var(--border-mid)',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 240, 255, 0.25)',
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

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.5rem' }}>
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
            <Database size={22} color="#000" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              Firebase Storage & Base64 Studio
            </h2>
            <p style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              STORAGE BUCKET: {config.storageBucket}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', margin: '1.5rem 0' }}>
          <button
            onClick={() => setActiveTab('uploader')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'uploader' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              padding: '0.6rem 1rem',
              color: activeTab === 'uploader' ? '#fff' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <UploadCloud size={16} color="var(--accent-cyan)" />
            <span>Base64 Uploader</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'gallery' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              padding: '0.6rem 1rem',
              color: activeTab === 'gallery' ? '#fff' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Code size={16} />
            <span>Base64 Assets ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'config' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              padding: '0.6rem 1rem',
              color: activeTab === 'config' ? '#fff' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Firebase Config Credentials
          </button>
        </div>

        {/* TAB 1: Base64 Uploader */}
        {activeTab === 'uploader' && (
          <div>
            <div style={{
              border: '2px dashed var(--border-mid)',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
              background: 'rgba(0, 240, 255, 0.02)',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%'
                }}
              />
              <UploadCloud size={44} color="var(--accent-cyan)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>
                Drop any shoe image here, or browse files
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                File will be converted into a Base64 Data URI and uploaded to Firebase Storage via <code>uploadString(ref, base64, 'data_url')</code>.
              </p>
              <button type="button" className="btn-primary" style={{ pointerEvents: 'none' }}>
                Select Shoe Image
              </button>
            </div>

            {uploadStatus && (
              <div style={{ 
                marginTop: '1.25rem', 
                padding: '0.9rem', 
                background: 'rgba(0, 230, 118, 0.1)', 
                border: '1px solid #00e676', 
                borderRadius: '10px', 
                color: '#00e676',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                <Sparkles size={16} />
                <span>{uploadStatus}</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Base64 Asset Explorer */}
        {activeTab === 'gallery' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                BASE64 PAYLOADS IN CLOUD MEMORY
              </span>
            </div>

            {gallery.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-secondary)' }}>
                No custom base64 uploads yet. Use the Uploader tab to add one!
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                {gallery.map(item => (
                  <div key={item.id} className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div style={{
                      width: '100%',
                      height: '140px',
                      borderRadius: '8px',
                      background: 'rgba(0,0,0,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      <img src={item.base64} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>

                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </div>

                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      Size: {item.sizeKb} KB // Base64
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: 'auto' }}>
                      <button
                        onClick={() => handleCopyBase64(item)}
                        className="btn-secondary"
                        style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', gap: '0.3rem' }}
                      >
                        {copiedItem === item.id ? <Check size={13} color="#00e676" /> : <Copy size={13} />}
                        <span>{copiedItem === item.id ? 'Copied!' : 'Copy Base64'}</span>
                      </button>

                      <button
                        onClick={() => {
                          onAddCustomShoe(item.base64);
                          onClose();
                        }}
                        className="btn-primary"
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
                        title="Create Shoe with this Image"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Firebase Config */}
        {activeTab === 'config' && (
          <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              You can connect directly to your own Firebase Project and Firebase Storage bucket anytime by pasting your project credentials below.
            </p>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                FIREBASE STORAGE BUCKET
              </label>
              <input
                type="text"
                value={config.storageBucket || ''}
                onChange={(e) => setConfig({ ...config, storageBucket: e.target.value })}
                className="tech-input"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  PROJECT ID
                </label>
                <input
                  type="text"
                  value={config.projectId || ''}
                  onChange={(e) => setConfig({ ...config, projectId: e.target.value })}
                  className="tech-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  API KEY
                </label>
                <input
                  type="text"
                  value={config.apiKey || ''}
                  onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                  className="tech-input"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              {saveSuccess && (
                <span style={{ color: '#00e676', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', alignSelf: 'center' }}>
                  ✓ Config Saved & Re-initialized!
                </span>
              )}
              <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                Save Firebase Settings
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
