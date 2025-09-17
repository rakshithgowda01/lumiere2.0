"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, 
  Share2, 
  TrendingUp, 
  Megaphone, 
  Globe, 
  Monitor,
  X,
  ArrowRight,
  Calendar,
  Instagram,
  MessageCircle,
  Mail
} from "lucide-react";

// Utils function
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  benefits: string[];
  process: string[];
  pricing: string;
  deliverables: string[];
}

interface ServiceCardProps {
  service: ServiceData;
  isActive: boolean;
  onClick: () => void;
}

interface ServiceDialogProps {
  service: ServiceData | null;
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: (serviceName: string) => void;
}

interface CalendarDialogProps {
  serviceName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isActive, onClick }) => {
  return (
    <motion.div
      layoutId={`card-${service.id}`}
      onClick={onClick}
      className={cn(
        "relative flex h-36 w-80 cursor-pointer select-none flex-col justify-between rounded-xl border-2 bg-gray-900/70 backdrop-blur-sm px-6 py-4 transition-all duration-300",
        "hover:border-blue-400/50 hover:bg-gray-900/90 hover:shadow-lg",
        isActive ? "border-blue-400 bg-gray-900" : "border-gray-700"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-blue-400/10 p-2">
          {service.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{service.title}</h3>
          <p className="text-sm text-gray-400 line-clamp-2">{service.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Click to learn more</span>
        <ArrowRight className="h-4 w-4 text-blue-400" />
      </div>
    </motion.div>
  );
};

const CalendarDialog: React.FC<CalendarDialogProps> = ({ serviceName, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="relative w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl border border-gray-700"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full bg-gray-800/80 p-2 hover:bg-gray-800 transition-colors text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8">
                <div className="text-center mb-6">
                  <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Book a Call for {serviceName}
                  </h2>
                  <p className="text-gray-400">
                    Connect with us in more ways for fast response
                  </p>
                </div>

                <div className="flex justify-center gap-6 mb-8">
                  <a href="#" className="p-3 bg-pink-600 rounded-full hover:bg-pink-700 transition-colors">
                    <Instagram className="h-6 w-6 text-white" />
                  </a>
                  <a href="#" className="p-3 bg-green-600 rounded-full hover:bg-green-700 transition-colors">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </a>
                  <a href="#" className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                    <Mail className="h-6 w-6 text-white" />
                  </a>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="grid grid-cols-7 gap-2 text-center">
                    <div className="text-gray-400 text-sm font-medium">Mon</div>
                    <div className="text-gray-400 text-sm font-medium">Tue</div>
                    <div className="text-gray-400 text-sm font-medium">Wed</div>
                    <div className="text-gray-400 text-sm font-medium">Thu</div>
                    <div className="text-gray-400 text-sm font-medium">Fri</div>
                    <div className="text-gray-400 text-sm font-medium">Sat</div>
                    <div className="text-gray-400 text-sm font-medium">Sun</div>
                    
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 6;
                      return (
                        <button
                          key={i}
                          className={`h-8 w-8 rounded text-sm transition-colors ${
                            day > 0 && day <= 31
                              ? 'text-white hover:bg-blue-600 hover:text-white'
                              : 'text-gray-600'
                          }`}
                        >
                          {day > 0 && day <= 31 ? day : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Key Points to Know About Your Consultation</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      Free 30-minute consultation to discuss your project needs
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      Detailed proposal and timeline within 24 hours
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      No obligation - explore options at your own pace
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      Expert advice on best strategies for your goals
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <a 
                    href="https://cal.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Schedule Consultation
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const ServiceDialog: React.FC<ServiceDialogProps> = ({ service, isOpen, onClose, onGetStarted }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              layoutId={`card-${service.id}`}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-gray-900 rounded-2xl shadow-2xl border border-gray-700"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full bg-gray-800/80 p-2 hover:bg-gray-800 transition-colors text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-full bg-blue-400/10 p-3">
                    {service.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{service.title}</h2>
                    <p className="text-lg text-gray-400 mt-1">{service.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Key Features</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 text-gray-300"
                          >
                            <div className="w-2 h-2 bg-blue-400 rounded-full" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Benefits</h3>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="flex items-center gap-2 text-gray-300"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            {benefit}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Our Process</h3>
                      <div className="space-y-3">
                        {service.process.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                            className="flex items-start gap-3"
                          >
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <p className="text-gray-300">{step}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Deliverables</h3>
                      <ul className="space-y-2">
                        {service.deliverables.map((deliverable, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.7 }}
                            className="flex items-center gap-2 text-gray-300"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            {deliverable}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mt-6"
                >
                  <a 
                    href="https://cal.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Get Started
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedServiceForCalendar, setSelectedServiceForCalendar] = useState<string>('');

  const services: ServiceData[] = [
    {
      id: "video-editing",
      title: "Video Editing",
      description: "Professional video editing services for all your content needs",
      icon: <Video className="h-6 w-6 text-blue-400" />,
      features: [
        "Professional color grading",
        "Motion graphics and animations",
        "Audio enhancement and mixing",
        "Multi-format export options",
        "Fast turnaround times"
      ],
      benefits: [
        "Increased engagement rates",
        "Professional brand image",
        "Time-saving for your team",
        "Consistent quality output",
        "Cost-effective solution"
      ],
      process: [
        "Initial consultation and brief",
        "Raw footage review and planning",
        "Editing and post-production",
        "Client review and revisions",
        "Final delivery in desired formats"
      ],
      pricing: "Starting from $299",
      deliverables: [
        "Edited video in HD/4K quality",
        "Multiple format exports",
        "Source files and project files",
        "Thumbnail designs",
        "Usage rights documentation"
      ]
    },
    {
      id: "social-media-reels",
      title: "Social Media Reels",
      description: "Engaging short-form content for Instagram, TikTok, and YouTube Shorts",
      icon: <Share2 className="h-6 w-6 text-blue-400" />,
      features: [
        "Trending format optimization",
        "Platform-specific editing",
        "Engaging transitions and effects",
        "Hashtag and caption suggestions",
        "Performance analytics setup"
      ],
      benefits: [
        "Viral content potential",
        "Increased follower growth",
        "Better algorithm reach",
        "Enhanced brand visibility",
        "Higher engagement rates"
      ],
      process: [
        "Content strategy discussion",
        "Trend research and planning",
        "Content creation and editing",
        "Optimization for each platform",
        "Publishing and performance tracking"
      ],
      pricing: "Starting from $149",
      deliverables: [
        "Platform-optimized reels",
        "Engaging captions and hashtags",
        "Thumbnail variations",
        "Publishing schedule",
        "Performance metrics setup"
      ]
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to grow your business",
      icon: <TrendingUp className="h-6 w-6 text-blue-400" />,
      features: [
        "SEO optimization",
        "Social media management",
        "PPC advertising campaigns",
        "Content marketing strategy",
        "Analytics and reporting"
      ],
      benefits: [
        "Increased online visibility",
        "Higher conversion rates",
        "Better ROI on ad spend",
        "Targeted audience reach",
        "Data-driven decisions"
      ],
      process: [
        "Market research and analysis",
        "Strategy development",
        "Campaign implementation",
        "Monitoring and optimization",
        "Reporting and insights"
      ],
      pricing: "Starting from $999/month",
      deliverables: [
        "Comprehensive marketing strategy",
        "Campaign setup and management",
        "Monthly performance reports",
        "Competitor analysis",
        "Optimization recommendations"
      ]
    },
    {
      id: "brand-campaigns",
      title: "Brand & Marketing Campaigns",
      description: "Creative campaigns that build brand awareness and drive results",
      icon: <Megaphone className="h-6 w-6 text-blue-400" />,
      features: [
        "Brand identity development",
        "Creative campaign concepts",
        "Multi-channel execution",
        "Influencer partnerships",
        "Campaign performance tracking"
      ],
      benefits: [
        "Stronger brand recognition",
        "Consistent brand messaging",
        "Increased market share",
        "Customer loyalty building",
        "Competitive advantage"
      ],
      process: [
        "Brand audit and research",
        "Creative concept development",
        "Campaign planning and design",
        "Multi-channel execution",
        "Results analysis and optimization"
      ],
      pricing: "Starting from $2,499",
      deliverables: [
        "Complete brand guidelines",
        "Campaign creative assets",
        "Implementation timeline",
        "Performance tracking setup",
        "Post-campaign analysis"
      ]
    },
    {
      id: "landing-pages",
      title: "Brand/Product Landing Pages",
      description: "High-converting landing pages that turn visitors into customers",
      icon: <Globe className="h-6 w-6 text-blue-400" />,
      features: [
        "Conversion-optimized design",
        "Mobile-responsive layouts",
        "A/B testing setup",
        "Analytics integration",
        "SEO optimization"
      ],
      benefits: [
        "Higher conversion rates",
        "Better user experience",
        "Improved search rankings",
        "Faster loading times",
        "Mobile-friendly design"
      ],
      process: [
        "Requirements gathering",
        "Wireframing and design",
        "Development and testing",
        "Launch and optimization",
        "Performance monitoring"
      ],
      pricing: "Starting from $1,299",
      deliverables: [
        "Fully responsive landing page",
        "Analytics setup",
        "SEO optimization",
        "Performance testing",
        "Maintenance documentation"
      ]
    },
    {
      id: "website-making",
      title: "Website Development",
      description: "Custom websites that represent your brand and drive business growth",
      icon: <Monitor className="h-6 w-6 text-blue-400" />,
      features: [
        "Custom design and development",
        "Content management system",
        "E-commerce integration",
        "Security and performance optimization",
        "Ongoing maintenance support"
      ],
      benefits: [
        "Professional online presence",
        "Scalable architecture",
        "Enhanced user experience",
        "Better search visibility",
        "Increased credibility"
      ],
      process: [
        "Discovery and planning",
        "Design and prototyping",
        "Development and testing",
        "Launch and deployment",
        "Training and support"
      ],
      pricing: "Starting from $2,999",
      deliverables: [
        "Fully functional website",
        "Content management system",
        "SEO optimization",
        "Security setup",
        "Training and documentation"
      ]
    }
  ];

  const handleServiceClick = (service: ServiceData) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const handleGetStarted = (serviceName: string) => {
    setSelectedServiceForCalendar(serviceName);
    setIsDialogOpen(false);
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
    setSelectedServiceForCalendar('');
  };

  const handleBookConsultation = () => {
    setSelectedServiceForCalendar('General Consultation');
    setIsCalendarOpen(true);
  };

  return (
    <section id="services" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive digital solutions to elevate your brand and drive business growth. 
            Click on any service to learn more about what we offer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceCard
                service={service}
                isActive={selectedService?.id === service.id}
                onClick={() => handleServiceClick(service)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <a 
            href="https://cal.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <Calendar className="h-5 w-5" />
            Book a Consultation Call
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </a>
        </motion.div>
      </div>

      <ServiceDialog
        service={selectedService}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onGetStarted={handleGetStarted}
      />

      <CalendarDialog
        serviceName={selectedServiceForCalendar}
        isOpen={isCalendarOpen}
        onClose={handleCloseCalendar}
      />
    </section>
  );
}