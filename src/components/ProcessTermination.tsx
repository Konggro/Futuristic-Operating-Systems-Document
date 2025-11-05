import { motion } from 'motion/react';
import { CheckCircle, AlertCircle, XCircle, Skull } from 'lucide-react';

export default function ProcessTermination() {
  const reasons = [
    { icon: CheckCircle, color: '#00FF88', title: 'Хэвийн дуусах', desc: 'Програм бүх үүргээ гүйцэтгэж, exit() дуудсан' },
    { icon: AlertCircle, color: '#FFD700', title: 'Алдаатай гарах', desc: 'Програм өөрөө алдаа илрүүлж зогссон' },
    { icon: XCircle, color: '#FF8800', title: 'Зайлшгүй нөхцөл', desc: 'Fatal error, segmentation fault' },
    { icon: Skull, color: '#FF0044', title: 'Өөр процесс зогсоосон', desc: 'kill() system call' },
  ];

  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl mb-2 text-[#00F0FF]">3.2. Процесс дуусах</h1>
          <p className="text-[#B0C4DE] mb-8">
            Процесс дуусах нь процессийг системээс устгах үйлдэл бөгөөд тухайн процесс эзэмшиж
            байсан бүх нөөцийг чөлөөлдөг.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-lg border-2 bg-[#1A1F3A]/50"
              style={{ borderColor: `${reason.color}50` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{
                borderColor: reason.color,
                boxShadow: `0 0 30px ${reason.color}40`,
              }}
            >
              <div className="flex items-center gap-4">
                <reason.icon className="w-12 h-12" style={{ color: reason.color }} />
                <div>
                  <h3 className="text-lg" style={{ color: reason.color }}>
                    {reason.title}
                  </h3>
                  <p className="text-[#B0C4DE] text-sm">{reason.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="p-8 rounded-lg border border-[#9D00FF]/30 bg-[#1A1F3A]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-xl text-[#9D00FF] mb-6">Termination Process</h3>
          <div className="flex items-center justify-between">
            {['Running', 'Cleanup', 'Zombie', 'Gone'].map((stage, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.2 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-lg border-2 border-[#9D00FF] bg-[#9D00FF]/10 flex items-center justify-center mb-2"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <span className="text-[#9D00FF]">{i + 1}</span>
                </motion.div>
                <span className="text-sm text-[#B0C4DE]">{stage}</span>
                {i < 3 && (
                  <motion.div
                    className="text-[#00F0FF] mt-2"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
