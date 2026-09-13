import React, { useState } from "react";
import isoCert from "../assets/METALNOVA QMS ISO 9001 Certificate.pdf";
import ceCert from "../assets/METALNOVA - CE Certificate.pdf";
import rohsCert from "../assets/METALNOVA - RoHS Certificate.pdf";

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  React.useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  const certificationsList = [
    {
      id: "iso-9001",
      title: "ISO 9001:2015 Certification",
      subtitle: "Quality Management Systems (QMS)",
      validity: "Certified and regularly audited",
      scope:
        "Design, development, and high-speed cold-heading manufacturing of solid, bimetallic, and trimetallic contact rivets, contact tips, and assemblies.",
      description:
        "ISO 9001:2015 ensures that our operations follow rigorous processes to maintain zero defect manufacturing. From raw precious metal verification to final shear tests, every step is fully documented and traceable.",
      summary: "ISO 9001",
      pdf: isoCert,
    },
    {
      id: "ce-marking",
      title: "CE Certification",
      subtitle: "Conformité Européenne",
      validity: "Full Compliance",
      scope:
        "Standardization and safety alignment for electrical contact parts used in distribution systems, switchgears, and control panels.",
      description:
        "CE conformity indicates that Metalnova products meet the health, safety, and environmental protection standards of the European Economic Area. This allows our products to be seamlessly integrated into EU electrotechnical networks.",
      summary: "CE Compliance",
      pdf: ceCert,
    },
    {
      id: "rohs-compliance",
      title: "RoHS Compliance",
      subtitle: "Restriction of Hazardous Substances",
      validity: "100% Cadmium-Free Alloys",
      scope:
        "Restriction of Lead (Pb), Cadmium (Cd), Mercury (Hg), and other hazardous substances in electronic products.",
      description:
        "Environmental stewardship is at our core. We produce eco-friendly contact rivet alloys (like Silver-Tin-Oxide AgSnO₂ and Silver-Nickel AgNi), eliminating toxic Cadmium while keeping outstanding electrical efficiency.",
      summary: "RoHS / Cd-Free",
      pdf: rohsCert,
    },
  ];

  return (
    <div
      id="certifications-page"
      className="font-sans antialiased text-brand-copper bg-[#080c14]"
    >
      {/* ================= HEADER & QUALITY POLICY (PREMIUM DARK SYSTEM) ================= */}
      <section className="relative bg-[#060a12] text-brand-copper pt-36 pb-24 overflow-hidden px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        {/* Subtle mesh background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(0,210,255,0.09),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(200,125,85,0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-electric/30 bg-brand-electric/5">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-copper">
                Global Standards
              </span>
            </div> */}
            <h2 className="cert-theme-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-copper tracking-tight">
              Quality Commitments
            </h2>
            <p className="text-brand-copper text-[16px] max-w-3xl mx-auto font-light leading-relaxed">
             At Metalnova, quality is not an inspection carried out at the end of production—it is a discipline maintained throughout every stage of manufacturing. From raw material verification to final inspection, every process is carried out under controlled conditions to ensure our electrical contact components consistently meet customer specifications and international quality requirements.
