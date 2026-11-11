import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import NikCheckSection from '../components/NikCheckSection';
import ServicesSection from '../components/ServicesSection';
import StepsSection from '../components/StepsSection';
import StatsSection from '../components/StatsSection';
import NewsSection from '../components/NewsSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import ModalPengajuan from '../components/ModalPengajuan';
import ModalSanggahan from '../components/ModalSanggahan';
import ModalAuth from '../components/ModalAuth';
import ModalArticle from '../components/ModalArticle';

export default function Home() {
  const [authMode, setAuthMode] = useState(null); // 'login' | 'register' | 'profile' | null
  const [isPengajuanOpen, setIsPengajuanOpen] = useState(false);
  const [isSanggahanOpen, setIsSanggahanOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenService = (actionType) => {
    if (actionType === 'scroll-nik') {
      scrollToId('nik-check');
    } else if (actionType === 'open-pengajuan') {
      setIsPengajuanOpen(true);
    } else if (actionType === 'open-sanggahan') {
      setIsSanggahanOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1fcf4] text-[#3f4944] selection:bg-[#176b50] selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenAuth={(mode) => setAuthMode(mode)}
        onNavigate={scrollToId}
      />

      {/* Main Content Sections */}
      <main id="home" className="pt-16">
        <HeroSection
          onScrollTo={scrollToId}
          onOpenServices={() => scrollToId('services')}
        />

        <NikCheckSection
          onOpenPengajuan={() => setIsPengajuanOpen(true)}
        />

        <ServicesSection
          onOpenService={handleOpenService}
        />

        <StepsSection />

        <StatsSection />

        <NewsSection
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        <CtaSection
          onScrollTo={scrollToId}
          onOpenSanggahan={() => setIsSanggahanOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onScrollTo={scrollToId}
        onOpenService={handleOpenService}
      />

      {/* Interactive Modals */}
      <ModalPengajuan
        isOpen={isPengajuanOpen}
        onClose={() => setIsPengajuanOpen(false)}
      />

      <ModalSanggahan
        isOpen={isSanggahanOpen}
        onClose={() => setIsSanggahanOpen(false)}
      />

      <ModalAuth
        mode={authMode}
        onClose={() => setAuthMode(null)}
        onSwitchMode={(mode) => setAuthMode(mode)}
      />

      <ModalArticle
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}

