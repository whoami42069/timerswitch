import React from 'react';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const buttons = [
    { name: 'SWITCHBOARD DOCS', url: 'https://docs.switchboard.xyz/', icon: '📚' },
    { name: 'SWITCHBOARD DISCORD', url: 'https://discord.gg/PQRxfYxV', icon: '💬' },
    { name: 'SWITCHBOARD EXPLORER', url: 'https://explorer.switchboardlabs.xyz/', icon: '🔍' },
    { name: 'SWITCHBOARD WEBSITE', url: 'https://switchboard.xyz/', icon: '🌐' },
    { name: 'FOUNDATION TWITTER', url: 'https://x.com/SwitchboardFDN', icon: '🏛️' },
    { name: 'TWITTER', url: 'https://x.com/switchboardxyz', icon: '𝕏' },
    { name: 'ORACLE BENCHMARK', url: 'https://thepriceisright.xyz/', icon: '📊' },
  ];

  const containerVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="fixed left-0 top-1/2 -translate-y-1/2 p-2 lg:p-4"
      style={{ zIndex: 40 }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative">
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 -z-10 blur-3xl"
          animate={{
            background: [
              'radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(255,0,255,0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Scanline effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(transparent 50%, rgba(0,255,255,0.1) 50%)',
            backgroundSize: '100% 4px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '0px 10px'],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <div className="space-y-3">
          {buttons.map((button, index) => (
            <motion.a
              key={button.name}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative group"
              variants={buttonVariants}
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button container */}
              <div className="relative overflow-hidden rounded-lg">

                {/* Button content */}
                <div className="relative px-2 py-2 lg:px-4 lg:py-3 rounded-lg overflow-hidden"
                  style={{
                    background: 'rgba(0, 0, 0, 0.05)',
                    backdropFilter: 'blur(2px)',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.1)',
                  }}>
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(0,255,255,0.1) 0%, transparent 70%)',
                    }}
                  />

                  {/* Animated energy line */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [-100, 100],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  <div className="flex items-center space-x-3">
                    {/* Icon */}
                    <motion.span
                      className="text-lg lg:text-2xl"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.1,
                      }}
                    >
                      {button.icon}
                    </motion.span>

                    {/* Text */}
                    <div className="flex-1 hidden sm:block">
                      <motion.div
                        className="text-xs font-bold tracking-wider"
                        style={{
                          fontFamily: '"Orbitron", monospace',
                          color: 'rgba(0, 255, 255, 0.9)',
                          textShadow: '0 0 8px rgba(0, 0, 0, 0.8), 0 0 4px #00ffff',
                        }}
                      >
                        {button.name}
                      </motion.div>

                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      className="text-cyan-400 group-hover:text-magenta-400 transition-colors"
                      animate={{
                        x: [0, 3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.15,
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Bottom energy bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    initial={{ width: '0%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

            </motion.a>
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </motion.div>

        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        >
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-magenta-400 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;