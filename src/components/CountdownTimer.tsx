import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Timezone } from '../types';

const timezones: Timezone[] = [
  { name: 'GMT', offset: 0, label: 'London' },
  { name: 'EST', offset: -5, label: 'New York' },
  { name: 'PST', offset: -8, label: 'Los Angeles' },
  { name: 'CST', offset: -6, label: 'Chicago' },
  { name: 'MST', offset: -7, label: 'Denver' },
  { name: 'WAT', offset: 1, label: 'Lagos' }, // Nigeria
  { name: 'CET', offset: 1, label: 'Paris' },
  { name: 'EET', offset: 2, label: 'Athens' },
  { name: 'MSK', offset: 3, label: 'Moscow' },
  { name: 'GST', offset: 4, label: 'Dubai' },
  { name: 'IST', offset: 5.5, label: 'Mumbai' },
  { name: 'BST', offset: 6, label: 'Dhaka' },
  { name: 'ICT', offset: 7, label: 'Bangkok' },
  { name: 'CST', offset: 8, label: 'Beijing' },
  { name: 'JST', offset: 9, label: 'Tokyo' },
  { name: 'KST', offset: 9, label: 'Seoul' },
  { name: 'AEST', offset: 10, label: 'Sydney' },
  { name: 'NZST', offset: 12, label: 'Auckland' },
  { name: 'BRT', offset: -3, label: 'São Paulo' },
  { name: 'ART', offset: -3, label: 'Buenos Aires' },
  { name: 'EST', offset: -5, label: 'Toronto' },
  { name: 'CST', offset: -6, label: 'Mexico City' },
  { name: 'SAST', offset: 2, label: 'Cape Town' },
  { name: 'SGT', offset: 8, label: 'Singapore' },
];

