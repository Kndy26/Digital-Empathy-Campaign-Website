import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCampaign } from '../context/CampaignContext';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const XLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-current">
    <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.29.192-.489.514-.489.864v13.815c0 .694.521 1.174 1.175 1.174h6.021c.322 0 .588-.256.588-.577v-7.735c0-.322.256-.577.588-.577h4.366c.322 0 .588.255.588.577v7.735c0 .321.266.577.588.577h6.021c.654 0 1.175-.48 1.175-1.174V8.01c0-.35-.199-.672-.489-.864z" />
  </svg>
);
const ExploreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-current">
    <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5 4.694 0 8.5 3.806 8.5 8.5 0 1.986-.682 3.815-1.814 5.262l4.276 4.276-1.414 1.414-4.276-4.276A8.457 8.457 0 0110.25 18.75c-4.694 0-8.5-3.806-8.5-8.5z" />
  </svg>
);
const NotifIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-current">
    <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.626 2.268 6.013 5.295L18.866 16H5.134z" />
  </svg>
);
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-current">
    <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v9c0 1.381-1.119 2.5-2.5 2.5H14.5l-4.5 4v-4h-5.5c-1.381 0-2.5-1.119-2.5-2.5v-9z" />
  </svg>
);
const GrokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-current">
    <path d="M16.2 2L9.5 12.7 16.7 22H13L7.5 14.5 3 22H1L7.8 11.4 1.2 2H5l5 7 4.5-7h1.7z" />
  </svg>
);
const BookmarkNavIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-current">
    <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z" />
  </svg>
);
const CreatorIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-current">
    <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.98-7.054.5-3.972-2.065-8.207-6.013-9.82C16.97 1.783 20.5 2 23 3zm-8 10h-4.5c.57-2.27 1.716-4.407 3.5-6h5.5c-1.5 2.11-3.026 4.5-4.5 6zm4.5-8h-5.5c-.5.5-1 1.02-1.45 1.56A12.06 12.06 0 0112 7h-2c.82-1.71 2.02-3.05 3.5-4h4.5l-.5 2z" />
  </svg>
);
const PremiumIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-current">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);
const ProfileNavIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-current">
    <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.787l.11 1.223h-17.21l.11-1.223c.265-2.987 1.154-5.207 2.632-6.787zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zm0 6c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4z" />
  </svg>
);
const MoreNavIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-current">
    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
  </svg>
);
const VerifiedIcon = () => (
  <svg viewBox="0 0 22 22" className="w-[16px] h-[16px] fill-[#1d9bf0] inline-block ml-0.5 flex-shrink-0">
    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.144.271.586.702 1.084 1.24 1.438.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.225 1.261.276 1.894.147.634-.13 1.219-.435 1.69-.88.445-.47.749-1.055.878-1.691.13-.634.075-1.293-.148-1.9.586-.272 1.084-.702 1.438-1.241.354-.54.551-1.169.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
  </svg>
);
const ReplyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" /></svg>
);
const RepostIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2h3v2h-3c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H13V4h3.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" /></svg>
);
const LikeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.965 3.036 4.16 6.105 6.58l.02.01.021-.01c3.07-2.42 5.032-4.615 6.107-6.58 1.112-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-3.816 5.09-7.337 7.869-.034.03-.074.044-.114.044s-.08-.015-.115-.044c-3.52-2.78-5.986-5.39-7.337-7.87-1.36-2.5-1.41-4.7-.514-6.52.884-1.79 2.628-2.91 4.53-3.01 1.67-.09 3.473.7 4.95 2.71 1.477-2.01 3.28-2.8 4.95-2.71 1.902.1 3.646 1.22 4.53 3.01.896 1.82.846 4.02-.514 6.52z" /></svg>
);
const ViewIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M8.75 21V3h2v18h-2zM18.75 21V8.5h2V21h-2zM13.75 21v-9h2v9h-2zM3.75 21v-5h2v5h-2z" /></svg>
);
const BookmarkIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z" /></svg>
);
const ShareIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" /></svg>
);
const MoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" /></svg>
);
const ImageIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1d9bf0]"><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" /></svg>
);
const GifIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1d9bf0]"><path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM15.5 12.5H14v-1h1.5c.28 0 .5-.224.5-.5s-.22-.5-.5-.5H14c-.83 0-1.5.672-1.5 1.5v1c0 .828.67 1.5 1.5 1.5h1.5c.28 0 .5-.224.5-.5s-.22-.5-.5-.5zM7 11c0-.276.22-.5.5-.5H9c.28 0 .5.224.5.5s-.22.5-.5.5H8v1h1c.28 0 .5.224.5.5s-.22.5-.5.5H7.5c-.28 0-.5-.224-.5-.5V11zm3.5 0c0-.276.22-.5.5-.5s.5.224.5.5v2.5c0 .276-.22.5-.5.5s-.5-.224-.5-.5V11z" /></svg>
);
const EmojiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1d9bf0]"><path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.054 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z" /></svg>
);

