import { useState } from 'react';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Navigation,
  ArrowRight,
  Phone,
  CheckSquare,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { loginPetugas } from '../services/api';

export default function LoginPetugas({ onNavigate, onLoginSuccess }) {
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [allowGps, setAllowGps]     = useState(true);
  const [loading, setLoading]       = useState(false);
  const [errorMsg, setErrorMsg]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validasi sisi klien sebelum hit API
    if (!email.trim()) {
      setErrorMsg('Masukkan email dinas petugas yang terdaftar.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Kata sandi minimal 8 karakter.');
      return;
    }

    setLoading(true);
    try {
      const { token, user } = await loginPetugas(email.trim(), password);

      // Minta izin GPS jika checkbox dicentang (best-effort, tidak memblokir login)
      if (allowGps && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => {},   // sukses — cukup minta permission
          () => {}    // ditolak — tetap lanjut login
        );
      }

      onLoginSuccess?.({ token, user });
    } catch (err) {
      switch (err.code) {
        case 'INVALID_CREDENTIALS':
          setErrorMsg('Email atau kata sandi salah. Periksa kembali kredensial petugas Anda.');
          break;
        case 'UNAUTHORIZED_ROLE':
          setErrorMsg(err.message);
          break;
        case 'VALIDATION_ERROR':
          setErrorMsg(err.message || 'Periksa kembali format email dan kata sandi.');
          break;
        case 'RATE_LIMITED':
          setErrorMsg('Terlalu banyak percobaan login. Tunggu beberapa menit lalu coba lagi.');
          break;
        case 'SERVER_ERROR':
        default:
          setErrorMsg('Tidak dapat terhubung ke server. Pastikan backend sedang berjalan di http://localhost:8000.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1fcf4] text-[#3f4944] pb-20 pt-20">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#57605d]" aria-label="Breadcrumb">
          <button
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-1 hover:text-[#003828] hover:underline"
          >
            <span>⌂</span> Beranda
          </button>
          <span>›</span>
          <span className="font-semibold text-[#003828]">Portal Petugas Operasional</span>
        </nav>

        {/* Security Header Banner */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-xl bg-[#ebf6ef] px-5 py-2.5 text-center">
          <span className="flex items-center gap-1.5 text-xs font-medium text-[#3f4944]">
            <span className="size-2 rounded-full bg-[#326856]" />
            Protokol TLS 1.3 Terenkripsi
          </span>
          <span className="hidden text-[#bfc9c2] sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-[#3f4944]">
            <ShieldCheck className="size-3.5 text-[#326856]" />
            ISO/IEC 27001 Certified
          </span>
          <span className="hidden text-[#bfc9c2] sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-[#3f4944]">
            <Navigation className="size-3.5 text-[#326856]" />
            Node Keamanan BSSN Aktif
          </span>
        </div>

        {/* Page Title */}
        <div className="mt-6 text-center">
          <span className="inline-block rounded-xl bg-[#e0ebe4] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#003828]">
            Portal Akses Resmi &amp; Terpadu
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#003828] sm:text-4xl">
            Gerbang Autentikasi Petugas
            <br />
            Operasional TepatBantu
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#3f4944]">
            Akses konsol verifikasi lapangan, penyaluran bantuan sosial, dan penanganan sanggahan
            warga melalui portal khusus Petugas Operasional.
          </p>
        </div>

        {/* Login Card */}
        <div className="mx-auto mt-8 max-w-[640px] overflow-hidden rounded-xl border border-black/[0.05] bg-white shadow-md">
          {/* Top accent bar */}
          <div className="h-2 bg-[#00513b]" />

          <div className="p-6 sm:p-8">
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1.5">
                <span className="inline-block w-fit rounded-full bg-[#b5efd8] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#386e5c]">
                  Peran Verifikator Lapangan
                </span>
                <h2 className="text-2xl font-bold leading-tight text-[#003828]">
                  Petugas Operasional Lapangan
                </h2>
              </div>
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#ebf6ef]">
                <ShieldCheck className="size-6 text-[#00513b]" />
              </div>
            </div>

            {/* Scope Summary */}
            <div className="mt-4 rounded-md bg-[#ebf6ef] p-3">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#003828]" />
                <div>
                  <p className="text-sm font-semibold text-[#003828]">
                    Fokus Pelayanan Langsung Masyarakat
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#3f4944]">
                    Verifikasi berkas DTKS, survei faktual door-to-door, validasi penyaluran sembako
                    &amp; PKH, serta tindak lanjut sanggahan aduan warga.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Access Points */}
            <div className="mt-3 flex flex-col gap-1.5">
              {[
                'Otentikasi Cepat NIP / ID Verifikator Khusus Satgas Sosial',
                'Geofencing & Deteksi Presensi Wilayah Tugas (GPS Validated)',
                'Akses Cepat: Data DTKS, Validasi Lapangan, Penyaluran, & Aduan',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-[#3f4944]">
                  <span className="size-1.5 shrink-0 rounded-full bg-[#326856]" />
                  {item}
                </div>
              ))}
            </div>

            {/* Geofence Status Widget */}
            <div className="mt-4 rounded-md bg-[#e6f0e9] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3f4944]">
                  Status Geofence Satgas
                </span>
                <span className="text-xs font-semibold text-[#003828]">Aktif • Akurasi 4.2m</span>
              </div>
              <div className="mt-2 flex items-center gap-2 rounded-sm bg-white px-2.5 py-1.5 shadow-sm">
                <MapPin className="size-3.5 shrink-0 text-[#326856]" />
                <p className="text-xs text-[#141e19]">
                  Wilayah Tugas:{' '}
                  <span className="font-bold">Kec. Lengkong, Kota Bandung</span>{' '}
                  <span className="text-[#57605d]">(Sektor IV)</span>
                </p>
              </div>
            </div>

            {/* Error message */}
            {errorMsg && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4" noValidate>
              {/* Email Field */}
              <div>
                <label htmlFor="petugas-email" className="block text-xs font-semibold text-[#141e19]">
                  Email Dinas Petugas{' '}
                  <span className="text-red-500" aria-hidden>*</span>
                </label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#326856]" aria-hidden />
                  <input
                    id="petugas-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                    placeholder="petugas.bdg@demo.test"
                    className="h-11 w-full rounded-sm border border-[#dce9df] bg-[#ebf6ef] pl-10 pr-4 text-sm text-[#141e19] outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50]"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="petugas-password" className="text-xs font-semibold text-[#141e19]">
                    Kata Sandi Petugas{' '}
                    <span className="text-red-500" aria-hidden>*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      alert('Hubungi Koordinator Wilayah (Korwil) untuk pemulihan kata sandi petugas.')
                    }
                    className="text-[10px] font-semibold text-[#326856] hover:underline"
                  >
                    Lupa Sandi Lapangan?
                  </button>
                </div>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#326856]" aria-hidden />
                  <input
                    id="petugas-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
                    placeholder="Masukkan kata sandi petugas"
                    className="h-11 w-full rounded-sm border border-[#dce9df] bg-[#ebf6ef] pl-10 pr-11 text-sm text-[#141e19] outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50]"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707974] hover:text-[#003828]"
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* GPS Geolocation Checkbox */}
              <label className="flex cursor-pointer items-start gap-2.5 rounded-sm bg-[#ebf6ef] p-3 text-xs">
                <input
                  type="checkbox"
                  checked={allowGps}
                  onChange={(e) => setAllowGps(e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 rounded accent-[#003828]"
                  disabled={loading}
                />
                <span className="leading-relaxed text-[#3f4944]">
                  Izinkan penautan geolokasi perangkat untuk absensi titik koordinat survei bansos berkala.
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-[#00513b] text-sm font-semibold text-white shadow-sm transition hover:bg-[#003828] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Memverifikasi Kredensial…
                  </>
                ) : (
                  <>
                    Masuk ke Konsol Operasional Lapangan
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Helper */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#ebf6ef] pt-4">
              <button
                type="button"
                onClick={() =>
                  alert('Silakan hubungi Koordinator Wilayah (Korwil) untuk kendala akun petugas.')
                }
                className="flex items-center gap-1.5 text-[11px] font-semibold text-[#3f4944] hover:text-[#003828]"
              >
                <Phone className="size-3.5" />
                Kendala Akun Petugas? Hubungi Korwil
              </button>
              <span className="text-xs font-medium text-[#326856]">SLA Lapangan: 24/7</span>
            </div>
          </div>
        </div>

        {/* Prinsip Tata Kelola */}
        <div className="mx-auto mt-8 max-w-[640px] rounded-xl bg-[#ebf6ef] p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#003828]">
                Prinsip Tata Kelola Keamanan &amp; Integritas Penyaluran Bantuan
              </h3>
              <p className="mt-1 text-xs text-[#3f4944]">
                Standar perlindungan data berdasarkan ketentuan instansi pemerintah RI.
              </p>
            </div>
            <div className="mt-2 flex shrink-0 items-center gap-1.5 rounded-sm bg-[#e6f0e9] px-3 py-1.5 sm:mt-0">
              <CheckSquare className="size-3.5 text-[#326856]" />
              <span className="text-xs font-medium text-[#141e19]">
                Audit Siklus Bansos TA 2025/2026
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              {
                title: 'Pemisahan Hak Akses (Least Privilege)',
                desc: 'Petugas verifikator tidak dapat mengubah skema database pusat tanpa persetujuan tim berwenang.',
                note: 'Isolasi Basis Data Terjamin',
                color: '#b5efd8',
              },
              {
                title: 'Pelindungan Data Pribadi (UU PDP 27/2022)',
                desc: 'NIK dan data biometrik penerima bansos disamarkan secara dinamis. Pembukaan data penuh memerlukan otorisasi bertingkat.',
                note: 'Penyusutan Data Kriptografis',
                color: '#acf1d3',
              },
              {
                title: 'Audit Siber Terintegrasi BPK & BPKP',
                desc: 'Setiap persetujuan bantuan dan unggahan berkas foto rumah ditandatangani digital dengan e-Timestamp.',
                note: 'Rekam Jejak Tak Dapat Diubah',
                color: '#e0ebe4',
              },
            ].map((p) => (
              <div
                key={p.title}
                className="flex flex-col justify-between rounded-md bg-white p-4 shadow-sm"
              >
                <div>
                  <span
                    className="flex size-9 items-center justify-center rounded-sm"
                    style={{ backgroundColor: p.color }}
                  >
                    <ShieldCheck className="size-5 text-[#003828]" />
                  </span>
                  <h4 className="mt-3 text-sm font-semibold leading-snug text-[#003828]">
                    {p.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#3f4944]">{p.desc}</p>
                </div>
                <div className="mt-3 flex items-center gap-1.5 border-t border-[#ebf6ef] pt-2.5">
                  <span className="text-[#326856]">✓</span>
                  <span className="text-[10px] font-semibold text-[#326856]">{p.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mx-auto mt-6 max-w-[640px] border-t border-[#bfc9c2]/30 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#3f4944]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold">Pemberitahuan Privasi Terenkripsi</span>
              <span className="text-[#bfc9c2]">•</span>
              <span>Kepatuhan UU PDP No. 27/2022</span>
              <span className="text-[#bfc9c2]">•</span>
              <span>Audit BPK &amp; BPKP Tracked</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="size-2 rounded-full bg-[#326856]" />
              Protokol: TLS 1.3 / HSM Secured
            </div>
          </div>
          <p className="mt-2 text-[10px] text-[#707974]">
            © 2026 Portal Tunggal TepatBantu — Kementerian Sosial &amp; Badan Layanan Digital
            Republik Indonesia. Seluruh hak cipta dilindungi undang-undang.
          </p>
        </div>
      </div>
    </div>
  );
}
