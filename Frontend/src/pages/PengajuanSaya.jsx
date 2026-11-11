import React, { useState } from 'react';
import {
  FolderPlus,
  Plus,
  Search,
  RotateCcw,
  Copy,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  FileText,
  Eye,
  MessageCircle,
  Phone,
  Check,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  HelpCircle,
  Building2,
  Users,
} from 'lucide-react';

export default function PengajuanSaya({ onNavigate, onOpenDialog }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  const [selectedYear, setSelectedYear] = useState('Semua Tahun');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [copiedId, setCopiedId] = useState(null);

  const stats = [
    {
      title: 'TOTAL USULAN DIAJUKAN',
      count: '3',
      unit: 'Usulan',
      subtext: 'Sejak pembukaan NIK 2023',
      icon: FolderPlus,
      iconBg: 'bg-[#e6f4ea] text-[#137333]',
    },
    {
      title: 'SEDANG BERJALAN',
      count: '1',
      unit: 'Aktif Terjadwal',
      subtext: 'TB-2025-BDG-0892',
      dotColor: 'bg-[#188038]',
      icon: Clock,
      iconBg: 'bg-[#e6f4ea] text-[#137333]',
    },
    {
      title: 'DISETUJUI MASUK DTKS',
      count: '1',
      unit: 'Program Aktif',
      subtext: 'TB-2024-BDG-0145',
      icon: CheckCircle2,
      iconBg: 'bg-[#e6f4ea] text-[#137333]',
    },
    {
      title: 'PERLU PERBAIKAN / DITOLAK',
      count: '1',
      unit: 'Arsip Usulan',
      subtext: 'TB-2023-BDG-0021',
      icon: XCircle,
      iconBg: 'bg-[#fce8e6] text-[#c5221f]',
    },
  ];

  const applications = [
    {
      id: 'TB-2025-BDG-0892',
      date: '24 Okt 2025 • 09:42 WIB',
      badgeVisit: 'Visitasi: 28 Okt 2025',
      programTitle: 'Usul Mandiri PKH & Sembako',
      programSub: 'Komponen Prioritas: Lansia Terlantar & Anak Sekolah Formal SMA',
      puskesos: 'Puskesos Kel. Cibuntu',
      applicantName: 'Rahmat Hidayat',
      applicantRole: 'Kepala Keluarga / Pemohon',
      dependents: 'Ibu Sumiyati (71 th - Ibu Kandung)',
      wilayah: 'Kel. Cibuntu',
      kecamatan: 'Kec. Bandung Kulon',
      rtRw: 'RT 04 / RW 02',
      statusType: 'verifikasi',
      statusLabel: 'Verifikasi Lapangan',
      statusDesc: 'Petugas SLRT (Ibu Siti Marwah) dijadwalkan survei geotagging rumah.',
      btnAction: 'Lihat Detail',
      btnSecondary: 'Unduh Bukti',
    },
    {
      id: 'TB-2024-BDG-0145',
      date: '12 Mar 2024 • 14:10 WIB',
      badgeDisahkan: 'Disahkan: 28 Apr 2024',
      programTitle: 'Bantuan Pangan Non-Tunai (BPNT) Sembako Reguler',
      programSub: 'Penyaluran Kartu Sembako Himbara (BNI) Periode Kuartal II',
      kksNumber: 'No. KKS: 3273-0402-9912-0041',
      applicantName: 'Rahmat Hidayat',
      applicantRole: 'Kepala Keluarga (Diri Sendiri)',
      dependentsCount: '3 Tanggungan Tercakup',
      wilayah: 'Kel. Cibuntu',
      kecamatan: 'Kec. Bandung Kulon',
      rtRw: 'RT 04 / RW 02',
      statusType: 'selesai',
      statusLabel: 'Selesai - Terdaftar DTKS',
      statusDesc: 'Tercatat dalam SK Kemensos No. 142/HUK/2024 Penetapan Tahap 2.',
      btnAction: 'Lihat Detail',
      btnSecondary: 'Cetak SK',
    },
    {
      id: 'TB-2023-BDG-0021',
      date: '05 Sep 2023 • 11:05 WIB',
      badgeDitolak: 'Ditolak: 20 Sep 2023',
      programTitle: 'Bantuan Stimulan Perumahan Swadaya (BSPS)',
      programSub: 'Rehabilitasi Atap, Lantai & Dinding (RUTILAHU)',
      dinas: 'Dinas Perumahan & Kawasan Permukiman',
      applicantName: 'Rahmat Hidayat',
      applicantRole: 'Pemohon Utama',
      objectStatus: 'Objek Rumah Sewa',
      wilayah: 'Kel. Cibuntu',
      kecamatan: 'Kec. Bandung Kulon',
      rtRw: 'RT 04 / RW 02',
      statusType: 'ditolak',
      statusLabel: 'Ditolak: Status Sewa Kontrakan',
      statusDesc: 'Kriteria program mewajibkan SHM/AJB milik pemohon sendiri, bukan bangunan sewa/kontrakan.',
      btnAction: 'Catatan Penolakan',
      btnSecondaryNote: 'Arsip Ditutup',
    },
  ];

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('Semua Status');
    setSelectedYear('Semua Tahun');
  };

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
          <span className="face-semibold text-[#003828]">Pengajuan Saya</span>
        </nav>

        {/* Top Header Card */}
        <div className="mt-4 rounded-xl border border-black/[0.04] bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-[#176b50]" />
                <span className="eyebrow">DAFTAR BERKAS MANDIRI</span>
              </div>
              <h1 className="face-bold mt-2 text-2xl leading-tight text-[#003828] sm:text-3xl">
                Pengajuan Usul Kelayakan Saya
              </h1>
              <p className="face-regular mt-1 text-xs leading-[20px] text-[#57605d] max-w-2xl">
                Pantau riwayat pendaftaran bantuan sosial mandiri, status evaluasi berkas kelurahan,
                dan riwayat usulan sebelumnya dengan transparansi berstandar nasional.
              </p>
            </div>
            <button
              onClick={() => onOpenDialog && onOpenDialog('Pengajuan Usulan Mandiri')}
              className="face-semibold flex items-center justify-center gap-2 rounded-lg bg-[#00513b] px-5 py-2.5 text-xs text-white shadow-xs transition hover:bg-[#003828] shrink-0"
            >
              <Plus className="size-4" />
              Buat Usulan Baru
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="rounded-xl border border-black/[0.04] bg-white p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <p className="face-bold text-[10px] tracking-wider text-[#707974] uppercase">
                      {s.title}
                    </p>
                    <span className={`flex size-8 items-center justify-center rounded-lg ${s.iconBg}`}>
                      <Icon className="size-4" />
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <strong className="face-bold text-3xl text-[#003828]">{s.count}</strong>
                    <span className="text-xs text-[#57605d] font-semibold">{s.unit}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 border-t border-[#ebf6ef] pt-2 text-[11px] text-[#707974]">
                  {s.dotColor ? (
                    <span className={`size-2 rounded-full ${s.dotColor}`} />
                  ) : (
                    <Clock className="size-3 text-[#176b50]" />
                  )}
                  <span>{s.subtext}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-6 rounded-xl border border-black/[0.04] bg-white p-4 shadow-xs">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 size-4 text-[#707974]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nomor tiket, nama anggota keluarga, atau program bantuan..."
                className="face-regular h-10 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] pl-10 pr-9 text-xs outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-[#707974] hover:text-[#141e19]"
                >
                  ×
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="face-semibold h-10 rounded-lg border border-[#dce9df] bg-white px-3 text-xs text-[#003828] outline-none focus:border-[#176b50]"
              >
                <option>Semua Status</option>
                <option>Verifikasi Lapangan</option>
                <option>Selesai - Terdaftar DTKS</option>
                <option>Perlu Perbaikan / Ditolak</option>
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="face-semibold h-10 rounded-lg border border-[#dce9df] bg-white px-3 text-xs text-[#003828] outline-none focus:border-[#176b50]"
              >
                <option>Semua Tahun 🗓</option>
                <option>2026</option>
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>

              <button
                onClick={handleResetFilters}
                className="face-semibold flex h-10 items-center gap-1.5 rounded-lg border border-[#bfc9c2]/50 bg-white px-3.5 text-xs text-[#57605d] hover:bg-[#ebf6ef]"
              >
                <RotateCcw className="size-3.5" />
                Atur Ulang
              </button>
            </div>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="mt-6 rounded-xl border border-black/[0.04] bg-white shadow-xs overflow-hidden">
          {/* Table Header Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#ebf6ef] p-4 sm:px-6 gap-2">
            <div className="flex items-center gap-2">
              <h2 className="face-bold text-sm text-[#003828]">Daftar Usulan Terdaftar</h2>
              <span className="rounded bg-[#00513b] px-2 py-0.5 text-[10px] font-bold text-white">
                3 Dokumen
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#707974]">
              <FileText className="size-3.5 text-[#176b50]" />
              <span>Tersinkronisasi otomatis dengan Pusdatin Kemensos RI</span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#ebf6ef] bg-[#f8fdfa] text-[10px] font-bold text-[#707974] uppercase tracking-wider">
                  <th className="py-3.5 pl-6 pr-3">NOMOR TIKET & TANGGAL</th>
                  <th className="py-3.5 px-3">PROGRAM BANTUAN DIUSULKAN</th>
                  <th className="py-3.5 px-3">ANGGOTA TERDAFTAR</th>
                  <th className="py-3.5 px-3">WILAYAH KELURAHAN</th>
                  <th className="py-3.5 px-3">STATUS EVALUASI</th>
                  <th className="py-3.5 pl-3 pr-6 text-right">AKSI & BERKAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebf6ef]">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#f8fdfa]/80 transition">
                    {/* Col 1: Nomor Tiket & Tanggal */}
                    <td className="py-4 pl-6 pr-3 align-top">
                      <div className="flex items-center gap-1.5">
                        <strong className="font-mono text-xs font-bold text-[#003828]">
                          {app.id}
                        </strong>
                        <button
                          onClick={() => handleCopy(app.id)}
                          title="Salin Nomor Tiket"
                          className="text-[#707974] hover:text-[#003828]"
                        >
                          {copiedId === app.id ? (
                            <Check className="size-3 text-[#137333]" />
                          ) : (
                            <Copy className="size-3" />
                          )}
                        </button>
                      </div>
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-[#707974]">
                        <Calendar className="size-3 text-[#707974]" />
                        {app.date}
                      </p>
                      {app.badgeVisit && (
                        <span className="face-semibold mt-2 inline-flex items-center gap-1 rounded bg-[#e6f4ea] px-2 py-0.5 text-[10px] text-[#137333]">
                          <span className="size-1.5 rounded-full bg-[#188038]" />
                          {app.badgeVisit}
                        </span>
                      )}
                      {app.badgeDisahkan && (
                        <span className="face-semibold mt-2 inline-flex items-center gap-1 rounded bg-[#e6f4ea] px-2 py-0.5 text-[10px] text-[#137333]">
                          <Check className="size-3 text-[#137333]" />
                          {app.badgeDisahkan}
                        </span>
                      )}
                      {app.badgeDitolak && (
                        <span className="face-semibold mt-2 inline-flex items-center gap-1 rounded bg-[#fce8e6] px-2 py-0.5 text-[10px] text-[#c5221f]">
                          <Calendar className="size-3 text-[#c5221f]" />
                          {app.badgeDitolak}
                        </span>
                      )}
                    </td>

                    {/* Col 2: Program Bantuan */}
                    <td className="py-4 px-3 align-top max-w-xs">
                      <h3 className="face-bold text-xs text-[#003828] leading-snug">
                        {app.programTitle}
                      </h3>
                      <p className="mt-1 text-[11px] leading-[16px] text-[#57605d]">
                        {app.programSub}
                      </p>
                      {app.puskesos && (
                        <p className="mt-2 text-[10px] text-[#707974] flex items-center gap-1">
                          <Building2 className="size-3" />
                          {app.puskesos}
                        </p>
                      )}
                      {app.kksNumber && (
                        <p className="mt-2 text-[10px] font-mono text-[#176b50] flex items-center gap-1 font-semibold">
                          <FileText className="size-3" />
                          {app.kksNumber}
                        </p>
                      )}
                      {app.dinas && (
                        <p className="mt-2 text-[10px] text-[#707974] flex items-center gap-1">
                          <Building2 className="size-3" />
                          {app.dinas}
                        </p>
                      )}
                    </td>

                    {/* Col 3: Anggota Terdaftar */}
                    <td className="py-4 px-3 align-top">
                      <strong className="block text-xs text-[#141e19]">{app.applicantName}</strong>
                      <span className="text-[11px] text-[#707974]">{app.applicantRole}</span>
                      {app.dependents && (
                        <span className="mt-2 inline-flex items-center gap-1 rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] text-[#00513b]">
                          <Users className="size-3" />
                          {app.dependents}
                        </span>
                      )}
                      {app.dependentsCount && (
                        <span className="mt-2 inline-flex items-center gap-1 rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] text-[#00513b]">
                          <Users className="size-3" />
                          {app.dependentsCount}
                        </span>
                      )}
                      {app.objectStatus && (
                        <span className="mt-2 inline-flex items-center gap-1 rounded bg-[#f1f3f4] px-2 py-0.5 text-[10px] text-[#5f6368]">
                          <Building2 className="size-3" />
                          {app.objectStatus}
                        </span>
                      )}
                    </td>

                    {/* Col 4: Wilayah Kelurahan */}
                    <td className="py-4 px-3 align-top text-[11px] text-[#3f4944]">
                      <strong className="block font-bold text-[#003828]">{app.wilayah}</strong>
                      <span>{app.kecamatan}</span>
                      <p className="mt-1 text-[10px] text-[#707974]">{app.rtRw}</p>
                    </td>

                    {/* Col 5: Status Evaluasi */}
                    <td className="py-4 px-3 align-top max-w-xs">
                      {app.statusType === 'verifikasi' && (
                        <div className="rounded-lg bg-[#e6f4ea] p-2.5 border border-[#ceead6]">
                          <span className="face-bold flex items-center gap-1 text-[11px] text-[#137333]">
                            <FileText className="size-3.5" />
                            {app.statusLabel}
                          </span>
                          <p className="mt-1 text-[10px] leading-[15px] text-[#137333]">
                            {app.statusDesc}
                          </p>
                        </div>
                      )}
                      {app.statusType === 'selesai' && (
                        <div className="rounded-lg bg-[#e6f4ea] p-2.5 border border-[#ceead6]">
                          <span className="face-bold flex items-center gap-1 text-[11px] text-[#137333]">
                            <CheckCircle2 className="size-3.5" />
                            {app.statusLabel}
                          </span>
                          <p className="mt-1 text-[10px] leading-[15px] text-[#137333]">
                            {app.statusDesc}
                          </p>
                        </div>
                      )}
                      {app.statusType === 'ditolak' && (
                        <div className="rounded-lg bg-[#fce8e6] p-2.5 border border-[#fad2cf]">
                          <span className="face-bold flex items-center gap-1 text-[11px] text-[#c5221f]">
                            <XCircle className="size-3.5" />
                            {app.statusLabel}
                          </span>
                          <p className="mt-1 text-[10px] leading-[15px] text-[#c5221f]">
                            {app.statusDesc}
                          </p>
                        </div>
                      )}
                    </td>

                    {/* Col 6: Aksi & Berkas */}
                    <td className="py-4 pl-3 pr-6 align-top text-right">
                      {app.statusType === 'verifikasi' && (
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => onOpenDialog && onOpenDialog(`Detail ${app.id}`)}
                            className="face-semibold flex items-center gap-1 rounded-md bg-[#00513b] px-3.5 py-1.5 text-xs text-white hover:bg-[#003828]"
                          >
                            Lihat Detail →
                          </button>
                          <button
                            onClick={() => alert(`Mengunduh bukti usulan ${app.id}...`)}
                            className="flex items-center gap-1 text-[11px] text-[#707974] hover:text-[#003828] hover:underline"
                          >
                            <Download className="size-3" />
                            Unduh Bukti
                          </button>
                        </div>
                      )}
                      {app.statusType === 'selesai' && (
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => onOpenDialog && onOpenDialog(`Detail ${app.id}`)}
                            className="face-semibold flex items-center gap-1 rounded-md border border-[#dce9df] bg-white px-3.5 py-1.5 text-xs text-[#003828] hover:bg-[#ebf6ef]"
                          >
                            Lihat Detail ›
                          </button>
                          <button
                            onClick={() => alert(`Mencetak SK Penetapan ${app.id}...`)}
                            className="flex items-center gap-1 text-[11px] text-[#707974] hover:text-[#003828] hover:underline"
                          >
                            <FileText className="size-3" />
                            Cetak SK
                          </button>
                        </div>
                      )}
                      {app.statusType === 'ditolak' && (
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => onOpenDialog && onOpenDialog(`Catatan Penolakan ${app.id}`)}
                            className="face-semibold flex items-center gap-1 rounded-md bg-[#fce8e6] px-3 py-1.5 text-xs text-[#c5221f] hover:bg-[#fad2cf]"
                          >
                            <Eye className="size-3 text-[#c5221f]" />
                            Catatan Penolakan
                          </button>
                          <span className="text-[10px] text-[#707974]">Arsip Ditutup</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination */}
          <div className="flex items-center justify-between border-t border-[#ebf6ef] px-6 py-3.5 text-xs text-[#707974]">
            <p>
              Menampilkan <b className="text-[#141e19]">1 - 3</b> dari{' '}
              <b className="text-[#141e19]">3</b> Pengajuan Terdaftar
            </p>
            <div className="flex items-center gap-1">
              <button
                disabled
                className="flex size-7 items-center justify-center rounded border border-[#dce9df] text-[#bfc9c2] disabled:opacity-50"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button className="flex size-7 items-center justify-center rounded bg-[#00513b] text-white font-bold text-xs">
                1
              </button>
              <button
                disabled
                className="flex size-7 items-center justify-center rounded border border-[#dce9df] text-[#bfc9c2] disabled:opacity-50"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom 2 Cards Grid: Alur & Pusat Bantuan */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Left Card: Alur Verifikasi (8 cols) */}
          <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-xs lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="face-bold flex items-center gap-1.5 text-xs text-[#176b50]">
                  <TrendingUp className="size-4" />
                  Alur Verifikasi Bertingkat Usul Mandiri
                </span>
                <span className="text-[11px] text-[#707974]">Permensos No. 3 Th. 2021</span>
              </div>
              <h2 className="face-bold mt-2 text-base text-[#003828]">
                Bagaimana Status Usulan Anda Diproses?
              </h2>
              <p className="face-regular mt-1 text-xs leading-[18px] text-[#57605d]">
                Setiap pendaftaran melalui portal warga melalui serangkaian pencocokan data NIK Dukcapil,
                verifikasi faktual lapangan oleh petugas Puskesos, hingga musyawarah kelurahan.
              </p>

              {/* 4 Steps */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg bg-[#f1fcf4] p-3 border border-[#dce9df]">
                  <span className="text-[10px] font-bold text-[#176b50] uppercase">TAHAP 1</span>
                  <strong className="block text-xs font-bold text-[#003828] mt-1">
                    Submit Mandiri
                  </strong>
                  <p className="text-[10px] leading-[14px] text-[#57605d] mt-1">
                    Validasi NIK Dukcapil secara real-time.
                  </p>
                </div>

                <div className="rounded-lg bg-[#f1fcf4] p-3 border border-[#dce9df]">
                  <span className="text-[10px] font-bold text-[#176b50] uppercase">TAHAP 2</span>
                  <strong className="block text-xs font-bold text-[#003828] mt-1">
                    Visitasi Lapangan
                  </strong>
                  <p className="text-[10px] leading-[14px] text-[#57605d] mt-1">
                    Survei kondisi sosial ekonomi & geotagging.
                  </p>
                </div>

                <div className="rounded-lg bg-[#f1fcf4] p-3 border border-[#dce9df]">
                  <span className="text-[10px] font-bold text-[#176b50] uppercase">TAHAP 3</span>
                  <strong className="block text-xs font-bold text-[#003828] mt-1">
                    Muskel / Muskeldos
                  </strong>
                  <p className="text-[10px] leading-[14px] text-[#57605d] mt-1">
                    Persetujuan lurah dan tokoh masyarakat.
                  </p>
                </div>

                <div className="rounded-lg bg-[#f1fcf4] p-3 border border-[#dce9df]">
                  <span className="text-[10px] font-bold text-[#176b50] uppercase">TAHAP 4</span>
                  <strong className="block text-xs font-bold text-[#003828] mt-1">
                    Penetapan DTKS
                  </strong>
                  <p className="text-[10px] leading-[14px] text-[#57605d] mt-1">
                    Pengesahan SK Mensos RI secara berkala.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Duration Strip */}
            <div className="mt-5 rounded-lg bg-[#ebf6ef] p-3.5 flex items-center justify-between border border-[#b5efd8]">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#00513b] text-white text-xs font-bold">
                  66%
                </div>
                <div>
                  <strong className="block text-xs text-[#003828]">
                    Rata-rata Durasi Verifikasi: 14 Hari Kerja
                  </strong>
                  <p className="text-[11px] text-[#57605d]">
                    Usulan aktif Anda (TB-2025-BDG-0892) berjalan di hari ke-4 dengan estimasi hasil 05 Nov 2025.
                  </p>
                </div>
              </div>
              <CheckCircle2 className="size-4 text-[#176b50] shrink-0" />
            </div>
          </div>

          {/* Right Card: Pusat Bantuan Warga (4 cols) */}
          <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-xs lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="face-bold flex items-center gap-1.5 text-xs text-[#176b50]">
                <HelpCircle className="size-4" />
                Pusat Bantuan Warga (SLRT)
              </span>
              <h2 className="face-bold mt-2 text-base text-[#003828]">
                Perlu Pendampingan Usulan?
              </h2>
              <p className="face-regular mt-1 text-xs leading-[18px] text-[#57605d]">
                Jika ada kendala dokumen atau perubahan data kemiskinan ekstrem di keluarga Anda,
                hubungi koordinator pendamping resmi kecamatan Anda.
              </p>

              {/* Officer Card */}
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#ebf6ef]/60 p-3 border border-[#dce9df]">
                <img
                  src="/assets/bc596.png"
                  alt="Petugas SLRT"
                  className="size-12 rounded-lg object-cover"
                />
                <div>
                  <strong className="block text-xs font-bold text-[#003828]">
                    Siti Marwah, S.Sos
                  </strong>
                  <p className="text-[10px] text-[#57605d]">
                    Pendamping SLRT Kec. Bandung Kulon
                  </p>
                  <span className="text-[10px] font-semibold text-[#176b50]">
                    Siap Melayani Konsultasi
                  </span>
                </div>
              </div>
            </div>

            {/* Officer Action Buttons */}
            <div className="mt-5 space-y-2">
              <button
                onClick={() => alert('Membuka WhatsApp konsultasi pendamping SLRT...')}
                className="face-semibold flex w-full items-center justify-center gap-2 rounded-lg bg-[#00513b] py-2.5 text-xs text-white shadow-xs hover:bg-[#003828]"
              >
                <MessageCircle className="size-4" />
                Konsultasi via WhatsApp SLRT
              </button>
              <button
                onClick={() => alert('Hotline Sekretariat Puskesos: (022) 6012-889')}
                className="face-semibold flex w-full items-center justify-center gap-2 rounded-lg border border-[#bfc9c2]/50 bg-white py-2 text-xs text-[#003828] hover:bg-[#ebf6ef]"
              >
                <Phone className="size-3.5" />
                Kontak Sekretariat Puskesos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

