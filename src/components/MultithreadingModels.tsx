import { motion } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function MultithreadingModels() {
  const models = [
    {
      name: 'Many-to-Many',
      color: '#00FF88',
      userThreads: 5,
      kernelThreads: 3,
      desc: 'Хамгийн оновчтой олон урсгалт загвар. Хэрэглэгчийн урсгал блоклогдсон тохиолдолд бусад урсгалууд үргэлжлэх боломжтой.',
    },
    {
      name: 'Many-to-One',
      color: '#FFD700',
      userThreads: 5,
      kernelThreads: 1,
      desc: 'Олон хэрэглэгчийн урсгалууд нэг кернелийн урсгалд холбогддог. Нэг урсгал блоклогдвол бүгд блоклогдоно.',
    },
    {
      name: 'One-to-One',
      color: '#9D00FF',
      userThreads: 5,
      kernelThreads: 5,
      desc: 'Хэрэглэгчийн урсгал бүр өөр кернелийн урсгалд холбогддог. True parallelism боломжтой.',
    },
  ];

  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl mb-2 text-[#00F0FF]">4.2. Multithreading Models</h1>
          <p className="text-[#B0C4DE] mb-8">
            Multithread нь нэг процессыг зэрэгцэн (concurrently) ажиллах боломжтой жижиг
            гүйцэтгэлийн нэгжүүдэд буюу урсгалууд (threads) болгон хуваах арга юм.
          </p>
        </motion.div>

        <div className="space-y-12">
          {models.map((model, modelIndex) => (
            <motion.div
              key={model.name}
              className="p-8 rounded-lg border-2 bg-[#1A1F3A]/30"
              style={{ borderColor: `${model.color}50` }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: modelIndex * 0.3 }}
            >
              <h2 className="text-2xl mb-6 text-center" style={{ color: model.color }}>
                {model.name} Model
              </h2>

              <div className="grid lg:grid-cols-3 gap-8 items-center">
                {/* User Threads */}
                <div>
                  <h3 className="text-sm text-[#B0C4DE] mb-3 text-center">User Space</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[...Array(model.userThreads)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-12 h-12 rounded-lg border-2 flex items-center justify-center"
                        style={{
                          borderColor: model.color,
                          backgroundColor: `${model.color}20`,
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: modelIndex * 0.3 + i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-xs" style={{ color: model.color }}>
                          U{i + 1}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Mapping Visualization */}
                <div className="flex flex-col items-center">
                  <motion.div
                    className="text-4xl"
                    style={{ color: model.color }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⟷
                  </motion.div>
                  <span className="text-xs text-[#B0C4DE] mt-2">Mapping</span>
                </div>

                {/* Kernel Threads */}
                <div>
                  <h3 className="text-sm text-[#B0C4DE] mb-3 text-center">Kernel Space</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[...Array(model.kernelThreads)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-12 h-12 rounded-lg border-2 flex items-center justify-center"
                        style={{
                          borderColor: model.color,
                          backgroundColor: `${model.color}30`,
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: modelIndex * 0.3 + 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-xs" style={{ color: model.color }}>
                          K{i + 1}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-[#B0C4DE]">{model.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          className="mt-12 p-6 rounded-lg border border-[#00F0FF]/30 bg-[#1A1F3A]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-xl text-center text-[#00F0FF] mb-4">Model Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#00F0FF]/30">
                  <th className="text-left p-2 text-[#00F0FF]">Feature</th>
                  <th className="text-center p-2 text-[#FFD700]">Many-to-One</th>
                  <th className="text-center p-2 text-[#9D00FF]">One-to-One</th>
                  <th className="text-center p-2 text-[#00FF88]">Many-to-Many</th>
                </tr>
              </thead>
              <tbody className="text-[#B0C4DE]">
                <tr className="border-b border-[#00F0FF]/10">
                  <td className="p-2">Concurrency</td>
                  <td className="text-center p-2">Low</td>
                  <td className="text-center p-2">High</td>
                  <td className="text-center p-2">Very High</td>
                </tr>
                <tr className="border-b border-[#00F0FF]/10">
                  <td className="p-2">Blocking</td>
                  <td className="text-center p-2">All block</td>
                  <td className="text-center p-2">Independent</td>
                  <td className="text-center p-2">Independent</td>
                </tr>
                <tr className="border-b border-[#00F0FF]/10">
                  <td className="p-2">Multi-CPU</td>
                  <td className="text-center p-2">No</td>
                  <td className="text-center p-2">Yes</td>
                  <td className="text-center p-2">Yes</td>
                </tr>
                <tr>
                  <td className="p-2">Overhead</td>
                  <td className="text-center p-2">Low</td>
                  <td className="text-center p-2">High</td>
                  <td className="text-center p-2">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
