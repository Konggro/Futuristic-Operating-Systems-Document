import { motion, AnimatePresence } from 'motion/react';
import { GitBranch, Layers, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ThreadIntro() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [threadProgress, setThreadProgress] = useState<{ [key: number]: number }>({});

  // Thread execution animation
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setThreadProgress((prev) => {
          const newProgress = { ...prev };
          [0, 1, 2].forEach((i) => {
            newProgress[i] = ((newProgress[i] || 0) + Math.random() * 5) % 100;
          });
          return newProgress;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setThreadProgress({});
    }
  }, [isAnimating]);
  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl mb-2 text-[#00F0FF]">4.1. Thread гэж юу вэ?</h1>
          <p className="text-[#B0C4DE] mb-8">
            Thread нь процессын кодоор дамжих гүйцэтгэлийн урсгал юм.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Process with Threads Visualization */}
          <motion.div
            className="relative p-8 rounded-lg border-2 border-[#00F0FF] bg-[#1A1F3A]/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl text-center text-[#00F0FF] mb-6">
              Зураг 9. Process with Multiple Threads
            </h3>

            {/* Shared Resources */}
            <motion.div
              className="mb-6 p-4 rounded-lg border border-[#9D00FF]/50 bg-[#9D00FF]/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-5 h-5 text-[#9D00FF]" />
                <h4 className="text-[#9D00FF]">SHARED RESOURCES</h4>
              </div>
              <div className="text-xs text-[#B0C4DE] space-y-1">
                <div>• Code Segment</div>
                <div>• Data Segment</div>
                <div>• Open Files</div>
                <div>• Heap Memory</div>
              </div>
            </motion.div>

            {/* Control Button */}
            <div className="mb-4 flex justify-center">
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className="px-4 py-2 rounded-lg bg-[#00FF88]/20 border border-[#00FF88] text-[#00FF88] text-sm hover:bg-[#00FF88]/30 transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                {isAnimating ? 'Зогсоох' : 'Зэрэгцээ ажиллагаа эхлүүлэх'}
              </button>
            </div>

            {/* Threads */}
            <div className="grid grid-cols-3 gap-4">
              {['Thread 1', 'Thread 2', 'Thread 3'].map((thread, i) => (
                <motion.div
                  key={i}
                  className="p-4 rounded-lg border-2 border-[#00FF88] bg-[#00FF88]/10 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.2 }}
                >
                  {/* Execution progress bar */}
                  {isAnimating && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-[#00FF88]"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${threadProgress[i] || 0}%`,
                      }}
                      transition={{
                        duration: 0.1,
                        ease: 'linear',
                      }}
                    />
                  )}

                  <div className="flex justify-center mb-2 relative z-10">
                    <motion.div
                      animate={{
                        rotate: isAnimating ? 360 : 0,
                        scale: isAnimating ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 1, repeat: Infinity },
                      }}
                    >
                      <GitBranch className="w-6 h-6 text-[#00FF88]" />
                    </motion.div>
                  </div>
                  <div className="text-center text-sm text-[#00FF88] mb-2 relative z-10">{thread}</div>
                  <div className="text-xs text-[#B0C4DE] space-y-1 relative z-10">
                    <div>• PC: {isAnimating ? '0x' + (0x400000 + i * 0x1000).toString(16) : '0x00000000'}</div>
                    <div>• Registers: {isAnimating ? 'Active' : 'Idle'}</div>
                    <div>• Stack: {isAnimating ? 'Growing' : 'Empty'}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Shared Resource Access Animation */}
            {isAnimating && (
              <motion.div
                className="mt-4 p-3 rounded-lg border border-[#9D00FF]/50 bg-[#9D00FF]/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-xs text-[#B0C4DE] text-center">
                  Shared resources accessed: {Math.floor(Date.now() / 500) % 3 + 1}
                </div>
                <div className="flex gap-1 justify-center mt-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#9D00FF]"
                      animate={{
                        opacity: [(i + 1) % 3 === Math.floor(Date.now() / 500) % 3 ? 1 : 0.3, 1, 0.3],
                        scale: [(i + 1) % 3 === Math.floor(Date.now() / 500) % 3 ? 1.5 : 1, 1, 1.5],
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Connecting lines */}
            <svg className="absolute inset-0 pointer-events-none">
              {[0, 1, 2].map((i) => (
                <motion.line
                  key={i}
                  x1="50%"
                  y1="35%"
                  x2={`${33 + i * 33}%`}
                  y2="65%"
                  stroke="#9D00FF"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
                />
              ))}
            </svg>
          </motion.div>

          {/* Thread execution animation */}
          {isAnimating && (
            <motion.div
              className="mb-6 p-4 rounded-lg border border-[#00FF88]/30 bg-[#00FF88]/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-sm text-[#00FF88] mb-2 text-center">Зэрэгцээ ажиллагаа</div>
              <div className="flex gap-2 justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-16 h-8 rounded border-2 flex items-center justify-center text-xs font-mono"
                    style={{
                      borderColor: '#00FF88',
                      backgroundColor: '#00FF8820',
                    }}
                    animate={{
                      backgroundColor: [
                        '#00FF8820',
                        '#00FF8860',
                        '#00FF8820',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    T{i + 1}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Content */}
          <div className="space-y-6">
            <motion.div
              className="p-6 rounded-lg bg-[#1A1F3A]/50 border border-[#00F0FF]/20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[#B0C4DE] leading-relaxed">
                Thread нь процессын кодоор дамжих гүйцэтгэлийн урсгал юм. Энэ нь дараагийн ямар
                зааврыг гүйцэтгэхийг хянаж байдаг програмын тоолуур (program counter), тухайн
                үеийн ажиллаж буй хувьсагчдыг хадгалдаг системийн бүртгэлүүд (system registers),
                мөн гүйцэтгэлийн түүхийг хадгалдаг стак (stack) гэсэн өөрийн гэсэн нөөцүүдтэй
                байдаг.
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-lg bg-[#1A1F3A]/50 border border-[#00FF88]/20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl text-[#00FF88] mb-4">Урсгалын давуу талууд:</h3>
              <ul className="space-y-2 text-sm text-[#B0C4DE]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00FF88]">✓</span>
                  Context switching хугацааг багасгадаг
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00FF88]">✓</span>
                  Процесс дотор зэрэгцээ ажиллагааг хангадаг
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00FF88]">✓</span>
                  Харилцаа холбоо илүү үр ашигтай
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00FF88]">✓</span>
                  Урсгалыг үүсгэх ба шилжүүлэхэд хэмнэлттэй
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00FF88]">✓</span>
                  Олон процессорт системийг бүрэн ашиглах боломж
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="p-6 rounded-lg bg-[#9D00FF]/10 border border-[#9D00FF]/30"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="text-center">
                <div className="text-3xl text-[#9D00FF] mb-2">Process vs Thread</div>
                <div className="text-sm text-[#B0C4DE]">
                  Process creation: ~10ms | Thread creation: ~1ms
                </div>
                <motion.div
                  className="mt-4 h-2 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
