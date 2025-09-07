"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const processSteps = [
  {
    title: "Vision",
    description: "Understanding your story and goals",
    details:
      "We begin every project by diving deep into your vision. Through detailed consultations, we understand your brand, target audience, and objectives. This foundation ensures that every creative decision aligns with your goals and resonates with your intended audience.",
    icon: "👁️",
    number: "01",
  },
  {
    title: "Edit",
    description: "Crafting your narrative with precision",
    details:
      "Our expert editors bring your story to life using cutting-edge technology and creative expertise. We handle everything from color grading and audio enhancement to motion graphics and visual effects, ensuring every frame serves your narrative purpose.",
    icon: "✂️",
    number: "02",
  },
  {
    title: "Review",
    description: "Collaborative refinement process",
    details:
      "We believe in collaborative creativity. Through structured review cycles, we incorporate your feedback and refine the content until it perfectly matches your vision. Our iterative approach ensures the final product exceeds your expectations.",
    icon: "🔍",
    number: "03",
  },
  {
    title: "Deliver",
    description: "Final delivery and optimization",
    details:
      "We deliver your content in all required formats, optimized for your specific platforms and use cases. From high-resolution files for broadcast to compressed versions for social media, we ensure your content looks perfect everywhere.",
    icon: "🚀",
    number: "04",
  },
]

export default function ProcessSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  return (
    <section id="process" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-center mb-16">Our Process</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-secondary transition-all duration-300 cursor-pointer relative overflow-hidden"
              onClick={() => setExpandedStep(expandedStep === index ? null : index)}
            >
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{step.icon}</div>
                <div className="text-4xl font-bold text-primary mb-2">{step.number}</div>
                <CardTitle className="text-white text-xl">{step.title}</CardTitle>
                <CardDescription className="text-secondary">{step.description}</CardDescription>
              </CardHeader>

              {expandedStep === index && (
                <CardContent className="pt-0">
                  <p className="text-secondary leading-relaxed text-sm">{step.details}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