Operating under an ISO 9001-certified Quality Management System, we manufacture CE- and RoHS-compliant electrical contact components for customers who depend on reliable, repeatable performance in demanding electrical applications.
            </p>
          </div>

          {/* Quality Policy Card */}
          <div className="cert-theme-accent-border bg-[#0f172a]/40 border border-slate-800/80 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-md hover:border-brand-copper/30 transition-colors duration-300 text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-copper/5 blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              {/* <h3 className="cert-theme-accent text-[16px] font-bold uppercase tracking-widest text-brand-copper flex items-center gap-2">
                <span className="cert-theme-accent-bg w-6 h-[1px] bg-brand-copper"></span>
                Engineering Excellence
              </h3> */}
              {/* <h4 className="cert-theme-accent text-xl sm:text-2xl font-extrabold text-brand-copper">
                Our Approach to Quality
              </h4>
              <p className="text-[16px] sm:text-[18px] text-brand-copper leading-relaxed font-light">
                Quality begins with the materials we select and continues through every manufacturing and inspection stage. By combining controlled production processes with continuous monitoring, we ensure every batch is manufactured with the same attention to precision, consistency, and reliability.
              </p> */}

              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {[
                  {
                    title: "Our Approach to Quality",
                    description:
                      "Quality begins with the materials we select and continues through every manufacturing and inspection stage. Controlled production and continuous monitoring ensure precision, consistency, and reliability in every batch.",
                  },
                  {
                    title: "Raw Material Verification",
                    description:
                      "Every batch of precious and base metals is verified against specified material grades before production. Full material traceability is maintained throughout manufacturing.",
                  },
                  {
                    title: "In-Process Quality Control",
                    description:
                      "Dimensional inspection, hardness verification, conductivity testing, and process monitoring keep every manufacturing stage within established quality parameters.",
                  },
                  {
                    title: "Mechanical & Metallurgical Testing",
                    description:
                      "Critical products undergo mechanical and metallurgical testing to verify bond integrity, structural performance, and long-term reliability under demanding conditions.",
                  },
                  {
                    title: "Sustainable Manufacturing",
                    description:
                      "Cadmium-free materials, efficient precious-metal use, and responsible recovery and recycling practices minimize waste while preserving long-term product value.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--site-badge)] text-[var(--site-icon)] text-lg font-bold">
                      ✓
                    </span>
                    <div className="space-y-2">
                      <h4 className="text-[17px] font-extrabold leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[15px] sm:text-[16px] font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quality Standards Grid */}
          <div className="mt-16">
            <div className="mb-10 text-center">
              <h3 className="quality-standards-heading inline-flex px-6 py-2.5 text-2xl sm:text-3xl font-extrabold tracking-tight">
                Our Quality Standards
              </h3>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                "ISO 9001-Certified Quality Management System",
                "CE-Compliant Products",
                "RoHS-Compliant Manufacturing",
                "Cadmium-Free Contact Materials",
                "Batch Traceability",
                "Material Verification",
                "In-Process Inspection",
                "Mechanical & Electrical Performance Testing",
                "Continuous Process Improvement",
              ].map((standard) => (
                <li
                  key={standard}
                  className="quality-standards-card group min-h-[120px] flex items-center gap-4 rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="quality-standards-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12.75 11.25 15 15 9.75M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"
                      />
                    </svg>
                  </span>
                  <h4 className="quality-standards-title text-[16px] font-extrabold leading-snug">
                    {standard}
                  </h4>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATES GALLERY (PREMIUM LIGHT SYSTEM) ================= */}
      <section className="py-24 bg-white text-brand-copper px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-2 text-left">
            {/* <p className="text-[16px] font-bold uppercase tracking-[0.2em] text-brand-copper">Compliance Portfolio</p> */}
            <h4 className="text-3xl font-extrabold text-brand-copper tracking-tight">
              Our Commitment
            </h4>
            <p className="text-brand-copper text-[16px] font-light">
              Every electrical contact component we manufacture represents the standards on which Metalnova was founded—precision, consistency, integrity, and accountability. We believe lasting customer relationships are built not through promises, but through delivering products that perform consistently, shipment after shipment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {certificationsList.map((cert) => (
              <button
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="certificate-card relative block w-full max-w-[340px] sm:max-w-sm mx-auto aspect-[1/1.414] border rounded-2xl shadow-md overflow-hidden transition-all duration-300 sm:hover:translate-y-[-6px] hover:shadow-2xl group cursor-pointer text-left focus:outline-none"
              >
                {/* Embed PDF page 1 as card preview */}
                <iframe
                  src={`${cert.pdf}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=Fit&zoom=page-fit`}
                  className="absolute inset-0 w-full h-full border-0 pointer-events-none select-none"
                  scrolling="no"
                  title={cert.title}
                />

                {/* Dark Hover Overlay & Center Banner Button */}
                <div className="certificate-card-overlay absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="certificate-card-action border font-bold text-[12px] uppercase tracking-widest px-6 py-3 rounded-xl shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="certificate-card-action-text">
                      Click To View
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PDF VIEWER MODAL ================= */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-md px-2 pb-2 pt-14 sm:p-6 transition-all duration-300 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Clickable backdrop overlay to close */}
          <div
            className="absolute inset-0 cursor-default"
            onClick={() => setSelectedCert(null)}
          />

          {/* Close button in top-right of screen */}
          <button
            onClick={() => setSelectedCert(null)}
            className="absolute top-1 right-2 sm:top-6 sm:right-6 transition-colors text-3xl sm:text-4xl font-light cursor-pointer z-50 p-2"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Modal Container Card (Immersive PDF Viewer Only) */}
          <div className="relative w-full max-w-[calc(100vw-1rem)] aspect-[1.414/1] h-auto sm:max-w-md sm:aspect-[1/1.414] sm:max-h-[70vh] bg-white rounded-md sm:rounded-lg shadow-2xl overflow-hidden z-10 transform scale-100 transition-transform duration-300">
            <iframe
              src={`${selectedCert.pdf}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=Fit&zoom=page-fit`}
              className="absolute inset-0 w-full h-full border-none overflow-hidden"
              scrolling="no"
              title={selectedCert.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}
