"use client";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

// Simple icon components
const Calendar = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const Code = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16,18 22,12 16,6"/>
    <polyline points="8,6 2,12 8,18"/>
  </svg>
);

const FileText = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
);

const User = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const Clock = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const timelineData = [
  {
    id: 1,
    title: "Planning & Strategy",
    date: "Phase 1",
    content: "We dive deep into your brand, audience, and goals to craft a winning content strategy.\n\nWhy choose us: Clarity before creativity.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Creative Design",
    date: "Phase 2",
    content: "Storyboarding, concepts, and visual direction that set the tone.\n\nWhy choose us: Unique cinematic storytelling.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 3,
    title: "Production",
    date: "Phase 3",
    content: "Capturing the right footage and assets to bring ideas to life.\n\nWhy choose us: High-quality execution.",
    category: "Production",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 100,
  },
  {
    id: 4,
    title: "Post-Production",
    date: "Phase 4",
    content: "Editing, effects, motion graphics, and sound that make content unforgettable.\n\nWhy choose us: Creative edge with speed.",
    category: "Post-Production",
    icon: User,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 100,
  },
  {
    id: 5,
    title: "Delivery & Growth",
    date: "Phase 5",
    content: "Final exports optimized for social media platforms with support to boost reach.\n\nWhy choose us: Proven results & viral growth focus.",
    category: "Delivery",
    icon: Clock,
    relatedIds: [4],
    status: "pending" as const,
    energy: 100,
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="py-12 px-4 md:py-20 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white text-center mb-8 md:mb-16">Our Work Process</h2>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>
    </section>
  );
}

