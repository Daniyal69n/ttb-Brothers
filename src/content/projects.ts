import { ProjectItem } from "@/types";

export const projectsIntroduction = {
  badge: "Featured Engagements",
  title: "Representative Projects & Case Studies",
  subtitle:
    "A structured selection of corporate initiatives, institutional advisory engagements, and operational programs undertaken across our focus sectors.",
  disclosureNotice:
    "Note: Detailed client identities and proprietary metrics are subject to confidentiality agreements. Selected engagements are summarized in accordance with non-disclosure standards.",
};

export const corporateProjects: ProjectItem[] = [
  {
    id: "enterprise-workflow-restructure",
    title: "Regional Enterprise Workflow Modernization",
    category: "Operations & Process Advisory",
    summary:
      "Comprehensive restructuring of multi-departmental operations for a cross-regional corporate group.",
    description:
      "A structured operational audit followed by the implementation of streamlined governance frameworks, modernized reporting protocols, and standardized KPI measurement.",
    status: "Completed",
    year: "Recent Engagement",
    deliverables: [
      "Operating Model Blueprint",
      "Process Bottleneck Elimination",
      "Executive Dashboard Reporting",
      "Standard Operating Procedures (SOPs)",
    ],
    placeholderImage: "Workflow Restructuring",
  },
  {
    id: "infrastructure-feasibility-study",
    title: "Institutional Infrastructure Feasibility & Risk Audit",
    category: "Strategic Feasibility",
    summary:
      "Multi-phase risk audit and economic assessment for an industrial expansion program.",
    description:
      "Detailed evaluation of capital allocations, regulatory compliance requirements, and environmental risk factors across intended site locations.",
    status: "Completed",
    year: "Recent Engagement",
    deliverables: [
      "Comprehensive Feasibility Dossier",
      "Regulatory Risk Assessment",
      "Capital Expenditure Projections",
      "Mitigation Strategy Recommendations",
    ],
    placeholderImage: "Infrastructure Assessment",
  },
  {
    id: "supply-chain-governance",
    title: "Supply Chain Governance & Quality Assurance Overhaul",
    category: "Project Delivery",
    summary:
      "Implementation of vendor compliance monitoring and quality assurance architecture.",
    description:
      "Standardizing vendor auditing mechanisms, quality benchmark tracking, and contract fulfillment oversight across high-volume supplier networks.",
    status: "Completed",
    year: "Recent Engagement",
    deliverables: [
      "Supplier Governance Matrix",
      "Real-time Tracking Checklists",
      "Quality Threshold Protocols",
      "Vendor Audit Procedures",
    ],
    placeholderImage: "Supply Chain Architecture",
  },
  {
    id: "digital-systems-transition",
    title: "Corporate Digital Core Transition Support",
    category: "Technology Modernization",
    summary:
      "Guidance through enterprise resource system migration and staff workflow enablement.",
    description:
      "Managing migration timelines, cross-department data integrity verification, and staff workflow transitions during an enterprise software rollout.",
    status: "In Progress",
    year: "Active Engagement",
    deliverables: [
      "Data Migration Verification Plan",
      "Cross-Department Training Protocols",
      "System Handover Governance",
      "Security Alignment Documentation",
    ],
    placeholderImage: "Systems Migration",
  },
  {
    id: "portfolio-asset-optimization",
    title: "Commercial Asset Portfolio Strategic Review",
    category: "Asset Advisory",
    summary:
      "Strategic valuation and lifecycle assessment for multi-asset commercial holdings.",
    description:
      "In-depth analysis of holding performance, maintenance expenditures, and long-term yield projections to guide board-level asset rationalization.",
    status: "Completed",
    year: "Recent Engagement",
    deliverables: [
      "Portfolio Performance Benchmarks",
      "Lifecycle Cost Matrix",
      "Divestment / Reinvestment Options",
      "Executive Board Presentation",
    ],
    placeholderImage: "Portfolio Review",
  },
  {
    id: "regulatory-compliance-framework",
    title: "Cross-Jurisdictional Compliance Architecture",
    category: "Corporate Advisory",
    summary:
      "Design of standard operating compliance protocols across changing regulatory environments.",
    description:
      "Formulation of proactive compliance checklists, internal policy audits, and risk escalation channels for corporate entity oversight.",
    status: "Confidential / Case Study",
    year: "Ongoing Engagement",
    deliverables: [
      "Statutory Compliance Matrix",
      "Risk Escalation Architecture",
      "Internal Audit Documentation",
      "Executive Compliance Briefs",
    ],
    placeholderImage: "Compliance Protocol",
  },
];
