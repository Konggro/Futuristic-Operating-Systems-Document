import { motion } from 'motion/react';
import { FileText, Cpu, Calendar, GitBranch, BarChart } from 'lucide-react';

interface Props {
  onNavigate?: (page: number) => void;
}

export default function TableOfContents({ onNavigate }: Props) {
  const contents = [
    {
      section: '1',
      title: 'ПРОЦЕССЫН ТАЛААР ҮНДСЭН ОЙЛГОЛТ',
      icon: FileText,
      items: [
        { page: 3, title: 'Процесс гэж юу вэ?', dots: 56 },
        { page: 4, title: 'Санах ой дахь процесс', dots: 54 },
        { page: 5, title: 'Процессын амьдралын цикл', dots: 52 },
        { page: 6, title: 'Процессын удирдлагын блок (PCB)', dots: 50 },
      ],
    },
    {
      section: '2',
      title: 'ПРОЦЕССЫН ТӨЛӨВЛӨЛТ',
      icon: Calendar,
      items: [
        { page: 7, title: 'Процессын төлөвлөлт гэж юу вэ?', dots: 48 },
        { page: 8, title: 'Процесс төлөвлөгчид', dots: 46 },
        { page: 9, title: 'Процесс төлөвлөлтийн алгоритмууд', dots: 44 },
      ],
    },
    {
      section: '3',
      title: 'ПРОЦЕСС ҮҮСЭХ БА ДУУСАХ',
      icon: Cpu,
      items: [
        { page: 10, title: 'Процесс үүсэх үйл явц', dots: 52 },
        { page: 11, title: 'Процесс дуусах үйл явц', dots: 50 },
      ],
    },
    {
      section: '4',
      title: 'САЛБАР ПРОЦЕСС',
      icon: GitBranch,
      items: [
        { page: 12, title: 'Thread гэж юу вэ?', dots: 56 },
        { page: 13, title: 'Multithreading Models', dots: 54 },
      ],
    },
    {
      section: '5',
      title: 'ПРОЦЕССОРЫН ҮЗҮҮЛЭЛТ',
      icon: BarChart,
      items: [{ page: 14, title: 'MIPS, Clock, CPI', dots: 54 }],
    },
    {
      section: '6',
      title: 'ДҮГНЭЛТ',
      icon: FileText,
      items: [{ page: 15, title: 'Дүгнэлт', dots: 60 }],
    },
  ];

  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl mb-4 text-[#00F0FF]">АГУУЛГА</h1>
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

        {/* Interactive navigation tree */}
        <div className="space-y-8">
          {contents.map((section, sectionIndex) => (
            <motion.div
              key={section.section}
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: sectionIndex * 0.2 }}
            >
              {/* Section header */}
              <motion.div
                className="relative mb-4 p-4 rounded-lg border border-[#00F0FF]/30 bg-[#1A1F3A]/50"
                whileHover={{
                  borderColor: 'rgba(0, 240, 255, 0.6)',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
                }}
              >
                {/* Glowing hexagon node */}
                <motion.div
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
                  style={{
                    clipPath:
                      'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                    backgroundColor: '#00F0FF',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(0, 240, 255, 0.5)',
                      '0 0 20px rgba(0, 240, 255, 0.8)',
                      '0 0 10px rgba(0, 240, 255, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: sectionIndex * 0.3,
                  }}
                >
                  <section.icon className="w-6 h-6 text-[#0A0E27]" />
                </motion.div>

                <div className="flex items-center justify-between pl-4">
                  <h2 className="text-xl text-[#00F0FF]">
                    {section.section}. {section.title}
                  </h2>
                </div>
              </motion.div>

              {/* Subsection items */}
              <div className="pl-12 space-y-2">
                {section.items.map((item, itemIndex) => (
                  <motion.button
                    key={itemIndex}
                    className="w-full group relative"
                    onClick={() => onNavigate?.(item.page)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: sectionIndex * 0.2 + itemIndex * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex items-center justify-between p-3 rounded-lg border border-[#00F0FF]/10 bg-[#1A1F3A]/30 transition-all group-hover:border-[#00F0FF]/40 group-hover:bg-[#1A1F3A]/70">
                      <div className="flex items-center gap-3 flex-1">
                        {/* Connection line */}
                        <motion.div
                          className="w-8 h-px bg-gradient-to-r from-[#00F0FF] to-transparent"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            delay: sectionIndex * 0.2 + itemIndex * 0.1 + 0.3,
                          }}
                        />

                        {/* Item title */}
                        <span className="text-[#B0C4DE] text-left group-hover:text-white transition-colors">
                          {section.section}.{itemIndex + 1} {item.title}
                        </span>
                      </div>

                      {/* Dots */}
                      <div className="flex-shrink-0 px-4">
                        <motion.div
                          className="flex gap-1"
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: itemIndex * 0.2,
                          }}
                        >
                          {[...Array(Math.floor(item.dots / 10))].map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-[#00F0FF]/30 rounded-full" />
                          ))}
                        </motion.div>
                      </div>

                      {/* Page number */}
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 rounded-lg border border-[#00F0FF]/30 bg-[#00F0FF]/5 flex items-center justify-center text-[#00F0FF] group-hover:border-[#00F0FF] group-hover:bg-[#00F0FF]/10 transition-all"
                        whileHover={{ scale: 1.1 }}
                      >
                        {item.page}
                      </motion.div>
                    </div>

                    {/* Hover preview thumbnail placeholder */}
                    <motion.div
                      className="absolute left-full ml-4 top-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      initial={false}
                    >
                      <div className="w-48 p-3 rounded-lg border border-[#00F0FF]/50 bg-[#0A0E27] shadow-lg">
                        <div className="w-full h-24 rounded bg-[#1A1F3A] border border-[#00F0FF]/20 flex items-center justify-center">
                          <span className="text-xs text-[#00F0FF]">Page {item.page}</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          className="mt-16 text-center text-sm text-[#B0C4DE]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p>Click on any section to navigate directly</p>
        </motion.div>
      </div>
    </div>
  );
}
