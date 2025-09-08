import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Start as playing
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Autoplay on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      // Try to play audio automatically
      audioRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
        setIsPlaying(false);
      });
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="p-4 rounded-xl"
      style={{
        background: 'rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(2px)',
        border: '1px solid rgba(0, 255, 255, 0.3)',
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.1)',
      }}
    >
      <h3 className="text-lg font-bold mb-3 text-cyber-cyan cyber-glow">
        Background Music
      </h3>
      
      <audio
        ref={audioRef}
        loop
        src="https://www.bensound.com/bensound-music/bensound-littleidea.mp3"
      />

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-pink flex items-center justify-center text-white hover:from-cyber-pink hover:to-cyber-purple transition-all duration-300"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </motion.button>

        <div className="flex-1 flex items-center gap-2">
          <svg className="w-4 h-4 text-cyber-cyan" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #00FFFF 0%, #00FFFF ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
            }}
          />
          <svg className="w-5 h-5 text-cyber-cyan" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <motion.div
        animate={isPlaying ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.5 }}
        transition={isPlaying ? { duration: 2, repeat: Infinity } : {}}
        className="mt-3 text-xs text-cyber-purple text-center"
      >
        {isPlaying ? 'Playing...' : 'Paused'}
      </motion.div>
    </motion.div>
  );
};

export default MusicPlayer;