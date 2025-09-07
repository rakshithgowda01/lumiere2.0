"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

const projects = [
  {
    title: "Brand Campaign - Tech Startup",
    description: "A dynamic brand video showcasing innovation and growth",
    thumbnail: "/modern-tech-startup-office-with-dynamic-lighting.jpg",
    category: "Brand Campaign",
  },
  {
    title: "Product Launch - Fashion Brand",
    description: "Elegant product showcase with cinematic storytelling",
    thumbnail: "/luxury-fashion-product-photography-studio-setup.jpg",
    category: "Product Video",
  },
  {
    title: "Social Media Campaign - Restaurant",
    description: "Mouth-watering food content for social platforms",
    thumbnail: "/professional-food-photography-setup-with-appetizin.jpg",
    category: "Social Media",
  },
  {
    title: "Corporate Video - Finance Company",
    description: "Professional corporate storytelling and testimonials",
    thumbnail: "/modern-corporate-office-meeting-room-with-professi.jpg",
    category: "Corporate",
  },
]

export default function PortfolioSection() {
  const [currentProject, setCurrentProject] = useState(0)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-center mb-16">Our Portfolio</h2>

        {/* Main Carousel */}
        <div className="relative mb-8">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-0">
              <div className="relative group">
                <img
                  src={projects[currentProject].thumbnail || "/placeholder.svg"}
                  alt={projects[currentProject].title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/80"
                    onClick={() => setSelectedProject(currentProject)}
                  >
                    <Play className="w-6 h-6 mr-2" />
                    View Project
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{projects[currentProject].title}</h3>
                <p className="text-secondary mb-4">{projects[currentProject].description}</p>
                <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                  {projects[currentProject].category}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 border-secondary hover:bg-secondary hover:text-black"
            onClick={prevProject}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 border-secondary hover:bg-secondary hover:text-black"
            onClick={nextProject}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Project Thumbnails */}
        <div className="grid grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-300 ${
                index === currentProject ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-secondary"
              }`}
              onClick={() => setCurrentProject(index)}
            >
              <CardContent className="p-0">
                <img
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-24 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal for selected project */}
        {selectedProject !== null && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
            <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-white">{projects[selectedProject].title}</h3>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedProject(null)}
                    className="text-secondary hover:text-white"
                  >
                    ✕
                  </Button>
                </div>
                <img
                  src={projects[selectedProject].thumbnail || "/placeholder.svg"}
                  alt={projects[selectedProject].title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-secondary">{projects[selectedProject].description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
