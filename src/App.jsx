import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TickerMarquee from './components/TickerMarquee';
import ProductFilters from './components/ProductFilters';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import FirebaseStudioModal from './components/FirebaseStudioModal';
import AddProductModal from './components/AddProductModal';
import Footer from './components/Footer';

import { INITIAL_PRODUCTS } from './data/products';
import { getCustomProducts } from './services/firebase';
import { Sparkles, Check, Heart, ShoppingBag } from 'lucide-react';

export default function App() {
  // Products inventory: combination of initial base64 shoes + user-added shoes
  const [products, setProducts] = useState(() => {
    const custom = getCustomProducts();
    return [...custom, ...INITIAL_PRODUCTS];
  });

  // Filtering & Sorting State
  const [activeCategory, setActiveCategory] = useState('All Shoes');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');

  // Cart State (with localStorage persistence)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('kinetix_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (with localStorage persistence)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('kinetix_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutSummary, setCheckoutSummary] = useState(null);
  const [isFirebaseStudioOpen, setIsFirebaseStudioOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [studioInitialBase64, setStudioInitialBase64] = useState('');
  const [toast, setToast] = useState(null);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('kinetix_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn("Could not persist cart:", e);
    }
  }, [cartItems]);

  // Sync Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('kinetix_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Could not persist wishlist:", e);
    }
  }, [wishlist]);

  // Show Toast Message
  const showToast = (message, icon = <Check size={16} color="#00e676" />) => {
    setToast({ message, icon });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Cart Management
  const handleAddToCart = (productToAdd) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === productToAdd.id && item.selectedSize === productToAdd.selectedSize
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + (productToAdd.quantity || 1)
        };
        return next;
      }
      return [...prev, { ...productToAdd, quantity: productToAdd.quantity || 1 }];
    });
    showToast(`Added ${productToAdd.name} (Size ${productToAdd.selectedSize}) to bag!`, <ShoppingBag size={16} color="var(--accent-cyan)" />);
  };

  const handleUpdateQuantity = (productId, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.id === productId && item.selectedSize === size) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (productId, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  // Wishlist Management
  const handleToggleWishlist = (productId) => {
    setWishlist(prev => {
      const isAlready = prev.includes(productId);
      if (isAlready) {
        showToast("Removed from wishlist");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Saved to your wishlist!", <Heart size={16} color="#ff3366" fill="#ff3366" />);
        return [...prev, productId];
      }
    });
  };

  // Custom Product Creation from Studio
  const handleProductCreated = (newShoe) => {
    setProducts(prev => [newShoe, ...prev]);
    showToast(`Published ${newShoe.name} to store!`, <Sparkles size={16} color="var(--accent-cyan)" />);
  };

  const handleCreateFromStudioImage = (base64) => {
    setStudioInitialBase64(base64);
    setIsAddProductOpen(true);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'All Shoes' || product.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        product.name.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.colorway && product.colorway.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, activeCategory, searchQuery, sortOption]);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 200,
          background: 'rgba(12, 17, 28, 0.95)',
          border: '1px solid var(--border-highlight)',
          backdropFilter: 'blur(16px)',
          padding: '0.8rem 1.4rem',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          color: '#fff',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(0, 240, 255, 0.25)',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {toast.icon}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => {
          showToast(`${wishlist.length} items in your wishlist`);
        }}
        onOpenFirebaseStudio={() => setIsFirebaseStudioOpen(true)}
        onOpenAddProduct={() => {
          setStudioInitialBase64('');
          setIsAddProductOpen(true);
        }}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
      />

      {/* Hero Showcase Section */}
      <HeroSection
        heroProducts={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onOpenFirebaseStudio={() => setIsFirebaseStudioOpen(true)}
        onShopAll={scrollToCatalog}
      />

      {/* High-Tech Marquee Banner */}
      <TickerMarquee />

      {/* Catalog & Filter Section */}
      <main id="catalog" style={{ padding: '4rem 0 2rem 0', flex: 1 }}>
        <div className="container">
          
          <div style={{ marginBottom: '1rem' }}>
            <span className="badge-pill badge-cyan animate-pulse-glow" style={{ marginBottom: '0.6rem' }}>
              OFFICIAL FOOTWEAR LINEUP
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900 }}>
              Engineered Propulsion Models
            </h2>
          </div>

          {/* Search, Sort, Categories */}
          <ProductFilters
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortOption={sortOption}
            onSortChange={setSortOption}
            totalResults={filteredProducts.length}
          />

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', margin: '2rem 0' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.6rem' }}>No models match your criteria</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Try resetting your search query or choosing another category filter.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All Shoes');
                }}
                className="btn-primary"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={setSelectedProduct}
                  onAddToCart={handleAddToCart}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <Footer 
        onScrollTop={scrollToTop} 
        onOpenFirebaseStudio={() => setIsFirebaseStudioOpen(true)} 
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={(summary) => {
          setCheckoutSummary(summary);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        checkoutSummary={checkoutSummary}
        onOrderComplete={() => {
          setCartItems([]);
        }}
      />

      {/* Firebase Storage & Base64 Studio Modal */}
      <FirebaseStudioModal
        isOpen={isFirebaseStudioOpen}
        onClose={() => setIsFirebaseStudioOpen(false)}
        onAddCustomShoe={handleCreateFromStudioImage}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onProductCreated={handleProductCreated}
        initialBase64={studioInitialBase64}
      />

    </div>
  );
}
