import { motion } from 'motion/react';
import { Database, Layers, Network, Workflow } from 'lucide-react';

export default function IntroductionPage() {
  const points = [
    {
      icon: Database,
      text: 'Үйлдлийн систем (OS) нь орчин үеийн компьютерийн үндсэн тулгуур бөгөөд техник хангамжийг удирдан зохион байгуулж, програмуудын үйлчилгээ үзүүлдэг.',
    },
    {
      icon: Workflow,
      text: 'Процесс гэдэг нь програмын гүйцэтгэгдэж буй төлөөлөл юм.',
    },
    {
      icon: Layers,
      text: 'Subprocess буюу дэд процесс нь эцэг процессоос үүссэн, тодорхой үүрэг гүйцэтгэх зориулалттай процесс юм.',
    },
    {
      icon: Network,
      text: 'Процесс болон дэд процессыг ойлгох нь нөөцийн удирдлага, олон процесс зэрэг гүйцэтгэл, зэрэгцээ програмчлалын хувьд маш чухал.',
    },
  ];

  const keyIdeas = [
    'Процессууд нь олон програм нэгэн зэрэг ажиллах боломжийг олгодог.',
    'Дэд процессууд нь модульчлагдсан, үр ашигтай гүйцэтгэлийг дэмждэг.',
    'Процессын зохицуулалт нь системийн тогтвортой байдал, гүйцэтгэлд нөлөөлдөг.',
  ];

  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl mb-4 text-[#00F0FF]">ОРШИЛ</h1>
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

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Left Panel - Animated OS Kernel */}
          <motion.div
            className="relative aspect-square rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F3A] to-[#0A0E27] border border-[#00F0FF]/30 rounded-lg p-8 flex items-center justify-center">
              {/* Rotating core */}
              <motion.div
                className="relative w-48 h-48"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {/* Core circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] opacity-20" />
                
                {/* Orbiting elements */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-12 rounded-lg bg-[#00F0FF]/30 border border-[#00F0FF]"
                    style={{
                      top: '50%',
                      left: '50%',
                      marginTop: '-24px',
                      marginLeft: '-24px',
                    }}
                    animate={{
                      rotate: -360,
                      x: Math.cos((i * Math.PI) / 2) * 80,
                      y: Math.sin((i * Math.PI) / 2) * 80,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <motion.div
                      className="w-full h-full flex items-center justify-center"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    >
                      <div className="w-2 h-2 bg-[#00F0FF] rounded-full" />
                    </motion.div>
                  </motion.div>
                ))}

                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-[#00F0FF] text-sm text-center"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    OS
                    <br />
                    KERNEL
                  </motion.div>
                </div>
              </motion.div>

              {/* Data particles */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#00FF88] rounded-full"
                    style={{
                      left: `${50}%`,
                      top: `${50}%`,
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300,
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
          </motion.div>

          {/* Right Panel - Bullet Points */}
          <div className="space-y-6">
            {points.map((point, i) => (
              <motion.div
                key={i}
                className="relative p-6 rounded-lg bg-[#1A1F3A]/50 border border-[#00F0FF]/20"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                whileHover={{
                  borderColor: 'rgba(0, 240, 255, 0.5)',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
                }}
              >
                <motion.div
                  className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-[#00F0FF] flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <point.icon className="w-3 h-3 text-[#0A0E27]" />
                </motion.div>
                <p className="text-[#B0C4DE] leading-relaxed pl-4">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Ideas Section */}
        <motion.div
          className="relative p-8 rounded-lg bg-gradient-to-r from-[#1A1F3A]/80 to-[#0A0E27]/80 border border-[#9D00FF]/30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="absolute inset-0 border border-[#9D00FF]/50 rounded-lg"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
          
          <h2 className="text-2xl mb-6 text-[#9D00FF] text-center">Үндсэн санаа</h2>
          
          <div className="space-y-4">
            {keyIdeas.map((idea, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 + i * 0.2 }}
              >
                <motion.div
                  className="w-2 h-2 mt-2 bg-[#00FF88] rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
                <p className="text-white leading-relaxed flex-1">{idea}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
