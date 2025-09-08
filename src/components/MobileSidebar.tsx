import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttons = [
    { name: 'SWITCHBOARD DOCS', url: 'https://docs.switchboard.xyz/', icon: '📚' },
    { name: 'SWITCHBOARD DISCORD', url: 'https://discord.gg/PQRxfYxV', icon: '💬' },
    { name: 'SWITCHBOARD EXPLORER', url: 'https://explorer.switchboardlabs.xyz/', icon: '🔍' },
    { name: 'SWITCHBOARD WEBSITE', url: 'https://switchboard.xyz/', icon: '🌐' },
    { name: 'FOUNDATION TWITTER', url: 'https://x.com/SwitchboardFDN', icon: '🏛️' },
    { name: 'TWITTER', url: 'https://x.com/switchboardxyz', icon: '𝕏' },
    { name: 'ORACLE BENCHMARK', url: 'https://thepriceisright.xyz/', icon: '📊' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        className="fixed top-4 left-4 z-50 lg:hidden p-3 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/50"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div className="w-6 h-5 flex flex-col justify-between">
          <motion.span
            className="w-full h-0.5 bg-cyan-400 block"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 8 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-full h-0.5 bg-cyan-400 block"
            animate={{
              opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-full h-0.5 bg-cyan-400 block"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -8 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.div
              className="fixed left-0 top-0 bottom-0 w-72 bg-black/90 backdrop-blur-md border-r border-cyan-500/30 z-45 lg:hidden overflow-y-auto"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="pt-20 p-4">
                <div className="space-y-3">
                  {buttons.map((button, index) => (
                    <motion.a
                      key={button.name}
                      href={button.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        className="relative p-3 bg-black/60 rounded-lg border border-cyan-500/30 overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Hover glow */}
                        <motion.div
                          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                          style={{
                            background: 'radial-gradient(circle at center, rgba(0,255,255,0.1) 0%, transparent 70%)',
                          }}
                        />

                        <div className="flex items-center space-x-3 relative z-10">
                          <span className="text-2xl">{button.icon}</span>
                          <div className="flex-1">
                            <div
                              className="text-sm font-bold"
                              style={{
                                color: '#00ffff',
                                textShadow: '0 0 10px #00ffff',
                                fontFamily: '"Orbitron", monospace',
                              }}
                            >
                              {button.name}
                            </div>
                          </div>
                          <motion.div
                            className="text-cyan-400"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.div>
                        </div>

                        {/* Bottom accent line */}
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                          initial={{ width: '0%' }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileSidebar;