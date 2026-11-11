import React from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Check,
  CheckCircle2,
  FileText,
  Home,
  User,
  Users,
  Briefcase,
  DollarSign,
  Zap,
  Droplets,
  GraduationCap,
  Download,
  Eye,
  AlertCircle,
  ShieldCheck,
  Building2,
  ChevronRight,
  Maximize2,
  Navigation,
} from 'lucide-react';

export default function DetailPengajuan({ onNavigate, onOpenDialog }) {
  const steps = [
    {
      num: 1,
      title: '1. Diajukan',
      date: '24 Okt 2025 • 14:32',
      note: 'Tercatat di Portal',
      status: 'done',
      badge: 'TUNTAS',
    },
    {
      num: 2,
      title: '2. Periksa Berkas',
      date: '25 Okt 2025 • 09:15',
      note: 'Padan Dukcapil 100%',
      status: 'done',
      badge: 'VALID',
    },
    {
      num: 3,
      title: '3. Verifikasi Lapangan',
      date: 'Est. 28 Okt 2025',
      note: 'Survei Pendamping',
      status: 'active',
      badge: 'BERJALAN',
    },
    {
      num: 4,
      title: '4. Uji Sanggah / Revisi',
      date: 'Tidak Diperlukan',
      note: 'Berkas Lengkap',
      status: 'pending',
      badge: 'NIHIL',
    },
    {
      num: 5,
      title: '5. Musdes / Muskel',
      date: 'Sidang Kelurahan',
      note: 'Pleno Bulanan',
      status: 'pending',
      badge: 'MENUNGGU',
    },
    {
      num: 6,
      title: '6. SK Walikota',
      date: 'Penerbitan SK',
      note: 'Dinsos Kota Bandung',
      status: 'pending',
      badge: 'AGENDA',
    },
    {
      num: 7,
      title: '7. Terdaftar DTKS',
      date: 'Penyaluran Bansos',
      note: 'Kemensos RI',
      status: 'pending',
      badge: 'AKHIR',
    },
  ];

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
          <button
            onClick={() => onNavigate && onNavigate('pengajuan-saya')}
            className="hover:text-[#003828] hover:underline"
          >
            Pengajuan Saya
          </button>
          <span>/</span>
          <span className="face-semibold text-[#003828]">Detail Usulan TB-2025-BDG-0892</span>
        </nav>

        {/* Header Title Section */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="face-bold rounded bg-[#b5efd8] px-2.5 py-1 text-[11px] tracking-wide text-[#00513b]">
              USULAN MANDIRI BANSOS DTKS
            </span>
            <span className="face-bold flex items-center gap-1 rounded bg-[#b5efd8] px-2.5 py-1 text-[11px] tracking-wide text-[#00513b]">
              <ShieldCheck className="size-3.5 text-[#176b50]" />
              NIK Terpadu SIAK
            </span>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-3">
            <h1 className="face-bold text-2xl text-[#003828] sm:text-3xl">
              Detail Usulan Kelayakan Mandiri
            </h1>
            <span className="face-bold font-mono rounded-md border border-[#326856]/30 bg-[#ebf6ef] px-2.5 py-1 text-xs text-[#003828]">
              📋 TB-2025-BDG-0892
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#57605d]">
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5 text-[#707974]" />
              Diajukan: 24 Oktober 2025 • 14:32 WIB
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5 text-[#707974]" />
              Kel. Cibuntu, Kec. Bandung Kulon, Kota Bandung
            </span>
          </div>
        </div>

        {/* Schedule & Current Status Banner Card */}
        <div className="mt-6 rounded-xl border border-black/[0.04] bg-white p-5 shadow-xs sm:p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#00513b] text-white shadow-xs">
                <Home className="size-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="face-bold rounded bg-[#b5efd8] px-2 py-0.5 text-[10px] text-[#00513b] uppercase tracking-wider">
                    JADWAL LAPANGAN DIKONFIRMASI
                  </span>
                  <span className="text-xs text-[#707974]">• Visitasi Rumah Warga</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#141e19]">
                  Petugas pendamping sosial{' '}
                  <strong className="text-[#003828] underline">Dedi Kurniawan, S.Sos</strong>{' '}
                  dijadwalkan melakukan visitasi faktual pada{' '}
                  <strong className="text-[#003828]">Senin, 28 Oktober 2025 pukul 10:00 – 12:00 WIB</strong>.
                </p>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-[#57605d]">
                  <Clock className="size-3 text-[#176b50]" />
                  Mohon siapkan dokumen fisik KTP-el asli, Kartu Keluarga, dan bukti pembayaran listrik terkini saat petugas tiba.
                </p>
              </div>
            </div>

            {/* Right Status Pill */}
            <div className="flex flex-col items-start lg:items-end rounded-lg bg-[#f8fdfa] p-4 border border-[#e4f7ed] shrink-0">
              <span className="text-[10px] font-bold tracking-wider text-[#707974] uppercase">
                STATUS SAAT INI
              </span>
              <div className="mt-1 flex items-center gap-1.5 rounded-full bg-[#e6f4ea] px-3 py-1 text-xs font-bold text-[#137333]">
                <span className="size-2 rounded-full bg-[#188038] animate-pulse" />
                Verifikasi Lapangan
              </div>
              <span className="mt-1 text-[11px] text-[#707974]">Tahap 3 dari 7</span>
            </div>
          </div>
        </div>

        {/* 7 Steps Horizontal Timeline Bar */}
        <div className="mt-6 rounded-xl border border-black/[0.04] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
            <span className="face-bold flex items-center gap-1.5 text-xs text-[#176b50]">
              <FileText className="size-4" />
              Alur Penilaian Kelayakan & Verifikasi Terpadu
            </span>
            <span className="text-xs text-[#707974]">Standard Permensos No. 3 Tahun 2021</span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {steps.map((st) => (
              <div
                key={st.num}
                className={`rounded-lg p-3 border transition ${
                  st.status === 'active'
                    ? 'bg-[#00513b] text-white border-[#00513b] shadow-sm'
                    : st.status === 'done'
                    ? 'bg-[#e6f4ea] text-[#137333] border-[#ceead6]'
                    : 'bg-[#f8fdfa] text-[#57605d] border-[#ebf6ef]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex size-5 items-center justify-center rounded-full text-[10px] font-bold ${
                      st.status === 'active'
                        ? 'bg-white text-[#00513b]'
                        : st.status === 'done'
                        ? 'bg-[#188038] text-white'
                        : 'bg-[#dae5de] text-[#57605d]'
                    }`}
                  >
                    {st.status === 'done' ? <Check className="size-3 stroke-[3]" /> : st.num}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      st.status === 'active'
                        ? 'bg-[#176b50] text-white'
                        : st.status === 'done'
                        ? 'bg-[#ceead6] text-[#137333]'
                        : 'bg-[#ebf6ef] text-[#707974]'
                    }`}
                  >
                    {st.badge}
                  </span>
                </div>
                <strong
                  className={`block text-[11px] font-bold mt-2 leading-tight ${
                    st.status === 'active' ? 'text-white' : 'text-[#003828]'
                  }`}
                >
                  {st.title}
                </strong>
                <p
                  className={`text-[10px] mt-1 leading-[14px] ${
                    st.status === 'active' ? 'text-white/80' : 'text-[#57605d]'
                  }`}
                >
                  {st.date}
                </p>
                <p
                  className={`text-[9px] mt-0.5 ${
                    st.status === 'active' ? 'text-[#b5efd8]' : 'text-[#707974]'
                  }`}
                >
                  {st.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content 2-Column Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left Column (7 cols): Data Pemohon, 14 Indikator, Dokumen Digital */}
          <div className="space-y-6 lg:col-span-7">
            {/* Box 1: Identitas Pemohon & Kepala Keluarga */}
            <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                <div className="flex items-center gap-2">
                  <User className="size-4 text-[#176b50]" />
                  <h2 className="face-bold text-xs text-[#003828] uppercase tracking-wider">
                    Identitas Pemohon & Kepala Keluarga
                  </h2>
                </div>
                <span className="face-semibold rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] text-[#00513b]">
                  Keluarga Tunggal
                </span>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs">
                <div>
                  <span className="text-[11px] text-[#707974] uppercase block">
                    NAMA LENGKAP SESUAI KTP
                  </span>
                  <strong className="face-bold mt-0.5 block text-sm text-[#141e19]">
                    Bpk. Rahmat Hidayat
                  </strong>
                  <span className="text-[11px] text-[#57605d]">Kepala Rumah Tangga</span>
                </div>

                <div>
                  <span className="text-[11px] text-[#707974] uppercase block">
                    NOMOR INDUK KEPENDUDUKAN (NIK)
                  </span>
                  <strong className="font-mono mt-0.5 block text-sm font-bold text-[#003828]">
                    3273 0128 0992 0001
                  </strong>
                  <span className="flex items-center gap-1 text-[11px] text-[#137333]">
                    <CheckCircle2 className="size-3" />
                    Terverifikasi Dukcapil
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-[#707974] uppercase block">
                    NOMOR KARTU KELUARGA (KK)
                  </span>
                  <strong className="font-mono mt-0.5 block text-sm font-bold text-[#141e19]">
                    3273 0114 0508 0004
                  </strong>
                  <span className="text-[11px] text-[#57605d]">
                    Kepala Keluarga: Rahmat Hidayat
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-[#707974] uppercase block">
                    KONTAK TERDAFTAR (WHATSAPP)
                  </span>
                  <strong className="font-mono mt-0.5 block text-sm font-bold text-[#141e19]">
                    0812-2025-9981
                  </strong>
                  <span className="text-[11px] text-[#57605d]">Notifikasi SMS/WA Aktif</span>
                </div>
              </div>

              {/* Alamat */}
              <div className="mt-4 border-t border-[#ebf6ef] pt-3 text-xs">
                <span className="text-[11px] text-[#707974] uppercase block">
                  ALAMAT DOMISILI SESUAI USULAN
                </span>
                <p className="mt-1 text-[#141e19] leading-relaxed">
                  Jl. Bojong Raya Gg. Pelita No. 14, RT 04 / RW 07, Kelurahan Cibuntu, Kecamatan
                  Bandung Kulon, Kota Bandung, Jawa Barat 40212.
                </p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-[#707974]">
                  <span className="flex items-center gap-1 font-mono">
                    <Navigation className="size-3 text-[#176b50]" />
                    -6.9248° S, 107.5923° E
                  </span>
                  <span>•</span>
                  <span className="text-[#137333] font-semibold">
                    Akurasi GPS Lapangan: 3.2 meter
                  </span>
                </div>
              </div>
            </div>

            {/* Box 2: Rangkuman 14 Indikator Sosial Ekonomi (BPS) */}
            <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-[#176b50]" />
                  <div>
                    <h2 className="face-bold text-xs text-[#003828] uppercase tracking-wider">
                      Rangkuman 14 Indikator Sosial Ekonomi (BPS)
                    </h2>
                    <p className="text-[10px] text-[#707974]">
                      Parameter penilaian mandiri yang diverifikasi petugas
                    </p>
                  </div>
                </div>
                <span className="face-bold rounded bg-[#b5efd8] px-2.5 py-1 text-[11px] text-[#00513b]">
                  Desil 1 (Sangat Rentan)
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
                {/* Indikator 1 */}
                <div className="flex items-start gap-3 rounded-lg bg-[#ebf6ef]/50 p-3 border border-[#dce9df]">
                  <Users className="size-4 text-[#176b50] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#707974] uppercase">
                      TANGGUNGAN KELUARGA
                    </span>
                    <strong className="block text-xs text-[#003828] mt-0.5">
                      4 Jiwa (1 Istri, 2 Anak Sekolah)
                    </strong>
                    <span className="text-[10px] text-[#57605d]">
                      Anak 1 (SD), Anak 2 (SMP Aktif)
                    </span>
                  </div>
                </div>

                {/* Indikator 2 */}
                <div className="flex items-start gap-3 rounded-lg bg-[#ebf6ef]/50 p-3 border border-[#dce9df]">
                  <Briefcase className="size-4 text-[#176b50] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#707974] uppercase">
                      PEKERJAAN UTAMA
                    </span>
                    <strong className="block text-xs text-[#003828] mt-0.5">
                      Buruh Harian Lepas
                    </strong>
                    <span className="text-[10px] text-[#57605d]">
                      Sektor serabutan tanpa upah berkala
                    </span>
                  </div>
                </div>

                {/* Indikator 3 */}
                <div className="flex items-start gap-3 rounded-lg bg-[#ebf6ef]/50 p-3 border border-[#dce9df]">
                  <DollarSign className="size-4 text-[#176b50] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#707974] uppercase">
                      ESTIMASI PENDAPATAN TOTAL
                    </span>
                    <strong className="block text-xs text-[#003828] mt-0.5">
                      Rp 1.200.000 / bulan
                    </strong>
                    <span className="text-[10px] text-red-600 font-semibold">
                      &lt; Garis Kemiskinan Kota BDG
                    </span>
                  </div>
                </div>

                {/* Indikator 4 */}
                <div className="flex items-start gap-3 rounded-lg bg-[#ebf6ef]/50 p-3 border border-[#dce9df]">
                  <Home className="size-4 text-[#176b50] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#707974] uppercase">
                      STATUS & LUAS BANGUNAN
                    </span>
                    <strong className="block text-xs text-[#003828] mt-0.5">
                      Sewa Petakan • 24 m²
                    </strong>
                    <span className="text-[10px] text-[#57605d]">
                      Luas lantai per kapita &lt; 8 m²
                    </span>
                  </div>
                </div>

                {/* Indikator 5 */}
                <div className="flex items-start gap-3 rounded-lg bg-[#ebf6ef]/50 p-3 border border-[#dce9df]">
                  <Building2 className="size-4 text-[#176b50] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#707974] uppercase">
                      KONDISI FISIK BANGUNAN
                    </span>
                    <strong className="block text-xs text-[#003828] mt-0.5">
                      Semen Plester Kasar (Retak)
                    </strong>
                    <span className="text-[10px] text-[#57605d]">
                      Dinding bata tanpa plamir utuh
                    </span>
                  </div>
                </div>

                {/* Indikator 6 */}
                <div className="flex items-start gap-3 rounded-lg bg-[#ebf6ef]/50 p-3 border border-[#dce9df]">
                  <Zap className="size-4 text-[#176b50] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#707974] uppercase">
                      DAYA LISTRIK PENERANGAN
                    </span>
                    <strong className="block text-xs text-[#003828] mt-0.5">
                      450 VA Bersubsidi (Pasca)
                    </strong>
                    <span className="text-[10px] text-[#137333]">
                      Tercatat ID Pelanggan PLN Subsidi
                    </span>
                  </div>
                </div>

                {/* Indikator 7 */}
                <div className="flex items-start gap-3 rounded-lg bg-[#ebf6ef]/50 p-3 border border-[#dce9df]">
                  <Droplets className="size-4 text-[#176b50] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#707974] uppercase">
                      SANITASI & AIR MINUM
                    </span>
                    <strong className="block text-xs text-[#003828] mt-0.5">
                      Jamban Bersama RT / Sumur Timba
                    </strong>
                    <span className="text-[10px] text-[#57605d]">Tidak memiliki MCK pribadi</span>
                  </div>
                </div>

                {/* Indikator 8 */}
                <div className="flex items-start gap-3 rounded-lg bg-[#ebf6ef]/50 p-3 border border-[#dce9df]">
                  <GraduationCap className="size-4 text-[#176b50] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#707974] uppercase">
                      KELAYAKAN BANTUAN PENDIDIKAN
                    </span>
                    <strong className="block text-xs text-[#003828] mt-0.5">
                      Rekomendasi PIP / PKH Siswa
                    </strong>
                    <span className="text-[10px] text-[#57605d]">SDN Cibuntu 02 & SMPN 40</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3: Dokumen Digital Unggahan Pemohon */}
            <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-[#176b50]" />
                  <h2 className="face-bold text-xs text-[#003828] uppercase tracking-wider">
                    Dokumen Digital Unggahan Pemohon
                  </h2>
                </div>
                <span className="face-semibold rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] text-[#00513b]">
                  4 Berkas Terverifikasi
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
                {/* Doc 1 */}
                <div className="flex items-center justify-between rounded-lg bg-[#ebf6ef]/50 p-3 border border-[#dce9df]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded bg-[#00513b] text-white">
                      <FileText className="size-4" />
                    </div>
                    <div>
                      <strong className="block text-xs text-[#003828]">KTP Elektronik Asli</strong>
                      <span className="text-[10px] text-[#707974]">Tervalidasi SIAK • PDF</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Membuka pratinjau KTP Elektronik...')}
                    className="text-[#176b50] hover:text-[#003828]"
                  >
                    <Eye className="size-4" />
                  </button>
                </div>

                {/* Doc 2 */}
                <div className="flex items-center justify-between rounded-lg bg-[#ebf6ef]/50 p-3 border border-[#dce9df]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded bg-[#00513b] text-white">
                      <FileText className="size-4" />
                    </div>
                    <div>
                      <strong className="block text-xs text-[#003828]">Kartu Keluarga (Barcode)</strong>
                      <span className="text-[10px] text-[#707974]">Tervalidasi Dukcapil • PDF</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Membuka pratinjau Kartu Keluarga...')}
                    className="text-[#176b50] hover:text-[#003828]"
                  >
                    <Eye className="size-4" />
                  </button>
                </div>

                {/* Doc 3 */}
                <div className="flex items-center justify-between rounded-lg bg-[#ebf6ef]/50 p-3 border border-[#dce9df]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded bg-[#b5efd8] text-[#00513b]">
                      <FileText className="size-4" />
                    </div>
                    <div>
                      <strong className="block text-xs text-[#003828]">Bukti Listrik 450VA</strong>
                      <span className="text-[10px] text-[#707974]">Struk PLN Okt 2025 • JPG</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Membuka pratinjau Struk Listrik...')}
                    className="text-[#176b50] hover:text-[#003828]"
                  >
                    <Eye className="size-4" />
                  </button>
                </div>

                {/* Doc 4 */}
                <div className="flex items-center justify-between rounded-lg bg-[#ebf6ef]/50 p-3 border border-[#dce9df]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded bg-[#b5efd8] text-[#00513b]">
                      <FileText className="size-4" />
                    </div>
                    <div>
                      <strong className="block text-xs text-[#003828]">SPTJM Mutlak</strong>
                      <span className="text-[10px] text-[#707974]">e-Materai 10.000 • PDF</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Membuka pratinjau SPTJM Mutlak...')}
                    className="text-[#176b50] hover:text-[#003828]"
                  >
                    <Eye className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Foto Rumah, Geotagging Map, Catatan Petugas */}
          <div className="space-y-6 lg:col-span-5">
            {/* Box 1: Dokumentasi Kondisi Rumah */}
            <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                <div className="flex items-center gap-2">
                  <Home className="size-4 text-[#176b50]" />
                  <h2 className="face-bold text-xs text-[#003828] uppercase tracking-wider">
                    Dokumentasi Kondisi Rumah
                  </h2>
                </div>
                <span className="face-semibold rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] text-[#00513b]">
                  3 Foto Valid
                </span>
              </div>

              {/* Main Photo: Tampak Depan */}
              <div className="mt-4 overflow-hidden rounded-lg border border-[#ebf6ef] bg-gray-100">
                <div className="relative h-44 w-full">
                  <img
                    src="/assets/182b1.png"
                    alt="Tampak Depan Bangunan"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 flex items-center justify-between text-white text-[11px]">
                    <span className="flex items-center gap-1 font-semibold">
                      📷 Tampak Depan Bangunan
                    </span>
                    <span className="rounded bg-[#176b50] px-1.5 py-0.5 text-[10px] font-bold">
                      Geotagged ✓
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-[#707974]">
                <span>Dinding bata tanpa plester cat luar</span>
                <button
                  onClick={() => alert('Membuka tampilan penuh foto...')}
                  className="text-[#176b50] hover:underline font-semibold"
                >
                  Perbesar ↗
                </button>
              </div>

              {/* 2 Sub Photos */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-[#57605d]">
                <div>
                  <div className="relative h-24 overflow-hidden rounded-lg bg-gray-100 border border-[#ebf6ef]">
                    <img
                      src="/assets/7399a.png"
                      alt="Ruang Tamu & Lantai"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 text-[9px] text-white">
                      Ruang Tamu & Lantai
                    </span>
                  </div>
                  <span className="mt-1 block text-[#707974]">Lantai semen plesteran</span>
                </div>

                <div>
                  <div className="relative h-24 overflow-hidden rounded-lg bg-gray-100 border border-[#ebf6ef]">
                    <img
                      src="/assets/b7571.png"
                      alt="Dapur & Sanitasi"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 text-[9px] text-white">
                      Dapur & Sanitasi
                    </span>
                  </div>
                  <span className="mt-1 block text-[#707974]">Fasilitas masak petakan</span>
                </div>
              </div>
            </div>

            {/* Box 2: Titik Lokasi Geotagging Warga */}
            <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#176b50]" />
                  <h2 className="face-bold text-xs text-[#003828] uppercase tracking-wider">
                    Titik Lokasi Geotagging Warga
                  </h2>
                </div>
                <button
                  onClick={() => alert('Membuka Google Maps koordinat -6.9248, 107.5923...')}
                  className="face-semibold text-[11px] text-[#176b50] hover:underline"
                >
                  Buka Peta ↗
                </button>
              </div>

              {/* Map Preview Graphic */}
              <div className="relative mt-4 h-40 overflow-hidden rounded-lg border border-[#ebf6ef] bg-[#e5e3df]">
                {/* Simulated Map Visual */}
                <div className="absolute inset-0 bg-[#e8ece9] opacity-80" />
                <svg
                  className="absolute inset-0 h-full w-full opacity-30 stroke-[#326856]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="0" y1="40" x2="400" y2="40" strokeWidth="3" />
                  <line x1="0" y1="100" x2="400" y2="100" strokeWidth="2" />
                  <line x1="120" y1="0" x2="120" y2="200" strokeWidth="3" />
                  <line x1="260" y1="0" x2="260" y2="200" strokeWidth="2" />
                </svg>

                {/* Pin Point */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex flex-col items-center">
                    <div className="size-4 rounded-full bg-[#176b50] border-2 border-white shadow-md animate-ping absolute" />
                    <div className="size-4 rounded-full bg-[#00513b] border-2 border-white shadow-md relative z-10" />
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute inset-x-2 bottom-2 rounded bg-black/70 p-2 text-white text-[10px] backdrop-blur-xs">
                  <div className="flex items-center gap-1 font-bold">
                    <MapPin className="size-3 text-[#b5efd8]" />
                    Kelurahan Cibuntu, RT 04 / RW 07
                  </div>
                  <p className="text-[9px] text-[#e8f3ec] mt-0.5">
                    Kecamatan Bandung Kulon • Radius Akurasi 3.2m
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3: Riwayat & Catatan Petugas */}
            <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-[#176b50]" />
                  <h2 className="face-bold text-xs text-[#003828] uppercase tracking-wider">
                    Riwayat & Catatan Petugas
                  </h2>
                </div>
                <span className="face-semibold rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] text-[#00513b]">
                  Log Terkini
                </span>
              </div>

              <div className="mt-4 space-y-4 text-xs">
                {/* Note 1 */}
                <div className="relative pl-5 border-l-2 border-[#176b50]">
                  <span className="absolute -left-[5px] top-1 size-2 rounded-full bg-[#176b50]" />
                  <div className="flex items-center justify-between">
                    <strong className="text-xs text-[#003828]">Verifikator Kelurahan Cibuntu</strong>
                    <span className="text-[10px] text-[#707974]">25 Okt • 09:15 WIB</span>
                  </div>
                  <div className="mt-2 rounded-lg bg-[#f8fdfa] p-3 text-[11px] leading-[17px] text-[#57605d] border border-[#e4f7ed]">
                    "Pemeriksaan berkas administrasi kependudukan valid dan padan SIAK Dukcapil. Status desil awal memenuhi kriteria prasejahtera. Diteruskan untuk penjadwalan visitasi lapangan oleh pendamping sosial."
                  </div>
                  <p className="mt-1.5 text-[10px] text-[#707974] flex items-center gap-1">
                    <span>👤 Oleh:</span>
                    <strong className="text-[#003828]">Agus Setiawan</strong>
                    <span>(NIP. 19840212 201101 1 003)</span>
                  </p>
                </div>

                {/* Note 2 */}
                <div className="relative pl-5 border-l-2 border-[#dce9df]">
                  <span className="absolute -left-[5px] top-1 size-2 rounded-full bg-[#707974]" />
                  <div className="flex items-center justify-between">
                    <strong className="text-xs text-[#003828]">Sistem Mandiri Warga</strong>
                    <span className="text-[10px] text-[#707974]">24 Okt • 14:32 WIB</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-[16px] text-[#57605d]">
                    Pengusulan mandiri Bansos DTKS berhasil diunggah oleh Bpk. Rahmat Hidayat menggunakan otentikasi NIK terverifikasi. Seluruh berkas digital tersimpan di repositori Kemensos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

