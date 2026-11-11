import React, { useState } from 'react';
import {
  FileText,
  User,
  Users,
  Home,
  CheckCircle2,
  Upload,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  Info,
  Calendar,
  DollarSign,
  Building2,
  Sparkles,
  Zap,
  MapPin,
  RefreshCw,
  Save,
  Navigation,
  ChevronDown,
  AlertTriangle,
  Lock,
  Clock,
  Eye,
  Edit3,
  XCircle,
  HelpCircle,
  AlertCircle,
  Briefcase,
  Minus,
  Plus,
  Send,
} from 'lucide-react';

const HUBUNGAN_OPTIONS = [
  {
    id: 'diri-sendiri',
    icon: User,
    title: 'Diri Sendiri (Kepala Keluarga)',
    desc: 'Mengajukan usulan rumah tangga sendiri sesuai NIK pemegang akun portal.',
    sub: 'Terhubung Profil Akun',
  },
  {
    id: 'anggota-kk',
    icon: Users,
    title: 'Anggota Keluarga (1 KK)',
    desc: 'Istri, anak, orang tua/lansia, atau disabilitas yang tertera dalam satu Kartu Keluarga.',
    sub: null,
  },
  {
    id: 'tetangga',
    icon: Home,
    title: 'Tetangga Rentan yang Diusulkan',
    desc: 'Advokasi mandiri bagi warga sebatang kara, anak terlantar, atau difabel parah di lingkungan RT/RW.',
    sub: null,
  },
];

