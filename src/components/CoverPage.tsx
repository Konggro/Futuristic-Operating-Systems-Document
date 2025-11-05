import { motion } from 'motion/react';
import { Cpu, Binary, Zap } from 'lucide-react';

export default function CoverPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated circuit board background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-[#00F0FF]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              height: `${Math.random() * 200 + 100}px`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Binary data streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00F0FF]/20 text-xs font-mono"
            style={{
              left: `${i * 20}%`,
              top: '-10%',
            }}
            animate={{
              y: ['0vh', '110vh'],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('\n')}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Holographic Logo */}
        <motion.div
          className="mb-8 inline-block"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <Cpu className="relative w-24 h-24 text-[#00F0FF]" />
          </div>
        </motion.div>

        {/* University Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-2 text-[#B0C4DE]"
        >
          ШИНЖЛЭХ УХААН ТЕХНОЛОГИЙН ИХ СУРГУУЛЬ
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 text-[#B0C4DE]"
        >
          Мэдээлэл холбооны технологийн сургууль
        </motion.div>

        {/* Title with glitch effect */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute inset-0 text-[#9D00FF] opacity-50"
              animate={{
                x: [-2, 2, -2],
                y: [-1, 1, -1],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: 'mirror',
              }}
            >
              БИЕ ДААЛТЫН АЖИЛ 1
            </motion.div>
            <h1 className="relative text-[#00F0FF] mb-2">
              БИЕ ДААЛТЫН АЖИЛ 1
            </h1>
          </div>
          <p className="text-[#B0C4DE]">
            Үйлдлийн систем (F.CSM302)
          </p>
          <p className="text-[#B0C4DE] text-sm mt-1">
            2025-2026 оны хичээлийн жилийн намар
          </p>
        </motion.div>

        {/* Topic with neon border */}
        <motion.div
          className="relative p-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="absolute inset-0 border-2 border-[#00F0FF] rounded-lg"
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 240, 255, 0.3)',
                '0 0 40px rgba(0, 240, 255, 0.6)',
                '0 0 20px rgba(0, 240, 255, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <h2 className="relative text-2xl text-white">
            Бие даалтын сэдэв:
            <br />
            <span className="text-[#00FF88]">"Процесс болон салбар процесс"</span>
          </h2>
        </motion.div>

        {/* Team Info */}
        <motion.div
          className="mb-8 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-[#B0C4DE]">Багийн дугаар: №1</p>
          <p className="text-[#B0C4DE]">Хичээл заасан багш: О.Бат-Энх</p>
        </motion.div>

        {/* Student badges */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[
            { name: 'Х.Цэрэндулам', id: 'B231940070' },
            { name: 'Г.Ихбархасвад', id: 'B222270836' },
            { name: 'Б.Хонгорзул', id: 'B210910872' },
          ].map((student, i) => (
            <motion.div
              key={i}
              className="relative p-4 rounded-lg bg-[#1A1F3A]/50 border border-[#00F0FF]/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 border border-[#00F0FF]/50 rounded-lg"
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
              <div className="relative">
                <Zap className="w-4 h-4 text-[#00FF88] mb-2 mx-auto" />
                <p className="text-white">{student.name}</p>
                <p className="text-[#00F0FF] text-sm">{student.id}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-[#B0C4DE]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p>УЛААНБААТАР ХОТ</p>
          <p className="text-[#00F0FF]">2025 он</p>
        </motion.div>
      </div>

      {/* Particle system */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00F0FF] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
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
  );
}
