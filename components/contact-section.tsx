"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Youtube, Mail, MessageCircle } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-center mb-16">
          Let's Create Together
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Start Your Project</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-input border-border text-white placeholder:text-muted-foreground"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-input border-border text-white placeholder:text-muted-foreground"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-input border-border text-white placeholder:text-muted-foreground resize-none"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <p className="text-secondary leading-relaxed">
                    Ready to bring your vision to life? We'd love to hear about your project and discuss how we can help
                    you create compelling video content that resonates with your audience.
                  </p>
                  <p className="text-secondary">
                    <strong className="text-white">Response Time:</strong> Within 24 hours
                  </p>
                  <p className="text-secondary">
                    <strong className="text-white">Project Timeline:</strong> 1-4 weeks depending on scope
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Follow Our Work</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-border hover:border-secondary hover:bg-secondary hover:text-black bg-transparent"
                    asChild
                  >
                    <a href="#" className="flex items-center gap-2">
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border hover:border-secondary hover:bg-secondary hover:text-black bg-transparent"
                    asChild
                  >
                    <a href="#" className="flex items-center gap-2">
                      <Youtube className="w-4 h-4" />
                      YouTube
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border hover:border-secondary hover:bg-secondary hover:text-black bg-transparent"
                    asChild
                  >
                    <a href="mailto:hello@lumiere.com" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border hover:border-secondary hover:bg-secondary hover:text-black bg-transparent"
                    asChild
                  >
                    <a href="#" className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