interface TimeUnit {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimezoneTime extends Timezone {
  time: TimeUnit;
  isPast: boolean;
}

const CountdownTimer: React.FC = () => {
  const targetDate = new Date('2025-09-09T00:00:00Z');
  const [timezoneData, setTimezoneData] = useState<TimezoneTime[]>([]);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      
      const newData = timezones.map(tz => {
        // Calculate the target date in the specific timezone
        const targetWithOffset = new Date(targetDate.getTime() - tz.offset * 60 * 60 * 1000);
        const difference = targetWithOffset.getTime() - now.getTime();
        const isPast = difference < 0;
        const absDifference = Math.abs(difference);
        
        const days = Math.floor(absDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((absDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((absDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((absDifference % (1000 * 60)) / 1000);
        
        return {
          ...tz,
          time: { days, hours, minutes, seconds },
          isPast
        };
      });
      
      setTimezoneData(newData);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <div className="w-full px-1 lg:px-2 py-3 lg:py-4">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-lg md:text-xl lg:text-2xl font-medium mb-4 lg:mb-6 text-center tracking-wider"
        style={{
          color: 'rgba(255, 255, 255, 0.95)',
          letterSpacing: '0.1em',
          textShadow: '0 0 10px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)',
        }}
      >
        GLOBAL COUNTDOWN • 9/9/2025
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-w-full lg:max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {timezoneData.map((tz) => (
          <motion.div
            key={`${tz.name}-${tz.label}`}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              transition: { duration: 0.2 }
            }}
            className="relative overflow-hidden rounded-lg p-2 group"
            style={{
              // ULTRA-TRANSPARENT: 95% transparent background
              background: 'rgba(0, 0, 0, 0.05)',
              // Minimal glass effect
              backdropFilter: 'blur(2px)',
              // Neon cyan holographic border
              border: '1px solid rgba(0, 255, 255, 0.3)',
              // No heavy shadows - just subtle neon glow
              boxShadow: '0 0 15px rgba(0, 255, 255, 0.1)',
            }}
          >
            {/* Enhanced hover glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
              }}
            />
            
            <div className="relative z-10">
              {/* City Name with enhanced readability */}
              <div className="mb-1">
                <h3 
                  className="text-xs font-semibold truncate"
                  style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    textShadow: '0 0 8px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {tz.label}
                </h3>
                <span 
                  className="text-[9px]"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textShadow: '0 0 6px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {tz.name}
                </span>
              </div>
              
              {/* Countdown Display */}
              <motion.div 
                key={`${tz.name}-${tz.time.seconds}`}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="space-y-1"
              >
                {/* Plus sign for elapsed time */}
                {tz.isPast && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center text-sm font-medium"
                    style={{ 
                      color: '#FF6B6B',
                      textShadow: '0 0 10px rgba(255, 107, 107, 0.5)',
                    }}
                  >
                    + ELAPSED
                  </motion.div>
                )}
                
                {/* Time Units Grid - NEON OUTLINE ONLY */}
                <div className="grid grid-cols-2 gap-0.5 text-center">
                  {/* Days & Hours */}
                  <div className="col-span-2 grid grid-cols-2 gap-0.5">
                    <div 
                      className="rounded p-0.5"
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(107, 182, 255, 0.4)',
                        boxShadow: '0 0 8px rgba(107, 182, 255, 0.2)',
                      }}
                    >
                      <div 
                        className="text-sm font-medium" 
                        style={{ 
                          color: tz.isPast ? '#FF6B6B' : '#6BB6FF',
                          textShadow: '0 0 8px rgba(0, 0, 0, 0.8), 0 0 4px currentColor',
                        }}
                      >
                        {String(tz.time.days).padStart(2, '0')}
                      </div>
                      <div 
                        className="text-[9px]"
                        style={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          textShadow: '0 0 6px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        D
                      </div>
                    </div>
                    <div 
                      className="rounded p-0.5"
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(183, 107, 255, 0.4)',
                        boxShadow: '0 0 8px rgba(183, 107, 255, 0.2)',
                      }}
                    >
                      <div 
                        className="text-sm font-medium" 
                        style={{ 
                          color: tz.isPast ? '#FF6B6B' : '#B76BFF',
                          textShadow: '0 0 8px rgba(0, 0, 0, 0.8), 0 0 4px currentColor',
                        }}
                      >
                        {String(tz.time.hours).padStart(2, '0')}
                      </div>
                      <div 
                        className="text-[9px]"
                        style={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          textShadow: '0 0 6px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        H
                      </div>
                    </div>
                  </div>
                  
                  {/* Minutes & Seconds */}
                  <div 
                    className="rounded p-0.5"
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 107, 255, 0.4)',
                      boxShadow: '0 0 8px rgba(255, 107, 255, 0.2)',
                    }}
                  >
                    <div 
                      className="text-xs font-medium" 
                      style={{ 
                        color: tz.isPast ? '#FF6B6B' : '#FF6BFF',
                        textShadow: '0 0 8px rgba(0, 0, 0, 0.8), 0 0 4px currentColor',
                      }}
                    >
                      {String(tz.time.minutes).padStart(2, '0')}
                    </div>
                    <div 
                      className="text-[9px]"
                      style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        textShadow: '0 0 6px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      M
                    </div>
                  </div>
                  <div 
                    className="rounded p-0.5"
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(107, 255, 107, 0.4)',
                      boxShadow: '0 0 8px rgba(107, 255, 107, 0.2)',
                    }}
                  >
                    <div 
                      className="text-xs font-medium" 
                      style={{ 
                        color: tz.isPast ? '#FF6B6B' : '#6BFF6B',
                        textShadow: '0 0 8px rgba(0, 0, 0, 0.8), 0 0 4px currentColor',
                      }}
                    >
                      {String(tz.time.seconds).padStart(2, '0')}
                    </div>
                    <div 
                      className="text-[9px]"
                      style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        textShadow: '0 0 6px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      S
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Holographic corner accent */}
            <div 
              className="absolute top-0 right-0 w-6 h-6"
              style={{
                background: 'linear-gradient(45deg, transparent 50%, rgba(0, 255, 255, 0.2) 50%)',
              }}
            />
            
            {/* Enhanced hover accent line */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: 'linear-gradient(90deg, transparent, #00FFFF, transparent)',
                boxShadow: '0 0 10px #00FFFF',
              }}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Enhanced Legend and Disclaimer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-6 space-y-2"
      >
        <div 
          className="text-[11px]"
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
          }}
        >
          All times synchronized to September 9, 2025, 00:00 GMT
        </div>
        <div 
          className="text-[11px] font-medium"
          style={{
            color: 'rgba(255, 193, 7, 0.8)',
            textShadow: '0 0 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(255, 193, 7, 0.5)',
          }}
        >
          ⚡ Timer updates with each news announcement
        </div>
      </motion.div>
    </div>
  );
};

export default CountdownTimer;