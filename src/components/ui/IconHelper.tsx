import React from "react";
import {
  Compass,
  Layers,
  Briefcase,
  Server,
  BarChart3,
  Sliders,
  ShieldCheck,
  TrendingUp,
  Target,
  Users,
  Cpu,
  Award,
  HeartPulse,
  GraduationCap,
  Clock,
  HelpCircle,
  LucideProps,
} from "lucide-react";

const iconMap: Record<string, React.FC<LucideProps>> = {
  Compass,
  Layers,
  Briefcase,
  Server,
  BarChart3,
  Sliders,
  ShieldCheck,
  TrendingUp,
  Target,
  Users,
  Cpu,
  Award,
  HeartPulse,
  GraduationCap,
  Clock,
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent {...props} />;
}
