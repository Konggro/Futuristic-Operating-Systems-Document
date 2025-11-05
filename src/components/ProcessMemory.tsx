import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ArrowUp, ArrowUpDown, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProcessMemory() {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [stackFrames, setStackFrames] = useState<number[]>([]);
  const [heapAllocations, setHeapAllocations] = useState<Array<{ id: number; size: number; x: number; y: number; width: number; height: number }>>([]);
  const [programCounter, setProgramCounter] = useState(0); // PC for TEXT segment
  // Stack animation: LIFO (Last In First Out) - Stack grows downward
  useEffect(() => {
    if (activeSegment === 'STACK') {
      setStackFrames([]); // Reset when starting
      let frameCounter = 0;
      // Push frames onto stack (LIFO - newest on top)
      const pushInterval = setInterval(() => {
        frameCounter++;
        setStackFrames((prev) => [Date.now() + frameCounter, ...prev]); // Add to front (top of stack)
      }, 2000);
      
      // Pop frames from stack after they've been there for a while
      const popInterval = setInterval(() => {
        setStackFrames((prev) => {
          if (prev.length > 0) {
            return prev.slice(1); // Remove from front (pop from top)
          }
          return prev;
        });
      }, 4000);
      
      return () => {
        clearInterval(pushInterval);
        clearInterval(popInterval);
        setStackFrames([]); // Clear when stopping
      };
    } else if (activeSegment !== 'STACK') {
      setStackFrames([]); // Clear when not STACK
    }
  }, [activeSegment]);

  // Heap animation: Arbitrary allocation/deallocation order (not LIFO/FIFO)
  useEffect(() => {
    if (activeSegment === 'HEAP') {
      setHeapAllocations([]); // Reset when starting
      let allocId = 0;
      
      // Allocate memory blocks of varying sizes
      const allocInterval = setInterval(() => {
        allocId++;
        const newAlloc = {
          id: Date.now() + allocId,
          size: Math.random() * 30 + 15, // Size for display
          x: Math.random() * 70 + 5, // Random position (heap fragmentation)
          y: Math.random() * 50 + 5,
          width: Math.random() * 40 + 20, // Width of block
          height: Math.random() * 30 + 15, // Height of block
        };
        setHeapAllocations((prev) => [...prev, newAlloc]);
        
        // Random deallocation - not always the newest (shows heap fragmentation)
        if (Math.random() > 0.3 && prev.length > 0) {
          setTimeout(() => {
            setHeapAllocations((current) => {
              // Randomly deallocate an existing block (not necessarily newest)
              const randomIndex = Math.floor(Math.random() * current.length);
              return current.filter((_, idx) => idx !== randomIndex);
            });
          }, Math.random() * 3000 + 2000);
        }
      }, 2000);
      
      return () => {
        clearInterval(allocInterval);
        setHeapAllocations([]); // Clear when stopping
      };
    } else if (activeSegment !== 'HEAP') {
      setHeapAllocations([]); // Clear when not HEAP
    }
  }, [activeSegment]);

  // TEXT segment: Program Counter (PC) moves sequentially through instructions
  useEffect(() => {
    if (activeSegment === 'TEXT') {
      setProgramCounter(0); // Reset PC when starting
      const interval = setInterval(() => {
        setProgramCounter((prev) => (prev + 1) % 6); // Cycle through 6 instructions
      }, 1500); // Execute each instruction for 1.5s
      return () => clearInterval(interval);
    } else if (activeSegment !== 'TEXT') {
      setProgramCounter(0); // Reset when not TEXT
    }
  }, [activeSegment]);

  const memorySegments = [
    {
      name: 'STACK',
      color: '#00FFFF',
      description: 'Түр зуурын өгөгдөл',
      details: '(method/function parameters, return address, local variables)',
      icon: ArrowDown,
      animate: 'down',
    },
    {
      name: 'HEAP',
      color: '#9D00FF',
      description: 'Динамик санах ой',
      details: '(програм гүйцэтгэгдэх явцад үүсэх болон устах өгөгдлүүд)',
      icon: ArrowUpDown,
      animate: 'both',
    },
    {
      name: 'DATA',
      color: '#00FF88',
      description: 'Глобал болон статик хувьсагчид',
      details: '(програмын ажиллах хугацаанд тогтвортой хадгалагдах мэдээлэл)',
      icon: Lock,
      animate: 'static',
    },
    {
      name: 'TEXT',
      color: '#00F0FF',
      description: 'Програмын код',
      details: '(гүйцэтгэгдэх заавар)',
      icon: ArrowUp,
      animate: 'code',
    },
  ];

  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl mb-2 text-[#00F0FF]">1.2. Санах ой дахь процесс</h1>
          <p className="text-[#B0C4DE]">
            Програмыг санах ойд байршуулж, процесс болгон ажиллуулах үед тухайн процессыг
            дөрвөн үндсэн хэсэгт хувааж үздэг.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 3D Memory Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="sticky top-24">
              <h3 className="text-xl mb-6 text-center text-[#00F0FF]">
                Зураг 1. Санах ой дахь процесс
              </h3>
              
              {/* Memory Stack Container */}
              <div className="relative">
                {/* Address labels */}
                <div className="absolute -right-24 top-0 text-xs text-[#B0C4DE]">
                  High Memory
                </div>
                <div className="absolute -right-24 bottom-0 text-xs text-[#B0C4DE]">
                  Low Memory
                </div>

                {/* Memory segments */}
                <div className="space-y-1">
                  {memorySegments.map((segment, i) => (
                    <motion.div
                      key={segment.name}
                      className="relative h-32 rounded-lg border-2 backdrop-blur-sm overflow-hidden cursor-pointer"
                      style={{
                        borderColor: segment.color,
                        backgroundColor: `${segment.color}10`,
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                      whileHover={{
                        boxShadow: `0 0 30px ${segment.color}40`,
                        scale: 1.02,
                      }}
                      onClick={() => setActiveSegment(activeSegment === segment.name ? null : segment.name)}
                    >


                      {/* Content */}
                      <div className="relative h-full flex items-center justify-between px-6">
                        <div className="flex items-center gap-4">
                          <segment.icon
                            className="w-8 h-8"
                            style={{ color: segment.color }}
                          />
                          <div>
                            <h4 className="text-xl" style={{ color: segment.color }}>
                              {segment.name}
                            </h4>
                            <p className="text-white text-sm">{segment.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details Panel */}
          <div className="space-y-6">
            {memorySegments.map((segment, i) => (
              <motion.div
                key={segment.name}
                className="p-6 rounded-lg border bg-[#1A1F3A]/50 cursor-pointer"
                style={{
                  borderColor: `${segment.color}30`,
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.2 }}
                whileHover={{
                  borderColor: `${segment.color}80`,
                }}
                onClick={() => setActiveSegment(activeSegment === segment.name ? null : segment.name)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: segment.color }}
                    animate={{
                      scale: [1, 1.3],
                      opacity: [0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                      repeatType: 'reverse',
                    }}
                  />
                  <h3 className="text-xl" style={{ color: segment.color }}>
                    {segment.name} Segment
                  </h3>
                </div>

                <p className="text-[#B0C4DE] text-sm mb-3">{segment.details}</p>

                {/* Interactive demo button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    setActiveSegment(activeSegment === segment.name ? null : segment.name);
                  }}
                  className={`mt-4 w-full py-2 px-4 rounded text-sm transition-all ${
                    activeSegment === segment.name
                      ? 'bg-[#00F0FF]/20 border-2 border-[#00F0FF] text-[#00F0FF]'
                      : 'bg-[#0A0E27]/50 border border-[#00F0FF]/30 text-[#B0C4DE] hover:border-[#00F0FF]/50'
                  }`}
                >
                  {activeSegment === segment.name ? '⏹ Зогсоох' : '▶ Анимаци эхлүүлэх'}
                </button>
                
                {/* Animation preview area - the green circled box */}
                <div className="mt-4 p-4 rounded-lg bg-[#0A0E27]/50 border-2 border-[#00FF88]/30 min-h-[180px] relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {/* Instructions text - shown when not animating */}
                    {activeSegment !== segment.name && (
                      <motion.div
                        key={`instructions-${segment.name}`}
                        className="absolute inset-0 flex items-center justify-center p-4 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-xs text-[#B0C4DE] text-center leading-relaxed">
                          {segment.name === 'STACK' &&
                            'Function calls appear as glowing boxes pushing down. Parameters pop in with scale animation.'}
                          {segment.name === 'HEAP' &&
                            'Memory bubbles expand (allocation) and contract (deallocation). Dynamic memory requests shown as pulsing orbs.'}
                          {segment.name === 'DATA' &&
                            'Static variables glow with persistent light. Global variables highlighted with constant illumination.'}
                          {segment.name === 'TEXT' &&
                            'Binary code scrolls continuously. Instruction pointer highlights current execution line.'}
                        </p>
                      </motion.div>
                    )}

                    {/* STACK: Function calls as glowing boxes pushing down, parameters pop in */}
                    {segment.name === 'STACK' && activeSegment === 'STACK' && (
                      <motion.div
                        key="stack-animation"
                        className="relative h-full w-full z-20"
                        style={{ height: '100%', minHeight: '150px' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                      <AnimatePresence>
                        {stackFrames.length > 0 ? stackFrames.slice(0, 4).map((frameId, idx) => {
                          // Stack grows downward: top frame (idx=0) is most recent (top of stack)
                          // Stack pointer moves down as stack grows
                          return (
                            <motion.div
                              key={frameId}
                              className="absolute left-0 right-0 rounded-lg border-2"
                              style={{
                                borderColor: segment.color,
                                backgroundColor: `${segment.color}25`,
                                top: `${idx * 38 + 5}px`, // Stack grows DOWN from top
                                height: '35px',
                                boxShadow: `0 0 15px ${segment.color}50`,
                              }}
                              initial={{ opacity: 0, y: -50, scale: 0.5 }}
                              animate={{ 
                                opacity: 1, 
                                y: 0, 
                                scale: 1,
                                boxShadow: `0 0 25px ${segment.color}70`,
                              }}
                              exit={{ opacity: 0, y: -30, scale: 0.7 }} // Pop upward (opposite of push)
                              transition={{ 
                                duration: 0.5,
                                type: 'spring',
                                stiffness: 200,
                              }}
                            >
                              {/* Glow effect */}
                              <motion.div
                                className="absolute inset-0 rounded-lg"
                                style={{
                                  backgroundColor: segment.color,
                                  filter: 'blur(6px)',
                                  opacity: 0.4,
                                }}
                                animate={{
                                  opacity: [0.3, 0.5],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatType: 'reverse',
                                }}
                              />
                              <div className="relative z-10 text-xs font-bold text-center pt-1.5" style={{ color: segment.color }}>
                                {idx === 0 ? '← SP (Stack Pointer)' : ''} func_{stackFrames.length - idx}()
                              </div>
                              {/* Parameters pop in with scale animation */}
                              <div className="relative z-10 flex gap-1.5 justify-center mt-0.5">
                                {[0, 1].map((paramIdx) => (
                                  <motion.div
                                    key={paramIdx}
                                    className="w-3 h-3 rounded border"
                                    style={{
                                      borderColor: segment.color,
                                      backgroundColor: `${segment.color}40`,
                                    }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ 
                                      scale: 1,
                                      opacity: 1,
                                    }}
                                    transition={{
                                      delay: 0.4 + paramIdx * 0.15,
                                      type: 'spring',
                                      stiffness: 400,
                                      damping: 15,
                                    }}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          );
                        }) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[#00F0FF] text-xs">
                            Waiting for function calls...
                          </div>
                        )}
                      </AnimatePresence>
                      </motion.div>
                    )}

                    {/* HEAP: Memory bubbles expand (allocation) and contract (deallocation), pulsing orbs */}
                    {segment.name === 'HEAP' && activeSegment === 'HEAP' && (
                      <motion.div
                        key="heap-animation"
                        className="relative h-full w-full z-20"
                        style={{ height: '100%', minHeight: '150px' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                      <AnimatePresence>
                        {heapAllocations.length > 0 ? heapAllocations.map((alloc) => (
                          <motion.div
                            key={alloc.id}
                            className="absolute rounded border-2"
                            style={{
                              width: `${alloc.width}px`,
                              height: `${alloc.height}px`,
                              left: `${alloc.x}%`,
                              top: `${alloc.y}%`,
                              borderColor: segment.color,
                              backgroundColor: `${segment.color}30`,
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                              scale: 1, // Expand on allocation
                              opacity: 0.8,
                            }}
                            exit={{ 
                              scale: 0, // Contract on deallocation
                              opacity: 0,
                            }}
                            transition={{ 
                              duration: 0.6,
                              ease: [0.34, 1.56, 0.64, 1],
                            }}
                          >
                            {/* Memory block label */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[8px] font-mono" style={{ color: segment.color }}>
                                {Math.round(alloc.width * alloc.height / 10)}B
                              </span>
                            </div>
                            {/* Allocation indicator */}
                            <motion.div
                              className="absolute top-0 left-0 w-2 h-2 rounded-full"
                              style={{ backgroundColor: segment.color }}
                              animate={{
                                opacity: [0.5, 1],
                                scale: [1, 1.2],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: 'reverse',
                              }}
                            />
                          </motion.div>
                        )) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[#9D00FF] text-xs">
                            Waiting for memory allocations...
                          </div>
                        )}
                      </AnimatePresence>
                      {/* Dynamic memory requests indicator */}
                      {heapAllocations.length > 0 && (
                        <motion.div
                          className="absolute bottom-2 right-2 text-[10px] px-2 py-1 rounded border z-30"
                          style={{ 
                            borderColor: segment.color, 
                            backgroundColor: `${segment.color}20`,
                            color: segment.color,
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          {heapAllocations.length} active
                        </motion.div>
                      )}
                      </motion.div>
                    )}

                    {/* DATA: Static variables glow with persistent light, global variables highlighted */}
                    {segment.name === 'DATA' && activeSegment === 'DATA' && (
                      <motion.div
                        key="data-animation"
                        className="relative h-full w-full z-20"
                        style={{ height: '100%', minHeight: '150px' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                      {/* Persistent glow background */}
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        animate={{
                          boxShadow: [
                            `inset 0 0 20px ${segment.color}40`,
                            `inset 0 0 40px ${segment.color}70`,
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          repeatType: 'reverse',
                        }}
                      />
                      {/* Global/Static variables - initialized at program start, persistent */}
                      <div className="relative grid grid-cols-2 gap-2 p-2">
                        {[
                          { name: 'globalVar', value: 42, type: 'int' },
                          { name: 'staticVar', value: 100, type: 'int' },
                        ].map((varInfo, idx) => (
                          <motion.div
                            key={varInfo.name}
                            className="rounded border-2 p-2"
                            style={{
                              borderColor: segment.color,
                              backgroundColor: `${segment.color}20`,
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              boxShadow: [
                                `0 0 10px ${segment.color}50`,
                                `0 0 20px ${segment.color}80`,
                              ],
                            }}
                            transition={{
                              delay: idx * 0.2,
                              duration: 0.5,
                              boxShadow: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: 'reverse',
                              },
                            }}
                          >
                            <div className="text-[9px] font-mono mb-1" style={{ color: segment.color }}>
                              {varInfo.name}
                            </div>
                            <div className="text-[8px] text-[#B0C4DE] mb-1">
                              {varInfo.type}
                            </div>
                            {/* Value - constant (persistent) */}
                            <motion.div
                              className="text-[10px] font-bold text-center"
                              style={{ color: segment.color }}
                              animate={{
                                opacity: [0.9, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: 'reverse',
                              }}
                            >
                              = {varInfo.value}
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                      {/* Constant illumination overlay */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none rounded-lg"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${segment.color}25 0%, transparent 70%)`,
                        }}
                        animate={{
                          opacity: [0.4, 0.6],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      />
                      </motion.div>
                    )}

                    {/* TEXT: Binary code scrolls continuously, instruction pointer highlights current line */}
                    {segment.name === 'TEXT' && activeSegment === 'TEXT' && (
                      <motion.div
                        key="text-animation"
                        className="relative h-full w-full font-mono text-[10px] overflow-hidden z-20"
                        style={{ height: '100%', minHeight: '150px' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                      {[
                        'MOV R1, #42',
                        'ADD R2, R1, R3',
                        'CMP R2, #100',
                        'JMP label_loop',
                        'STORE R2, [R4]',
                        'RET',
                      ].map((instruction, lineIndex) => {
                        const isCurrentLine = lineIndex === programCounter;
                        return (
                          <motion.div
                            key={lineIndex}
                            className="absolute left-0 right-0 h-6 flex items-center px-2"
                            style={{
                              top: `${lineIndex * 22 + 5}px`,
                            }}
                          >
                            {/* Instruction pointer (PC) - moves sequentially */}
                            <motion.div
                              className="absolute left-0 w-1 h-full z-10"
                              style={{
                                backgroundColor: isCurrentLine ? segment.color : 'transparent',
                                boxShadow: isCurrentLine ? `0 0 8px ${segment.color}` : 'none',
                                opacity: isCurrentLine ? 1 : 0,
                              }}
                              animate={{
                                opacity: isCurrentLine ? [0.8, 1] : 0,
                              }}
                              transition={{
                                duration: 0.3,
                              }}
                            >
                              {isCurrentLine && (
                                <motion.div
                                  className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor: segment.color,
                                    boxShadow: `0 0 8px ${segment.color}`,
                                  }}
                                  animate={{
                                    scale: [1, 1.3],
                                  }}
                                  transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                  }}
                                />
                              )}
                            </motion.div>
                            {/* Instruction text */}
                            <div 
                              className="absolute left-4 right-0 text-[9px] font-mono"
                              style={{
                                color: isCurrentLine ? segment.color : '#B0C4DE',
                                opacity: isCurrentLine ? 1 : 0.5,
                                fontWeight: isCurrentLine ? 'bold' : 'normal',
                              }}
                            >
                              {instruction}
                            </div>
                            {/* Execution highlight */}
                            {isCurrentLine && (
                              <motion.div
                                className="absolute inset-0 rounded"
                                style={{
                                  backgroundColor: `${segment.color}15`,
                                  borderLeft: `2px solid ${segment.color}`,
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              />
                            )}
                          </motion.div>
                        );
                      })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
