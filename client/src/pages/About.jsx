import React from "react";

export default function About() {
  return (
    <div
      id="about-page"
      className="font-sans antialiased text-brand-copper min-h-screen bg-white "
    >
      {/* ================= HEADER INTRO (PREMIUM LIGHT SYSTEM) ================= */}
      <section className="relative pt-36 pb-24 overflow-hidden px-4 sm:px-6 lg:px-8 border-b border-brand-copper/30">
        {/* Subtle mesh background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(0,210,255,0.06),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(200,125,85,0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(140,75,43,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(140,75,43,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-copper/30 bg-brand-copper/5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-copper shadow-[0_0_8px_rgba(200,125,85,0.8)]"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-copper-dark">
                Who We Are
              </span>
            </div> */}

            <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold tracking-tight leading-[1.08] text-brand-copper">
              About Us
              <br />
              {/* <span className="text-gradient-electric">Metalnova</span> */}
            </h1>

            <div className="space-y-6 text-brand-copper text-[16px] leading-relaxed font-light">
              {/* <p>
                Metalnova stands at the absolute forefront of precision engineering, manufacturing world-class electrical contact components for global electronic, electrical, and industrial applications. Anchored by a legacy of relentless innovation and uncompromising technical standards, we seamlessly integrate state-of-the-art manufacturing methodologies with profound material science expertise to power critical infrastructure worldwide. Our advanced capabilities empower us to architect, test, and deliver highly scalable, fail-safe components that meet the rigorous compliance standards of modern global industries—including heavy-duty power distribution grids, complex switchgear systems, next-generation automotive architecture, and micro-electronics.
              </p>



              <p>
                Operating under the conviction that operational excellence begins at the microscopic level, Metalnova synchronizes high-grade raw materials, advanced metallurgical bonding techniques, and precision automated manufacturing to deliver components with exceptional electrical efficiency and profound mechanical strength. Whether producing solid rivets, bimetal/Bimetal/Trimetal contact rivets, bespoke contact tips, specialized assemblies, or high-purity clad strips, every component is executed with meticulous tolerances. By fusing cost-optimized production processes with premium metallurgy, we engineer solutions that strike the ultimate balance between high-end performance, structural reliability, and commercial value.
              </p> */}

              <p>
                Metalnova's journey began in 2010 under the name Shree Jagdamba
                Electrical Alloy. Starting with modest resources, we built our
                business on principles that continue to guide us today—honesty,
                transparency, and dependable delivery. By consistently honoring
                our commitments, we earned the trust of customers who value
                long-term partnerships. As our capabilities expanded and our
                vision evolved, we introduced Metalnova to reflect the company
                we have become. Today, we manufacture electrical contact
                components for automotive, electrical, electronic, and
                industrial applications, including:
              </p>

              <ul className="list-disc list-outside space-y-2 pl-6 text-left marker:text-[var(--site-accent)] marker:text-lg">
                <li className="pl-1">Solid, bimetal, and trimetal rivets</li>
                <li className="pl-1">Contact tips and assemblies</li>
                <li className="pl-1">Clad strips and engineered wires</li>
              </ul>

              <p>
                Operating under an ISO 9001-certified quality management
                system, we produce CE- and RoHS-compliant components that meet
                exact customer specifications and international standards. In
                electrical contact manufacturing, consistency is not an
                advantage—it is a requirement. Every component is produced with
                strict control over materials, dimensions, and processes to
                ensure repeatable performance. Through disciplined
                manufacturing, predictable lead times, competitive pricing, and
                transparent practices, we continue to build lasting
                relationships with customers across domestic and international
                markets.
              </p>
            </div>
          </div>

          {/* Right Focus Card */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="absolute -inset-4  rounded-3xl blur-3xl pointer-events-none"></div>
            <div className="relative w-full max-w-sm p-8 border border-brand-copper/30 backdrop-blur-md hover:border-brand-copper/60 rounded-3xl shadow-lg transition-all duration-300 text-left space-y-6">
              <div>
                {/* <span className="text-[10px] font-bold text-brand-copper uppercase tracking-wider bg-brand-copper/10 px-3 py-1 rounded-full">
                  Our Products (core segment )
                </span> */}
                <h4 className="text-2xl font-bold text-brand-copper mt-3">
                  Our Products{" "}
                </h4>
              </div>

              <ul className="space-y-4 text-[18px] font-normal text-brand-copper">
                <li className="flex items-center gap-3 border-b border-brand-copper/20 pb-3">
                  Solid Electrical Contact Rivets
                </li>
                <li className="flex items-center gap-3 border-b border-brand-copper/20 pb-3">
                  Bimetal & Trimetal Electrical Contact Rivets
                </li>
                <li className="flex items-center gap-3 border-b  pb-3">
                  Stamped Contact Assemblies
                </li>
                <li className="flex items-center gap-3 border-b border-brand-copper/20 pb-3">
                  Silver Alloys & Wires
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VISION & MISSION (PREMIUM LIGHT SYSTEM) ================= */}
      <section className="py-24 bg-[#FEFEFD] text-brand-copper px-4 sm:px-6 lg:px-8 border-b border-brand-copper/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="p-8 md:p-12 bg-gray-200 border border-brand-copper/20 rounded-3xl space-y-6 relative group hover:border-brand-copper/50 transition-all duration-300 text-left">
            <div className="w-12 h-12 rounded-xl bg-brand-copper/10 border border-brand-copper/30 flex items-center justify-center text-brand-copper text-xl">
              👁
            </div>
            <h3 className="text-xl font-extrabold text-brand-copper tracking-tight">
              OUR VISION
            </h3>
            <p className="text-[16px] sm:text-[18px] text-brand-copper leading-relaxed font-light">
              To become a preferred global partner in electrical contact manufacturing by delivering precision-engineered solutions, investing in advanced technology, and building lasting relationships through quality, integrity, and dependable service.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 md:p-12 bg-gray-200 border border-brand-copper/20 rounded-3xl space-y-6 relative group hover:border-brand-copper/50 transition-all duration-300 text-left">
            <div className="w-12 h-12 rounded-xl bg-brand-copper/10 border border-brand-copper/30 flex items-center justify-center text-brand-copper text-xl">
              🎯
            </div>
            <h3 className="text-xl font-extrabold text-brand-copper tracking-tight">
              OUR MISSION
            </h3>
            <p className="text-[16px] sm:text-[18px] text-brand-copper leading-relaxed font-light">
              To deliver precision-engineered, cadmium-free electrical contact components that combine high conductivity, thermal stability, and long service life. We achieve this through disciplined manufacturing, continuous process improvement, and responsible precious metal recovery, enabling our customers to build reliable and sustainable electrical systems.
            </p>
          </div>
        </div>
      </section>

      {/* ================= MANUFACTURING INFRASTRUCTURE (PREMIUM LIGHT SYSTEM) ================= */}
      <section className="relative py-28 overflow-hidden px-4 sm:px-6 lg:px-8 border-y border-brand-copper/30">
        <div className="absolute inset-0 bg-gray-200"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-16">
          {/* Header */}
          <div className="text-left space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-copper/30 bg-brand-copper/5">
              {/* <span className="w-1.5 h-1.5 rounded-full bg-brand-copper shadow-[0_0_8px_rgba(200,125,85,0.8)]"></span> */}
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-copper-dark">
                Our Infrastructure
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-copper">
              Manufacturing Capabilities
            </h3>
            <p className="text-brand-copper text-[16px] font-light max-w-xl">
             At Metalnova, our manufacturing infrastructure combines precision machinery with controlled production processes to produce electrical contact components that meet demanding performance and quality requirements.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-[#FEFEFD]/90 border border-brand-copper/30 hover:border-brand-copper/60 hover:bg-white rounded-3xl transition-all duration-300 shadow-md text-left space-y-4">
              <h5 className="font-extrabold text-brand-copper text-base tracking-wide group-hover:text-brand-copper transition-colors">
                Advanced Cold Heading
              </h5>
              <p className="text-[16px] text-brand-copper leading-relaxed font-light">
               High-speed cold-heading machines produce rivets with excellent dimensional accuracy, repeatability, and surface finish, ensuring consistent quality across production batches.
              </p>
            </div>

            <div className="group p-8 bg-[#FEFEFD]/90 border border-brand-copper/30 hover:border-brand-copper/60 hover:bg-white rounded-3xl transition-all duration-300 shadow-md text-left space-y-4">
              <h5 className="font-extrabold text-brand-copper text-base tracking-wide group-hover:text-brand-copper transition-colors">
                Precision Cladding & Bonding
              </h5>
              <p className="text-[16px] text-brand-copper leading-relaxed font-light">
               Advanced pressure-bonding technology securely joins silver contact layers with high-conductivity copper backings, creating durable, void-free bonds that deliver reliable electrical and mechanical performance.
              </p>
            </div>

            <div className="group p-8 bg-[#FEFEFD]/90 border border-brand-copper/30 hover:border-brand-copper/60 hover:bg-white rounded-3xl transition-all duration-300 shadow-md text-left space-y-4">
              <h5 className="font-extrabold text-brand-copper text-base tracking-wide group-hover:text-brand-copper transition-colors">
                Wire Drawing & Calibration
              </h5>
              <p className="text-[16px] text-brand-copper leading-relaxed font-light">
               Precision wire drawing and calibration processes produce silver alloy, copper, and composite wires to tight dimensional tolerances, providing consistent material quality for downstream manufacturing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUALITY COMMITMENT (PREMIUM LIGHT SYSTEM) ================= */}
      <section className="py-24 bg-[#FEFEFD] text-brand-copper px-4 sm:px-6 lg:px-8 border-b border-brand-copper/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <p className="text-[16px] font-bold uppercase tracking-[0.2em] text-brand-copper">
              Quality Assurance 
            </p>
            <h4 className="text-3xl sm:text-4xl font-extrabold text-brand-copper tracking-tight">
              Our Commitment to Quality
            </h4>
            <p className="text-brand-copper text-[16px] leading-relaxed font-light">
             Quality is built into every stage of our manufacturing process—not simply verified at the end. Operating under an ISO 9001-certified quality management system, we inspect every batch of precious metal inputs and conduct rigorous testing throughout production to ensure our electrical contact components meet demanding mechanical, electrical, and dimensional requirements. Our products are also CE- and RoHS-compliant, reflecting our commitment to internationally recognized quality and regulatory standards.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white/90 border border-brand-copper/30 px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="text-[16px] font-semibold text-brand-copper-dark">
                  ISO 9001 Certified 
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 border border-brand-copper/30 px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="text-[16px] font-semibold text-brand-copper-dark">
                  CE Compliant
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 border border-brand-copper/30 px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="text-[16px] font-semibold text-brand-copper-dark">
                  RoHS Compliant
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 border border-brand-copper/30 px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="text-[16px] font-semibold text-brand-copper-dark">
                  Cadmium-Free Manufacturing
                </span>
              </div>
            </div>
          </div>

          {/* Right Process Steps */}
          <div className="lg:col-span-6 space-y-4">
            {[
              {
                title: "Microstructural Inspection",
                desc: "Microscopic examination verifies the integrity of silver-to-copper bond interfaces, ensuring consistent metallurgical bonding and structural reliability.",
              },
              {
                title: "Hardness Testing",
                desc: "Hardness profiling confirms the required mechanical properties of rivet heads and shanks, supporting reliable forming and long-term performance in electrical assemblies.",
              },
              {
                title: "Electrical Conductivity Verification",
                desc: "Electrical conductivity is verified for silver alloys, including AgNi10 and AgSnO₂, to ensure compliance with specified IACS conductivity values and customer requirements.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 bg-gray-200 border border-brand-copper/20 rounded-2xl flex items-start gap-4 shadow-sm text-left"
              >
                <span className="text-brand-copper font-extrabold text-[16px] mt-0.5">
                  0{i + 1}
                </span>
                <div className="space-y-1">
                  <p className="text-[16px] font-bold text-brand-copper uppercase tracking-wider">
                    {item.title}
                  </p>
                  <p className="text-[16px] text-brand-copper leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE METALNOVA (PREMIUM LIGHT SYSTEM) ================= */}
     
    </div>
  );
}
