import React, { useState } from 'react';
import {
  FileText,
  AlertTriangle,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Lock,
  Eye,
  Upload,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Phone,
  Send,
  MapPin,
  Camera,
  AlertCircle,
  HelpCircle,
  Trash2,
  Save,
  Check,
  Building,
  UserCheck,
} from 'lucide-react';

export default function PengaduanSaya({ onNavigate, currentUser }) {
  // Mode: 'list' (Layanan Pengaduan & Sanggah) atau 'create' (Formulir Pengaduan & Sanggah)
  const [viewMode, setViewMode] = useState('list');
  const [selectedTicketId, setSelectedTicketId] = useState('PGD-2025-0142');

  // List Pengaduan Data
  const complaints = [
    {
      id: 'PGD-2025-0142',
      title: 'Ketidaktepatan Sasaran / Warga Mampu Menerima',
      status: 'DALAM INVESTIGASI LAPANGAN',
      statusColor: 'text-[#d97706] border-[#f59e0b] bg-[#fffbeb]',
      program: 'BPNT Beras 2026',
      lokasi: 'Coblong, Kota Bandung',
      waktu: '18 Maret 2026 • 14:20 WIB',
      ringkasan: 'Terlapor atas nama Bpk. H. Sutisna (Ketua RW 07) memiliki aset toko sembako grosir dan mobil pribadi tapi terdaftar sebagai penerima bantuan...',
      lampiran: '2 Foto Lapangan Terlampir',
      petugas: 'Rina Kartika, S.STP',
      terpilih: true,
    },
    {
      id: 'PGD-2024-0988',
      title: 'Keterlambatan Penyaluran KKS Pos',
      status: 'SELESAI — DIVERIFIKASI',
      statusColor: 'text-[#16a34a] border-[#22c55e] bg-[#f0fdf4]',
      program: 'PKH Komponen Balita',
      selesaiPada: '19 Des 2024',
      ringkasan: 'Dana terblokir/positif diblokir disalurkan via kantor pos cadangan Coblong dan konfirmasi diterima.',
      dilaporkan: '12 Des 2024',
      terpilih: false,
    },
  ];

  // Form State untuk 'create'
  const [form, setForm] = useState({
    kategori: 'salah_sasaran', // salah_sasaran, pungli, belum_diterima, ketidaksesuaian_nik, kendala_loket
    program: 'Bantuan Pangan Non-Tunai (BPNT / Sembako Mandiri)',
    namaTerlapor: 'H. Sutisna (Ketua RW 07)',
    nikTerlapor: '3201xxxxxxxxxxxx',
    alamatKejadian: 'Jl. Bukit Dago Utara No. 24, RT 03 / RW 07',
    wilayahKec: 'Kel. Dago, Kec. Coblong',
    tanggalPeristiwa: '05/12/2025',
    waktuKejadian: 'Pagi hari, sekitar pukul 09:30 WIB',
    deskripsi:
      'Ybs atas nama Bpk. H. Sutisna tercatat sebagai penerima bantuan BPNT kuota sembako mandiri di wilayah RW 07. Namun kenyataan di lapangan ybs memiliki usaha grosir sembako mandiri serta memiliki kendaraan roda 4 (Honda CR-V tahun 2020) dan rumah bertingkat. Sementara warga lain di RT 03 yang janda lansia sakit menahun justru dicoret dari daftar DTKS.',
    anonim: 'terbatas', // 'anonim' atau 'terbatas'
    waPelapor: '0812-2568-****',
    setujuPernyataan: true,
  });

  const [tanggapanText, setTanggapanText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleKirimLaporan = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setViewMode('list');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f1fcf4] text-[#3f4944] pt-20 pb-20">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        
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
            onClick={() => setViewMode('list')}
            className={`hover:text-[#003828] ${viewMode === 'list' ? 'font-semibold text-[#003828]' : 'hover:underline'}`}
          >
            Pengaduan Saya
          </button>
          {viewMode === 'create' && (
            <>
              <span>/</span>
              <span className="font-semibold text-[#003828]">Buat Pengaduan Baru</span>
            </>
          )}
        </nav>

        {/* ========================================================================= */}
        {/* TAMPILAN 1: LIST RIWAYAT & DETAIL KASUS PENGADUAN                          */}
        {/* ========================================================================= */}
        {viewMode === 'list' && (
          <div className="mt-3 space-y-4">
            
            {/* Header List */}
            <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="face-bold text-xl text-[#003828] sm:text-2xl">
                    Layanan Pengaduan & Sanggah Penyaluran Bansos
                  </h1>
                  <p className="face-regular mt-1 text-xs leading-relaxed text-[#57605d] max-w-2xl">
                    Kawal akurasi penyaluran bantuan sosial. Laporkan kendala penyaluran, indikasi pemotongan atau ketidaktepatan sasaran secara terlindungi, anonim, dan transparan.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (!currentUser) {
                      onNavigate && onNavigate('login', 'pengaduan-saya');
                    } else {
                      setViewMode('create');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="face-semibold flex shrink-0 items-center gap-1.5 rounded-lg bg-[#00513b] px-4 py-2.5 text-xs text-white shadow-xs hover:bg-[#003828] transition"
                >
                  <span>+</span> Buat Pengaduan / Sanggah Baru
                </button>
              </div>

              {/* 3 Metric Cards */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 border-t border-[#ebf6ef] pt-4">
                <div className="flex items-center justify-between rounded-xl border border-[#dce9df] bg-[#f8fdfa] p-3.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#707974]">TOTAL LAPORAN DIAJUKAN</span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <strong className="text-xl font-bold text-[#003828]">{currentUser ? '2' : '0'}</strong>
                      <span className="text-xs text-[#57605d]">Laporan Tercatat</span>
                    </div>
                  </div>
                  <div className="flex size-9 items-center justify-center rounded-lg bg-white border border-[#dce9df]">
                    <FileText className="size-4 text-[#176b50]" />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-[#fed7aa] bg-[#fffbeb] p-3.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#b45309]">INVESTIGASI AKTIF</span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <strong className="text-xl font-bold text-[#b45309]">{currentUser ? '1' : '0'}</strong>
                      <span className="text-xs text-[#92400e]">Uji Petik Satgas Lapangan</span>
                    </div>
                  </div>
                  <div className="flex size-9 items-center justify-center rounded-lg bg-white border border-[#fed7aa]">
                    <Search className="size-4 text-[#d97706]" />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] p-3.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803d]">TELAH DISELESAIKAN</span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <strong className="text-xl font-bold text-[#15803d]">{currentUser ? '1' : '0'}</strong>
                      <span className="text-xs text-[#166534]">Terverifikasi & Tuntas</span>
                    </div>
                  </div>
                  <div className="flex size-9 items-center justify-center rounded-lg bg-white border border-[#bbf7d0]">
                    <CheckCircle2 className="size-4 text-[#16a34a]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Split View: Left (Riwayat) & Right (Detail Kasus) */}
            {!currentUser ? (
              <div className="rounded-xl border border-black/[0.05] bg-white p-12 text-center flex flex-col items-center justify-center shadow-xs">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-[#ebf6ef] text-[#176b50] shadow-xs">
                  <FileText className="size-8" />
                </div>
                <h3 className="face-bold mt-4 text-base text-[#003828]">Belum Ada Riwayat Pengaduan & Sanggah</h3>
                <p className="mt-1.5 max-w-md text-xs text-[#57605d] leading-relaxed">
                  Anda belum masuk ke akun. Silakan masuk menggunakan NIK terdaftar Anda untuk melihat tiket sanggah & pengaduan Anda, atau laporkan ketidaktepatan penyaluran bansos baru.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => onNavigate && onNavigate('login', 'pengaduan-saya')}
                    className="face-semibold rounded-lg bg-[#00513b] px-5 py-2.5 text-xs text-white shadow-xs hover:bg-[#003828] transition"
                  >
                    <span className="flex items-center gap-1.5">Masuk ke Akun Anda <ArrowRight className="size-3.5" /></span>
                  </button>
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        onNavigate && onNavigate('login', 'pengaduan-saya');
                      } else {
                        setViewMode('create');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="face-semibold rounded-lg border border-[#dce9df] bg-white px-4 py-2.5 text-xs text-[#003828] hover:bg-[#ebf6ef] transition"
                  >
                    + Buat Pengaduan Baru
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-12">
              
              {/* Kolom Kiri: Riwayat Pengaduan */}
              <div className="lg:col-span-4 space-y-3">
                <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-xs text-[#003828]">Riwayat Pengaduan</strong>
                      <span className="rounded bg-[#ebf6ef] px-1.5 py-0.2 text-[10px] font-bold text-[#00513b]">
                        2 Item
                      </span>
                    </div>
                    <span className="text-[10px] text-[#707974] flex items-center gap-1">
                      <Clock className="size-3" /> Terbarukan
                    </span>
                  </div>

                  {/* Filter & Search */}
                  <div className="mt-3 space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#707974]" />
                      <input
                        type="text"
                        placeholder="Cari nomor tiket, program atau kelurahan..."
                        className="h-9 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] pl-8 pr-3 text-xs text-[#003828] outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select className="h-8 rounded-lg border border-[#dce9df] bg-white px-2 text-[11px] text-[#57605d]">
                        <option>Semua Status (2)</option>
                        <option>Dalam Investigasi</option>
                        <option>Selesai</option>
                      </select>
                      <select className="h-8 rounded-lg border border-[#dce9df] bg-white px-2 text-[11px] text-[#57605d]">
                        <option>Semua Kategori</option>
                        <option>Salah Sasaran</option>
                        <option>Penyaluran</option>
                      </select>
                    </div>
                  </div>

                  {/* Ticket List Items */}
                  <div className="mt-4 space-y-3">
                    {/* Item 1: Sedang Dipilih */}
                    <div
                      onClick={() => setSelectedTicketId('PGD-2025-0142')}
                      className={`relative rounded-xl border p-3.5 cursor-pointer transition ${
                        selectedTicketId === 'PGD-2025-0142'
                          ? 'border-[#00513b] bg-[#ebf6ef] ring-1 ring-[#00513b]'
                          : 'border-[#dce9df] bg-white hover:border-[#b5efd8]'
                      }`}
                    >
                      {selectedTicketId === 'PGD-2025-0142' && (
                        <span className="absolute -top-2 right-3 rounded bg-[#00513b] px-2 py-0.2 text-[9px] font-bold text-white">
                          ● SEDANG DIPILIH
                        </span>
                      )}
                      <span className="text-[10px] font-mono font-bold text-[#707974]">#PGD-2025-0142</span>
                      <strong className="mt-1 block text-xs text-[#003828]">
                        Ketidaktepatan Sasaran / Warga Mampu Menerima
                      </strong>
                      <span className="mt-2 inline-block rounded border border-[#f59e0b] bg-[#fffbeb] px-2 py-0.5 text-[9px] font-bold text-[#b45309]">
                        DALAM INVESTIGASI LAPANGAN
                      </span>

                      <div className="mt-2.5 grid grid-cols-2 gap-1 text-[10px] text-[#57605d]">
                        <div>
                          <span className="text-[#707974]">Program Bansos:</span>
                          <p className="font-semibold text-[#003828]">BPNT Beras 2026</p>
                        </div>
                        <div>
                          <span className="text-[#707974]">Lokasi Kejadian:</span>
                          <p className="font-semibold text-[#003828]">Coblong, Kota Bandung</p>
                        </div>
                        <div className="col-span-2 mt-1">
                          <span className="text-[#707974]">Waktu Pelaporan:</span>
                          <p className="font-semibold text-[#003828]">18 Maret 2026 • 14:20 WIB</p>
                        </div>
                      </div>

                      <p className="mt-2 text-[10px] italic text-[#57605d] line-clamp-2">
                        "Terlapor atas nama Bpk. H. Sutisna (Ketua RW 07) memiliki aset usaha toko sembako grosir dan mobil pribadi tapi..."
                      </p>

                      <div className="mt-3 flex items-center justify-between border-t border-[#dce9df] pt-2 text-[10px]">
                        <span className="text-[#176b50] font-medium flex items-center gap-1">
                          <Eye className="size-3" /> 2 Foto Lapangan Terlampir
                        </span>
                        <span className="text-[#707974]">Petugas: Rina K., S.STP</span>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div
                      onClick={() => setSelectedTicketId('PGD-2024-0988')}
                      className={`rounded-xl border p-3.5 cursor-pointer transition ${
                        selectedTicketId === 'PGD-2024-0988'
                          ? 'border-[#00513b] bg-[#ebf6ef] ring-1 ring-[#00513b]'
                          : 'border-[#dce9df] bg-white hover:border-[#b5efd8]'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#707974]">#PGD-2024-0988</span>
                      <strong className="mt-1 block text-xs text-[#003828]">
                        Keterlambatan Penyaluran KKS Pos
                      </strong>
                      <span className="mt-2 inline-block rounded border border-[#22c55e] bg-[#f0fdf4] px-2 py-0.5 text-[9px] font-bold text-[#15803d]">
                        SELESAI — DIVERIFIKASI
                      </span>

                      <div className="mt-2.5 grid grid-cols-2 gap-1 text-[10px] text-[#57605d]">
                        <div>
                          <span className="text-[#707974]">Program Bansos:</span>
                          <p className="font-semibold text-[#003828]">PKH Komponen Balita</p>
                        </div>
                        <div>
                          <span className="text-[#707974]">Selesai Pada:</span>
                          <p className="font-semibold text-[#003828]">19 Des 2024</p>
                        </div>
                      </div>

                      <div className="mt-2 rounded bg-gray-50 p-2 text-[10px] text-[#57605d]">
                        <strong>Solusi:</strong> Dana teralokasi berhasil disalurkan via kantor pos cadangan Coblong dan dikonfirmasi diterima.
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-[#dce9df] pt-2 text-[10px] text-[#707974]">
                        <span>Dilaporkan 12 Des 2024</span>
                        <span className="font-semibold text-[#00513b]">Lihat Arsip ›</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Card: Prinsip Kerahasiaan */}
                <div className="rounded-xl border border-[#b5efd8] bg-[#ebf6ef] p-4 text-xs text-[#003828]">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="size-4 shrink-0 text-[#176b50] mt-0.5" />
                    <div>
                      <strong className="text-xs">Prinsip Kerahasiaan Sanggah</strong>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#57605d]">
                        Setiap warga berhak mengawasi kelayakan bansos di sekitarnya melalui fitur sanggah. Identitas pelapor dilindungi hukum (UU PDP) dan tidak akan disebarluaskan kepada pihak tertuduh.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Detail Kasus & Riwayat Penelusuran Sanggah */}
              <div className="lg:col-span-8 space-y-4">
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  
                  {/* Top Bar Detail */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between border-b border-[#ebf6ef] pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#00513b] px-2 py-0.5 text-[9px] font-bold text-white">
                          TIKET PELACAKAN RESMI
                        </span>
                        <span className="font-mono text-xs font-bold text-[#003828]">#PGD-2025-0142</span>
                      </div>
                      <h2 className="face-bold mt-2 text-base text-[#003828] sm:text-lg">
                        Detail Kasus & Riwayat Penelusuran Sanggah
                      </h2>
                      <p className="text-xs text-[#57605d]">
                        Ketidaktepatan Alokasi Bantuan Pangan Non-Tunai (BPNT) di RW 07 Kelurahan Dago, Kecamatan Coblong, Kota Bandung.
                      </p>
                    </div>
                    <span className="text-[10px] text-[#707974] flex items-center gap-1 shrink-0">
                      <Clock className="size-3" /> Terakhir Diperbarui: 22 Mar 2026, 10:30 WIB
                    </span>
                  </div>

                  {/* Status Banner */}
                  <div className="mt-4 rounded-xl border border-[#fed7aa] bg-[#fffbeb] p-4">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="size-4 text-[#d97706] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs text-[#92400e]">
                          Status Terkini: Tim Satgas Wilayah Sedang Melakukan Uji Petik Faktual di Lapangan
                        </strong>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#78350f]">
                          Petugas verifikator kecamatan tengah memverifikasi kepemilikan aset dan rincian omzet toko terlapor, mencocokkan silang dokumen daya listrik PLN bersama pendamping serta pengurus RW setempat.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mode Anonimitas */}
                  <div className="mt-3 flex items-center justify-between rounded-lg border border-[#b5efd8] bg-[#ebf6ef] p-3 text-xs text-[#003828]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="size-4 text-[#176b50]" />
                      <span>
                        <strong>Mode Anonimitas Terjamin Aktif:</strong> Identitas Anda disamarkan dan divalidasi terenkripsi oleh server pusat. Hanya petugas pemeriksa resmi yang dapat mengakses kontak konfirmasi.
                      </span>
                    </div>
                    <Lock className="size-4 text-[#176b50] shrink-0 ml-2" />
                  </div>

                  {/* Detail Pelapor vs Verifikator */}
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#dce9df] bg-[#f8fdfa] p-3.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#707974]">
                        IDENTITAS PELAPOR (SUBJEK SANGGAH)
                      </span>
                      <strong className="mt-1 block text-xs text-[#003828]">
                        Keluarga Bpk. H. Sutisna (Inisial S)
                      </strong>
                      <span className="text-[10px] text-[#57605d]">
                        Terdaftar KPM BPNT No. Kartu: 3274********2018
                      </span>
                    </div>

                    <div className="rounded-xl border border-[#dce9df] bg-[#f8fdfa] p-3.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#707974]">
                        PETUGAS VERIFIKATOR WILAYAH
                      </span>
                      <strong className="mt-1 block text-xs text-[#003828]">
                        Rina Kartika, S.STP
                      </strong>
                      <span className="text-[10px] text-[#57605d]">
                        NIP: 19880414 201101 2 004 (Kecamatan Coblong)
                      </span>
                    </div>
                  </div>

                  {/* Substansi / Uraian Temuan Pelapor */}
                  <div className="mt-4 rounded-xl border border-[#dce9df] bg-[#f8fdfa] p-4">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#707974]">
                      SUBSTANSI / URAIAN TEMUAN PELAPOR:
                    </span>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#141e19]">
                      Keluarga terlapor memiliki aset bangunan permanen 2 lantai, toko bahan pokok aktif, serta 1 unit mobil niaga pick-up. Sebaliknya, di RT yang sama terdapat Ibu Warsiti (74 thn, janda lansia tanpa pendapatan) yang tereliminasi dari daftar bayar periode berjalan.
                    </p>
                  </div>

                  {/* Berkas Bukti Dukung (2 Berkas) */}
                  <div className="mt-4">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#707974]">
                      BERKAS BUKTI DUKUNG (GEOTAGGED & TIMESTAMPED)
                    </span>
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center justify-between rounded-lg border border-[#dce9df] bg-white p-3">
                        <div className="flex items-center gap-2">
                          <Camera className="size-4 text-[#176b50]" />
                          <div>
                            <strong className="block text-xs text-[#003828]">Foto Fisik Usaha Terlapor.jpg</strong>
                            <span className="text-[10px] text-[#707974]">Geotag: Kel. Dago, 107.6174 E / 2.4 MB</span>
                          </div>
                        </div>
                        <button className="text-[#176b50] hover:text-[#003828]">
                          <Eye className="size-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between rounded-lg border border-[#dce9df] bg-white p-3">
                        <div className="flex items-center gap-2">
                          <FileText className="size-4 text-[#176b50]" />
                          <div>
                            <strong className="block text-xs text-[#003828]">Kondisi Rumah Ibu Warsiti.jpg</strong>
                            <span className="text-[10px] text-[#707974]">Foto Rumah RTLH, 107.6181 E / 1.8 MB</span>
                          </div>
                        </div>
                        <button className="text-[#176b50] hover:text-[#003828]">
                          <Eye className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Timeline: Alur Investigasi & Jejak Audit Transparan */}
                  <div className="mt-6 border-t border-[#ebf6ef] pt-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-[#176b50]" />
                        <h3 className="face-bold text-xs uppercase tracking-wider text-[#003828]">
                          Alur Investigasi & Jejak Audit Transparan
                        </h3>
                      </div>
                      <span className="rounded bg-[#f1fcf4] px-2 py-0.5 text-[9px] font-semibold text-[#176b50]">
                        Sinkronisasi Satgas Dinamis
                      </span>
                    </div>

                    <div className="mt-4 space-y-4">
                      {/* Step 1 */}
                      <div className="relative flex items-start gap-3 pl-1">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#00513b] text-white">
                          <Check className="size-3.5 stroke-[3]" />
                        </div>
                        <div className="flex-1 rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3 text-xs">
                          <div className="flex items-center justify-between">
                            <strong className="text-[#003828]">1. Laporan Masuk & Enkripsi Tiket Berhasil</strong>
                            <span className="text-[10px] text-[#707974]">18 Maret 2026 • 14:20 WIB</span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#57605d]">
                            Laporan warga terkirim melalui kanal mandiri secara aman di pusat data nasional dan dienkripsi dengan signature:
                          </p>
                          <code className="mt-1 block rounded bg-white p-1 font-mono text-[9px] text-[#707974] border border-[#ebf6ef]">
                            SHA-256: d8f40839eb41c20bf10ec9b0942d54c19ca0a87640391ec0c394
                          </code>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="relative flex items-start gap-3 pl-1">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#00513b] text-white">
                          <Check className="size-3.5 stroke-[3]" />
                        </div>
                        <div className="flex-1 rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3 text-xs">
                          <div className="flex items-center justify-between">
                            <strong className="text-[#003828]">2. Penelaahan Awal oleh Admin Kota Bandung</strong>
                            <span className="text-[10px] text-[#707974]">19 Maret 2026 • 09:15 WIB</span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#57605d]">
                            Berkas dinyatakan memenuhi kriteria kelayakan formil sanggah (memiliki geotag, deskripsi alamat terkonfirmasi pada basis data Kemensos). Laporan diteruskan ke unit survei wilayah.
                          </p>
                          <span className="mt-1 block text-[10px] text-[#707974]">
                            Petugas: Admin Dinsos Kota Bandung (Operator #04)
                          </span>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="relative flex items-start gap-3 pl-1">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#00513b] text-white">
                          <Check className="size-3.5 stroke-[3]" />
                        </div>
                        <div className="flex-1 rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3 text-xs">
                          <div className="flex items-center justify-between">
                            <strong className="text-[#003828]">3. Penugasan & Penerbitan Surat Tugas Wilayah</strong>
                            <span className="text-[10px] text-[#707974]">20 Maret 2026 • 11:00 WIB</span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#57605d]">
                            Satgas Kecamatan Coblong menugaskan Verifikator Rina Kartika, S.STP untuk melakukan audit data cross-check dengan basis data Regsosek dan DTKS lokal. Surat Tugas: ST/DINSOS-CBL/2026/IV/081.
                          </p>
                        </div>
                      </div>

                      {/* Step 4 (Sedang Berjalan) */}
                      <div className="relative flex items-start gap-3 pl-1">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-[#d97706] bg-[#fffbeb] text-[#d97706]">
                          <Clock className="size-3.5" />
                        </div>
                        <div className="flex-1 rounded-lg border border-[#fed7aa] bg-[#fffbeb] p-3 text-xs">
                          <div className="flex items-center justify-between">
                            <strong className="text-[#92400e]">4. Kunjungan Faktual & Uji Petik Lapangan (Sedang Berjalan)</strong>
                            <span className="text-[10px] text-[#b45309]">22 Maret 2026 • 10:30 WIB</span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#78350f]">
                            Petugas telah melakukan kunjungan ke RT 07. Catatan lapangan: Ditemukan ketidaksesuaian aset ekonomi terlapor berupa kepemilikan ruko/toko sembako aktif milik yang bersangkutan. Pengalihan kuota bansos diusulkan untuk penerima alternatif KPM pengganti.
                          </p>
                          <div className="mt-2 rounded bg-white/80 p-2 text-[10px] text-[#92400e] border border-[#fed7aa] flex items-center gap-1.5">
                            <Clock className="size-3" />
                            <span>Menunggu penyusunan Berita Acara Pemeriksaan (BAP) Tim Gabungan RW/Kecamatan.</span>
                          </div>
                        </div>
                      </div>

                      {/* Step 5 (Estimasi) */}
                      <div className="relative flex items-start gap-3 pl-1 opacity-70">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-500 text-[10px] font-bold">
                          5
                        </div>
                        <div className="flex-1 rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3 text-xs">
                          <div className="flex items-center justify-between">
                            <strong className="text-[#57605d]">5. Rekomendasi Deligitasi & Pengalihan Kuota</strong>
                            <span className="text-[10px] text-[#707974]">Estimasi: 26 Maret 2026</span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#707974]">
                            Penandatanganan pencabutan bansos terlapor kepada Pusdatin Kemensos RI dan pengalihan resmi program bantuan ke warga alternatif yang terverifikasi membutuhkan.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input Form Kirim Informasi Tambahan */}
                  <div className="mt-6 rounded-xl border border-[#b5efd8] bg-[#ebf6ef] p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Send className="size-3.5 text-[#176b50]" />
                        <strong className="text-xs text-[#003828]">Kirim Informasi Tambahan atau Bukti Susulan</strong>
                      </div>
                      <span className="text-[10px] text-[#707974]">Maksimal 1.000 Karakter</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#57605d]">
                      Jika ada perkembangan baru di lokasi atau dokumen pelengkap tambahan untuk mempercepat verifikasi petugas, Anda dapat menambahkannya di sini.
                    </p>

                    <textarea
                      rows={3}
                      value={tanggapanText}
                      onChange={(e) => setTanggapanText(e.target.value)}
                      placeholder="Tuliskan keterangan tambahan atau tanggapan terkait tindak lanjut petugas di sini..."
                      className="mt-2.5 w-full rounded-lg border border-[#dce9df] bg-white p-3 text-xs text-[#003828] outline-none focus:border-[#176b50]"
                    />

                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        className="flex items-center gap-1.5 rounded-lg border border-[#dce9df] bg-white px-3 py-2 text-xs font-semibold text-[#003828] hover:bg-gray-50"
                      >
                        <Upload className="size-3.5 text-[#176b50]" /> Tambah Dokumen / Foto
                        <span className="text-[10px] font-normal text-[#707974]">(Format JPG, PNG, PDF maks. 5MB)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (tanggapanText) {
                            alert('Tanggapan dan bukti susulan berhasil dikirim ke petugas verifikator!');
                            setTanggapanText('');
                          }
                        }}
                        className="face-semibold flex items-center justify-center gap-1.5 rounded-lg bg-[#00513b] px-5 py-2 text-xs text-white shadow-xs hover:bg-[#003828]"
                      >
                        <Send className="size-3" /> Kirim Tanggapan
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAMPILAN 2: FORMULIR PENGADUAN & SANGGAH PENYALURAN BANSOS (FORM CREATE)  */}
        {/* ========================================================================= */}
        {viewMode === 'create' && (
          <form onSubmit={handleKirimLaporan} className="mt-3 space-y-4">
            
            {/* Header Create Form */}
            <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="face-bold text-xl text-[#003828] sm:text-2xl">
                    Formulir Pengaduan & Sanggah Penyaluran Bansos
                  </h1>
                  <p className="face-regular mt-1 text-xs leading-relaxed text-[#57605d] max-w-2xl">
                    Laporkan ketidaktepatan sasaran, indikasi pemotongan liar (pungli), kendala pencairan, atau anomali data aktif secara aman, terenkripsi, dan berkeadilan untuk mewujudkan bansos tepat sasaran.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-lg border border-[#b5efd8] bg-[#ebf6ef] px-3.5 py-2">
                  <Clock className="size-4 text-[#176b50]" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#707974]">STANDAR RESPONS RESMI</span>
                    <strong className="text-xs text-[#003828]">1 x 24 Jam Kerja</strong>
                    <span className="block text-[8px] text-[#57605d]">Verifikasi Awal Tim Satgas</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-12">
              
              {/* Kolom Kiri: Form Input Fields */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* 1. Pilih Kategori Permasalahan */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-5 items-center justify-center rounded-full bg-[#00513b] text-white text-[10px] font-bold">
                        1
                      </div>
                      <h2 className="face-bold text-sm text-[#003828]">Pilih Kategori Permasalahan</h2>
                    </div>
                    <span className="text-[10px] text-[#707974]">Wajib 1 Opsi</span>
                  </div>
                  <p className="mt-2 text-[11px] text-[#57605d]">
                    Tentukan kategori aduan yang paling objektif sesuai bukti di lapangan berikut klasifikasi Kemensos:
                  </p>

                  <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        id: 'salah_sasaran',
                        title: 'Salah Sasaran / Mampu',
                        desc: 'Penerima memiliki mobil/rumah mewah/penghasilan jauh di atas UMR tapi terdaftar aktif (PKH/BPNT/PBI/Sembako).',
                      },
                      {
                        id: 'pungli',
                        title: 'Dugaan Pungli / Potongan',
                        desc: 'Bantuan dipotong oknum aparat desa/pendamping dengan dalih kas/iuran suka-rela saat pencairan.',
                      },
                      {
                        id: 'belum_diterima',
                        title: 'Bantuan Belum Diterima',
                        desc: 'Status di sistem terbit tapi buku tabungan/kartu belum disalurkan atau saldo nol terus-menerus.',
                      },
                      {
                        id: 'ketidaksesuaian_nik',
                        title: 'Ketidaksesuaian Data / NIK',
                        desc: 'Data kependudukan tidak padan, NIK ganda, atau status meninggal yang masih terdaftar aktif.',
                      },
                      {
                        id: 'kendala_loket',
                        title: 'Kendala Loket & Aksesibilitas Khusus',
                        desc: 'Lokasi penyaluran tidak ramah disabilitas/lansia berat atau pelayanan petugas yang diskriminatif.',
                        spanFull: true,
                      },
                    ].map((kat) => {
                      const isSelected = form.kategori === kat.id;
                      return (
                        <div
                          key={kat.id}
                          onClick={() => setForm({ ...form, kategori: kat.id })}
                          className={`rounded-xl border p-3.5 cursor-pointer transition ${
                            kat.spanFull ? 'sm:col-span-2' : ''
                          } ${
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
                            <strong className="text-xs text-[#003828]">{kat.title}</strong>
                          </div>
                          <p className="mt-1.5 text-[10px] leading-relaxed text-[#707974] pl-5.5">
                            {kat.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Identitas Program & Pihak Terlapor */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-5 items-center justify-center rounded-full bg-[#00513b] text-white text-[10px] font-bold">
                        2
                      </div>
                      <h2 className="face-bold text-sm text-[#003828]">Identitas Program & Pihak Terlapor</h2>
                    </div>
                    <span className="text-[10px] text-[#707974]">Subjek Info</span>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    <div>
                      <label className="face-semibold block text-xs text-[#003828]">
                        Terkait Program Bantuan <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.program}
                        onChange={(e) => setForm({ ...form, program: e.target.value })}
                        className="mt-1.5 h-11 w-full rounded-lg border border-[#dce9df] bg-white px-3 text-xs text-[#003828] outline-none"
                      >
                        <option>Bantuan Pangan Non-Tunai (BPNT / Sembako Mandiri)</option>
                        <option>Program Keluarga Harapan (PKH)</option>
                        <option>Bantuan Langsung Tunai (BLT Desa / BBM)</option>
                        <option>Bantuan RTLH (Rumah Tidak Layak Huni)</option>
                      </select>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="face-semibold block text-xs text-[#003828]">
                          Nama Warga / Oknum Terlapor <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.namaTerlapor}
                          onChange={(e) => setForm({ ...form, namaTerlapor: e.target.value })}
                          className="mt-1.5 h-10 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3 text-xs text-[#003828] outline-none"
                        />
                        <p className="mt-1 text-[10px] text-[#707974]">
                          Jika tidak tahu nama lengkap, sebutkan inisial / peran di wilayah.
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label className="face-semibold block text-xs text-[#003828]">NIK Terlapor</label>
                          <span className="text-[9px] text-[#707974]">Opsional</span>
                        </div>
                        <input
                          type="text"
                          value={form.nikTerlapor}
                          onChange={(e) => setForm({ ...form, nikTerlapor: e.target.value })}
                          placeholder="32xxxxxxxxxxxxxx"
                          className="mt-1.5 h-10 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3 text-xs text-[#003828] outline-none font-mono"
                        />
                        <p className="mt-1 text-[10px] text-[#707974]">
                          Kosongkan bila Anda tidak mengetahui nomor NIK pihak terlapor.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="face-semibold block text-xs text-[#003828]">
                        Perkiraan Alamat & Titik Lokasi Kejadian <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
                        <input
                          type="text"
                          value={form.alamatKejadian}
                          onChange={(e) => setForm({ ...form, alamatKejadian: e.target.value })}
                          className="h-10 flex-1 rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3 text-xs text-[#003828] outline-none"
                        />
                        <input
                          type="text"
                          value={form.wilayahKec}
                          onChange={(e) => setForm({ ...form, wilayahKec: e.target.value })}
                          className="h-10 sm:w-48 rounded-lg border border-[#dce9df] bg-white px-3 text-xs text-[#003828] outline-none"
                        />
                      </div>
                      <p className="mt-1 text-[10px] text-[#176b50] flex items-center gap-1 font-medium">
                        <MapPin className="size-3" /> Kota Bandung, Jawa Barat (Otomatis terhubung dengan koneksi satgas Dinsos setempat)
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Waktu & Narasi Kronologis */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-5 items-center justify-center rounded-full bg-[#00513b] text-white text-[10px] font-bold">
                        3
                      </div>
                      <h2 className="face-bold text-sm text-[#003828]">Waktu & Narasi Kronologis</h2>
                    </div>
                    <span className="text-[10px] text-[#707974]">Minimal 50 Karakter</span>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="face-semibold block text-xs text-[#003828]">
                          Tanggal Peristiwa / Temuan <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.tanggalPeristiwa}
                          onChange={(e) => setForm({ ...form, tanggalPeristiwa: e.target.value })}
                          className="mt-1.5 h-10 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3 text-xs text-[#003828] outline-none"
                        />
                      </div>

                      <div>
                        <label className="face-semibold block text-xs text-[#003828]">
                          Perkiraan Waktu Kejadian
                        </label>
                        <input
                          type="text"
                          value={form.waktuKejadian}
                          onChange={(e) => setForm({ ...form, waktuKejadian: e.target.value })}
                          className="mt-1.5 h-10 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3 text-xs text-[#003828] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="face-semibold block text-xs text-[#003828]">
                          Deskripsi Lengkap Peristiwa <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-[#707974]">{form.deskripsi.length} / 1000 Karakter</span>
                      </div>
                      <textarea
                        rows={4}
                        value={form.deskripsi}
                        onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                        className="mt-1.5 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3 text-xs leading-relaxed text-[#003828] outline-none focus:border-[#176b50]"
                      />
                      <p className="mt-1 text-[10px] text-[#707974]">
                        ⓘ Semakin spesifik kronologi dan data pendukung yang Anda masukkan, semakin cepat proses verifikasi satgas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Unggah Bukti Pendukung & Foto Lokasi */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-5 items-center justify-center rounded-full bg-[#00513b] text-white text-[10px] font-bold">
                        4
                      </div>
                      <h2 className="face-bold text-sm text-[#003828]">Unggah Bukti Pendukung & Foto Lokasi</h2>
                    </div>
                    <span className="text-[10px] text-[#707974]">Maksimal 3 File / Berkas</span>
                  </div>
                  <p className="mt-2 text-[11px] text-[#57605d]">
                    Sertakan bukti foto fisik aset yang bersangkutan (mobil/rumah mewah) atau kwitansi potongan liar sehingga mudah diuji forensik.
                  </p>

                  {/* Dropzone */}
                  <div className="mt-3 flex flex-col items-center justify-center rounded-xl border border-dashed border-[#b5efd8] bg-[#f8fdfa] p-5 text-center">
                    <Upload className="size-6 text-[#176b50]" />
                    <strong className="mt-2 text-xs text-[#003828]">Tarik & Letakkan Bukti di Sini, atau Pilih File</strong>
                    <span className="text-[10px] text-[#707974]">Mendukung format JPG, PNG, PDF, atau rekaman audio (Maks 5MB per berkas)</span>
                    <button
                      type="button"
                      className="mt-3 flex items-center gap-1.5 rounded-lg border border-[#dce9df] bg-white px-3 py-1.5 text-xs font-semibold text-[#003828] hover:bg-[#ebf6ef]"
                    >
                      <Camera className="size-3.5 text-[#176b50]" /> Ambil Foto Langsung dengan Geotag GPS
                    </button>
                  </div>

                  {/* File List Terunggah */}
                  <div className="mt-3 space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#707974]">
                      BERKAS TERUNGGAH (2/3 BERKAS TERVERIFIKASI)
                    </span>

                    <div className="flex items-center justify-between rounded-lg border border-[#b5efd8] bg-white p-2.5">
                      <div className="flex items-center gap-2">
                        <Camera className="size-4 text-[#176b50]" />
                        <div>
                          <strong className="block text-xs text-[#003828]">foto_aset_mobil_dan_toko_terlapor.jpg</strong>
                          <span className="text-[10px] text-[#707974]">2.4 MB • -6.8834, 107.6162 (Coblong, Bandung)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#e6f4ea] px-1.5 py-0.2 text-[9px] font-semibold text-[#137333]">
                          Geotag Valid
                        </span>
                        <button type="button" className="text-[#57605d] hover:text-[#003828]">
                          <Eye className="size-3.5" />
                        </button>
                        <button type="button" className="text-red-500 hover:text-red-700">
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-[#b5efd8] bg-white p-2.5">
                      <div className="flex items-center gap-2">
                        <FileText className="size-4 text-[#176b50]" />
                        <div>
                          <strong className="block text-xs text-[#003828]">kwitansi_pemotongan_desa_pos.pdf</strong>
                          <span className="text-[10px] text-[#707974]">1.1 MB • Dokumen Potongan Senilai Rp 50.000</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-gray-100 px-1.5 py-0.2 text-[9px] font-semibold text-[#57605d]">
                          Terkunci SHA-256
                        </span>
                        <button type="button" className="text-[#57605d] hover:text-[#003828]">
                          <Eye className="size-3.5" />
                        </button>
                        <button type="button" className="text-red-500 hover:text-red-700">
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Kerahasiaan & Pernyataan Integritas */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-5 items-center justify-center rounded-full bg-[#00513b] text-white text-[10px] font-bold">
                        5
                      </div>
                      <h2 className="face-bold text-sm text-[#003828]">Kerahasiaan & Pernyataan Integritas</h2>
                    </div>
                    <span className="text-[10px] text-[#707974]">Tahap Akhir</span>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    <div>
                      <span className="text-xs font-semibold text-[#003828]">Pilih Derajat Kerahasiaan Identitas Anda</span>
                      <div className="mt-2 grid gap-3 sm:grid-cols-2">
                        <div
                          onClick={() => setForm({ ...form, anonim: 'anonim' })}
                          className={`rounded-xl border p-3 cursor-pointer transition ${
                            form.anonim === 'anonim'
                              ? 'border-[#00513b] bg-[#ebf6ef] ring-1 ring-[#00513b]'
                              : 'border-[#dce9df] bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`flex size-3.5 items-center justify-center rounded-full border ${
                                form.anonim === 'anonim' ? 'border-[#00513b] bg-[#00513b]' : 'border-[#707974]'
                              }`}
                            >
                              {form.anonim === 'anonim' && <span className="size-1 rounded-full bg-white" />}
                            </span>
                            <strong className="text-xs text-[#003828]">Mode Anonim Penuh</strong>
                          </div>
                          <p className="mt-1 text-[10px] text-[#707974] pl-5.5">
                            Nama & kontak Anda sama sekali tidak akan pernah terlihat / diberikan kepada umum maupun pihak terlapor.
                          </p>
                        </div>

                        <div
                          onClick={() => setForm({ ...form, anonim: 'terbatas' })}
                          className={`rounded-xl border p-3 cursor-pointer transition ${
                            form.anonim === 'terbatas'
                              ? 'border-[#00513b] bg-[#ebf6ef] ring-1 ring-[#00513b]'
                              : 'border-[#dce9df] bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className={`flex size-3.5 items-center justify-center rounded-full border ${
                                  form.anonim === 'terbatas' ? 'border-[#00513b] bg-[#00513b]' : 'border-[#707974]'
                                }`}
                              >
                                {form.anonim === 'terbatas' && <span className="size-1 rounded-full bg-white" />}
                              </span>
                              <strong className="text-xs text-[#003828]">Kerahasiaan Terbatas (Direkomendasikan)</strong>
                            </div>
                            <span className="rounded bg-[#00513b] px-1 py-0.2 text-[8px] text-white font-bold">
                              PRIORITAS
                            </span>
                          </div>
                          <p className="mt-1 text-[10px] text-[#707974] pl-5.5">
                            Hanya admin tim satgas yang dapat menghubungi via WhatsApp Anda untuk meminta klarifikasi verifikasi bukti.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Phone className="size-4 text-[#176b50]" />
                        <div>
                          <strong className="text-[#003828]">Nomor WhatsApp Terverifikasi Pelapor</strong>
                          <p className="text-[10px] text-[#707974]">Akan digunakan konfirmasi jadwal survei verifikasi tim satgas</p>
                        </div>
                      </div>
                      <span className="font-mono font-semibold text-[#003828] bg-white px-2 py-1 rounded border border-[#dce9df]">
                        {form.waPelapor}
                      </span>
                    </div>

                    <div className="rounded-lg bg-[#fff5f5] p-3 border border-red-100">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.setujuPernyataan}
                          onChange={(e) => setForm({ ...form, setujuPernyataan: e.target.checked })}
                          className="mt-0.5 size-4 accent-[#00513b]"
                        />
                        <span className="text-xs leading-relaxed text-[#3f4944]">
                          Saya menyatakan dengan sesungguhnya bahwa seluruh laporan dan berkas yang saya berikan adalah benar berdasarkan <strong>fakta yang sebenarnya</strong> tanpa unsur fitnah, rekayasa, atau persaingan pribadi, demi keadilan sosial dan integritas penyaluran bantuan sosial yang tepat sasaran.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="flex flex-col gap-2 rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className="face-semibold flex items-center gap-1.5 rounded-lg border border-[#dce9df] bg-white px-4 py-2.5 text-xs text-[#003828] hover:bg-[#ebf6ef]"
                    >
                      Batal / Kembali ke Daftar
                    </button>
                    <button
                      type="button"
                      className="face-semibold flex items-center gap-1.5 rounded-lg border border-[#dce9df] bg-white px-4 py-2.5 text-xs text-[#003828] hover:bg-[#ebf6ef]"
                    >
                      <Save className="size-3.5" /> Simpan Draf Laporan
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!form.setujuPernyataan}
                    className="face-semibold flex items-center justify-center gap-2 rounded-lg bg-[#00513b] px-6 py-2.5 text-xs text-white shadow-xs hover:bg-[#003828] disabled:opacity-50 transition"
                  >
                    <Send className="size-3.5" /> Kirim & Terbitkan Tiket
                  </button>
                </div>

              </div>

              {/* Kolom Kanan: Panduan, Standar & Hotline */}
              <div className="lg:col-span-4 space-y-4">
                
                {/* 1. Alur Penanganan Laporan */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs">
                  <div className="flex items-center gap-1.5 border-b border-[#ebf6ef] pb-2.5">
                    <Clock className="size-4 text-[#176b50]" />
                    <strong className="text-xs text-[#003828]">Alur Penanganan Laporan</strong>
                  </div>
                  <p className="mt-2 text-[10px] text-[#707974]">
                    Setiap aduan diproses transparan melalui 5 tahapan audit independen Satgas bersama aparat kelurahan setempat:
                  </p>

                  <div className="mt-3 space-y-2.5 text-xs">
                    {[
                      { step: 1, title: 'Tiket Masuk & Enkripsi', time: '1-2 Jam', desc: 'Sistem memberi nomor registrasi terlindungi dan enkripsi tanda tangan bukti form pengaduan.' },
                      { step: 2, title: 'Penelaahan Awal Satgas', time: '1x24 Jam', desc: 'Validasi berkas bukti formil kecocokan NIK, alamat domisili, dan riwayat di Dinas Sosial Kota/Kabupaten.' },
                      { step: 3, title: 'Surat Tugas Verifikator', time: null, desc: 'Penerbitan surat tugas resmi ke pendamping bansos independen dan aparat kelurahan terkait.' },
                      { step: 4, title: 'Uji Petik Lapangan', time: null, desc: 'Pemeriksaan faktual aset dan kondisi kelayakan langsung ke alamat terlapor secara rahasia.' },
                      { step: 5, title: 'Putusan & Deligitasi', time: '3-7 Hari', desc: 'Pencabutan kuota penerima tidak tepat (deligitasi), dan pengalihan bansos otomatis ke antrean prioritas warga miskin yang layak.' },
                    ].map((st) => (
                      <div key={st.step} className="flex items-start gap-2 rounded-lg bg-[#f8fdfa] p-2 border border-[#ebf6ef]">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#00513b] text-[10px] font-bold text-white">
                          {st.step}
                        </span>
                        <div>
                          <div className="flex items-center justify-between">
                            <strong className="text-[11px] text-[#003828]">{st.title}</strong>
                            {st.time && (
                              <span className="rounded bg-[#e6f4ea] px-1 py-0.2 text-[8px] font-bold text-[#137333]">
                                {st.time}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-[10px] text-[#57605d] leading-relaxed">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 rounded-lg bg-[#ebf6ef] p-2 text-center text-[10px] font-semibold text-[#00513b]">
                    ✓ Tingkat penyelesaian aduan valid Kota Bandung: 94.8%
                  </div>
                </div>

                {/* 2. Pedoman Bukti Valid */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs">
                  <div className="flex items-center gap-1.5 border-b border-[#ebf6ef] pb-2.5">
                    <CheckCircle2 className="size-4 text-[#176b50]" />
                    <strong className="text-xs text-[#003828]">Pedoman Bukti Valid</strong>
                  </div>
                  <ul className="mt-2 space-y-2 text-[10px] text-[#57605d]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#176b50] font-bold">✓</span>
                      <span><strong>Foto Fisik Hunian / Aset:</strong> Memperlihatkan nomor rumah, kendaraan, pertokoan usaha, atau dokumen sertifikat kepemilikan.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#176b50] font-bold">✓</span>
                      <span><strong>Kwitansi / Potongan Kas:</strong> Bukti tanda terima atau kuitansi pungli jika dipotong oknum aparat desa/kelurahan.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#176b50] font-bold">✓</span>
                      <span><strong>Tangkapan Layar Komunikasi:</strong> Pesan WA/rekaman intimidasi perihal pemotongan bansos (jika ada).</span>
                    </li>
                    <li className="flex items-start gap-1.5 text-red-600">
                      <span className="font-bold">✕</span>
                      <span><strong>Hindari Laporan Praduga:</strong> Aduan tanpa menyertakan bukti jelas akan memperlambat proses penyelidikan.</span>
                    </li>
                  </ul>
                </div>

                {/* 3. Bantuan & Pengaduan Cepat */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs">
                  <div className="flex items-center gap-1.5 border-b border-[#ebf6ef] pb-2.5">
                    <Phone className="size-4 text-[#176b50]" />
                    <strong className="text-xs text-[#003828]">Bantuan & Pengaduan Cepat</strong>
                  </div>
                  <p className="mt-2 text-[10px] text-[#707974]">
                    Jika Anda mengalami intimidasi langsung di lapangan, segera hubungi kontak darurat penegak hukum resmi berikut:
                  </p>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-2.5">
                      <div className="flex items-center gap-2">
                        <Phone className="size-3.5 text-[#176b50]" />
                        <span className="font-semibold text-[#003828]">Call Center Kemensos</span>
                      </div>
                      <span className="font-mono font-bold text-[#00513b]">171 (Bebas Pulsa)</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-2.5">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="size-3.5 text-[#176b50]" />
                        <span className="font-semibold text-[#003828]">Satgas Saber Pungli Jabar</span>
                      </div>
                      <span className="font-mono font-bold text-[#00513b]">0811-222-333</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </form>
        )}

      </div>
    </div>
  );
}