// ─── Scenario Tree (Rage-Bait Loop — MBG Politik) ────────────────────────────
//
// Structure per-stage:
//   { choices: [{ id, tone, label, text, opReply, nextStage?, isWalkaway? }] }
//
// nextStage is a function (id) => stageName  OR  a static string.
// Stages: 'stage0' → 'stage1_{A|B|C}' → 'stage2' → 'stage3_{A|B}' → 'stage4'
//         Walk-away at stage2-C or stage4-B → ending 'mindful'
//         Continue at stage4-A → ending 'reactive'

const SCENARIO_TREE = {
  // ── STAGE 0 — Pilihan respons pertama user ──────────────────────────────────
  stage0: {
    prompt: 'Pilih balasanmu:',
    replyingTo: '@PatriotGizi',
    choices: [
      {
        id: 'A',
        tone: 'aggressive',
        label: '😤 Agresif',
        text: 'Ngomong apa sih buzzer Rp. Anggaran triliunan pelaksanaannya amburadul, lauk basi lu tutup mata ya?',
        // OP reply is stage-specific, stored in stage1_A
        nextStage: 'stage1_A',
      },
      {
        id: 'B',
        tone: 'passive',
        label: '🧠 Logis / Kritis',
        text: 'Bukan soal anak SD-nya, tapi alokasi pajaknya. Harusnya buat infrastruktur pendidikan, bukan bagi-bagi nasi kotak.',
        nextStage: 'stage1_B',
      },
      {
        id: 'C',
        tone: 'constructive',
        label: '🛡️ Defensif Personal',
        text: 'Urusan jajan pakai uang sendiri kenapa disangkutpautkan sama kebijakan negara? Logika lu cacat.',
        nextStage: 'stage1_C',
      },
    ],
  },

  // ── STAGE 1 — Balasan OP (jeda 2 detik) — satu per cabang ──────────────────
  stage1_A: {
    opReply: 'Cie nuduh buzzer karena miskin literasi. Yang basi itu cuma 1 dari jutaan porsi. Lu aja yang phobia lihat negara maju. Susah emang debat sama generasi micin.',
    nextStage: 'stage2',
  },
  stage1_B: {
    opReply: 'Sok ngerti APBN. Lu bayar pajak berapa sih? Paling cuma PPN pas nongkrong di kafe. Nggak napak tanah, sok kritis tapi orang miskin lu diemin.',
    nextStage: 'stage2',
  },
  stage1_C: {
    opReply: 'Nah ketahuan hipokritnya. Duit dibakar buat penyakit lu dukung, negara mau bantu gizi balita lu protes. Cerminan generasi gagal.',
    nextStage: 'stage2',
  },

  // ── STAGE 2 — Pilihan respons kedua user (jebakan makin dalam) ──────────────
  stage2: {
    prompt: 'OP membalas lagi. Apa yang kamu lakukan?',
    replyingTo: '@PatriotGizi',
    choices: [
      {
        id: 'A',
        tone: 'aggressive',
        label: '⚔️ Serang Balik',
        text: 'Orang miskin apanya? Tender kateringnya aja banyak yang masuk kantong pejabat lokal. Lu dibayar berapa buat jilat penguasa?',
        nextStage: 'stage3_A',
      },
      {
        id: 'B',
        tone: 'passive',
        label: '🤔 Counter-Argument',
        text: 'Gizi itu dari perbaikan ekonomi keluarga. Kalau cuma bagi-bagi proyek tender mah namanya korupsi berkedok bansos.',
        nextStage: 'stage3_B',
      },
      {
        id: 'C',
        tone: 'constructive',
        label: '🚶 Abaikan & Tinggalkan',
        text: null,
        isWalkaway: true,
        nextStage: 'done_mindful',
      },
    ],
  },

  // ── STAGE 3 — Balasan final OP (jeda 2 detik) — dua cabang ─────────────────
  stage3_A: {
    opReply: 'Hoax lu telan mentah-mentah. Fitnah terus kerjaan lu. Pantesan negara susah maju, isinya orang-orang bermental oposisi sakit hati kayak lu.',
    nextStage: 'stage4',
  },
  stage3_B: {
    opReply: 'Teori doang. Perut anak lapar nggak bisa nunggu ekonomi keluarga lu perbaiki. Lu enak hidup mulus, bacot lu nggak berguna buat rakyat kecil.',
    nextStage: 'stage4',
  },

  // ── STAGE 4 — Titik kritis: teruskan atau pergi ────────────────────────────
  stage4: {
    prompt: 'Ini titik kritis. Apa yang kamu pilih?',
    replyingTo: '@PatriotGizi',
    choices: [
      {
        id: 'A',
        tone: 'aggressive',
        label: '🔥 Ketik Balasan Lagi',
        text: 'Lu yang nggak ngerti realita. Gue nggak akan diam sampai lu akui kebusukan ini.',
        nextStage: 'done_reactive',
        endsLoop: true,
      },
      {
        id: 'B',
        tone: 'constructive',
        label: '📵 Tutup Aplikasi / Berhenti Membalas',
        text: null,
        isWalkaway: true,
        nextStage: 'done_mindful',
      },
    ],
  },
};

