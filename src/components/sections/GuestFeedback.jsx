'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteRight, FaStar } from 'react-icons/fa';
import Section from '../ui/Section';
import { register } from 'swiper/element/bundle';

// Register Swiper as a web component
register();

const GuestFeedback = () => {
  // Guest reviews data
  const reviews = [
    {
      id: 1,
      name: 'Sarah',
      date: 'July 2024',
      rating: 5,
      text: 'Beautiful apartment with modern design. The white and cream aesthetic is perfect. Very clean and has all amenities needed!'
    },
    {
      id: 2,
      name: 'Joseph',
      date: 'June 2024',
      rating: 5,
      text: 'Perfect place for families. The kids loved the pool and we enjoyed the convenience of the kosher restaurants in the building.'
    },
    {
      id: 3,
      name: 'Michelle & Dan',
      date: 'May 2024',
      rating: 5,
      text: 'We spent a perfect weekend at Koosh Management Rental. The apartment is beautifully designed and the location is excellent.'
    },
    {
      id: 4,
      name: 'Cohen Family',
      date: 'April 2024',
      rating: 4,
      text: 'The hospitality was excellent and the apartment is equipped to a high standard. We really enjoyed our stay and the attractions in the area.'
    },
    {
      id: 5,
      name: 'Rebecca',
      date: 'March 2024',
      rating: 5,
      text: 'Clean, well-maintained and luxurious place. Jacob is an excellent host and takes care of every need. Highly recommended!'
    },
    {
      id: 6,
      name: 'Alex',
      date: 'February 2024',
      rating: 5,
      text: 'We came to celebrate a birthday. The apartment is spacious and well-equipped. The kitchen is perfect for cooking shared meals and the building amenities were excellent.'
    }
  ];
  
  // Reference to Swiper component
  const swiperRef = useRef(null);
  
  useEffect(() => {
    // Set Swiper parameters
    const swiperContainer = swiperRef.current;
    const params = {
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 3,
        }
      }
    };

    // Set parameters and initialize Swiper
    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i}
            className={i < rating ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  // Animation for review cards
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <Section 
      id="reviews" 
      title="Guest Reviews"
      subtitle="What our guests say about their stay at Koosh Management Rental"
      bgColor="bg-white"
    >
      <div className="relative w-full overflow-hidden py-8">
        <swiper-container 
          ref={swiperRef} 
          init="false"
          dir="ltr"
          class="w-full h-full"
        >
          {reviews.map((review) => (
            <swiper-slide key={review.id} class="h-auto p-4">
              <motion.div 
                className="bg-[#f8f5e6] rounded-xl shadow-lg p-6 h-full flex flex-col"
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="text-[#b19470] opacity-30 mb-3">
                  <FaQuoteRight size={24} />
                </div>
                
                <StarRating rating={review.rating} />
                
                <p className="text-gray-700 mb-4 flex-grow">"{review.text}"</p>
                
                <div className="flex items-center mt-auto">
                  <div className="flex-shrink-0 h-10 w-10 bg-[#b19470]/20 rounded-full flex items-center justify-center text-[#b19470] font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="text-gray-500 text-sm">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
      
      {/* Custom navigation buttons */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => swiperRef.current.swiper.slidePrev()}
          className="bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Previous review"
        >
          <span className="text-lg">‹</span>
        </button>
        <button
          onClick={() => swiperRef.current.swiper.slideNext()}
          className="bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Next review"
        >
          <span className="text-lg">›</span>
        </button>
      </div>
    </Section>
  );
};

export default GuestFeedback; 