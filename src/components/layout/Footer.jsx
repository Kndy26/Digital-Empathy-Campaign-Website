import React from 'react';

export function Footer() {
  return (
    <footer className="bg-surface-dark py-16 px-6 mt-24">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center text-on-dark-soft text-[14px] font-sans">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span>Proyek Kampanye Digital - Cyberpsychology - Kelompok 3 - Universitas Bunda Mulia</span>
        </div>
        <div>
          Copyright &copy; 2026
        </div>
      </div>
    </footer>
  );
}