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

  // 2022 Extended Projects
  {
    id: "fc-filling-station-kdr-2022",
    title: "FC Filling Station KDR",
    client: "Total Parco",
    year: "2022",
    category: "Filling Stations & KDR",
    summary: "Key Dealer Renovation at FC Filling Station for Total Parco.",
    description:
      "Comprehensive KDR works at FC Filling Station including forecourt civil upgrades, canopy refurbishment, electrical improvements, and brand identity alignment.",
    status: "Completed",
    deliverables: [
      "Forecourt civil rehabilitation",
      "Canopy structural refurbishment",
      "Electrical panel upgrade",
      "Brand signage installation",
    ],
    imagePath: "/images/projects/total-service-center-kdr.jpg",
  },
  {
    id: "kdr-tariq-shenwari-filling-station-2022",
    title: "KDR Tariq Shenwari Filling Station",
    client: "Total Parco",
    year: "2022",
    category: "Filling Stations & KDR",
    summary: "Key Dealer Renovation at Tariq Shenwari Filling Station.",
    description:
      "Full KDR scope at Tariq Shenwari Filling Station including civil, mechanical, and electrical renovation works to align with Total Parco corporate standards.",
    status: "Completed",
    deliverables: [
      "Forecourt pavement rehabilitation",
      "Dispenser island upgrades",
      "Canopy refurbishment",
      "Electrical rewiring",
    ],
    imagePath: "/images/projects/total-service-center-kdr.jpg",
  },
  {
    id: "sahiwal-filling-station-kdr-2022",
    title: "Sahiwal Filling Station KDR",
    client: "Total Parco",
    year: "2022",
    category: "Filling Stations & KDR",
    summary: "Key Dealer Renovation at Sahiwal Filling Station.",
    description:
      "Comprehensive KDR works at Sahiwal Filling Station, covering forecourt civil repairs, dispenser alignment, canopy improvements, and corporate identity refresh.",
    status: "Completed",
    deliverables: [
      "Forecourt civil and drainage works",
      "Canopy painting and lighting",
      "Dispenser sump sealing",
      "RVI signage installation",
    ],
    imagePath: "/images/projects/total-service-center-kdr.jpg",
  },

  // 2023 Projects
  {
    id: "canopy-fabrication-tppl-new-retail-2023",
    title: "Canopy Fabrication Work at TPPL New Retail Outlets",
    client: "TPPL",
    year: "2023",
    category: "Civil & Construction",
    summary:
      "Canopy fabrication and installation across multiple TPPL new retail outlets in Karachi, Islamabad, Faisalabad, and Lahore.",
    description:
      "Multi-city canopy fabrication and erection program for TPPL new retail outlets. Scope covered structural steel fabrication, aluminum cladding, illuminated fascia bands, and full commissioning across Karachi, Islamabad, Faisalabad, and Lahore areas.",
    status: "Completed",
    deliverables: [
      "Structural steel canopy fabrication and erection",
      "Aluminum composite panel cladding",
      "Illuminated brand fascia installation",
      "Electrical connections for under-canopy lighting",
    ],
    imagePath: "/images/projects/markhoor-filling-station.jpg",
  },
  {
    id: "new-site-police-welfare-dina-2023",
    title: "Construction of New Site Police Welfare F/S – Dina",
    client: "Total Parco",
    year: "2023",
    category: "Civil & Construction",
    summary:
      "Turnkey greenfield construction of Police Welfare Filling Station at Dina.",
    description:
      "Complete new site construction for Police Welfare Filling Station at Dina including civil foundation works, underground tank installation, canopy erection, sales building construction, and forecourt commissioning.",
    status: "Completed",
    deliverables: [
      "Greenfield civil excavation and foundation",
      "Underground tank installation and piping",
      "Structural canopy fabrication and erection",
      "Sales building and forecourt construction",
    ],
    imagePath: "/images/projects/defense-road-filling-station.jpg",
  },

  // 2024 Projects
  {
    id: "orchard-filling-station-tank-replacement-2024",
    title: "Orchard Filling Station Tank Replacement",
    client: "Total Parco",
    year: "2024",
    category: "Civil & Construction",
    summary: "Underground fuel storage tank replacement at Orchard Filling Station.",
    description:
      "Complete underground storage tank removal and replacement program at Orchard Filling Station. Included excavation, old tank decommissioning, new tank installation, piping reconnection, and environmental compliance testing.",
    status: "Completed",
    deliverables: [
      "Old tank decommissioning and removal",
      "New UST installation and backfill",
      "Fuel piping reconnection and testing",
      "Environmental compliance certification",
    ],
    imagePath: "/images/projects/oil-water-separator-total.jpg",
  },
  {
    id: "polwel-filling-station-jhelum-tank-replacement-2024",
    title: "Polwel Filling Station Jhelum Tank Replacement",
    client: "Total Parco",
    year: "2024",
    category: "Civil & Construction",
    summary: "Underground tank replacement at Polwel Filling Station, Jhelum.",
    description:
      "Tank replacement program at Polwel Filling Station in Jhelum including excavation, old tank decommissioning, new double-wall tank installation, and full recommissioning.",
    status: "Completed",
    deliverables: [
      "Excavation and old tank removal",
      "New double-wall UST installation",
      "Piping and sump reconnection",
      "Leak detection system commissioning",
    ],
    imagePath: "/images/projects/oil-water-separator-total-2020.jpg",
  },
  {
    id: "jumari-service-area-apl-2024",
    title: "Jumari Service Area along with APL Retail Outlet",
    client: "APL",
    year: "2024",
    category: "Civil & Construction",
    summary:
      "Construction of Jumari Service Area and APL Retail Outlet.",
    description:
      "Turnkey construction of a full service area including APL retail fuel outlet, convenience store, washroom facilities, parking, and all ancillary civil and MEP works at Jumari.",
    status: "Completed",
    deliverables: [
      "Service area civil works and foundations",
      "APL forecourt and canopy construction",
      "Retail outlet interior fit-out",
      "Parking and landscape works",
    ],
    imagePath: "/images/projects/markhoor-filling-station.jpg",
  },
  {
    id: "kdr-nagina-fs-tppl-2024",
    title: "KDR of Nagina F/S TPPL",
    client: "TPPL",
    year: "2024",
    category: "Filling Stations & KDR",
    summary: "Key Dealer Renovation of Nagina Filling Station for TPPL.",
    description:
      "Complete KDR scope at Nagina Filling Station for TPPL including civil rehabilitation, canopy upgrade, electrical improvements, and brand identity alignment.",
    status: "Completed",
    deliverables: [
      "Forecourt civil rehabilitation",
      "Canopy refurbishment and rebranding",
      "Electrical panel and wiring upgrade",
      "Signage and lighting installation",
    ],
    imagePath: "/images/projects/total-service-center-kdr.jpg",
  },

  // 2025 Projects
  {
    id: "rainbow-fs-complete-site-work-tppl-2025",
    title: "Rainbow F/S Complete Site Work with TPPL",
    client: "TPPL",
    year: "2025",
    category: "Civil & Construction",
    summary: "Complete site civil and MEP works at Rainbow Filling Station with TPPL.",
    description:
      "Full turnkey site execution at Rainbow Filling Station including civil, electrical, and mechanical works in partnership with TPPL.",
    status: "Completed",
    deliverables: [
      "Complete civil site works",
      "Electrical distribution upgrade",
      "Mechanical and piping works",
      "Forecourt commissioning",
    ],
    imagePath: "/images/projects/defense-road-filling-station.jpg",
  },
  {
    id: "hassan-7-bahria-rawalpindi-tppl-2025",
    title: "Hassan-7 Bahria Town Rawalpindi F/S Complete Site Work with TPPL",
    client: "TPPL",
    year: "2025",
    category: "Civil & Construction",
    summary:
      "Complete site works at Hassan-7 Bahria Town Rawalpindi Filling Station.",
    description:
      "Turnkey execution of all civil, mechanical, and electrical site works at Hassan-7 Filling Station in Bahria Town Rawalpindi for TPPL.",
    status: "Completed",
    deliverables: [
      "Civil earthworks and foundations",
      "Canopy erection and cladding",
      "Electrical and mechanical installation",
      "Full site commissioning",
    ],
    imagePath: "/images/projects/markhoor-filling-station.jpg",
  },
  {
    id: "alpine-bahria-rawalpindi-tppl-2025",
    title: "Alpine Bahria Town Rawalpindi F/S Complete Site Work with TPPL",
    client: "TPPL",
    year: "2025",
    category: "Civil & Construction",
    summary:
      "Complete site works at Alpine Bahria Town Rawalpindi Filling Station.",
    description:
      "Full turnkey delivery at Alpine Filling Station in Bahria Town Rawalpindi in partnership with TPPL.",
    status: "Completed",
    deliverables: [
      "Complete civil and structural works",
      "MEP installation and commissioning",
      "Forecourt and canopy works",
      "Brand identity alignment",
    ],
    imagePath: "/images/projects/defense-road-filling-station.jpg",
  },
  {
    id: "askari-14-fs-apl-2025",
    title: "Askari 14 F/S Complete Site Work with APL",
    client: "APL",
    year: "2025",
    category: "Civil & Construction",
    summary: "Complete site works at Askari 14 Filling Station with APL.",
    description:
      "Turnkey site works at Askari 14 Filling Station for APL including all civil, electrical, and mechanical scope.",
    status: "Completed",
    deliverables: [
      "Civil site works and foundations",
      "Electrical and mechanical installation",
      "Canopy and forecourt works",
      "APL brand identity commissioning",
    ],
    imagePath: "/images/projects/markhoor-filling-station.jpg",
  },

  // 2026 Projects
  {
    id: "rest-area-lpg-plant-apl-2026",
    title: "Rest Area Building Construction in LPG plant of APL",
    client: "APL",
    year: "2026",
    category: "Civil & Construction",
    summary:
      "Construction of rest area building within APL's LPG plant facility.",
    description:
      "Design and construction of a complete rest area building inside APL's LPG plant, including civil structural works, interior fit-out, MEP services, and all ancillary facilities.",
    status: "Completed",
    deliverables: [
      "Structural civil works",
      "Interior fit-out and finishing",
      "MEP services installation",
      "Site commissioning and handover",
    ],
    imagePath: "/images/projects/defense-road-filling-station.jpg",
  },
];
