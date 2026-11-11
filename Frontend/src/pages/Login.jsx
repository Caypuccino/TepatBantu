import React, { useState } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Phone,
  Check,
} from 'lucide-react';

export default function Login({ onNavigate, onLoginSuccess, redirectTarget }) {
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nik.length < 16) {
      setErrorMsg('NIK harus terdiri dari 16 digit angka sesuai e-KTP.');
      return;
    }
    if (!password) {
      setErrorMsg('Masukkan kata sandi atau PIN 6-digit Anda.');
      return;
    }
    setErrorMsg('');
    onLoginSuccess?.({
      nik,
      nama: 'Bpk. Rahmat Hidayat',
      noKk: '3273011405080004',
      telepon: '0812-2025-9981',
      wilayah: 'Kota Bandung',
    });
  };

  return (
    <div className="min-h-screen bg-[#f1fcf4] text-[#3f4944] pt-20 pb-20">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#57605d]" aria-label="Breadcrumb">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="flex items-center gap-1 hover:text-[#003828] hover:underline"
          >
            <span>⌂</span> Beranda
          </button>
          <span>›</span>
          <span className="font-semibold text-[#003828]">Masuk Akun</span>
        </nav>

        {/* Notifikasi Redirect Target jika diarahkan karena mau buat pengajuan/pengaduan */}
        {redirectTarget && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#b5efd8] bg-[#ebf6ef] p-3 text-xs text-[#003828]">
            <ShieldCheck className="size-4 shrink-0 text-[#176b50]" />
            <span>
              Silakan <strong>Masuk Akun</strong> atau <strong>Daftar Akun Baru</strong> terlebih dahulu untuk mengakses layanan{' '}
              <strong>{redirectTarget === 'buat-usulan' ? 'Pengajuan Usulan Mandiri' : 'Pengaduan & Sanggah'}</strong>.
            </span>
          </div>
        )}

        {/* Container Kartu Login */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-black/[0.05] bg-white shadow-xs">
          <div className="grid lg:grid-cols-12">
            
            {/* Sisi Kiri: Hero Banner Hijau Gelap */}
            <div className="bg-[#176b50] p-6 text-white sm:p-10 lg:col-span-5 flex flex-col justify-between">
              <div>
                <h1 className="face-bold text-2xl sm:text-3xl leading-tight">
                  Akses Layanan & Bantuan Lebih Cepat dan Terbuka.
                </h1>
                <p className="mt-3 text-xs sm:text-sm text-[#d8f0e1] leading-relaxed">
                  Kelola status bantuan sosial, pantau jadwal penyaluran, dan pastikan penyaluran transparan dan adil melalui sistem terpadu.
                </p>

                {/* 3 Keunggulan */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-xs border border-white/10">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
                      <ShieldCheck className="size-4 text-white" />
                    </div>
                    <div>
                      <strong className="block text-xs">100% Bebas Biaya</strong>
                      <span className="text-[10px] text-[#d8f0e1]">Semua layanan publik tanpa pungutan apa pun</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-xs border border-white/10">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
                      <CheckCircle2 className="size-4 text-white" />
                    </div>
                    <div>
                      <strong className="block text-xs">2.4+ Juta Warga Terdaftar</strong>
                      <span className="text-[10px] text-[#d8f0e1]">Jangkauan merata di seluruh wilayah Nusantara</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-xs border border-white/10">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
                      <Check className="size-4 text-white" />
                    </div>
                    <div>
                      <strong className="block text-xs">Data Terverifikasi Cepat</strong>
                      <span className="text-[10px] text-[#d8f0e1]">Pencocokan berkas otomatis dengan validasi presisi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kutipan Testimoni */}
              <div className="mt-8 rounded-xl bg-white/10 p-3.5 border border-white/10 flex items-center gap-3">
                <img
                  src="/assets/bc596.png"
                  alt="Ibu Rahayu"
                  className="size-11 shrink-0 rounded-full object-cover border-2 border-white/40"
                />
                <div className="text-[11px] leading-snug">
                  <p className="italic text-[#d8f0e1]">
                    "Penyaluran bantuan kini jauh lebih transparan dan bisa dicek langsung dari HP tanpa calo."
                  </p>
                  <strong className="mt-1 block text-white">Ibu Rahayu • <span className="font-normal text-[#d8f0e1]">Penerima Manfaat</span></strong>
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Form Masuk */}
            <div className="p-6 sm:p-10 lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#176b50]">
                  PORTAL RESMI TEPATBANTU
                </span>
                <h2 className="face-bold mt-1 text-2xl text-[#003828]">
                  Masuk ke Akun Anda
                </h2>
                <p className="mt-1 text-xs text-[#57605d]">
                  Silakan masukkan NIK terdaftar Anda untuk melihat data bantuan.
                </p>

                {errorMsg && (
                  <div className="mt-3 rounded-lg bg-red-50 p-2.5 text-xs text-red-600 border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {/* Field NIK */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="face-semibold block text-xs text-[#003828]">
                        Nomor Induk Kependudukan (NIK) <span className="text-red-500">*</span>
                      </label>
                      <span className="flex items-center gap-1 rounded bg-[#ebf6ef] px-1.5 py-0.2 text-[9px] font-semibold text-[#00513b]">
                        <Lock className="size-2.5" /> Data Terenkripsi
                      </span>
                    </div>
                    <div className="relative mt-1.5">
                      <input
                        type="text"
                        maxLength={16}
                        value={nik}
                        onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                        placeholder="Contoh: 3201234567890001"
                        className="h-11 w-full rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3.5 font-mono text-xs text-[#003828] outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50]"
                        required
                      />
                    </div>
                    <p className="mt-1 text-[10px] text-[#707974]">
                      Pastikan NIK 16 digit sesuai berkas keluarga resmi Anda.
                    </p>
                  </div>

                  {/* Field Password / PIN */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="face-semibold block text-xs text-[#003828]">
                        Kata Sandi / PIN 6-Digit <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => alert('Fitur pemulihan kata sandi via nomor WhatsApp aktif.')}
                        className="text-[10px] text-[#176b50] hover:underline font-medium"
                      >
                        Lupa Kata Sandi?
                      </button>
                    </div>
                    <div className="relative mt-1.5">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan kata sandi atau PIN Anda"
                        className="h-11 w-full rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3.5 pr-10 text-xs text-[#003828] outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707974] hover:text-[#003828]"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Masuk via OTP */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="size-3.5 rounded accent-[#00513b]"
                      />
                      <span className="text-[#57605d]">Ingat saya selama 30 hari</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => alert('Kode OTP verifikasi berhasil dikirimkan ke nomor WhatsApp terdaftar.')}
                      className="flex items-center gap-1 text-[11px] text-[#176b50] hover:underline font-medium"
                    >
                      <MessageCircle className="size-3" /> Masuk via Kode OTP WhatsApp
                    </button>
                  </div>

                  {/* Tombol Masuk */}
                  <button
                    type="submit"
                    className="face-semibold mt-2 flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-[#003828] text-xs sm:text-sm text-white shadow-xs hover:bg-[#176b50] transition"
                  >
                    Masuk ke Akun TepatBantu <ArrowRight className="size-4" />
                  </button>
                </form>

                {/* Banner Ajakan Registrasi */}
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-[#f1fcf4] p-4 border border-[#b5efd8]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#176b50]">
                      <ShieldCheck className="size-4" />
                    </div>
                    <div>
                      <strong className="block text-xs text-[#003828]">Belum punya akun TepatBantu?</strong>
                      <span className="text-[10px] text-[#57605d]">Daftar gratis hanya butuh NIK e-KTP dan KK</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate && onNavigate('register')}
                    className="face-semibold text-xs text-[#00513b] hover:text-[#003828] hover:underline flex items-center gap-1 shrink-0 font-bold"
                  >
                    Daftar Akun Baru Sekarang →
                  </button>
                </div>
              </div>

              {/* Footer Enkripsi */}
              <div className="mt-6 border-t border-[#ebf6ef] pt-3 text-center text-[10px] text-[#707974] flex items-center justify-center gap-1.5">
                <ShieldCheck className="size-3 text-[#176b50]" />
                <span>Dilindungi enkripsi data end-to-end standar keamanan TepatBantu.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

