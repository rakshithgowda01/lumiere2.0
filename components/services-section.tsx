"use client"

import ScrollStack, { ScrollStackItem } from "./ui/scroll-stack"

const services = [
  {
    title: "Video Editing",
    description: "Professional video editing with cutting-edge techniques",
    details:
      "Transform raw footage into polished, engaging content with our expert video editing services. We use industry-standard software and techniques to create seamless transitions, color correction, audio enhancement, and visual effects that bring your vision to life.",
  },
  {
    title: "Social Media Reels",
    description: "Engaging short-form content for social platforms",
    details:
      "Create viral-worthy content with our social media reel production. We understand platform-specific requirements and trending formats to maximize engagement and reach across Instagram, TikTok, YouTube Shorts, and other social platforms.",
  },
  {
    title: "Marketing Campaigns",
    description: "Strategic video marketing solutions",
    details:
      "Develop comprehensive video marketing strategies that drive results. From brand storytelling to product demonstrations, we create compelling campaigns that connect with your target audience and achieve your business objectives.",
  },
  {
    title: "Brand Campaigns",
    description: "Cohesive brand storytelling across all touchpoints",
    details:
      "Build a strong brand presence with our comprehensive campaign services. We create consistent visual narratives that reinforce your brand identity and values across all marketing channels and customer touchpoints.",
  },
]

export default function ServicesSection() {
  const cardColors = [
    "bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800", // Dark grey gradient
    "bg-gradient-to-r from-blue-950 via-slate-900 to-gray-900", // Navy blue to grey
    "bg-gradient-to-r from-gray-900 via-blue-950 to-slate-900", // Grey to navy
    "bg-gradient-to-r from-slate-800 via-gray-800 to-blue-900", // Light grey to navy
  ]

  const infoBoxColors = [
    "bg-slate-800/80 border-gray-600/40",
    "bg-blue-950/80 border-slate-600/40",
    "bg-gray-800/80 border-blue-600/40",
    "bg-slate-700/80 border-gray-500/40",
  ]

  return (
    <section id="services" className="py-20">
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-center">Our Services</h2>
      </div>

      <ScrollStack className="max-w-6xl mx-auto">
        {services.map((service, index) => (
          <ScrollStackItem key={index}>
            <div
              className={`${cardColors[index % cardColors.length]} rounded-3xl p-12 backdrop-blur-sm shadow-2xl min-h-[400px] border border-gray-700/50`}
            >
              <div className="flex items-center justify-between h-full">
                {/* Left side - Title */}
                <div className="flex-1 pr-8">
                  <h3 className="text-5xl font-serif font-bold text-white leading-tight">{service.title}</h3>
                </div>

                {/* Right side - Info box */}
                <div className="flex-1 pl-8">
                  <div
                    className={`${infoBoxColors[index % infoBoxColors.length]} border-2 rounded-2xl p-8 backdrop-blur-sm`}
                  >
                    <div className="space-y-3 mb-6">
                      <div className="w-16 h-1 bg-gray-400/80 rounded"></div>
                      <div className="w-12 h-1 bg-gray-400/80 rounded"></div>
                      <div className="w-20 h-1 bg-gray-400/80 rounded"></div>
                    </div>
                    <p className="text-gray-200 text-lg leading-relaxed">{service.details}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}
