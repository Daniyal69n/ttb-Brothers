import { ServiceCategory } from "@/types";

export const servicesIntroduction = {
  badge: "Engineering, Construction & Facility Solutions",
  title: "Comprehensive Corporate Services",
  subtitle:
    "As a one-source solution provider, T & T Brothers (TTB) brings together registered professional engineers, experienced project executors, and specialized technical teams to deliver end-to-end turnkey construction, oil & gas forecourts, and electro-mechanical maintenance across Pakistan.",
};

export const corporateServices: (ServiceCategory & { summary: string; description: string })[] = [
  {
    id: "construction-civil-works",
    letter: "A",
    title: "Construction and Civil Works",
    summary:
      "Turnkey commercial and private building construction, specialized filling station civil works, and routine structural maintenance.",
    description:
      "TTB provides comprehensive civil construction management for commercial and private projects across Pakistan. From ground-up building erection and foundation engineering to complete petrol station forecourt civil construction, our team delivers high structural integrity, strict HSSE adherence, and long-lasting durability.",
    shortDescription:
      "Commercial construction, filling station forecourts, and civil preventive and reactive maintenance.",
    fullDescription:
      "From site excavation to structural completion, our civil engineering teams execute turn-key construction programs with strict adherence to building codes, environmental safeguards, and client timelines.",
    capabilities: [
      "Commercial and private construction management",
      "Building construction & structural development",
      "Filling station forecourt & canopy civil construction",
      "Civil preventive maintenance programs",
      "Civil reactive emergency maintenance & structural repairs",
    ],
    iconName: "Building2",
    imagePath: "/images/projects/defense-road-filling-station.jpg",
  },
  {
    id: "architecture-interior-design",
    letter: "B",
    title: "Architecture and Interior Design",
    summary:
      "Bespoke architectural planning, filling station master design, modern retail interior fit-outs, and professional finishing.",
    description:
      "Our in-house design and architectural specialists craft innovative, functional spaces that meet the brand identity standards of international oil marketing companies and commercial enterprises. We deliver complete architectural blueprints, convenience store interiors, and premium painting services.",
    shortDescription:
      "Architectural planning, petrol station master layout, retail store fit-outs, and finishing works.",
    fullDescription:
      "Integrating aesthetic appeal with rigorous functionality, our interior and architectural wing designs high-traffic convenience shops, corporate offices, and service centers.",
    capabilities: [
      "Architectural planning and structural detailing",
      "Building and filling station master design",
      "Retail convenience store interior design (e.g., Total 2020 Shop format)",
      "Turnkey interior fit-outs, joinery, and ceiling works",
      "High-grade industrial and commercial painting services",
    ],
    iconName: "Palette",
    imagePath: "/images/projects/total-quartz-retail-interior.jpg",
  },
  {
    id: "oil-gas-filling-stations",
    letter: "C",
    title: "Oil and Gas / Filling Station Solutions",
    summary:
      "Turnkey oil & gas installation, forecourt equipment assembly, dispenser supply, and automated storage record-keeping systems.",
    description:
      "TTB holds extensive specialized expertise in the petroleum downstream retail sector. We manage the assembly and commissioning of technological equipment for retail outlets, underground fuel storage tanks, dispenser installations, and digital inventory record-keeping systems for Shell Pakistan, Total Parco, and PSO.",
    shortDescription:
      "Petroleum equipment assembly, fuel dispensers, oil-water separators, and automated inventory systems.",
    fullDescription:
      "Comprehensive technological commissioning for modern filling stations, including pipeline distribution, environmental containment, and fuel management automation.",
    capabilities: [
      "Oil and gas forecourt installation and commissioning",
      "Filling station construction, canopy installation, and maintenance",
      "Assembly of technological equipment for retail outlet stations",
      "Fuel dispenser supplies, calibration, and commissioning",
      "Underground petroleum distribution & containment piping systems",
      "Petroleum storage record-keeping systems for tanks and forecourt shops",
      "Petroleum digital inventory tracking systems for filling stations",
      "Oil-water separator (OWS) fabrication and multi-site installation",
    ],
    iconName: "Fuel",
    imagePath: "/images/projects/total-wash-car-wash.jpg",
  },
  {
    id: "electrical-mechanical-services",
    letter: "D",
    title: "Electrical and Mechanical Services",
    summary:
      "Industrial electrical rehabilitation, mechanical plant maintenance, re-lamping, high-efficiency illumination, and emergency response.",
    description:
      "Our electro-mechanical engineers deliver comprehensive preventive and reactive support for demanding industrial facilities. We perform electrical rehabilitation, switchgear maintenance, automated car wash mechanical servicing, pump overhauls, and site-wide illumination upgrades.",
    shortDescription:
      "Preventive and reactive electro-mechanical servicing, industrial wiring, and site illumination.",
    fullDescription:
      "Certified technicians provide continuous monitoring, scheduled preventive overhauls, and rapid 24-hour reactive repair services across all electrical and mechanical installations.",
    capabilities: [
      "Electrical preventive maintenance and scheduled testing",
      "Electrical reactive emergency troubleshooting and repair",
      "Mechanical preventive maintenance for pumps, compressors, and lifts",
      "Mechanical reactive maintenance and emergency repairs",
      "High-mast illumination, forecourt lighting, cleaning, and re-lamping",
      "Distribution board (DB) and switchgear rehabilitation",
    ],
    iconName: "Wrench",
    imagePath: "/images/values/staff-training.jpg",
  },
  {
    id: "signage-technical-supplies",
    letter: "E",
    title: "Signage and Technical Supplies",
    summary:
      "Corporate Retail Visual Identity (RVI) signage installation, technical hardware supplies, and corporate equipment procurement.",
    description:
      "We supply and install certified Retail Visual Identity (RVI) brand elements, illuminated canopies, pylons, and directional signage for retail petroleum networks. In addition, TTB procures and delivers specialized technical hardware and corporate office equipment directly from accredited manufacturers.",
    shortDescription:
      "RVI brand signage installation, technical hardware procurement, and commercial equipment.",
    fullDescription:
      "Ensuring brand compliance and equipment availability, we handle end-to-end procurement and precision structural installation for outdoor and indoor visual assets.",
    capabilities: [
      "Retail Visual Identity (RVI) and brand signage installation",
      "Canopy fascia, pylon signboards, and directional display works",
      "Specialized technical supplies and petroleum hardware",
      "General commercial supplies and tools",
      "Corporate office equipment procurement and installation",
    ],
    iconName: "Signpost",
    imagePath: "/images/projects/canopy-rectification.jpg",
  },
  {
    id: "facility-project-management",
    letter: "F",
    title: "Facility and Project Management",
    summary:
      "End-to-end project coordination, comprehensive routine maintenance contracts, and complete facility lifecycle management.",
    description:
      "TTB acts as an integrated facility management partner, allowing asset owners to focus on their core business. We deploy dedicated on-site technicians, manage routine maintenance calendars, ensure HSSE compliance, and coordinate multi-site rehabilitation projects seamlessly.",
    shortDescription:
      "Multi-site project execution, scheduled facility maintenance, and HSSE coordination.",
    fullDescription:
      "A structured project execution framework delivering strict budget adherence, milestone governance, transparent reporting, and long-term asset value protection.",
    capabilities: [
      "Comprehensive multi-site facility management",
      "Turnkey project management and technical oversight",
      "Routine preventive maintenance contracts (SLA-backed)",
      "Multi-site project coordination and rapid execution",
      "Full HSSE documentation, audits, and compliance management",
    ],
    iconName: "ShieldCheck",
    imagePath: "/images/team/team-group-photo.jpg",
  },
];
