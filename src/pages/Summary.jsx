import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCampaign } from '../context/CampaignContext';
import { submitSurveyResponse } from '../lib/firebase';

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

// whileInView variant — used for scroll-triggered sections
const inViewFade = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
};

// ─── Interpretation logic ─────────────────────────────────────────────────────

function getPersonaProfile(sandboxResult) {
  if (sandboxResult === 'mindful') {
    return {
      label: 'The Mindful Navigator',
      sublabel: 'Kontrol Diri Tinggi',
      icon: '🧭',
      color: 'bg-[#5db8a6]/10 border-[#5db8a6]/30',
      badgeColor: 'bg-[#5db8a6]/20 text-[#3d8c7c]',
      description:
        'Kamu berhasil mengaktifkan jeda kognitif saat menghadapi provokasi. Kemampuan ini — yang dikenal dalam psikologi sebagai "cognitive pause" — merupakan indikator regulasi emosi yang matang. Pengguna seperti kamu lebih jarang terlibat dalam konflik digital yang tidak produktif.',
    };
  }
  return {
    label: 'The Reactive Responder',
    sublabel: 'Impulsif Daring',
    icon: '⚡',
    color: 'bg-amber-500/10 border-amber-500/30',
    badgeColor: 'bg-amber-500/20 text-amber-700',
    description:
      'Kamu cenderung merespons provokasi secara reaktif — pola yang dikenal sebagai "online disinhibition effect". Ini sangat umum dan bukan kelemahan permanen. Dengan latihan sederhana seperti teknik "jeda 3 detik", kamu bisa membangun filter emosional yang lebih kuat sebelum mengirim balasan.',
  };
}

// ─── Animated Score Bar ───────────────────────────────────────────────────────