export default function BuatUsulanBaru({ onNavigate }) {
  const [currentStep, setCurrentStep] = useState(1); // Mulai dari Langkah 1
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState('');

  // Form State
  const [form, setForm] = useState({
    // Step 1
    hubungan: 'diri-sendiri',
    nik: '3273012809920001',
    noKk: '3273011405080004',
    namaLengkap: 'Rahmat Hidayat',
    jenisKelamin: 'Laki-Laki',
    tempatLahir: 'Bandung',
    tanggalLahir: '09/28/1982',
    noWa: '0812-2025-9981',
    provinsi: 'Jawa Barat',
    kota: 'Kota Bandung',
    kecamatan: 'Bandung Kulon',
    kelurahan: 'Cibuntu',
    namaJalan: 'RT 04 / RW 07, Jl. Jamika Gg. Melati No. 12 (Masuk gang samping pos ronda)',
    lat: '-6.924842',
    lng: '107.592189',

    // Step 2: Karakteristik & Ekonomi
    jumlahTanggungan: 4,
    detailTanggungan: 'Ayah (KK), Ibu (71 th), 2 Anak Usia Sekolah (SD & SMP Kls 8)',
    pekerjaanUtama: 'Buruh Harian Lepas',
    pekerjaanDeskripsi: 'Buruh lepas bengkel las keliling & pembersih selokan',
    penghasilanBulanan: '< 1000000', // Kurang dari Rp 1.000.000
    statusRumah: 'sewa', // Menumpang Bersama, sewa, milik_sendiri, tanah_garapan
    luasLantaiPerOrang: '<8', // < 8 m2 per orang
    materialLantai: 'semen_plester', // Semen Plester Kasar / Retak-retak
    materialDinding: 'batako_tanpa_plester', // Batako / Bata Merah Tanpa Plester
    sumberAirMinum: 'Air Galon Isi Ulang Murah (Beli Eceran per Galon)',
    fasilitasMck: 'Jamban Bersama / MCK Umum Lingkungan (Tidak Punya Pribadi)',
    dayaListrik: '450_subsidi', // PLN 450 VA Bersubsidi
    anakSekolahBeresiko: 'ada',
    disabilitasKronis: 'ada',
    detailDisabilitas: 'Istri mengidap komplikasi diabetes melitus, menahun memerlukan kontrol rutin Puskesmas',
    kronologiEkonomi:
      'Kepala rumah tangga bekerja serabutan lepas angkut pasir/batu yang penghasilannya tidak menentu, berkisar Rp 30.000 - Rp 45.000 per hari jika ada orderan. Dua anak masih aktif di SMP dan SD membutuhkan bantuan operasional sekolah/buku, sementara istri memerlukan obat penurun rutin bulanan. Sangat membutuhkan bantuan sosial PKH / BPNT untuk menjamin keberlangsungan pendidikan anak dan pangan sehari-hari.',
    setujuStep2: true,

    // Step 3: Berkas & Dokumen
    ktpUploaded: true,
    kkUploaded: true,
    sktmUploaded: false,
    listrikUploaded: true,

    // Step 4
    sptjmCheck: true,
  });

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const id = `TB-2026-BDG-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedTicketId(id);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepsList = [
    { num: 1, title: 'Identitas Pribadi', sub: 'KTP, KK, Domisili', badge: 'Informasi Pribadi' },
    { num: 2, title: 'Kondisi Sosial Ekonomi', sub: 'Pekerjaan, Tanggungan, Aset', badge: 'Sosial Ekonomi' },
    { num: 3, title: 'Dokumen & Foto Fisik', sub: 'Fisik tempat tinggal & KTP', badge: 'Dokumen & Foto' },
    { num: 4, title: 'Review & Konfirmasi', sub: 'Fakta integritas & tiket', badge: 'Review & Kirim' },
  ];

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
          <span>/</span>
          <button
            onClick={() => onNavigate && onNavigate('pengajuan-saya')}
            className="hover:text-[#003828] hover:underline"
          >
            Pengajuan Saya
          </button>
          <span>/</span>
          <span className="font-semibold text-[#003828]">Formulir Usulan Kelayakan</span>
        </nav>

        {/* Dynamic Stepper Header Card */}
        <div className="mt-3 rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#176b50]">
                {currentStep === 1
                  ? 'FORMULIR USUL MANDIRI • DTKS KEMENSOS'
                  : currentStep === 2
                  ? 'FORMULIR USUL MANDIRI • CIT-07/DTKS-2026'
                  : currentStep === 3
                  ? 'FORMULIR PENDAFTARAN BANSOS MANDIRI (CIT-08)'
                  : 'FORMULIR PENDAFTARAN DTKS MANDIRI'}
              </span>
              <h1 className="face-bold mt-1 text-xl text-[#003828] sm:text-2xl">
                {currentStep === 1 && 'Formulir Usul Kelayakan Bantuan Sosial'}
                {currentStep === 2 && 'Kondisi Sosial Ekonomi & Kesejahteraan'}
                {currentStep === 3 && 'Dokumen Pendukung & Kondisi Fisik Rumah'}
                {currentStep === 4 && 'Langkah 4: Review Rangkuman & Konfirmasi Pengajuan'}
              </h1>
              <p className="face-regular mt-1 text-xs leading-relaxed text-[#57605d] max-w-2xl">
                {currentStep === 1 &&
                  'Daftarkan diri atau anggota keluarga rentan yang belum terdaftar di DTKS. Formulir terintegrasi verifikasi langsung Dukcapil dan survei faktual lapangan oleh pendamping sosial kelurahan.'}
                {currentStep === 2 &&
                  'Lengkapi 14 indikator kemiskinan standar BPS & Kemensos RI secara jujur dan faktual untuk penentuan desil kemiskinan sosial.'}
                {currentStep === 3 &&
                  'Langkah krusial untuk melengkapi verifikasi administrasi dan validasi faktual lokasi tempat tinggal keluarga Anda.'}
                {currentStep === 4 &&
                  'Silakan periksa kembali seluruh data yang Anda masukkan sebelum menekan tombol Kirim Usulan. Pastikan nomor kontak aktif dan alamat sesuai untuk kelancaran jadwal kunjungan verifikasi faktual lapangan oleh Petugas Pendamping Sosial.'}
              </p>
            </div>

            {/* Top Right Status Badge */}
            <div className="shrink-0">
              {currentStep === 1 && (
                <div className="flex items-center gap-2 rounded-lg border border-[#b5efd8] bg-[#ebf6ef] px-3 py-2 text-right">
                  <span className="flex size-7 items-center justify-center rounded-md bg-[#00513b] text-xs font-bold text-white">
                    1/4
                  </span>
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-[#707974]">
                      Tahap Pengisian
                    </span>
                    <strong className="text-xs text-[#003828]">Data Kependudukan Valid</strong>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="flex items-center gap-1.5 rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3 py-1.5 text-xs text-[#57605d]">
                  <Clock className="size-3.5 text-[#176b50]" />
                  <span>Estimasi Waktu: <strong>5–7 Menit</strong></span>
                </div>
              )}
              {currentStep === 3 && (
                <div className="flex items-center gap-2 rounded-lg border border-[#b5efd8] bg-[#ebf6ef] px-3 py-1.5 text-xs text-[#00513b]">
                  <CheckCircle2 className="size-4 text-[#176b50]" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#707974]">STATUS PENYIMPANAN</span>
                    <strong>Draf Tersimpan Otomatis (14:32 WIB)</strong>
                  </div>
                </div>
              )}
              {currentStep === 4 && (
                <div className="flex items-center gap-1.5 rounded-lg border border-[#b5efd8] bg-[#ebf6ef] px-3 py-1.5 text-xs text-[#00513b]">
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#00513b] text-[10px] font-bold text-white">4</span>
                  <strong>4 dari 4 Tahapan Selesai</strong>
                </div>
              )}
            </div>
          </div>

          {/* Stepper Progress Tabs */}
          <div className="mt-5 grid grid-cols-2 gap-2 border-t border-[#ebf6ef] pt-4 sm:grid-cols-4">
            {stepsList.map((st) => {
              const isDone = currentStep > st.num;
              const isActive = currentStep === st.num;
              return (
                <div
                  key={st.num}
                  onClick={() => !isSuccess && setCurrentStep(st.num)}
                  className={`flex items-start gap-2.5 rounded-lg border p-2.5 cursor-pointer transition ${
                    isActive
                      ? 'border-[#00513b] bg-[#ebf6ef] shadow-xs'
                      : isDone
                      ? 'border-[#b5efd8] bg-white text-[#137333]'
                      : 'border-[#ebf6ef] bg-[#f8fdfa] opacity-60'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                      isActive
                        ? 'bg-[#00513b] text-white'
                        : isDone
                        ? 'bg-[#188038] text-white'
                        : 'bg-[#dae5de] text-[#57605d]'
                    }`}
                  >
                    {isDone ? <Check className="size-3.5 stroke-[3]" /> : st.num}
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#707974]">
                      LANGKAH {st.num} {isActive ? '• AKTIF' : isDone ? '• SELESAI' : '• TERKUNCI'}
                    </span>
                    <strong className="block truncate text-xs text-[#003828]">
                      {st.title}
                    </strong>
                    <span className="block truncate text-[10px] text-[#707974]">{st.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Modal / Card */}
        {isSuccess ? (
          <div className="mt-6 rounded-xl border border-[#b5efd8] bg-white p-8 shadow-xs text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#e6f4ea] text-[#137333] shadow-xs">
              <Check className="size-8 stroke-[3]" />
            </div>
            <span className="face-bold mt-4 inline-block rounded bg-[#b5efd8] px-3 py-1 text-xs text-[#00513b] uppercase tracking-wider">
              Pendaftaran Berhasil Dikirim
            </span>
            <h2 className="face-bold mt-2 text-2xl text-[#003828]">
              Usulan Mandiri Anda Telah Tercatat di Sistem
            </h2>
            <p className="face-regular mt-2 text-xs text-[#57605d] max-w-lg mx-auto leading-relaxed">
              Data pendaftaran dan dokumen pendukung telah diterima secara aman dan dijadwalkan
              untuk pencocokan data NIK Dukcapil serta survei verifikasi lapangan.
            </p>

            <div className="my-6 max-w-md mx-auto rounded-xl border border-[#dce9df] bg-[#ebf6ef] p-4 text-center">
              <span className="text-[10px] font-bold text-[#707974] uppercase tracking-wider block">
                NOMOR TIKET PENDAFTARAN:
              </span>
              <strong className="font-mono face-bold text-2xl text-[#003828] block mt-1">
                {createdTicketId}
              </strong>
              <p className="text-[11px] text-[#176b50] mt-1 font-medium">
                Simpan nomor tiket ini untuk melacak progres pada menu "Pengajuan Saya".
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate && onNavigate('pengajuan-saya')}
                className="face-semibold flex items-center gap-2 rounded-lg bg-[#00513b] px-6 py-2.5 text-xs text-white shadow-xs hover:bg-[#003828]"
              >
                Kembali ke Pengajuan Saya →
              </button>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setCurrentStep(1);
                }}
                className="face-semibold rounded-lg border border-[#dce9df] bg-white px-5 py-2.5 text-xs text-[#003828] hover:bg-[#ebf6ef]"
              >
                Buat Usulan Lainnya
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            
            {/* ========================================================================= */}
            {/* STEP 1: INFORMASI PRIBADI                                                 */}
            {/* ========================================================================= */}
            {currentStep === 1 && (
              <>
                {/* 1. Hubungan dengan Calon Penerima Manfaat */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-[#176b50]" />
                      <h2 className="face-bold text-sm text-[#003828]">
                        1. Hubungan dengan Calon Penerima Manfaat
                      </h2>
                    </div>
                    <p className="mt-1 text-[11px] text-[#57605d]">
                      Pilih status hubungan pengusul dengan warga yang didaftarkan.
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {HUBUNGAN_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = form.hubungan === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => set('hubungan')(opt.id)}
                          className={`relative flex flex-col justify-between rounded-xl border p-4 cursor-pointer transition ${
                            isSelected
                              ? 'border-[#00513b] bg-[#ebf6ef] ring-1 ring-[#00513b]'
                              : 'border-[#dce9df] bg-white hover:border-[#b5efd8] hover:bg-[#f8fdfa]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span
                                className={`flex size-4 items-center justify-center rounded-full border ${
                                  isSelected
                                    ? 'border-[#00513b] bg-[#00513b]'
                                    : 'border-[#707974] bg-white'
                                }`}
                              >
                                {isSelected && <span className="size-1.5 rounded-full bg-white" />}
                              </span>
                              <Icon className="size-4 text-[#176b50]" />
                            </div>
                            <strong className="mt-2.5 block text-xs text-[#003828]">
                              {opt.title}
                            </strong>
                            <p className="mt-1 text-[11px] leading-relaxed text-[#707974]">
                              {opt.desc}
                            </p>
                          </div>
                          {opt.sub && (
                            <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-[#176b50]">
                              <CheckCircle2 className="size-3" /> {opt.sub}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Data Pokok Kependudukan */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-[#176b50]" />
                      <h2 className="face-bold text-sm text-[#003828]">
                        2. Data Pokok Kependudukan (Sesuai e-KTP & KK)
                      </h2>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] font-semibold text-[#00513b]">
                      <ShieldCheck className="size-3" /> Validasi Otomatis Aktif
                    </span>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="face-semibold block text-xs text-[#003828]">
                          Nomor Induk Kependudukan (NIK) <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-[#176b50] font-medium flex items-center gap-1">
                          <CheckCircle2 className="size-3" /> Terverifikasi Dukcapil
                        </span>
                      </div>
                      <div className="relative mt-1.5">
                        <input
                          type="text"
                          maxLength={16}
                          value={form.nik}
                          onChange={(e) => set('nik')(e.target.value.replace(/\D/g, ''))}
                          className="h-11 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3.5 pr-9 font-mono text-xs text-[#003828] outline-none focus:border-[#176b50]"
                        />
                        <CheckCircle2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#176b50]" />
                      </div>
                      <p className="mt-1 text-[10px] text-[#707974]">
                        16 digit NIK kepala keluarga atau subjek penerima manfaat.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="face-semibold block text-xs text-[#003828]">
                          Nomor Kartu Keluarga (No. KK) <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-[#707974]">16 Digit</span>
                      </div>
                      <div className="relative mt-1.5">
                        <input
                          type="text"
                          maxLength={16}
                          value={form.noKk}
                          onChange={(e) => set('noKk')(e.target.value.replace(/\D/g, ''))}
                          className="h-11 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3.5 font-mono text-xs text-[#003828] outline-none focus:border-[#176b50]"
                        />
                      </div>
                      <p className="mt-1 text-[10px] text-[#707974]">
                        Tertera pada bagian atas lembar Kartu Keluarga resmi.
                      </p>
                    </div>

                    <div>
                      <label className="face-semibold block text-xs text-[#003828]">
                        Nama Lengkap Sesuai KTP <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.namaLengkap}
                        onChange={(e) => set('namaLengkap')(e.target.value)}
                        className="mt-1.5 h-11 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3.5 text-xs text-[#003828] outline-none focus:border-[#176b50]"
                      />
                      <p className="mt-1 text-[10px] text-[#707974]">
                        Nama harus cocok dengan basis data Kemendagri agar tidak gagal disaring.
                      </p>
                    </div>

                    <div>
                      <label className="face-semibold block text-xs text-[#003828]">
                        Jenis Kelamin <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1.5 grid grid-cols-2 gap-2">
                        {['Laki-Laki', 'Perempuan'].map((jk) => (
                          <button
                            key={jk}
                            type="button"
                            onClick={() => set('jenisKelamin')(jk)}
                            className={`flex h-11 items-center justify-center gap-2 rounded-lg border text-xs font-semibold transition ${
                              form.jenisKelamin === jk
                                ? 'border-[#00513b] bg-[#ebf6ef] text-[#003828]'
                                : 'border-[#dce9df] bg-white text-[#57605d]'
                            }`}
                          >
                            <span
                              className={`flex size-3.5 items-center justify-center rounded-full border ${
                                form.jenisKelamin === jk
                                  ? 'border-[#00513b] bg-[#00513b]'
                                  : 'border-[#707974]'
                              }`}
                            >
                              {form.jenisKelamin === jk && <span className="size-1 rounded-full bg-white" />}
                            </span>
                            {jk}
                          </button>
                        ))}
                      </div>
                      <p className="mt-1 text-[10px] text-[#707974]">
                        Sesuai keterangan jenis kelamin di e-KTP fisik.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="face-semibold block text-xs text-[#003828]">
                          Tempat Lahir <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.tempatLahir}
                          onChange={(e) => set('tempatLahir')(e.target.value)}
                          className="mt-1.5 h-11 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3.5 text-xs text-[#003828] outline-none focus:border-[#176b50]"
                        />
                      </div>
                      <div>
                        <label className="face-semibold block text-xs text-[#003828]">
                          Tanggal Lahir <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.tanggalLahir}
                          onChange={(e) => set('tanggalLahir')(e.target.value)}
                          className="mt-1.5 h-11 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3.5 text-xs text-[#003828] outline-none focus:border-[#176b50]"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="face-semibold block text-xs text-[#003828]">
                          Nomor WhatsApp / Ponsel Aktif <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-[#707974]">Wajib SMS / WA</span>
                      </div>
                      <input
                        type="text"
                        value={form.noWa}
                        onChange={(e) => set('noWa')(e.target.value)}
                        className="mt-1.5 h-11 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3.5 text-xs text-[#003828] outline-none focus:border-[#176b50]"
                      />
                      <p className="mt-1 text-[10px] text-[#707974]">
                        Penting: Petugas SLRT / Pendamping PKH akan menghubungi nomor ini saat survei lapangan.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Alamat Domisili KTP & Titik Lokasi Faktual */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-[#176b50]" />
                      <h2 className="face-bold text-sm text-[#003828]">
                        3. Alamat Domisili KTP & Titik Lokasi Faktual
                      </h2>
                    </div>
                    <p className="mt-1 text-[11px] text-[#57605d]">
                      Rincian wilayah tempat tinggal aktual untuk penugasan surveyor kelurahan.
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-4">
                    <div>
                      <label className="text-[11px] font-semibold text-[#57605d]">Provinsi</label>
                      <div className="relative mt-1">
                        <input
                          type="text"
                          readOnly
                          value={form.provinsi}
                          className="h-10 w-full rounded-lg border border-[#dce9df] bg-[#f1fcf4] px-3 pr-8 text-xs font-medium text-[#003828]"
                        />
                        <Lock className="absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#707974]" />
                      </div>
                      <span className="text-[9px] text-[#707974]">Terkunci sesuai akun warga</span>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#57605d]">
                        Kota / Kabupaten <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.kota}
                        onChange={(e) => set('kota')(e.target.value)}
                        className="mt-1 h-10 w-full rounded-lg border border-[#dce9df] bg-white px-3 text-xs text-[#003828]"
                      >
                        <option>Kota Bandung</option>
                        <option>Kabupaten Bandung</option>
                        <option>Kota Cimahi</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#57605d]">
                        Kecamatan <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.kecamatan}
                        onChange={(e) => set('kecamatan')(e.target.value)}
                        className="mt-1 h-10 w-full rounded-lg border border-[#dce9df] bg-white px-3 text-xs text-[#003828]"
                      >
                        <option>Bandung Kulon</option>
                        <option>Bojongloa Kaler</option>
                        <option>Babakan Ciparay</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#57605d]">
                        Kelurahan / Desa <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.kelurahan}
                        onChange={(e) => set('kelurahan')(e.target.value)}
                        className="mt-1 h-10 w-full rounded-lg border border-[#dce9df] bg-white px-3 text-xs text-[#003828]"
                      >
                        <option>Cibuntu</option>
                        <option>Cigondewah Kaler</option>
                        <option>Cigondewah Kidul</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="face-semibold block text-xs text-[#003828]">
                      Nama Jalan, Gang, Nomor Rumah, dan RT / RW <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={form.namaJalan}
                      onChange={(e) => set('namaJalan')(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3 text-xs text-[#003828] outline-none focus:border-[#176b50]"
                    />
                    <p className="mt-1 text-[10px] text-[#707974]">
                      Berikan patokan visual seperti dekat mushola, pos ronda, nomor rumah jelas untuk mempermudah surveyor.
                    </p>
                  </div>

                  {/* Geotagging Box */}
                  <div className="mt-4 rounded-xl border border-[#b5efd8] bg-[#ebf6ef] p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <Navigation className="size-4 text-[#176b50]" />
                          <strong className="text-xs text-[#003828]">Presisi Geotagging GPS Lokasi Rumah</strong>
                        </div>
                        <p className="mt-1 text-[11px] text-[#57605d]">
                          Sistem akan memvalidasi apakah pengusul benar berada di kawasan kelurahan Cibuntu guna mencegah kecurangan survei fiktif.
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-2 rounded-lg border border-[#b5efd8] bg-white px-3 py-1.5 text-xs font-mono text-[#003828]">
                            <MapPin className="size-3.5 text-[#176b50]" />
                            <span>KOORDINAT TERDETEKSI: <strong>{form.lat}° S, {form.lng}° E</strong></span>
                          </div>
                          <span className="rounded bg-[#d8f0e1] px-2 py-1 text-[10px] font-semibold text-[#00513b]">
                            ● Akurasi 4 meter
                          </span>
                          <button
                            type="button"
                            className="flex items-center gap-1 rounded-lg border border-[#b5efd8] bg-white px-2.5 py-1 text-xs font-semibold text-[#003828] hover:bg-[#ebf6ef]"
                          >
                            <RefreshCw className="size-3 text-[#176b50]" /> Perbarui Titik
                          </button>
                        </div>
                        <p className="mt-2 text-[10px] text-[#707974]">
                          ⓘ Anda dapat memperbarui koordinat langsung saat berada di dalam rumah tinggal saat calon penerima.
                        </p>
                      </div>

                      {/* Map Thumbnail */}
                      <div className="relative h-24 w-full sm:w-48 overflow-hidden rounded-lg border border-[#b5efd8] bg-[#e1f3e8]">
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                          <div className="rounded bg-black/60 px-2 py-0.5 text-[9px] font-bold text-white">
                            Rumah Pengusul
                          </div>
                          <MapPin className="my-1 size-5 text-red-500 fill-red-500 animate-bounce" />
                          <span className="rounded bg-white/90 px-1.5 py-0.5 text-[8px] font-medium text-[#003828]">
                            Cibuntu, Bandung Kulon
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar Step 1 */}
                <div className="flex flex-col gap-2 rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('pengajuan-saya')}
                      className="face-semibold flex items-center gap-1.5 rounded-lg border border-[#dce9df] bg-white px-4 py-2.5 text-xs text-[#003828] hover:bg-[#ebf6ef]"
                    >
                      <ArrowLeft className="size-3.5" /> Batal + Kembali
                    </button>
                    <button
                      type="button"
                      className="face-semibold flex items-center gap-1.5 rounded-lg border border-[#dce9df] bg-white px-4 py-2.5 text-xs text-[#003828] hover:bg-[#ebf6ef]"
                    >
                      <Save className="size-3.5" /> Simpan Draf
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-xs text-[#57605d]">
                      SELANJUTNYA: <strong>Langkah 2: Kondisi Sosial Ekonomi</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentStep(2);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="face-semibold flex items-center gap-1.5 rounded-lg bg-[#00513b] px-6 py-2.5 text-xs text-white shadow-xs hover:bg-[#003828]"
                    >
                      Lanjutkan ke Langkah 2 <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ========================================================================= */}
            {/* STEP 2: KONDISI SOSIAL EKONOMI & KESEJAHTERAAN                             */}
            {/* ========================================================================= */}
            {currentStep === 2 && (
              <>
                {/* Standarisasi Penilaian Alert */}
                <div className="flex items-start gap-3 rounded-xl border border-[#b5efd8] bg-[#ebf6ef] p-4 text-xs text-[#003828]">
                  <FileText className="size-5 shrink-0 text-[#176b50]" />
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-xs">Standarisasi Penilaian BPS & DTKS (Pusdatin Kemensos)</strong>
                      <span className="rounded bg-[#00513b] px-1.5 py-0.2 text-[9px] font-bold text-white">RESMI</span>
                    </div>
                    <p className="mt-1 leading-relaxed text-[#57605d]">
                      Formulir berikut ini menggunakan 14 indikator kemiskinan BPS untuk menentukan skoring desil kemiskinan sosial (Peringkat Kesejahteraan 1–4) calon penerima bantuan sosial Kemensos. Mohon cantumkan data seobjektif mungkin.
                    </p>
                  </div>
                </div>

                {/* Bagian A: Karakteristik Keluarga & Pekerjaan */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-md bg-[#00513b] text-xs font-bold text-white">
                        A
                      </div>
                      <div>
                        <h2 className="face-bold text-sm text-[#003828]">Karakteristik Keluarga & Pekerjaan</h2>
                        <p className="text-[10px] text-[#707974]">Indikator demografi, beban tanggungan keluarga, dan mata pencaharian utama</p>
                      </div>
                    </div>
                    <span className="rounded bg-[#f1fcf4] px-2 py-0.5 text-[10px] font-semibold text-[#176b50]">
                      Indikator 01 – 03
                    </span>
                  </div>

                  {/* 1. Jumlah Anggota Keluarga dalam Tanggungan */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <label className="face-semibold block text-xs text-[#003828]">
                        1. Jumlah Anggota Keluarga dalam Tanggungan Kepala Keluarga <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10px] text-[#176b50] flex items-center gap-1 font-medium">
                        <CheckCircle2 className="size-3" /> Sesuai Data Kartu Keluarga
                      </span>
                    </div>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex items-center rounded-lg border border-[#dce9df] bg-[#f8fdfa]">
                        <button
                          type="button"
                          onClick={() => set('jumlahTanggungan')(Math.max(1, form.jumlahTanggungan - 1))}
                          className="flex size-10 items-center justify-center text-[#57605d] hover:bg-gray-100 rounded-l-lg"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="w-12 text-center font-bold text-sm text-[#003828]">
                          {form.jumlahTanggungan}
                        </span>
                        <button
                          type="button"
                          onClick={() => set('jumlahTanggungan')(form.jumlahTanggungan + 1)}
                          className="flex size-10 items-center justify-center text-[#57605d] hover:bg-gray-100 rounded-r-lg"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={form.detailTanggungan}
                        onChange={(e) => set('detailTanggungan')(e.target.value)}
                        className="h-10 flex-1 rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3 text-xs text-[#003828] outline-none"
                      />
                    </div>
                    <p className="mt-1 text-[10px] text-[#707974]">
                      Termasuk kepala keluarga. Rincikan umur lansia dan anak sekolah untuk perolehan komponen PKH.
                    </p>
                  </div>

                  {/* 2. Status Pekerjaan Utama Kepala Keluarga */}
                  <div className="mt-5">
                    <label className="face-semibold block text-xs text-[#003828]">
                      2. Status Pekerjaan Utama Kepala Keluarga <span className="text-red-500">*</span>
                    </label>
                    <p className="text-[10px] text-[#707974]">Pilih salah satu aktivitas yang paling sering menghasilkan nafkah makan harian.</p>

                    <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
                      {[
                        {
                          id: 'Buruh Harian Lepas',
                          sub: 'Buruh bangunan, kuli angkut, buruh cuci serabutan tanpa ikatan kerja tetap.',
                        },
                        {
                          id: 'Pedagang Keliling / Asongan',
                          sub: 'Modal usaha sangat minim, sering rugi dan bergantung musim / pembeli harian.',
                        },
                        {
                          id: 'Pekerja Serabutan Informal',
                          sub: 'Pemulung, ojek pangkalan/ojol rating rendah, penarik becak, tukang parkir liar.',
                        },
                        {
                          id: 'Korban PHK Belum Bekerja',
                          sub: 'Hilang pekerjaan pabrik dalam 6 bulan terakhir dan belum ada pekerjaan tetap.',
                        },
                        {
                          id: 'Lansia / Tidak Mampu Bekerja',
                          sub: 'Usia di atas 60 tahun atau memiliki disabilitas fisik permanen.',
                        },
                        {
                          id: 'Lainnya (Tidak Berpenghasilan Tetap)',
                          sub: 'Petani penggarap tanpa lahan sendiri, nelayan kecil tanpa perahu motor.',
                        },
                      ].map((item) => {
                        const isSelected = form.pekerjaanUtama === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => set('pekerjaanUtama')(item.id)}
                            className={`rounded-xl border p-3 cursor-pointer transition ${
                              isSelected
                                ? 'border-[#00513b] bg-[#ebf6ef] ring-1 ring-[#00513b]'
                                : 'border-[#dce9df] bg-white hover:border-[#b5efd8]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`flex size-3.5 items-center justify-center rounded-full border ${
                                  isSelected ? 'border-[#00513b] bg-[#00513b]' : 'border-[#707974]'
                                }`}
                              >
                                {isSelected && <span className="size-1 rounded-full bg-white" />}
                              </span>
                              <strong className="text-xs text-[#003828]">{item.id}</strong>
                            </div>
                            <p className="mt-1.5 text-[10px] leading-relaxed text-[#707974] pl-5.5">
                              {item.sub}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Estimasi Penghasilan Gabungan Rata-rata Bulanan */}
                  <div className="mt-5">
                    <label className="face-semibold block text-xs text-[#003828]">
                      3. Estimasi Penghasilan Gabungan Rata-rata Bulanan Rumah Tangga <span className="text-red-500">*</span>
                    </label>
                    <p className="text-[10px] text-[#707974]">
                      Total pemasukan seluruh anggota keluarga yang bekerja dalam satu rumah.
                    </p>

                    <div className="mt-2.5 grid gap-3 sm:grid-cols-3">
                      {[
                        {
                          val: '< 1000000',
                          desil: 'Desil 1 (Sangat Miskin)',
                          amount: 'Kurang dari Rp 1.000.000',
                          desc: 'Garis kemiskinan ekstrem nasional (< Rp 350.000/kapita/bulan). Prioritas utama bansos.',
                        },
                        {
                          val: '1000000-1500000',
                          desil: 'Desil 2 (Miskin)',
                          amount: 'Rp 1.000.000 – Rp 1.500.000',
                          desc: 'Hanya mencukupi kebutuhan makan satu sendok sehari tanpa tabungan/darurat.',
                        },
                        {
                          val: '1500000-2500000',
                          desil: 'Desil 3 (Rentan Miskin)',
                          amount: 'Rp 1.500.000 – Rp 2.500.000',
                          desc: 'Pendapatan tidak tetap, rentan jatuh miskin jika ada musibah sakit / PHK.',
                        },
                      ].map((card) => {
                        const isSelected = form.penghasilanBulanan === card.val;
                        return (
                          <div
                            key={card.val}
                            onClick={() => set('penghasilanBulanan')(card.val)}
                            className={`rounded-xl border p-4 cursor-pointer transition flex flex-col justify-between ${
                              isSelected
                                ? 'border-[#00513b] bg-[#ebf6ef] ring-1 ring-[#00513b]'
                                : 'border-[#dce9df] bg-white hover:border-[#b5efd8]'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="rounded bg-[#ffebe6] px-1.5 py-0.5 text-[9px] font-bold text-[#b91c1c]">
                                  {card.desil}
                                </span>
                                <span
                                  className={`flex size-3.5 items-center justify-center rounded-full border ${
                                    isSelected ? 'border-[#00513b] bg-[#00513b]' : 'border-[#707974]'
                                  }`}
                                >
                                  {isSelected && <span className="size-1 rounded-full bg-white" />}
                                </span>
                              </div>
                              <strong className="mt-2 block text-sm text-[#003828]">
                                {card.amount}
                              </strong>
                              <p className="mt-1 text-[10px] leading-relaxed text-[#707974]">
                                {card.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bagian B: Kondisi Bangunan & Tempat Tinggal */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-md bg-[#00513b] text-xs font-bold text-white">
                        B
                      </div>
                      <div>
                        <h2 className="face-bold text-sm text-[#003828]">Kondisi Bangunan & Tempat Tinggal</h2>
                        <p className="text-[10px] text-[#707974]">Karakteristik fisik hunian menggunakan indikator Rumah Tidak Layak Huni (RTLH)</p>
                      </div>
                    </div>
                    <span className="rounded bg-[#f1fcf4] px-2 py-0.5 text-[10px] font-semibold text-[#176b50]">
                      Indikator 04 – 07
                    </span>
                  </div>

                  {/* 4. Status Penguasaan / Kepemilikan Tempat Tinggal */}
                  <div className="mt-4">
                    <label className="face-semibold block text-xs text-[#003828]">
                      4. Status Penguasaan / Kepemilikan Tempat Tinggal Saat Ini <span className="text-red-500">*</span>
                    </label>

                    <div className="mt-2.5 grid gap-3 sm:grid-cols-4">
                      {[
                        {
                          id: 'menumpang',
                          icon: Users,
                          title: 'Menumpang Bersama',
                          desc: 'Tinggal di rumah orang tua/kerabat atau famili tanpa bayar sewa.',
                        },
                        {
                          id: 'sewa',
                          icon: Home,
                          title: 'Sewa / Kontrakan Bulanan',
                          desc: 'Menyewa kamar kos petak sederhana dengan beban biaya bulanan rutin.',
                        },
                        {
                          id: 'milik_sendiri',
                          icon: Building2,
                          title: 'Milik Sendiri Bukan Perak',
                          desc: 'Rumah waris / bantaran dengan atap bocor atau surat belum sah.',
                        },
                        {
                          id: 'tanah_garapan',
                          icon: AlertCircle,
                          title: 'Tanah Garapan / Liar',
                          desc: 'Menempati bedeng di bantaran sungai rel KA atau tanah negara.',
                        },
                      ].map((item) => {
                        const isSelected = form.statusRumah === item.id;
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.id}
                            onClick={() => set('statusRumah')(item.id)}
                            className={`rounded-xl border p-3.5 cursor-pointer transition flex flex-col justify-between ${
                              isSelected
                                ? 'border-[#00513b] bg-[#ebf6ef] ring-1 ring-[#00513b]'
                                : 'border-[#dce9df] bg-white hover:border-[#b5efd8]'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <Icon className="size-4 text-[#176b50]" />
                                <span
                                  className={`flex size-3.5 items-center justify-center rounded-full border ${
                                    isSelected ? 'border-[#00513b] bg-[#00513b]' : 'border-[#707974]'
                                  }`}
                                >
                                  {isSelected && <span className="size-1 rounded-full bg-white" />}
                                </span>
                              </div>
                              <strong className="mt-2 block text-xs text-[#003828]">
                                {item.title}
                              </strong>
                              <p className="mt-1 text-[10px] leading-relaxed text-[#707974]">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 5 & 6: Luas Lantai & Material Lantai */}
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="face-semibold block text-xs text-[#003828]">
                        5. Luas Lantai Bangunan per Anggota Keluarga <span className="text-red-500">*</span>
                      </label>
                      <p className="text-[10px] text-[#707974]">Standar BPS: &lt; 8 m² per anggota keluarga</p>

                      <div className="mt-2 space-y-2">
                        {[
                          { id: '<8', label: '< 8 m² per orang (Sangat Padat / Sempit)' },
                          { id: '8-14', label: '8 – 14 m² per orang (Cukup)' },
                          { id: '>14', label: '> 14 m² per orang (Luas)' },
                        ].map((opt) => (
                          <div
                            key={opt.id}
                            onClick={() => set('luasLantaiPerOrang')(opt.id)}
                            className={`flex items-center justify-between rounded-lg border p-2.5 cursor-pointer text-xs ${
                              form.luasLantaiPerOrang === opt.id
                                ? 'border-[#00513b] bg-[#ebf6ef] font-semibold text-[#003828]'
                                : 'border-[#dce9df] bg-white text-[#57605d]'
                            }`}
                          >
                            <span>{opt.label}</span>
                            <span
                              className={`flex size-3.5 items-center justify-center rounded-full border ${
                                form.luasLantaiPerOrang === opt.id ? 'border-[#00513b] bg-[#00513b]' : 'border-[#707974]'
                              }`}
                            >
                              {form.luasLantaiPerOrang === opt.id && <span className="size-1 rounded-full bg-white" />}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="face-semibold block text-xs text-[#003828]">
                        6. Jenis Material Lantai Terluas <span className="text-red-500">*</span>
                      </label>
                      <p className="text-[10px] text-[#707974]">Material ruang utama atau ruang tamu</p>

                      <div className="mt-2 space-y-2">
                        {[
                          { id: 'tanah', label: 'Tanah Liat / Pasir Kasar Terbuka' },
                          { id: 'semen_plester', label: 'Semen Plester Kasar / Retak-retak' },
                          { id: 'keramik_rusak', label: 'Keramik Kualitas Rendah / Rusak Terkelupas' },
                        ].map((opt) => (
                          <div
                            key={opt.id}
                            onClick={() => set('materialLantai')(opt.id)}
                            className={`flex items-center justify-between rounded-lg border p-2.5 cursor-pointer text-xs ${
                              form.materialLantai === opt.id
                                ? 'border-[#00513b] bg-[#ebf6ef] font-semibold text-[#003828]'
                                : 'border-[#dce9df] bg-white text-[#57605d]'
                            }`}
                          >
                            <span>{opt.label}</span>
                            <span
                              className={`flex size-3.5 items-center justify-center rounded-full border ${
                                form.materialLantai === opt.id ? 'border-[#00513b] bg-[#00513b]' : 'border-[#707974]'
                              }`}
                            >
                              {form.materialLantai === opt.id && <span className="size-1 rounded-full bg-white" />}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 7. Jenis Material Dinding Rumah Terluas */}
                  <div className="mt-5">
                    <label className="face-semibold block text-xs text-[#003828]">
                      7. Jenis Material Dinding Rumah Terluas <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 grid gap-3 sm:grid-cols-3">
                      {[
                        {
                          id: 'anyaman_bambu',
                          title: 'Anyaman Bambu (Gedek / Sasak)',
                          sub: 'Dinding bilik rapuh berlubang dan berangin.',
                        },
                        {
                          id: 'papan_kayu',
                          title: 'Papan Kayu Bekas / Seng',
                          sub: 'Papan cor-coran atau seng karatan.',
                        },
                        {
                          id: 'batako_tanpa_plester',
                          title: 'Batako / Bata Merah Tanpa Plester',
                          sub: 'Batu bata kasar menyerap air tanpa plester semen.',
                        },
                      ].map((item) => {
                        const isSelected = form.materialDinding === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => set('materialDinding')(item.id)}
                            className={`rounded-xl border p-3 cursor-pointer transition ${
                              isSelected
                                ? 'border-[#00513b] bg-[#ebf6ef] ring-1 ring-[#00513b]'
                                : 'border-[#dce9df] bg-white hover:border-[#b5efd8]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`flex size-3.5 items-center justify-center rounded-full border ${
                                  isSelected ? 'border-[#00513b] bg-[#00513b]' : 'border-[#707974]'
                                }`}
                              >
                                {isSelected && <span className="size-1 rounded-full bg-white" />}
                              </span>
                              <strong className="text-xs text-[#003828]">{item.title}</strong>
                            </div>
                            <p className="mt-1 text-[10px] leading-relaxed text-[#707974] pl-5.5">
                              {item.sub}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bagian C: Utilitas Sanitasi & Kerentanan Khusus */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-md bg-[#00513b] text-xs font-bold text-white">
                        C
                      </div>
                      <div>
                        <h2 className="face-bold text-sm text-[#003828]">Utilitas Sanitasi & Kerentanan Khusus</h2>
                        <p className="text-[10px] text-[#707974]">Akses air bersih, MCK, daya penerangan listrik, dan perlindungan sosial rentan</p>
                      </div>
                    </div>
                    <span className="rounded bg-[#f1fcf4] px-2 py-0.5 text-[10px] font-semibold text-[#176b50]">
                      Indikator 08 – 12
                    </span>
                  </div>

                  {/* 8A & 8B: Sumber Air Minum & Fasilitas MCK */}
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="face-semibold block text-xs text-[#003828]">
                        8A. Sumber Air Minum Utama <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.sumberAirMinum}
                        onChange={(e) => set('sumberAirMinum')(e.target.value)}
                        className="mt-1.5 h-11 w-full rounded-lg border border-[#dce9df] bg-white px-3 text-xs text-[#003828]"
                      >
                        <option>Air Galon Isi Ulang Murah (Beli Eceran per Galon)</option>
                        <option>Sumur Timba Terbuka / Tak Terlindung</option>
                        <option>Mata Air / Sungai / Hujan</option>
                        <option>PDAM / Meteran Langganan</option>
                      </select>
                    </div>

                    <div>
                      <label className="face-semibold block text-xs text-[#003828]">
                        8B. Fasilitas Buang Air Besar (Jamban / Toilet) <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.fasilitasMck}
                        onChange={(e) => set('fasilitasMck')(e.target.value)}
                        className="mt-1.5 h-11 w-full rounded-lg border border-[#dce9df] bg-white px-3 text-xs text-[#003828]"
                      >
                        <option>Jamban Bersama / MCK Umum Lingkungan (Tidak Punya Pribadi)</option>
                        <option>Jamban Cemplung / Sungai Terbuka</option>
                        <option>Jamban Leher Angsa Milik Sendiri (Septic Tank Pribadi)</option>
                      </select>
                    </div>
                  </div>

                  {/* 9. Sumber Penerangan & Daya Listrik Rumah */}
                  <div className="mt-4">
                    <label className="face-semibold block text-xs text-[#003828]">
                      9. Sumber Penerangan & Daya Listrik Rumah <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 grid gap-3 sm:grid-cols-3">
                      {[
                        {
                          id: '450_subsidi',
                          title: 'PLN 450 VA Bersubsidi',
                          sub: 'Meteran atas nama sendiri / keluarga.',
                          icon: Zap,
                        },
                        {
                          id: 'menumpang',
                          title: 'Menumpang Kabel Tetangga',
                          sub: 'Tanpa meteran sendiri bayar iuran.',
                          icon: RefreshCw,
                        },
                        {
                          id: '900_subsidi',
                          title: 'PLN 900 VA (Subsidi / Non)',
                          sub: 'Listrik pra-bayar atau pasca bayar.',
                          icon: Zap,
                        },
                      ].map((item) => {
                        const isSelected = form.dayaListrik === item.id;
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.id}
                            onClick={() => set('dayaListrik')(item.id)}
                            className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition ${
                              isSelected
                                ? 'border-[#00513b] bg-[#ebf6ef] ring-1 ring-[#00513b]'
                                : 'border-[#dce9df] bg-white hover:border-[#b5efd8]'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`flex size-3.5 items-center justify-center rounded-full border ${
                                    isSelected ? 'border-[#00513b] bg-[#00513b]' : 'border-[#707974]'
                                  }`}
                                >
                                  {isSelected && <span className="size-1 rounded-full bg-white" />}
                                </span>
                                <strong className="text-xs text-[#003828]">{item.title}</strong>
                              </div>
                              <p className="mt-1 text-[10px] text-[#707974] pl-5">{item.sub}</p>
                            </div>
                            <Icon className="size-4 text-[#176b50]" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 10. Tanggungan Pendidikan Anak Usia Wajib Belajar */}
                  <div className="mt-4 rounded-xl border border-[#dce9df] bg-[#f8fdfa] p-3.5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <strong className="text-xs text-[#003828]">
                          10. Tanggungan Pendidikan Anak Usia Wajib Belajar (7 – 18 Tahun) <span className="text-red-500">*</span>
                        </strong>
                        <p className="text-[10px] text-[#707974]">
                          Apakah ada anak yang sedang bersekolah atau berisiko putus sekolah karena biaya?
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-xs text-[#003828] cursor-pointer">
                          <input
                            type="radio"
                            name="anakSekolah"
                            checked={form.anakSekolahBeresiko === 'ada'}
                            onChange={() => set('anakSekolahBeresiko')('ada')}
                            className="accent-[#00513b]"
                          />
                          <span className="font-semibold text-[#00513b]">Ada (2 Orang Anak)</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-xs text-[#57605d] cursor-pointer">
                          <input
                            type="radio"
                            name="anakSekolah"
                            checked={form.anakSekolahBeresiko === 'tidak'}
                            onChange={() => set('anakSekolahBeresiko')('tidak')}
                            className="accent-[#00513b]"
                          />
                          <span>Tidak Ada</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* 11. Anggota Keluarga Disabilitas Berat / Kronis */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <label className="face-semibold block text-xs text-[#003828]">
                        11. Anggota Keluarga Disabilitas Berat / Penderita Sakit Kronis Menahun <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#003828] cursor-pointer">
                          <input
                            type="radio"
                            name="disabilitas"
                            checked={form.disabilitasKronis === 'ada'}
                            onChange={() => set('disabilitasKronis')('ada')}
                            className="accent-[#00513b]"
                          />
                          <span>Ada</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-xs text-[#57605d] cursor-pointer">
                          <input
                            type="radio"
                            name="disabilitas"
                            checked={form.disabilitasKronis === 'tidak'}
                            onChange={() => set('disabilitasKronis')('tidak')}
                            className="accent-[#00513b]"
                          />
                          <span>Tidak Ada</span>
                        </label>
                      </div>
                    </div>
                    {form.disabilitasKronis === 'ada' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          value={form.detailDisabilitas}
                          onChange={(e) => set('detailDisabilitas')(e.target.value)}
                          className="h-10 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3 text-xs text-[#003828] outline-none"
                        />
                        <p className="mt-1 text-[10px] text-[#707974]">
                          Cantumkan bukti rujukan atau kartu kepesertaan faskes jika ada.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 12. Keterangan Tambahan & Kronologi Kerentanan Ekonomi */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <label className="face-semibold block text-xs text-[#003828]">
                        12. Keterangan Tambahan & Kronologi Kerentanan Ekonomi Keluarga
                      </label>
                      <span className="text-[10px] text-[#707974]">{form.kronologiEkonomi.length} / 800</span>
                    </div>
                    <textarea
                      rows={4}
                      value={form.kronologiEkonomi}
                      onChange={(e) => set('kronologiEkonomi')(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3 text-xs leading-relaxed text-[#003828] outline-none focus:border-[#176b50]"
                    />
                    <p className="mt-1 text-[10px] text-[#707974]">
                      Rincian ini akan langsung dibaca oleh koordinator pendamping sosial saat survei lapangan.
                    </p>
                  </div>
                </div>

                {/* Deklarasi Kebenaran */}
                <div className="rounded-xl border border-[#b5efd8] bg-[#ebf6ef] p-3.5">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.setujuStep2}
                      onChange={(e) => set('setujuStep2')(e.target.checked)}
                      className="mt-0.5 size-4 accent-[#00513b]"
                    />
                    <span className="text-xs leading-relaxed text-[#003828]">
                      Saya menyatakan dengan sesungguhnya bahwa seluruh rincian keadaan sosial ekonomi, tempat tinggal, dan kondisi tanggungan di atas diisi dengan <strong>sebenar-benarnya tanpa rekayasa</strong>. Saya bersedia disurvei dan diverifikasi faktual lapangan dan bersedia dicoret apabila ditemukan unsur manipulasi data.
                    </span>
                  </label>
                </div>

                {/* Footer Action Bar Step 2 */}
                <div className="flex flex-col gap-2 rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentStep(1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="face-semibold flex items-center gap-1.5 rounded-lg border border-[#dce9df] bg-white px-4 py-2.5 text-xs text-[#003828] hover:bg-[#ebf6ef]"
                    >
                      <ArrowLeft className="size-3.5" /> Kembali ke Langkah 1
                    </button>
                    <button
                      type="button"
                      className="face-semibold flex items-center gap-1.5 rounded-lg border border-[#dce9df] bg-white px-4 py-2.5 text-xs text-[#003828] hover:bg-[#ebf6ef]"
                    >
                      <Save className="size-3.5" /> Simpan Draf Usulan
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(3);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="face-semibold flex items-center gap-1.5 rounded-lg bg-[#00513b] px-6 py-2.5 text-xs text-white shadow-xs hover:bg-[#003828]"
                  >
                    Lanjutkan ke Langkah 3: Dokumen & Foto Fisik Rumah <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </>
            )}

            {/* ========================================================================= */}
            {/* STEP 3: DOKUMEN PENDUKUNG & KONDISI FISIK RUMAH                           */}
            {/* ========================================================================= */}
            {currentStep === 3 && (
              <>
                {/* Instruksi Unggah Berkas Resmi */}
                <div className="flex items-start gap-3 rounded-xl border border-[#b5efd8] bg-[#ebf6ef] p-4 text-xs text-[#003828]">
                  <Info className="size-5 shrink-0 text-[#176b50]" />
                  <div>
                    <strong className="text-xs">Instruksi Unggah Berkas Resmi</strong>
                    <p className="mt-1 leading-relaxed text-[#57605d]">
                      Unggah berkas digital asli dalam format JPG, PNG, atau PDF (maks. 5 MB per berkas). Pastikan teks dokumen terbaca tajam, tidak terpotong tepi sudutnya, dan foto hunian diambil langsung di tempat tinggal Anda saat ini.
                    </p>
                  </div>
                </div>

                {/* 1. Dokumen Identitas & Pengeluaran Dasar */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <div>
                      <h2 className="face-bold text-sm text-[#003828]">
                        1. Dokumen Identitas & Pengeluaran Dasar
                      </h2>
                      <p className="text-[10px] text-[#707974]">Dokumen administratif pendukung untuk verifikasi silang data kependudukan & PLN</p>
                    </div>
                    <span className="rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] font-semibold text-[#00513b]">
                      3 dari 4 Berkas Siap
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {/* Item 1: KTP */}
                    <div className="rounded-xl border border-[#b5efd8] bg-[#f8fdfa] p-3.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-[#e6f4ea] px-1.5 py-0.2 text-[9px] font-bold text-[#137333]">
                            Wajib Diunggah
                          </span>
                          <strong className="text-xs text-[#003828]">KTP-el Asli Kepala Keluarga</strong>
                        </div>
                        <span className="text-[10px] text-[#137333] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="size-3" /> Terunggah
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between rounded-lg bg-white p-2.5 border border-[#dce9df]">
                        <div className="flex items-center gap-2">
                          <FileText className="size-4 text-[#176b50]" />
                          <div>
                            <strong className="block text-[11px] text-[#003828]">ktp_rahmat_hidayat.jpg</strong>
                            <span className="text-[9px] text-[#707974]">1.8 MB • Unggah 24 Feb 2026</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button className="flex items-center gap-1 rounded border border-[#dce9df] px-2 py-1 text-[10px] font-semibold text-[#003828] hover:bg-[#ebf6ef]">
                            <Eye className="size-3" /> Pratinjau
                          </button>
                          <button className="rounded border border-[#dce9df] px-2 py-1 text-[10px] font-semibold text-[#003828] hover:bg-[#ebf6ef]">
                            Ganti
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item 2: KK */}
                    <div className="rounded-xl border border-[#b5efd8] bg-[#f8fdfa] p-3.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-[#e6f4ea] px-1.5 py-0.2 text-[9px] font-bold text-[#137333]">
                            Wajib Diunggah
                          </span>
                          <strong className="text-xs text-[#003828]">Kartu Keluarga (KK) Barcode Asli</strong>
                        </div>
                        <span className="text-[10px] text-[#137333] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="size-3" /> Terunggah
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between rounded-lg bg-white p-2.5 border border-[#dce9df]">
                        <div className="flex items-center gap-2">
                          <FileText className="size-4 text-[#176b50]" />
                          <div>
                            <strong className="block text-[11px] text-[#003828]">kartu_keluarga_2024.pdf</strong>
                            <span className="text-[9px] text-[#707974]">2.1 MB • QR Code Terbaca</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button className="flex items-center gap-1 rounded border border-[#dce9df] px-2 py-1 text-[10px] font-semibold text-[#003828] hover:bg-[#ebf6ef]">
                            <Eye className="size-3" /> Pratinjau
                          </button>
                          <button className="rounded border border-[#dce9df] px-2 py-1 text-[10px] font-semibold text-[#003828] hover:bg-[#ebf6ef]">
                            Ganti
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item 3: SKTM */}
                    <div className="rounded-xl border border-dashed border-[#dce9df] bg-[#f8fdfa] p-3.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-gray-100 px-1.5 py-0.2 text-[9px] font-bold text-[#57605d]">
                            Opsional Tambahan
                          </span>
                          <strong className="text-xs text-[#003828]">Surat Keterangan Tidak Mampu (SKTM)</strong>
                        </div>
                        <span className="text-[10px] text-[#707974]">Belum Diunggah</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between rounded-lg bg-white p-2.5 border border-dashed border-[#dce9df]">
                        <span className="text-[10px] text-[#707974]">
                          Dapat disusulkan secara faktual saat visitasi pendamping bansos ke rumah.
                        </span>
                        <button className="flex shrink-0 items-center gap-1 rounded bg-[#ebf6ef] px-2.5 py-1 text-[10px] font-semibold text-[#00513b] hover:bg-[#d8f0e1]">
                          <Upload className="size-3" /> Unggah SKTM
                        </button>
                      </div>
                    </div>

                    {/* Item 4: Struk Tagihan Listrik */}
                    <div className="rounded-xl border border-[#b5efd8] bg-[#f8fdfa] p-3.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-[#e6f4ea] px-1.5 py-0.2 text-[9px] font-bold text-[#137333]">
                            Wajib Diunggah
                          </span>
                          <strong className="text-xs text-[#003828]">Struk Tagihan / Token Listrik Terakhir</strong>
                        </div>
                        <span className="text-[10px] text-[#137333] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="size-3" /> Terunggah
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between rounded-lg bg-white p-2.5 border border-[#dce9df]">
                        <div className="flex items-center gap-2">
                          <Zap className="size-4 text-[#176b50]" />
                          <div>
                            <strong className="block text-[11px] text-[#003828]">token_pln_450va.jpg</strong>
                            <span className="text-[9px] text-[#707974]">640 KB • Daya 450 VA Subsidi</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button className="flex items-center gap-1 rounded border border-[#dce9df] px-2 py-1 text-[10px] font-semibold text-[#003828] hover:bg-[#ebf6ef]">
                            <Eye className="size-3" /> Pratinjau
                          </button>
                          <button className="rounded border border-[#dce9df] px-2 py-1 text-[10px] font-semibold text-[#003828] hover:bg-[#ebf6ef]">
                            Ganti
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Mandatory Physical Audit: 3 Sudut Foto Kondisi Fisik Rumah */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-[#ebf6ef] pb-3">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#176b50]">
                        MANDATORY PHYSICAL AUDIT
                      </span>
                      <h2 className="face-bold text-sm text-[#003828]">
                        2. Tiga (3) Sudut Foto Kondisi Fisik Rumah
                      </h2>
                      <p className="text-[10px] text-[#707974]">
                        Wajib menyertakan tiga sudut pandang aktual rumah yang ditempati pemohon bansos untuk pencocokan data desil kemiskinan.
                      </p>
                    </div>
                    <span className="flex items-center gap-1 rounded bg-[#ebf6ef] px-2.5 py-1 text-[10px] font-semibold text-[#00513b]">
                      <MapPin className="size-3" /> Validasi Koordinat GPS Aktif: -6.92481, 107.5789
                    </span>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {/* Sudut 1: Fasad Depan */}
                    <div className="overflow-hidden rounded-xl border border-[#dce9df] bg-white">
                      <div className="relative aspect-video w-full bg-gray-200">
                        <img
                          src="/assets/182b1.png"
                          alt="Fasad Depan Rumah"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[9px] font-bold text-white">
                          Sudut 1: Fasad Depan
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded bg-black/50 px-2 py-1 text-[9px] text-white">
                          <span className="flex items-center gap-1">
                            <MapPin className="size-2.5 text-green-400" /> Geotag Terverifikasi
                          </span>
                          <span>Akurasi 3.2m</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <strong className="block text-xs text-[#003828]">Tampak Depan Lengkap Rumah</strong>
                        <p className="mt-0.5 text-[10px] text-[#707974]">
                          Memperlihatkan atap genteng/seng, batas dinding pintu masuk, jendela, dan kondisi kelayakan rumah pemohon.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <button className="flex flex-1 items-center justify-center gap-1 rounded border border-[#dce9df] py-1 text-[10px] font-semibold text-[#003828] hover:bg-[#ebf6ef]">
                            <Eye className="size-3" /> Lihat Foto
                          </button>
                          <button className="flex flex-1 items-center justify-center gap-1 rounded border border-[#dce9df] py-1 text-[10px] font-semibold text-[#003828] hover:bg-[#ebf6ef]">
                            Ganti
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Sudut 2: Ruang Tamu */}
                    <div className="overflow-hidden rounded-xl border border-[#dce9df] bg-white">
                      <div className="relative aspect-video w-full bg-gray-200">
                        <img
                          src="/assets/7399a.png"
                          alt="Ruang Tamu & Kondisi Lantai"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[9px] font-bold text-white">
                          Sudut 2: Ruang Tamu
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded bg-black/50 px-2 py-1 text-[9px] text-white">
                          <span>Lantai: Semen Plester</span>
                          <span className="text-green-300">Kriteria Valid</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <strong className="block text-xs text-[#003828]">Ruang Tamu & Kondisi Lantai</strong>
                        <p className="mt-0.5 text-[10px] text-[#707974]">
                          Memperlihatkan material permukaan lantai (semen plester/tanah/keramik) serta perabotan sederhana keluarga.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <button className="flex flex-1 items-center justify-center gap-1 rounded border border-[#dce9df] py-1 text-[10px] font-semibold text-[#003828] hover:bg-[#ebf6ef]">
                            <Eye className="size-3" /> Lihat Foto
                          </button>
                          <button className="flex flex-1 items-center justify-center gap-1 rounded border border-[#dce9df] py-1 text-[10px] font-semibold text-[#003828] hover:bg-[#ebf6ef]">
                            Ganti
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Sudut 3: Dapur & Sanitasi */}
                    <div className="overflow-hidden rounded-xl border border-[#dce9df] bg-white">
                      <div className="relative aspect-video w-full bg-gray-200">
                        <img
                          src="/assets/b7571.png"
                          alt="Dapur & Sanitasi Air Bersih"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[9px] font-bold text-white">
                          Sudut 3: Dapur & Sanitasi
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded bg-black/50 px-2 py-1 text-[9px] text-white">
                          <span>Bak Penampungan Air</span>
                          <span className="text-yellow-300">LPG 3 Kg Terdeteksi</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <strong className="block text-xs text-[#003828]">Dapur & Sanitasi Air Bersih</strong>
                        <p className="mt-0.5 text-[10px] text-[#707974]">
                          Memperlihatkan tungku/kompor, tempat penampungan air/sanitasi dan wadah penampung air bersih rumah tangga.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <button className="flex flex-1 items-center justify-center gap-1 rounded border border-[#dce9df] py-1 text-[10px] font-semibold text-[#003828] hover:bg-[#ebf6ef]">
                            <Eye className="size-3" /> Lihat Foto
                          </button>
                          <button className="flex flex-1 items-center justify-center gap-1 rounded border border-[#dce9df] py-1 text-[10px] font-semibold text-[#003828] hover:bg-[#ebf6ef]">
                            Ganti
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panduan Standar Mutu Validasi Foto Kemensos */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center gap-2 border-b border-[#ebf6ef] pb-3">
                    <CheckCircle2 className="size-4 text-[#176b50]" />
                    <h3 className="face-bold text-xs uppercase tracking-wider text-[#003828]">
                      Panduan Standar Mutu Validasi Foto Kemensos
                    </h3>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {/* Kolom 1: Kriteria Diterima */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#137333]">
                        KRITERIA FOTO DITERIMA
                      </span>
                      {[
                        'Foto diambil pada siang hari dengan pencahayaan alami yang cukup terang tanpa bayangan gelap pekat.',
                        'Sudut kamera melebar (wide perspective), tidak terlalu di-zoom sehingga luas ruang dan batas fisik terlihat nyata.',
                        'Fitur GPS Lokasi ponsel aktif saat pengambilan gambar agar koordinat otomatis tersimpan dalam data berkas.',
                      ].map((txt, i) => (
                        <div key={i} className="flex items-start gap-2 rounded-lg bg-[#f1fcf4] p-2.5 text-xs text-[#003828]">
                          <CheckCircle2 className="size-4 shrink-0 text-[#137333] mt-0.5" />
                          <span>{txt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Kolom 2: Larangan Keras */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#b91c1c]">
                        LARANGAN KERAS (DISKUALIFIKASI USULAN)
                      </span>
                      {[
                        'Dilarang menggunakan foto unduhan internet / foto orang lain. Sistem AI akan mencocokkan kemiripan metadata.',
                        'Dilarang menggunakan filter estetika kecantikan atau manipulasi warna digital yang mengaburkan tekstur material.',
                        'Dilarang memotret rumah tetangga atau fasilitas umum. Petugas verifikator lapangan akan melakukan audit silang ke alamat.',
                      ].map((txt, i) => (
                        <div key={i} className="flex items-start gap-2 rounded-lg bg-[#fff5f5] p-2.5 text-xs text-[#b91c1c]">
                          <XCircle className="size-4 shrink-0 text-[#b91c1c] mt-0.5" />
                          <span>{txt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pernyataan Tanggung Jawab */}
                <div className="rounded-xl border border-[#b5efd8] bg-[#ebf6ef] p-3.5 text-xs text-[#003828] flex items-center gap-2.5">
                  <ShieldCheck className="size-4 shrink-0 text-[#176b50]" />
                  <span>
                    <strong>Pernyataan:</strong> Dengan melanjutkan, Bpk. Rahmat Hidayat menyatakan bahwa berkas dan dokumentasi saat ini adalah benar rumah yang ditinggali bersama anggota keluarga yang tercantum pada KK nomor <strong>3273011405080004</strong>.
                  </span>
                </div>

                {/* Footer Action Bar Step 3 */}
                <div className="flex flex-col gap-2 rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentStep(2);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="face-semibold flex items-center gap-1.5 rounded-lg border border-[#dce9df] bg-white px-4 py-2.5 text-xs text-[#003828] hover:bg-[#ebf6ef]"
                    >
                      <ArrowLeft className="size-3.5" /> Kembali ke Langkah 2
                    </button>
                    <button
                      type="button"
                      className="face-semibold flex items-center gap-1.5 rounded-lg border border-[#dce9df] bg-white px-4 py-2.5 text-xs text-[#003828] hover:bg-[#ebf6ef]"
                    >
                      <Save className="size-3.5" /> Simpan Draf
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(4);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="face-semibold flex items-center gap-1.5 rounded-lg bg-[#00513b] px-6 py-2.5 text-xs text-white shadow-xs hover:bg-[#003828]"
                  >
                    Lanjutkan ke Langkah 4: Review & Finalisasi <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </>
            )}

            {/* ========================================================================= */}
            {/* STEP 4: REVIEW RANGKUMAN & KONFIRMASI PENGAJUAN                            */}
            {/* ========================================================================= */}
            {currentStep === 4 && (
              <>
                {/* Konfirmasi Pra-Kirim Alert */}
                <div className="flex items-start gap-3 rounded-xl border border-[#b5efd8] bg-[#ebf6ef] p-4 text-xs text-[#003828]">
                  <CheckCircle2 className="size-5 shrink-0 text-[#176b50]" />
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-xs">Konfirmasi Pra-Kirim Usulan Kesejahteraan</strong>
                      <span className="rounded bg-[#176b50] px-1.5 py-0.2 text-[9px] font-bold text-white">
                        TERHUBUNG DUKCAPIL
                      </span>
                    </div>
                    <p className="mt-1 leading-relaxed text-[#57605d]">
                      Silakan periksa kembali seluruh data yang Anda masukkan sebelum menekan tombol Kirim Usulan. Pastikan nomor kontak aktif dan alamat sesuai untuk kelancaran jadwal kunjungan verifikasi faktual lapangan oleh Petugas Pendamping Sosial.
                    </p>
                  </div>
                </div>

                {/* 1. Identitas Pemohon & Alamat Domisili */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <User className="size-4 text-[#176b50]" />
                      <div>
                        <h2 className="face-bold text-sm text-[#003828]">
                          1. Identitas Pemohon & Alamat Domisili
                        </h2>
                        <p className="text-[10px] text-[#707974]">Sesuai data registrasi kependudukan dan titik faktual terkunci</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-1 rounded-lg border border-[#dce9df] px-2.5 py-1 text-xs font-semibold text-[#003828] hover:bg-[#ebf6ef]"
                    >
                      <Edit3 className="size-3" /> Ubah Data
                    </button>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#707974]">NAMA LENGKAP SESUAI e-KTP</span>
                      <strong className="mt-1 block text-sm text-[#003828]">{form.namaLengkap}</strong>
                      <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-[#137333] font-medium">
                        <CheckCircle2 className="size-2.5" /> NIK Sinkron Kemendagri
                      </span>
                    </div>

                    <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#707974]">NOMOR INDUK KEPENDUDUKAN (NIK)</span>
                      <strong className="mt-1 block font-mono text-sm text-[#003828]">{form.nik}</strong>
                      <span className="mt-1 text-[10px] text-[#707974]">Status Kepala Keluarga</span>
                    </div>

                    <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#707974]">NOMOR KARTU KELUARGA (KK)</span>
                      <strong className="mt-1 block font-mono text-sm text-[#003828]">{form.noKk}</strong>
                      <span className="mt-1 text-[10px] text-[#707974]">Tercatat Disdukcapil Kota Bandung</span>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#707974]">KONTAK TELEPON / WHATSAPP AKTIF</span>
                      <strong className="mt-1 block font-mono text-sm text-[#003828]">{form.noWa}</strong>
                      <span className="mt-1 text-[10px] text-[#707974]">Digunakan konfirmasi survei whatsapp</span>
                    </div>

                    <div className="sm:col-span-2 rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider text-[#707974]">ALAMAT DOMISILI TETAP</span>
                          <span className="inline-flex items-center gap-1 rounded bg-[#ebf6ef] px-1.5 py-0.2 text-[9px] font-semibold text-[#00513b]">
                            <MapPin className="size-2.5" /> Geotag Terkunci
                          </span>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-[#003828]">
                          {form.namaJalan}, Kelurahan {form.kelurahan}, Kecamatan {form.kecamatan}, {form.kota}, {form.provinsi} (40212)
                        </p>
                      </div>
                      <span className="mt-2 text-[10px] font-mono text-[#57605d]">
                        Titik GPS: <strong>{form.lat}, {form.lng}</strong> • Akurasi Presisi 3.7 meter
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Profil Kesejahteraan & Indikator BPS */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <Home className="size-4 text-[#176b50]" />
                      <div>
                        <h2 className="face-bold text-sm text-[#003828]">
                          2. Profil Kesejahteraan & Indikator BPS
                        </h2>
                        <p className="text-[10px] text-[#707974]">Parameter penilaian kriteria desil kemiskinan dan kelayakan bantuan sosial</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center gap-1 rounded-lg border border-[#dce9df] px-2.5 py-1 text-xs font-semibold text-[#003828] hover:bg-[#ebf6ef]"
                    >
                      <Edit3 className="size-3" /> Ubah Data
                    </button>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-4">
                    <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3">
                      <span className="text-[9px] uppercase tracking-wider text-[#707974]">TANGGUNGAN KELUARGA</span>
                      <strong className="mt-1 block text-xs text-[#003828]">4 Jiwa (1 KK)</strong>
                      <span className="text-[10px] text-[#707974]">2 Anak usia sekolah (SD & SMP)</span>
                    </div>

                    <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3">
                      <span className="text-[9px] uppercase tracking-wider text-[#707974]">PEKERJAAN UTAMA</span>
                      <strong className="mt-1 block text-xs text-[#003828]">{form.pekerjaanUtama}</strong>
                      <span className="text-[10px] text-[#707974]">Pabrik Tekstil Melibur, Sektor Informal</span>
                    </div>

                    <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3">
                      <span className="text-[9px] uppercase tracking-wider text-[#707974]">RATA-RATA PENDAPATAN</span>
                      <strong className="mt-1 block text-xs text-[#003828]">Rp 1.200.000 <span className="text-[10px] font-normal text-[#707974]">/ bln</span></strong>
                      <span className="text-[10px] text-[#b91c1c] font-medium">Di bawah garis kemiskinan kota</span>
                    </div>

                    <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3">
                      <span className="text-[9px] uppercase tracking-wider text-[#707974]">DAYA LISTRIK RUMAH</span>
                      <strong className="mt-1 block text-xs text-[#003828]">450 VA</strong>
                      <span className="rounded bg-[#ebf6ef] px-1 py-0.2 text-[9px] font-semibold text-[#00513b]">
                        Tarif Subsidi (R1)
                      </span>
                    </div>

                    <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3">
                      <span className="text-[9px] uppercase tracking-wider text-[#707974]">STATUS KEPEMILIKAN HUNIAN</span>
                      <strong className="mt-1 block text-xs text-[#003828]">Rumah Sewa Petakan</strong>
                      <span className="text-[10px] text-[#707974]">Sewa sewa bulanan, luas 24 m²</span>
                    </div>

                    <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3">
                      <span className="text-[9px] uppercase tracking-wider text-[#707974]">MATERIAL LANTAI / TERLUAS</span>
                      <strong className="mt-1 block text-xs text-[#003828]">Semen Plester Kasar</strong>
                      <span className="text-[10px] text-[#707974]">Kondisi retak sebagian & lembab</span>
                    </div>

                    <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3">
                      <span className="text-[9px] uppercase tracking-wider text-[#707974]">FASILITAS SANITASI / WC</span>
                      <strong className="mt-1 block text-xs text-[#003828]">Jamban Bersama (Komunal)</strong>
                      <span className="text-[10px] text-[#707974]">Berjarak 20 meter dari hunian</span>
                    </div>

                    <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3">
                      <span className="text-[9px] uppercase tracking-wider text-[#707974]">SUMBER AIR MINUM</span>
                      <strong className="mt-1 block text-xs text-[#003828]">Sumur Bor Tak Terlindung</strong>
                      <span className="text-[10px] text-[#707974]">& air eceran curah galon</span>
                    </div>
                  </div>
                </div>

                {/* 3. Berkas Pendukung & 3 Sudut Foto Rumah */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-[#176b50]" />
                      <div>
                        <h2 className="face-bold text-sm text-[#003828]">
                          3. Berkas Pendukung & 3 Sudut Foto Rumah
                        </h2>
                        <p className="text-[10px] text-[#707974]">Dokumen kelengkapan administrasi dan dokumentasi visual hunian pemohon</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="flex items-center gap-1 rounded-lg border border-[#dce9df] px-2.5 py-1 text-xs font-semibold text-[#003828] hover:bg-[#ebf6ef]"
                    >
                      <Edit3 className="size-3" /> Ubah Foto & Dokumen
                    </button>
                  </div>

                  {/* 4 Berkas Digital Terlampir */}
                  <div className="mt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#707974]">
                      4 BERKAS DIGITAL TERLAMPIR (SIAP AUDIT)
                    </span>
                    <div className="mt-2 grid gap-2.5 sm:grid-cols-4">
                      {[
                        { name: 'Scan_eKTP_Rahmat.pdf', sub: '842 KB • Terverifikasi Dukcapil' },
                        { name: 'Kartu_Keluarga_3273.pdf', sub: '1.2 MB • Barcode Sah' },
                        { name: 'Struk_PLN_450VA.jpg', sub: '640 KB • Bukti Terakhir' },
                        { name: 'Form_Faktual_Mandiri.pdf', sub: '1.8 MB • Tanda Tangan Digital' },
                      ].map((doc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-2.5"
                        >
                          <FileText className="size-4 shrink-0 text-[#176b50]" />
                          <div className="min-w-0 flex-1">
                            <strong className="block truncate text-[11px] text-[#003828]">{doc.name}</strong>
                            <span className="block truncate text-[9px] text-[#707974]">{doc.sub}</span>
                          </div>
                          <CheckCircle2 className="size-3.5 shrink-0 text-[#137333]" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3 Sudut Dokumentasi Hunian Faktual */}
                  <div className="mt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#707974]">
                      3 SUDUT DOKUMENTASI HUNIAN FAKTUAL
                    </span>
                    <div className="mt-2 grid gap-3 sm:grid-cols-3">
                      <div className="overflow-hidden rounded-lg border border-[#dce9df] bg-[#f8fdfa]">
                        <div className="relative aspect-video w-full bg-gray-200">
                          <img src="/assets/182b1.png" alt="Fasad" className="h-full w-full object-cover" />
                          <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.2 text-[8px] text-white">Geotagged</span>
                        </div>
                        <div className="p-2.5">
                          <strong className="block text-xs text-[#003828]">Fasad Depan Rumah & Akses Gang</strong>
                          <span className="text-[10px] text-[#707974]">Terlihat dinding bata belum diplester utuh & kusen kayu tua.</span>
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-lg border border-[#dce9df] bg-[#f8fdfa]">
                        <div className="relative aspect-video w-full bg-gray-200">
                          <img src="/assets/7399a.png" alt="Ruang Tamu" className="h-full w-full object-cover" />
                          <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.2 text-[8px] text-white">Geotagged</span>
                        </div>
                        <div className="p-2.5">
                          <strong className="block text-xs text-[#003828]">Kondisi Lantai & Ruang Keluarga</strong>
                          <span className="text-[10px] text-[#707974]">Lantai semen plester kasar tanpa keramik atau karpet.</span>
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-lg border border-[#dce9df] bg-[#f8fdfa]">
                        <div className="relative aspect-video w-full bg-gray-200">
                          <img src="/assets/b7571.png" alt="Dapur" className="h-full w-full object-cover" />
                          <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.2 text-[8px] text-white">Geotagged</span>
                        </div>
                        <div className="p-2.5">
                          <strong className="block text-xs text-[#003828]">Area Dapur & Akses Sanitasi</strong>
                          <span className="text-[10px] text-[#707974]">Dapur sempit beralaskan seng dan penampungan ember air.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pernyataan Tanggung Jawab Mutlak (SPTJM) */}
                <div className="rounded-xl border border-red-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="size-4 text-red-500" />
                    <h3 className="face-bold text-xs uppercase tracking-wider text-red-800">
                      Pernyataan Tanggung Jawab Mutlak (SPTJM)
                    </h3>
                  </div>
                  <p className="mt-0.5 text-[10px] text-[#707974]">Komitmen kejujuran dan kesepakatan hukum pemohon bansos</p>

                  <div className="mt-3 rounded-lg bg-[#fff5f5] p-3.5 border border-red-100">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.sptjmCheck}
                        onChange={(e) => set('sptjmCheck')(e.target.checked)}
                        className="mt-0.5 size-4 accent-[#00513b]"
                      />
                      <span className="text-xs leading-relaxed text-[#3f4944]">
                        Saya menyatakan dengan <strong>sungguh-sungguh dan di bawah sumpah</strong> bahwa seluruh data kependudukan, kondisi sosial ekonomi, dan dokumentasi foto fisik hunian yang saya lampirkan adalah <strong>benar apa adanya dan tidak dimanipulasi</strong>. Saya bersedia menerima sanksi pencabutan hak kepesertaan serta tuntutan konsekuensi hukum sesuai perundang-undangan yang berlaku apabila di kemudian hari ditemukan unsur kesengajaan pemalsuan keterangan.
                      </span>
                    </label>
                  </div>

                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#ebf6ef] p-2.5 text-[11px] text-[#003828]">
                    <ShieldCheck className="size-4 shrink-0 text-[#176b50]" />
                    <span>
                      <strong>100% BEBAS BIAYA & PUNGUTAN LIAR:</strong> Seluruh proses pendaftaran dan verifikasi lapangan bebas biaya apapun. Apabila ada oknum yang meminta imbalan uang, segera laporkan ke kanal Pengaduan Warga Bebas Pungli Kemensos.
                    </span>
                  </div>
                </div>

                {/* Footer Action Bar Step 4 */}
                <div className="flex flex-col gap-2 rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(3);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="face-semibold flex items-center gap-1.5 rounded-lg border border-[#dce9df] bg-white px-4 py-2.5 text-xs text-[#003828] hover:bg-[#ebf6ef]"
                  >
                    <ArrowLeft className="size-3.5" /> Kembali ke Langkah 3
                  </button>
                  <button
                    type="button"
                    disabled={!form.sptjmCheck}
                    onClick={handleSubmit}
                    className="face-semibold flex items-center gap-2 rounded-lg bg-[#00513b] px-7 py-3 text-xs text-white shadow-xs hover:bg-[#003828] disabled:opacity-50 transition"
                  >
                    <Send className="size-3.5" /> Kirim Usulan Kelayakan Mandiri
                  </button>
                </div>
              </>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
