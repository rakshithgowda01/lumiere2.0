"use client"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"

const content = [
  {
    title: "Creative Vision",
    description:
      "We start by understanding your unique story and creative goals. Through detailed consultations, we dive deep into your brand identity, target audience, and project objectives to create a foundation that guides every creative decision.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">👁️</div>
          <div className="text-xl font-semibold">Vision</div>
        </div>
      </div>
    ),
  },
  {
    title: "Precision Editing",
    description:
      "Our expert team brings your vision to life using cutting-edge technology and creative expertise. From color grading and audio enhancement to motion graphics and visual effects, every frame is crafted with precision and purpose.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">✂️</div>
          <div className="text-xl font-semibold">Edit</div>
        </div>
      </div>
    ),
  },
  {
    title: "Collaborative Review",
    description:
      "We believe in collaborative creativity. Through structured review cycles and open communication, we incorporate your feedback and refine the content iteratively until it perfectly matches your vision and exceeds expectations.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-xl font-semibold">Review</div>
        </div>
      </div>
    ),
  },
  {
    title: "Perfect Delivery",
    description:
      "We deliver your content in all required formats, optimized for your specific platforms and use cases. From high-resolution files for broadcast to compressed versions for social media, your content looks perfect everywhere.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🚀</div>
          <div className="text-xl font-semibold">Deliver</div>
        </div>
      </div>
    ),
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-center mb-16">Our Process</h2>
        <StickyScroll content={content} />
      </div>
    </section>
  )
}
