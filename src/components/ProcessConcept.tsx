import { motion } from 'motion/react';
import { FileCode, Play } from 'lucide-react';

export default function ProcessConcept() {
  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl mb-2 text-[#00F0FF]">1.1. Процесс гэж юу вэ?</h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="p-6 rounded-lg bg-[#1A1F3A]/50 border border-[#00F0FF]/20">
              <p className="text-[#B0C4DE] leading-relaxed mb-4">
                Процесс гэдэг нь ажиллаж буй программ юм. Аливаа процессийн гүйцэтгэл тодорхой
                дарааллын дагуу явагдах ёстой бөгөөд энэ дараалал нь тухайн системийн найдвартай
                ажиллагаа, үр ашигтай нөөцийн хуваарилалтыг хангахад чухал үүрэгтэй.
              </p>
              <p className="text-[#B0C4DE] leading-relaxed">
                Бид компьютерийн программыг бичихдээ текст файл хэлбэрээр бичдэг. Харин эдгээр
                програмыг ажиллуулах үед тухайн текст файл нь процесс болж хувирдаг бөгөөд
                програмд тодорхойлсон бүх үүрэг, даалгавруудыг гүйцэтгэдэг. Өөрөөр хэлбэл,
                процесс нь програмыг бодитойгоор ажиллуулж, түүний зааврыг биелүүлдэг нэгжийг
                хэлнэ.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="aspect-square rounded-lg border border-[#00F0FF]/30 bg-[#1A1F3A]/30 p-8 flex flex-col items-center justify-center">
              {/* Transformation Animation */}
              <div className="relative w-full">
                <motion.div
                  className="absolute left-0 p-6 rounded-lg border-2 border-[#9D00FF] bg-[#9D00FF]/10"
                  animate={{
                    x: [0, 200, 200],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <FileCode className="w-16 h-16 text-[#9D00FF]" />
                  <div className="text-[#9D00FF] mt-2 text-sm text-center">Text File</div>
                </motion.div>

                <motion.div
                  className="absolute right-0 p-6 rounded-lg border-2 border-[#00FF88] bg-[#00FF88]/10"
                  animate={{
                    opacity: [0, 0, 1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <Play className="w-16 h-16 text-[#00FF88]" />
                  <div className="text-[#00FF88] mt-2 text-sm text-center">Process</div>
                </motion.div>
              </div>

              <motion.div
                className="mt-32 text-[#00F0FF] text-sm"
                animate={{
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                Transformation →
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
