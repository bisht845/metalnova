import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import metalVideoPoster from "../assets/metalvideo.png";
import heroVideoSource from "../assets/herovideo.mp4";
import { getProducts } from "../services/catalogService";
import { createInquiry } from "../services/inquiryService";
import { COUNTRY_PHONE_OPTIONS, getCountryPhoneRule, getFullPhoneNumber, getPhonePattern } from "../countryPhone";
import componentImage1 from "../assets/HeroImg/componentImg.jpeg";
import about1 from "../assets/HeroImg/about1.jpeg";
import about2 from "../assets/HeroImg/about2.jpeg";
import about3 from "../assets/HeroImg/about3.jpeg";

export default function Home() {
  const navigate = useNavigate();
  const ambientVideoRef = useRef(null);

  useEffect(() => {
    if (ambientVideoRef.current) {
      ambientVideoRef.current.play().catch((err) => {
        console.warn("Autoplay prevented on mount:", err);
      });
    }
  }, []);

  // Products published in Admin. The Home page intentionally shows only six.
  const [products, setProducts] = useState([]);

  // RFQ Form State
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    country: "India",
    productType: "",
    materialRequired: "",
    quantity: "",
    specifications: "",
    industry: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const data = await getProducts();
        const mapped = (Array.isArray(data) ? data : []).map((prod) => ({
          id: prod._id,
          title: prod.name,
          desc: prod.description || prod.tagline || "",
          img: prod.imageUrl || "",
        }));
        setProducts(mapped);
      } catch (err) {
        console.warn("Unable to load the published product catalog.", err);
        setProducts([]);
      }
    };
    fetchHomeProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      fullName: formData.fullName,
      companyName: formData.companyName,
      email: formData.email,
      phone: getFullPhoneNumber(formData.country, formData.phone),
      country: formData.country,
      productType: formData.productType,
      materialRequired: formData.materialRequired,
      quantity: formData.quantity,
      specifications: formData.specifications,
      industry: formData.industry,
    };

    try {
      await createInquiry(payload);
      const text =
        `*New RFQ Inquiry - Metalnova*\n` +
        `---------------------------------\n` +
        `*Name:* ${formData.fullName}\n` +
        `*Company:* ${formData.companyName || "N/A"}\n` +
        `*Email:* ${formData.email}\n` +
        `*Phone:* ${payload.phone}\n` +
        `*Country:* ${formData.country || "N/A"}\n` +
        `*Product:* ${formData.productType}\n` +
        `*Material:* ${formData.materialRequired || "N/A"}\n` +
        `*Quantity:* ${formData.quantity}\n` +
        `*Specs/Size:* ${formData.specifications || "N/A"}\n` +
        `*Industry:* ${formData.industry || "N/A"}\n` +
        `---------------------------------`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=919810422191&text=${encodedText}`;

      window.open(whatsappUrl, "_blank");

      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        country: "India",
        productType: "",
        materialRequired: "",
        quantity: "",
        specifications: "",
        industry: "",
      });
    } catch (error) {
      console.error(
        "Submission failed, falling back to direct WhatsApp redirect",
        error,
      );
      const text =
        `*New RFQ Inquiry (Direct Offline) - Metalnova*\n` +
        `---------------------------------\n` +
        `*Name:* ${formData.fullName}\n` +
        `*Company:* ${formData.companyName || "N/A"}\n` +
        `*Email:* ${formData.email}\n` +
        `*Phone:* ${getFullPhoneNumber(formData.country, formData.phone)}\n` +
        `*Country:* ${formData.country || "N/A"}\n` +
        `*Product:* ${formData.productType}\n` +
        `*Material:* ${formData.materialRequired || "N/A"}\n` +
        `*Quantity:* ${formData.quantity}\n` +
        `*Specs/Size:* ${formData.specifications || "N/A"}\n` +
        `*Industry:* ${formData.industry || "N/A"}\n` +
        `---------------------------------`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=919810422191&text=${encodedText}`;

      window.open(whatsappUrl, "_blank");

      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const phoneRule = getCountryPhoneRule(formData.country);

  return (
    <div
      id="home-page-custom"
      className="font-sans antialiased text-[#62666A] bg-white"
    >


      {/* ================= HERO SECTION (PREMIUM DARK SYSTEM) ================= */}
      <section
        id="hero-section"
        className="relative bg-gray-200 text-brand-copper pt-36 pb-24 overflow-hidden px-4 sm:px-6 lg:px-8"
      >
        {/* Subtle mesh background grid */}
        <div className="absolute"></div>
        <div className="absolute"></div>
        <div className="absolute"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-copper/30 bg-brand-copper/5">
              {/* <span className="w-1.5 h-1.5 rounded-full bg-brand-copper shadow-[0_0_8px_rgba(200,125,85,0.8)]"></span> */}
              <span className="text-[13.2px] font-bold uppercase tracking-[0.25em] text-brand-copper">
                Precision Electrical Contact Components
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.08] text-brand-copper">
              {/* Precision Engineering.<br /> */}
              {/* <span className="text-gradient-electric"> Electrification.</span> */}
            </h1>

            <p className="text-brand-copper text-[16px] sm:text-base max-w-xl leading-relaxed font-light">
              Engineering performance electrical contact solutions that power
              the industries of today and tomorrow. Built on microstructural
              integrity and cadmium-free metallurgy.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#rfq-section"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-gradient-to-r from-brand-electric-dark to-brand-electric hover:from-brand-electric hover:to-brand-electric-dark text-brand-copper text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all shadow-[0_4px_20px_rgba(0,102,255,0.25)] hover:shadow-[0_4px_25px_rgba(0,210,255,0.4)] cursor-pointer"
              >
                Request a Quote
                <span className="ml-1 text-[16px]">→</span>       
              </a>
              <button
                onClick={() => {
                  navigate("/contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-transparent border border-white/20 hover:border-brand-electric hover:text-brand-copper text-brand-copper text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer hover:bg-white/5"
              >
                Contact Us
                <span className="ml-1 text-[16px]">→</span>
              </button>
            </div>

            {/* Metrics Grid (Bordered segmented layout) */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-10 border-t border-brand-card-border/50 mt-10">
              {[
                { value: "30+", label: "Years of Excellence" },
                { value: "10+", label: "Countries Served" },
                { value: "100%", label: "Quality Assurance" },
              ].map((figure, index) => (
                <div key={`${figure.label}-${index}`} className="space-y-1">
                  <p className="text-3xl font-bold text-[#5c3321] tracking-tight">
                    {figure.value}
                  </p>
                  <p className="text-[10px] text-[#5c3321] font-bold uppercase tracking-wider">
                    {figure.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Floating Photo Column */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="absolute -inset-4 bg-brand-electric/5 rounded-3xl blur-3xl pointer-events-none"></div>
            <div className="relative w-full max-w-sm h-[320px] lg:h-[380px] rounded-2xl overflow-hidden border border-slate-700/30 shadow-2xl group animate-float">
              <img
                src={componentImage1}
                alt="Precision electrical components"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a12]/80 via-transparent to-transparent"></div>
              {/* Overlay Glass Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/5 text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-copper">
                  Microstructural Integrity
                </p>
                <p className="text-[11px] text-brand-copper mt-1 font-light leading-relaxed">
                  Electrical Contact Rivets and Assemblies Manufactured with OFHC Copper
                  and Cadmium free Silver alloy wires
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT METALNOVA (PREMIUM LIGHT SYSTEM) ================= */}
      <section
        id="about-section"
        className="py-28 bg-white text-brand-copper px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Text */}
          <div className="w-full lg:flex-[5] lg:min-w-0 space-y-6">
            <div className="space-y-2">
              {/* <p className="text-[16px] font-bold uppercase tracking-[0.2em] text-brand-copper">
                About Us
              </p> */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-copper tracking-tight leading-tight">
                Engineering Precision.
                <br />
                Delivering Performance.
              </h2>
            </div>

            <p className="text-brand-copper text-[16px] leading-relaxed font-light">
              Metalnova manufactures electrical contact components for
              automotive, electrical, electronics, and industrial applications.
              From standard parts to customer specific designs, every component
              is produced with a focus on dimensional accuracy, material
              integrity, and repeatable quality across every batch. We believe
              manufacturing excellence is measured by consistency delivering
              components that meet specifications, arrive on schedule, and
              perform as expected.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  navigate("/about");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 hover:border-brand-electric hover:bg-brand-electric/5 text-brand-copper hover:text-brand-copper text-[16px] font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer"
              >
                Know More
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Image Collage */}
          <div className="w-full lg:flex-[4.375] lg:min-w-0 flex flex-col sm:flex-row gap-5 items-stretch">
            {/* Large Image */}
            <div className="w-full sm:flex-[7] sm:min-w-0 h-[290px] lg:h-[380px] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white relative group flex items-center justify-center">
              <img
                src={about3}
                alt="Precision electrical contact components"
                loading="eager"
                className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Right Side Images */}
            {/* <div className="w-full sm:flex-[5] sm:min-w-0 h-[290px] lg:h-[380px] flex flex-col gap-5">
              <div className="flex-1 rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-white relative group flex items-center justify-center">
                <img
                  src={about2}
                  alt="Automated manufacturing"
                  loading="lazy"
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-white relative group flex items-center justify-center">
                <img
                  src={about3}
                  alt="Quality control"
                  loading="lazy"
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* ================= OUR PRODUCTS (PREMIUM DARK SYSTEM) ================= */}
      <section
        id="home-products-section"
        className="relative py-28 bg-[#060a12] text-brand-copper overflow-hidden px-4 sm:px-6 lg:px-8 border-y border-slate-900"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(200,125,85,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-4 mb-20">
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-copper">
            Our Products{" "}
          </h3>
          <p className="text-brand-copper text-[18px] max-w-xl mx-auto font-light leading-relaxed">
            Performance electrical contact solutions engineered with
            microstructural integrity and advanced metallurgy.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {products.slice(0, 6).map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                navigate(`/product/${cat.id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group bg-[#0f172a]/40 border border-slate-800/80 hover:border-brand-copper/30 hover:bg-[#0f172a]/80 rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer shadow-2xl flex flex-col justify-between"
            >
              {/* Framed Image Container */}
              <div className="p-4">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white flex items-center justify-center">
                  {cat.img && (
                    <img
                      src={cat.img}
                      alt={cat.title}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 pt-2 space-y-3 flex flex-col justify-between flex-1 text-left">
                <div className="space-y-2">
                  <h4 className="font-extrabold text-brand-copper text-[18px] tracking-wide group-hover:text-brand-copper transition-colors">
                    {cat.title}
                  </h4>
                  <p className="text-[16px] text-brand-copper font-light leading-relaxed line-clamp-3">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/40 flex items-center justify-between text-[13px] font-bold uppercase tracking-widest text-brand-copper transition-colors">
                  <span>View Specifications</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length > 6 && (
          <div className="text-center pt-12 relative z-10">
            <button
              onClick={() => {
                navigate("/products");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border border-white/20 hover:border-brand-electric hover:text-brand-copper text-brand-copper text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer hover:bg-white/5"
            >
              View Full Product Catalog
              <span className="ml-1.5 text-[16px]">→</span>
            </button>
          </div>
        )}
      </section>

      {/* ================= INDUSTRIES WE SERVE (DARK BLUE   TECH) ================= */}
      <section
        id="industries-section"
        className="py-28 bg-[#040810] text-brand-copper px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center mb-14 sm:mb-16">
          {/* <p className="text-[16px] font-bold uppercase tracking-[0.2em] text-brand-copper">Global Sectors</p> */}
          <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-copper tracking-tight">
            Industries We Serve
          </h3>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Electrical Switchgear",
              // desc: "Engineering   precision copper, brass, and aluminum components for next-generation switchgear systems and control panels. Our products guarantee optimum conductivity and uncompromised reliability in   voltage environments.",
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
            },
            {
              title: "Electric Vehicles (EV)",
              // desc: "Powering the future of e-mobility with advanced,   conductivity components for EV battery packs and powertrain control systems. Engineered for exceptional thermal stability and long-cycle performance.",
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ),
            },
            {
              title: "Automotive",
              // desc: "Manufacturing   strength, precision-engineered metal components and assemblies for passenger and commercial vehicles. Focused on structural integrity, durability, and strict industry compliance.",
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              ),
            },
            {
              title: "Aviation",
              // desc: "Delivering ultra-precision machined components and lightweight fabricated parts that comply with the stringent quality and safety benchmarks of the aerospace sector. Built for flawless performance under extreme stress.",
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              ),
            },
            {
              title: "Industrial Equipment",
              // desc: "Supplying robust,   end metal components for heavy-duty machinery and industrial automation. Specially engineered to withstand extreme mechanical stress, elevated temperatures, and continuous operations.",
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                </svg>
              ),
            },
            {
              title: "Renewable Energy",
              // desc: "Offering specialized precision components for solar and green energy infrastructure. Designed for maximum power transfer efficiency, superior corrosion resistance, and decades of outdoor reliability.",
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                  />
                </svg>
              ),
            },
          ].map((ind) => (
            <div
              key={ind.title}
              className="min-h-[138px] p-6 bg-gray-200 border border-gray-200 rounded-2xl flex items-center gap-5 text-left shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 shrink-0 rounded-full border border-brand-electric/20 bg-brand-electric/5 flex items-center justify-center text-brand-copper">
                {ind.icon}
              </div>
              <h4 className="font-bold text-brand-copper text-[17px] sm:text-[18px] leading-snug">
                {ind.title}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE METALNOVA (ANIMATED TIMELINE) ================= */}
      <section
        id="why-choose-us"
        className="relative py-28 bg-white text-brand-copper overflow-hidden px-4 sm:px-6 lg:px-8 border-t border-slate-100"
      >
        {/* Subtle decorative background glow shapes */}
        <div className="why-choose-glow absolute top-0 right-0 w-[400px] h-[400px] bg-brand-copper/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="why-choose-glow absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-electric/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-24">
            {/* <p className="text-[16px] font-bold uppercase tracking-[0.2em] text-brand-copper">Why Choose Us</p> */}
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-copper">
              Why Choose Metalnova
            </h3>
            {/* Divider */}
            <div className="flex items-center justify-center gap-3">
              <span className="w-12 h-[1px] bg-slate-200"></span>
              <span className="w-1.5 h-1.5 rotate-45 bg-brand-copper"></span>
              <span className="w-12 h-[1px] bg-slate-200"></span>
            </div>
            <p className="text-brand-copper text-[16px] max-w-xl mx-auto font-light leading-relaxed">
              From precise metallurgy to certified delivery, explore our core
              strengths mapped across our performance engineering timeline.
            </p>
          </div>

          {/* Timeline Center Area */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line with flowing animated gradient */}
            <div
              className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 rounded-full transform md:-translate-x-1/2 overflow-hidden pointer-events-none"
              style={{ backgroundColor: "#0177b5" }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: "#0177b5" }}
              ></div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-10 md:space-y-12">
              {[
                {
                  title: "Precision Manufacturing",
                  // subtitle: "Precision That Powers Performance",
                  desc: "Every electrical contact component is manufactured with tight dimensional control and repeatable production processes, ensuring consistent quality, reliable performance, and batch-to-batch accuracy.",
                  icon: (
                    <svg
                      className="w-5 h-5 text-brand-copper"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Metallurgical Expertise",
                  // subtitle: "Advanced Material Expertise",
                  desc: "Our expertise in working with precious metals and high-conductivity copper enables us to manufacture solid, bimetal, and trimetal electrical contact components that meet demanding electrical and mechanical requirements.",
                  icon: (
                    <svg
                      className="w-5 h-5 text-brand-copper"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Quality You Can Rely On",
                  // subtitle: "Uncompromising Quality Standards",
                  desc: "Operating under an ISO 9001:2015-certified quality management system, we manufacture CE- and RoHS-compliant products with rigorous inspection and testing throughout every stage of production.",
                  icon: (
                    <svg
                      className="w-5 h-5 text-brand-copper"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Sustainable Manufacturing",
                  // subtitle: "Sustainable & Future-Ready Solutions",
                  desc: "We support environmentally responsible manufacturing through the use of cadmium-free contact materials, efficient precious metal utilization, and responsible recovery and recycling practices without compromising product performance.",
                  icon: (
                    <svg
                      className="w-5 h-5 text-brand-copper"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline Center Bullet with Pulse Animation */}
                  <div className="absolute left-6 md:left-1/2 top-4 md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full border-2 border-[#0177b5] bg-white shadow-md flex items-center justify-center transition-transform duration-300 relative">
                      {/* Outer pulse wave */}
                      <span className="absolute inset-0 rounded-full bg-[#0177b5]/20 animate-ping opacity-75"></span>
                      <span className="w-3 h-3 rounded-full bg-[#0177b5] z-10"></span>
                    </span>
                  </div>

                  {/* Timeline Card */}
                  <div
                    className={`w-full md:w-[calc(50%-2.5rem)] pl-16 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-10" : "md:text-left md:pl-10"}`}
                  >
                    <div className="why-timeline-card group bg-[#f8fafc] border border-slate-100 hover:border-brand-copper/25 rounded-2xl p-6 shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] transition-all duration-300 relative overflow-hidden text-left">
                      <div className="why-timeline-card-heading flex gap-3 items-center mb-3">
                        <div
                          className={`w-8 h-8 rounded-lg ${i % 2 === 0 ? "bg-brand-copper/5 border border-brand-copper/20" : "bg-brand-electric/5 border border-brand-electric/20"} flex items-center justify-center`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-brand-copper uppercase tracking-widest">
                            {item.subtitle}
                          </span>
                          <h4 className="why-timeline-card-title font-extrabold text-brand-copper text-[16px] tracking-wide leading-none mt-1">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-[16px] text-brand-copper leading-relaxed font-light mt-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Spacer on the opposite side to maintain layout on desktop */}
                  <div className="hidden md:block w-[calc(50%-2.5rem)]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATIONS (DARK THEME WITH QUALITY VIBE) ================= */}
      <section
        id="certifications-section"
        className="relative py-28 bg-[#040810] text-brand-copper px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80')`,
            opacity: 0.35,
          }}
        ></div>
        <div className="absolute inset-0 bg-radial from-brand-electric/5 to-transparent blur-3xl"></div>

        <div className="max-w-7xl mx-auto text-center space-y-4 mb-20 relative z-10">
          {/* <p className="text-[16px] font-bold uppercase tracking-[0.2em] text-brand-copper">
            Certifications
          </p> */}
          <h3 className="text-3xl font-extrabold text-brand-copper tracking-tight">
            Our Certifications
          </h3>
          {/* Divider */}
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-slate-800"></span>
            <span className="w-1.5 h-1.5 rotate-45 bg-brand-copper"></span>
            <span className="w-12 h-[1px] bg-slate-800"></span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">
          {/* ISO 9001:2015 */}
          <div className="w-48 h-48 rounded-full border-2 border-brand-electric/20 hover:border-brand-electric bg-brand-copper flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(0,210,255,0.05)] hover:shadow-[0_0_30px_rgba(0,210,255,0.15)] transition-all duration-300">
            <svg
              className="w-7 h-7 text-gray-200 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <p className="text-[16px] font-bold text-gray-200 tracking-widest uppercase leading-none">
              ISO 9001:2015
            </p>
            <p className="text-[9px] text-gray-200 uppercase tracking-widest mt-1.5">
              Certified
            </p>
          </div>

          {/* CE */}
          <div className="w-48 h-48 rounded-full border-2 border-brand-electric/20 hover:border-brand-electric bg-brand-copper flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(0,210,255,0.05)] hover:shadow-[0_0_30px_rgba(0,210,255,0.15)] transition-all duration-300">
            <svg
              className="w-7 h-7 text-gray-200 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6M9 16h6M9 8h6"
              />
            </svg>
            <p className="text-[16px] font-bold text-gray-200 tracking-widest uppercase leading-none">
              CE
            </p>
            <p className="text-[9px] text-gray-200 uppercase tracking-widest mt-1.5">
              Certified
            </p>
          </div>

          {/* RoHS */}
          <div className="w-48 h-48 rounded-full border-2 border-brand-electric/20 hover:border-brand-electric bg-brand-copper flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(0,210,255,0.05)] hover:shadow-[0_0_30px_rgba(0,210,255,0.15)] transition-all duration-300">
            <svg
              className="w-7 h-7 text-gray-200 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-[16px] font-bold text-gray-200 tracking-widest uppercase leading-none">
              RoHS
            </p>
            <p className="text-[9px] text-gray-200 uppercase tracking-widest mt-1.5">
              Compliant
            </p>
          </div>
        </div>

        <div className="mt-14 text-center relative z-10">
          <button
            onClick={() => {
              navigate("/certifications");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-brand-copper to-brand-copper-dark hover:from-brand-copper-dark hover:to-brand-copper text-white text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all duration-300 shadow-[0_4px_20px_rgba(200,125,85,0.25)] hover:shadow-[0_4px_25px_rgba(200,125,85,0.4)] cursor-pointer"
          >
            View All Quality Standards
            <span className="ml-2 text-[16px]">→</span>
          </button>
        </div>
      </section>

      {/* ================= RFQ FORM & LET'S CONNECT (PREMIUM SPLIT THEME) ================= */}
      <section
        id="rfq-section"
        className="py-24  text-brand-copper px-4 sm:px-6 lg:px-8 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-100 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] bg-white">
          {/* Left Column - Premium Dark Corporate Panel */}
          <div className="lg:col-span-5 bg-gray-200 text-brand-copper p-8 md:p-12 space-y-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background glowing gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-electric/5 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-copper/5 blur-3xl pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-brand-copper uppercase tracking-[0.2em] bg-brand-copper/10 px-3 py-1 rounded-full w-fit block">
                  Connect With Us
                </span>
                <h3 className="text-3xl font-extrabold tracking-tight text-brand-copper pt-1">
                  Request a Quote
                </h3>
              </div>
              <p className="text-[16px] text-brand-copper leading-relaxed font-light">
                Fill out the form and our technical engineering team will get
                back to you with the best custom solution within 24 hours.
              </p>

              {/* Engineering Guarantees Checklist */}
              <div className="space-y-3.5 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-brand-copper">
                  Our Commitments
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#0177b5] text-[16px]">
                    ✓
                  </div>
                  <span className="text-[16px] font-semibold text-brand-copper">
                    Technical drawings review within 24 hours
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#0177b5] text-[16px]">
                    ✓
                  </div>
                  <span className="text-[16px] font-semibold text-brand-copper">
                    100% RoHS & CE compliance certified
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#0177b5] text-[16px]">
                    ✓
                  </div>
                  <span className="text-[16px] font-semibold text-brand-copper">
                    Precious metals closed-loop pricing structures
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Dialing Cards */}
            <div className="space-y-3 relative z-10 pt-8 border-t border-slate-800/60">
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-copper">
                Direct Sales Desks
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { phone: "+91 9810422191", label: "" },
                  { phone: "+91 9034108181", label: "" },
                  { phone: "+91 9999010534", label: "" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={`tel:${item.phone.replace(/\s+/g, "")}`}
                    className="p-3 bg-[#111827]/60 border border-slate-800 rounded-xl hover:border-brand-electric/30 hover:bg-[#111827] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-brand-electric/5 text-brand-copper flex items-center justify-center">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <span className="text-[16px] font-bold text-brand-copper">
                        {item.phone}
                      </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-brand-copper font-bold group-hover:text-brand-copper transition-colors">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Clean White Form Panel */}
          <div className="lg:col-span-7 p-8 md:p-12 bg-white">
            <div className="space-y-2 mb-8 text-left">
              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-copper tracking-tight">
                Let’s Understand Your Requirements
              </h3>
              <p className="text-[16px] text-brand-copper font-light leading-relaxed">
                Fill out the form below and share your detailed requirements.
                Our team will get back to you with the best solution tailored to
                your needs.
              </p>
            </div>
            {formSubmitted ? (
              <div data-theme-status="success" className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-electric/10 border border-brand-electric flex items-center justify-center mx-auto text-brand-copper text-2xl font-bold">
                  ✓
                </div>
                <h5 className="font-extrabold text-brand-copper text-xl tracking-tight">
                  RFQ Logged Successfully
                </h5>
                <p className="text-[16px] text-brand-copper max-w-xs mx-auto leading-relaxed font-light">
                  Thank you for your interest. We have received your
                  specifications and our team will get in touch with you
                  shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 bg-brand-electric text-brand-copper text-[16px] font-bold uppercase tracking-wider rounded-lg hover:bg-brand-electric-dark transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="fullName"
                      className="block text-[10px] font-bold uppercase tracking-wider text-brand-copper"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-[#f8fafc] border border-slate-200/80 focus:border-brand-electric focus:bg-white rounded-lg px-4 py-3 text-xs text-brand-copper focus:outline-none transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="companyName"
                      className="block text-[10px] font-bold uppercase tracking-wider text-brand-copper"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full bg-[#f8fafc] border border-slate-200/80 focus:border-brand-electric focus:bg-white rounded-lg px-4 py-3 text-xs text-brand-copper focus:outline-none transition-colors"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="email"
                      className="block text-[10px] font-bold uppercase tracking-wider text-brand-copper"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#f8fafc] border border-slate-200/80 focus:border-brand-electric focus:bg-white rounded-lg px-4 py-3 text-xs text-brand-copper focus:outline-none transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="phone"
                      className="block text-[10px] font-bold uppercase tracking-wider text-brand-copper"
                    >
                      Phone Number *
                    </label>
                    <div className="flex">
                      <span className="flex items-center px-3 bg-[#f8fafc] border border-r-0 border-slate-200/80 rounded-l-lg text-xs text-brand-copper">
                        {phoneRule.dialCode}
                      </span>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        inputMode="numeric"
                        pattern={getPhonePattern(phoneRule)}
                        minLength={phoneRule.minLength}
                        maxLength={phoneRule.maxLength}
                        title={`Enter ${phoneRule.minLength === phoneRule.maxLength ? phoneRule.minLength : `${phoneRule.minLength} to ${phoneRule.maxLength}`} digits for ${formData.country}.`}
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value.replace(/\D/g, "").slice(0, phoneRule.maxLength),
                        }))}
                        className="w-full bg-[#f8fafc] border border-slate-200/80 focus:border-brand-electric focus:bg-white rounded-r-lg px-4 py-3 text-xs text-brand-copper focus:outline-none transition-colors"
                        placeholder={`${phoneRule.minLength === phoneRule.maxLength ? phoneRule.minLength : `${phoneRule.minLength}-${phoneRule.maxLength}`} digits`}
                      />
                    </div>
                  </div>

                  {/* Country/Location */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="country"
                      className="block text-[10px] font-bold uppercase tracking-wider text-brand-copper"
                    >
                      Country / Location
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value, phone: "" }))}
                      className="w-full bg-[#f8fafc] border border-slate-200/80 focus:border-brand-electric focus:bg-white rounded-lg px-4 py-3 text-xs text-brand-copper focus:outline-none transition-colors"
                    >
                      {COUNTRY_PHONE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} ({option.dialCode})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Product Type */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="productType"
                      className="block text-[10px] font-bold uppercase tracking-wider text-brand-copper"
                    >
                      Product Type *
                    </label>
                    <select
                      id="productType"
                      name="productType"
                      required
                      value={formData.productType}
                      onChange={handleInputChange}
                      className="w-full bg-[#f8fafc] border border-slate-200/80 focus:border-brand-electric focus:bg-white rounded-lg px-4 py-3 text-xs text-brand-copper focus:outline-none transition-colors"
                    >
                      <option value="">Select Product Type</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.title}>
                          {product.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Material Required */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="materialRequired"
                      className="block text-[10px] font-bold uppercase tracking-wider text-brand-copper"
                    >
                      Material Required
                    </label>
                    <select
                      id="materialRequired"
                      name="materialRequired"
                      value={formData.materialRequired}
                      onChange={handleInputChange}
                      className="w-full bg-[#f8fafc] border border-slate-200/80 focus:border-brand-electric focus:bg-white rounded-lg px-4 py-3 text-xs text-brand-copper focus:outline-none transition-colors"
                    >
                      <option value="">Select Material Option</option>
                      <option value="silver-alloy">Silver Alloy</option>
                      <option value="copper">Copper</option>
                      <option value="brass">Brass</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  {/* Quantity Required */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="quantity"
                      className="block text-[10px] font-bold uppercase tracking-wider text-brand-copper"
                    >
                      Quantity Required *
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      required
                      min="1"
                      step="1"
                      inputMode="numeric"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full bg-[#f8fafc] border border-slate-200/80 focus:border-brand-electric focus:bg-white rounded-lg px-4 py-3 text-xs text-brand-copper focus:outline-none transition-colors"
                      placeholder="e.g. 50000"
                    />
                  </div>
                </div>

                {/* Size / Specs */}
                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="specifications"
                    className="block text-[10px] font-bold uppercase tracking-wider text-brand-copper"
                  >
                    Size / Specifications
                  </label>
                  <input
                    type="text"
                    id="specifications"
                    name="specifications"
                    value={formData.specifications}
                    onChange={handleInputChange}
                    className="w-full bg-[#f8fafc] border border-slate-200/80 focus:border-brand-electric focus:bg-white rounded-lg px-4 py-3 text-xs text-brand-copper focus:outline-none transition-colors"
                    placeholder="Enter head/shank dimensions or drawing reference codes"
                  />
                </div>

                {/* Application / Industry */}
                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="industry"
                    className="block text-[10px] font-bold uppercase tracking-wider text-brand-copper"
                  >
                    Application / Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full bg-[#f8fafc] border border-slate-200/80 focus:border-brand-electric focus:bg-white rounded-lg px-4 py-3 text-xs text-brand-copper focus:outline-none transition-colors"
                  >
                    <option value="">Select Industry</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Switchgear">Switchgear</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Aviation">Aviation / Aerospace</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    id="submit-enquiry-btn"
                    disabled={isSubmitting}
                    className="px-6 py-3.5 bg-[#1e6091] hover:bg-[#1a5276] text-brand-copper text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer flex-1"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                    <span>→</span>
                  </button>

                  <button
                    type="submit"
                    id="request-quote-btn"
                    disabled={isSubmitting}
                    className="px-6 py-3.5 bg-transparent border border-[#1e6091] hover:bg-[#1e6091]/5 text-brand-copper text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer flex-1"
                  >
                    Request a Quote
                    <span>→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ================= OUR GLOBAL PRESENCE ================= */}
      <section
        id="locations-section"
        className="py-28 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100"
      >
        <div className="max-w-7xl mx-auto text-center space-y-4 mb-24">
          {/* <p className="text-[16px] font-bold uppercase tracking-[0.2em] text-brand-copper">Our Presence</p> */}
          <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-copper tracking-tight">
            Our Presence
          </h3>
          {/* Divider */}
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-slate-200"></span>
            <span className="w-1.5 h-1.5 rotate-45 bg-brand-copper"></span>
            <span className="w-12 h-[1px] bg-slate-200"></span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              // label: "PRIMARY PLANT",
              title: "Karnal (Head Office)",
              desc: "Plot No 447, Sector-3, HSIIDC Industrial Area, Karnal-132001, Haryana. Advanced multi-station   speed cold heading lines.",
              action: "Call Plant Support",
              href: "tel:+919810422191",
            },
            {
              // label: "SALES LIAISON",
              title: "Delhi Office (Sales Office)",
              desc: "METALNOVA, 17/164, First Floor, Subhash Nagar, New Delhi-110027. Regional operations, sales, partner relations, and logistics.",
              action: "Connect with Liaison",
              href: "tel:+919034108181",
            },
            {
              // label: "INTERNATIONAL",
              title: "France Office (International)",
              desc: "Managing international partner networks, technical specification agreements, and EU automotive compliance standards.",
              action: "Email EU Desk",
              href: "mailto:france@metalnova.in",
            },
          ].map((location) => (
            <div
              key={location.title}
              className="p-8 bg-[#f8fafc] border border-brand-copper/20 rounded-2xl shadow-sm hover:border-brand-copper/50 transition-all duration-300 text-left space-y-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brand-copper uppercase tracking-wider">
                  {location.label}
                </span>
                <div className="flex items-center gap-2.5">
                  <svg
                    className="w-[22px] h-[22px] shrink-0 text-[#0177b5]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 21s7-5.1 7-12a7 7 0 10-14 0c0 6.9 7 12 7 12z"
                    />
                    <circle cx="12" cy="9" r="2.5" strokeWidth="2" />
                  </svg>
                  <h4 className="font-extrabold text-brand-copper text-lg sm:text-xl tracking-tight">
                    {location.title}
                  </h4>
                </div>
              </div>
              <p className="text-[16px] text-brand-copper leading-relaxed font-light">
                {location.desc}
              </p>
              <a
                href={location.href}
                className="inline-flex items-center gap-1.5 text-[16px] font-bold text-brand-copper hover:text-brand-copper-dark transition-colors"
              >
                {location.action}
                <span className="text-[16px]">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
