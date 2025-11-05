import { motion } from 'motion/react';
import { GitFork, User, Users } from 'lucide-react';
import { useState } from 'react';

export default function ProcessCreation() {
  const [animating, setAnimating] = useState(false);

  const handleFork = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 3000);
  };

  return (
    <div className="min-h-screen p-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl mb-2 text-[#00F0FF]">3.1. Процесс үүсэх</h1>
          <p className="text-[#B0C4DE] mb-6">
            Процесс системд ороход хамгийн анхны үйлдэл нь процесс үүсэх юм.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Content */}
          <div className="space-y-6">
            <motion.div
              className="p-6 rounded-lg bg-[#1A1F3A]/50 border border-[#00F0FF]/20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-xl text-[#00F0FF] mb-4">Процесс үүсэх нөхцөл:</h3>
              <ul className="space-y-3 text-[#B0C4DE]">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 bg-[#00FF88] rounded-full" />
                  <div>
                    <strong className="text-white">System initialization:</strong> Компьютерийг
                    асаахад хэд хэдэн систем процесс болон background процессууд үүсдэг.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 bg-[#00FF88] rounded-full" />
                  <div>
                    <strong className="text-white">User request:</strong> Хэрэглэгч шинэ
                    процес үүсгэхийг хүсэх
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 bg-[#00FF88] rounded-full" />
                  <div>
                    <strong className="text-white">Child process system call:</strong>{' '}
                    Ажиллаж байгаа процесс өөр бусад процессыг үүсгэж ажиллуулах
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 bg-[#00FF88] rounded-full" />
                  <div>
                    <strong className="text-white">Batch system:</strong> Batch ажил эхлэх
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="p-6 rounded-lg bg-[#1A1F3A]/50 border border-[#9D00FF]/20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl text-[#9D00FF] mb-4">fork() System Call</h3>
              <p className="text-[#B0C4DE] mb-4">
                Процессийг өөр процесс fork() системийн дуудлага ашиглан үүсгэж болно. Үүсгэж
                буй процессыг эцэг процесс (Parent Process) гэж нэрлэдэг бол, үүссэн процессыг
                хүүхэд процесс (Child Process) гэж нэрлэнэ.
              </p>

              {/* Code example */}
              <div className="p-4 rounded bg-[#0A0E27] border border-[#9D00FF]/30 font-mono text-sm">
                <pre className="text-[#00FF88]">
                  <code>{`int main() {
  pid_t pid = fork();
  
  if (pid == 0) {
    // Child process
    printf("Child PID = %d\\n", getpid());
  } else if (pid > 0) {
    // Parent process
    printf("Parent PID = %d\\n", getpid());
  }
}`}</code>
                </pre>
              </div>

              <button
                onClick={handleFork}
                className="mt-4 px-6 py-2 rounded-lg bg-[#9D00FF]/20 border border-[#9D00FF] text-[#9D00FF] hover:bg-[#9D00FF]/30 transition-all flex items-center gap-2"
              >
                <GitFork className="w-4 h-4" />
                Execute fork()
              </button>
            </motion.div>
          </div>

          {/* Fork Visualization */}
          <div>
            <h3 className="text-xl mb-6 text-center text-[#00F0FF]">
              Зураг 6. Process Creation Using Fork()
            </h3>

            <div className="relative min-h-[600px] rounded-lg border border-[#00F0FF]/30 bg-[#1A1F3A]/30 p-8">
              {/* Parent Process */}
              <motion.div
                className="relative mx-auto mb-12"
                style={{ width: '200px' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  className="p-6 rounded-lg border-2 border-[#00F0FF] bg-[#00F0FF]/10"
                  animate={
                    animating
                      ? {
                          boxShadow: [
                            '0 0 20px rgba(0, 240, 255, 0.5)',
                            '0 0 40px rgba(0, 240, 255, 0.8)',
                            '0 0 20px rgba(0, 240, 255, 0.5)',
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1, repeat: animating ? 3 : 0 }}
                >
                  <div className="flex justify-center mb-2">
                    <User className="w-12 h-12 text-[#00F0FF]" />
                  </div>
                  <div className="text-center">
                    <div className="text-[#00F0FF] text-lg">Parent Process</div>
                    <div className="text-[#B0C4DE] text-sm">PID: 1234</div>
                  </div>
                </motion.div>

                {/* Fork indicator */}
                {animating && (
                  <motion.div
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[#9D00FF] text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    fork()
                  </motion.div>
                )}
              </motion.div>

              {/* Connection line */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-[#00F0FF] via-[#9D00FF] to-transparent"
                style={{ height: '80px', top: '140px' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: animating ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />

              {/* Split indicator */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: '180px' }}
                initial={{ scale: 0 }}
                animate={{ scale: animating ? 1 : 0 }}
                transition={{ delay: 0.3 }}
              >
                <GitFork className="w-8 h-8 text-[#9D00FF]" />
              </motion.div>

              {/* Child Processes */}
              <div className="absolute left-0 right-0 grid grid-cols-2 gap-4" style={{ top: '240px' }}>
                {[
                  { name: 'Child 1', pid: '1235', delay: 0.5 },
                  { name: 'Child 2', pid: '1236', delay: 0.7 },
                ].map((child, i) => (
                  <motion.div
                    key={i}
                    className="p-4 rounded-lg border-2 border-[#00FF88] bg-[#00FF88]/10"
                    initial={{ opacity: 0, scale: 0, y: -50 }}
                    animate={
                      animating
                        ? { opacity: 1, scale: 1, y: 0 }
                        : { opacity: 0, scale: 0, y: -50 }
                    }
                    transition={{ delay: child.delay, duration: 0.5 }}
                  >
                    <div className="flex justify-center mb-2">
                      <Users className="w-8 h-8 text-[#00FF88]" />
                    </div>
                    <div className="text-center">
                      <div className="text-[#00FF88] text-sm">{child.name}</div>
                      <div className="text-[#B0C4DE] text-xs">PID: {child.pid}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Memory duplication indicator */}
              {animating && (
                <motion.div
                  className="absolute bottom-8 left-0 right-0 p-4 rounded-lg border border-[#9D00FF]/30 bg-[#0A0E27]/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="text-xs text-[#B0C4DE] text-center">
                    <div className="text-[#9D00FF] mb-1">Memory Duplication</div>
                    Child processes inherit:
                    <br />• Code segment • Data segment • Open files
                    <br />
                    But have separate address spaces
                  </div>
                </motion.div>
              )}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[#1A1F3A]/50 border border-[#00F0FF]/20 text-sm text-[#B0C4DE]">
              <strong className="text-[#00F0FF]">Note:</strong> Хүүхэд процесс зөвхөн нэг эцэгтэй
              байж чаддаг, харин эцэг процесс олон хүүхэд процесс үүсгэж болно.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
