import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Home, Menu } from 'lucide-react';
import CoverPage from './components/CoverPage';
import IntroductionPage from './components/IntroductionPage';
import TableOfContents from './components/TableOfContents';
import ProcessConcept from './components/ProcessConcept';
import ProcessMemory from './components/ProcessMemory';
import ProcessLifecycle from './components/ProcessLifecycle';
import ProcessControlBlock from './components/ProcessControlBlock';
import ProcessScheduling from './components/ProcessScheduling';
import SchedulingQueues from './components/SchedulingQueues';
import SchedulingAlgorithms from './components/SchedulingAlgorithms';
import ProcessCreation from './components/ProcessCreation';
import ProcessTermination from './components/ProcessTermination';
import ThreadIntro from './components/ThreadIntro';
import MultithreadingModels from './components/MultithreadingModels';
import PerformanceMetrics from './components/PerformanceMetrics';
import Conclusion from './components/Conclusion';
import { Button } from './components/ui/button';

const pages = [
  { id: 0, title: 'Cover', component: CoverPage },
  { id: 1, title: 'Оршил', component: IntroductionPage },
  { id: 2, title: 'Агуулга', component: TableOfContents },
  { id: 3, title: '1.1 Процесс гэж юу вэ?', component: ProcessConcept },
  { id: 4, title: '1.2 Санах ой дахь процесс', component: ProcessMemory },
  { id: 5, title: '1.3 Процессын амьдралын цикл', component: ProcessLifecycle },
  { id: 6, title: '1.4 PCB', component: ProcessControlBlock },
  { id: 7, title: '2.1 Процессын төлөвлөлт', component: ProcessScheduling },
  { id: 8, title: '2.2 Дарааллууд', component: SchedulingQueues },
  { id: 9, title: '2.3 Алгоритмууд', component: SchedulingAlgorithms },
  { id: 10, title: '3.1 Процесс үүсэх', component: ProcessCreation },
  { id: 11, title: '3.2 Процесс дуусах', component: ProcessTermination },
  { id: 12, title: '4.1 Thread', component: ThreadIntro },
  { id: 13, title: '4.2 Multithreading Models', component: MultithreadingModels },
  { id: 14, title: '5. Үзүүлэлт', component: PerformanceMetrics },
  { id: 15, title: '6. Дүгнэлт', component: Conclusion },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const CurrentPageComponent = pages[currentPage].component;

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageId: number) => {
    setCurrentPage(pageId);
    setShowMenu(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1A1F3A] to-[#0A0E27] text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(157, 0, 255, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 40% 20%, rgba(0, 255, 136, 0.05) 0%, transparent 50%)`,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      {/* Navigation */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-[#0A0E27]/80 backdrop-blur-md border-b border-[#00F0FF]/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowMenu(!showMenu)}
          className="text-[#00F0FF] hover:bg-[#00F0FF]/10"
        >
          {showMenu ? <Home className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        <div className="flex items-center gap-2">
          <motion.div
            className="text-[#00F0FF] text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {pages[currentPage].title}
          </motion.div>
          <div className="text-[#B0C4DE] text-sm">
            {currentPage + 1} / {pages.length}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevPage}
            disabled={currentPage === 0}
            className="text-[#00F0FF] hover:bg-[#00F0FF]/10 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            className="text-[#00F0FF] hover:bg-[#00F0FF]/10 disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Page Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0A0E27]/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMenu(false)}
          >
            <div className="container mx-auto px-4 py-24">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map((page) => (
                  <motion.button
                    key={page.id}
                    onClick={() => goToPage(page.id)}
                    className={`p-6 rounded-lg border transition-all ${
                      currentPage === page.id
                        ? 'border-[#00F0FF] bg-[#00F0FF]/10'
                        : 'border-[#00F0FF]/20 bg-[#1A1F3A]/50 hover:border-[#00F0FF]/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-[#00F0FF] text-sm mb-2">
                      Page {page.id + 1}
                    </div>
                    <div className="text-white">{page.title}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <div className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <CurrentPageComponent onNavigate={goToPage} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
