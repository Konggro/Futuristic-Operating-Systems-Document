import { motion, AnimatePresence } from 'motion/react';
import { Database, Cpu, HardDrive, Play, Square, RotateCw, Plus, Info } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function SchedulingQueues() {
  const [processes, setProcesses] = useState<Array<{ id: number; queue: string; color: string }>>([]);
  const [cpuProcess, setCpuProcess] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1); // 1x, 2x, 3x speed
  const [processIdCounter, setProcessIdCounter] = useState(0);
  
  // Refs to store timers for cleanup
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  // Clear all timers
  const clearAllTimers = () => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    intervalsRef.current.forEach(interval => clearInterval(interval));
    timersRef.current = [];
    intervalsRef.current = [];
  };

  // Function to dispatch next process from Ready Queue to CPU (if CPU is free)
  const dispatchToCPU = () => {
    if (cpuProcess !== null) return; // CPU is busy
    
    setProcesses((prev) => {
      const readyProcess = prev.find((p) => p.queue === 'ready');
      if (readyProcess) {
        setCpuProcess(readyProcess.id);
        return prev.filter((p) => p.id !== readyProcess.id);
      }
      return prev;
    });
  };

  // Monitor CPU state and dispatch from Ready Queue when CPU becomes free
  useEffect(() => {
    if (!isRunning) return;

    const cpuMonitor = setInterval(() => {
      dispatchToCPU();
    }, 500 / speed);

    intervalsRef.current.push(cpuMonitor);

    return () => {
      clearInterval(cpuMonitor);
    };
  }, [isRunning, cpuProcess, speed]);

  // Handle automatic process creation
  useEffect(() => {
    if (!isRunning) return;

    let processId = 0;
    const cycle = () => {
      const newProcess = {
        id: processId++,
        queue: 'job' as const,
        color: ['#00F0FF', '#00FF88', '#9D00FF', '#FFD700'][processId % 4],
      };
      setProcesses((prev) => [...prev, newProcess]);
      setProcessIdCounter(processId);

      // Move process from Job Queue to Ready Queue (when loaded into memory)
      const timer1 = setTimeout(() => {
        setProcesses((prev) =>
          prev.map((p) => (p.id === newProcess.id ? { ...p, queue: 'ready' } : p))
        );
      }, (1500 / speed));

      timersRef.current.push(timer1);
    };

    const interval = setInterval(cycle, (5000 / speed));
    intervalsRef.current.push(interval);
    cycle(); // Create first process immediately

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, speed]);

  // Handle CPU execution and transitions
  useEffect(() => {
    if (cpuProcess === null || !isRunning) return;

    const currentProcessId = cpuProcess;
    const processColor = ['#00F0FF', '#00FF88', '#9D00FF', '#FFD700'][currentProcessId % 4];

    // Process executes in CPU for a period
    const executionTime = (2000 + Math.random() * 1000) / speed; // 2-3 seconds (adjusted for speed)

    const executionTimer = setTimeout(() => {
      if (!isRunning) return; // Don't continue if stopped

      const needsIO = Math.random() > 0.4; // 60% chance of I/O

      if (needsIO) {
        // Process blocks for I/O - goes to Device Queue
        setCpuProcess(null);
        setProcesses((prev) => {
          const existing = prev.find((p) => p.id === currentProcessId);
          if (!existing) {
            return [...prev, {
              id: currentProcessId,
              queue: 'device',
              color: processColor,
            }];
          }
          return prev;
        });

        // After I/O completes, return to Ready Queue
        const ioTime = (1500 + Math.random() * 1000) / speed; // 1.5-2.5 seconds
        const ioTimer = setTimeout(() => {
          if (!isRunning) return;
          setProcesses((prev) =>
            prev.map((p) =>
              p.id === currentProcessId && p.queue === 'device'
                ? { ...p, queue: 'ready' }
                : p
            )
          );
        }, ioTime);
        timersRef.current.push(ioTimer);
      } else {
        // Process completes execution - terminates
        setCpuProcess(null);
      }
    }, executionTime);

    timersRef.current.push(executionTimer);

    return () => {
      clearTimeout(executionTimer);
    };
  }, [cpuProcess, isRunning, speed]);

  // Reset function
  const handleReset = () => {
    clearAllTimers();
    setProcesses([]);
    setCpuProcess(null);
    setProcessIdCounter(0);
    setIsRunning(false);
  };

  // Add manual process
  const handleAddProcess = () => {
    const newId = processIdCounter;
    const newProcess = {
      id: newId,
      queue: 'job' as const,
      color: ['#00F0FF', '#00FF88', '#9D00FF', '#FFD700'][newId % 4],
    };
    setProcesses((prev) => [...prev, newProcess]);
    setProcessIdCounter(newId + 1);

    // Auto-move to Ready Queue after delay
    const timer = setTimeout(() => {
      setProcesses((prev) =>
        prev.map((p) => (p.id === newId ? { ...p, queue: 'ready' } : p))
      );
    }, 1500 / speed);
    timersRef.current.push(timer);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  const ProcessBlock = ({ process, queue }: { process: typeof processes[0]; queue: string }) => (
    <motion.div
      className="w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xs font-mono cursor-pointer"
      style={{
        borderColor: process.color,
        backgroundColor: `${process.color}20`,
        color: process.color,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.15, zIndex: 10 }}
      transition={{ duration: 0.2 }}
      title={`Process ${process.id} in ${queue} queue`}
    >
      P{process.id}
    </motion.div>
  );

  // Statistics
  const stats = {
    job: processes.filter(p => p.queue === 'job').length,
    ready: processes.filter(p => p.queue === 'ready').length,
    device: processes.filter(p => p.queue === 'device').length,
    cpu: cpuProcess !== null ? 1 : 0,
    total: processes.length + (cpuProcess !== null ? 1 : 0),
  };

  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl mb-2 text-[#00F0FF]">2.2. Процесс төлөвлөлтийн дарааллууд</h1>
          <p className="text-[#B0C4DE] mb-8">
            Үйлдлийн систем нь бүх процессын хяналтын блокуудыг (PCB) процессын төлөвлөлтийн
            дарааллуудад (scheduling queues) хадгалж удирддаг.
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          className="mb-8 p-6 rounded-lg border-2 border-[#00F0FF]/50 bg-[#1A1F3A]/50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Control Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setIsRunning(!isRunning)}
                className="px-6 py-3 rounded-lg border-2 text-sm font-medium transition-all flex items-center gap-2"
                style={{
                  backgroundColor: isRunning ? '#00F0FF20' : '#0A0E27',
                  borderColor: isRunning ? '#00F0FF' : '#00F0FF30',
                  color: isRunning ? '#00F0FF' : '#00F0FF',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRunning ? (
                  <>
                    <Square className="w-4 h-4" />
                    Зогсоох
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Эхлүүлэх
                  </>
                )}
              </motion.button>

              <motion.button
                onClick={handleReset}
                className="px-6 py-3 rounded-lg border-2 border-[#FFD700]/50 bg-[#FFD700]/10 text-[#FFD700] text-sm font-medium transition-all flex items-center gap-2 hover:bg-[#FFD700]/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCw className="w-4 h-4" />
                Дахин эхлүүлэх
              </motion.button>

              <motion.button
                onClick={handleAddProcess}
                className="px-6 py-3 rounded-lg border-2 border-[#00FF88]/50 bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium transition-all flex items-center gap-2 hover:bg-[#00FF88]/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                Процесс нэмэх
              </motion.button>
            </div>

            {/* Speed Control */}
            <div className="flex items-center gap-3">
              <span className="text-[#B0C4DE] text-sm">Хурд:</span>
              {[1, 2, 3].map((s) => (
                <motion.button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    speed === s
                      ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF]'
                      : 'bg-[#0A0E27] border-[#00F0FF]/30 text-[#B0C4DE] hover:border-[#00F0FF]/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s}x
                </motion.button>
              ))}
            </div>

            {/* Statistics */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
                <span className="text-[#B0C4DE]">Job: <strong className="text-[#FFD700]">{stats.job}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00FF88]"></div>
                <span className="text-[#B0C4DE]">Ready: <strong className="text-[#00FF88]">{stats.ready}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00F0FF]"></div>
                <span className="text-[#B0C4DE]">CPU: <strong className="text-[#00F0FF]">{stats.cpu}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF8800]"></div>
                <span className="text-[#B0C4DE]">Device: <strong className="text-[#FF8800]">{stats.device}</strong></span>
              </div>
              <div className="text-[#B0C4DE] ml-2">
                Нийт: <strong className="text-[#00F0FF]">{stats.total}</strong>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          className="mb-6 p-4 rounded-lg border border-[#00F0FF]/30 bg-[#0A0E27]/50 flex items-start gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Info className="w-5 h-5 text-[#00F0FF] mt-0.5 flex-shrink-0" />
          <div className="text-sm text-[#B0C4DE]">
            <strong className="text-[#00F0FF]">Тайлбар:</strong> Процессууд Job Queue-д ирээд Ready Queue руу шилжин, 
            CPU чөлөөтэй бол Ready Queue-аас CPU-д dispatch хийгдэнэ. CPU дээр гүйцэтгэгдэх явцад I/O шаардлагатай 
            бол Device Queue руу шилжин, I/O дууссаны дараа дахин Ready Queue руу буцна. Процесс дуусвал бүх дарааллаас 
            гарна.
          </div>
        </motion.div>

        <div className="relative p-12 rounded-lg border border-[#00F0FF]/30 bg-[#1A1F3A]/20">
          {/* Job Queue */}
          <motion.div
            className="mb-8 p-6 rounded-lg border border-[#FFD700]/50 bg-[#FFD700]/10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Database className="w-8 h-8 text-[#FFD700]" />
                <h3 className="text-xl text-[#FFD700]">Job Queue</h3>
                <span className="text-sm text-[#FFD700]/70">({stats.job})</span>
              </div>
            </div>
            <p className="text-[#B0C4DE] text-sm mb-4">
              Системд орсон бүх процессууд (санах ой руу ачаалагдаагүй)
            </p>
            <div className="flex gap-2 flex-wrap min-h-[48px]">
              <AnimatePresence>
                {processes
                  .filter((p) => p.queue === 'job')
                  .map((process) => (
                    <ProcessBlock key={process.id} process={process} queue="job" />
                  ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center mb-8">
            <motion.div
              className="text-[#00F0FF] text-2xl"
              animate={isRunning ? { y: [0, 10, 0] } : {}}
              transition={{ duration: 1.5, repeat: isRunning ? Infinity : 0 }}
            >
              ↓
            </motion.div>
          </div>

          {/* Ready Queue */}
          <motion.div
            className="mb-8 p-6 rounded-lg border border-[#00FF88]/50 bg-[#00FF88]/10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Database className="w-8 h-8 text-[#00FF88]" />
                <h3 className="text-xl text-[#00FF88]">Ready Queue</h3>
                <span className="text-sm text-[#00FF88]/70">({stats.ready})</span>
              </div>
            </div>
            <p className="text-[#B0C4DE] text-sm mb-4">
              Үндсэн санах ойд байрлаж, гүйцэтгэхэд бэлэн процессууд (CPU чөлөөтэй бол dispatch хийгдэнэ)
            </p>
            <div className="flex gap-2 flex-wrap min-h-[48px]">
              <AnimatePresence>
                {processes
                  .filter((p) => p.queue === 'ready')
                  .map((process) => (
                    <ProcessBlock key={process.id} process={process} queue="ready" />
                  ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Arrow with Dispatch label */}
          <div className="flex flex-col items-center mb-8">
            <span className="text-[#00F0FF] text-sm mb-2">Dispatch</span>
            <motion.div
              className="text-[#00F0FF] text-2xl"
              animate={isRunning ? { y: [0, 10, 0] } : {}}
              transition={{ duration: 1.5, repeat: isRunning ? Infinity : 0, delay: 0.5 }}
            >
              ↓
            </motion.div>
          </div>

          {/* CPU */}
          <motion.div
            className="mb-8 p-6 rounded-lg border-2 border-[#00F0FF] bg-[#00F0FF]/10 relative min-h-[120px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Cpu className="w-12 h-12 text-[#00F0FF]" />
              <h3 className="text-2xl text-[#00F0FF]">CPU</h3>
              <span className="text-sm text-[#00F0FF]/70">({stats.cpu})</span>
            </div>
            <div className="flex justify-center">
              {cpuProcess !== null ? (
                <motion.div
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center text-lg font-mono"
                  style={{
                    borderColor: '#00F0FF',
                    backgroundColor: '#00F0FF20',
                    color: '#00F0FF',
                  }}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 10px rgba(0, 240, 255, 0.5)',
                      '0 0 20px rgba(0, 240, 255, 0.8)',
                      '0 0 10px rgba(0, 240, 255, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  P{cpuProcess}
                </motion.div>
              ) : (
                <div className="text-[#B0C4DE] text-sm">Чөлөөтэй (Idle)</div>
              )}
            </div>
          </motion.div>

          {/* Arrow from CPU to Device Queue */}
          <div className="flex flex-col items-center mb-8">
            <span className="text-[#FF8800] text-sm mb-2">I/O хүлээлт</span>
            <motion.div
              className="text-[#FF8800] text-2xl"
              animate={isRunning ? { y: [0, 10, 0] } : {}}
              transition={{ duration: 1.5, repeat: isRunning ? Infinity : 0, delay: 0.7 }}
            >
              ↓
            </motion.div>
          </div>

          {/* Device Queue */}
          <motion.div
            className="p-6 rounded-lg border border-[#FF8800]/50 bg-[#FF8800]/10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <HardDrive className="w-8 h-8 text-[#FF8800]" />
                <h3 className="text-xl text-[#FF8800]">Device Queue (I/O Queue)</h3>
                <span className="text-sm text-[#FF8800]/70">({stats.device})</span>
              </div>
            </div>
            <p className="text-[#B0C4DE] text-sm mb-4">
              I/O төхөөрөмжөөс болж түр саатсан процессууд (I/O дууссаны дараа Ready Queue руу буцна)
            </p>
            <div className="flex gap-2 flex-wrap min-h-[48px]">
              <AnimatePresence>
                {processes
                  .filter((p) => p.queue === 'device')
                  .map((process) => (
                    <ProcessBlock key={process.id} process={process} queue="device" />
                  ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Arrow from Device Queue back to Ready Queue */}
          <div className="flex flex-col items-center mt-8 mb-8">
            <span className="text-[#00FF88] text-sm mb-2">I/O дууссан</span>
            <motion.div
              className="text-[#00FF88] text-2xl"
              animate={isRunning ? { y: [0, 10, 0] } : {}}
              transition={{ duration: 1.5, repeat: isRunning ? Infinity : 0, delay: 0.9 }}
            >
              ↑
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
