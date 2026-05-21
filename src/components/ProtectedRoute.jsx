import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCampaign } from '../context/CampaignContext';

export function ProtectedRoute({ children }) {
  const { userData } = useCampaign();
  const location = useLocation();

  // 1. Cek apakah sudah pernah menyelesaikan kampanye
  if (localStorage.getItem('campaignCompleted') === 'true') {
    if (location.pathname !== '/sandbox') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-canvas text-center px-4">
          <div className="max-w-md space-y-6">
            <div className="text-4xl">🙏</div>
            <h2 className="font-serif text-[28px] text-ink">Terima Kasih</h2>
            <p className="font-sans text-[16px] text-muted leading-relaxed">
              Anda sudah berpartisipasi dalam kampanye ini. Kami menghargai waktu dan kontribusi Anda.
            </p>
            <a href="/" className="inline-block mt-4 px-6 py-2 bg-surface-card border border-hairline rounded-full font-sans text-[14px] hover:bg-surface-soft transition-colors">
              Kembali ke Beranda
            </a>
          </div>
        </div>
      );
    }
  }

  // 2. Route Guarding (Mencegah URL Bypass)
  const path = location.pathname;

  if (path === '/sandbox') {
    const isReplayMode = localStorage.getItem('campaignCompleted') === 'true';
    if (!isReplayMode && userData.preTest.q4 === null) {
      return <Navigate to="/" replace />;
    }
  }

  if (path === '/post-test') {
    // Harus sudah melewati sandbox
    if (userData.sandboxInteractions?.sandboxResult === null || userData.sandboxInteractions?.sandboxResult === undefined) {
      return <Navigate to="/" replace />;
    }
  }

  if (path === '/summary') {
    // Harus sudah isi postTest
    if (userData.postTest.q1 === null) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
