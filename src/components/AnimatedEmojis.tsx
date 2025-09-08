import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AnimatedEmoji, CollisionEffect } from '../types';

const AnimatedEmojis: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [emojis, setEmojis] = useState<AnimatedEmoji[]>([]);
  const [collisionEffects, setCollisionEffects] = useState<CollisionEffect[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Initialize emojis with random positions and velocities - using more images
    const initialEmojis: AnimatedEmoji[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      imageIndex: i % 21, // Use all images 0-20 in sequence, then repeat
      position: {
        x: Math.random() * (window.innerWidth - 50),
        y: Math.random() * (window.innerHeight - 50),
      },
      velocity: {
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
      },
    }));
    setEmojis(initialEmojis);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      
      setEmojis(prevEmojis => {
        const newEmojis = [...prevEmojis];
        const newCollisions: CollisionEffect[] = [];

        // Update positions
        newEmojis.forEach((emoji) => {
          emoji.position.x += emoji.velocity.vx;
          emoji.position.y += emoji.velocity.vy;

          // Bounce off walls
          if (emoji.position.x <= 0 || emoji.position.x >= rect.width - 50) {
            emoji.velocity.vx *= -1;
            emoji.position.x = Math.max(0, Math.min(rect.width - 50, emoji.position.x));
          }
          if (emoji.position.y <= 0 || emoji.position.y >= rect.height - 50) {
            emoji.velocity.vy *= -1;
            emoji.position.y = Math.max(0, Math.min(rect.height - 50, emoji.position.y));
          }
        });

        // Check collisions
        for (let i = 0; i < newEmojis.length; i++) {
          for (let j = i + 1; j < newEmojis.length; j++) {
            const emoji1 = newEmojis[i];
            const emoji2 = newEmojis[j];
            const dx = emoji1.position.x - emoji2.position.x;
            const dy = emoji1.position.y - emoji2.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 50) { // Collision detected
              // Bounce emojis apart
              const angle = Math.atan2(dy, dx);
              const force = 2;
              
              emoji1.velocity.vx = Math.cos(angle) * force;
              emoji1.velocity.vy = Math.sin(angle) * force;
              emoji2.velocity.vx = -Math.cos(angle) * force;
              emoji2.velocity.vy = -Math.sin(angle) * force;

              // Add collision effect
              newCollisions.push({
                id: `${Date.now()}-${i}-${j}`,
                position: {
                  x: (emoji1.position.x + emoji2.position.x) / 2,
                  y: (emoji1.position.y + emoji2.position.y) / 2,
                },
                timestamp: Date.now(),
              });
            }
          }
        }

        if (newCollisions.length > 0) {
          setCollisionEffects(prev => [...prev, ...newCollisions]);
        }

        return newEmojis;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Clean up old collision effects
  useEffect(() => {
    const interval = setInterval(() => {
      setCollisionEffects(prev => 
        prev.filter(effect => Date.now() - effect.timestamp < 1000)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {emojis.map((emoji) => (
        <motion.div
          key={emoji.id}
          className="absolute floating-emoji"
          style={{
            left: emoji.position.x,
            top: emoji.position.y,
            width: 40 + (emoji.id % 3) * 15, // Varying sizes: 40px, 55px, 70px
            height: 40 + (emoji.id % 3) * 15,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <img
            src={`/images/${emoji.imageIndex}.png`}
            alt={`Emoji ${emoji.imageIndex}`}
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}

      <AnimatePresence>
        {collisionEffects.map((effect) => (
          <motion.div
            key={effect.id}
            className="absolute text-4xl font-bold text-cyber-cyan cyber-glow collision-text"
            style={{
              left: effect.position.x - 20,
              top: effect.position.y - 20,
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            DN
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedEmojis;