import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Certifications from './pages/Certifications';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Loader from './components/Loader';
import './App.css';
import { applyTheme, loadStoredTheme, storeTheme } from './theme';
import { getTheme } from './services/themeService';

// Apply the last published theme before React's first paint.
applyTheme(loadStoredTheme());

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const storedTheme = loadStoredTheme();
    applyTheme(storedTheme);
    getTheme()
      .then(storeTheme)
      .catch(() => applyTheme(storedTheme))
      .finally(() => setThemeReady(true));
  }, []);

  return (
    <Router>
      {/* Wait for the published admin theme before starting the animated loader. */}
      {!themeReady && (
        <div
          id="site-loader"
          className="fixed inset-0 z-[9999]"
          aria-label="Loading website theme"
        />
      )}
      {themeReady && showLoader && <Loader onFinished={() => setShowLoader(false)} />}

      <div
        id="public-site-shell"
        className={`flex flex-col min-h-screen font-sans ${themeReady ? '' : 'invisible'}`}
      >

        {/* Navigation Header */}
        <Navbar />

        {/* Main Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Products />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
     
        {/* Footer */}      
        <Footer />

      </div>
    </Router>
  );
}

export default App;
