import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Share2,
  Phone,
  Mail,
  Building,
  User,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  BookOpen,
  QrCode,
  MapPin,
  TrendingUp,
  FileText,
  Copy,
} from 'lucide-react';

export default function PressRelease({ onNavigate }) {
  // 'list' atau 'detail'
  const [viewMode, setViewMode] = useState('list');
  const [selectedArticleId, setSelectedArticleId] = useState('pr-01');
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    'Semua Kategori',
    'Penyaluran Bansos',
    'Akuntabilitas & Sanggah',
    'Regulasi & Kebijakan',
    'Teknologi & Verivail',
    'Wilayah Percontohan',
  ];
  const [activeCategory, setActiveCategory] = useState('Semua Kategori');
  const [selectedRegion, setSelectedRegion] = useState('Jawa Barat (Pilot Area)');
  const [selectedYear, setSelectedYear] = useState('Tahun 2025');
  const [searchQuery, setSearchQuery] = useState('');

  // Main Featured Release
  const featuredRelease = {
    id: 'pr-01',
    badge: 'SIARAN PERS TERKINI • 24 OKTOBER 2025',
    subBadge: 'Prioritas Wilayah',
    title:
      'Penyaluran Bantuan Sembako & PKH Tahap III Wilayah Jawa Barat Resmi Dimulai dengan Sistem QR Verifikasi Digital',
    desc:
      'Sebanyak 420.000 Keluarga Penerima Manfaat (KPM) di Kota Bandung dan Kabupaten Garut mulai menerima alokasi bahan pangan pokok dan transfer tunai bersyarat. Sistem QR code dinamis diterapkan untuk memastikan nol potongan pungutan liar.',
    author: 'Humas Terpadu Kemensos & Pemprov Jabar',
    readTime: '4 Menit',
    pressNo: '142/HM/2025',
    location: 'Simulasi Distribusi Sembako • Kelurahan Maleber, Bandung',
    img: '/assets/bc596.png',
  };

  // Grid News List
  const newsList = [
    {
      id: 'pr-02',
      category: 'Akuntabilitas',
      categoryColor: 'bg-[#ebf6ef] text-[#00513b]',
      readTime: '3 mnt baca',
      date: '18 Oktober 2025',
      location: 'Kota Bandung',
      title: 'Mekanisme Sanggah Mandiri Diluncurkan untuk Mencegah Pemotongan Liar di Tingkat...',
      desc: 'Warga kini dapat mengajukan sanggahan dan keberatan atas data penerima yang tidak tepat sasaran secara anonim lewat ponsel dengan jaminan perlindungan saksi terenkripsi.',
      author: 'Bagian Pengawasan',
      img: '/assets/182b1.png',
    },
    {
      id: 'pr-03',
      category: 'Laporan Kinerja',
      categoryColor: 'bg-[#ebf6ef] text-[#00513b]',
      readTime: '5 mnt baca',
      date: '10 Oktober 2025',
      location: 'Auditor Publik',
      title: 'Laporan Transparansi Bansos Semester I 2025: Efisiensi Naik Signifikan Berkat Verifikasi Digital',
      desc: 'Penghematan anggaran salah sasaran mencapai Rp 41,8 Miliar berkat pemadanan data real-time berbasis geolokasi dan biometrik warga Jawa Barat.',
      author: 'Pusat Data Nasional',
      img: '/assets/7399a.png',
    },
    {
      id: 'pr-04',
      category: 'Teknologi & Verivail',
      categoryColor: 'bg-[#ebf6ef] text-[#00513b]',
      readTime: '4 mnt baca',
      date: '28 September 2025',
      location: 'Disdukcapil • DTKS',
      title: 'Rekonsiliasi NIK dan DTKS Kota Bandung Tembus 99.8% Padan Dukcapil',
      desc: 'Penyelarasan nomor identitas kependudukan berhasil memangkas data ganda sebesar 18.290 catatan di 30 kecamatan se-Kota Bandung secara tuntas.',
      author: 'Tim Verivail Terpadu',
      img: '/assets/b7571.png',
    },
    {
      id: 'pr-05',
      category: 'Wilayah Percontohan',
      categoryColor: 'bg-[#ebf6ef] text-[#00513b]',
      readTime: '6 mnt baca',
      date: '15 September 2025',
      location: 'Kab. Garut',
      title: 'Pendamping Sosial Wilayah Garut Rampungkan Verifikasi Fisik 12.430 Usulan...',
      desc: 'Petugas lapangan melakukan validasi faktual langsung ke pelosok 42 kecamatan guna mencocokkan kelayakan indikator desil kemiskinan ekstrem.',
      author: 'Dinsos Garut',
      img: '/assets/bc596.png',
    },
    {
      id: 'pr-06',
      category: 'Regulasi & Kebijakan',
      categoryColor: 'bg-[#ebf6ef] text-[#00513b]',
      readTime: '3 mnt baca',
      date: '02 September 2025',
      location: 'SOP Resmi',
      title: 'Panduan Baru: Penanganan Pengaduan Bansos Dijamin Respons Maksimal 3.2 Hari Kerja',
      desc: 'Surat Edaran Bersama menetapkan Service Level Agreement (SLA) ketat bagi seluruh unit posko pengaduan di dinas sosial kabupaten/kota percontohan.',
      author: 'Biro Hukum & Organisasi',
      img: '/assets/182b1.png',
    },
    {
      id: 'pr-07',
      category: 'Penyaluran Bansos',
      categoryColor: 'bg-[#ebf6ef] text-[#00513b]',
      readTime: '4 mnt baca',
      date: '20 Agustus 2025',
      location: 'Pos & Himbara',
      title: 'Jadwal Operasional Pos Indonesia & Bank Himbara untuk Distribusi Komunitas Terpencil...',
      desc: 'Skema "door-to-door" diterjunkan khusus bagi kelompok rentan lansia tunggal dan disabilitas berat yang tidak dapat hadir langsung ke kantor perwakilan.',
      author: 'Satgas Logistik Bansos',
      img: '/assets/7399a.png',
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f1fcf4] text-[#3f4944] pt-20 pb-20">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center justify-between text-xs text-[#57605d]" aria-label="Breadcrumb">
          <div className="flex items-center gap-1.5">
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
              Press Release
            </button>
            {viewMode === 'detail' && (
              <>
                <span>/</span>
                <span className="font-semibold text-[#003828] truncate max-w-xs">
                  Penyaluran Bantuan Sembako & PKH Tahap III
                </span>
              </>
            )}
          </div>

          {viewMode === 'detail' && (
            <button
              onClick={() => setViewMode('list')}
              className="flex items-center gap-1 text-[#00513b] font-semibold hover:underline"
            >
              <ChevronLeft className="size-3.5" /> Kembali ke Daftar Siaran Pers
            </button>
          )}
        </nav>

        {/* ========================================================================= */}
        {/* TAMPILAN 1: LIST / DAFTAR BERITA & RILIS TERKINI (PAGE LIST)             */}
        {/* ========================================================================= */}
        {viewMode === 'list' && (
          <div className="mt-3 space-y-4">
            
            {/* Header Siaran Pers */}
            <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#ebf6ef] px-2.5 py-0.5 text-[10px] font-bold text-[#00513b]">
                  📢 PEMBERITAAN RESMI & TRANSPARANSI KEBIJAKAN
                </span>
              </div>
              <h1 className="face-bold mt-2 text-xl text-[#003828] sm:text-2xl">
                Siaran Pers & Kabar Kebijakan Bantuan Sosial
              </h1>
              <p className="face-regular mt-1 text-xs leading-relaxed text-[#57605d] max-w-2xl">
                Informasi resmi terkait penyaluran bantuan sosial, jadwal distribusi bertahap, pemutakhiran data DTKS, hasil evaluasi uji petik lapangan, dan pengumuman regulasi bagi masyarakat.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#ebf6ef] pt-3 text-[10px] text-[#707974]">
                <span className="flex items-center gap-1">
                  ● Update Berkala Setiap Hari Kerja
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  📄 Total 28 Dokumen Terpublikasi
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  🗂 Arsip Digital Terbuka
                </span>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs space-y-3">
              <div className="grid gap-2 sm:grid-cols-12">
                <div className="relative sm:col-span-6">
                  <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#707974]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari siaran pers, topik kebijakan, atau kata kunci..."
                    className="h-9 w-full rounded-lg border border-[#dce9df] bg-[#f8fdfa] pl-8 pr-3 text-xs text-[#003828] outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="h-9 w-full rounded-lg border border-[#dce9df] bg-white px-2.5 text-xs text-[#003828] outline-none"
                  >
                    <option>Jawa Barat (Pilot Area)</option>
                    <option>DKI Jakarta</option>
                    <option>Jawa Tengah</option>
                    <option>Jawa Timur</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="h-9 w-full rounded-lg border border-[#dce9df] bg-white px-2.5 text-xs text-[#003828] outline-none"
                  >
                    <option>Tahun 2025</option>
                    <option>Tahun 2024</option>
                    <option>Tahun 2023</option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <button className="flex h-9 w-full items-center justify-center gap-1 rounded-lg border border-[#dce9df] bg-[#f8fdfa] text-xs font-semibold text-[#003828] hover:bg-white">
                    Terbaru
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 border-t border-[#ebf6ef] pt-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      activeCategory === cat
                        ? 'bg-[#003828] text-white'
                        : 'bg-white border border-[#dce9df] text-[#57605d] hover:border-[#b5efd8] hover:text-[#003828]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Article Card (Horizontal Big Banner) */}
            <div className="overflow-hidden rounded-xl border border-black/[0.05] bg-white shadow-xs">
              <div className="grid gap-0 lg:grid-cols-12">
                <div className="relative aspect-video lg:aspect-auto lg:col-span-6 bg-gray-200">
                  <img
                    src={featuredRelease.img}
                    alt={featuredRelease.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 text-[10px] text-white flex items-center justify-between">
                    <span>📷 {featuredRelease.location}</span>
                    <span className="font-semibold">DOK. KEMENSOS</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-5 lg:col-span-6 lg:p-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#00513b] px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                        {featuredRelease.badge}
                      </span>
                      <span className="rounded bg-[#ebf6ef] px-2 py-0.5 text-[9px] font-semibold text-[#00513b]">
                        {featuredRelease.subBadge}
                      </span>
                    </div>

                    <h2 className="face-bold mt-2.5 text-lg text-[#003828] sm:text-xl leading-snug">
                      {featuredRelease.title}
                    </h2>

                    <p className="mt-2 text-xs leading-relaxed text-[#57605d]">
                      {featuredRelease.desc}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 border-t border-[#ebf6ef] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <strong className="block text-xs text-[#003828]">{featuredRelease.author}</strong>
                      <span className="text-[10px] text-[#707974]">
                        Waktu Baca: {featuredRelease.readTime} • Rilis No: {featuredRelease.pressNo}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedArticleId('pr-01');
                        setViewMode('detail');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="face-semibold flex items-center justify-center gap-1.5 rounded-lg bg-[#00513b] px-4 py-2.5 text-xs text-white shadow-xs hover:bg-[#003828] transition shrink-0"
                    >
                      Baca Siaran Pers Lengkap <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Header: Daftar Berita & Rilis Terkini */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <h3 className="face-bold text-base text-[#003828]">Daftar Berita & Rilis Terkini</h3>
                <p className="text-[11px] text-[#707974]">Arsip pemutakhiran berkala transparansi bantuan sosial di wilayah pilot & nasional.</p>
              </div>
              <span className="hidden sm:flex items-center gap-1 rounded bg-[#ebf6ef] px-2.5 py-1 text-[10px] font-semibold text-[#00513b]">
                <CheckCircle2 className="size-3" /> Terverifikasi Pusdatin
              </span>
            </div>

            {/* 6 Grid Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {newsList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedArticleId(item.id);
                    setViewMode('detail');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-black/[0.05] bg-white shadow-xs hover:shadow-md transition cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-video w-full bg-gray-200 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <span className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[9px] font-semibold text-white">
                        {item.category}
                      </span>
                      <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.2 text-[8px] text-white">
                        {item.readTime}
                      </span>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-1.5 text-[10px] text-[#707974]">
                        <Calendar className="size-3" />
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                      </div>

                      <strong className="mt-2 block text-xs text-[#003828] group-hover:text-[#176b50] leading-snug line-clamp-2">
                        {item.title}
                      </strong>

                      <p className="mt-1.5 text-[11px] text-[#57605d] leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#ebf6ef] p-4 pt-3 text-[10px]">
                    <span className="text-[#707974]">{item.author}</span>
                    <span className="flex items-center gap-1 font-semibold text-[#00513b] group-hover:underline">
                      Rincian <ChevronRight className="size-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Bar */}
            <div className="flex flex-col gap-2 rounded-xl border border-black/[0.05] bg-white p-3.5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-[#57605d]">
                Menampilkan <strong>1 – 7</strong> dari <strong>28</strong> Siaran Pers
              </span>

              <div className="flex items-center gap-1">
                <button className="flex size-7 items-center justify-center rounded border border-[#dce9df] text-xs text-[#707974] hover:bg-gray-50">
                  ‹
                </button>
                <button className="flex size-7 items-center justify-center rounded bg-[#003828] text-xs font-bold text-white">
                  1
                </button>
                <button className="flex size-7 items-center justify-center rounded border border-[#dce9df] text-xs text-[#57605d] hover:bg-gray-50">
                  2
                </button>
                <button className="flex size-7 items-center justify-center rounded border border-[#dce9df] text-xs text-[#57605d] hover:bg-gray-50">
                  3
                </button>
                <button className="flex size-7 items-center justify-center rounded border border-[#dce9df] text-xs text-[#57605d] hover:bg-gray-50">
                  4
                </button>
                <button className="flex size-7 items-center justify-center rounded border border-[#dce9df] text-xs text-[#707974] hover:bg-gray-50">
                  ›
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAMPILAN 2: DETAIL ARTIKEL SIARAN PERS (PAGE DETAIL)                      */}
        {/* ========================================================================= */}
        {viewMode === 'detail' && (
          <div className="mt-3 space-y-4">
            
            {/* Header Detail */}
            <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-7">
              <h1 className="face-bold text-xl text-[#003828] sm:text-2xl lg:text-3xl leading-snug">
                Penyaluran Bantuan Sembako & PKH Tahap III Wilayah Jawa Barat Resmi Dimulai dengan Sistem QR Verifikasi Digital
              </h1>
              <p className="mt-2 text-xs leading-relaxed text-[#57605d] sm:text-sm">
                Inovasi pelacakan digital tanpa perantara memastikan 420.000 Keluarga Penerima Manfaat (KPM) menerima hak bantuan sosial 100% utuh tanpa potongan liar melalui validasi presisi e-KTP dan data kependudukan terkini.
              </p>

              {/* Meta Grid & Action Bar */}
              <div className="mt-5 grid gap-3 sm:grid-cols-4 border-t border-[#ebf6ef] pt-4 text-xs">
                <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#707974]">TANGGAL RILIS</span>
                  <strong className="mt-0.5 block text-xs text-[#003828]">24 Okt 2025, 09:30 WIB</strong>
                </div>

                <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#707974]">NOMOR SIARAN PERS</span>
                  <strong className="mt-0.5 block font-mono text-xs text-[#003828]">281/2025/11/HM.3-TIX</strong>
                </div>

                <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#707974]">PENULIS / SUMBER</span>
                  <strong className="mt-0.5 block text-xs text-[#003828]">Biro Humas & Data Terpadu</strong>
                </div>

                <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-2.5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#707974]">WILAYAH CAKUPAN</span>
                    <strong className="mt-0.5 block text-xs text-[#003828]">Jawa Barat (Pilot Wilayah)</strong>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-1 rounded border border-[#dce9df] bg-white px-2 py-1 text-[10px] font-semibold text-[#003828] hover:bg-[#ebf6ef]"
                    >
                      <Copy className="size-3" /> {copiedLink ? 'Disalin' : 'Salin'}
                    </button>
                    <button
                      onClick={() => alert('Fitur berbagi WhatsApp dibuka')}
                      className="flex items-center gap-1 rounded bg-[#ebf6ef] px-2 py-1 text-[10px] font-semibold text-[#00513b] hover:bg-[#d8f0e1]"
                    >
                      <Share2 className="size-3" /> WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Split Content: Main Article & Right Sidebar */}
            <div className="grid gap-4 lg:grid-cols-12">
              
              {/* Kolom Kiri: Isi Berita & Indikator Penyaluran */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* Gambar Utama Artikel */}
                <div className="overflow-hidden rounded-xl border border-black/[0.05] bg-white shadow-xs">
                  <div className="relative aspect-video w-full bg-gray-200">
                    <img
                      src="/assets/bc596.png"
                      alt="Penyaluran Bantuan Sembako"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-[9px] text-white">
                      📷 Garut, Dokumentasi Terpadu
                    </div>
                  </div>
                  <div className="p-3 text-[10px] text-[#57605d] bg-[#f8fdfa] border-t border-[#ebf6ef]">
                    <strong>Dokumentasi Faktual:</strong> Pendamping sosial bersama perangkat Pos Indonesia dan perwakilan himpunan bank milik negara (Himbara) melakukan verifikasi identitas e-KTP dan memindai kode QR unik keluarga penerima di Balai Pertemuan Kecamatan Tarogong Kidul, Kabupaten Garut, Kamis (24/10/2025).
                  </div>
                </div>

                {/* Quote Box Ringkasan Eksekutif */}
                <div className="rounded-xl border border-[#b5efd8] bg-[#ebf6ef] p-4 text-[#003828]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#176b50]">
                    RINGKASAN EKSEKUTIF
                  </span>
                  <blockquote className="mt-1 text-xs italic leading-relaxed sm:text-sm">
                    "Tahap IV Penyaluran Bantuan Sembako dan Program Keluarga Harapan (PKH) tahun anggaran 2025 di Provinsi Jawa Barat resmi menargetkan 420.000 Keluarga Penerima Manfaat. Integrasi sistem validasi QR real-time dan keterbukaan audit mandiri TepatBantu menutup celah pungutan liar, memastikan dana langsung diterima warga utuh 100%."
                  </blockquote>
                </div>

                {/* Paragraf Utama Berita */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs space-y-3.5 text-xs sm:text-sm text-[#141e19] leading-relaxed">
                  <p>
                    <strong>BANDUNG, KOMINFO / KEMENSOS RI —</strong> Satuan Tugas Penyaluran Jaminan Sosial Terpadu resmi meluncurkan pendistribusian dana Program Keluarga Harapan (PKH) serta Bantuan Sosial Sembako untuk kuartal ketiga tahun 2025 di kawasan Jawa Barat. Program ini mengawali agenda desentralisasi verifikasi berbasis kodefikasi QR digital di dua lokasi percontohan utama: area urban Kota Bandung dan kawasan rural agraris Kabupaten Garut.
                  </p>

                  <p>
                    Penerapan skema QR ini merupakan tindak lanjut langsung dari evaluasi tata kelola triwulan sebelumnya. Berdasarkan evaluasi tersebut, kendala distribusi manual kerap memicu keterlambatan rekonsiliasi bank dan ketidaksesuaian nomor rekening. Melalui aplikasi TepatBantu yang kini terhubung secara otomatis ke basis data kependudukan nasional, identitas penerima diverifikasi langsung dalam hitungan detik di loket pembayaran tanpa perantara RT/RW maupun pihak ketiga yang tidak berwenang.
                  </p>

                  {/* Indikator Kuota & Penyaluran Card */}
                  <div className="my-4 rounded-xl border border-[#b5efd8] bg-[#f8fdfa] p-4 text-xs">
                    <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-2.5">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#176b50]">
                          INDIKATOR KUOTA & PENYALURAN
                        </span>
                        <h4 className="face-bold text-sm text-[#003828]">
                          Sasaran & Alokasi Tahap III Jawa Barat
                        </h4>
                      </div>
                      <span className="rounded bg-[#e6f4ea] px-2 py-0.5 text-[9px] font-semibold text-[#137333]">
                        Status Operasional: Berjalan
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div className="rounded-lg bg-white p-2.5 border border-[#dce9df]">
                        <span className="text-[9px] uppercase tracking-wider text-[#707974]">TOTAL PENERIMA (KPM)</span>
                        <strong className="mt-0.5 block text-base font-bold text-[#003828]">420.000</strong>
                        <span className="text-[9px] text-[#176b50]">JJ Terdaftar DTKS</span>
                      </div>

                      <div className="rounded-lg bg-white p-2.5 border border-[#dce9df]">
                        <span className="text-[9px] uppercase tracking-wider text-[#707974]">TARGET PENYERAPAN</span>
                        <strong className="mt-0.5 block text-base font-bold text-[#003828]">98,5%</strong>
                        <span className="text-[9px] text-[#176b50]">Maksimal H+14 Hari</span>
                      </div>

                      <div className="rounded-lg bg-white p-2.5 border border-[#dce9df]">
                        <span className="text-[9px] uppercase tracking-wider text-[#707974]">MITRA PENYALUR RESMI</span>
                        <strong className="mt-0.5 block text-xs font-bold text-[#003828]">Pos & Himbara</strong>
                        <span className="text-[9px] text-[#57605d]">BRI, BNI, Mandiri & PT Pos</span>
                      </div>

                      <div className="rounded-lg bg-white p-2.5 border border-[#dce9df]">
                        <span className="text-[9px] uppercase tracking-wider text-[#707974]">JENDELA DISTRIBUSI</span>
                        <strong className="mt-0.5 block text-xs font-bold text-[#003828]">24 Okt – 15 Nov</strong>
                        <span className="text-[9px] text-[#57605d]">Tahun Anggaran 2025</span>
                      </div>
                    </div>

                    <div className="mt-3 rounded-lg bg-white p-2.5 border border-[#dce9df]">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[#57605d]">Rasio Kesiapan Penyaluran per Wilayah Pilot</span>
                        <span className="font-bold text-[#003828]">100% Terjadwal</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-[#707974]">
                        <span>● Kota Bandung (30 Kecamatan – 243.600 KPM)</span>
                        <span>● Kab. Garut (42 Kecamatan – 176.400 KPM)</span>
                      </div>
                    </div>
                  </div>

                  <p>
                    Di wilayah Kota Bandung, proses pencairan difokuskan melalui jaringan kantor pos kecamatan terpadu serta gerai ATM Bank Himbara terdekat bagi pemegang Kartu Keluarga Sejahtera (KKS). Sementara itu, untuk wilayah Kabupaten Garut yang memiliki karakteristik demografi berbukit dan pedesaan yang tersebar, PT Pos Indonesia mengesahkan armada juru bayar bergerak (mobile disbursement officer) hingga ke kantor desa dan dusun terdalam.
                  </p>

                  <p>
                    Hal senada diungkapkan oleh penerima manfaat asal Kelurahan Sukagalih, Tarogong Kidul, Garut. Kehadiran mekanisme verifikasi visual dan notifikasi terbuka dinilai memberikan rasa aman serta kepastian bagi masyarakat.
                  </p>

                  {/* Testimonial Box */}
                  <div className="rounded-xl border border-[#dce9df] bg-[#f8fdfa] p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-9 items-center justify-center rounded-full bg-[#00513b] text-white text-xs font-bold">
                        EN
                      </div>
                      <div>
                        <strong className="block text-xs text-[#003828]">Ibu Eneng Rohayati (48 tahun)</strong>
                        <span className="text-[10px] text-[#707974]">Keluarga Penerima Manfaat PKH Komponen Pendidikan Anak, Garut</span>
                      </div>
                    </div>
                    <p className="mt-2.5 text-xs italic text-[#57605d] leading-relaxed">
                      "Alhamdulillah, proses tahun ini jauh lebih tertib dan tenang. Waktu datang ke balai desa hanya perlu memperlihatkan KTP asli dan surat undangan ber-barcode dari aplikasi. Tidak ada antre berdesakan berjam-jam, dan nominal yang saya terima utuh Rp750.000 untuk keperluan sekolah dua anak saya tanpa dipotong sepeser pun."
                    </p>
                  </div>

                  <p>
                    Seluruh data penyaluran per kelurahan di Kota Bandung dan Kabupaten Garut kini dapat dipantau oleh publik secara transparan pada sub-halaman Data Faktual portal TepatBantu, mencakup nominal tersalurkan, persentase keberhasilan transaksi, hingga nomor kontak posko komplain kewilayahan.
                  </p>
                </div>

              </div>

              {/* Kolom Kanan: Narahubung Media, Rangkuman Butir & Berita Terkait */}
              <div className="lg:col-span-4 space-y-4">
                
                {/* 1. Narahubung & Media */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs">
                  <div className="flex items-center gap-1.5 border-b border-[#ebf6ef] pb-2.5">
                    <Phone className="size-4 text-[#176b50]" />
                    <strong className="text-xs text-[#003828]">Narahubung & Media</strong>
                  </div>
                  <p className="mt-2 text-[10px] text-[#707974]">
                    Untuk permintaan wawancara resmi, konfirmasi verifikasi data, atau liputan lapangan jurnalis:
                  </p>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="rounded-lg bg-[#f8fdfa] p-2.5 border border-[#ebf6ef]">
                      <span className="text-[9px] uppercase tracking-wider text-[#707974]">BIRO HUMAS & PROTOKOL</span>
                      <strong className="block text-[#003828] mt-0.5">Sekretariat Jenderal Satgas Bansos</strong>
                      <span className="mt-1 block text-[10px] text-[#57605d]">✉ humas-bansos@kemensos.go.id</span>
                      <span className="text-[10px] text-[#57605d]">☎ (021) 310-3459 / Faks 2011</span>
                    </div>

                    <div className="rounded-lg bg-[#f8fdfa] p-2.5 border border-[#ebf6ef]">
                      <span className="text-[9px] uppercase tracking-wider text-[#707974]">POSKO ADUAN CEPAT WARGA</span>
                      <strong className="block text-[#003828] mt-0.5">Kanal Lapor Pungli Jawa Barat</strong>
                      <span className="mt-1 block text-[10px] text-[#57605d]">☎ Hotline 171 (Bebas Pulsa)</span>
                      <span className="text-[10px] text-[#57605d]">💬 WhatsApp Pengaduan: 0811-2025-999</span>
                    </div>
                  </div>
                </div>

                {/* 2. Rangkuman Butir Kebijakan */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs">
                  <div className="flex items-center gap-1.5 border-b border-[#ebf6ef] pb-2.5">
                    <FileText className="size-4 text-[#176b50]" />
                    <strong className="text-xs text-[#003828]">Rangkuman Butir Kebijakan</strong>
                  </div>

                  <ul className="mt-2.5 space-y-2 text-[11px] text-[#57605d]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#176b50] font-bold">✓</span>
                      <span><strong>Notifikasi Penebusan:</strong> KPM cukup membawa e-KTP asli dan barcode undangan resmi.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#176b50] font-bold">✓</span>
                      <span><strong>Tanpa Biaya Admin:</strong> Penyaluran 100% bebas potongan dan biaya penanganan apa pun.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#176b50] font-bold">✓</span>
                      <span><strong>Layanan Jemput Bola:</strong> Lansia dan warga sakit disabilitas berat dilayani langsung di rumah.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#176b50] font-bold">✓</span>
                      <span><strong>Audit Publik:</strong> Laporan serapan anggaran terbit harian pada dashboard transparansi TepatBantu.</span>
                    </li>
                  </ul>
                </div>

                {/* 3. Siaran Pers Terkait */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-2.5">
                    <strong className="text-xs text-[#003828]">Siaran Pers Terkait</strong>
                    <span className="text-[9px] font-semibold text-[#176b50] uppercase">LIHAT SEMUA</span>
                  </div>

                  <div className="mt-3 space-y-3">
                    {[
                      {
                        date: '18 Okt 2025',
                        title: 'Pemutakhiran DTKS Triwulan IV Tuntaskan 94.000 Koreksi Data...',
                        img: '/assets/182b1.png',
                      },
                      {
                        date: '12 Okt 2025',
                        title: 'Layanan Antar Ramah bagi KPM Disabilitas dan Lansia Diperluas ke...',
                        img: '/assets/7399a.png',
                      },
                      {
                        date: '05 Okt 2025',
                        title: 'Kemenkeu & Kemensos Terbitkan Petunjuk Teknis Integrasi Rekening...',
                        img: '/assets/b7571.png',
                      },
                    ].map((rel, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedArticleId('pr-02');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex gap-2.5 cursor-pointer group"
                      >
                        <img
                          src={rel.img}
                          alt={rel.title}
                          className="size-12 shrink-0 rounded-lg object-cover"
                        />
                        <div>
                          <span className="text-[9px] text-[#707974]">{rel.date}</span>
                          <strong className="block text-[11px] text-[#003828] group-hover:text-[#176b50] line-clamp-2 leading-snug">
                            {rel.title}
                          </strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

