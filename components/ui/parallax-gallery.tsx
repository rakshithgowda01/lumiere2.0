"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ParallaxScrollProps {
  images?: string[];
  className?: string;
  onImageClick?: (image: string, index: number) => void;
}

const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  images = [],
  className,
  onImageClick,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10">
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }}
              key={"grid-1" + idx}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={el}
                className="h-80 w-full object-cover object-center rounded-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                height={400}
                width={400}
                alt="Gallery image"
                onClick={() => onImageClick?.(el, idx)}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div
              style={{ y: translateSecond }}
              key={"grid-2" + idx}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={el}
                className="h-80 w-full object-cover object-center rounded-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                height={400}
                width={400}
                alt="Gallery image"
                onClick={() => onImageClick?.(el, idx + firstPart.length)}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div
              style={{ y: translateThird }}
              key={"grid-3" + idx}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={el}
                className="h-80 w-full object-cover object-center rounded-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                height={400}
                width={400}
                alt="Gallery image"
                onClick={() => onImageClick?.(el, idx + firstPart.length + secondPart.length)}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const defaultImages = [
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1612801356940-8fdcde8aef61?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1529218402470-5dec8fea0761?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1604928141064-207cea6f571f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1542052125323-e69ad37a47c2?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1564284369929-026ba231f89b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1532236204992-f5e85c024202?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1493515322954-4fa727e97985?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1528361237150-8a9a7df33035?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1608875004752-2fdb6a39ba4c?auto=format&fit=crop&w=1600&q=80",
];

export default function ParallaxGalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % defaultImages.length;
    setSelectedIndex(nextIndex);
    setSelectedImage(defaultImages[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = selectedIndex === 0 ? defaultImages.length - 1 : selectedIndex - 1;
    setSelectedIndex(prevIndex);
    setSelectedImage(defaultImages[prevIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, selectedIndex]);

  return (
    <div className="bg-gray-950 h-screen overflow-hidden">
      <div className="py-10">
        <h1 className="text-6xl font-bold text-center text-white mb-16">Portfolio Gallery</h1>
        <ParallaxScroll images={defaultImages} onImageClick={handleImageClick} />
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.button
              className="absolute top-6 right-6 text-white hover:text-gray-300 z-60"
              onClick={handleCloseModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={32} />
            </motion.button>

            <motion.button
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-4xl z-60"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ‹
            </motion.button>

            <motion.button
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-4xl z-60"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ›
            </motion.button>

            <motion.img
              src={selectedImage}
              alt="Selected gallery image"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedIndex + 1} / {defaultImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


