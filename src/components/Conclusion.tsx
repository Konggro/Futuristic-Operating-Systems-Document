import { motion } from 'motion/react';
import { CheckCircle, BookOpen, Github } from 'lucide-react';

export default function Conclusion() {
  const takeaways = [
    'Процесс нь програмын гүйцэтгэгдэж буй төлөөлөл',
    'Процессын амьдралын мөчлөг: New → Ready → Running → Waiting → Terminated',
    'PCB (Process Control Block) нь процессыг удирдах үндсэн бүтэц',
    'Процессын төлөвлөлт: CPU хуваарилалтын үр ашигтай арга',
    'Төлөвлөлтийн алгоритмууд: FCFS, SJF, Round Robin, Priority гэх мэт',
    'Thread (урсгал) нь процессын хөнгөн гүйцэтгэлийн нэгж',
    'Multithreading загварууд: Many-to-One, One-to-One, Many-to-Many',
    'Процессорын үзүүлэлт: MIPS, Clock, CPI',
  ];

  const references = [
    'Process in Operating System - BYJU\'S',
    'Process Table and Process Control Block (PCB) - GeeksforGeeks',
    'Operating System - Processes - TutorialsPoint',
    'Operating Systems: Processes - UIC Course Notes',
    'SICT MUST - Лекцийн материал',
  ];

  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        {/* Success Animation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 1 }}
        >
          <motion.div
            className="relative"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] rounded-full blur-xl opacity-50" />
            <CheckCircle className="relative w-24 h-24 text-[#00FF88]" />
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl mb-4 text-[#00F0FF]">SYSTEM ANALYSIS COMPLETE</h1>
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] mx-auto rounded-full"
            animate={{
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Key Takeaways */}
        <motion.div
          className="mb-12 p-8 rounded-lg border-2 border-[#00F0FF] bg-[#1A1F3A]/50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl text-center text-[#00F0FF] mb-6">ҮНДСЭН ДҮГНЭЛТ</h2>
          <div className="space-y-3">
            {takeaways.map((takeaway, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-[#0A0E27]/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{
                  backgroundColor: 'rgba(0, 240, 255, 0.1)',
                  x: 10,
                }}
              >
                <motion.div
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00FF88] flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <CheckCircle className="w-4 h-4 text-[#0A0E27]" />
                </motion.div>
                <p className="text-[#B0C4DE] flex-1">{takeaway}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* References */}
        <motion.div
          className="mb-12 p-8 rounded-lg border border-[#9D00FF]/30 bg-[#1A1F3A]/30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-[#9D00FF]" />
            <h2 className="text-2xl text-[#9D00FF]">АШИГЛАСАН МАТЕРИАЛ</h2>
          </div>
          <div className="space-y-2">
            {references.map((ref, i) => (
              <motion.div
                key={i}
                className="p-3 rounded-lg bg-[#0A0E27]/50 border border-[#9D00FF]/20 text-sm text-[#B0C4DE]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                whileHover={{
                  borderColor: 'rgba(157, 0, 255, 0.5)',
                  x: 5,
                }}
              >
                • {ref}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Credits */}
        <motion.div
          className="p-8 rounded-lg border-2 border-[#00FF88] bg-gradient-to-br from-[#00FF88]/10 to-[#00F0FF]/10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <h2 className="text-2xl text-center text-[#00FF88] mb-6">Багийн гишүүд</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Х.Цэрэндулам', id: 'B231940070' },
              { name: 'Г.Ихбархасвад', id: 'B222270836' },
              { name: 'Б.Хонгорзул', id: 'B210910872' },
            ].map((student, i) => (
              <motion.div
                key={i}
                className="p-4 rounded-lg border border-[#00FF88]/50 bg-[#0A0E27]/50 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.2 }}
                whileHover={{
                  borderColor: '#00FF88',
                  boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
                  y: -5,
                }}
              >
                <div className="text-white mb-1">{student.name}</div>
                <div className="text-[#00FF88] text-sm">{student.id}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center text-[#B0C4DE]">
            <p>Хичээл заасан багш: О.Бат-Энх</p>
            <p className="mt-2">ШУТИС - МХТС</p>
            <p className="text-[#00F0FF]">2025 он</p>
          </div>
        </motion.div>

        {/* Particle celebration */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#00F0FF', '#9D00FF', '#00FF88', '#FFD700'][i % 4],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -1000],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
