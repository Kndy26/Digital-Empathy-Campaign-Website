import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCampaign } from '../context/CampaignContext';
import { Button } from '../components/ui/Button';

// ─── Question Data ─────────────────────────────────────────────────────────────

const POST_QUESTIONS = [
  {
    id: 'q1',
    question: 'Simulasi tadi menyadarkan saya betapa mudahnya kita mengetik kata-kata agresif saat terbawa emosi.',
    type: 'likert',
  },
  {
    id: 'q2',
    question: 'Peringatan atau skenario pada simulasi tadi efektif menyadarkan saya untuk menghentikan niat mengirim komentar negatif.',
    type: 'likert',
  },
  {
    id: 'q3',
    question: 'Setelah mengikuti simulasi ini, saya memahami pentingnya mengambil "jeda" (berpikir sejenak) sebelum mengirim komentar di internet.',
    type: 'likert',
  },
  {
    id: 'q4',
    question: 'Ke depannya, saya akan lebih berhati-hati dalam memilih kata saat berinteraksi di media sosial.',
    type: 'likert',
  },
  {
    id: 'q5',
    question: 'Saya merasa lebih mampu mengenali dan mengendalikan emosi saya jika nanti menghadapi postingan yang memancing amarah di media sosial.',
    type: 'likert',
  },
  {
    id: 'feedback',
    question: 'Ada masukan untuk kampanye ini? (Opsional)',
    type: 'feedback',
  },
];

// ─── Animation Variants ────────────────────────────────────────────────────────

const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -20 },
};

// ─── Likert Step ───────────────────────────────────────────────────────────────

function LikertStep({ value, onSelect }) {
  return (
    <div className="w-full flex flex-col items-center space-y-8">
      <div className="flex justify-center items-center w-full max-w-lg gap-2 md:gap-4">
        {[1, 2, 3, 4, 5].map((val) => {
          const isSelected = value === val;
          return (
            <div key={val} className="flex flex-col items-center space-y-3">
              <button
                onClick={() => onSelect(val)}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-sans text-[18px] md:text-[22px] font-medium transition-all duration-300 ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-[0_4px_14px_rgba(204,120,92,0.39)] scale-110'
                    : 'bg-surface-card border border-hairline text-muted hover:border-primary hover:text-ink hover:scale-105'
                }`}
              >
                {val}
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between w-full max-w-lg px-2 text-[13px] font-sans text-muted-soft font-medium uppercase tracking-wider">
        <span>Sangat Tidak Setuju</span>
        <span>Sangat Setuju</span>
      </div>
    </div>
  );
}

// ─── Feedback Step ─────────────────────────────────────────────────────────────

function FeedbackStep({ value, onChange, onSubmit, onSkip }) {
  const textareaRef = useRef(null);
  const hasContent = value.trim().length > 0;

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tulis masukan, kritik, atau saran Anda di sini..."
        rows={5}
        className="w-full max-w-lg resize-none bg-surface-card border border-hairline rounded-lg px-5 py-4 font-sans text-[16px] text-ink placeholder:text-muted-soft leading-relaxed focus:outline-none focus:border-primary transition-colors"
      />

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={!hasContent}
          className="flex-1 h-[48px] text-[15px]"
        >
          Kirim &amp; Selesai
        </Button>
        <button
          onClick={onSkip}
          className="flex-1 h-[48px] rounded-md border border-hairline font-sans text-[15px] font-medium text-muted hover:text-ink hover:border-primary transition-colors"
        >
          Lewati (Skip)
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PostTest() {
  const navigate = useNavigate();
  const { userData, updatePostTest, updateFeedback } = useCampaign();

  const [currentStep, setCurrentStep] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const totalSteps = POST_QUESTIONS.length; // 6 (5 Likert + 1 feedback)
  const isFeedbackStep = currentStep === totalSteps - 1;
  const isDone = currentStep >= totalSteps;

  const getCurrentValue = () => {
    const step = POST_QUESTIONS[currentStep];
    if (!step || step.type === 'feedback') return feedbackText;
    return userData.postTest[step.id];
  };

  const handleLikertSelect = (val) => {
    const step = POST_QUESTIONS[currentStep];
    updatePostTest(step.id, val);
    // Auto-advance after brief visual confirmation
    setTimeout(() => setCurrentStep(prev => prev + 1), 350);
  };

  const handleSubmitFeedback = () => {
    if (feedbackText.trim()) updateFeedback(feedbackText.trim());
    navigate('/summary');
  };

  const handleSkip = () => {
    navigate('/summary');
  };

  const currentData = POST_QUESTIONS[currentStep];
  const currentValue = getCurrentValue();

  // Progress label: show Likert question number only (1-5), feedback is unnamed step
  const likertIndex = currentStep; // 0-4 are Likert, 5 is feedback
  const progressLabel = isDone
    ? 'Selesai'
    : isFeedbackStep
      ? 'Masukan'
      : `${likertIndex + 1} / 5`;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-transparent">

      {/* Top bar */}
      <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-center">
        <button
          onClick={() => navigate('/sandbox')}
          className="flex items-center space-x-2 text-muted hover:text-ink transition-colors group"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span className="font-sans text-[14px] font-medium hidden md:inline">Kembali</span>
        </button>
        <div className="font-sans text-[13px] text-muted-soft font-medium tracking-widest uppercase">
          Post-Test &bull; {progressLabel}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-surface-card">
        <motion.div
          className="h-full bg-primary origin-left"
          animate={{ scaleX: isDone ? 1 : (currentStep / totalSteps) }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* Content area */}
      <div className="w-full max-w-2xl px-6 relative z-0 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isDone ? (
            <motion.div
              key={currentStep}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center text-center space-y-12"
            >
              <h2 className="font-serif text-[26px] md:text-[34px] text-ink leading-snug tracking-tight">
                {currentData.question}
              </h2>

              <div className="w-full flex justify-center">
                {currentData.type === 'likert' && (
                  <LikertStep
                    value={userData.postTest[currentData.id]}
                    onSelect={handleLikertSelect}
                  />
                )}

                {currentData.type === 'feedback' && (
                  <FeedbackStep
                    value={feedbackText}
                    onChange={setFeedbackText}
                    onSubmit={handleSubmitFeedback}
                    onSkip={handleSkip}
                  />
                )}
              </div>
            </motion.div>
          ) : (
            // Should not normally render (navigate fires first), but kept as safety
            <motion.div
              key="done"
              variants={variants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full flex flex-col items-center text-center space-y-8"
            >
              <div className="w-20 h-20 rounded-full bg-surface-card flex items-center justify-center border border-hairline">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="font-serif text-[36px] md:text-[48px] text-ink tracking-tight">Terima kasih!</h2>
              <Button variant="primary" className="h-[56px] px-8 text-[16px] mt-4" onClick={() => navigate('/summary')}>
                Lihat Ringkasan
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step dots — Likert only (5 steps) */}
      {!isDone && !isFeedbackStep && (
        <div className="absolute bottom-10 flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentStep ? 'bg-primary w-5' : i < currentStep ? 'bg-primary/40' : 'bg-hairline'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
