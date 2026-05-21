import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const toxicWords = ["Ejekan", "Hinaan", "Ancaman", "Sampah", "Cacian"];
const niceWords = ["Pujian", "Dukungan", "Rangkulan", "Solusi", "Harapan"];

function HeroSection() {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRevealed(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % toxicWords.length);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isReplayMode = localStorage.getItem('campaignCompleted') === 'true';

  return (
    <section id="beranda" className="relative w-full min-h-[calc(100vh-64px)] scroll-mt-16 flex flex-col items-center justify-center text-center px-4 md:px-8 max-w-5xl mx-auto py-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-12 w-full"
      >
        <h1 className="font-serif text-[48px] md:text-[80px] leading-[1.05] tracking-[-1.5px] text-ink max-w-4xl mx-auto">
          Kata-kata memiliki kekuatan. <br className="hidden md:block" />
          Apakah komentarmu sebuah{' '}
          <span
            className="inline-grid relative cursor-pointer group px-1 mx-1"
            style={{ placeItems: 'center' }}
            onMouseEnter={() => setIsRevealed(true)}
            onMouseLeave={() => setIsRevealed(false)}
          >
            <span className="col-start-1 row-start-1 relative z-10 text-primary transition-all duration-300 group-hover:text-transparent">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex + "-toxic"}
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4 }}
                  className="inline-block"
                >
                  {toxicWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="col-start-1 row-start-1 relative z-0 text-success opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex + "-nice"}
                  className="inline-block"
                >
                  {niceWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <div className="absolute inset-0 bg-ink/10 blur-[8px] rounded-lg -z-10 group-hover:bg-success/20 transition-colors duration-300 scale-110"></div>
          </span>
          ?
        </h1>

        <div className="flex flex-col items-center space-y-6">
          <p className="font-sans text-[18px] md:text-[22px] text-muted max-w-2xl mx-auto leading-relaxed">
            Dunia digital sering kali menghilangkan empati. Mari kita sadari dampak dari jejak digital kita dan pelajari cara berinteraksi dengan lebih manusiawi.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="primary"
              className="h-[56px] px-8 text-[16px] md:text-[18px] shadow-[0_4px_14px_rgba(204,120,92,0.39)] hover:shadow-[0_6px_20px_rgba(204,120,92,0.23)] transition-all"
              onClick={() => navigate(isReplayMode ? '/sandbox' : '/pre-test')}
            >
              {isReplayMode ? 'Coba Ulang Simulasi' : 'Mulai Simulasi'}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function TentangKampanye() {
  const alurData = [
    {
      title: "Evaluasi Awal",
      desc: "Kami mengukur kecenderungan impulsivitas dan kebiasaan berinternet Anda melalui instrumen tes singkat.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      title: "Simulasi Sandbox",
      desc: "Anda akan dilempar ke dalam skenario perdebatan panas. Setiap pilihan respons Anda akan memengaruhi arah percakapan dan memicu balasan baru.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
        </svg>
      )
    },
    {
      title: "Analisis Profil",
      desc: "Di akhir simulasi, Anda akan mendapatkan dasbor refleksi psikologis otomatis yang memetakan tipe perilaku digital Anda, lengkap dengan strategi mitigasinya.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="tentang" className="w-full min-h-[calc(100vh-64px)] scroll-mt-16 py-section px-4 md:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-4xl space-y-12"
      >
        <div className="space-y-8 max-w-3xl mx-auto">
          <h2 className="font-serif text-[36px] md:text-[48px] text-ink tracking-tight">
            Tentang Kampanye
          </h2>
          <p className="font-sans text-[20px] md:text-[24px] text-body-strong leading-relaxed font-medium">
            Sebuah ruang simulasi interaktif untuk menguji batas kesabaran dan regulasi emosi Anda di dunia maya.
          </p>
          <p className="font-sans text-[16px] text-muted leading-relaxed">
            Kampanye ini bukan sekadar kumpulan artikel untuk dibaca. Kami membangun lingkungan media sosial tiruan yang dirancang khusus untuk memicu emosi Anda melalui rekayasa rage-bait (pancingan amarah). Alih-alih hanya berteori tentang bahaya cyberaggression, kami menantang Anda untuk berhadapan langsung dengan provokasi digital dan melihat apakah Anda mampu menahan diri.
          </p>
        </div>

        {/* ── Grid Poin-Poin Alur ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-4">
          {alurData.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
              className="bg-surface-card rounded-xl p-8 flex flex-col items-start text-left border border-hairline shadow-sm"
            >
              <div className="mb-6 p-3 bg-canvas rounded-full border border-hairline flex items-center justify-center">
                {item.icon}
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[12px] font-bold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <h3 className="font-sans text-[18px] text-ink font-semibold tracking-tight">
                  {item.title}
                </h3>
              </div>
              <p className="font-sans text-[14px] text-body leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Section #pengertian ─────────────────────────────────────────────────────

const POINTERS = [
  {
    label: 'Serangan Identitas / Personal',
    desc: 'Menyerang siapa seseorang, bukan argumen atau tindakannya.',
    highlight: 'Dasar beban kelompok',
    color: '#c64545',
    ring: 'ring-[#c64545]/30',
    badge: 'bg-[#c64545]/10 text-[#c64545] border-[#c64545]/20',
  },
  {
    label: 'Tujuan Menyakiti Secara Psikologis',
    highlight: 'otak lu di mana sih',
    desc: 'Dirancang bukan untuk berdebat, melainkan untuk merendahkan dan mempermalukan.',
    color: '#cc785c',
    ring: 'ring-[#cc785c]/30',
    badge: 'bg-[#cc785c]/10 text-[#cc785c] border-[#cc785c]/20',
  },
  {
    label: 'Sifat Anonim / Jarak Jauh',
    highlight: 'ngilang aja dari kampus',
    desc: 'Keberanian muncul karena layar memberi ilusi tanpa konsekuensi.',
    color: '#6c6a64',
    ring: 'ring-[#6c6a64]/20',
    badge: 'bg-[#6c6a64]/10 text-[#6c6a64] border-[#6c6a64]/20',
  },
];

function HighlightedComment() {
  const parts = [
    { text: 'Dasar beban kelompok', pointer: 0 },
    { text: ', ', pointer: null },
    { text: 'otak lu di mana sih', pointer: 1 },
    { text: '? Mending lu ', pointer: null },
    { text: 'ngilang aja dari kampus', pointer: 2 },
    { text: '!', pointer: null },
  ];
  return (
    <p className="font-sans text-[17px] md:text-[20px] text-ink leading-relaxed text-center">
      {parts.map((part, i) =>
        part.pointer !== null ? (
          <motion.mark
            key={i}
            initial={{ backgroundColor: 'transparent' }}
            whileInView={{ backgroundColor: `${POINTERS[part.pointer].color}22` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.3 + part.pointer * 0.25 }}
            className="px-1 rounded cursor-default"
            style={{ color: POINTERS[part.pointer].color }}
          >
            {part.text}
          </motion.mark>
        ) : (
          <span key={i} className="text-body">{part.text}</span>
        )
      )}
    </p>
  );
}

function PengertianCyberaggression() {
  return (
    <section
      id="pengertian"
      className="w-full scroll-mt-16 py-section px-4 md:px-8 max-w-5xl mx-auto"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 space-y-3"
      >
        <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-[2px]">Pengertian</p>
        <h2 className="font-serif text-[36px] md:text-[48px] text-ink tracking-tight leading-[1.1]">
          Lebih dari Sekadar Kata-kata
        </h2>
        <p className="font-sans text-[17px] text-muted max-w-xl mx-auto leading-relaxed">
          Cyberaggression adalah perilaku agresif yang disengaja dan berulang, dimediasi teknologi digital, yang bertujuan menyakiti individu atau kelompok.
        </p>
      </motion.div>

      {/* BLOK 1: Anatomi Komentar */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-hairline" />
          <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-[2.5px] whitespace-nowrap">Anatomi Komentar Agresif</p>
          <div className="flex-1 h-px bg-hairline" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-2xl bg-surface-card border border-hairline rounded-xl px-8 py-7 shadow-[0_2px_12px_rgba(20,20,19,0.06)]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-surface-cream-strong border border-hairline flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8e8b82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="space-y-1">
              <div className="h-2.5 w-24 bg-hairline rounded-full" />
              <div className="h-2 w-16 bg-hairline-soft rounded-full" />
            </div>
          </div>
          <HighlightedComment />
          <span className="absolute -top-4 -left-3 text-[60px] text-hairline font-serif leading-none select-none" aria-hidden>&#10077;</span>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {POINTERS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.14 }}
              className={`flex flex-col gap-3 p-5 rounded-xl border bg-canvas ring-1 ${p.ring}`}
              style={{ borderColor: `${p.color}30` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: p.color }}
                >
                  {i + 1}
                </span>
                <span className={`font-sans text-[11px] font-semibold px-2.5 py-1 rounded-full border ${p.badge}`}>
                  {p.label}
                </span>
              </div>
              <p className="font-sans text-[13px] text-muted-soft">
                Contoh:{' '}
                <span className="font-semibold" style={{ color: p.color }}>“{p.highlight}”</span>
              </p>
              <p className="font-sans text-[14px] text-body leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BLOK 2: Mitos vs Realita */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-hairline" />
          <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-[2.5px] whitespace-nowrap">Mitos vs Realita</p>
          <div className="flex-1 h-px bg-hairline" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden border border-hairline">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-10 bg-surface-card md:border-r border-b md:border-b-0 border-hairline flex flex-col gap-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[18px]">&#128683;</span>
              <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-[2px]">Mitos yang Beredar</p>
            </div>
            <p className="font-serif text-[22px] md:text-[26px] text-muted leading-snug tracking-tight line-through decoration-[#c64545]/50 decoration-2">
              “Ini cuma internet. Kalau tersinggung, tutup aja aplikasinya.”
            </p>
            <p className="font-sans text-[14px] text-muted-soft leading-relaxed">
              Anggapan umum bahwa dunia digital terpisah dari kenyataan, sehingga dampaknya dianggap tidak nyata.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="p-8 md:p-10 bg-surface-dark flex flex-col gap-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[18px]">&#129504;</span>
              <p className="font-sans text-[11px] font-semibold text-on-dark-soft uppercase tracking-[2px]">Fakta Ilmiah</p>
            </div>
            <p className="font-serif text-[22px] md:text-[26px] text-on-dark leading-snug tracking-tight">
              “Otak memproses penolakan digital di area yang{' '}
              <span className="text-[#5db8a6]">sama dengan rasa sakit fisik</span>.”
            </p>
            <p className="font-sans text-[14px] text-on-dark-soft leading-relaxed">
              Layar tidak memblokir kerusakan mental. Studi neuroimaging (Eisenberger, 2003) menunjukkan penolakan sosial daring mengaktifkan dorsal anterior cingulate cortex — region nyeri fisik.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function DampakPsikologis() {
  const navigate = useNavigate();

  const dampakData = [
    {
      title: "Efek Disinhibisi Daring",
      desc: "Merasa kebal tanpa tatap muka, memicu tindakan impulsif yang tidak berani dilakukan di dunia nyata.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          <line x1="2" y1="2" x2="22" y2="22" className="text-error"></line>
        </svg>
      )
    },
    {
      title: "Jejak Digital Permanen",
      desc: "Komentar impulsif yang ditinggalkan hari ini akan tetap ada dan berpotensi merusak reputasi di masa depan.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      )
    },
    {
      title: "Kerusakan Mental",
      desc: "Memicu siklus depresi dan kecemasan, tidak hanya bagi korban, namun juga berdampak pada pelakunya.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
          <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
          <circle cx="12" cy="12" r="2"></circle>
          <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
          <path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="dampak" className="w-full min-h-[calc(100vh-64px)] scroll-mt-16 py-section px-4 md:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center space-y-12"
      >
        <div className="text-center space-y-4">
          <h2 className="font-serif text-[36px] md:text-[48px] text-ink tracking-tight">
            Bahaya Cyberaggression
          </h2>
          <p className="font-sans text-[18px] text-muted max-w-xl mx-auto">
            Memahami konsekuensi psikologis dari apa yang kita ketik di internet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {dampakData.map((item, index) => (
            <div key={index} className="bg-surface-card rounded-lg p-xl flex flex-col items-start text-left">
              <div className="mb-6 p-3 bg-canvas rounded-full border border-hairline">
                {item.icon}
              </div>
              <h3 className="font-sans text-[18px] text-ink font-medium mb-3">
                {item.title}
              </h3>
              <p className="font-sans text-[14px] text-body leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <Button
            variant="primary"
            className="h-[48px] px-8 text-[16px]"
            onClick={() => navigate('/pre-test')}
          >
            Uji Literasi Emosimu Sekarang
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <TentangKampanye />
      <PengertianCyberaggression />
      <DampakPsikologis />
    </div>
  );
}
