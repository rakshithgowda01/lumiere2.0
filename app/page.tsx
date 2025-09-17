import dynamic from "next/dynamic"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })
const HeroSection = dynamic(() => import("@/components/hero-section"), { ssr: false })
const AboutSection = dynamic(() => import("@/components/about-section"), { ssr: false })
const ServicesSection = dynamic(() => import("@/components/services-section"), { ssr: false })
const ReelsSection = dynamic(() => import("@/components/reels-section"), { ssr: false })
const GalleryShowcase = dynamic(() => import("@/components/ui/gallery-showcase").then(m => m.GalleryShowcase), { ssr: false })
const WorkSection = dynamic(() => import("@/components/work-section"), { ssr: false })
const TeamSection = dynamic(() => import("@/components/team-section"), { ssr: false })
const ContactSection = dynamic(() => import("@/components/contact-section"), { ssr: false })
const FooterSection = dynamic(() => import("@/components/footer-section"), { ssr: false })
const ScrollParallax = dynamic(() => import("@/components/ui/scroll-parallax").then(m => m.ScrollParallax), { ssr: false })
const Faq = dynamic(() => import("@/components/ui/faq-sections"), { ssr: false })

export default function Home() {
  const galleryPhotos = Array.from({ length: 74 }, (_, i) => {
    const n = i + 1
    return {
      id: n,
      // Use extensionless path; SmartImg in GalleryShowcase will try .jpg/.JPG/.png/.webp etc
      src: `/gallery/photo${n}`,
      title: `Photo ${n}`,
      description: "",
    }
  })
  return (
    <main className="min-h-screen">
      <Navbar />
      <ScrollParallax>
        <HeroSection />
      </ScrollParallax>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <ScrollParallax>
        <AboutSection />
      </ScrollParallax>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <ServicesSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <ScrollParallax>
        <ReelsSection />
      </ScrollParallax>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <ScrollParallax>
        <section id="gallery" className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white font-mono">Gallery Showcase</h2>
            </div>
            <GalleryShowcase photos={galleryPhotos} />
          </div>
        </section>
      </ScrollParallax>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <ScrollParallax>
        <WorkSection />
      </ScrollParallax>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <ScrollParallax>
        <TeamSection />
      </ScrollParallax>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <ScrollParallax>
        <ContactSection />
      </ScrollParallax>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* CTA: Schedule Consultation Call */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Schedule Consultation Call</h3>
          <p className="text-gray-400 mb-6">15min consultation call to know about our services and agency</p>
          <a
            href={process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/your-username/15min"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gray-200 text-black hover:bg-white transition-colors duration-200 font-medium"
          >
            Schedule Consultation Call
          </a>
        </div>
      </section>

      {/* FAQ section with no duplicate heading */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Faq />
        </div>
      </section>

      <ScrollParallax>
        <FooterSection />
      </ScrollParallax>
    </main>
  )
}
