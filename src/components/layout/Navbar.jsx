import React from 'react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isReplayMode = localStorage.getItem('campaignCompleted') === 'true';

  return (
    <nav className="h-[64px] bg-[#faf9f5]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50 border-b border-hairline-soft">
      <div className="flex items-center space-x-8">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center space-x-2 text-ink font-serif text-[22px] tracking-tight">
          <img src="/favicon.png" alt="Digital Empathy Logo" width="24" height="24" className="object-contain" />
          <span className="font-serif">Digital Empathy</span>
        </button>
        <div className="hidden md:flex space-x-6 text-[14px] font-medium font-sans text-body">
          <button onClick={() => handleScroll('beranda')} className="hover:text-ink transition-colors">Beranda</button>
          <button onClick={() => handleScroll('tentang')} className="hover:text-ink transition-colors">Tentang Kampanye</button>
          <button onClick={() => handleScroll('pengertian')} className="hover:text-ink transition-colors">Apa itu Cyberaggression</button>
          <button onClick={() => handleScroll('dampak')} className="hover:text-ink transition-colors">Dampak Psikologis</button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="primary" onClick={() => navigate(isReplayMode ? '/sandbox' : '/pre-test')}>
          {isReplayMode ? 'Coba Ulang Simulasi' : 'Mulai Simulasi'}
        </Button>
      </div>
    </nav>
  );
}
