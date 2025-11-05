import { motion } from 'motion/react';

export default function ProcessScheduling() {
  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl mb-2 text-[#00F0FF]">2.1. Процессын төлөвлөлт</h1>
          <p className="text-[#B0C4DE] mb-8">
            Процессын төлөвлөлт нь үйлдлийн системийн процессын менежерийн гүйцэтгэдэг үйл
            ажиллагаа бөгөөд энэ нь CPU дээр ажиллаж буй процессыг устгах буюу түр зогсоож,
            тодорхой стратегийн дагуу дараагийн процессыг сонгон CPU-д хуваарилах үүрэгтэй байдаг.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div className="p-6 rounded-lg border border-[#00F0FF]/30 bg-[#1A1F3A]/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h3 className="text-xl text-[#FFD700] mb-4">Тасалддаггүй төлөвлөлт (Non-preemptive)</h3>
            <p className="text-[#B0C4DE] text-sm">
              Энэ тохиолдолд процесс ажиллаж байх үед түүний ашиглаж буй нөөцийг процесс бүрэн
              дуусахаас өмнө өөр процесс авч чадахгүй.
            </p>
          </motion.div>

          <motion.div className="p-6 rounded-lg border border-[#9D00FF]/30 bg-[#1A1F3A]/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h3 className="text-xl text-[#9D00FF] mb-4">Тасалддаг төлөвлөлт (Preemptive)</h3>
            <p className="text-[#B0C4DE] text-sm">
              Энд үйлдлийн систем нь нөөцийг тодорхой хугацаанд процессод хуваарилдаг. CPU-д
              higher priority процесс гарч ирэхэд тухайн процессыг түр солин ажиллуулах
              хэлбэрээр хэрэгжинэ.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
