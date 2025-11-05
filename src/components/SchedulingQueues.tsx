import { motion, AnimatePresence } from 'motion/react';
import { Database, Cpu, HardDrive } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SchedulingQueues() {
  const [processes, setProcesses] = useState<Array<{ id: number; queue: string; color: string }>>([]);
  const [cpuProcess, setCpuProcess] = useState<number | null>(null);

  useEffect(() => {
    let processId = 0;
    const cycle = () => {
      // Add new process to Job Queue
      const newProcess = {
        id: processId++,
        queue: 'job',
        color: ['#00F0FF', '#00FF88', '#9D00FF', '#FFD700'][processId % 4],
      };
      setProcesses((prev) => [...prev, newProcess]);

      // Move process from Job to Ready after delay
      setTimeout(() => {
        setProcesses((prev) =>
          prev.map((p) => (p.id === newProcess.id ? { ...p, queue: 'ready' } : p))
        );
      }, 1000);

      // Dispatch process to CPU
      setTimeout(() => {
        setProcesses((prev) => prev.filter((p) => p.id !== newProcess.id));
        setCpuProcess(newProcess.id);
      }, 2000);

      // Process completes or goes to I/O
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // Goes to Device Queue
          setCpuProcess(null);
          setProcesses((prev) => [
            ...prev,
            { ...newProcess, queue: 'device', id: newProcess.id },
          ]);
          // Return to Ready Queue
          setTimeout(() => {
            setProcesses((prev) =>
              prev.map((p) =>
                p.id === newProcess.id && p.queue === 'device'
                  ? { ...p, queue: 'ready' }
                  : p
              )
            );
          }, 2000);
        } else {
          // Process completes
          setCpuProcess(null);
        }
      }, 3500);
    };

    const interval = setInterval(cycle, 4000);
    cycle();

    return () => clearInterval(interval);
  }, []);

  const ProcessBlock = ({ process, queue }: { process: typeof processes[0]; queue: string }) => (
    <motion.div
      className="w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xs font-mono"
      style={{
        borderColor: process.color,
        backgroundColor: `${process.color}20`,
        color: process.color,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
    >
      P{process.id}
    </motion.div>
  );

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

        <div className="relative p-12 rounded-lg border border-[#00F0FF]/30 bg-[#1A1F3A]/20">
          {/* Job Queue */}
          <motion.div
            className="mb-8 p-6 rounded-lg border border-[#FFD700]/50 bg-[#FFD700]/10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-8 h-8 text-[#FFD700]" />
              <h3 className="text-xl text-[#FFD700]">Job Queue</h3>
            </div>
            <p className="text-[#B0C4DE] text-sm mb-4">
              Системд орсон бүх процессууд
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
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
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
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-8 h-8 text-[#00FF88]" />
              <h3 className="text-xl text-[#00FF88]">Ready Queue</h3>
            </div>
            <p className="text-[#B0C4DE] text-sm mb-4">
              Үндсэн санах ойд байрлаж, гүйцэтгэхэд бэлэн процессууд
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
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
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
            </div>
            <div className="flex justify-center">
              {cpuProcess !== null && (
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
              )}
            </div>
          </motion.div>

          {/* Device Queue */}
          <motion.div
            className="p-6 rounded-lg border border-[#FF8800]/50 bg-[#FF8800]/10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <HardDrive className="w-8 h-8 text-[#FF8800]" />
              <h3 className="text-xl text-[#FF8800]">Device Queue</h3>
            </div>
            <p className="text-[#B0C4DE] text-sm mb-4">
              I/O төхөөрөмжөөс болж түр саатсан процессууд
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
        </div>
      </div>
    </div>
  );
}
