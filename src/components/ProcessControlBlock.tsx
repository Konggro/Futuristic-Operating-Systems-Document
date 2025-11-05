import { motion, AnimatePresence } from 'motion/react';
import { Database, Hash, MapPin, FileText, Cpu, HardDrive, FolderOpen, Play, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProcessControlBlock() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadedFields, setLoadedFields] = useState<Set<number>>(new Set());
  const [showContextSwitch, setShowContextSwitch] = useState(false);
  // Data population animation
  useEffect(() => {
    if (isAnimating) {
      setLoadedFields(new Set());
      pcbFields.forEach((_, i) => {
        setTimeout(() => {
          setLoadedFields((prev) => new Set([...prev, i]));
        }, i * 300);
      });
    } else {
      setLoadedFields(new Set(pcbFields.map((_, i) => i)));
    }
  }, [isAnimating]);

  const pcbFields = [
    { icon: MapPin, name: 'Заагч (Pointer)', desc: 'Stack pointer хадгалах', color: '#00F0FF' },
    { icon: Database, name: 'Процессын төлөв', desc: 'New/Ready/Running/Waiting/Exit', color: '#FFD700' },
    { icon: Hash, name: 'Процессын дугаар (PID)', desc: 'Давтагдашгүй дугаар', color: '#00FF88' },
    { icon: MapPin, name: 'Програмын тоолуур', desc: 'Дараагийн зааврын хаяг', color: '#9D00FF' },
    { icon: Cpu, name: 'Бүртгэгчид', desc: 'CPU бүртгэгчийн утгууд', color: '#FF8800' },
    { icon: HardDrive, name: 'Санах ойн хязгаарууд', desc: 'Page table, Segment table', color: '#00FFFF' },
    { icon: FolderOpen, name: 'Нээсэн файлууд', desc: 'Файл дескрипторууд', color: '#FF00FF' },
  ];

  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl mb-2 text-[#00F0FF]">1.4. Процессын удирдлагын блок (PCB)</h1>
          <p className="text-[#B0C4DE]">
            Бүх процесс өөрийн процессын удирдлагын блок (PCB) буюу мэдээллийн бүтэцтэй байдаг
            бөгөөд үүнийг үйлдлийн систем удирддаг.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* PCB Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-center text-[#00F0FF]">
                Зураг 3. Process Control Block
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className="px-4 py-2 rounded-lg bg-[#00F0FF]/20 border border-[#00F0FF] text-[#00F0FF] text-sm hover:bg-[#00F0FF]/30 transition-all flex items-center gap-2"
                >
                  {isAnimating ? <RefreshCw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isAnimating ? 'Дахин' : 'Эхлүүлэх'}
                </button>
                <button
                  onClick={() => setShowContextSwitch(!showContextSwitch)}
                  className="px-4 py-2 rounded-lg bg-[#9D00FF]/20 border border-[#9D00FF] text-[#9D00FF] text-sm hover:bg-[#9D00FF]/30 transition-all"
                >
                  Context Switch
                </button>
              </div>
            </div>
            
            <div className="relative p-6 rounded-lg border-2 border-[#00F0FF] bg-[#1A1F3A]/50">
              <motion.div
                className="absolute inset-0 border-2 border-[#00F0FF] rounded-lg"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 240, 255, 0.3)',
                    '0 0 40px rgba(0, 240, 255, 0.6)',
                    '0 0 20px rgba(0, 240, 255, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <h3 className="text-center text-xl text-[#00F0FF] mb-6 relative z-10">
                PROCESS CONTROL BLOCK
              </h3>

              <div className="space-y-3 relative z-10">
                {pcbFields.map((field, i) => (
                  <motion.div
                    key={i}
                    className="p-4 rounded-lg border bg-[#0A0E27]/50"
                    style={{ borderColor: `${field.color}30` }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: loadedFields.has(i) || !isAnimating ? 1 : 0.3,
                      y: loadedFields.has(i) || !isAnimating ? 0 : 20,
                    }}
                    transition={{ delay: isAnimating ? i * 0.1 : 0 }}
                    whileHover={{
                      borderColor: field.color,
                      boxShadow: `0 0 20px ${field.color}40`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          scale: loadedFields.has(i) || !isAnimating ? 1 : 0,
                          rotate: loadedFields.has(i) || !isAnimating ? 0 : 360,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <field.icon className="w-6 h-6" style={{ color: field.color }} />
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-white">{field.name}</div>
                        <div className="text-xs text-[#B0C4DE]">{field.desc}</div>
                        {/* Animated value display */}
                        {isAnimating && loadedFields.has(i) && (
                          <motion.div
                            className="text-xs mt-1 font-mono"
                            style={{ color: field.color }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {field.name.includes('PID') && 'PID: 1234'}
                            {field.name.includes('Pointer') && '0x7FFE1234'}
                            {field.name.includes('тоолуур') && 'PC: 0x00400000'}
                            {field.name.includes('Бүртгэгчид') && 'RAX=0x42, RBX=0x10'}
                            {field.name.includes('төлөв') && 'State: RUNNING'}
                            {field.name.includes('хязгаарууд') && 'Base: 0x100000'}
                            {field.name.includes('файлууд') && 'Files: 3 open'}
                          </motion.div>
                        )}
                      </div>
                      <AnimatePresence>
                        {loadedFields.has(i) || !isAnimating ? (
                          <motion.div
                            key="check"
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: field.color }}
                            initial={{ scale: 0 }}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ) : (
                          <motion.div
                            key="loading"
                            className="w-2 h-2 rounded-full border-2"
                            style={{ borderColor: field.color }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Context Switch Visualization */}
          {showContextSwitch && (
            <motion.div
              className="mt-8 p-6 rounded-lg border-2 border-[#9D00FF] bg-[#9D00FF]/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4 className="text-lg text-[#9D00FF] mb-4">Context Switch Animation</h4>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="p-4 rounded bg-[#1A1F3A]/50"
                  animate={{
                    opacity: [1, 0.3, 1],
                    scale: [1, 0.95, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="text-sm text-[#B0C4DE] mb-2">Process A (Saving PCB)</div>
                  <div className="h-24 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/5 flex items-center justify-center">
                    <motion.div
                      className="text-xs text-[#00F0FF]"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Saving to Memory...
                    </motion.div>
                  </div>
                </motion.div>
                <motion.div
                  className="p-4 rounded bg-[#1A1F3A]/50"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.95, 1, 0.95],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                  }}
                >
                  <div className="text-sm text-[#B0C4DE] mb-2">Process B (Loading PCB)</div>
                  <div className="h-24 rounded border border-[#00FF88]/30 bg-[#00FF88]/5 flex items-center justify-center">
                    <motion.div
                      className="text-xs text-[#00FF88]"
                      animate={{ y: [10, 0, 10] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 1 }}
                    >
                      Loading from Memory...
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Details */}
          <div className="space-y-4">
            <motion.div
              className="p-6 rounded-lg bg-[#1A1F3A]/50 border border-[#00F0FF]/20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg text-[#00F0FF] mb-3">PCB-ийн үүрэг:</h4>
              <p className="text-[#B0C4DE] text-sm leading-relaxed">
                PCB нь процессын бүх мэдээллийг хадгалдаг. Context switching үед процессын
                төлвийг хадгалж, дараа нь сэргээх боломжийг олгодог. Үүнийг ашиглан олон
                процесс нэгэн зэрэг ажиллах боломжтой болдог.
              </p>
            </motion.div>

            {pcbFields.map((field, i) => (
              <motion.div
                key={i}
                className="p-4 rounded-lg border bg-[#1A1F3A]/30"
                style={{ borderColor: `${field.color}20` }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full" style={{ backgroundColor: field.color }} />
                  <div>
                    <strong style={{ color: field.color }}>{field.name}:</strong>
                    <span className="text-[#B0C4DE] text-sm ml-2">{field.desc}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
