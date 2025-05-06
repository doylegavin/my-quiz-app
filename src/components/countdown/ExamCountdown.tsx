"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ExamCountdown() {
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  // Set the target date - June 4th, 2025 at 9:30am
  const targetDate = new Date('2025-06-04T09:30:00');

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Exams started or passed
        setDaysRemaining(0);
        return;
      }
      
      // Calculate precise days remaining (with decimals)
      const days = difference / (1000 * 60 * 60 * 24);
      setDaysRemaining(days);
    };
    
    // Calculate immediately on mount
    calculateTimeRemaining();
    
    // Set up interval to update frequently for smooth decimal changes
    // Update 10 times per second for smooth transition
    const timer = setInterval(calculateTimeRemaining, 100);
    
    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);
  
  // While server-side rendering, don't display the counter
  if (!mounted) return null;
  
  return (
    <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-4xl mx-auto shadow-inner">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center">
        Leaving Certificate Exam Countdown
      </h3>
      
      <div className="my-4">
        <div className="text-center">
          <div className="flex justify-center items-center flex-wrap">
            <span className="text-3xl md:text-5xl font-bold text-pink-600">
              {daysRemaining.toFixed(8)}
            </span>
            <span className="text-2xl md:text-4xl font-bold ml-2">days</span>
          </div>
          
          <p className="text-center text-gray-600 mt-4 px-2">
            Until Leaving Cert Exams Begin (June 4th, 2025 at 9:30am)
          </p>
        </div>
      </div>
    </div>
  );
} 