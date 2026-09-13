import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/catalogService';

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load products from backend
  useEffect(() => {
    const fetchLiveCatalog = async () => {
      try {
        const liveProds = await getProducts();
        setProducts(Array.isArray(liveProds) ? liveProds : []);
      } catch (err) {
        console.warn('Unable to load the published product catalog.', err);
        setProducts([]);
      }
    };
    fetchLiveCatalog();
  }, []);

  // Filter the complete product catalog by search query.
  const filteredProducts = products.filter(cat => {
    const name = (cat.name || cat.title || '').toLowerCase();
    const tagline = (cat.tagline || '').toLowerCase();
    const description = (cat.description || cat.desc || '').toLowerCase();
    const materials = (cat.materials || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = name.includes(query) || tagline.includes(query) || description.includes(query) || materials.includes(query);

    return matchesSearch;
  });

  return (
    <div id="products-page-custom" className="font-sans antialiased text-[#023C85] bg-white min-h-screen pb-24">

      {/* ================= HERO HEADER INTRO ================= */}
      <section className="relative pt-36 pb-20 overflow-hidden px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        {/* Subtle mesh background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(1,114,176,0.06),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(2,60,133,0.04),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(1,114,176,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(1,114,176,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0172B0]/25 bg-[#0172B0]/5">
            <span className="w-2 h-2 rounded-full bg-[#0172B0] animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#023C85]">
              High-Precision Engineering
            </span>
          </div> */}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Our <span className="bg-gradient-to-r from-[#023C85] via-[#0172B0] to-[#023C85] bg-clip-text text-transparent">Product Catalog</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
           Metalnova manufactures a comprehensive range of precision electrical contact components for the automotive, electrical, electronics, and industrial sectors. From standard products to customer-specific solutions, every component is manufactured with controlled processes, certified quality systems, and a commitment to consistent performance.
          </p>

          {/* Interactive Search Bar */}
          <div className="max-w-md mx-auto relative mt-8 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0172B0] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products by name, alloy, or specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#0172B0]/20 focus:border-[#0172B0] text-[#023C85] text-[16px] rounded-2xl pl-12 pr-10 py-3.5 outline-none transition-all duration-200 placeholder:text-slate-400/80 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#0172B0]/10 hover:text-[#023C85] transition-all text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS SHOWCASE GRID ================= */}
      <section id="catalog-products-section" className="relative py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            /* No Results State */
            <div className="max-w-md mx-auto text-center py-16 space-y-4">
              <div className="text-5xl animate-bounce">🔍</div>
              <h4 className="text-xl font-extrabold text-[#023C85]">No Components Found</h4>
              <p className="text-slate-500 text-sm font-light">
                We couldn't find any products matching "{searchQuery}". Try adjusting your query.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#023C85] to-[#0172B0] text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            /* Grid layout of filtered products */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {filteredProducts.map((cat) => {
                const currentId = cat._id || cat.id;
                return (
                  <div
                    key={currentId}
                    onClick={() => {
                      navigate(`/product/${currentId}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group product-card rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between"
                  >
                    {/* Framed Image Container */}
                    <div className="p-4">
                      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white flex items-center justify-center border border-slate-100/50 p-3">
                        {(cat.imageUrl || cat.img) && (
                          <img
                            src={cat.imageUrl || cat.img}
                            alt={cat.name || cat.title}
                            loading="lazy"
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-6 pt-2 space-y-4 flex flex-col justify-between flex-1 text-left">
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-[#023C85] text-xl tracking-wide group-hover:text-[#0172B0] transition-colors duration-250">
                            {cat.name || cat.title}
                          </h4>
                          {cat.tagline && (
                            <p className="text-[10px] uppercase font-bold tracking-widest text-[#0172B0]">
                              {cat.tagline}
                            </p>
                          )}
                        </div>

                        <p className="text-[14px] text-slate-500 font-light leading-relaxed line-clamp-3">
                          {cat.description || cat.tagline || cat.desc}
                        </p>

                        {/* Material Badges */}
                        {/* {materialList.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1.5">
                            {materialList.map((mat, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-bold px-2.5 py-1 rounded-md material-tag tracking-wide"
                              >
                                {mat}
                              </span>
                            ))}
                          </div>
                        )} */}
                      </div>

                      {/* Card specifications link */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-widest transition-colors">
                        <span className="specs-link">View Specifications</span>
                        <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-[#0172B0] group-hover:text-[#023C85]">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
