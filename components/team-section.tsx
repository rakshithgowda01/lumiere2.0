"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Alex Rivera",
    role: "Creative Director",
    bio: "With over 8 years in video production, Alex leads our creative vision and ensures every project tells a compelling story.",
    avatar: "/professional-headshot-of-creative-director-in-mode.jpg",
    skills: ["Creative Direction", "Storytelling", "Brand Strategy"],
  },
  {
    name: "Sam Chen",
    role: "Lead Editor",
    bio: "Sam brings technical expertise and artistic flair to every edit, specializing in color grading and motion graphics.",
    avatar: "/professional-headshot-of-video-editor-with-editing.jpg",
    skills: ["Video Editing", "Color Grading", "Motion Graphics"],
  },
  {
    name: "Jordan Taylor",
    role: "Social Media Specialist",
    bio: "Jordan creates viral-worthy content and understands the nuances of each social platform to maximize engagement.",
    avatar: "/professional-headshot-of-social-media-specialist-w.jpg",
    skills: ["Social Media", "Content Strategy", "Trend Analysis"],
  },
  {
    name: "Casey Morgan",
    role: "Producer",
    bio: "Casey manages project timelines and client relationships, ensuring smooth production from concept to delivery.",
    avatar: "/professional-headshot-of-video-producer-in-product.jpg",
    skills: ["Project Management", "Client Relations", "Production Planning"],
  },
]

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  return (
    <section id="team" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-center mb-16">Meet Our Team</h2>

        {/* Game-style character selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className={`bg-card border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedMember === index
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border hover:border-secondary hover:shadow-lg hover:shadow-secondary/20"
              }`}
              onClick={() => setSelectedMember(selectedMember === index ? null : index)}
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-4 group">
                  <img
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="text-xs bg-secondary text-black px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected member details */}
        {selectedMember !== null && (
          <Card className="bg-card border-primary">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img
                  src={teamMembers[selectedMember].avatar || "/placeholder.svg"}
                  alt={teamMembers[selectedMember].name}
                  className="w-48 h-48 rounded-full object-cover"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-serif font-bold text-white mb-2">{teamMembers[selectedMember].name}</h3>
                  <p className="text-xl text-primary mb-4">{teamMembers[selectedMember].role}</p>
                  <p className="text-secondary leading-relaxed mb-6">{teamMembers[selectedMember].bio}</p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {teamMembers[selectedMember].skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-primary text-white px-4 py-2 rounded-full font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
