import { JobOpening } from "@/types";

export const careersIntroduction = {
  badge: "Careers at TTB",
  title: "Build Your Career in an Environment of Rigor and Impact",
  subtitle:
    "We are continually seeking disciplined, forward-thinking professionals who thrive in challenging environments and take pride in delivering measurable business value.",
};

export const culturePrinciples = [
  {
    title: "Culture of Accountability",
    description:
      "We value individuals who take full ownership of their deliverables, respect team commitments, and communicate with clarity and transparency.",
  },
  {
    title: "Continuous Professional Growth",
    description:
      "We provide access to ongoing leadership mentorship, skill development resources, and exposure to strategic high-impact projects.",
  },
  {
    title: "Collaborative Respect",
    description:
      "Our work environment is founded on open inquiry, mutual respect, diverse perspectives, and cross-functional teamwork.",
  },
  {
    title: "Ethical Standards",
    description:
      "We hold ourselves to rigorous professional codes of conduct, ensuring integrity in all interpersonal and client interactions.",
  },
];

export const employeeBenefits = [
  {
    title: "Competitive Compensation",
    description:
      "Performance-aligned remuneration benchmarked against top corporate standards.",
    iconName: "TrendingUp",
  },
  {
    title: "Health & Well-being",
    description:
      "Comprehensive medical coverage options and wellness support initiatives.",
    iconName: "HeartPulse",
  },
  {
    title: "Professional Development",
    description:
      "Tuition assistance, professional certification support, and executive training.",
    iconName: "GraduationCap",
  },
  {
    title: "Flexible Work Framework",
    description:
      "Hybrid and flexible working options depending on operational requirements.",
    iconName: "Clock",
  },
];

// Openings: TTB has not confirmed specific active vacancies, so we provide an honest disclosure and general application pipeline
export const currentOpenings: JobOpening[] = [];

export const generalApplicationInfo = {
  status: "Open for General Talent Inquiries",
  notice:
    "TTB is currently accepting expressions of interest for upcoming corporate advisory, project delivery, and operations positions. Even when specific vacancies are not listed below, qualified candidates are invited to submit their credentials for future consideration.",
  submissionEmail: "careers@ttb-corporate.placeholder", // Replace with official TTB HR inbox
  instructions:
    "Please send your CV and a brief cover letter outlining your background, core competencies, and career objectives to our talent acquisition desk.",
};
