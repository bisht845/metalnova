import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../services/catalogService';
import { createInquiry } from '../services/inquiryService';
import { COUNTRY_PHONE_OPTIONS, getCountryPhoneRule, getFullPhoneNumber, getPhonePattern } from '../countryPhone';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const product = products.find(p => p._id === productId) || null;

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    quantity: '',
    specifications: '',
    industry: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.warn('Unable to load the published product catalog.', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;
    setIsSubmitting(true);

    const payload = {
      ...formData,
      phone: getFullPhoneNumber(formData.country, formData.phone),
      productType: product.name, // autofill with this product's name
      materialRequired: product.availableMaterials?.[0] || 'Standard'
    };

    try {
      await createInquiry(payload);
      triggerWhatsAppRedirect(payload);
    } catch {
      console.warn('Server offline, initiating direct WhatsApp message.');
      triggerWhatsAppRedirect(payload);
    }
  };

  const triggerWhatsAppRedirect = (payload) => {
    const text = `*New RFQ Product Inquiry - Metalnova*\n` +
      `---------------------------------\n` +
      `*Product:* ${product.name}\n` +
      `*Client:* ${payload.fullName}\n` +
      `*Company:* ${payload.companyName || 'N/A'}\n` +
      `*Email:* ${payload.email}\n` +
      `*Phone:* ${payload.phone}\n` +
      `*Country:* ${payload.country || 'N/A'}\n` +
      `*Quantity:* ${payload.quantity}\n` +
      `*Specs / Dimensions:* ${payload.specifications || 'N/A'}\n` +
      `*Industry Sector:* ${payload.industry || 'N/A'}\n` +
      `---------------------------------`;

    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919810422191&text=${encoded}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setFormSubmitted(true);
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      country: 'India',
      quantity: '',
      specifications: '',
      industry: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center text-brand-copper">
        <p className="text-[16px] font-bold uppercase tracking-widest animate-pulse">Loading Specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#080c14] flex flex-col gap-5 items-center justify-center text-brand-copper px-4 text-center">
        <h1 className="text-2xl">Product Not Found</h1>
        <p>This product is no longer available in the published catalog.</p>
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="px-5 py-3 rounded-xl bg-brand-copper text-white font-bold uppercase tracking-wider"
        >
          View All Products
        </button>
      </div>
    );
  }

  // Show other published products in the related-products section.
  const relatedProducts = products.filter(p => (p._id !== product._id && p.id !== product.id)).slice(0, 3);
  const phoneRule = getCountryPhoneRule(formData.country);
  const productApplications = (Array.isArray(product.applications)
    ? product.applications
    : String(product.applications || '').split(/[\r\n,;•]+/)
  ).map(application => application.trim()).filter(Boolean);
  const productMaterials = (Array.isArray(product.availableMaterials)
    ? product.availableMaterials
    : String(product.availableMaterials || '').split(/[\r\n,;•]+/)
  ).map(material => material.trim()).filter(Boolean);

  return (
    <div id="product-detail-page" className="font-sans antialiased text-brand-copper bg-[#080c14]">

      {/* ================= HEADER OVERVIEW (PREMIUM DARK SYSTEM) ================= */}
      <section className="relative bg-[#060a12] text-brand-copper pt-36 pb-24 overflow-hidden px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        {/* Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(0,210,255,0.09),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(200,125,85,0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-4 text-center relative z-10">
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-[10px] font-bold uppercase tracking-wider text-brand-copper cursor-pointer"
          >
            ← Back to Catalog
          </button>

          <h1 data-theme-role="product-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-copper tracking-tight pt-2">
            {product.name}
          </h1>
          {product.tagline && (
            <p data-theme-role="product-tagline" className="text-gradient-electric text-[16px] sm:text-base font-bold uppercase tracking-wider">
              {product.tagline}
            </p>
          )}
        </div>
      </section>

      {/* ================= DETAILED SPEC SHEET (PREMIUM LIGHT SYSTEM) ================= */}
      <section className="py-24 bg-white text-brand-copper px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Side: Product Profile details */}
          <div className="lg:col-span-7 space-y-8 text-left">

            {/* Product Image Frame */}
            {product.imageUrl && (
              <div className="relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/80 shadow-lg">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto max-h-[520px] object-contain mx-auto"
                />
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-[16px] font-bold uppercase tracking-widest text-brand-copper">Overview Description</h3>
              <p className="text-[16px] sm:text-base text-brand-copper leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {Array.isArray(product.keyFeatures) && product.keyFeatures.some(feature => feature.trim()) && (
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <h4 className="text-[16px] font-bold text-brand-copper">Key Features</h4>
                <ul className="list-disc space-y-1 pl-6 text-[16px] sm:text-[18px] text-brand-copper0 leading-relaxed font-medium marker:text-brand-copper">
                  {product.keyFeatures
                    .map(feature => feature.trim())
                    .filter(Boolean)
                    .map((feature, idx) => (
                      <li key={idx}>{feature.replace(/\.$/, '')}</li>
                    ))}
                </ul>
              </div>
            )}

            {productApplications.length > 0 && (
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <h4 className="text-[16px] font-bold text-brand-copper">Applications / Industries</h4>
                <ul className="list-disc space-y-1 pl-6 text-[16px] sm:text-[18px] text-brand-copper0 leading-relaxed font-medium marker:text-brand-copper">
                  {productApplications.map((application, idx) => (
                      <li key={idx}>{application.replace(/\.$/, '')}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right Side: Specifications List & Inquiry Form */}
          <div className="lg:col-span-5 space-y-8">

            {/* Available Materials list */}
            {productMaterials.length > 0 && (
              <div className="bg-[#0b0f19] border border-slate-800 p-8 rounded-3xl space-y-6 text-left shadow-xl">
                <h3 className="text-[16px] font-bold uppercase tracking-widest text-brand-copper0 border-b border-slate-800 pb-3">
                  Available Materials
                </h3>
                <ul className="list-disc space-y-2 pl-6 text-[16px] text-brand-copper marker:text-brand-copper">
                  {productMaterials.map((material, idx) => (
                    <li key={idx} className="pl-1 leading-relaxed">
                      <span className="font-medium">{material.replace(/\.$/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Branded Context-Aware Inquiry RFQ Form */}
            <div className="bg-[#f8fafc] border border-slate-200/80 p-8 rounded-3xl text-left space-y-6 shadow-sm">
              <div>
                <h3 className="text-base font-extrabold text-brand-copper tracking-tight">Request Quotation</h3>
                <p className="text-[11px] text-brand-copper0 mt-1 font-light">
                  Submit specifications to retrieve pricing for *{product.name}*.
                </p>
              </div>

              {formSubmitted ? (
                <div data-theme-status="success" className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl space-y-2 text-center">
                  <span className="text-xl">✓</span>
                  <h4 className="text-[16px] font-bold uppercase tracking-wider">Inquiry Submitted</h4>
                  <p className="text-[10px] text-emerald-600 font-light leading-relaxed">
                    Redirecting to WhatsApp to send detailed specifications...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-brand-copper0 tracking-wider mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-white border border-slate-200 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-3 py-2.5 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-brand-copper0 tracking-wider mb-1.5">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="ACME Corp"
                        className="w-full bg-white border border-slate-200 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-3 py-2.5 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-brand-copper0 tracking-wider mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full bg-white border border-slate-200 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-3 py-2.5 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-brand-copper0 tracking-wider mb-1.5">Phone Number *</label>
                      <div className="flex">
                        <span className="product-phone-prefix flex items-center px-3 bg-white border border-r-0 border-slate-200 rounded-l-xl text-[16px] text-brand-copper">
                          {phoneRule.dialCode}
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          required
                          inputMode="numeric"
                          pattern={getPhonePattern(phoneRule)}
                          minLength={phoneRule.minLength}
                          maxLength={phoneRule.maxLength}
                          title={`Enter ${phoneRule.minLength === phoneRule.maxLength ? phoneRule.minLength : `${phoneRule.minLength} to ${phoneRule.maxLength}`} digits for ${formData.country}.`}
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            phone: e.target.value.replace(/\D/g, '').slice(0, phoneRule.maxLength)
                          }))}
                          placeholder={`${phoneRule.minLength === phoneRule.maxLength ? phoneRule.minLength : `${phoneRule.minLength}-${phoneRule.maxLength}`} digits`}
                          className="w-full bg-white border border-slate-200 focus:border-brand-copper text-brand-copper text-[16px] rounded-r-xl px-3 py-2.5 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-brand-copper0 tracking-wider mb-1.5">Qty Required *</label>
                      <input
                        type="number"
                        name="quantity"
                        required
                        min="1"
                        step="1"
                        inputMode="numeric"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="e.g. 50000"
                        className="w-full bg-white border border-slate-200 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-3 py-2.5 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-brand-copper0 tracking-wider mb-1.5">Country / Location</label>
                      <select
                        name="country"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value, phone: '' }))}
                        className="w-full bg-white border border-slate-200 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-3 py-2.5 outline-none transition-all"
                      >
                        {COUNTRY_PHONE_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label} ({option.dialCode})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase font-bold text-brand-copper0 tracking-wider mb-1.5">Custom Specifications</label>
                    <textarea
                      name="specifications"
                      value={formData.specifications}
                      onChange={handleInputChange}
                      placeholder="Input custom dimensional ranges, tempers, or chemical requirements..."
                      rows="3"
                      className="w-full bg-white border border-slate-200 focus:border-brand-copper text-brand-copper text-[16px] rounded-xl px-3 py-2.5 outline-none transition-all resize-none font-light"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-brand-copper to-brand-copper-dark hover:from-brand-copper-light hover:to-brand-copper text-brand-copper text-[16px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer text-center"
                  >
                    {isSubmitting ? 'Processing Submission...' : 'Submit Inquiry & WhatsApp →'}
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* ================= RELATED PRODUCTS (PREMIUM DARK GRID) ================= */}
      {relatedProducts.length > 0 && (
        <section className="py-24 bg-[#060a12] text-brand-copper border-t border-slate-900 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-left space-y-2">
              <span className="text-[10px] font-bold text-brand-copper uppercase tracking-wider bg-brand-electric/5 px-3 py-1 rounded-full border border-brand-electric/20">Related Components</span>
              <h3 className="text-2xl font-black text-brand-copper tracking-tight pt-2">Other Catalog Materials</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <div
                  key={p._id || p.id}
                  onClick={() => {
                    navigate(`/product/${p._id || p.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-[#0f172a]/40 border border-slate-800/80 hover:border-brand-copper/30 hover:bg-[#0f172a]/80 rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer shadow-2xl flex flex-col justify-between text-left"
                >
                  {p.imageUrl && (
                    <div className="p-4">
                      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/40">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-75 group-hover:scale-102"
                        />
                      </div>
                    </div>
                  )}

                  <div className="p-6 pt-2 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-brand-copper text-base tracking-wide group-hover:text-brand-copper transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-[11px] text-brand-copper font-light line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/40 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-brand-copper">
                      <span>View Specifications</span>
                      <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