// ─── TRENDS DATA ──────────────────────────────────────────────────────────────
const TRENDS = [
  { category: 'Trending di Indonesia', tag: '#MBG' },
  { category: 'Politics · Trending', tag: '#ProgramMBG' },
  { category: 'Economics · Trending', tag: 'APBN2025' },
  { category: 'Technology · Trending', tag: '#Gemini3.5' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SidebarNavItem({ icon, label, active = false, badge = null }) {
  return (
    <div className={`flex items-center gap-4 px-3 py-3 rounded-full cursor-pointer transition-colors hover:bg-white/10 ${active ? 'font-bold' : ''}`}>
      <span className="text-[#e7e9ea]">{icon}</span>
      <span className={`text-[19px] leading-none hidden xl:block ${active ? 'font-bold' : 'font-normal'} text-[#e7e9ea]`}>{label}</span>
      {badge && <span className="ml-auto hidden xl:flex bg-[#1d9bf0] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm">{badge}</span>}
    </div>
  );
}

// ─── Choice Card Component ────────────────────────────────────────────────────

function ChoiceCard({ choice, selected, onSelect, disabled }) {
  const toneStyles = {
    aggressive: 'border-red-500/40 hover:border-red-500/70 hover:bg-red-500/5',
    passive:    'border-yellow-500/40 hover:border-yellow-500/70 hover:bg-yellow-500/5',
    constructive: 'border-green-500/40 hover:border-green-500/70 hover:bg-green-500/5',
  };
  const selectedStyles = {
    aggressive:   'border-red-500 bg-red-500/10 ring-1 ring-red-500/30',
    passive:      'border-yellow-500 bg-yellow-500/10 ring-1 ring-yellow-500/30',
    constructive: 'border-green-500 bg-green-500/10 ring-1 ring-green-500/30',
  };

  const isSelected = selected === choice.id;

  return (
    <motion.button
      onClick={() => !disabled && onSelect(choice.id)}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
        isSelected
          ? selectedStyles[choice.tone]
          : disabled
            ? 'border-[#2f3336] opacity-40 cursor-not-allowed'
            : `border-[#2f3336] ${toneStyles[choice.tone]} cursor-pointer`
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
          isSelected ? 'border-[#1d9bf0]' : 'border-[#71767b]'
        }`}>
          {isSelected && <div className="w-2 h-2 rounded-full bg-[#1d9bf0]" />}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[12px] font-semibold text-[#71767b] block mb-0.5">{choice.label}</span>
          <p className="text-[14px] text-[#e7e9ea] leading-snug">
            {choice.text ?? 'Diam dan tinggalkan percakapan ini.'}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

// ─── Inline Choice Input ──────────────────────────────────────────────────────

function InlineChoiceInput({ stageData, selectedChoice, onSelect, onReply, replyingTo }) {
  const canReply = !!selectedChoice;
  const choices = stageData?.choices ?? [];

  return (
    <div className="flex gap-3 px-4 py-3 border-b border-[#2f3336]">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm mt-1">
        K
      </div>

      <div className="flex-1 min-w-0">
        {replyingTo && (
          <p className="text-[13px] text-[#71767b] mb-2">
            Membalas <span className="text-[#1d9bf0]">{replyingTo}</span>
          </p>
        )}

        {stageData?.prompt && (
          <p className="text-[13px] font-semibold text-[#71767b] mb-2">{stageData.prompt}</p>
        )}

        <div className="flex flex-col gap-2 mb-3">
          {choices.map(choice => (
            <ChoiceCard
              key={choice.id}
              choice={choice}
              selected={selectedChoice}
              onSelect={onSelect}
              disabled={false}
            />
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#2f3336]">
          <div className="flex items-center gap-0.5 -ml-2 opacity-40 pointer-events-none">
            <button className="p-2 rounded-full"><ImageIcon /></button>
            <button className="p-2 rounded-full"><GifIcon /></button>
            <button className="p-2 rounded-full"><EmojiIcon /></button>
          </div>
          <button
            onClick={onReply}
            disabled={!canReply}
            className={`px-5 py-1.5 rounded-full font-bold text-[15px] transition-all duration-200 ${
              canReply
                ? 'bg-[#1d9bf0] text-white hover:bg-[#1a8cd8] cursor-pointer active:scale-95'
                : 'bg-[#1d9bf0]/40 text-white/40 cursor-not-allowed'
            }`}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Thread Item ──────────────────────────────────────────────────────────────

function ThreadItem({ item, showConnector }) {
  const isOP = item.author === 'op';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-0 px-4 pt-3"
    >
      <div className="flex flex-col items-center mr-3 flex-shrink-0" style={{ width: 40 }}>
        {isOP ? (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0">PG</div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0">K</div>
        )}
        {showConnector && (
          <div className="w-0.5 flex-1 min-h-[24px] bg-[#2f3336] mt-1 rounded-full" />
        )}
      </div>
      <div className="flex-1 min-w-0 pb-3">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="font-bold text-[15px] text-[#e7e9ea] truncate">{isOP ? 'Patriot Bangsa' : 'Kamu'}</span>
          {isOP && <VerifiedIcon />}
          <span className="text-[#71767b] text-[14px] truncate">{isOP ? '@PatriotGizi' : '@kamu'}</span>
          <span className="text-[#71767b] text-[14px]">· baru saja</span>
          <button className="ml-auto text-[#71767b] p-1 rounded-full hover:bg-white/10 transition-colors -mr-1"><MoreIcon /></button>
        </div>
        {item.replyingTo && (
          <p className="text-[13px] text-[#71767b] mt-0.5">
            Membalas <span className="text-[#1d9bf0]">{item.replyingTo}</span>
          </p>
        )}
        <p className="text-[15px] leading-[22px] mt-1 text-[#e7e9ea] whitespace-pre-wrap">{item.text}</p>
        <div className="flex items-center gap-1 mt-2 -ml-2 text-[#71767b]">
          <button className="flex items-center gap-1.5 hover:text-[#1d9bf0] p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors text-[13px]"><ReplyIcon /><span>—</span></button>
          <button className="flex items-center gap-1.5 hover:text-[#00ba7c] p-2 rounded-full hover:bg-[#00ba7c]/10 transition-colors text-[13px]"><RepostIcon /><span>—</span></button>
          <button className="flex items-center gap-1.5 hover:text-[#f91880] p-2 rounded-full hover:bg-[#f91880]/10 transition-colors text-[13px]"><LikeIcon /><span>—</span></button>
          <button className="flex items-center gap-1.5 hover:text-[#1d9bf0] p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors text-[13px]"><ViewIcon /><span>—</span></button>
          <div className="flex ml-auto">
            <button className="text-[#71767b] hover:text-[#1d9bf0] p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors"><BookmarkIcon /></button>
            <button className="text-[#71767b] hover:text-[#1d9bf0] p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors"><ShareIcon /></button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }}
      className="flex gap-3 px-4 py-3"
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0">PG</div>
      <div className="flex items-center gap-1 mt-3">
        {[0, 0.15, 0.3].map((delay, i) => (
          <motion.span key={i} className="w-2 h-2 rounded-full bg-[#71767b] inline-block"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay }} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── End Overlay ─────────────────────────────────────────────────────────────
// sandboxResult: 'mindful' | 'reactive'

function EndOverlay({ sandboxResult, onContinue, isReplayMode }) {
  const isMindful = sandboxResult === 'mindful';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`mx-4 my-4 rounded-2xl border p-6 ${
        isMindful
          ? 'border-green-500/30 bg-green-950/40 ring-1 ring-green-500/20'
          : 'border-red-500/40 bg-red-950/50 ring-1 ring-red-500/25'
      }`}
    >
      {isMindful ? (
        <>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🧘</span>
            <p className="text-green-400 text-[13px] uppercase tracking-wider font-bold font-sans">Simulasi Selesai</p>
          </div>
          <p className="text-[#e7e9ea] text-[18px] font-bold leading-snug mb-2">
            Anda berhasil keluar dari perangkap algoritma kemarahan.
          </p>
          <p className="text-[#8b9d9b] text-[14px] leading-relaxed mb-5">
            Mengabaikan buzzer adalah cara terbaik menjaga kewarasan digital Anda. Setiap komentar yang tidak Anda balas adalah kemenangan melawan rage-bait loop.
          </p>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">⚠️</span>
            <p className="text-red-400 text-[13px] uppercase tracking-wider font-bold font-sans">Simulasi Dihentikan</p>
          </div>
          <p className="text-[#e7e9ea] text-[18px] font-bold leading-snug mb-2">
            Anda terjebak dalam Rage-Bait Loop.
          </p>
          <p className="text-[#9b8b8b] text-[14px] leading-relaxed mb-5">
            Buzzer politik dirancang untuk memprovokasi. Merespons mereka hanya menaikkan engagement metrik mereka — dan menguras energi emosional Anda tanpa hasil.
          </p>
        </>
      )}
      <button
        onClick={onContinue}
        className={`w-full py-3 rounded-full font-bold text-[15px] transition-all active:scale-[0.98] ${
          isMindful
            ? 'bg-green-500 hover:bg-green-400 text-black'
            : 'bg-red-600 hover:bg-red-500 text-white'
        }`}
      >
        {isReplayMode ? 'Kembali ke Beranda' : 'Lanjut ke Post-Test →'}
      </button>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Sandbox() {
  const navigate = useNavigate();
  const { updateSandbox } = useCampaign();
  const isReplayMode = localStorage.getItem('campaignCompleted') === 'true';

  /**
   * currentStage: key into SCENARIO_TREE for user-choice stages (stage0, stage2, stage4)
   * uiMode: 'choices' | 'waiting' | 'done'
   * threadData: array of { id, author, text, replyingTo }
   * endResult: 'mindful' | 'reactive' | null
   */
  const [currentStage, setCurrentStage] = useState('stage0');
  const [uiMode, setUiMode]             = useState('choices'); // 'choices' | 'waiting' | 'done'
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [threadData, setThreadData]     = useState([]);
  const [isOPTyping, setIsOPTyping]     = useState(false);
  const [endResult, setEndResult]       = useState(null); // 'mindful' | 'reactive'
  const feedEndRef = useRef(null);

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [threadData, isOPTyping, uiMode]);

  const handleReply = async () => {
    if (!selectedChoice) return;

    const stageData = SCENARIO_TREE[currentStage];
    const choice = stageData?.choices?.find(c => c.id === selectedChoice);
    if (!choice) return;

    setSelectedChoice(null);
    setUiMode('waiting');

    // ── Walk-away path ────────────────────────────────────────────────────────
    if (choice.isWalkaway) {
      if (!isReplayMode) {
        updateSandbox({ sandboxResult: 'mindful' });
      }
      setEndResult('mindful');
      setUiMode('done');
      return;
    }

    // ── Add user reply to thread ──────────────────────────────────────────────
    setThreadData(prev => [...prev, {
      id: Date.now(),
      author: 'user',
      text: choice.text,
      replyingTo: stageData.replyingTo,
    }]);

    const nextStageKey = choice.nextStage; // e.g. 'stage1_A', 'stage3_B', 'done_reactive'

    // ── Reactive ending (stage4-A) ────────────────────────────────────────────
    if (nextStageKey === 'done_reactive') {
      // OP replies one last time before forcing end
      setIsOPTyping(true);
      await new Promise(r => setTimeout(r, 2000));
      setIsOPTyping(false);
      // No additional OP text — simulation forcibly terminated
      if (!isReplayMode) {
        updateSandbox({ sandboxResult: 'reactive' });
      }
      setEndResult('reactive');
      setUiMode('done');
      return;
    }

    // ── Stage 1 / Stage 3 — OP reply stages ──────────────────────────────────
    const opStageData = SCENARIO_TREE[nextStageKey];
    if (opStageData && opStageData.opReply !== undefined) {
      setIsOPTyping(true);
      await new Promise(r => setTimeout(r, 2000));
      setIsOPTyping(false);

      setThreadData(prev => [...prev, {
        id: Date.now() + 1,
        author: 'op',
        text: opStageData.opReply,
        replyingTo: '@kamu',
      }]);

      const afterOpStage = opStageData.nextStage; // e.g. 'stage2' or 'stage4'
      setCurrentStage(afterOpStage);
      setUiMode('choices');
      return;
    }

    // ── Fallback: direct transition to user-choice stage ─────────────────────
    setCurrentStage(nextStageKey);
    setUiMode('choices');
  };

  const activeStageData = SCENARIO_TREE[currentStage];
  const showChoiceInput = uiMode === 'choices' && activeStageData?.choices;

  return (
    <div className="h-screen w-full overflow-hidden bg-black text-[#e7e9ea] relative select-none">
      <div className="absolute inset-0 flex justify-center">
        <div className="w-full max-w-[1280px] flex h-full">

          {/* ══ LEFT SIDEBAR ══════════════════════════════════════════ */}
          <div className="w-[68px] xl:w-[275px] flex-shrink-0 flex flex-col pt-1 px-2 border-r border-[#2f3336] h-full overflow-hidden">
            <div className="px-3 py-3 mb-1"><XLogo /></div>
            <nav className="flex flex-col gap-0.5">
              <SidebarNavItem icon={<HomeIcon />} label="Home" active />
              <SidebarNavItem icon={<ExploreIcon />} label="Explore" />
              <SidebarNavItem icon={<NotifIcon />} label="Notifications" />
              <SidebarNavItem icon={<ChatIcon />} label="Messages" />
              <SidebarNavItem icon={<GrokIcon />} label="Grok" />
              <SidebarNavItem icon={<BookmarkNavIcon />} label="Bookmarks" />
              <SidebarNavItem icon={<CreatorIcon />} label="Creator Studio" />
              <SidebarNavItem icon={<PremiumIcon />} label="Premium" badge="50% off" />
              <SidebarNavItem icon={<ProfileNavIcon />} label="Profile" />
              <SidebarNavItem icon={<MoreNavIcon />} label="More" />
            </nav>
            <div className="mt-4 px-1">
              <button className="w-full xl:block hidden bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold text-[17px] py-3.5 rounded-full transition-colors">Post</button>
              <button className="xl:hidden w-12 h-12 bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white rounded-full flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.98-7.054.5-3.972-2.065-8.207-6.013-9.82C16.97 1.783 20.5 2 23 3zm-8 10h-4.5c.57-2.27 1.716-4.407 3.5-6h5.5c-1.5 2.11-3.026 4.5-4.5 6zm4.5-8h-5.5c-.5.5-1 1.02-1.45 1.56A12.06 12.06 0 0112 7h-2c.82-1.71 2.02-3.05 3.5-4h4.5l-.5 2z" /></svg>
              </button>
            </div>
            <div className="mt-auto mb-4 flex items-center gap-3 px-3 py-3 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">K</div>
              <div className="hidden xl:block overflow-hidden">
                <p className="font-bold text-[15px] truncate">Kamu</p>
                <p className="text-[#71767b] text-[14px] truncate">@Kamu</p>
              </div>
              <div className="hidden xl:block ml-auto"><MoreNavIcon /></div>
            </div>
          </div>

          {/* ══ CENTRE — POST DETAIL ══════════════════════════════════ */}
          <div className="flex-1 min-w-0 flex flex-col border-r border-[#2f3336] overflow-hidden">

            {/* Header */}
            <div className="flex items-center gap-6 px-4 py-3 border-b border-[#2f3336] sticky top-0 z-10 bg-black/80 backdrop-blur-md flex-shrink-0">
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-[#e7e9ea]">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" /></svg>
              </button>
              <h2 className="text-[20px] font-bold text-[#e7e9ea] font-sans">Post</h2>
            </div>

            {/* Scrollable feed */}
            <div className="flex-1 overflow-y-auto">

              {/* ── Original Post (MBG) ── */}
              <div className="px-4 pt-4 pb-0">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-[13px]">PG</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-[15px] text-[#e7e9ea]">Patriot Bangsa</span>
                          <VerifiedIcon />
                        </div>
                        <span className="text-[#71767b] text-[14px]">@PatriotGizi</span>
                      </div>
                      <button className="text-[#71767b] p-1 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"><MoreIcon /></button>
                    </div>
                  </div>
                </div>
                <p className="text-[20px] leading-[28px] mt-3 text-[#e7e9ea]">
                  Mahasiswa sekarang berisik banget protes anggaran Makan Bergizi Gratis (MBG). Kalian itu cuma egois. Tiap hari jajan mie pedas level-levelan sama udang keju pakai duit ortu aja bangga, giliran negara mau kasih makan anak SD dibilang pemborosan APBN. Otak lu pada ke mana?
                </p>
                <div className="flex items-center gap-2 mt-3 pb-3 border-b border-[#2f3336]">
                  <span className="text-[#71767b] text-[14px]">8:47 PM · May 21, 2026</span>
                  <span className="text-[#71767b] text-[14px]">·</span>
                  <span className="text-[14px] text-[#e7e9ea] font-semibold">84.2K</span>
                  <span className="text-[#71767b] text-[14px]">Views</span>
                </div>
                <div className="flex items-center gap-5 py-3 border-b border-[#2f3336] text-[14px]">
                  <span><span className="font-bold text-[#e7e9ea]">312</span> <span className="text-[#71767b]">Reposts</span></span>
                  <span><span className="font-bold text-[#e7e9ea]">2.1K</span> <span className="text-[#71767b]">Likes</span></span>
                  <span><span className="font-bold text-[#e7e9ea]">487</span> <span className="text-[#71767b]">Replies</span></span>
                </div>
                <div className="flex items-center justify-around py-1 border-b border-[#2f3336] -mx-1">
                  <button className="text-[#71767b] hover:text-[#1d9bf0] p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors"><ReplyIcon /></button>
                  <button className="text-[#71767b] hover:text-[#00ba7c] p-2 rounded-full hover:bg-[#00ba7c]/10 transition-colors"><RepostIcon /></button>
                  <button className="text-[#71767b] hover:text-[#f91880] p-2 rounded-full hover:bg-[#f91880]/10 transition-colors"><LikeIcon /></button>
                  <button className="text-[#71767b] hover:text-[#1d9bf0] p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors"><BookmarkIcon /></button>
                  <button className="text-[#71767b] hover:text-[#1d9bf0] p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors"><ShareIcon /></button>
                </div>
              </div>

              {/* ── Stage 0: Initial choice input below original post ── */}
              <AnimatePresence>
                {currentStage === 'stage0' && uiMode === 'choices' && (
                  <motion.div
                    key="input-stage0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <InlineChoiceInput
                      stageData={SCENARIO_TREE.stage0}
                      selectedChoice={selectedChoice}
                      onSelect={setSelectedChoice}
                      onReply={handleReply}
                      replyingTo="@PatriotGizi"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Thread entries ── */}
              {threadData.map((item, idx) => {
                const isLastItem = idx === threadData.length - 1;
                const hasMore = !isLastItem || isOPTyping || showChoiceInput || uiMode === 'done';
                return (
                  <React.Fragment key={item.id}>
                    <ThreadItem item={item} showConnector={hasMore} />

                    {/* Inline choices after last OP reply for stage2 / stage4 */}
                    <AnimatePresence>
                      {showChoiceInput && currentStage !== 'stage0' && item.author === 'op' && isLastItem && (
                        <motion.div
                          key={`input-${currentStage}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <InlineChoiceInput
                            stageData={activeStageData}
                            selectedChoice={selectedChoice}
                            onSelect={setSelectedChoice}
                            onReply={handleReply}
                            replyingTo="@PatriotGizi"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}

              {/* ── OP Typing Indicator ── */}
              <AnimatePresence>
                {isOPTyping && (
                  <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {uiMode === 'done' && endResult && (
                  <EndOverlay
                    sandboxResult={endResult}
                    onContinue={() => navigate(isReplayMode ? '/' : '/post-test')}
                    isReplayMode={isReplayMode}
                  />
                )}
              </AnimatePresence>

              <div ref={feedEndRef} className="h-8" />
            </div>
          </div>

          {/* ══ RIGHT PANEL ══════════════════════════════════════════ */}
          <div className="w-[350px] flex-shrink-0 hidden lg:flex flex-col gap-3 px-4 pt-3 overflow-y-auto overflow-x-hidden">
            <div className="bg-[#202327] rounded-full flex items-center gap-3 px-4 py-2.5 flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#71767b] flex-shrink-0"><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5 4.694 0 8.5 3.806 8.5 8.5 0 1.986-.682 3.815-1.814 5.262l4.276 4.276-1.414 1.414-4.276-4.276A8.457 8.457 0 0110.25 18.75c-4.694 0-8.5-3.806-8.5-8.5z" /></svg>
              <span className="text-[#71767b] text-[15px]">Search</span>
            </div>

            <div className="bg-[#16181c] rounded-2xl overflow-hidden flex-shrink-0">
              <h2 className="text-[20px] font-extrabold px-4 pt-3 pb-2 text-[#e7e9ea] font-sans">Relevant people</h2>
              <div className="px-4 py-3 flex items-start gap-3 border-t border-[#2f3336]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0">PG</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-0.5">
                    <span className="font-bold text-[15px] text-[#e7e9ea] truncate">Patriot Bangsa</span>
                    <VerifiedIcon />
                  </div>
                  <p className="text-[#71767b] text-[14px]">@PatriotGizi</p>
                  <p className="text-[14px] text-[#e7e9ea] mt-1 leading-snug">Suara rakyat untuk program gizi nasional. Dukung MBG!</p>
                </div>
                <button className="ml-auto border border-[#e7e9ea] text-[#0f1419] bg-[#e7e9ea] font-bold text-[14px] px-4 py-1.5 rounded-full hover:bg-[#d7d9da] transition-colors flex-shrink-0">Follow</button>
              </div>
            </div>

            <div className="bg-[#16181c] rounded-2xl overflow-hidden flex-shrink-0">
              <h2 className="text-[20px] font-extrabold px-4 pt-3 pb-2 text-[#e7e9ea] font-sans">What's happening</h2>
              {TRENDS.map((t, i) => (
                <div key={i} className="px-4 py-3 hover:bg-white/[0.03] cursor-pointer transition-colors border-t border-[#2f3336]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[13px] text-[#71767b] leading-tight">{t.category}</p>
                      <p className="font-bold text-[15px] text-[#e7e9ea] mt-0.5 leading-tight">{t.tag}</p>
                    </div>
                    <button className="text-[#71767b] p-1 rounded-full hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] transition-colors -mr-2 -mt-1"><MoreIcon /></button>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3 hover:bg-white/[0.03] cursor-pointer transition-colors">
                <p className="text-[#1d9bf0] text-[15px]">Show more</p>
              </div>
            </div>

            <p className="text-[#71767b] text-[13px] px-1 pb-4 leading-relaxed flex-shrink-0">
              Terms of Service · Privacy Policy · Cookie Policy · Accessibility · Ads info · More · © 2025 X Corp.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
