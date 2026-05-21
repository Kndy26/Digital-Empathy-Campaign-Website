import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCampaign } from '../context/CampaignContext';
import { Button } from '../components/ui/Button';

// Data Pertanyaan
const steps = [
  {
    id: 'age',
    category: 'profiling',
    question: 'Berapa usia Anda saat ini?',
    type: 'number',
    placeholder: 'Ketik usia Anda (mis. 20)'
  },
  {
    id: 'platform',
    category: 'profiling',
    question: 'Platform media sosial apa yang paling sering Anda gunakan?',
    type: 'options',
    options: ['X / Twitter', 'Instagram', 'TikTok', 'Facebook', 'Lainnya']
  },
  {
    id: 'duration',
    category: 'profiling',
    question: 'Berapa rata-rata durasi penggunaan media sosial Anda per hari?',
    type: 'options',
    options: ['< 1 jam', '1 - 3 jam', '3 - 5 jam', '> 5 jam']
  },
  {
    id: 'q4',
    category: 'preTest',
    question: 'Saat melihat postingan yang bertentangan dengan pandangan saya, saya merasa terpancing emosi.',
    type: 'likert'
  },
  {
    id: 'q5',
    category: 'preTest',
    question: 'Saat kesal di internet, saya cenderung langsung mengetik balasan tanpa berpikir ulang.',
    type: 'likert'
  },
  {
    id: 'q6',
    category: 'preTest',
    question: 'Menurut saya, menggunakan kata-kata kasar atau sindiran tajam di internet adalah hal wajar.',
    type: 'likert'
  },
  {
    id: 'q7',
    category: 'preTest',
    question: 'Saya memikirkan dampak psikologis pada pembaca sebelum mengirim komentar saya.',
    type: 'likert'
  },
  {
    id: 'q8',
    category: 'preTest',
    question: 'Saya merasa lebih berani berkomentar negatif di internet karena tidak berhadapan langsung.',
    type: 'likert'
  }
];

// Label skala Likert
const likertLabels = ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"];

