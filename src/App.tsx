import { motion } from 'framer-motion';
import CountdownTimer from './components/CountdownTimer';
import AnimatedEmojis from './components/AnimatedEmojis';
import TicTacToe from './components/TicTacToe';
import MusicPlayer from './components/MusicPlayer';
import Sidebar from './components/Sidebar';
import MobileSidebar from './components/MobileSidebar';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0"
        style={{
          backgroundImage: 'url(/images/GzS1_ipa4AEyZPk.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.4) contrast(1.2)',
        }}
      />

      {/* Animated gradient overlay */}
      <motion.div 
        className="fixed inset-0"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(0,255,255,0.1) 0%, rgba(255,0,255,0.1) 100%)',
            'linear-gradient(135deg, rgba(255,0,255,0.1) 0%, rgba(0,255,255,0.1) 100%)',
            'linear-gradient(225deg, rgba(0,255,255,0.1) 0%, rgba(255,0,255,0.1) 100%)',
            'linear-gradient(315deg, rgba(255,0,255,0.1) 0%, rgba(0,255,255,0.1) 100%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Cyber grid overlay */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Animated Emojis Layer */}
      <AnimatedEmojis />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen p-4 overflow-x-hidden">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 lg:mb-6 px-2 pt-12 lg:pt-0"
        >
          <motion.div 
            className="text-xl lg:text-2xl mb-2 font-bold"
            animate={{
              textShadow: [
                '0 0 20px #00FFFF, 0 0 40px #00FFFF',
                '0 0 20px #FF00FF, 0 0 40px #FF00FF',
                '0 0 20px #00FFFF, 0 0 40px #00FFFF',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ color: '#00FFFF' }}
          >
            SWTCH/USD ?
          </motion.div>
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
            style={{
              background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 25%, #FFFF00 50%, #00FF00 75%, #00FFFF 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            9/9 ? SWITCHBOARD
          </motion.h1>
        </motion.header>

        {/* Main Layout - Perfectly Centered */}
        <div className="flex flex-col lg:flex-row w-full pt-16 lg:pt-0">
          {/* Left spacer for sidebar - exact width */}
          <div className="hidden lg:block" style={{ width: '200px' }}></div>
          
          {/* Main content area with equal spacing */}
          <div className="flex-1 flex flex-col lg:flex-row justify-center px-4">
            {/* Center - Countdown Timers with exact centering */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-1 max-w-4xl flex justify-center items-start mx-auto"
              style={{ 
                paddingLeft: '60px',  // Add padding to compensate for sidebar/right difference (320-200=120, /2=60)
                paddingRight: '0px' 
              }}
            >
              <CountdownTimer />
            </motion.div>

            {/* Right Side - Tic Tac Toe and Music Player */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-80 flex-shrink-0 ml-6"
            >
              <TicTacToe />
              {/* Music Player below Tic Tac Toe */}
              <div className="mt-6">
                <MusicPlayer />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated neon lines */}
        <svg className="fixed inset-0 pointer-events-none" style={{ opacity: 0.3, zIndex: 15 }}>
          <motion.line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="#00FFFF"
            strokeWidth="2"
            animate={{
              strokeDasharray: ['0 100%', '100% 0'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke="#FF00FF"
            strokeWidth="2"
            animate={{
              strokeDasharray: ['0 100%', '100% 0'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
              delay: 2,
            }}
          />
        </svg>

        {/* Floating Particles Effect */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 5 }}>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 10,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: -10,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${
                  ['#00FFFF', '#FF00FF', '#FFFF00', '#00FF00'][Math.floor(Math.random() * 4)]
                } 0%, transparent 70%)`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px ${
                  ['#00FFFF', '#FF00FF', '#FFFF00', '#00FF00'][Math.floor(Math.random() * 4)]
                }`,
              }}
            />
          ))}
        </div>

        {/* Animated corner decorations */}
        <motion.div
          className="fixed top-0 left-0 w-24 h-24 lg:w-32 lg:h-32 pointer-events-none" style={{ zIndex: 15 }}
          animate={{
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, #00FFFF 0%, transparent 50%)',
              opacity: 0.3,
            }}
          />
        </motion.div>

        <motion.div
          className="fixed bottom-0 right-0 w-24 h-24 lg:w-32 lg:h-32 pointer-events-none" style={{ zIndex: 15 }}
          animate={{
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, transparent 50%, #FF00FF 100%)',
              opacity: 0.3,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default App;