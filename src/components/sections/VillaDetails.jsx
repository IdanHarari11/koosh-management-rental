'use client';

import { motion } from 'framer-motion';
import { FaBed, FaBath, FaUsers, FaSwimmingPool, FaUtensils, FaWifi, FaTemperatureHigh, FaDollarSign } from 'react-icons/fa';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Image from 'next/image';
import Skeleton from '../ui/Skeleton';
import { useState } from 'react';

const VillaDetails = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const units = [
    {
      name: 'Fully Furnished & Designed Apartment',
      image: '/images/v2/WhatsApp Image 2025-04-14 at 01.47.16 (1).jpeg',
      desc: 'Modern, White + Cream Aesthetic design, perfect for families & hi-tech professionals.',
      capacity: 6,
      bedrooms: 2,
      bathrooms: 1,
      features: [
        { icon: <FaBed />, text: '2 Bedrooms' },
        { icon: <FaBath />, text: 'Large Central Bathroom' },
        { icon: <FaUtensils />, text: 'Fully Equipped Kitchen' },
        { icon: <FaTemperatureHigh />, text: 'Climate Control' },
        { icon: <FaWifi />, text: 'Free WiFi' },
      ]
    },
  ];

  return (
    <Section 
      id="villa-details" 
      title="Our Apartments"
      subtitle="Fully Furnished, Fully Equipped, Modern Design"
      bgColor="bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-3xl mx-auto">
        {units.map((unit, index) => (
          <motion.div
            key={unit.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="h-full flex flex-col">
              <div className="relative h-64 mb-4 overflow-hidden rounded-xl">
                {!imagesLoaded && (
                  <Skeleton className="absolute inset-0 w-full h-full" />
                )}
                <Image 
                  src={unit.image} 
                  alt={unit.name} 
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={75}
                  onLoad={() => setImagesLoaded(true)}
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-[#b19470] shadow-md">
                  <div className="flex items-center gap-2">
                    <FaUsers />
                    <span>Up to {unit.capacity} people</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-[#b19470]">{unit.name}</h3>
              <p className="text-gray-600 mb-4">{unit.desc}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <FaBed className="text-[#b19470]" />
                  <span>{unit.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaBath className="text-[#b19470]" />
                  <span>{unit.bathrooms}</span>
                </div>
              </div>
              
              <div className="mt-auto">
                <h4 className="font-bold text-lg mb-2">Features Include:</h4>
                <ul className="space-y-2">
                  {unit.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#b19470]">{feature.icon}</span>
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default VillaDetails; 