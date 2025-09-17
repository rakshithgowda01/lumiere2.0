"use client"
import { useState } from "react"
import { Stack } from "@/components/ui/stack"
import { motion } from "motion/react"

const teamMembers = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Creative Director",
    bio: "With over 8 years in video production, Alex leads our creative vision and ensures every project tells a compelling story.",
    avatar: "/professional-headshot-of-creative-director-in-mode.jpg",
    skills: ["Creative Direction", "Storytelling", "Brand Strategy"],
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "Sam Chen",
    role: "Lead Editor",
    bio: "Sam brings technical expertise and artistic flair to every edit, specializing in color grading and motion graphics.",
    avatar: "/professional-headshot-of-video-editor-with-editing.jpg",
    skills: ["Video Editing", "Color Grading", "Motion Graphics"],
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 3,
    name: "Jordan Taylor",
    role: "Social Media Specialist",
    bio: "Jordan creates viral-worthy content and understands the nuances of each social platform to maximize engagement.",
    avatar: "/professional-headshot-of-social-media-specialist-w.jpg",
    skills: ["Social Media", "Content Strategy", "Trend Analysis"],
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 4,
    name: "Casey Morgan",
    role: "Producer",
    bio: "Casey manages project timelines and client relationships, ensuring smooth production from concept to delivery.",
    avatar: "/professional-headshot-of-video-producer-in-product.jpg",
    skills: ["Project Management", "Client Relations", "Production Planning"],
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
]

export default function TeamSection() {
  const [activeTeamMember, setActiveTeamMember] = useState(0)

  const stackItems = teamMembers.map((member) => ({
    id: member.id,
    content: (
      <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        <img src={member.avatar || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
      </div>
    ),
  }))

  const currentMember = teamMembers[activeTeamMember]

  return (
    <section id="team" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-center mb-16">Meet Our Team</h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          <div className="flex-shrink-0">
            <Stack items={stackItems} onActiveChange={setActiveTeamMember} className="mx-auto" />
          </div>

          <div className="hidden lg:block w-px h-96 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          <motion.div
            key={activeTeamMember}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 max-w-lg text-center lg:text-left"
          >
            <div className="mb-6">
              <img
                src={currentMember.avatar || "/placeholder.svg"}
                alt={currentMember.name}
                className="w-24 h-24 rounded-full mx-auto lg:mx-0 object-cover border-2 border-slate-600"
              />
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-3xl font-serif font-bold text-white">{currentMember.name}</h3>
              <p className="text-xl text-blue-400 font-medium">{currentMember.role}</p>
              <p className="text-slate-300 leading-relaxed">{currentMember.bio}</p>

              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mt-4">
                {currentMember.skills.map((skill, index) => (
                  <span key={index} className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href={currentMember.social.linkedin}
                className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={currentMember.social.twitter}
                className="w-10 h-10 bg-slate-700 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
