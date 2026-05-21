import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import PreTest from './pages/PreTest';
import Sandbox from './pages/Sandbox';
import PostTest from './pages/PostTest';
import Summary from './pages/Summary';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const isWizardPage = ['/pre-test', '/sandbox', '/post-test', '/summary'].includes(location.pathname);

  return (
    <>
      <div className="mesh-bg-fixed"></div>
      <div className="min-h-screen flex flex-col relative z-0">
        {!isWizardPage && <Navbar />}
        <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pre-test" element={<ProtectedRoute><PreTest /></ProtectedRoute>} />
          <Route path="/sandbox" element={<ProtectedRoute><Sandbox /></ProtectedRoute>} />
          <Route path="/post-test" element={<ProtectedRoute><PostTest /></ProtectedRoute>} />
          <Route path="/summary" element={<ProtectedRoute><Summary /></ProtectedRoute>} />
          <Route path="/edukasi" element={<ProtectedRoute><PostTest /></ProtectedRoute>} />
        </Routes>
      </main>
      {!isWizardPage && <Footer />}
    </div>
    </>
  );
}

export default App;
