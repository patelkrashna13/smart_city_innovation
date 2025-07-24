import { useEffect, useState } from 'react';

const Preloader = () => {
  const [titleOpacity, setTitleOpacity] = useState(0);

  useEffect(() => {
    const opacityTimer = setInterval(() => {
      setTitleOpacity(prev => Math.min(1, prev + 0.1));
    }, 300);
    return () => {
      clearInterval(opacityTimer);
    };
  }, []);

  // Always render the preloader when mounted
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-500">
      <div className="relative w-[70vw] h-[70vh] flex flex-col items-center justify-center">
        <svg
          className="w-full h-full transform-gpu animate-float"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ perspective: '1000px' }}
        >
          {/* Pulse Lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              className={`animate-pulse delay-${i * 100} transform-gpu hover:scale-105 transition-transform`}
              d={`M ${20 + i * 15} 50 Q ${30 + i * 15} ${30 + (i % 2) * 40} ${40 + i * 15} 50`}
              stroke="url(#pulseGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
          <defs>
            <linearGradient
              id="pulseGradient"
              x1="0"
              y1="0"
              x2="100"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00ff87" />
              <stop offset="0.5" stopColor="#60efff" />
              <stop offset="1" stopColor="#00ff87" />
            </linearGradient>
          </defs>
        </svg>
        <div 
          className="absolute text-[10rem] font-bold tracking-widest text-white animate-text-glow"
          style={{ 
            opacity: titleOpacity,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s ease-out'
          }}
        >
          UrbanX
        </div>
      </div>
      <style jsx>{`
        @keyframes glow {
          0% { opacity: 0.3; filter: blur(0px); transform: scale(0.95) rotateY(0deg); }
          50% { opacity: 1; filter: blur(2px); transform: scale(1.05) rotateY(180deg); }
          100% { opacity: 0.3; filter: blur(0px); transform: scale(0.95) rotateY(360deg); }
        }
        @keyframes float {
          0% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-20px) rotateX(10deg); }
          100% { transform: translateY(0px) rotateX(0deg); }
        }
        @keyframes text-glow {
          0% { filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3)); }
          50% { filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.6)); }
          100% { filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3)); }
        }
        .animate-glow {
          animation: glow 3s infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }
        .delay-0 { animation-delay: 0s; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default Preloader;
