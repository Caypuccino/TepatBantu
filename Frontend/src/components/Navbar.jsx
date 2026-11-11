import React, { useState } from 'react';

const A = '/assets';

export default function Navbar({ onOpenAuth, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Beranda', id: 'home' },
    { label: 'Cek Bansos', id: 'nik-check' },
    { label: 'Layanan', id: 'services' },
    { label: 'Alur Sistem', id: 'flow' },
    { label: 'Data Faktual', id: 'data' },
    { label: 'Press Release', id: 'news' },
  ];

  const handleNavClick = (id) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.04] bg-[#f1fcf4]/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 lg:px-8">
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none"
          aria-label="Kembali ke beranda TepatBantu"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-[#176b50] shadow-sm">
            <img src={`${A}/c79f1.svg`} alt="Logo TepatBantu" className="h-5 w-5" />
          </span>
          <div className="flex flex-col">
            <span className="face-bold text-lg tracking-[-0.4px] text-[#003828] leading-tight">
              TepatBantu
            </span>
            <span className="text-[10px] text-[#326856] font-medium tracking-tight">
              Kawal Bansos Terpadu
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 text-sm lg:flex" aria-label="Navigasi utama">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition hover:text-[#003828] ${
                index === 0 ? 'face-bold text-[#003828]' : 'face-regular text-[#3f4944]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden items-center gap-2.5 sm:flex">
          <button
            onClick={() => onOpenAuth('login')}
            className="face-semibold h-10 rounded-lg border border-[#326856]/20 bg-white px-4 text-sm text-[#326856] transition hover:bg-[#ebf6ef]"
          >
            Masuk
          </button>
          <button
            onClick={() => onOpenAuth('register')}
            className="face-semibold h-10 rounded-lg bg-[#00513b] px-4 text-sm text-white shadow-sm transition hover:bg-[#003828]"
          >
            Daftar Akun
          </button>
          <button
            onClick={() => onOpenAuth('profile')}
            className="ml-1 flex size-9 items-center justify-center rounded-xl bg-[#003828] text-white shadow-sm transition hover:bg-[#00513b]"
            aria-label="Buka profil pengguna"
            title="Profil Pengguna"
          >
            <img src={`${A}/59e02.svg`} alt="" className="size-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="flex size-10 items-center justify-center rounded-lg bg-[#00513b] text-xl text-white transition hover:bg-[#003828] lg:hidden"
          aria-expanded={menuOpen}
          aria-label="Buka navigasi menu"
        >
          {menuOpen ? '✕' : '≡'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="border-t border-[#dce9df] bg-[#f1fcf4] px-5 py-4 shadow-lg lg:hidden">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="face-medium block w-full rounded-md px-3 py-2.5 text-left text-sm text-[#003828] hover:bg-[#e4f7ed]"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-[#dce9df] pt-4">
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenAuth('login');
              }}
              className="face-semibold h-10 w-full rounded-lg bg-white text-sm text-[#326856] border border-[#326856]/20"
            >
              Masuk
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenAuth('register');
              }}
              className="face-semibold h-10 w-full rounded-lg bg-[#00513b] text-sm text-white"
            >
              Daftar Akun
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

