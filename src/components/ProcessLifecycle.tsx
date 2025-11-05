import { motion, AnimatePresence } from 'motion/react';
import { Circle, Play, Pause, Clock, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProcessLifecycle() {
  const [activeState, setActiveState] = useState(0);

  const states = [
    {
      name: 'START',
      mongolian: 'Эхлэх төлөв',
      color: '#FFFFFF',
      icon: Play,
      description:
        'Процессийг анх үүсгэх буюу ажиллуулж эхлэх үед "эхлэх" төлөвт ордог. Энэ нь процесс системийн санах ойд ачаалагдаж, эхлэхэд бэлтгэгдэж буй үе юм.',
      position: { x: '50%', y: '10%' },
    },
    {
      name: 'READY',
      mongolian: 'Бэлэн төлөв',
      color: '#FFD700',
      icon: Clock,
      description:
        'Процесс CPU буюу процессорт хуваарилагдахаар хүлээж буй төлөв. Бэлэн төлөвт байгаа процесс нь үйлдлийн системээс CPU олгохыг хүлээдэг.',
      position: { x: '20%', y: '35%' },
    },
    {
      name: 'RUNNING',
      mongolian: 'Ажиллаж буй төлөв',
      color: '#00FF88',
      icon: Circle,
      description:
        'Үйлдлийн системийн төлөвлөгч процессорт процессыг оноосны дараа процессын төлөв "running" болж, энэ үед процессийн зааврууд CPU дээр гүйцэтгэгдэж, бодит үйлдлүүд хийгдэж байдаг.',
      position: { x: '50%', y: '50%' },
    },
    {
      name: 'WAITING',
      mongolian: 'Хүлээж буй төлөв',
      color: '#FF8800',
      icon: Pause,
      description:
        'Процесс ямар нэгэн нөөц (жишээ нь хэрэглэгчийн оролт, файл нээгдэхийг хүлээх гэх мэт)-ийг хүлээх шаардлагатай бол энэ төлөвт ордог.',
      position: { x: '80%', y: '35%' },
    },
    {
      name: 'TERMINATED',
      mongolian: 'Дууссан төлөв',
      color: '#FF0044',
      icon: XCircle,
      description:
        'Процесс ажиллаж дууссаны дараа, эсвэл үйлдлийн систем түүнийг зогсоосны дараа "terminated" төлөвт шилждэг.',
      position: { x: '50%', y: '85%' },
    },
  ];

  const transitions = [
    { from: 0, to: 1, label: 'Initialize' },
    { from: 1, to: 2, label: 'Dispatched' },
    { from: 2, to: 1, label: 'Preempted' },
    { from: 2, to: 3, label: 'I/O Request' },
    { from: 3, to: 1, label: 'I/O Complete' },
    { from: 2, to: 4, label: 'Exit' },
  ];

  const [currentTransition, setCurrentTransition] = useState(0);
  const [travelingParticle, setTravelingParticle] = useState<{ 
    x: number; 
    y: number; 
    color: string;
    targetX: number;
    targetY: number;
    targetColor: string;
    isAnimating: boolean;
  } | null>(null);

  useEffect(() => {
    const cycle = () => {
      const transition = transitions[currentTransition];
      const fromState = states[transition.from];
      const toState = states[transition.to];
      
      // Set active state to from
      setActiveState(transition.from);
      
      // Calculate path for traveling particle
      const fromX = parseFloat(fromState.position.x);
      const fromY = parseFloat(fromState.position.y);
      const toX = parseFloat(toState.position.x);
      const toY = parseFloat(toState.position.y);
      
      // Start particle at from state
      setTravelingParticle({
        x: fromX,
        y: fromY,
        color: fromState.color,
        targetX: toX,
        targetY: toY,
        targetColor: toState.color,
        isAnimating: true,
      });
      
      // After animation, update to target state
      setTimeout(() => {
        setActiveState(transition.to);
        setTravelingParticle((prev) => prev ? {
          ...prev,
          x: prev.targetX,
          y: prev.targetY,
          color: prev.targetColor,
          isAnimating: false,
        } : null);
      }, 2000);
      
      // Move to next transition
      setTimeout(() => {
        setTravelingParticle(null);
        setCurrentTransition((prev) => (prev + 1) % transitions.length);
      }, 3500);
    };
    
    const interval = setInterval(cycle, 4000);
    cycle(); // Initial call
    
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTransition]);

  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl mb-2 text-[#00F0FF]">1.3. Процессын амьдралын цикл</h1>
          <p className="text-[#B0C4DE]">
            Процесс ажиллах үедээ хэд хэдэн төлвөөр дамждаг.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* State Diagram */}
          <div>
            <h3 className="text-xl mb-6 text-center text-[#00F0FF]">
              Зураг 2. Process Lifecycle
            </h3>

            <div className="relative aspect-square rounded-lg border border-[#00F0FF]/30 bg-[#1A1F3A]/30 p-8">
              {/* Draw transition lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3, 0 6" fill="#00F0FF" opacity="0.5" />
                  </marker>
                </defs>
                {transitions.map((trans, i) => {
                  const from = states[trans.from];
                  const to = states[trans.to];
                  return (
                    <g key={i}>
                      <motion.line
                        x1={from.position.x}
                        y1={from.position.y}
                        x2={to.position.x}
                        y2={to.position.y}
                        stroke="#00F0FF"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        opacity="0.3"
                        markerEnd="url(#arrowhead)"
                        animate={{
                          strokeDashoffset: [0, -10],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Traveling particle along path */}
              {travelingParticle && (
                <motion.div
                  className="absolute w-4 h-4 rounded-full pointer-events-none"
                  style={{
                    backgroundColor: travelingParticle.color,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                  animate={{
                    left: `${travelingParticle.isAnimating ? travelingParticle.targetX : travelingParticle.x}%`,
                    top: `${travelingParticle.isAnimating ? travelingParticle.targetY : travelingParticle.y}%`,
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      `0 0 10px ${travelingParticle.color}`,
                      `0 0 20px ${travelingParticle.color}`,
                      `0 0 10px ${travelingParticle.color}`,
                    ],
                  }}
                  transition={{
                    left: { duration: 2, ease: 'easeInOut' },
                    top: { duration: 2, ease: 'easeInOut' },
                    scale: { duration: 0.5, repeat: Infinity },
                    boxShadow: { duration: 0.5, repeat: Infinity },
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: travelingParticle.color,
                      filter: 'blur(8px)',
                    }}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              )}

              {/* State nodes */}
              <div className="relative w-full h-full" style={{ zIndex: 2 }}>
                {states.map((state, i) => (
                  <motion.div
                    key={state.name}
                    className="absolute"
                    style={{
                      left: state.position.x,
                      top: state.position.y,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    {/* Glow effect for active state */}
                    {activeState === i && (
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          backgroundColor: state.color,
                          filter: 'blur(20px)',
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    )}

                    {/* State node */}
                    <motion.div
                      className="relative w-24 h-24 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer"
                      style={{
                        borderColor: state.color,
                        backgroundColor:
                          activeState === i
                            ? `${state.color}40`
                            : `${state.color}10`,
                      }}
                      animate={{
                        scale: activeState === i ? [1, 1.1, 1] : 1,
                        boxShadow:
                          activeState === i
                            ? `0 0 30px ${state.color}80`
                            : `0 0 10px ${state.color}30`,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      onClick={() => {
                        setActiveState(i);
                        setTravelingParticle(null);
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <state.icon
                        className="w-6 h-6 mb-1"
                        style={{ color: state.color }}
                      />
                      <div
                        className="text-xs text-center"
                        style={{ color: state.color }}
                      >
                        {state.name}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 p-4 rounded-lg bg-[#1A1F3A]/50 border border-[#00F0FF]/20">
              <h4 className="text-sm text-[#00F0FF] mb-3">Transitions:</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#B0C4DE]">
                {transitions.map((trans, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#00F0FF] rounded-full" />
                    <span>
                      {states[trans.from].name} → {states[trans.to].name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* State Descriptions */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeState}
                className="p-6 rounded-lg border-2 bg-[#1A1F3A]/50"
                style={{
                  borderColor: states[activeState].color,
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const StateIcon = states[activeState].icon;
                    return (
                      <StateIcon
                        className="w-8 h-8"
                        style={{ color: states[activeState].color }}
                      />
                    );
                  })()}
                  <div>
                    <h3
                      className="text-2xl"
                      style={{ color: states[activeState].color }}
                    >
                      {states[activeState].name}
                    </h3>
                    <p className="text-sm text-[#B0C4DE]">
                      {states[activeState].mongolian}
                    </p>
                  </div>
                </div>
                <p className="text-[#B0C4DE] leading-relaxed">
                  {states[activeState].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* All states list */}
            <div className="space-y-2">
              {states.map((state, i) => (
                <motion.button
                  key={state.name}
                  className="w-full p-3 rounded-lg border text-left transition-all"
                  style={{
                    borderColor:
                      activeState === i ? state.color : `${state.color}30`,
                    backgroundColor:
                      activeState === i ? `${state.color}20` : `${state.color}05`,
                  }}
                  onClick={() => setActiveState(i)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: state.color }}
                      />
                      <span className="text-sm" style={{ color: state.color }}>
                        {state.name}
                      </span>
                    </div>
                    <span className="text-xs text-[#B0C4DE]">
                      {state.mongolian}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