function ScoreBar({ label, preVal, postVal, delay }) {
  const pre = preVal ?? 0;
  const post = postVal ?? 0;
  const prePercent = ((pre / 5) * 100).toFixed(0);
  const postPercent = ((post / 5) * 100).toFixed(0);
  const delta = post - pre;
  const deltaLabel =
    delta > 0 ? `+${(delta / 5 * 100).toFixed(0)}%` :
      delta < 0 ? `${(delta / 5 * 100).toFixed(0)}%` : '±0%';
  const deltaColor =
    delta > 0 ? 'text-[#5db872]' :
      delta < 0 ? 'text-[#c64545]' : 'text-muted';

  return (
    <motion.div {...fadeUp(delay)} className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-sans text-[14px] font-medium text-body">{label}</span>
        <span className={`font-sans text-[13px] font-semibold ${deltaColor}`}>{deltaLabel}</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-[12px] font-sans text-muted-soft uppercase tracking-wider">
          <span>Pre-Test</span><span>{pre}/5</span>
        </div>
        <div className="h-2.5 bg-surface-card rounded-full overflow-hidden border border-hairline">
          <motion.div className="h-full bg-muted/60 rounded-full" initial={{ width: 0 }}
            animate={{ width: `${prePercent}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + 0.2 }} />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-[12px] font-sans text-muted-soft uppercase tracking-wider">
          <span>Post-Test</span><span>{post}/5</span>
        </div>
        <div className="h-2.5 bg-surface-card rounded-full overflow-hidden border border-hairline">
          <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }}
            animate={{ width: `${postPercent}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + 0.4 }} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Vertical Timeline ────────────────────────────────────────────────────────

const TIMELINE_ITEMS = [
  {
    step: '01',
    tag: 'Deteksi',
    title: 'Kenali Polanya',
    body: 'Jika sebuah postingan menggunakan bahasa absolut ("Semua orang...", "Selalu...", "Bodoh...") dan menyerang identitas, itu adalah Rage-Bait. Biasanya pelakunya punya centang biru atau status verified di platform X/Twitter.',
    color: 'bg-[#c64545]',
    ring: 'ring-[#c64545]/20',
    textAccent: 'text-[#c64545]',
  },
  {
    step: '02',
    tag: 'Jeda',
    title: 'Terapkan Aturan 3 Detik',
    body: 'Tarik napas sebelum jari menyentuh keyboard. Emosi memuncak hanya bertahan beberapa detik pertama — dan keputusan terbaikmu dibuat setelah gelombang itu berlalu.',
    color: 'bg-amber-500',
    ring: 'ring-amber-500/20',
    textAccent: 'text-amber-600',
  },
  {
    step: '03',
    tag: 'Evaluasi',
    title: 'Tanyakan pada Diri Sendiri',
    body: '"Apakah membalas ini akan mengubah pikiran mereka, atau hanya membuang energiku?" Jika jawabannya kedua, kamu sudah tahu apa yang harus dilakukan.',
    color: 'bg-[#5db8a6]',
    ring: 'ring-[#5db8a6]/20',
    textAccent: 'text-[#3d8c7c]',
  },
  {
    step: '04',
    tag: 'Aksi',
    title: 'Tutup dan Tinggalkan',
    body: 'Kemenangan terbesar di internet adalah memilih pertempuran yang layak dilawan. Walk away bukan kelemahan — itu adalah keputusan strategis seseorang yang menghargai energi mentalnya.',
    color: 'bg-primary',
    ring: 'ring-primary/20',
    textAccent: 'text-primary',
  },
];

function TimelineItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -28 : 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Node column */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: index * 0.08 + 0.1 }}
          className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center ring-4 ${item.ring} flex-shrink-0 shadow-sm`}
        >
          <span className="font-sans text-[11px] font-bold text-white">{item.step}</span>
        </motion.div>
        {/* Connector line — not shown for last item */}
        {index < TIMELINE_ITEMS.length - 1 && (
          <div className="w-px flex-1 min-h-[40px] bg-hairline mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="pb-10 flex-1 min-w-0">
        <span className={`font-sans text-[11px] font-semibold uppercase tracking-[2px] ${item.textAccent}`}>
          {item.tag}
        </span>
        <h4 className="font-serif text-[22px] text-ink tracking-tight mt-0.5 leading-snug">
          {item.title}
        </h4>
        <p className="font-sans text-[15px] text-body leading-relaxed mt-2 max-w-lg">
          {item.body}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Article Modal ────────────────────────────────────────────────────────────

function ArticleModal({ article, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-canvas border border-hairline rounded-xl p-8 max-w-xl w-full max-h-[80vh] overflow-y-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <p className={`font-sans text-[11px] font-semibold uppercase tracking-[2px] mb-2 ${article.tagColor}`}>
            {article.tag}
          </p>
          <h3 className="font-serif text-[28px] text-ink tracking-tight leading-snug mb-4">
            {article.title}
          </h3>
          <p className="font-sans text-[15px] text-body leading-relaxed mb-4">
            {article.full}
          </p>
          <button
            onClick={onClose}
            className="font-sans text-[14px] text-muted hover:text-ink transition-colors border-b border-hairline pb-0.5"
          >
            Tutup ↑
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Editorial Articles ───────────────────────────────────────────────────────

const ARTICLES = [
  {
    tag: 'Psikologi Digital',
    tagColor: 'text-[#c64545]',
    title: 'Anatomi Komentar Jahat',
    excerpt:
      'Mengapa layar kaca membuat kita kehilangan empati? Menjelajahi fenomena Online Disinhibition Effect di kalangan remaja...',
    full:
      'Online Disinhibition Effect adalah fenomena psikologis di mana seseorang berperilaku berbeda — seringkali lebih agresif atau tidak sopan — saat berinteraksi secara online dibandingkan saat tatap muka. John Suler, seorang psikolog klinis, mengidentifikasi dua bentuknya: "benign disinhibition" (keterbukaan positif) dan "toxic disinhibition" (keberanian untuk menyakiti). Anonimitas, ketidaksinkronan respons, dan minimnya isyarat nonverbal di dunia digital menciptakan ilusi bahwa kata-kata tidak berdampak nyata — padahal setiap komentar memiliki penerima yang merasakan dampaknya di dunia nyata.',
    size: 'large', // takes 2/3 of grid
  },
  {
    tag: 'Kesehatan Mental',
    tagColor: 'text-amber-600',
    title: 'Kesehatan Mental vs Algoritma Kemarahan',
    excerpt:
      'Media sosial dirancang untuk memprioritaskan kemarahan karena memicu lebih banyak interaksi. Jangan biarkan emosimu dimonetisasi...',
    full:
      'Algoritma platform media sosial secara konsisten memprioritaskan konten yang memicu reaksi emosi kuat — terutama kemarahan dan outrage — karena konten tersebut menghasilkan lebih banyak klik, komentar, dan waktu layar. Fenomena ini, yang oleh peneliti disebut sebagai "outrage amplification", menciptakan siklus di mana pengguna yang marah menghasilkan lebih banyak konten yang memancing kemarahan pengguna lain. Menyadari mekanisme ini adalah langkah pertama untuk tidak menjadi korban — atau pelaku — dari siklus tersebut.',
    size: 'small',
  },
];

function EditorialSection() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <motion.section {...inViewFade} className="space-y-8">
      <div className="flex items-center gap-4">
        <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-[2px]">Bacaan Ringkas</p>
        <div className="flex-1 h-px bg-hairline" />
      </div>

      {/* Asymmetric editorial grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-hairline rounded-xl overflow-hidden">
        {/* Large article — 2/3 */}
        <motion.article
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 p-8 md:border-r border-b md:border-b-0 border-hairline bg-surface-card/40 flex flex-col gap-4"
        >
          <span className={`font-sans text-[11px] font-semibold uppercase tracking-[2px] ${ARTICLES[0].tagColor}`}>
            {ARTICLES[0].tag}
          </span>
          <h3 className="font-serif text-[30px] md:text-[36px] text-ink tracking-tight leading-[1.1]">
            {ARTICLES[0].title}
          </h3>
          <p className="font-sans text-[15px] text-body leading-relaxed flex-1">
            {ARTICLES[0].excerpt}
          </p>
          <button
            onClick={() => setActiveModal(ARTICLES[0])}
            className="self-start font-sans text-[14px] font-medium text-primary hover:underline underline-offset-4 transition-all flex items-center gap-1.5 group"
          >
            Baca selengkapnya
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </motion.article>

        {/* Small article — 1/3 */}
        <motion.article
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="p-8 bg-surface-dark flex flex-col gap-4"
        >
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[2px] text-on-dark-soft">
            {ARTICLES[1].tag}
          </span>
          <h3 className="font-serif text-[22px] text-on-dark tracking-tight leading-snug">
            {ARTICLES[1].title}
          </h3>
          <p className="font-sans text-[14px] text-on-dark-soft leading-relaxed flex-1">
            {ARTICLES[1].excerpt}
          </p>
          <button
            onClick={() => setActiveModal(ARTICLES[1])}
            className="self-start font-sans text-[14px] font-medium text-[#5db8a6] hover:underline underline-offset-4 flex items-center gap-1.5 group"
          >
            Baca selengkapnya
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </motion.article>
      </div>

      {/* Modal */}
      {activeModal && (
        <ArticleModal article={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </motion.section>
  );
}

// ─── Closing Quote ────────────────────────────────────────────────────────────

function ClosingQuote({ onReset }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="pt-16 pb-8 text-center space-y-10"
    >
      {/* Decorative rule */}
      <div className="flex items-center gap-6 max-w-xs mx-auto">
        <div className="flex-1 h-px bg-hairline" />
        <span className="text-[#cc785c] text-[20px]">✦</span>
        <div className="flex-1 h-px bg-hairline" />
      </div>

      <blockquote className="max-w-2xl mx-auto">
        <p className="font-serif text-[26px] md:text-[34px] text-muted italic leading-[1.3] tracking-tight">
          "Kata-kata di dunia maya bersifat permanen. Pastikan apa yang Anda ketik adalah sesuatu yang pantas dibaca selamanya."
        </p>
      </blockquote>

      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 font-sans text-[15px] font-medium text-muted border border-hairline rounded-full px-8 py-3 hover:bg-surface-card hover:text-ink hover:border-primary transition-all duration-300 group"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Kembali ke Beranda
      </button>
    </motion.section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Summary() {
  const navigate = useNavigate();
  const { userData, resetUserData } = useCampaign();
  const [submitStatus, setSubmitStatus] = useState('idle');
  const submitted = useRef(false);

  const { preTest, postTest, sandboxInteractions, feedback } = userData;
  // sandboxResult: 'mindful' | 'reactive' | null — ditulis oleh Sandbox.jsx
  const sandboxResult = sandboxInteractions?.sandboxResult ?? null;
  const persona = getPersonaProfile(sandboxResult);

  // Fire-and-forget Firestore submit on mount
  useEffect(() => {
    if (submitted.current) return;
    submitted.current = true;
    setSubmitStatus('loading');

    (async () => {
      try {
        const docId = await submitSurveyResponse(userData);
        console.log('[Firebase] Data berhasil disimpan dengan ID:', docId);
        localStorage.setItem('campaignCompleted', 'true');
        setSubmitStatus('done');
      } catch (error) {
        console.error('[Firebase] Gagal menyimpan data ke Firestore:', error);
        setSubmitStatus('error');
      } finally {
        // Pastikan state loading dimatikan apapun yang terjadi
        setSubmitStatus((prev) => (prev === 'loading' ? 'error' : prev));
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePrint = () => window.print();
  const handleReset = () => { resetUserData(); navigate('/'); };

  const metrics = [
    { label: 'Tingkat Impulsivitas', preVal: preTest.q5, postVal: postTest.q4 },
    { label: 'Kemampuan Jeda Kognitif', preVal: preTest.q4, postVal: postTest.q3 },
  ];

  return (
    <div className="min-h-screen bg-transparent relative">

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 bg-canvas/80 backdrop-blur-md border-b border-hairline print:hidden">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 font-sans text-[14px] font-medium text-muted hover:text-ink transition-colors group">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Beranda
          </button>
          <button onClick={handlePrint} title="Cetak / Simpan PDF"
            className="w-9 h-9 rounded-full border border-hairline bg-canvas hover:bg-surface-soft transition-colors flex items-center justify-center text-muted hover:text-ink">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-20">

        {/* ── Hero ── */}
        <motion.div {...fadeUp(0)} className="text-center space-y-4">
          <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-[2px]">Digital Empathy · Hasil Akhir</p>
          <h1 className="font-serif text-[40px] md:text-[56px] text-ink tracking-tight leading-[1.05]">Refleksi Digital Anda</h1>
          <p className="font-sans text-[17px] text-muted max-w-xl mx-auto leading-relaxed">
            Berdasarkan data pre-test, simulasi interaktif, dan post-test yang telah Anda selesaikan.
          </p>
        </motion.div>

        {/* ── BLOK 1: Persona ── */}
        <motion.section {...fadeUp(0.1)} className="space-y-4">
          <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-[2px]">Tipe Respons Ruang Digital Anda</p>
          <div className={`rounded-xl border p-8 space-y-4 ${persona.color}`}>
            <div className="flex items-start gap-5">
              <span className="text-[44px] leading-none flex-shrink-0">{persona.icon}</span>
              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-serif text-[28px] text-ink tracking-tight">{persona.label}</h2>
                  <span className={`font-sans text-[12px] font-semibold px-3 py-1 rounded-full ${persona.badgeColor}`}>{persona.sublabel}</span>
                </div>
                <p className="font-sans text-[15px] text-body leading-relaxed max-w-xl">{persona.description}</p>
              </div>
            </div>
            {sandboxResult === null && (
              <p className="font-sans text-[13px] text-muted-soft italic">
                * Data sandbox tidak tersimpan. Selesaikan simulasi terlebih dahulu untuk melihat profil yang akurat.
              </p>
            )}
          </div>
        </motion.section>

        {/* ── BLOK 2: Pre vs Post ── */}
        <motion.section {...fadeUp(0.2)} className="space-y-6">
          <div className="flex items-center gap-4">
            <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-[2px]">Perbandingan Sebelum &amp; Sesudah</p>
            <div className="flex-1 h-px bg-hairline" />
          </div>
          <div className="flex gap-5 text-[13px] font-sans font-medium text-muted-soft">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-muted/60" /><span>Pre-Test</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /><span>Post-Test</span></div>
          </div>
          <div className="bg-canvas border border-hairline rounded-xl p-8 space-y-8">
            {metrics.map((m, i) => (
              <ScoreBar key={m.label} label={m.label} preVal={m.preVal} postVal={m.postVal} delay={0.3 + i * 0.15} />
            ))}
          </div>
          <p className="font-sans text-[13px] text-muted-soft leading-relaxed">
            Skala 1–5 (Sangat Tidak Setuju → Sangat Setuju). Bar coral menunjukkan skor post-test.
          </p>
        </motion.section>

        {/* ── BLOK 3: Vertical Timeline ── */}
        <motion.section {...inViewFade} className="space-y-8">
          <div className="flex items-center gap-4">
            <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-[2px]">Strategi Pencegahan</p>
            <div className="flex-1 h-px bg-hairline" />
          </div>
          <h3 className="font-serif text-[26px] md:text-[32px] text-ink tracking-tight leading-snug">
            Langkah-Langkah Menghindari Rage-Bait
          </h3>
          <div className="mt-4">
            {TIMELINE_ITEMS.map((item, idx) => (
              <TimelineItem key={item.step} item={item} index={idx} />
            ))}
          </div>
        </motion.section>

        {/* ── BLOK 4: Editorial Articles ── */}
        <EditorialSection />

        {/* ── Feedback (if provided) ── */}
        {feedback && feedback.trim() && (
          <motion.section {...inViewFade} className="space-y-3">
            <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-[2px]">Masukan Anda</p>
            <blockquote className="border-l-2 border-primary pl-5 font-sans text-[15px] text-body italic leading-relaxed">
              "{feedback}"
            </blockquote>
            <p className="font-sans text-[13px] text-muted-soft">
              Terima kasih telah meluangkan waktu memberikan masukan. Ini sangat berarti bagi penelitian kami.
            </p>
          </motion.section>
        )}

        {/* ── Data submit status ── */}
        <motion.div {...inViewFade} className="text-center space-y-3 pt-4 border-t border-hairline">
          <div className="flex items-center justify-center gap-2">
            {submitStatus === 'loading' && (
              <>
                <svg className="w-4 h-4 animate-spin text-muted" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span className="font-sans text-[13px] text-muted">Menyimpan data...</span>
              </>
            )}
            {submitStatus === 'done' && (
              <>
                <svg className="w-4 h-4 text-[#5db872]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span className="font-sans text-[13px] text-muted-soft">Data Anda telah disimpan secara anonim untuk kepentingan penelitian akademik.</span>
              </>
            )}
            {submitStatus === 'error' && (
              <span className="font-sans text-[13px] text-muted-soft">Penyimpanan data gagal. Namun sesi Anda tetap terhitung.</span>
            )}
          </div>
          <p className="font-sans text-[12px] text-muted-soft/60">
            Kampanye "Digital Empathy" · {new Date().getFullYear()}
          </p>
        </motion.div>

        {/* ── Closing Quote & CTA ── */}
        <ClosingQuote onReset={handleReset} />

      </div>
    </div>
  );
}
