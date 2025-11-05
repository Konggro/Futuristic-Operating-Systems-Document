import { motion, AnimatePresence } from 'motion/react';
import { Clock, Zap, RotateCw, Star, Play, Square } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Process {
  id: string;
  arrival: number;
  burst: number;
  priority?: number;
  color: string;
  remaining?: number;
}

interface GanttBlock {
  processId: string;
  startTime: number;
  endTime: number;
  color: string;
}

export default function SchedulingAlgorithms() {
  const [activeAlgo, setActiveAlgo] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [ganttChart, setGanttChart] = useState<GanttBlock[]>([]);

  // Calculate gantt chart when algorithm becomes active
  useEffect(() => {
    if (activeAlgo) {
      const algo = algorithms.find(a => a.name === activeAlgo);
      if (algo) {
        const gantt = calculateGanttChart(activeAlgo, algo.processes);
        if (gantt.length > 0) {
          setGanttChart(gantt);
        }
      }
    } else {
      setGanttChart([]);
      setCurrentTime(0);
    }
  }, [activeAlgo]);

  // Animation timer
  useEffect(() => {
    if (!isRunning || !activeAlgo || ganttChart.length === 0) {
      return;
    }
    
    const maxTime = Math.max(...ganttChart.map(g => g.endTime));
    if (maxTime <= 0) return;
    
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 0.2;
        if (next >= maxTime) {
          setIsRunning(false);
          return maxTime;
        }
        return next;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [isRunning, activeAlgo, ganttChart.length]);

  // Calculate Gantt chart based on algorithm
  const calculateGanttChart = (algoName: string, processes: Process[]): GanttBlock[] => {
    const gantt: GanttBlock[] = [];
    
    if (algoName === 'FCFS') {
      // FCFS: Execute in arrival order
      let time = 0;
      processes.forEach((proc) => {
        if (time < proc.arrival) time = proc.arrival;
        gantt.push({
          processId: proc.id,
          startTime: time,
          endTime: time + proc.burst,
          color: proc.color,
        });
        time += proc.burst;
      });
    } else if (algoName === 'SJF') {
      // SJF: Sort by burst time, execute shortest first
      const sorted = [...processes].sort((a, b) => {
        if (a.burst !== b.burst) return a.burst - b.burst;
        return a.arrival - b.arrival;
      });
      let time = 0;
      const completed = new Set<string>();
      
      while (completed.size < sorted.length) {
        // Find available processes
        const available = sorted.filter(p => !completed.has(p.id) && p.arrival <= time);
        if (available.length === 0) {
          // No process available, move time forward
          const nextArrival = sorted.find(p => !completed.has(p.id))?.arrival || time;
          time = nextArrival;
          continue;
        }
        
        // Select shortest job
        const shortest = available.reduce((min, p) => p.burst < min.burst ? p : min);
        gantt.push({
          processId: shortest.id,
          startTime: time,
          endTime: time + shortest.burst,
          color: shortest.color,
        });
        time += shortest.burst;
        completed.add(shortest.id);
      }
    } else if (algoName === 'Round Robin') {
      // Round Robin: Time quantum = 2
      const quantum = 2;
      const queue: Process[] = [];
      const processesCopy = processes.map(p => ({ ...p, remaining: p.burst }));
      let time = 0;
      let processIndex = 0;
      
      // Add processes as they arrive
      while (processesCopy.some(p => (p.remaining || 0) > 0)) {
        // Add newly arrived processes
        while (processIndex < processesCopy.length && processesCopy[processIndex].arrival <= time) {
          queue.push(processesCopy[processIndex]);
          processIndex++;
        }
        
        if (queue.length === 0) {
          // No process ready, advance time
          if (processIndex < processesCopy.length) {
            time = processesCopy[processIndex].arrival;
            continue;
          }
          break;
        }
        
        const current = queue.shift()!;
        const executeTime = Math.min(quantum, current.remaining || 0);
        
        gantt.push({
          processId: current.id,
          startTime: time,
          endTime: time + executeTime,
          color: current.color,
        });
        
        time += executeTime;
        current.remaining = (current.remaining || 0) - executeTime;
        
        // Add newly arrived processes
        while (processIndex < processesCopy.length && processesCopy[processIndex].arrival <= time) {
          queue.push(processesCopy[processIndex]);
          processIndex++;
        }
        
        // Re-add current process if not finished
        if ((current.remaining || 0) > 0) {
          queue.push(current);
        }
      }
    } else if (algoName === 'Priority') {
      // Priority: Lower number = higher priority (1 > 2 > 3)
      let time = 0;
      const completed = new Set<string>();
      const processesCopy = [...processes];
      
      while (completed.size < processesCopy.length) {
        // Find available processes
        const available = processesCopy.filter(p => !completed.has(p.id) && p.arrival <= time);
        if (available.length === 0) {
          const nextArrival = processesCopy.find(p => !completed.has(p.id))?.arrival || time;
          time = nextArrival;
          continue;
        }
        
        // Select highest priority (lowest priority number)
        const highestPriority = available.reduce((min, p) => 
          (p.priority || 999) < (min.priority || 999) ? p : min
        );
        
        gantt.push({
          processId: highestPriority.id,
          startTime: time,
          endTime: time + highestPriority.burst,
          color: highestPriority.color,
        });
        time += highestPriority.burst;
        completed.add(highestPriority.id);
      }
    }
    
    return gantt;
  };

  const algorithms = [
    { 
      name: 'FCFS', 
      icon: Clock, 
      color: '#FFD700', 
      desc: 'First-Come, First-Serve - Ирсэн дарааллаар',
      processes: [
        { id: 'P1', arrival: 0, burst: 4, color: '#FFD700' },
        { id: 'P2', arrival: 1, burst: 3, color: '#00F0FF' },
        { id: 'P3', arrival: 2, burst: 2, color: '#00FF88' },
      ],
    },
    { 
      name: 'SJF', 
      icon: Zap, 
      color: '#00FF88', 
      desc: 'Shortest Job First - Богино ажил эхэнд',
      processes: [
        { id: 'P1', arrival: 0, burst: 6, color: '#00FF88' },
        { id: 'P2', arrival: 1, burst: 3, color: '#00F0FF' },
        { id: 'P3', arrival: 2, burst: 4, color: '#FFD700' },
      ],
    },
    { 
      name: 'Round Robin', 
      icon: RotateCw, 
      color: '#00F0FF', 
      desc: 'Time quantum = 2',
      quantum: 2,
      processes: [
        { id: 'P1', arrival: 0, burst: 4, color: '#00F0FF' },
        { id: 'P2', arrival: 1, burst: 3, color: '#00FF88' },
        { id: 'P3', arrival: 2, burst: 2, color: '#FFD700' },
      ],
    },
    { 
      name: 'Priority', 
      icon: Star, 
      color: '#9D00FF', 
      desc: 'Давуу эрхээр (бага тоо = өндөр эрх)',
      processes: [
        { id: 'P1', arrival: 0, burst: 4, priority: 2, color: '#9D00FF' },
        { id: 'P2', arrival: 1, burst: 3, priority: 1, color: '#00F0FF' },
        { id: 'P3', arrival: 2, burst: 2, priority: 3, color: '#00FF88' },
      ],
    },
  ];

  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl mb-2 text-[#00F0FF]">2.3. Процесс төлөвлөлтийн алгоритмууд</h1>
          <p className="text-[#B0C4DE] mb-8">
            Процессын төлөвлөлтийн алгоритмууд нь үйлдлийн систем ашигладаг аргачлал бөгөөд
            CPU дээр аль процессыг ажиллуулах, хэдий хугацаанд ажиллуулах талаар шийдвэр
            гаргахад зориулагдсан.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {algorithms.map((algo, i) => (
            <motion.div
              key={algo.name}
              className="p-6 rounded-lg border-2 bg-[#1A1F3A]/50"
              style={{ borderColor: `${algo.color}50` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{
                borderColor: algo.color,
                boxShadow: `0 0 30px ${algo.color}40`,
              }}
            >
              <div className="flex items-center gap-4 mb-4 relative">
                <motion.div
                  className="p-4 rounded-lg relative"
                  style={{ backgroundColor: `${algo.color}20` }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  whileHover={{
                    scale: 1.1,
                  }}
                >
                  {/* Glow effect - reduced intensity */}
                  {activeAlgo === algo.name && (
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        backgroundColor: algo.color,
                        filter: 'blur(12px)',
                        opacity: 0.2,
                      }}
                      animate={{
                        opacity: [0.15, 0.25, 0.15],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                  )}
                  <algo.icon className="w-8 h-8 relative z-10" style={{ color: algo.color }} />
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    className="text-2xl mb-1"
                    style={{ color: algo.color }}
                    animate={{
                      textShadow: [
                        `0 0 10px ${algo.color}40`,
                        `0 0 20px ${algo.color}60`,
                        `0 0 10px ${algo.color}40`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    {algo.name}
                  </motion.h3>
                  <p className="text-[#B0C4DE] text-sm">{algo.desc}</p>
                </div>
                
                {/* Active indicator */}
                {activeAlgo === algo.name && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#00FF88]"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#00FF88]"
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
              </div>

              {/* Interactive Gantt Chart */}
              <div className="mt-4">
                <motion.button
                  onClick={() => {
                    if (activeAlgo === algo.name) {
                      // Same algorithm - toggle running
                      setIsRunning((prev) => {
                        if (!prev) {
                          // Starting - reset time
                          setCurrentTime(0);
                        }
                        return !prev;
                      });
                    } else {
                      // Different algorithm - switch and start
                      setIsRunning(false); // Stop current if running
                      setCurrentTime(0);
                      setActiveAlgo(algo.name);
                      // gantt chart will be calculated by useEffect, then start
                      setTimeout(() => {
                        setIsRunning(true);
                      }, 50);
                    }
                  }}
                  className="w-full mb-3 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all flex items-center justify-center gap-2 relative overflow-hidden"
                  style={{
                    backgroundColor: activeAlgo === algo.name && isRunning
                      ? `${algo.color}20`
                      : '#0A0E27',
                    borderColor: activeAlgo === algo.name && isRunning
                      ? algo.color
                      : '#00F0FF30',
                    color: activeAlgo === algo.name && isRunning
                      ? algo.color
                      : '#00F0FF',
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 0 20px ${algo.color}40`,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated background */}
                  {activeAlgo === algo.name && isRunning && (
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${algo.color}20, transparent)`,
                      }}
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  )}
                  
                  <motion.div
                    className="relative z-10 flex items-center gap-2"
                    animate={activeAlgo === algo.name && isRunning ? {
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{
                      duration: 1,
                      repeat: activeAlgo === algo.name && isRunning ? Infinity : 0,
                    }}
                  >
                    {activeAlgo === algo.name && isRunning ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <Square className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span className="relative z-10">
                      {activeAlgo === algo.name && isRunning ? 'Зогсоох' : 'Алгоритм ажиллуулах'}
                    </span>
                  </motion.div>
                  
                  {/* Pulse effect */}
                  {activeAlgo === algo.name && isRunning && (
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2"
                      style={{ borderColor: algo.color }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.button>

                {/* Process Info Table - Horizontal Layout */}
                <motion.div
                  className="mb-3 p-3 rounded bg-[#0A0E27]/30 border border-[#00F0FF]/20 text-xs"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="text-[#B0C4DE] font-medium mb-3 border-b border-[#00F0FF]/20 pb-2">
                    Process Information:
                  </div>
                  <div className="flex flex-wrap gap-4 items-center">
                    {algo.processes.map((proc, idx) => (
                      <motion.div
                        key={proc.id}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#00F0FF]/20 bg-[#0A0E27]/50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{
                          backgroundColor: `${proc.color}10`,
                          borderColor: proc.color,
                          scale: 1.05,
                        }}
                      >
                        {/* Process color indicator */}
                        <motion.div
                          className="w-3 h-3 rounded-full border-2"
                          style={{ 
                            backgroundColor: proc.color,
                            borderColor: proc.color,
                          }}
                          animate={{
                            boxShadow: [
                              `0 0 5px ${proc.color}40`,
                              `0 0 10px ${proc.color}60`,
                              `0 0 5px ${proc.color}40`,
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: idx * 0.3,
                          }}
                        />
                        {/* Process ID */}
                        <div style={{ color: proc.color }} className="font-mono font-bold text-sm">
                          {proc.id}
                        </div>
                        {/* Separator */}
                        <div className="text-[#00F0FF]/30">|</div>
                        {/* Arrival Time */}
                        <div className="text-[#B0C4DE]">
                          <span className="text-[#00F0FF]">A:</span> {proc.arrival}
                        </div>
                        {/* Burst Time */}
                        <div className="text-[#B0C4DE]">
                          <span className="text-[#00F0FF]">B:</span> {proc.burst}
                        </div>
                        {/* Priority (if applicable) */}
                        {algo.name === 'Priority' && (
                          <>
                            <div className="text-[#00F0FF]/30">|</div>
                            <div className="text-[#B0C4DE]">
                              <span className="text-[#00F0FF]">P:</span> {proc.priority}
                            </div>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Gantt Chart */}
                <div className="rounded bg-[#0A0E27]/50 border border-[#00F0FF]/20 p-3 relative overflow-hidden">
                  {activeAlgo === algo.name && (
                    <motion.div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${algo.color} 0%, transparent 50%, ${algo.color} 100%)`,
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '200% 0%'],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  )}
                  <div className="relative z-10">
                    <div className="text-xs text-[#B0C4DE] mb-2 flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: algo.color }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                        }}
                      />
                      Gantt Chart:
                    </div>
                    <div className="relative h-32 rounded overflow-x-auto overflow-y-visible bg-[#0A0E27]/50">
                      {activeAlgo === algo.name && ganttChart.length > 0 ? (
                        <>
                          {/* Timeline markers */}
                          <div className="absolute top-0 left-0 h-6 flex text-xs text-[#B0C4DE] bg-[#0A0E27]/80 z-20" style={{ minWidth: `${Math.max(...ganttChart.map(g => g.endTime)) * 60}px` }}>
                            {Array.from({ length: Math.max(...ganttChart.map(g => g.endTime)) + 1 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="border-r border-[#00F0FF]/20 text-center relative"
                                style={{ width: '60px', minWidth: '60px' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                {i}
                                <motion.div
                                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#00F0FF]/30"
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  transition={{ delay: i * 0.05 + 0.2 }}
                                />
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Gantt blocks */}
                          <div className="absolute top-6 left-0 h-20" style={{ minWidth: `${Math.max(...ganttChart.map(g => g.endTime)) * 60}px` }}>
                            {ganttChart.length > 0 && (() => {
                              const totalTime = Math.max(...ganttChart.map(g => g.endTime));
                              const timeUnitWidth = 60; // Fixed pixel width per time unit
                              return ganttChart.map((block, idx) => {
                                const left = block.startTime * timeUnitWidth;
                                const width = (block.endTime - block.startTime) * timeUnitWidth;
                                const isActive = isRunning && currentTime >= block.startTime && currentTime < block.endTime;
                                const isCompleted = currentTime >= block.endTime;
                                const isPending = currentTime < block.startTime;
                                
                                // Calculate progress within this block
                                const progress = isActive && (block.endTime - block.startTime) > 0
                                  ? Math.min(100, ((currentTime - block.startTime) / (block.endTime - block.startTime)) * 100)
                                  : isCompleted ? 100 : 0;
                              
                              return (
                                <motion.div
                                  key={`${block.processId}-${idx}-${block.startTime}-${block.endTime}`}
                                  className="absolute rounded-lg border-2 flex flex-col items-center justify-center text-xs font-mono relative overflow-visible"
                                  style={{
                                    left: `${left}px`,
                                    width: `${width}px`,
                                    minWidth: `${Math.max(width, 50)}px`,
                                    height: '100%',
                                    backgroundColor: isActive 
                                      ? `${block.color}60`
                                      : isCompleted 
                                        ? `${block.color}50`
                                        : `${block.color}30`,
                                    borderColor: isActive 
                                      ? block.color 
                                      : `${block.color}70`,
                                  }}
                                  initial={{ scaleX: 0, opacity: 0 }}
                                  animate={{ 
                                    scaleX: 1,
                                    opacity: isPending ? 0.5 : 1,
                                    boxShadow: isActive
                                      ? `0 0 20px ${block.color}80`
                                      : isCompleted
                                        ? `0 0 5px ${block.color}40`
                                        : `0 0 2px ${block.color}20`,
                                  }}
                                  transition={{ 
                                    scaleX: { duration: 0.3, delay: 0 },
                                    opacity: { duration: 0.2 },
                                  }}
                                  whileHover={{
                                    scale: 1.05,
                                    zIndex: 10,
                                  }}
                                >
                                  {/* Completed fill effect */}
                                  {isCompleted && (
                                    <motion.div
                                      className="absolute inset-0 rounded-lg"
                                      style={{
                                        backgroundColor: `${block.color}30`,
                                      }}
                                      initial={{ width: 0 }}
                                      animate={{ width: '100%' }}
                                      transition={{ duration: 0.3 }}
                                    />
                                  )}
                                  
                                  {/* Active execution fill */}
                                  {isActive && (
                                    <motion.div
                                      className="absolute left-0 top-0 bottom-0 rounded-l-lg"
                                      style={{
                                        backgroundColor: `${block.color}80`,
                                        width: `${progress}%`,
                                      }}
                                      transition={{ duration: 0.1 }}
                                    />
                                  )}
                                  
                                  {/* Glow effect when active */}
                                  {isActive && (
                                    <motion.div
                                      className="absolute inset-0 rounded-lg"
                                      style={{
                                        backgroundColor: block.color,
                                        filter: 'blur(8px)',
                                        opacity: 0.4,
                                      }}
                                      animate={{
                                        opacity: [0.3, 0.5, 0.3],
                                      }}
                                      transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                      }}
                                    />
                                  )}
                                  
                                  {/* Process label */}
                                  <span 
                                    className="relative z-10 font-bold"
                                    style={{ color: block.color }}
                                  >
                                    {block.processId}
                                  </span>
                                  {/* Time range label */}
                                  <span className="text-[7px] text-[#B0C4DE] relative z-10 mt-0.5">
                                    {block.startTime}-{block.endTime}
                                  </span>
                                  
                                  {/* Execution scan line */}
                                  {isActive && (
                                    <motion.div
                                      className="absolute inset-0 z-20 pointer-events-none"
                                      style={{
                                        background: `linear-gradient(90deg, transparent 0%, ${block.color} 50%, transparent 100%)`,
                                        width: '20%',
                                      }}
                                      animate={{ 
                                        x: ['0%', '400%'],
                                      }}
                                      transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: 'linear',
                                      }}
                                    />
                                  )}
                                  
                                  {/* Progress bar at bottom */}
                                  {isActive && (
                                    <motion.div
                                      className="absolute bottom-0 left-0 h-1 bg-[#00F0FF] rounded-b-lg"
                                      style={{
                                        width: `${progress}%`,
                                      }}
                                      transition={{ duration: 0.1 }}
                                    >
                                      <motion.div
                                        className="absolute right-0 top-0 bottom-0 w-2 bg-[#00F0FF]"
                                        animate={{
                                          opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                          duration: 0.5,
                                          repeat: Infinity,
                                        }}
                                      />
                                    </motion.div>
                                  )}
                                </motion.div>
                              );
                            });
                            })()}
                            
                            {/* Current time indicator line */}
                            {isRunning && ganttChart.length > 0 && (() => {
                              const timeUnitWidth = 60;
                              const maxTime = Math.max(...ganttChart.map(g => g.endTime));
                              const indicatorLeft = currentTime * timeUnitWidth;
                              return (
                                <motion.div
                                  className="absolute top-0 bottom-0 w-1 bg-[#00F0FF] z-40 pointer-events-none"
                                  style={{
                                    left: `${indicatorLeft}px`,
                                    transform: 'translateX(-50%)',
                                  }}
                                  animate={{
                                    boxShadow: [
                                      '0 0 8px rgba(0, 240, 255, 0.6)',
                                      '0 0 16px rgba(0, 240, 255, 0.9)',
                                      '0 0 8px rgba(0, 240, 255, 0.6)',
                                    ],
                                  }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                  }}
                                >
                                  <motion.div
                                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#00F0FF] border-2 border-[#0A0E27]"
                                    animate={{
                                      scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                      duration: 0.8,
                                      repeat: Infinity,
                                    }}
                                  />
                                </motion.div>
                              );
                            })()}
                          </div>
                        </>
                      ) : (
                        <motion.div
                          className="flex items-center justify-center h-full text-[#B0C4DE] text-xs"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="text-center">
                            <div className="mb-2">Gantt chart харахын тулд</div>
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                              }}
                              className="text-[#00F0FF]"
                            >
                              ▶ дээрх товчийг дараарай
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                {activeAlgo === algo.name && ganttChart.length > 0 && (
                  <motion.div
                    className="mt-3 p-4 rounded-lg bg-gradient-to-br from-[#0A0E27]/50 to-[#1A1F3A]/50 border-2 border-[#00FF88]/30 text-xs relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* Animated background - reduced intensity */}
                    {activeAlgo === algo.name && (
                      <motion.div
                        className="absolute inset-0 opacity-5"
                        style={{
                          backgroundImage: `radial-gradient(circle at 50% 50%, ${algo.color} 0%, transparent 70%)`,
                        }}
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.05, 0.1, 0.05],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                        }}
                      />
                    )}
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <motion.div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: '#00FF88' }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />
                        <div className="text-[#00FF88] font-bold">Үр дүн:</div>
                      </div>
                      
                      {/* Results Header */}
                      <div className="grid grid-cols-5 gap-2 mb-2 text-[#B0C4DE] font-medium text-xs border-b border-[#00FF88]/30 pb-2">
                        <div>Process</div>
                        <div>CT</div>
                        <div>TAT</div>
                        <div>WT</div>
                        <div>RT</div>
                      </div>
                      
                      {/* Results in horizontal layout */}
                      <div className="flex flex-wrap gap-3">
                        {algo.processes.map((proc, idx) => {
                          const blocks = ganttChart.filter(b => b.processId === proc.id);
                          if (blocks.length === 0) {
                            return null;
                          }
                          const completionTime = Math.max(...blocks.map(b => b.endTime));
                          const turnaroundTime = completionTime - proc.arrival;
                          const waitingTime = turnaroundTime - proc.burst;
                          const responseTime = blocks[0]?.startTime - proc.arrival || 0;
                          
                          return blocks.length > 0 ? (
                            <motion.div
                              key={proc.id}
                              className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg bg-[#0A0E27]/30 border border-[#00F0FF]/20 min-w-[100px]"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + idx * 0.1 }}
                              whileHover={{
                                backgroundColor: `${proc.color}10`,
                                borderColor: proc.color,
                                scale: 1.05,
                              }}
                            >
                              {/* Process ID with color indicator */}
                              <div style={{ color: proc.color }} className="font-mono font-bold text-sm flex items-center gap-2">
                                <motion.div
                                  className="w-3 h-3 rounded-full border-2"
                                  style={{ 
                                    backgroundColor: proc.color,
                                    borderColor: proc.color,
                                  }}
                                  animate={{
                                    scale: [1, 1.3, 1],
                                    boxShadow: [
                                      `0 0 5px ${proc.color}40`,
                                      `0 0 10px ${proc.color}60`,
                                      `0 0 5px ${proc.color}40`,
                                    ],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: idx * 0.2,
                                  }}
                                />
                                {proc.id}
                              </div>
                              
                              {/* Metrics */}
                              <div className="flex flex-col gap-1 text-xs text-[#B0C4DE] mt-2">
                                <div className="flex items-center gap-1">
                                  <span className="text-[#00F0FF] text-[10px]">CT:</span>
                                  <motion.span
                                    className="font-mono font-bold"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 + idx * 0.1, type: 'spring' }}
                                  >
                                    {completionTime}
                                  </motion.span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-[#00F0FF] text-[10px]">TAT:</span>
                                  <motion.span
                                    className="font-mono font-bold"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.6 + idx * 0.1, type: 'spring' }}
                                  >
                                    {turnaroundTime}
                                  </motion.span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-[#00F0FF] text-[10px]">WT:</span>
                                  <motion.span
                                    className="font-mono font-bold"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.7 + idx * 0.1, type: 'spring' }}
                                  >
                                    {waitingTime}
                                  </motion.span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-[#00F0FF] text-[10px]">RT:</span>
                                  <motion.span
                                    className="font-mono font-bold"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.8 + idx * 0.1, type: 'spring' }}
                                  >
                                    {responseTime}
                                  </motion.span>
                                </div>
                              </div>
                            </motion.div>
                          ) : null;
                        })}
                      </div>
                      
                      <motion.div
                        className="mt-3 pt-3 border-t border-[#00FF88]/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-[#00FF88] font-bold flex items-center gap-2">
                            <motion.div
                              className="w-2 h-2 rounded-full bg-[#00FF88]"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                              }}
                            />
                            Avg Waiting Time:
                          </div>
                          <motion.div
                            className="text-2xl font-bold font-mono"
                            style={{ color: '#00FF88' }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 1,
                              type: 'spring',
                              stiffness: 200,
                            }}
                          >
                            {ganttChart.length > 0 ? (
                              (
                                algo.processes.reduce((sum, proc) => {
                                  const blocks = ganttChart.filter(b => b.processId === proc.id);
                                  if (blocks.length === 0) return sum;
                                  const completionTime = Math.max(...blocks.map(b => b.endTime));
                                  return sum + (completionTime - proc.arrival - proc.burst);
                                }, 0) / algo.processes.filter(p => ganttChart.some(b => b.processId === p.id)).length
                              ).toFixed(2)
                            ) : '0.00'}
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 p-6 rounded-lg border border-[#00F0FF]/30 bg-[#1A1F3A]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-xl text-[#00F0FF] mb-4">Ашиглагдах нэр томьёо:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-[#B0C4DE]">
            <div>• <strong>Arrival Time:</strong> Процесс бэлэн дараалалд ирэх хугацаа</div>
            <div>• <strong>Completion Time:</strong> Процесс дуусах хугацаа</div>
            <div>• <strong>Burst Time:</strong> CPU дээр гүйцэтгэхэд шаардагдах хугацаа</div>
            <div>• <strong>Turnaround Time:</strong> Completion - Arrival</div>
            <div>• <strong>Waiting Time:</strong> Turnaround - Burst</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
