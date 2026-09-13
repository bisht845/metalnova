import React, { useState, useEffect } from 'react';
import { DEFAULT_THEME, loadStoredTheme, storeTheme } from '../theme';
import { getProducts } from '../services/catalogService';
import { archiveInquiry, getInquiries } from '../services/inquiryService';
import { getTheme, updateTheme } from '../services/themeService';
import {
  archiveProduct, createProduct, updateProduct, uploadProductImage
} from '../services/adminService';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Tab Management
  const [activeTab, setActiveTab] = useState('inquiries');

  // Loaded Data
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [themeForm, setThemeForm] = useState(loadStoredTheme);
  const [isSavingTheme, setIsSavingTheme] = useState(false);

  // Form States - Product
  const [productForm, setProductForm] = useState({
    id: null, // set when editing
    name: '',
    tagline: '',
    description: '',
    materials: '',
    tolerances: '',
    applications: [],
    keyFeatures: [],
    availableMaterials: [],
    imageUrl: '',
    specs: []
  });
  const [newSpecParam, setNewSpecParam] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Notification Banner
  const [notification, setNotification] = useState(null);

  // Authentication check
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'metalnova2026' && password === 'metalnova2026') {
      setIsAuthenticated(true);
      setAuthError('');
      triggerNotification('Access Granted. Loaded Secure Dashboard.');
    } else {
      setAuthError('Invalid administrator username or password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setAuthError('');
    setNotification(null);
    setActiveTab('inquiries');
  };

  const triggerNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      triggerNotification('Image size exceeds 5MB limit.', 'error');
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('image', file);

    setIsUploading(true);
    triggerNotification('Uploading image to Cloudinary...', 'success');

    try {
      const data = await uploadProductImage(formDataObj);
      if (data.imageUrl) {
          setProductForm(prev => ({ ...prev, imageUrl: data.imageUrl }));
          triggerNotification('Image uploaded successfully!');
      } else {
        triggerNotification('Could not extract uploaded URL.', 'error');
      }
    } catch (err) {
      console.error('Image upload failed', err);
      triggerNotification('Could not connect to server upload API.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Fetch data
  const fetchData = async () => {
    try {
      const [prods, inqs] = await Promise.all([
        getProducts(), getInquiries()
      ]);
      setProducts(prods);
      setInquiries(inqs);
      const theme = await getTheme();
      setThemeForm({ ...DEFAULT_THEME, ...theme });
      storeTheme(theme);
    } catch (err) {
      console.error('API Fetch failed', err);
      triggerNotification('Could not connect to API server. Operating in offline demo mode.', 'error');
    }
  };

  const handleThemeChange = (field, value) => {
    const nextTheme = { ...themeForm, [field]: value };
    setThemeForm(nextTheme);
    storeTheme(nextTheme);
  };

  const handleSaveTheme = async (e) => {
    e.preventDefault();
    setIsSavingTheme(true);
    storeTheme(themeForm);
    try {
      const savedTheme = await updateTheme(themeForm);
      setThemeForm({ ...DEFAULT_THEME, ...savedTheme });
      storeTheme(savedTheme);
      triggerNotification('Website theme published successfully!');
    } catch (error) {
      console.error('Theme publish failed:', error);
      triggerNotification(`Publish failed: ${error.message}`, 'error');
    } finally {
      setIsSavingTheme(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // ================= PRODUCT ACTIONS =================

  const handleAddSpec = () => {
    if (!newSpecParam.trim() || !newSpecVal.trim()) return;
    setProductForm(prev => ({
      ...prev,
      specs: [...prev.specs, { parameter: newSpecParam, value: newSpecVal }]
    }));
    setNewSpecParam('');
    setNewSpecVal('');
  };

  const handleRemoveSpec = (index) => {
    setProductForm(prev => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index)
    }));
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name) {
      triggerNotification('Product Name is required.', 'error');
      return;
    }

    const isEdit = !!productForm.id;
    const productPayload = {
      ...productForm,
      keyFeatures: productForm.keyFeatures.map(feature => feature.trim()).filter(Boolean),
      applications: productForm.applications.map(application => application.trim()).filter(Boolean),
      availableMaterials: productForm.availableMaterials.map(material => material.trim()).filter(Boolean)
    };
    try {
      if (isEdit) await updateProduct(productForm.id, productPayload);
      else await createProduct(productPayload);
      triggerNotification(isEdit ? 'Product updated successfully!' : 'Product created successfully!');
      setProductForm({
          id: null,
          name: '',
          tagline: '',
          description: '',
          materials: '',
          tolerances: '',
          applications: [],
          keyFeatures: [],
          availableMaterials: [],
          imageUrl: '',
          specs: []
      });
      fetchData();
    } catch (err) {
      triggerNotification('Server communication failure.', 'error');
    }
  };

  const handleEditProductClick = (prod) => {
    setProductForm({
      id: prod._id,
      name: prod.name,
      tagline: prod.tagline || '',
      description: prod.description || '',
      materials: prod.materials || '',
      tolerances: prod.tolerances || '',
      applications: Array.isArray(prod.applications)
        ? prod.applications
        : String(prod.applications || '').split(/[\r\n,;•]+/).map(item => item.trim()).filter(Boolean),
      keyFeatures: Array.isArray(prod.keyFeatures) ? prod.keyFeatures : [],
      availableMaterials: Array.isArray(prod.availableMaterials)
        ? prod.availableMaterials
        : String(prod.availableMaterials || '').split(/[\r\n,;•]+/).map(item => item.trim()).filter(Boolean),
      imageUrl: prod.imageUrl || '',
      specs: prod.specs || []
    });
    setNewSpecParam('');
    setNewSpecVal('');
    requestAnimationFrame(() => {
      document.getElementById('product-form-anchor')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };

  const handleArchiveProduct = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this product?')) return;
    try {
      await archiveProduct(id);
      triggerNotification('Product deleted successfully.');
      fetchData();
    } catch (err) {
      triggerNotification('Server communication failure.', 'error');
    }
  };

  // ================= INQUIRY ACTIONS =================

  const handleArchiveInquiry = async (id) => {
    if (!window.confirm('Archive this customer lead?')) return;
    try {
      await archiveInquiry(id);
      triggerNotification('Inquiry archived.');
      fetchData();
    } catch (err) {
      triggerNotification('Server communication failure.', 'error');
    }
  };

  // Login Barrier Screen
  if (!isAuthenticated) {
    return (
      <div id="admin-login-page" className="min-h-screen flex items-center justify-center bg-[#080c14] text-brand-copper pt-24 px-4">
        {/* Subtle grid mesh background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,125,85,0.06),transparent_60%)] pointer-events-none"></div>

        <div className="relative w-full max-w-md p-8 bg-[#111827]/60 border border-slate-800/80 backdrop-blur-md rounded-3xl shadow-2xl space-y-6 text-center z-10">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-brand-copper/10 border border-brand-copper/25 text-brand-copper">
              Administrator Access
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight mt-3">Metalnova Portal</h1>
            <p className="text-[16px] text-brand-copper0 font-light">Enter your username and password to access products, specifications, and inquiries.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label htmlFor="admin-username" className="block text-[10px] uppercase font-bold text-brand-copper tracking-wider mb-2">Username</label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="Enter username"
                required
                className="w-full bg-[#0a0f18] border border-slate-800 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-4 py-3 outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-[10px] uppercase font-bold text-brand-copper tracking-wider mb-2">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter password"
                required
                className="w-full bg-[#0a0f18] border border-slate-800 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-4 py-3 outline-none transition-all"
              />
            </div>
            {authError && <p data-theme-status="error" className="text-[16px] text-rose-500 font-bold">{authError}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-brand-copper to-brand-copper-dark hover:from-brand-copper-light hover:to-brand-copper text-brand-copper text-[16px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
            >
              Verify Credentials
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-page" className="bg-[#080c14] text-brand-copper min-h-screen pt-36 pb-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Notification Banner */}
      {notification && (
        <div data-theme-status={notification.type === 'error' ? 'error' : 'success'} className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border transition-all text-[16px] font-bold ${notification.type === 'error'
          ? 'bg-rose-950/80 border-rose-800 text-rose-200'
          : 'bg-emerald-950/80 border-emerald-800 text-emerald-200'
          }`}>
          <span>{notification.type === 'error' ? '⚠️' : '✓'}</span>
          <span>{notification.msg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-900">
          <div>
            <span className="text-[10px] font-bold text-brand-copper uppercase tracking-widest"> Operations</span>
            <h1 className="text-3xl font-extrabold text-brand-copper tracking-tight mt-1">Robust Control Panel</h1>
          </div>
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 text-left">
            <div className="px-5 py-3 rounded-2xl bg-[#111827]/40 border border-slate-800/80">
              <span className="block text-[9px] uppercase tracking-wider text-brand-copper0 font-bold">Total Inquiries</span>
              <span className="text-lg font-black text-brand-copper">{inquiries.length}</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-[#111827]/40 border border-slate-800/80">
              <span className="block text-[9px] uppercase tracking-wider text-brand-copper0 font-bold">Product Profiles</span>
              <span className="text-lg font-black text-brand-copper">{products.length}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="admin-logout-button px-5 py-3 rounded-2xl border border-rose-800/80 bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-slate-800/60 gap-2 overflow-x-auto pb-1">
          {[
            { id: 'inquiries', label: '📥 Customer Inquiries' },
            { id: 'products', label: '🛠 Manage Products' }
          ].concat({ id: 'theme', label: 'Website Theme' }).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-t-xl text-[16px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${activeTab === tab.id
                ? 'bg-slate-900 text-brand-copper border-b-2 border-brand-electric'
                : 'text-brand-copper0 hover:text-brand-copper hover:bg-slate-900/40'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= TABS BODY ================= */}

        {activeTab === 'theme' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            <form onSubmit={handleSaveTheme} className="bg-[#111827]/40 border border-slate-800/80 p-8 rounded-3xl space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-brand-copper">Frontend Color Settings</h2>
                <p className="text-sm text-slate-400 mt-2">Changes preview instantly. Publish them to apply the theme for every visitor.</p>
              </div>
              {[
                ['sidebarColor', 'Sidebar / Navigation Color'],
                ['navigationTextColor', 'Navigation Font Color'],
                ['navigationHoverColor', 'Navigation Hover Color'],
                ['headerActiveColor', 'Header Active Link Color'],
                ['headerCtaColor', 'Header CTA Background'],
                ['headerCtaHoverColor', 'Header CTA Hover Color'],
                ['headerCtaTextColor', 'Header CTA Font Color'],
                ['headerBorderColor', 'Header Border Color'],
                ['headerDropdownColor', 'Header Dropdown Background'],
                ['headerIconColor', 'Header Icon Color'],
                ['headingColor', 'Heading Font Color'],
                ['subheadingColor', 'Labels / Subheading Color'],
                ['textColor', 'Body Font Color'],
                ['mutedTextColor', 'Muted Font Color'],
                ['linkColor', 'Links Color'],
                ['iconColor', 'Icons Color'],
                ['accentColor', 'Main Accent Color'],
                ['buttonColor', 'Button Background Color'],
                ['buttonTextColor', 'Button Font Color'],
                ['buttonHoverColor', 'Button Hover Color'],
                ['borderColor', 'Borders Color'],
                ['focusColor', 'Input Focus Color'],
                ['badgeColor', 'Badge Background Color'],
                ['badgeTextColor', 'Badge Font Color'],
                ['backgroundColor', 'Website Background Color'],
                ['heroColor', 'Hero Background Color'],
                ['surfaceColor', 'Alternate Section Color'],
                ['cardColor', 'Cards Background Color'],
                ['inputColor', 'Forms Background Color'],
                ['inputTextColor', 'Forms Font Color'],
                ['tableHeaderColor', 'Table Header Background'],
                ['footerColor', 'Footer Background Color'],
                ['footerTextColor', 'Footer Font Color'],
                ['footerHeadingColor', 'Footer Heading Color'],
                ['overlayColor', 'Modal / Image Overlay Color'],
                ['successColor', 'Success Message Color'],
                ['warningColor', 'Warning Message Color'],
                ['errorColor', 'Error Message Color'],
                ['loaderColor', 'Preloader Background Color'],
                ['loaderAccentColor', 'Preloader Glow Color'],
                ['loaderPanelColor', 'Preloader Center Panel Color'],
                ['loaderTextColor', 'Preloader Font Color'],
                ['loaderRingColor', 'Preloader Spinner Color'],
                ['loaderTrackColor', 'Preloader Track Background'],
                ['loaderProgressColor', 'Preloader Progress Color'],
                ['loaderPatternColor', 'Preloader Pattern Color']
              ].map(([field, label]) => (
                <label key={field} className="flex items-center justify-between gap-5 p-4 rounded-2xl bg-[#0a0f18] border border-slate-800">
                  <span className="text-sm font-bold text-slate-200">{label}</span>
                  <span className="flex items-center gap-3">
                    <input
                      type="text"
                      value={themeForm[field]}
                      onChange={(e) => /^#[0-9a-f]{0,6}$/i.test(e.target.value) && handleThemeChange(field, e.target.value)}
                      className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-xs uppercase text-white"
                    />
                    <input type="color" value={themeForm[field]} onChange={(e) => handleThemeChange(field, e.target.value)} className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border-0" />
                  </span>
                </label>
              ))}
              <label className="block p-4 rounded-2xl bg-[#0a0f18] border border-slate-800">
                <span className="block text-sm font-bold text-slate-200 mb-3">Website Font Family</span>
                <select value={themeForm.headerFontFamily} onChange={(e) => handleThemeChange('headerFontFamily', e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white">
                  {['Outfit', 'Clash Display', 'Arial', 'Georgia', 'Trebuchet MS', 'Times New Roman'].map((font) => <option key={font} value={font}>{font}</option>)}
                </select>
              </label>
              <label className="block p-4 rounded-2xl bg-[#0a0f18] border border-slate-800">
                <span className="block text-sm font-bold text-slate-200 mb-3">Website Font Weight</span>
                <select value={themeForm.headerFontWeight} onChange={(e) => handleThemeChange('headerFontWeight', e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white">
                  {[['400', 'Regular'], ['500', 'Medium'], ['600', 'Semi Bold'], ['700', 'Bold'], ['800', 'Extra Bold']].map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <div className="flex gap-3">
                <button type="submit" disabled={isSavingTheme} className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold uppercase tracking-wider rounded-xl">
                  {isSavingTheme ? 'Publishing...' : 'Publish Website Theme'}
                </button>
                <button type="button" onClick={() => { setThemeForm(DEFAULT_THEME); storeTheme(DEFAULT_THEME); }} className="px-5 py-3 border border-slate-700 text-slate-200 font-bold rounded-xl hover:bg-slate-800">Reset</button>
              </div>
            </form>

            <div className="admin-theme-preview rounded-3xl overflow-hidden border border-slate-700 bg-white self-start sticky top-28">
              <div className="p-5 flex justify-between" style={{ backgroundColor: themeForm.sidebarColor, color: themeForm.navigationTextColor, fontFamily: themeForm.headerFontFamily, fontWeight: themeForm.headerFontWeight, borderBottom: `1px solid ${themeForm.headerBorderColor}` }}>
                <span>Website Navigation</span>
                <span style={{ color: themeForm.headerActiveColor }}>Active Link</span>
                <span className="px-3 py-1 rounded-full" style={{ backgroundColor: themeForm.headerCtaColor, color: themeForm.headerCtaTextColor }}>CTA</span>
              </div>
              <div className="p-8 space-y-4" style={{ backgroundColor: themeForm.heroColor }}>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: themeForm.badgeColor, color: themeForm.badgeTextColor }}>Theme Badge</span>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: themeForm.subheadingColor }}>Live Preview Label</p>
                <h3 className="text-3xl font-black" style={{ color: themeForm.headingColor }}>Precision in every component</h3>
                <p className="leading-relaxed" style={{ color: themeForm.textColor }}>Heading, body, navigation, button, and background colors update across the complete frontend.</p>
                <p className="text-sm" style={{ color: themeForm.mutedTextColor }}>Muted supporting description</p>
                <a style={{ color: themeForm.linkColor }}>Website link preview</a>
                <button type="button" className="px-5 py-3 rounded-xl font-bold" style={{ backgroundColor: themeForm.buttonColor, color: themeForm.buttonTextColor }}>Explore Products</button>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: themeForm.cardColor, color: themeForm.textColor, borderColor: themeForm.borderColor }}>Card and border preview</div>
                <input readOnly value="Form background preview" className="w-full p-3 rounded-xl border" style={{ backgroundColor: themeForm.inputColor, color: themeForm.inputTextColor, borderColor: themeForm.focusColor }} />
              </div>
              <div className="p-5" style={{ backgroundColor: themeForm.surfaceColor, color: themeForm.textColor }}>Alternate section background</div>
              <div className="p-5" style={{ backgroundColor: themeForm.footerColor, color: themeForm.footerTextColor }}><strong style={{ color: themeForm.footerHeadingColor }}>Footer Heading</strong><br />Footer background and text</div>
              <div className="p-8 flex flex-col items-center gap-4" style={{ backgroundColor: themeForm.loaderColor }}>
                <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center" style={{ borderColor: themeForm.loaderRingColor, backgroundColor: themeForm.loaderPanelColor, boxShadow: `0 0 24px ${themeForm.loaderAccentColor}` }}>
                  <strong style={{ color: themeForm.loaderTextColor }}>Loader</strong>
                </div>
                <div className="w-40 h-2 rounded-full overflow-hidden" style={{ backgroundColor: themeForm.loaderTrackColor }}>
                  <div className="w-2/3 h-full" style={{ backgroundColor: themeForm.loaderProgressColor }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 1. INQUIRIES TAB */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-brand-copper text-left">Active RFQ Inquiries</h2>
            {inquiries.length === 0 ? (
              <div className="p-12 text-center border border-slate-800 rounded-3xl bg-[#111827]/20">
                <p className="text-[16px] text-brand-copper0 font-light">No active inquiries stored in database.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inquiries.map(inq => (
                  <div key={inq._id} className="p-6 bg-[#111827]/30 border border-slate-800 hover:border-brand-copper/30 rounded-3xl space-y-4 relative overflow-hidden transition-all text-left">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-brand-copper/10 text-brand-copper border-l border-b border-brand-copper/20 text-[9px] font-bold uppercase rounded-bl-xl">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-brand-copper">{inq.fullName}</h3>
                      <p className="text-[16px] text-brand-copper font-semibold">{inq.companyName || 'Private Inquiry'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-[16px] pt-2 border-t border-slate-800/60">
                      <div>
                        <span className="block text-[9px] text-brand-copper0 uppercase tracking-wider font-bold">Email</span>
                        <a href={`mailto:${inq.email}`} className="text-brand-copper hover:text-brand-copper font-medium">{inq.email}</a>
                      </div>
                      <div>
                        <span className="block text-[9px] text-brand-copper0 uppercase tracking-wider font-bold">Phone</span>
                        <a href={`tel:${inq.phone}`} className="text-brand-copper hover:text-brand-copper font-medium">{inq.phone}</a>
                      </div>
                      <div>
                        <span className="block text-[9px] text-brand-copper0 uppercase tracking-wider font-bold">Product Required</span>
                        <span className="text-brand-copper font-bold">{inq.productType}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-brand-copper0 uppercase tracking-wider font-bold">Qty / Volume</span>
                        <span className="text-brand-copper font-bold">{inq.quantity}</span>
                      </div>
                    </div>

                    {inq.specifications && (
                      <div className="p-3 bg-[#0a0f18] rounded-xl text-[16px] space-y-1">
                        <span className="block text-[9px] text-brand-copper0 uppercase tracking-wider font-bold">Specs & Custom Notes</span>
                        <p className="text-brand-copper font-light leading-relaxed">{inq.specifications}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-[16px]">
                      {inq.materialRequired && (
                        <div>
                          <span className="block text-[9px] text-brand-copper0 uppercase tracking-wider font-bold">Material</span>
                          <span className="text-brand-copper font-medium">{inq.materialRequired}</span>
                        </div>
                      )}
                      {inq.country && (
                        <div>
                          <span className="block text-[9px] text-brand-copper0 uppercase tracking-wider font-bold">Location</span>
                          <span className="text-brand-copper font-medium">{inq.country}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-800/40 flex justify-between items-center">
                      <span className="text-[9px] text-brand-copper0 uppercase font-bold tracking-wider">
                        Industry: {inq.industry || 'General'}
                      </span>
                      <button
                        onClick={() => handleArchiveInquiry(inq._id)}
                        className="admin-theme-action px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Archive Lead
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-10 text-left">

            {/* Create/Edit Form Anchor */}
            <div id="product-form-anchor" className="bg-[#111827]/40 border border-slate-800/80 p-8 md:p-10 rounded-3xl space-y-8">
              <h3 className="text-base font-extrabold text-brand-copper tracking-wide">
                {productForm.id ? '✏️ Edit Product Profile' : '➕ Create New Product Profile'}
              </h3>

              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Left Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-copper0 tracking-wider mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Copper Rivets"
                      className="w-full bg-[#0a0f18] border border-slate-800 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-4 py-3 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-copper0 tracking-wider mb-2">Tagline</label>
                    <input
                      type="text"
                      value={productForm.tagline}
                      onChange={(e) => setProductForm(prev => ({ ...prev, tagline: e.target.value }))}
                      placeholder="e.g. High Conductivity Contacts"
                      className="w-full bg-[#0a0f18] border border-slate-800 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-4 py-3 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-copper0 tracking-wider mb-2">Product Image (File Upload or URL)</label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="text"
                        value={productForm.imageUrl}
                        onChange={(e) => setProductForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="Image URL or upload file..."
                        className="flex-grow bg-[#0a0f18] border border-slate-800 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-4 py-3 outline-none transition-all"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="product-image-file-input"
                      />
                      <label
                        htmlFor="product-image-file-input"
                        className="cursor-pointer px-4 py-3 bg-brand-electric/15 hover:bg-brand-electric/25 border border-brand-electric/30 text-brand-copper text-[16px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md text-center shrink-0"
                      >
                        {isUploading ? 'Uploading...' : 'Upload File'}
                      </label>
                    </div>
                    {productForm.imageUrl && (
                      <div className="mt-3 relative w-16 h-16 rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
                        <img src={productForm.imageUrl} alt="preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setProductForm(prev => ({ ...prev, imageUrl: '' }))}
                          className="absolute inset-0 bg-black/60 hover:bg-black/80 flex items-center justify-center text-[10px] font-bold text-rose-500 opacity-0 hover:opacity-100 transition-opacity"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-copper0 tracking-wider mb-2">Description</label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Detailed product information..."
                      rows="4"
                      className="w-full bg-[#0a0f18] border border-slate-800 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-4 py-3 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Right Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-copper0 tracking-wider mb-2">Applications</label>
                    <textarea
                      value={productForm.applications.join('\n')}
                      onChange={(e) => setProductForm(prev => ({
                        ...prev,
                        applications: e.target.value.split(/\r?\n/)
                      }))}
                      placeholder={'Relays\nContactors\nSwitches\nCircuit Breakers'}
                      rows="6"
                      className="w-full bg-[#0a0f18] border border-slate-800 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-4 py-3 outline-none transition-all resize-y"
                    />
                    <p className="mt-1.5 text-[11px] text-brand-copper0">Enter one application per line.</p>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-copper0 tracking-wider mb-2">Key Features</label>
                    <textarea
                      value={productForm.keyFeatures.join('\n')}
                      onChange={(e) => setProductForm(prev => ({
                        ...prev,
                        keyFeatures: e.target.value.split(/\r?\n/)
                      }))}
                      placeholder={'High electrical conductivity\nExcellent wear and corrosion resistance\nTight dimensional tolerances'}
                      rows="6"
                      className="w-full bg-[#0a0f18] border border-slate-800 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-4 py-3 outline-none transition-all resize-y"
                    />
                    <p className="mt-1.5 text-[11px] text-brand-copper0">Enter one feature per line.</p>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-copper0 tracking-wider mb-2">Available Materials</label>
                    <textarea
                      value={productForm.availableMaterials.join('\n')}
                      onChange={(e) => setProductForm(prev => ({
                        ...prev,
                        availableMaterials: e.target.value.split(/\r?\n/  )
                      }))}
                      placeholder={'Fine Silver (Ag)\nSilver Nickel (AgNi)\nSilver Copper (AgCu)'}
                      rows="6"
                      className="w-full bg-[#0a0f18] border border-slate-800 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-4 py-3 outline-none transition-all resize-y"
                    />
                    <p className="mt-1.5 text-[11px] text-brand-copper0">Enter one material per line.</p>
                  </div>
                </div>

                <div className="md:col-span-2 pt-4 border-t border-slate-800/30 flex gap-4">
                  <button
                    type="submit"
                    className="flex-grow py-3 bg-gradient-to-r from-brand-electric-dark to-brand-electric hover:from-brand-electric hover:to-brand-electric-dark text-brand-copper text-[16px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {productForm.id ? 'Save Product Profile' : 'Publish Product Profile'}
                  </button>
                  {productForm.id && (
                    <button
                      type="button"
                      onClick={() => setProductForm({
                        id: null,
                        name: '',
                        tagline: '',
                        description: '',
                        materials: '',
                        tolerances: '',
                        applications: [],
                        keyFeatures: [],
                        availableMaterials: [],
                        imageUrl: '',
                        specs: []
                      })}
                      className="px-6 py-3 bg-transparent border border-slate-800 text-brand-copper text-[16px] font-bold uppercase tracking-wider rounded-xl hover:bg-slate-900 transition-all cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

              </form>
            </div>

            {/* List */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-brand-copper tracking-wide">Published Product Profiles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map(prod => {
                  return (
                    <div key={prod._id} className="p-6 bg-[#111827]/20 border border-slate-800 rounded-3xl space-y-4 text-left relative overflow-hidden">
                      {prod.imageUrl && (
                        <div className="w-16 h-16 rounded-lg border border-slate-800 overflow-hidden bg-slate-950">
                          <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-lg font-black text-brand-copper mt-1">{prod.name}</h4>
                          {prod.tagline && <p className="text-[16px] text-brand-copper font-semibold mt-0.5">{prod.tagline}</p>}
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditProductClick(prod)}
                            className="admin-edit-product px-3 py-2 border rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                            style={{
                              backgroundColor: 'var(--site-button)',
                              borderColor: 'var(--site-button)',
                              color: 'var(--site-button-text)'
                            }}
                            title="Edit Product"
                          >  
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleArchiveProduct(prod._id)}
                            className="admin-delete-product px-3 py-2 border rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                            style={{
                              backgroundColor: 'var(--site-error)',
                              borderColor: 'var(--site-error)',
                              color: 'var(--site-button-text)'
                            }}
                            title="Delete Product"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {prod.description && <p className="text-[16px] text-brand-copper font-light leading-relaxed">{prod.description}</p>}

                      {prod.specs && prod.specs.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <span className="block text-[9px] text-brand-copper0 uppercase tracking-wider font-bold">Specifications Data ({prod.specs.length})</span>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            {prod.specs.map((s, i) => (
                              <div key={i} className="admin-spec-item bg-slate-900/60 p-2 rounded-lg border border-slate-800/30 flex justify-between">
                                <span className="text-brand-copper font-medium">{s.parameter}:</span>
                                <span className="text-brand-copper font-bold">{s.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