export default function PreTest() {
  const navigate = useNavigate();
  const { userData, updateProfiling, updatePreTest } = useCampaign();
  const [currentStep, setCurrentStep] = useState(0);
  const [otherMode, setOtherMode] = useState(false);

  // Fungsi untuk mendapatkan nilai jawaban saat ini
  const getCurrentValue = () => {
    const step = steps[currentStep];
    if (step.category === 'profiling') return userData.profiling[step.id];
    if (step.category === 'preTest') return userData.preTest[step.id];
    return null;
  };

  const handleNext = () => {
    setOtherMode(false);
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSelectOption = (value) => {
    const step = steps[currentStep];
    if (step.category === 'profiling') {
      updateProfiling(step.id, value);
    } else {
      updatePreTest(step.id, value);
    }
    // Auto-advance for multiple choice and likert after short delay
    setTimeout(handleNext, 350);
  };

  const handleChangeInput = (e) => {
    const step = steps[currentStep];
    updateProfiling(step.id, e.target.value);
  };

  const currentData = steps[currentStep];
  const currentValue = currentData ? getCurrentValue() : null;

  const animationVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-transparent">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-surface-card z-20">
        <motion.div
          className="h-full bg-primary origin-left"
          animate={{ scaleX: currentStep >= steps.length ? 1 : currentStep / steps.length }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
      {/* Background Mesh (absolute in this page or use the global one via App if it wraps it. 
          Assuming PreTest is rendered via App's <Routes>, the global .mesh-bg-fixed is already there, 
          so we can make the background transparent) */}
      <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-center">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-muted hover:text-ink transition-colors group"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span className="font-sans text-[14px] font-medium hidden md:inline">Kembali ke Beranda</span>
        </button>
        <div className="font-sans text-[13px] text-muted-soft font-medium tracking-widest uppercase">
          Pre-Test &bull; {currentStep < steps.length ? `${currentStep + 1} / ${steps.length}` : 'Selesai'}
        </div>
      </div>

      <div className="w-full max-w-2xl px-6 relative z-0 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {currentStep < steps.length ? (
            <motion.div
              key={currentStep}
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center text-center space-y-12"
            >
              <h2 className="font-serif text-[28px] md:text-[36px] text-ink leading-snug tracking-tight">
                {currentData.question}
              </h2>

              <div className="w-full flex justify-center">
                {currentData.type === 'number' && (
                  <div className="flex flex-col items-center space-y-8 w-full max-w-xs">
                    <input 
                      type="number" 
                      min="10" 
                      max="100"
                      value={currentValue || ''}
                      onChange={handleChangeInput}
                      placeholder={currentData.placeholder}
                      className="w-full text-center text-[24px] font-sans text-ink bg-transparent border-b-2 border-hairline focus:border-primary outline-none py-2 transition-colors placeholder:text-muted-soft"
                    />
                    <Button 
                      variant="primary" 
                      onClick={handleNext}
                      disabled={!currentValue}
                      className="w-full h-[48px]"
                    >
                      Lanjut
                    </Button>
                  </div>
                )}

                {currentData.type === 'options' && (
                  <div className="flex flex-col items-center w-full">
                    <div className="flex flex-wrap justify-center gap-3 w-full">
                      {currentData.options.map((opt, idx) => {
                        const isLainnya = opt === 'Lainnya';
                        const isSelected = !otherMode ? currentValue === opt : isLainnya;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (isLainnya) {
                                setOtherMode(true);
                                updateProfiling(currentData.id, '');
                              } else {
                                setOtherMode(false);
                                handleSelectOption(opt);
                              }
                            }}
                            className={`px-6 py-3 rounded-pill border transition-all duration-200 font-sans text-[15px] font-medium ${
                              isSelected 
                                ? 'bg-ink text-canvas border-ink shadow-md' 
                                : 'bg-surface-card border-hairline text-body hover:border-primary hover:text-ink'
                            }`}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                    
                    <AnimatePresence>
                      {otherMode && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="flex flex-col items-center space-y-6 w-full max-w-xs overflow-hidden"
                        >
                          <input 
                            type="text" 
                            value={currentValue || ''}
                            onChange={handleChangeInput}
                            placeholder="Sebutkan platform..."
                            className="w-full text-center text-[20px] font-sans text-ink bg-transparent border-b-2 border-hairline focus:border-primary outline-none py-2 transition-colors placeholder:text-muted-soft"
                            autoFocus
                          />
                          <Button 
                            variant="primary" 
                            onClick={handleNext}
                            disabled={!currentValue || currentValue.trim() === ''}
                            className="w-full h-[48px]"
                          >
                            Lanjut
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {currentData.type === 'likert' && (
                  <div className="w-full flex flex-col items-center space-y-8">
                    <div className="flex justify-center items-center w-full max-w-lg gap-2 md:gap-4">
                      {[1, 2, 3, 4, 5].map((val) => {
                        const isSelected = currentValue === val;
                        return (
                          <div key={val} className="flex flex-col items-center space-y-3">
                            <button
                              onClick={() => handleSelectOption(val)}
                              className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-sans text-[18px] md:text-[22px] font-medium transition-all duration-300 ${
                                isSelected
                                  ? 'bg-primary text-on-primary shadow-[0_4px_14px_rgba(204,120,92,0.39)] scale-110'
                                  : 'bg-surface-card border border-hairline text-muted hover:border-primary hover:text-ink hover:scale-105'
                              }`}
                            >
                              {val}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex justify-between w-full max-w-lg px-2 text-[13px] font-sans text-muted-soft font-medium uppercase tracking-wider">
                      <span>Sangat Tidak Setuju</span>
                      <span>Sangat Setuju</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="end"
              variants={animationVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex flex-col items-center text-center space-y-8"
            >
              <div className="w-20 h-20 rounded-full bg-surface-card flex items-center justify-center border border-hairline mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2 className="font-serif text-[36px] md:text-[48px] text-ink tracking-tight">
                Terima kasih!
              </h2>
              <p className="font-sans text-[18px] text-muted max-w-md leading-relaxed">
                Profil regulasi emosi Anda telah tersimpan sementara. Mari kita lanjutkan ke simulasi lingkungan media sosial.
              </p>
              <Button 
                variant="primary" 
                className="h-[56px] px-8 text-[16px] mt-4"
                onClick={() => navigate('/sandbox')}
              >
                Lanjutkan ke Simulasi
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Step dots — shown during questions only */}
      {currentStep < steps.length && (
        <div className="absolute bottom-10 flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? 'bg-primary w-5'
                  : i < currentStep
                    ? 'bg-primary/40 w-2'
                    : 'bg-hairline w-2'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
