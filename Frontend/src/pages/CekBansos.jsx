import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Scale,
  Lock,
  Download,
  AlertTriangle,
  FileText,
  Phone,
  CreditCard,
  RefreshCw,
  CheckCircle2,
  Check,
  Search,
  AlertCircle,
  XCircle,
  MapPin,
  Banknote,
  Calendar,
} from 'lucide-react';
import { checkNikStatus } from '../services/api';

export default function CekBansos({ onNavigate, onOpenDialog }) {
  const [nik, setNik] = useState('');
  const [noKk, setNoKk] = useState('');
  const [wilayah, setWilayah] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());
  const [isDeclared, setIsDeclared] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // State untuk data wilayah dari database
  const [dataWilayah, setDataWilayah] = useState({});
  const [isLoadingWilayah, setIsLoadingWilayah] = useState(true);

  // Fetch data wilayah dari API Laravel
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/public/regions');
        const result = await response.json();

        const formattedData = {};
        result.data.forEach(kota => {
          formattedData[kota.name] = kota.kecamatan.map(k => k.name);
        });

        setDataWilayah(formattedData);
      } catch (error) {
        console.error("Gagal mengambil data wilayah", error);
      } finally {
        setIsLoadingWilayah(false);
      }
    };
    fetchRegions();
  }, []);

  const pilihanKecamatan = wilayah ? dataWilayah[wilayah] || [] : [];

  const handleReset = () => {
    setNik('');
    setNoKk('');
    setWilayah('');
    setKecamatan('');
    setCaptchaInput('');
    setIsDeclared(false);
    setResult(null);
    setError(null);
    setCaptchaCode(Math.floor(1000 + Math.random() * 9000).toString());
  };

  const handleCheck = async (e) => {
    if (e) e.preventDefault();

    setError(null);
    setResult(null);

    if (!nik || nik.length !== 16) {
      setError('Harap masukkan 16 digit NIK yang valid.');
      return;
    }

    if (!wilayah || !kecamatan) {
      setError('Harap pilih Wilayah dan Kecamatan domisili.');
      return;
    }

    if (captchaInput !== captchaCode) {
      setError('Kode captcha tidak cocok. Silakan coba lagi.');
      return;
    }

    if (!isDeclared) {
      setError('Anda harus menyetujui pernyataan di atas.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await checkNikStatus(nik, wilayah, kecamatan);
      console.log('Response dari API Backend:', response);
      setResult(response);

      setTimeout(() => {
        const resEl = document.getElementById('hasil-pencarian');
        if (resEl) resEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memeriksa data NIK.');
      console.error('Error checking NIK:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStateConfig = (state) => {
    const configs = {
      TERDAFTAR_DISALURKAN: {
        color: 'bg-[#b5efd8]',
        textColor: 'text-[#003828]',
        icon: Check,
        title: 'Terdaftar & Bantuan Telah Disalurkan',
        subtitle: 'Penerima manfaat tercatat aktif. Penyaluran telah terkonfirmasi.',
        badge: 'Valid 2027',
      },
      TERDAFTAR_MENUNGGU: {
        color: 'bg-[#fff9ed]',
        textColor: 'text-[#765a16]',
        icon: RefreshCw,
        title: 'Terdaftar & Menunggu Penyaluran',
        subtitle: 'Penerima manfaat tercatat dalam proses penyaluran.',
        badge: 'Proses',
      },
      BELUM_TERDAFTAR: {
        color: 'bg-[#fef2f2]',
        textColor: 'text-[#991b1b]',
        icon: AlertCircle,
        title: 'Belum Terdaftar',
        subtitle: 'NIK belum terdaftar sebagai penerima bansos.',
        badge: 'Info',
      },
      DATA_TIDAK_DITEMUKAN: {
        color: 'bg-[#fef2f2]',
        textColor: 'text-[#991b1b]',
        icon: XCircle,
        title: 'Data Tidak Ditemukan',
        subtitle: 'NIK tidak ditemukan dalam sistem DTKS.',
        badge: 'Tidak Ditemukan',
      },
      TIDAK_LAYAK: {
        color: 'bg-orange-100',
        textColor: 'text-orange-900',
        icon: AlertCircle,
        title: 'Tidak Layak Menerima Bantuan',
        subtitle: 'Berdasarkan pembaruan data DTKS, Anda tergolong dalam kategori Mampu/Sejahtera (Desil 7-10).',
        badge: 'Tidak Layak',
      },
      DATA_WILAYAH_TIDAK_COCOK: {
        color: 'bg-red-100',
        textColor: 'text-red-900',
        icon: XCircle,
        title: 'Wilayah Tidak Cocok',
        subtitle: 'Wilayah atau Kecamatan yang Anda masukkan tidak sesuai dengan data DTKS NIK ini.',
        badge: 'Ditolak',
      },
    };
    return configs[state] || configs.BELUM_TERDAFTAR;
  };

  const formatChannel = (channel) => {
    const channels = {
      'TITIK_LOKAL': 'Titik Lokal / Kantor Pos',
      'BRI': 'Bank BRI',
      'BNI': 'Bank BNI',
      'Mandiri': 'Bank Mandiri',
      'BSI': 'Bank BSI',
      'POS': 'PT Pos Indonesia'
    };
    return channels[channel] || channel;
  };

  const getDistributionStatusConfig = (status) => {
    const configs = {
      TELAH_DISALURKAN: {
        badge: 'Telah Disalurkan',
        color: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-300',
      },
      ALOKASI_TERCATAT: {
        badge: 'Menunggu Penyaluran',
        color: 'bg-amber-100',
        textColor: 'text-amber-800',
        borderColor: 'border-amber-300',
      },
      DIJADWALKAN: {
        badge: 'Menunggu Penyaluran',
        color: 'bg-amber-100',
        textColor: 'text-amber-800',
        borderColor: 'border-amber-300',
      },
      SIAP_DISALURKAN: {
        badge: 'Menunggu Penyaluran',
        color: 'bg-amber-100',
        textColor: 'text-amber-800',
        borderColor: 'border-amber-300',
      },
      KENDALA: {
        badge: 'Terdapat Kendala',
        color: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-300',
      },
    };
    return configs[status] || configs.SIAP_DISALURKAN;
  };

  const getDesilConfig = (desil) => {
    if (desil === 1) {
      return {
        label: 'Desil 1 (Sangat Miskin)',
        color: 'bg-red-100',
        textColor: 'text-red-800',
        explanation: 'Desil 1 merupakan kelompok masyarakat atau rumah tangga yang berada pada peringkat 10% terbawah (sangat miskin) dengan tingkat kesejahteraan sosial dan ekonomi paling rendah di Indonesia.',
      };
    } else if (desil >= 2 && desil <= 4) {
      return {
        label: `Desil ${desil} (Rentan Miskin)`,
        color: 'bg-orange-100',
        textColor: 'text-orange-800',
        explanation: 'Rentan Miskin merupakan kelompok masyarakat atau rumah tangga yang berada pada peringkat 20-40% terbawah dengan tingkat kesejahteraan sosial dan ekonomi rendah namun masih berisiko jatuh miskin di Indonesia.',
      };
    } else if (desil >= 5 && desil <= 6) {
      return {
        label: `Desil ${desil} (Menengah)`,
        color: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        explanation: 'Menengah merupakan kelompok masyarakat atau rumah tangga yang berada pada peringkat 50-60% dengan tingkat kesejahteraan sosial dan ekonomi menengah di Indonesia.',
      };
    } else {
      return {
        label: `Desil ${desil} (Mampu)`,
        color: 'bg-green-100',
        textColor: 'text-green-800',
        explanation: 'Mampu merupakan kelompok masyarakat atau rumah tangga yang berada pada peringkat 70-100% teratas dengan tingkat kesejahteraan sosial dan ekonomi tinggi di Indonesia.',
      };
    }
  };

  const stateConfig = result ? getStateConfig(result.state) : null;
  const distributionStatusConfig = result?.distribution ? getDistributionStatusConfig(result.distribution.status) : null;

  // --- VARIABEL BARU UNTUK LOGIKA WARNA ---
  const isSuccessState = result && ['TERDAFTAR_DISALURKAN', 'TERDAFTAR_MENUNGGU'].includes(result.state);
  const isErrorState = result && ['DATA_TIDAK_DITEMUKAN', 'TIDAK_LAYAK', 'DATA_WILAYAH_TIDAK_COCOK'].includes(result.state);
  const isWarningState = result && ['BELUM_TERDAFTAR'].includes(result.state);

  return (
    <div className="min-h-screen bg-[#f1fcf4] text-[#3f4944] pt-20 pb-16">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#57605d]" aria-label="Breadcrumb">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="flex items-center gap-1 hover:text-[#003828] hover:underline"
          >
            <span>⌂</span> Beranda
          </button>
          <span>/</span>
          <span className="face-semibold text-[#003828]">Cek Bansos</span>
        </nav>

        {/* Header Title Section */}
        <div className="mt-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="face-bold rounded bg-[#b5efd8] px-2.5 py-1 text-[11px] tracking-wide text-[#00513b]">
                DATA TERPADU KESEJAHTERAAN SOSIAL (DTKS) 2026
              </span>
              <span className="face-bold flex items-center gap-1 rounded bg-[#b5efd8] px-2.5 py-1 text-[11px] tracking-wide text-[#00513b]">
                <ShieldCheck className="size-3.5 text-[#176b50]" />
                UU PDP No. 27/2022 Patuh
              </span>
            </div>
            <h1 className="face-bold mt-3 text-3xl leading-tight text-[#003828] sm:text-4xl">
              Pemeriksaan Status Kepesertaan Bantuan Sosial
            </h1>
            <p className="face-regular mt-2 text-sm leading-[22px] text-[#57605d]">
              Layanan mandiri untuk memeriksa penetapan dan pencatatan distribusi bantuan sosial
              (PKH, BPNT/Sembako, BLT) berdasarkan 16 digit NIK yang terdaftar pada Data Terpadu
              Kesejahteraan Sosial (DTKS) secara real-time.
            </p>
          </div>

          {/* Privacy Notice Pill */}
          <div className="flex items-center gap-3 rounded-xl border border-[#b5efd8] bg-white p-3.5 shadow-xs lg:max-w-xs">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#00513b] text-white">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h2 className="face-bold text-xs text-[#003828]">Penyamaran Identitas Otomatis</h2>
              <p className="text-[11px] leading-[15px] text-[#57605d] mt-0.5">
                NIK & Nama ditampilkan parsial demi privasi warga
              </p>
            </div>
          </div>
        </div>

        {/* Form and Side Info Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Left Form: 8 cols */}
          <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-sm sm:p-7 lg:col-span-8">
            <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-4">
              <div className="flex items-center gap-2">
                <span className="h-5 w-1.5 rounded-full bg-[#176b50]" />
                <h2 className="face-bold text-base text-[#003828]">
                  Formulir Pengecekan NIK
                </h2>
              </div>
              <span className="text-xs text-[#707974]">Kompilasi Tahap 1 - TA 2026</span>
            </div>

            <form onSubmit={handleCheck} className="mt-5 space-y-4">
              {/* Row 1: NIK & No KK */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <label className="face-semibold text-[#003828]">
                      Nomor Induk Kependudukan (NIK) <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-[#707974]">
                      {nik.length} / 16 Digit
                    </span>
                  </div>
                  <div className="relative mt-1.5">
                    <input
                      type="text"
                      maxLength={16}
                      value={nik}
                      onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                      placeholder="Masukkan 16 digit NIK"
                      className="face-regular h-11 w-full rounded-lg border border-[#dce9df] bg-[#ebf6ef]/40 pl-3.5 pr-10 text-sm outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50]"
                    />
                    {nik.length === 16 && (
                      <span className="absolute right-3 top-3 text-[#176b50]">
                        <CheckCircle2 className="size-5" />
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] text-[#707974]">
                    Pastikan NIK sesuai e-KTP kepala keluarga atau anggota KK.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <label className="face-semibold text-[#003828]">Nomor Kartu Keluarga (KK)</label>
                    <span className="text-[11px] text-[#707974]">Verifikasi Opsional</span>
                  </div>
                  <div className="relative mt-1.5">
                    <input
                      type="text"
                      maxLength={16}
                      value={noKk}
                      onChange={(e) => setNoKk(e.target.value.replace(/\D/g, ''))}
                      placeholder="Masukkan 16 digit No KK"
                      className="face-regular h-11 w-full rounded-lg border border-[#dce9df] bg-[#ebf6ef]/40 px-3.5 text-sm outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50]"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-[#707974]">
                    Mempercepat validasi bila NIK mengalami mutasi domisili.
                  </p>
                </div>
              </div>

              {/* Row 2: Wilayah & Kecamatan */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="face-semibold block text-xs text-[#003828]">
                    Wilayah (Kota/Kabupaten) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={wilayah}
                    onChange={(e) => {
                      setWilayah(e.target.value);
                      setKecamatan('');
                    }}
                    disabled={isLoadingWilayah}
                    className="face-regular mt-1.5 h-11 w-full rounded-lg border border-[#dce9df] bg-[#ebf6ef]/40 px-3.5 text-sm outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50] disabled:opacity-60"
                  >
                    <option value="">{isLoadingWilayah ? 'Memuat wilayah...' : 'Pilih Wilayah'}</option>
                    {Object.keys(dataWilayah).map((kota) => (
                      <option key={kota} value={kota}>{kota}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="face-semibold block text-xs text-[#003828]">
                    Kecamatan Domisili Sesuai KTP <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={kecamatan}
                    onChange={(e) => setKecamatan(e.target.value)}
                    disabled={!wilayah}
                    className="face-regular mt-1.5 h-11 w-full rounded-lg border border-[#dce9df] bg-[#ebf6ef]/40 px-3.5 text-sm outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="">{!wilayah ? 'Pilih Wilayah Dulu' : 'Pilih Kecamatan'}</option>
                    {pilihanKecamatan.map((kec) => (
                      <option key={kec} value={kec}>{kec}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Captcha & Pernyataan */}
              <div className="grid gap-4 rounded-xl bg-[#f8fdfa] p-4 sm:grid-cols-2 border border-[#e4f7ed]">
                <div>
                  <label className="face-bold block text-xs text-[#003828]">
                    Validasi Integritas Akses
                  </label>
                  <p className="mt-0.5 text-[11px] text-[#707974]">
                    Ketik 4-digit kode simetris sistem berikut:
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="face-bold flex h-10 w-20 items-center justify-center rounded-lg bg-[#b5efd8] text-base tracking-widest text-[#00513b] select-none">
                      {captchaCode}
                    </span>
                    <input
                      type="text"
                      maxLength={4}
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Kode"
                      className="face-bold h-10 w-24 rounded-lg border border-[#dce9df] bg-white px-3 text-center text-sm tracking-wider outline-none focus:border-[#176b50]"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="declaration"
                    checked={isDeclared}
                    onChange={(e) => setIsDeclared(e.target.checked)}
                    className="mt-1 size-4 rounded accent-[#00513b] cursor-pointer"
                  />
                  <label
                    htmlFor="declaration"
                    className="face-regular text-[11px] leading-[17px] text-[#57605d] cursor-pointer"
                  >
                    Saya menyatakan pemeriksaan ini dilakukan untuk diri sendiri atau atas
                    persetujuan pemilik NIK, sesuai prinsip keterbukaan publik yang bertanggungjawab.
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 flex items-start gap-2">
                  <AlertTriangle className="size-4 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              {/* Bottom Actions Bar */}
              <div className="flex flex-col items-center justify-between gap-3 pt-3 sm:flex-row border-t border-[#ebf6ef]">
                <div className="flex items-center gap-1.5 text-xs text-[#707974]">
                  <RefreshCw className="size-3.5 text-[#326856]" />
                  <span>Basis Data Mutakhir: Sinkronisasi 10 Februari 2026</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="face-semibold flex-1 sm:flex-initial h-10 rounded-lg border border-[#bfc9c2]/40 bg-white px-5 text-xs text-[#57605d] hover:bg-[#ebf6ef]"
                  >
                    Atur Ulang
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="face-semibold flex-1 sm:flex-initial flex h-10 items-center justify-center gap-2 rounded-lg bg-[#00513b] px-6 text-xs text-white shadow-sm hover:bg-[#003828] transition disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Mencari data...
                      </>
                    ) : (
                      <>
                        <Search className="size-3.5" />
                        Periksa Status Bansos
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Info: 4 cols */}
          <div className="space-y-4 lg:col-span-4">
            {/* Card 1: Ketentuan Yuridis */}
            <div className="rounded-xl border border-black/[0.04] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[#003828]">
                <Scale className="size-4 text-[#176b50]" />
                <h3 className="face-bold text-xs">Ketentuan Yuridis DTKS</h3>
              </div>
              <p className="mt-2.5 text-xs leading-[19px] text-[#57605d]">
                <strong className="text-[#141e19]">Catatan Penting:</strong> NIK terdaftar bukan
                jaminan otomatis memperoleh bantuan tunai berulang. Penetapan status bersyarat pada
                kuota APBN/APBD serta hasil musyawarah kelurahan dan audit faktual desil P3KE.
              </p>
              <div className="mt-4 border-t border-[#ebf6ef] pt-3 text-[11px] text-[#707974]">
                <p className="face-bold text-[#003828] uppercase tracking-wider text-[10px]">
                  DASAR PENETAPAN:
                </p>
                <p className="mt-1 leading-[16px]">
                  Permensos RI No. 3 Tahun 2021 tentang Pengelolaan DTKS & SK Walikota/Bupati
                  Wilayah Terkait.
                </p>
              </div>
            </div>

            {/* Card 2: Protokol Keamanan Data */}
            <div className="rounded-xl border border-black/[0.04] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[#003828]">
                <Lock className="size-4 text-[#176b50]" />
                <h3 className="face-bold text-xs">Protokol Keamanan Data</h3>
              </div>
              <p className="mt-2 text-xs leading-[19px] text-[#57605d]">
                Sistem menerapkan tokenisasi NIK sesaat dan tidak merekam riwayat pencarian
                identitas di peramban publik.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Hasil Rekam Status Kepesertaan */}
        {result && (
          <section id="hasil-pencarian" className="mt-10 scroll-mt-20">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1.5 rounded-full bg-[#176b50]" />
              <div>
                <h2 className="face-bold text-lg text-[#003828]">
                  Hasil Rekam Status Kepesertaan
                </h2>
                <p className="text-xs text-[#707974]">
                  Diperbarui dari Pusat Data dan Informasi Kesejahteraan Sosial
                </p>
              </div>
            </div>

            {/* Status Banner - MENGGUNAKAN LOGIKA 3 WARNA */}
            <div className={`mt-4 flex flex-col justify-between gap-4 rounded-xl ${isSuccessState ? 'bg-[#b5efd8]' :
                isErrorState ? 'bg-red-100' :
                  'bg-amber-100'
              } p-6 sm:flex-row sm:items-center`}>

              <div className="flex items-center gap-4">
                <div className={`flex size-12 shrink-0 items-center justify-center rounded-full text-white ${isSuccessState ? 'bg-[#00513b]' :
                    isErrorState ? 'bg-red-600' :
                      'bg-amber-600'
                  }`}>
                  {isSuccessState ? (
                    <Check className="size-7 stroke-[2.5]" />
                  ) : isErrorState ? (
                    <XCircle className="size-7 stroke-[2.5]" />
                  ) : (
                    <AlertCircle className="size-7 stroke-[2.5]" />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className={`face-bold text-sm ${isSuccessState ? 'text-[#003828]' :
                        isErrorState ? 'text-red-900' :
                          'text-amber-900'
                      }`}>
                      {stateConfig?.title}
                    </h3>

                    {/* Badge HANYA muncul saat Success */}
                    {isSuccessState && (
                      <span className="rounded bg-white px-2.5 py-0.5 text-[10px] font-bold text-[#00513b]">
                        Valid 2027
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mt-0.5 ${isSuccessState ? 'text-[#17503f]' :
                      isErrorState ? 'text-red-800' :
                        'text-amber-800'
                    }`}>
                    {stateConfig?.subtitle}
                  </p>
                </div>
              </div>

              {/* Tombol HANYA muncul saat Success */}
              {isSuccessState && (
                <button
                  onClick={() => alert('Mengunduh bukti penetapan bansos format PDF...')}
                  className="face-semibold flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm text-[#003828] shadow-sm hover:bg-[#ebf6ef] transition"
                >
                  <Download className="size-4" />
                  Unduh Bukti (PDF)
                </button>
              )}
            </div>

            {/* Results Grid - Hanya tampil jika state terdaftar */}
            {(result.state === 'TERDAFTAR_DISALURKAN' || result.state === 'TERDAFTAR_MENUNGGU') && (
              <div className="mt-6 grid gap-6 lg:grid-cols-12">

                {/* Left Column: Profil Identitas */}
                <div className="rounded-xl border border-[#dce9df] bg-white p-6 shadow-sm lg:col-span-5">
                  <p className="face-bold text-[10px] tracking-wider text-[#707974] uppercase">
                    PROFIL IDENTITAS TERLINDUNGI
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="relative flex size-14 items-center justify-center rounded-full bg-[#ebf6ef] text-[#176b50] font-bold text-sm">
                      {result.program?.name ? result.program.name.charAt(0) : 'PM'}
                    </div>
                    <div>
                      <h4 className="face-bold text-base text-[#003828]">Penerima Manfaat</h4>
                      <p className="text-xs text-[#707974]">Kepala Keluarga Terdaftar</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5 border-t border-[#ebf6ef] pt-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#707974]">NIK</span>
                      <strong className="font-mono text-[#141e19]">{result.masked_nik}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#707974]">Kecamatan / Kota</span>
                      <strong className="text-[#141e19]">{result.region}</strong>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[#707974]">Desil Kesejahteraan</span>
                      {result.desil && (
                        <span className={`face-bold rounded px-2 py-0.5 text-[11px] ${getDesilConfig(result.desil).color} ${getDesilConfig(result.desil).textColor}`}>
                          {getDesilConfig(result.desil).label}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Desil Explanation */}
                  {result.desil && (
                    <p className="mt-4 rounded-lg bg-[#ebf6ef]/50 p-3 text-[11px] leading-[17px] text-[#57605d]">
                      {getDesilConfig(result.desil).explanation}
                    </p>
                  )}
                </div>

                {/* Right Column: Rincian Program */}
                <div className="rounded-xl border border-[#dce9df] bg-white p-6 shadow-sm lg:col-span-7">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-4 mb-4">
                    <p className="face-bold text-[10px] tracking-wider text-[#003828] uppercase">
                      RINCIAN PROGRAM BANTUAN SOSIAL AKTIF
                    </p>
                    <span className="text-xs font-semibold text-[#707974]">1 Program Ditetapkan</span>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#ebf6ef] text-[10px] font-bold text-[#707974] uppercase">
                          <th className="py-3 pr-2">Program Bansos</th>
                          <th className="py-3 pr-2">Periode Salur</th>
                          <th className="py-3 pr-2">Kanal Pencairan</th>
                          <th className="py-3 pr-2">Tgl Pembukuan</th>
                          <th className="py-3 text-right">Status Penyaluran</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ebf6ef]">
                        <tr>
                          <td className="py-3 pr-2">
                            <strong className="block font-bold text-[#003828]">
                              {result.program?.name}
                            </strong>
                            <span className="text-[11px] text-[#707974]">
                              Kode: {result.program?.code}
                            </span>
                          </td>
                          <td className="py-3 text-[#3f4944]">{result.period}</td>
                          <td className="py-3 text-[#3f4944]">
                            <span className="flex items-center gap-1">
                              <CreditCard className="size-3.5 text-[#176b50]" />
                              {formatChannel(result.distribution?.channel)}
                            </span>
                          </td>
                          <td className="py-3 text-[#3f4944]">{result.distribution?.date}</td>
                          <td className="py-3 text-right">
                            <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-bold ${result.distribution?.status === 'TELAH_DISALURKAN'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                              }`}>
                              {distributionStatusConfig?.badge}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Timeline */}
                  <div className="mt-6 rounded-lg bg-[#ebf6ef]/50 p-4 border border-[#e4f7ed]">
                    <p className="face-bold text-[11px] text-[#003828] mb-6">
                      Riwayat Tahapan Penyaluran Terakhir:
                    </p>

                    {result.distribution?.histories && result.distribution.histories.length > 0 ? (
                      <div className="relative flex justify-between items-start w-full px-4">
                        {/* Garis Horizontal Background */}
                        <div className="absolute top-3.5 left-8 right-8 h-[2px] bg-[#176b50] -z-0"></div>

                        {/* Timeline Items */}
                        {result.distribution.histories.map((history, idx) => (
                          <div key={idx} className="relative z-10 flex flex-col items-center flex-1">
                            <div className="flex size-7 items-center justify-center rounded-full bg-[#00513b] text-[11px] font-bold text-white mb-2 shrink-0">
                              {idx + 1}
                            </div>

                            <p className="text-[10px] font-bold text-[#003828] text-center mt-2 px-1">
                              {history.to_status || history.status}
                            </p>

                            <p className="text-[10px] text-[#707974] text-center mt-1">
                              {new Date(history.created_at).toLocaleDateString('id-ID', {
                                day: '2-digit', month: 'short', year: 'numeric'
                              })}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-[#707974] text-center py-4">Riwayat tahapan belum tersedia</p>
                    )}
                  </div>

                  {/* Footer Warning */}
                  <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-2 pt-3 border-t border-[#ebf6ef]">
                    <p className="text-[#707974]">
                      Bila saldo rekening KKS Anda belum bertambah meski tercatat salur, gunakan hak sanggah Anda.
                    </p>
                    <button
                      onClick={() => onOpenDialog && onOpenDialog('Laporkan Kendala Penarikan')}
                      className="flex items-center gap-1 font-semibold text-[#d97706] hover:underline shrink-0"
                    >
                      <AlertTriangle className="size-3.5" />
                      Laporkan Kendala Penarikan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Section: Kanal Sanggah & Pelayanan Publik Terpadu */}
        <section className="mt-8 rounded-xl border border-[#b5efd8] bg-[#ebf6ef]/70 p-6 sm:p-7">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="face-bold flex items-center gap-1.5 text-xs text-[#176b50]">
                <FileText className="size-4" />
                Kanal Sanggah & Pelayanan Publik Terpadu
              </span>
              <h2 className="face-bold mt-1 text-xl text-[#003828]">
                Menemukan Ketidaksesuaian Data Penyaluran?
              </h2>
              <p className="face-regular mt-1 text-xs leading-[19px] text-[#57605d]">
                Laporkan bila penerima tercatat tidak memenuhi syarat (inklusif/eksklusif eror),
                adanya pungutan liar dari oknum, atau dana bansos yang tidak diterima utuh. Pengaduan
                diproteksi oleh Ombudsman & Tim Saber Pungli Daerah.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <button
                onClick={() => onOpenDialog && onOpenDialog('Form Sanggahan')}
                className="face-semibold flex items-center gap-1.5 rounded-lg border border-[#bfc9c2]/50 bg-white px-5 py-2.5 text-xs text-[#003828] shadow-xs hover:bg-[#ebf6ef]"
              >
                <FileText className="size-3.5 text-[#176b50]" />
                Isi Form Sanggahan
              </button>
              <button
                onClick={() => alert('Menghubungkan ke hotline pengawasan bansos 1500-299...')}
                className="face-semibold flex items-center gap-1.5 rounded-lg bg-[#00513b] px-5 py-2.5 text-xs text-white shadow-xs hover:bg-[#003828]"
              >
                <Phone className="size-3.5" />
                Hotline: 1500-299
              </button>
            </div>
          </div>
        </section>

        {/* Section: Pertanyaan Umum Pengecekan NIK */}
        <section className="mt-12">
          <div>
            <p className="eyebrow">BANTUAN & EDUKASI</p>
            <h2 className="section-title mt-1">Pertanyaan Umum Pengecekan NIK</h2>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {/* FAQ 1 */}
            <article className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-sm">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#176b50]">
                <FileText className="size-4" />
              </div>
              <h3 className="face-bold mt-4 text-sm text-[#003828]">
                Berapa digit NIK yang valid?
              </h3>
              <p className="face-regular mt-2 text-xs leading-[19px] text-[#57605d]">
                NIK resmi di Indonesia terdiri dari persis 16 angka yang memuat kode provinsi,
                kode kabupaten/kota, kecamatan, tanggal lahir, dan nomor urut registrasi e-KTP.
                Pastikan tidak ada spasi atau karakter khusus.
              </p>
            </article>

            {/* FAQ 2 */}
            <article className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-sm">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#176b50]">
                <RefreshCw className="size-4" />
              </div>
              <h3 className="face-bold mt-4 text-sm text-[#003828]">
                Mengapa status saya berubah?
              </h3>
              <p className="face-regular mt-2 text-xs leading-[19px] text-[#57605d]">
                Data Terpadu Kesejahteraan Sosial (DTKS) dimutakhirkan secara berkala setiap bulan
                oleh Pemerintah Daerah bersama Kementerian Sosial berdasarkan musyawarah desa,
                audit kelayakan, serta perbaikan status ekonomi.
              </p>
            </article>

            {/* FAQ 3 */}
            <article className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-sm">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#176b50]">
                <CreditCard className="size-4" />
              </div>
              <h3 className="face-bold mt-4 text-sm text-[#003828]">
                Bantuan belum cair padahal tertulis salur?
              </h3>
              <p className="face-regular mt-2 text-xs leading-[19px] text-[#57605d]">
                Penyaluran perbankan (Himbara) memerlukan waktu rekonsiliasi batch transfer 1-3 hari
                kerja sejak SP2D terbit. Bila rekening tetap kosong setelah masa tersebut, bawa KKS
                dan e-KTP ke unit bank penerbit atau ajukan sanggah.
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}