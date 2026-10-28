import { ServiceItem } from "@/types";

export const servicesIntroduction = {
  badge: "Services & Capabilities",
  title: "Integrated Corporate Solutions",
  subtitle:
    "TTB delivers structured services designed to meet rigorous enterprise standards. Specific operational offerings are configured below and can be updated as service lines expand.",
};

export const corporateServices: ServiceItem[] = [
  {
    id: "strategic-advisory",
    title: "Corporate Advisory & Strategy",
    summary:
      "Strategic planning, business model optimization, and risk evaluation frameworks.",
    description:
      "Assisting organizational leadership with data-informed decision making, governance structures, and strategic roadmaps tailored to dynamic market conditions.",
    capabilities: [
      "Strategic Planning & Execution",
      "Corporate Governance Architecture",
      "Operational Risk Assessment",
      "Stakeholder Alignment Strategies",
    ],
    iconName: "Compass",
  },
  {
    id: "operational-management",
    title: "Operations & Process Optimization",
    summary:
      "Streamlining operational workflows, performance benchmarking, and resource efficiency.",
    description:
      "Implementing structured processes that elevate execution quality, eliminate bottlenecks, and ensure organizational resilience at scale.",
    capabilities: [
      "Process Architecture & Re-engineering",
      "Resource Utilization Analysis",
      "Quality Assurance & KPI Tracking",
      "Supply Chain & Delivery Streamlining",
    ],
    iconName: "Layers",
  },
  {
    id: "project-delivery",
    title: "Enterprise Project Management",
    summary:
      "Rigorous oversight, milestone management, and risk mitigation across complex initiatives.",
    description:
      "End-to-end management of corporate initiatives, ensuring that budgets, timelines, and deliverables adhere strictly to defined quality thresholds.",
    capabilities: [
      "Program & Portfolio Oversight",
      "Cross-Functional Team Coordination",
      "Schedule & Budget Governance",
      "Change Management & Reporting",
    ],
    iconName: "Briefcase",
  },
  {
    id: "digital-transformation",
    title: "Technology & Infrastructure Solutions",
    summary:
      "Modernizing enterprise systems, digital tooling, and technological infrastructure.",
    description:
      "Guiding organizations through pragmatic digital modernization, secure architecture adoption, and workflow digitization.",
    capabilities: [
      "Digital Roadmap Development",
      "Enterprise Tooling Integration",
      "Data Infrastructure Advisory",
      "System Modernization & Security Alignment",
    ],
    iconName: "Server",
  },
  {
    id: "asset-stewardship",
    title: "Asset & Investment Advisory",
    summary:
      "Strategic stewardship, feasibility assessments, and portfolio sustainability analysis.",
    description:
      "Conducting methodical analysis of capital allocations, operational assets, and long-term asset lifecycle health.",
    capabilities: [
      "Feasibility & Viability Studies",
      "Asset Lifecycle Planning",
      "Capital Expenditure Benchmarking",
      "Portfolio Performance Review",
    ],
    iconName: "BarChart3",
  },
  {
    id: "custom-solutions",
    title: "Specialized Corporate Services",
    summary:
      "Tailored engagements customized to specific institutional mandates and unique requirements.",
    description:
      "Collaborating closely with client executive teams to formulate bespoke solutions for unique sector challenges and transition programs.",
    capabilities: [
      "Tailored Consulting Engagements",
      "Regulatory Preparedness & Compliance",
      "Institutional Transition Management",
      "Custom Joint-Venture Structuring Support",
    ],
    iconName: "Sliders",
  },
];
