import { motion } from 'motion/react';
import { Gauge, Activity, Zap } from 'lucide-react';

export default function PerformanceMetrics() {
  const metrics = [
    {
      name: 'MIPS',
      title: 'Million Instructions Per Second',
      icon: Zap,
      color: '#00F0FF',
      value: 250000,
      description: 'Секунд дэх сая заавар',
      detail: '1 MIPS процессор гэдэг секундэд 1 сая заавар ажиллуулдаг процессор юм.',
    },
    {
      name: 'Clock',
      title: 'Clock Cycles',
      icon: Activity,
      color: '#FFD700',
      value: 4.2,
      unit: 'GHz',
      description: 'Заавар дах цикл (тактын дохио)',
      detail: 'Процессорын үндсэн үйлдэл клокын тусламжтай гүйцэтгэгддэг.',
    },
    {
      name: 'CPI',
      title: 'Cycles Per Instruction',
      icon: Gauge,
      color: '#9D00FF',
      value: 1.8,
      description: '1 зааврыг ажиллуулахад шаардагдах клокын тоо',
      detail: 'Илүү бага CPI = илүү үр ашигтай процессор',
    },
  ];

  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl mb-2 text-[#00F0FF]">5. ПРОЦЕССОРЫН ҮЗҮҮЛЭЛТ</h1>
          <p className="text-[#B0C4DE] mb-8">
            Процессорын үзүүлэлтийг хэрэглэж байгаа зааврын тоогоор хэмждэг.
          </p>
        </motion.div>

        {/* Performance Dashboard */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.name}
              className="relative p-6 rounded-lg border-2 bg-[#1A1F3A]/50"
              style={{ borderColor: `${metric.color}50` }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{
                borderColor: metric.color,
                boxShadow: `0 0 30px ${metric.color}40`,
              }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 rounded-lg opacity-10"
                style={{
                  background: `radial-gradient(circle at center, ${metric.color}, transparent)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />

              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{
                      rotate: metric.name === 'Clock' ? [0, 360] : 0,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 2, repeat: Infinity },
                    }}
                  >
                    <metric.icon className="w-16 h-16" style={{ color: metric.color }} />
                  </motion.div>
                </div>

                <h3 className="text-2xl text-center mb-2" style={{ color: metric.color }}>
                  {metric.name}
                </h3>
                <p className="text-xs text-center text-[#B0C4DE] mb-4">{metric.title}</p>

                {/* Value display */}
                <motion.div
                  className="text-4xl text-center mb-4"
                  style={{ color: metric.color }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.2, type: 'spring' }}
                >
                  {metric.value.toLocaleString()} {metric.unit || ''}
                </motion.div>

                <p className="text-sm text-center text-[#B0C4DE]">{metric.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Details */}
        <div className="space-y-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-lg border bg-[#1A1F3A]/50"
              style={{ borderColor: `${metric.color}30` }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.2 }}
            >
              <div className="flex items-start gap-4">
                <metric.icon className="w-6 h-6 flex-shrink-0" style={{ color: metric.color }} />
                <div>
                  <h4 className="text-lg mb-2" style={{ color: metric.color }}>
                    {metric.name} - {metric.title}
                  </h4>
                  <p className="text-[#B0C4DE]">{metric.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Formula */}
        <motion.div
          className="mt-12 p-8 rounded-lg border-2 border-[#00F0FF] bg-gradient-to-br from-[#1A1F3A] to-[#0A0E27]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <h3 className="text-2xl text-center text-[#00F0FF] mb-6">Performance Formula</h3>
          <div className="text-center text-2xl text-white font-mono mb-4">
            CPU Time = Instructions × CPI × T
          </div>
          <div className="text-center text-sm text-[#B0C4DE]">
            where: T = Clock Period (1/Frequency)
          </div>
          <div className="text-center text-xl text-[#00FF88] mt-4 font-mono">
            MIPS = Frequency (MHz) / CPI
          </div>
        </motion.div>
      </div>
    </div>
  );
}
