import { ProjectItem } from "@/types";

export const projectsIntroduction = {
  badge: "Verified Project Portfolio",
  title: "Major Completed Infrastructure Projects",
  subtitle:
    "A track record of turnkey construction, fuel station forecourt commissioning, electro-mechanical rehabilitation, and retail outlet fit-outs executed for leading multi-national energy corporations across Pakistan.",
  disclosureNotice:
    "Source: TTB Corporate Profile. All projects listed below are verified historical contracts delivered by T & T Brothers (TTB) for clients including Shell Pakistan, Total Parco Pakistan, and Pakistan State Oil (PSO).",
};

export const corporateProjects: ProjectItem[] = [
  // 2022 Projects
  {
    id: "metro-cash-carry-auto-wash-2022",
    title: "Metro Cash & Carry Auto Wash",
    client: "Total Parco",
    year: "2022",
    category: "Retail Shops & Auto Wash",
    summary:
      "State-of-the-art automated car wash installation and facility commissioning at Metro Cash & Carry.",
    description:
      "Complete civil, mechanical, and electrical turnkey delivery for the Total Wash automated vehicle washing facility at Metro Cash & Carry. Scope encompassed water containment, recycling drainage, high-pressure wash bay systems, automated gantries, power distribution, and illuminated brand signage.",
    status: "Completed",
    deliverables: [
      "Turnkey Total Wash facility construction",
      "Automated car wash mechanical assembly & testing",
      "Specialized water recycling & drainage system",
      "Electrical switchgear & pump control panel installation",
      "Brand signage & illumination fit-out",
    ],
    imagePath: "/images/projects/total-wash-project.jpg",
    galleryImages: [
      "/images/projects/total-wash-project.jpg",
      "/images/projects/total-wash-bay-detail.jpg",
    ],
    featured: true,
  },
  {
    id: "kdr-machikay-depot-t1-2022",
    title: "KDR Machikay Depot, T-1",
    client: "Total Parco",
    year: "2022",
    category: "Filling Stations & KDR",
    summary:
      "Comprehensive structural and technological defect rectification at Machikay bulk petroleum terminal.",
    description:
      "Terminal rehabilitation program executed at Total Parco's Machikay Depot T-1 facility. Delivered rigorous civil repairs, containment bund refurbishment, petroleum safety audits, and mechanical pipeline alignment under strict HSSE guidelines.",
    status: "Completed",
    deliverables: [
      "Industrial depot civil rectification & resurfacing",
      "Petroleum pipeline and flange alignment",
      "Environmental bund integrity restoration",
      "Terminal HSSE and fire safety integration",
    ],
    imagePath: "/images/projects/machikay-depot-rectification.jpg",
    featured: true,
  },
  {
    id: "kdr-total-service-center-2022",
    title: "KDR of Total Service Center",
    client: "Total Parco",
    year: "2022",
    category: "Filling Stations & KDR",
    summary:
      "Complete facility overhaul, forecourt renovation, and canopy enhancement at Total Service Center.",
    description:
      "Turnkey Key Dealer Renovation (KDR) of Total Service Center, featuring forecourt paving rejuvenation, dispenser island modification, electrical rewiring, and canopy structural refurbishment.",
    status: "Completed",
    deliverables: [
      "Forecourt civil rehabilitation & pavement paving",
      "Dispenser island upgrades and crash barrier installation",
      "Canopy structural reinforcement & fresh fascia lighting",
      "Full site illumination and re-lamping",
    ],
    imagePath: "/images/projects/total-service-center-kdr.jpg",
    featured: true,
  },
  {
    id: "kdr-khan-filling-station-2022",
    title: "KDR of Khan Filling Station",
    client: "Total Parco",
    year: "2022",
    category: "Filling Stations & KDR",
    summary:
      "Comprehensive retail outlet renovation, forecourt civil upgrades, and mechanical repairs.",
    description:
      "Extensive modernization program covering forecourt drainage, driveway re-carpeting, tank access chamber sealing, and dispenser pump alignment to bring Khan Filling Station in line with Total Parco's corporate identity standards.",
    status: "Completed",
    deliverables: [
      "Driveway resurfacing and drainage trench installation",
      "Underground tank manhole chamber sealing",
      "Dispenser calibration and mechanical servicing",
      "RVI brand fascia signage integration",
    ],
    imagePath: "/images/projects/khan-filling-station-kdr.jpg",
  },
  {
    id: "orchard-filling-station-2020-shop-2022",
    title: "Orchard Filling Station 2020 Shop",
    client: "Total Parco",
    year: "2022",
    category: "Retail Shops & Auto Wash",
    summary:
      "Modern Total 2020 Shop convenience retail interior fit-out and architectural construction.",
    description:
      "Construction and interior joinery for the Total 2020 Shop standard at Orchard Filling Station. Included retail shelving, commercial refrigeration wiring, point-of-sale cabinetry, HVAC ducting, and energy-efficient LED ambient illumination.",
    status: "Completed",
    deliverables: [
      "Turnkey convenience store architectural interior",
      "Electrical distribution for commercial chillers & displays",
      "Acoustic ceiling and heavy-duty retail floor tiling",
      "Total Quartz branded customer service counters",
    ],
    imagePath: "/images/projects/total-quartz-retail-interior.jpg",
    featured: true,
  },
  {
    id: "sana-filling-station-2020-shop-2022",
    title: "Sana Filling Station 2020 Shop",
    client: "Total Parco",
    year: "2022",
    category: "Retail Shops & Auto Wash",
    summary:
      "Retail shop interior fabrication and electrical integration according to 2020 Shop format.",
    description:
      "Complete civil fit-out of the convenience retail store at Sana Filling Station. Scope delivered precision drywall partitioning, insulated storefront glazing, automated entrance sliding doors, and illuminated merchandise shelving.",
    status: "Completed",
    deliverables: [
      "Complete shop interior build & structural partitioning",
      "Tempered storefront glass & automated access doors",
      "Retail display illumination and switchboards",
      "POS counter joinery and branding finishes",
    ],
    imagePath: "/images/projects/sana-filling-station-shop.jpg",
  },
  {
    id: "tycon-filling-station-kdr-2022",
    title: "Tycon Filling Station KDR",
    client: "Total Parco",
    year: "2022",
    category: "Filling Stations & KDR",
    summary:
      "Major civil and technological renovation across retail forecourt and sales building.",
    description:
      "Full site renovation of Tycon Filling Station under the Total Parco dealer network rehabilitation initiative. Upgraded forecourt traffic channels, safety bollards, dispenser sumps, and electrical grounding systems.",
    status: "Completed",
    deliverables: [
      "Driveway concrete slab rehabilitation",
      "Electrical grounding and surge protection matrix",
      "Dispenser containment sump waterproofing",
      "Site canopy painting & safety hazard demarcation",
    ],
    imagePath: "/images/projects/tycon-filling-station-kdr.jpg",
  },

  // 2021 Projects
  {
    id: "complete-construction-markhoor-filling-station-2021",
    title: "Complete Construction of Markhoor Filling Station",
    client: "Total Parco",
    year: "2021",
    category: "Civil & Construction",
    summary:
      "Turnkey greenfield construction of Markhoor retail fuel outlet, canopy, and sales building.",
    description:
      "End-to-end greenfield development from bare land to operational station. Project included excavation, underground petroleum storage tank installation, canopy steel structure fabrication, sales building civil works, boundary walls, and high-efficiency forecourt paving.",
    status: "Completed",
    deliverables: [
      "Greenfield civil excavation & foundation engineering",
      "Underground fuel storage tanks placement & piping",
      "Structural steel canopy fabrication and erection",
      "Sales building, washrooms & retail room construction",
      "Concrete forecourt apron & heavy-duty asphalt driveways",
    ],
    imagePath: "/images/projects/markhoor-filling-station.jpg",
    featured: true,
  },
  {
    id: "complete-construction-nti-karal-cng-2021",
    title: "Complete Construction of NTI Karal CNG",
    client: "Shell Pakistan",
    year: "2021",
    category: "Civil & Construction",
    summary:
      "Turnkey civil and mechanical construction of NTI Karal CNG station for Shell Pakistan.",
    description:
      "Greenfield engineering and construction of high-pressure CNG dispensing facility for Shell Pakistan. Scope encompassed compressor foundation vibration isolation, gas piping manifolds, safety blast walls, canopy installation, and forecourt infrastructure.",
    status: "Completed",
    deliverables: [
      "Heavy reinforced concrete compressor foundation",
      "Explosion-resistant reinforced blast wall construction",
      "High-pressure manifold assembly & mechanical testing",
      "Canopy structural erection and Shell RVI signage",
      "Complete electrical sub-station & distribution panel",
    ],
    imagePath: "/images/projects/nti-karal-cng-construction.jpg",
    featured: true,
  },
  {
    id: "kdr-csd-rawalpindi-2021",
    title: "KDR CSD Rawalpindi",
    client: "Shell Pakistan",
    year: "2021",
    category: "Filling Stations & KDR",
    summary:
      "Complete outlet renovation and forecourt modernization at CSD Rawalpindi.",
    description:
      "Comprehensive dealer renovation executed at high-volume CSD Shell outlet in Rawalpindi. Upgraded fuel dispensing zones, modernized sales building facade, improved stormwater drainage, and replaced forecourt lighting fixtures.",
    status: "Completed",
    deliverables: [
      "Forecourt resurfacing and heavy vehicular pavement",
      "Sales building architectural facade refurbishment",
      "Stormwater drainage and grease trap installation",
      "Modern energy-efficient LED canopy lighting",
    ],
    imagePath: "/images/projects/csd-rawalpindi-shell.jpg",
  },
  {
    id: "kdr-punjab-regiment-center-2021",
    title: "KDR Punjab Regiment Center",
    client: "Shell Pakistan",
    year: "2021",
    category: "Filling Stations & KDR",
    summary:
      "Extensive civil and forecourt modernization at Punjab Regiment Center Shell station.",
    description:
      "High-precision rehabilitation project for Shell Pakistan within a prestigious cantonment location. Executed with strict adherence to security protocols, military standard civil specifications, and rapid delivery schedules.",
    status: "Completed",
    deliverables: [
      "Driveway civil overhaul and kerb stone alignment",
      "Canopy structural inspection and refurbishment",
      "Sub-surface pipe chamber sealing and leak prevention",
      "Illuminated Shell pylon and directional signage install",
    ],
    imagePath: "/images/projects/punjab-regiment-center-shell.jpg",
  },
  {
    id: "jasmin-filling-station-2020-shop-2021",
    title: "Jasmin Filling Station 2020 Shop",
    client: "Total Parco",
    year: "2021",
    category: "Retail Shops & Auto Wash",
    summary:
      "Turnkey Total 2020 Shop convenience store construction and interior fit-out.",
    description:
      "Full turnkey execution of the Total 2020 Shop interior architecture at Jasmin Filling Station. Integrated floor plans, glass walling, commercial electrical wiring, back-office storage rooms, and merchandise display cabinetry.",
    status: "Completed",
    deliverables: [
      "Convenience retail interior fit-out & styling",
      "Glazed frontage with thermal insulation",
      "Commercial electrical wiring and backup power transfer",
      "Total brand merchandise shelving and checkout point",
    ],
    imagePath: "/images/projects/jasmin-filling-station-shop.jpg",
  },
  {
    id: "total-service-center-2020-shop-2021",
    title: "Total Service Center 2020 Shop",
    client: "Total Parco",
    year: "2021",
    category: "Retail Shops & Auto Wash",
    summary:
      "Modern retail outlet conversion and Total Quartz customer lounge fit-out.",
    description:
      "Transformation of existing retail area into a contemporary Total Quartz service store and customer waiting lounge, featuring luxury finishes, custom branded displays, and integrated coffee bar counter.",
    status: "Completed",
    deliverables: [
      "Complete shop space conversion and interior design",
      "Customer lounge joinery and acoustic wall treatment",
      "Total Quartz lubricant display units",
      "Energy-efficient air-conditioning & lighting install",
    ],
    imagePath: "/images/projects/total-service-center-shop.jpg",
  },
  {
    id: "canopy-rectification-shell-2021",
    title: "Canopy Rectification Project at Various Sites",
    client: "Shell Pakistan",
    year: "2021",
    category: "Electrical & Mechanical",
    summary:
      "Multi-site canopy structural reinforcement, fascia replacement, and illumination retrofit.",
    description:
      "Multi-station canopy rectification program delivered across Shell Pakistan's retail network. Repaired storm-damaged purlins, replaced rusted cladding with aluminum composite panels, and upgraded under-canopy lighting.",
    status: "Completed",
    deliverables: [
      "Structural steel integrity inspection and welding repair",
      "Aluminum Composite Panel (ACP) fascia replacement",
      "Under-canopy LED luminaires wiring and IP-rated sealing",
      "Wind load resistance reinforcement across all sites",
    ],
    imagePath: "/images/projects/canopy-rectification-shell.jpg",
  },
  {
    id: "canopy-rectification-total-2021",
    title: "Canopy Rectification Project at Various Sites",
    client: "Total Parco",
    year: "2021",
    category: "Electrical & Mechanical",
    summary:
      "Network-wide canopy structural repairs and visual identity alignment for Total Parco.",
    description:
      "Simultaneous execution across multiple retail fuel stations in North Region. Ensured compliance with Total Parco's global engineering standards for canopy soffit panels, gutter drainage, and corporate lighting bands.",
    status: "Completed",
    deliverables: [
      "Canopy soffit panel repairs and structural bracing",
      "Rainwater gutter fabrication and downpipe overhaul",
      "Corporate illuminated fascia band installation",
      "Electrical surge suppression for forecourt lighting",
    ],
    imagePath: "/images/projects/canopy-rectification-total.jpg",
  },
  {
    id: "oil-water-separator-total-2021",
    title: "Oil Water Separator Project at Various Sites",
    client: "Total Parco",
    year: "2021",
    category: "Civil & Construction",
    summary:
      "Turnkey environmental containment and Oil Water Separator (OWS) installations.",
    description:
      "Critical environmental protection initiative across multiple Total Parco retail stations. Built multi-chamber reinforced concrete oil-water separators to trap petroleum runoff from forecourts and wash bays prior to discharge.",
    status: "Completed",
    deliverables: [
      "Multi-chamber reinforced concrete OWS tank casting",
      "Coalescing plate media assembly and inlet filtration",
      "Forecourt oily-water runoff collection trenching",
      "Environmental compliance certification testing",
    ],
    imagePath: "/images/projects/oil-water-separator-total.jpg",
  },

  // 2020 Projects
  {
    id: "margala-filling-station-kdr-2020",
    title: "Margala Filling Station KDR",
    client: "Shell Pakistan",
    year: "2020",
    category: "Filling Stations & KDR",
    summary:
      "Turnkey Key Dealer Renovation (KDR) at prime Margala Shell forecourt.",
    description:
      "Complete revitalization of Margala Filling Station in Islamabad. Included deep pavement milling, heavy-duty concrete apron reconstruction, dispenser sump sealing, electrical panel rehabilitation, and fresh corporate Shell livery.",
    status: "Completed",
    deliverables: [
      "Forecourt structural concrete apron replacement",
      "Fuel dispenser containment sumps refurbishment",
      "Underground leak detection conduit installation",
      "Complete site illumination upgrade and re-lamping",
    ],
    imagePath: "/images/projects/margala-filling-station-shell.jpg",
    featured: true,
  },
  {
    id: "oil-water-separator-total-2020",
    title: "Oil Water Separator Project at Various Sites",
    client: "Total Parco",
    year: "2020",
    category: "Civil & Construction",
    summary:
      "Phase-1 environmental containment and separator installations across retail network.",
    description:
      "Phase-1 delivery of environmental runoff interception systems across Total Parco network. Designed and constructed heavy-duty separators capable of capturing hydrocarbon spills and ensuring clean effluent drainage.",
    status: "Completed",
    deliverables: [
      "Precision civil excavation and cast-in-place concrete basins",
      "Internal hydrocarbon baffle and siphon pipe assembly",
      "Heavy vehicular duty cast iron access manhole covers",
      "Site stormwater connection and commissioning",
    ],
    imagePath: "/images/projects/oil-water-separator-total-2020.jpg",
  },

  // 2019 Projects
  {
    id: "electric-rehab-shell-2019",
    title: "Electric Rehabilitation Works at Various Shell Outlets",
    client: "Shell Pakistan",
    year: "2019",
    category: "Electrical & Mechanical",
    summary:
      "Network-wide electrical distribution, hazardous zone wiring, and sub-panel rehabilitation.",
    description:
      "Comprehensive electrical safety overhaul across multiple Shell Pakistan retail stations. Replaced aging conduit in ATEX Zone-1/2 explosive areas, installed flame-proof junction boxes, overhauled main distribution panels, and updated earthing resistance.",
    status: "Completed",
    deliverables: [
      "Hazardous zone explosion-proof wiring and glands",
      "Main Distribution Board (MDB) & Sub-DB overhauls",
      "Earthing pit installation & earth resistance testing (<5 Ohms)",
      "Automatic Transfer Switch (ATS) generator integration",
    ],
    imagePath: "/images/projects/electric-rehab-shell.jpg",
  },

  // 2018 Projects
  {
    id: "defense-road-filling-station-2018",
    title: "Complete Construction of Defense Road Filling Station",
    client: "Shell Pakistan",
    year: "2018",
    category: "Civil & Construction",
    summary:
      "Turnkey greenfield construction of complete retail fuel station on Defense Road.",
    description:
      "Major turnkey retail petroleum development on Defense Road for Shell Pakistan. Handled entire scope: boundary wall civil works, underground storage tank civil cradle, structural canopy, modern sales building, tiled washrooms, high-load pavement, and forecourt commissioning.",
    status: "Completed",
    deliverables: [
      "Full greenfield civil excavation & foundation works",
      "Multi-tank underground storage installation & piping",
      "Structural steel canopy fabrication and erection",
      "Turnkey sales building, convenience shop, and office",
      "Forecourt rigid concrete pavement and drainage network",
    ],
    imagePath: "/images/projects/defense-road-filling-station.jpg",
    featured: true,
  },
  {
    id: "electric-rehab-shell-2018",
    title: "Electric Rehabilitation Works at Various Shell Outlets",
    client: "Shell Pakistan",
    year: "2018",
    category: "Electrical & Mechanical",
    summary:
      "Turnkey electrical system audits, wiring renewals, and illumination upgrades for Shell.",
    description:
      "Multi-site electrical safety modernization program across Shell retail stations. Re-wired dispenser feeds, installed residual current circuit breakers (RCCBs), upgraded forecourt lighting fixtures, and verified compliance with Shell global HSSE electrical standards.",
    status: "Completed",
    deliverables: [
      "Complete electrical safety audits across multiple stations",
      "Industrial cable replacement and underground conduit pulls",
      "Installation of protective RCCB and surge protection devices",
      "High-efficiency canopy LED light fixture retrofits",
    ],
    imagePath: "/images/projects/electric-rehab-shell-2018.jpg",
  },
  {
    id: "biker-lane-modification-pso-2018",
    title: "Various Sites Biker Lane Modification Project",
    client: "Pakistan State Oil (PSO)",
    year: "2018",
    category: "Filling Stations & KDR",
    summary:
      "Forecourt traffic reorganization, dedicated biker refueling lanes, and safety bollards.",
    description:
      "Network modification initiative executed for Pakistan State Oil (PSO) across multiple urban stations. Segregated two-wheeler motorcyclist refueling from four-wheelers through dedicated concrete islands, traffic channelization curbs, protective steel bollards, and high-visibility road marking.",
    status: "Completed",
    deliverables: [
      "Dedicated biker dispensing island civil construction",
      "High-impact steel safety bollards and crash barriers",
      "Forecourt epoxy and polyurethane traffic line markings",
      "Driveway traffic channelization and signage install",
    ],
    imagePath: "/images/projects/pso-biker-lane-modification.jpg",
    featured: true,
  },
];
