import React, { useState } from 'react';
import {
  User,
  Users,
  Camera,
  Upload,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  Check,
  ArrowRight,
  Phone,
  Mail,
  RefreshCw,
  Info,
} from 'lucide-react';

export default function Register({ onNavigate, onRegisterSuccess }) {
  const [nik, setNik] = useState('');
  const [noKk, setNoKk] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [tglLahir, setTglLahir] = useState({ tgl: '', bln: '', thn: '' });
  const [noWa, setNoWa] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ktpUploaded, setKtpUploaded] = useState(true);
  const [swafotoUploaded, setSwafotoUploaded] = useState(true);
  const [setujuSyarat, setSetujuSyarat] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleReset = () => {
    setNik('');
    setNoKk('');
    setNamaLengkap('');
    setTglLahir({ tgl: '', bln: '', thn: '' });
    setNoWa('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSetujuSyarat(false);
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nik.length < 16) {
      setErrorMsg('NIK harus terdiri dari 16 digit angka.');
      return;
    }
    if (noKk.length < 16) {
      setErrorMsg('Nomor KK harus terdiri dari 16 digit angka.');
      return;
    }
    if (!namaLengkap) {
      setErrorMsg('Nama lengkap sesuai identitas resmi wajib diisi.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Kata sandi minimal 8 karakter kombinasi huruf, angka, atau simbol.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Kata sandi konfirmasi tidak cocok.');
      return;
    }
    if (!setujuSyarat) {
      setErrorMsg('Anda harus menyetujui Ketentuan Layanan & Kebijakan Privasi.');
      return;
    }

    setErrorMsg('');
    onRegisterSuccess?.({
      nik,
      nama: namaLengkap,
      noKk,
      telepon: `+62${noWa}`,
      email,
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
          <span className="font-semibold text-[#003828]">Pendaftaran Akun Baru</span>
        </nav>

        {/* Container Kartu Register */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-black/[0.05] bg-white shadow-xs">
          <div className="grid lg:grid-cols-12">
            
            {/* Sisi Kiri: Hero Banner Hijau Gelap */}
            <div className="bg-[#176b50] p-6 text-white sm:p-10 lg:col-span-4 flex flex-col justify-between">
              <div>
                <h1 className="face-bold text-2xl sm:text-3xl leading-tight">
                  Bergabung Bersama Jutaan Warga TepatBantu
                </h1>
                <p className="mt-3 text-xs sm:text-sm text-[#d8f0e1] leading-relaxed">
                  Daftarkan diri Anda untuk menikmati kemudahan pengajuan bantuan, pengecekan kelayakan mandiri, dan notifikasi pencairan transparan secara berkala.
                </p>

                {/* 4 Langkah Pendaftaran */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#003828] text-xs font-bold text-white border border-white/20">
                      1
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-xs">Identitas Utama</strong>
                        <span className="rounded bg-white/20 px-1.5 py-0.2 text-[9px] font-bold text-white uppercase">
                          Aktif
                        </span>
                      </div>
                      <span className="text-[10px] text-[#d8f0e1]">NIK & Nomor Kartu Keluarga valid</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-[#d8f0e1]">
                      2
                    </span>
                    <div>
                      <strong className="text-xs">Kontak & Komunikasi</strong>
                      <span className="block text-[10px] text-[#d8f0e1]">WhatsApp aktif untuk notifikasi status</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-[#d8f0e1]">
                      3
                    </span>
                    <div>
                      <strong className="text-xs">Berkas Verifikasi Digital</strong>
                      <span className="block text-[10px] text-[#d8f0e1]">Foto tanda pengenal & swafoto jelas</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-[#d8f0e1]">
                      4
                    </span>
                    <div>
                      <strong className="text-xs">Kata Sandi Akun</strong>
                      <span className="block text-[10px] text-[#d8f0e1]">Minimal 8 karakter kombinasi aman</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bawah Banner */}
              <div className="mt-8 pt-6 border-t border-white/10 text-[10px] text-[#d8f0e1] flex items-center gap-1.5">
                <ShieldCheck className="size-4 shrink-0 text-white" />
                <span>Terhubung secara aman dengan API SIAK Terpadu & DTKS Kemensos.</span>
              </div>
            </div>

            {/* Sisi Kanan: Form Registrasi */}
            <div className="p-6 sm:p-10 lg:col-span-8">
              <div>
                <h2 className="face-bold text-2xl text-[#003828]">
                  Buat Akun TepatBantu Baru
                </h2>
                <p className="mt-1 text-xs text-[#57605d]">
                  Isi formulir di bawah ini dengan data asli untuk verifikasi bantuan yang cepat, aman, dan tepat sasaran.
                </p>

                {errorMsg && (
                  <div className="mt-3 rounded-lg bg-red-50 p-2.5 text-xs text-red-600 border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  
                  {/* SEKSI 1: Data Identitas Kependudukan */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#ebf6ef] pb-2">
                      <User className="size-4 text-[#176b50]" />
                      <h3 className="face-bold text-xs uppercase tracking-wider text-[#003828]">
                        1. Data Identitas Kependudukan
                      </h3>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="face-semibold block text-xs text-[#003828]">
                            Nomor Induk Kependudukan (NIK) <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[10px] text-[#707974]">{nik.length}/16</span>
                        </div>
                        <input
                          type="text"
                          maxLength={16}
                          value={nik}
                          onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                          placeholder="3201xxxxxxxxxxxx"
                          className="mt-1.5 h-10 w-full rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3 font-mono text-xs text-[#003828] outline-none focus:border-[#176b50]"
                          required
                        />
                        <p className="mt-1 text-[10px] text-[#707974]">
                          Sesuai yang tertera pada kartu identitas resmi Anda.
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label className="face-semibold block text-xs text-[#003828]">
                            Nomor Kartu Keluarga (KK) <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[10px] text-[#707974]">{noKk.length}/16</span>
                        </div>
                        <input
                          type="text"
                          maxLength={16}
                          value={noKk}
                          onChange={(e) => setNoKk(e.target.value.replace(/\D/g, ''))}
                          placeholder="3201xxxxxxxxxxxx"
                          className="mt-1.5 h-10 w-full rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3 font-mono text-xs text-[#003828] outline-none focus:border-[#176b50]"
                          required
                        />
                        <p className="mt-1 text-[10px] text-[#707974]">
                          Nomor kepala keluarga atau tertera di bagian atas KK.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="face-semibold block text-xs text-[#003828]">
                        Nama Lengkap (Sesuai Identitas Resmi) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={namaLengkap}
                        onChange={(e) => setNamaLengkap(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="mt-1.5 h-10 w-full rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3 text-xs text-[#003828] outline-none focus:border-[#176b50]"
                        required
                      />
                    </div>

                    <div>
                      <label className="face-semibold block text-xs text-[#003828]">
                        Tanggal Lahir <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1.5 grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Tanggal (01–31)"
                          value={tglLahir.tgl}
                          onChange={(e) => setTglLahir({ ...tglLahir, tgl: e.target.value.replace(/\D/g, '') })}
                          className="h-10 rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3 text-xs text-[#003828] outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Bulan (01–12)"
                          value={tglLahir.bln}
                          onChange={(e) => setTglLahir({ ...tglLahir, bln: e.target.value.replace(/\D/g, '') })}
                          className="h-10 rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3 text-xs text-[#003828] outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Tahun (Contoh: 1985)"
                          value={tglLahir.thn}
                          onChange={(e) => setTglLahir({ ...tglLahir, thn: e.target.value.replace(/\D/g, '') })}
                          className="h-10 rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3 text-xs text-[#003828] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SEKSI 2: Kontak & Saluran Notifikasi */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#ebf6ef] pb-2">
                      <Phone className="size-4 text-[#176b50]" />
                      <h3 className="face-bold text-xs uppercase tracking-wider text-[#003828]">
                        2. Kontak & Saluran Notifikasi
                      </h3>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="face-semibold block text-xs text-[#003828]">
                          Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1.5 flex gap-2">
                          <span className="flex h-10 items-center rounded-xl border border-[#dce9df] bg-[#ebf6ef] px-3 font-mono text-xs font-semibold text-[#003828]">
                            +62
                          </span>
                          <input
                            type="text"
                            value={noWa}
                            onChange={(e) => setNoWa(e.target.value.replace(/\D/g, ''))}
                            placeholder="81234567890"
                            className="h-10 flex-1 rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3 text-xs text-[#003828] outline-none font-mono"
                            required
                          />
                        </div>
                        <p className="mt-1 text-[10px] text-[#707974]">
                          Digunakan untuk mengirimkan token OTP & bukti penerimaan bansos.
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label className="face-semibold block text-xs text-[#003828]">Alamat Surel / Email</label>
                          <span className="text-[9px] text-[#707974]">Opsional</span>
                        </div>
                        <div className="relative mt-1.5">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@domain.com"
                            className="h-10 w-full rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3 pr-8 text-xs text-[#003828] outline-none"
                          />
                          <Mail className="absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#707974]" />
                        </div>
                        <p className="mt-1 text-[10px] text-[#707974]">
                          Sebagai alternatif cadangan penerimaan arsip digital.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SEKSI 3: Unggah Berkas Pendukung (Verifikasi Ringan) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-2">
                      <div className="flex items-center gap-2">
                        <Upload className="size-4 text-[#176b50]" />
                        <h3 className="face-bold text-xs uppercase tracking-wider text-[#003828]">
                          3. Unggah Berkas Pendukung (Verifikasi Ringan)
                        </h3>
                      </div>
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-[9px] font-mono text-[#57605d]">
                        Format JPG/PNG, Maks. 5MB
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {/* Box Foto Identitas */}
                      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#b5efd8] bg-[#f8fdfa] p-4 text-center">
                        <User className="size-6 text-[#176b50]" />
                        <strong className="mt-1.5 block text-xs text-[#003828]">Foto Identitas Resmi Asli</strong>
                        <span className="text-[10px] text-[#707974]">
                          Seret berkas ke sini atau <button type="button" className="text-[#176b50] font-semibold underline">pilih berkas</button>
                        </span>
                        <span className="mt-2 text-[9px] text-[#707974] flex items-center gap-1">
                          👁 Teks & foto harus tampak tajam tanpa silau
                        </span>
                      </div>

                      {/* Box Swafoto */}
                      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#b5efd8] bg-[#f8fdfa] p-4 text-center">
                        <Camera className="size-6 text-[#176b50]" />
                        <strong className="mt-1.5 block text-xs text-[#003828]">Swafoto (Wajah Tegak Terang)</strong>
                        <span className="text-[10px] text-[#707974]">
                          Seret berkas ke sini atau <button type="button" className="text-[#176b50] font-semibold underline">ambil foto</button>
                        </span>
                        <span className="mt-2 text-[9px] text-[#707974] flex items-center gap-1">
                          💡 Tanpa topi/kacamata hitam, pencahayaan cukup
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SEKSI 4: Keamanan Akses Akun (Kata Sandi) */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#ebf6ef] pb-2">
                      <Lock className="size-4 text-[#176b50]" />
                      <h3 className="face-bold text-xs uppercase tracking-wider text-[#003828]">
                        4. Keamanan Akses Akun (Kata Sandi)
                      </h3>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="face-semibold block text-xs text-[#003828]">
                          Buat Kata Sandi <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-1.5">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimal 8 karakter kombinasi"
                            className="h-10 w-full rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3 pr-9 text-xs text-[#003828] outline-none focus:border-[#176b50]"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707974]"
                          >
                            {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                          </button>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-[10px] text-[#707974]">
                          <span>Kekuatan Kata Sandi:</span>
                          <span className="font-semibold text-[#176b50]">Sedang</span>
                        </div>
                        <p className="mt-0.5 text-[9px] text-[#707974]">
                          Gunakan minimal 8 karakter dengan kombinasi huruf, angka, atau simbol.
                        </p>
                      </div>

                      <div>
                        <label className="face-semibold block text-xs text-[#003828]">
                          Ulangi Kata Sandi <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-1.5">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Ketik ulang kata sandi"
                            className="h-10 w-full rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3 pr-9 text-xs text-[#003828] outline-none focus:border-[#176b50]"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707974]"
                          >
                            {showConfirmPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                          </button>
                        </div>
                        <p className="mt-1 text-[10px] text-[#707974]">
                          Pastikan kata sandi konfirmasi sama persis.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Persetujuan Syarat & Privasi */}
                  <div className="rounded-xl border border-[#b5efd8] bg-[#ebf6ef] p-4 text-xs">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={setujuSyarat}
                        onChange={(e) => setSetujuSyarat(e.target.checked)}
                        className="mt-0.5 size-4 accent-[#00513b]"
                      />
                      <span className="leading-relaxed text-[#003828]">
                        Saya menyetujui <strong>Ketentuan Layanan</strong> & <strong>Kebijakan Privasi</strong> TepatBantu, serta memastikan bahwa seluruh data yang saya kirimkan adalah benar, sah, dan dapat dipertanggungjawabkan untuk kebutuhan program bantuan terpadu.
                      </span>
                    </label>
                  </div>

                  {/* Tombol Action */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="face-semibold flex items-center justify-center gap-1.5 rounded-xl border border-[#dce9df] bg-white px-4 py-2.5 text-xs text-[#57605d] hover:bg-gray-50"
                    >
                      <RefreshCw className="size-3.5" /> Reset Form
                    </button>

                    <button
                      type="submit"
                      disabled={!setujuSyarat}
                      className="face-semibold flex items-center justify-center gap-2 rounded-xl bg-[#00513b] px-6 py-2.5 text-xs sm:text-sm text-white shadow-xs hover:bg-[#003828] disabled:opacity-50 transition"
                    >
                      Daftar & Verifikasi Akun TepatBantu <ArrowRight className="size-4" />
                    </button>
                  </div>

                  {/* Sudah Punya Akun */}
                  <div className="border-t border-[#ebf6ef] pt-4 text-center text-xs text-[#57605d]">
                    Sudah memiliki akun terdaftar?{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('login')}
                      className="font-bold text-[#00513b] hover:underline"
                    >
                      Masuk ke Akun Anda ›
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

