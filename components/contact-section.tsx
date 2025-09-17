"use client"

import type React from "react"
import { useState } from "react"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Youtube, Mail, User, MessageSquare } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const testimonials = [
    {
      quote:
        "Working with Lumiere transformed our brand's visual storytelling. Their attention to detail and creative vision exceeded all expectations.",
      name: "Sarah Chen",
      designation: "Creative Director at Nexus Studios",
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "The cinematic quality and emotional depth they brought to our project was remarkable. Truly exceptional work.",
      name: "Michael Rodriguez",
      designation: "Producer at Visionary Films",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote: "Professional, creative, and delivered beyond our timeline. The final product speaks for itself.",
      name: "Emily Watson",
      designation: "Marketing Lead at Creative Co.",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ]

  const teamMembers = [
    {
      id: 1,
      name: "Alex Chen",
      designation: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      name: "Sarah Kim",
      designation: "Lead Editor",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      name: "Marcus Johnson",
      designation: "Cinematographer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 4,
      name: "Lisa Zhang",
      designation: "Motion Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ]

  const ProjectForm = () => (
    <div className="h-full flex flex-col bg-transparent p-6 rounded-lg border border-gray-800 text-black">
      <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col">
        <div className="grid grid-cols-1 gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white border-gray-300 text-black placeholder:text-gray-500"
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-white border-gray-300 text-black placeholder:text-gray-500"
            required
          />
        </div>
        <Textarea
          name="message"
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className="bg-white border-gray-300 text-black placeholder:text-gray-500 resize-none flex-1"
          required
        />
        <div className="flex flex-col gap-4 mt-auto">
          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
            Send Message
          </Button>
          <div className="flex items-center justify-center">
            <span className="text-gray-600 text-sm mr-3">Our Team:</span>
            <AnimatedTooltip items={teamMembers} />
          </div>
        </div>
      </form>
    </div>
  )

  const ConnectWithUs = () => (
    <div className="bg-transparent p-6 rounded-lg border border-gray-800 h-full flex flex-col text-black">
      <div className="flex flex-col h-full overflow-hidden">
        <h3 className="text-black font-semibold mb-4 text-lg">Connect With Us</h3>
        <div className="text-gray-700 text-sm mb-4 leading-relaxed space-y-1">
          <p>Contact: <span className="font-medium text-black">9901584053, 9901584693, 9902066873</span></p>
          <p>Email: <a href="mailto:lumiere.elevated@gmail.com" className="underline">lumiere.elevated@gmail.com</a></p>
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <a
            href="#"
            className="w-12 h-12 bg-black hover:bg-gray-900 text-white transition-colors duration-300 rounded-full flex items-center justify-center"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-black hover:bg-gray-900 text-white transition-colors duration-300 rounded-full flex items-center justify-center"
          >
            <Youtube className="w-5 h-5" />
          </a>
          <a
            href="mailto:lumiere.elevated@gmail.com"
            className="w-12 h-12 bg-black hover:bg-gray-900 text-white transition-colors duration-300 rounded-full flex items-center justify-center"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="space-y-3 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
            <span className="text-black text-sm font-medium">Free Consultation</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
            <span className="text-black text-sm font-medium">Custom Solutions</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
            <span className="text-black text-sm font-medium">24/7 Support</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
            <span className="text-black text-sm font-medium">Fast Delivery</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section id="contact" className="py-20">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-black mb-4">
              Let's Create <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-black">
                Together
              </span>
            </h1>
          </>
        }
      >
        <div className="w-full h-[120vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-600">
          <div className="p-8 max-w-7xl mx-auto text-black">
            <BentoGrid className="max-w-7xl mx-auto mb-8 grid-cols-1 md:grid-cols-2 gap-6">
              <BentoGridItem
                title="Start Your Project"
                description="Ready to bring your vision to life? Let's discuss your project and create something amazing together."
                header={<ProjectForm />}
                icon={<User className="h-4 w-4 text-neutral-500" />}
                className="md:row-span-2 bg-transparent border-gray-800"
              />
              <BentoGridItem
                title="Connect With Us"
                description="Follow our journey and stay updated with our latest work."
                header={<ConnectWithUs />}
                icon={<MessageSquare className="h-4 w-4 text-neutral-500" />}
                className="md:row-span-2 bg-transparent border-gray-800"
              />
            </BentoGrid>

            {/* Testimonials Section */}
            <div className="mt-8 bg-transparent border border-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-black mb-6 text-center">What Our Clients Say</h3>
              <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  )
}
