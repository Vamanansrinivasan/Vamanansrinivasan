import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, SORT_OPTIONS } from '../data/products';

export default function ProductFilters({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  totalResults
}) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      
      {/* Top Bar: Search and Sort */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        gap: '1.25rem', 
        flexWrap: 'wrap',
        marginBottom: '1.5rem'
      }}>
        
        {/* Search input with icon */}
        <div style={{ position: 'relative', flex: '1', minWidth: '260px', maxWidth: '420px' }}>
          <Search 
            size={18} 
            color="var(--text-muted)" 
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
          />
          <input
            type="text"
            placeholder="Search by model, technology, or colorway..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="tech-input"
            style={{ paddingLeft: '2.75rem', paddingRight: searchQuery ? '2.5rem' : '1rem' }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Sort & Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            SHOWING <strong style={{ color: '#fff' }}>{totalResults}</strong> MODELS
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={15} color="var(--accent-cyan)" />
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="tech-input"
              style={{ 
                padding: '0.55rem 1rem', 
                fontSize: '0.85rem', 
                width: 'auto',
                cursor: 'pointer' 
              }}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value} style={{ background: '#0c1019', color: '#fff' }}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {CATEGORIES.map(category => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              style={{
                background: isActive ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? '#000' : 'var(--text-secondary)',
                border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-display)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.88rem',
                padding: '0.5rem 1.1rem',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                boxShadow: isActive ? '0 0 15px rgba(0, 240, 255, 0.35)' : 'none'
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

    </div>
  );
}
