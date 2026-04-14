'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Section from '../ui/Section';
import Image from 'next/image';
import Skeleton from '../ui/Skeleton';

const images = [
  { url: '/images/v3/kitchen.avif', alt: 'Kitchen' },
  { url: '/images/v3/sofa.avif', alt: 'living room' },
  { url: '/images/v3/bedroom2.avif', alt: 'Bedroom Room' },
  { url: '/images/38acfcb3-bfa9-41e4-bc69-3ab0b6db18c4.avif', alt: 'living room' },
  { url: '/images/v3/bathroom.avif', alt: 'bathroom' },
  { url: '/images/v3/balcony.avif', alt: 'Balcony' },
  { url: '/images/v3/gym.avif', alt: 'Gym' },
  { url: '/images/v3/pool.avif', alt: 'Pool' },
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, []);

  // Auto-slide
  useEffect(() => {
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [goToNext]);
  

  return (
    <Section 
      id="gallery" 
      title="Gallery"
      subtitle="View our beautifully designed apartments at Griffin Project"
      bgColor="bg-[#f8f5e6]"
    >
      <div className={`
        relative overflow-hidden rounded-2xl shadow-xl
        w-full h-[300px] md:h-[500px]
      `}>
        
        {/* Images */}
        <div className="relative w-full h-full">
          {!imagesLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full" />
          )}
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === currentIndex ? 1 : 0,
                scale: index === currentIndex ? 1 : 1.1 
              }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  quality={75}
                  className="object-cover"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  onLoad={() => setImagesLoaded(true)}
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-white bg-opacity-50 p-3 rounded-full text-gray-800 hover:bg-opacity-70 transition-all"
          aria-label="Previous image"
        >
          <FaArrowLeft />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white bg-opacity-50 p-3 rounded-full text-gray-800 hover:bg-opacity-70 transition-all"
          aria-label="Next image"
        >
          <FaArrowRight />
        </button>
        
        {/* Thumbnails */}
        <div className="absolute gap-[3rem] bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-[#b19470] scale-125' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Grid Gallery */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-8 text-center text-[#b19470]">More Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {!imagesLoaded && (
            <>
              {[...Array(8)].map((_, index) => (
                <Skeleton key={index} className="aspect-square rounded-lg" />
              ))}
            </>
          )}
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setCurrentIndex(images.findIndex(image => image.url === img.url) !== -1 
                  ? images.findIndex(image => image.url === img.url) 
                  : 0);
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img.url}
                  alt={`Additional apartment image ${index + 1}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  quality={65}
                  className="object-cover"
                  onLoad={() => setImagesLoaded(true)}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Gallery; 