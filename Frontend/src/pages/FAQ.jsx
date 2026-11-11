import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Users,
  AlertTriangle,
  Phone,
  MessageCircle,
  ExternalLink,
  BookOpen,
  Send,
  Building,
  Lock,
} from 'lucide-react';

export default function FAQ({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState([0, 1]); // item pertama terbuka

  const categories = [
    'Semua',
    'Cek Status Bansos',
    'Usulan Mandiri & DTKS',
    'Sanggah & Pengaduan',
    'Penyaluran & Rekening',
    'Keamanan & Privasi',
  ];

  const faqData = [
    {
      category: 'Cek Status Bansos',
      q: 'Bagaimana cara mengecek apakah saya terdaftar sebagai penerima bantuan sosial?',
      a: 'Anda dapat membuka menu "Cek Bansos" pada portal TepatBantu, lalu memasukkan 16 digit Nomor Induk Kependudukan (NIK) sesuai e-KTP dan wilayah domisili Anda. Sistem akan mencocokkan data secara real-time dengan basis data Kementerian Sosial dan Dinas Kependudukan untuk menampilkan kepesertaan PKH, BPNT, atau BLT.',
    },
    {
      category: 'Cek Status Bansos',
      q: 'Mengapa status NIK saya dinyatakan "Tidak Ditemukan" atau "Belum Terdaftar"?',
      a: 'Hal ini biasanya terjadi apabila NIK Anda belum padan dengan data kependudukan Dukcapil pusat, atau keluarga Anda belum masuk ke dalam Data Terpadu Kesejahteraan Sosial (DTKS). Anda dapat mengajukan pendaftaran secara mandiri melalui menu "Pengajuan Saya" atau berkonsultasi ke kantor kelurahan setempat.',
    },
    {
      category: 'Usulan Mandiri & DTKS',
      q: 'Apa saja syarat dan dokumen yang harus disiapkan untuk mengajukan Usulan Mandiri?',
      a: 'Dokumen utama yang diperlukan adalah: (1) Foto e-KTP asli kepala keluarga/anggota keluarga, (2) Foto Kartu Keluarga ber-barcode sah, (3) Tiga sudut foto fisik rumah (tampak depan, ruang tamu/lantai, dapur/sanitasi), serta (4) Foto struk rekening listrik PLN terakhir. Surat Keterangan Tidak Mampu (SKTM) bersifat opsional.',
    },
    {
      category: 'Usulan Mandiri & DTKS',
      q: 'Berapa lama proses verifikasi lapangan setelah usulan mandiri dikirimkan?',
      a: 'Verifikasi berkas digital di sistem rata-rata memakan waktu 1–3 hari kerja. Setelah itu, Petugas Pendamping Sosial (SLRT/Puskesos) akan menjadwalkan kunjungan uji petik faktual ke alamat rumah Anda dalam kurun waktu 7–14 hari kerja untuk validasi 14 indikator kemiskinan BPS.',
    },
    {
      category: 'Sanggah & Pengaduan',
      q: 'Apakah identitas saya aman saat melaporkan warga mampu yang menerima bansos (Fitur Sanggah)?',
      a: 'Sangat aman dan terjamin. TepatBantu menerapkan standar perlindungan saksi sesuai UU No. 27 Tahun 2022 (UU PDP). Identitas pelapor dienkripsi secara penuh menggunakan signature SHA-256 dan disamarkan dari publik maupun pihak terlapor. Anda juga dapat memilih mode "Anonim Penuh" saat membuat pengaduan.',
    },
    {
      category: 'Sanggah & Pengaduan',
      q: 'Apa yang harus dilakukan jika ada oknum yang memotong dana bansos (Pungutan Liar)?',
      a: 'Segera laporkan melalui menu "Pengaduan Saya" dengan memilih kategori "Dugaan Pungli / Potongan". Sertakan bukti kuitansi pemotongan, foto, atau rekaman jika ada. Seluruh penyaluran bansos adalah 100% BEBAS BIAYA. Laporan Anda akan langsung diteruskan ke Satgas Saber Pungli wilayah dan dinas sosial terkait.',
    },
    {
      category: 'Penyaluran & Rekening',
      q: 'Bagaimana mekanisme pencairan dana bansos bagi warga lansia atau disabilitas berat?',
      a: 'Bagi penerima manfaat lansia tunggal atau disabilitas berat yang tidak memungkinkan hadir ke kantor pos atau mesin ATM Bank Himbara, PT Pos Indonesia bersama pendamping sosial menyediakan layanan antar langsung ke rumah (skema jemput bola / door-to-door) tanpa dikenakan biaya tambahan.',
    },
    {
      category: 'Penyaluran & Rekening',
      q: 'Apakah ada biaya administrasi saat mencairkan bantuan PKH atau BPNT?',
      a: 'Tidak ada sama sekali. Penyaluran bantuan sosial resmi Kemensos melalui Himbara (BRI, BNI, Mandiri, BTN) dan PT Pos Indonesia bebas potongan biaya administrasi perbankan maupun biaya penanganan apa pun.',
    },
    {
      category: 'Keamanan & Privasi',
      q: 'Bagaimana TepatBantu melindungi data kependudukan dan NIK warga?',
      a: 'TepatBantu beroperasi di bawah protokol enkripsi data kependudukan tingkat tinggi, terintegrasi langsung dengan API resmi SIAK Terpadu Kemendagri dan Pusdatin Kemensos RI. Data pribadi Anda hanya digunakan untuk keperluan verifikasi kelayakan bantuan sosial dan tidak pernah diserahkan kepada pihak ketiga komersial.',
    },
  ];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory =
      activeCategory === 'Semua' || item.category === activeCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((i) => i !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
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
          <span>/</span>
          <span className="font-semibold text-[#003828]">FAQ</span>
        </nav>

        {/* Page Header */}
        <div className="mt-3 rounded-xl border border-black/[0.05] bg-white p-6 shadow-xs sm:p-8 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#ebf6ef] text-[#176b50]">
            <HelpCircle className="size-6" />
          </div>
          <span className="face-bold mt-3 inline-block rounded bg-[#ebf6ef] px-3 py-1 text-[10px] uppercase tracking-wider text-[#00513b]">
            PUSAT BANTUAN & INFORMASI
          </span>
          <h1 className="face-bold mt-2 text-2xl text-[#003828] sm:text-3xl">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h1>
          <p className="face-regular mx-auto mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-[#57605d]">
            Temukan jawaban lengkap seputar alur verifikasi NIK, pendaftaran usulan kelayakan mandiri, mekanisme sanggah warga, jadwal distribusi, dan jaminan keamanan data.
          </p>

          {/* Search Bar Input */}
          <div className="mx-auto mt-6 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#707974]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik kata kunci pertanyaan (misal: NIK tidak valid, sanggah, lansia, pungli)..."
                className="h-11 w-full rounded-xl border border-[#dce9df] bg-[#f8fdfa] pl-10 pr-4 text-xs sm:text-sm text-[#003828] outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50] shadow-xs"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeCategory === cat
                    ? 'bg-[#003828] text-white shadow-xs'
                    : 'bg-white border border-[#dce9df] text-[#57605d] hover:border-[#b5efd8] hover:text-[#003828]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="mt-5 space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openItems.includes(idx);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-black/[0.05] bg-white shadow-xs transition overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(idx)}
                    className="flex w-full items-center justify-between p-4 sm:p-5 text-left hover:bg-[#f8fdfa] transition"
                  >
                    <div className="flex items-start gap-3 pr-2">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#ebf6ef] text-xs font-bold text-[#176b50] mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#176b50]">
                          {faq.category}
                        </span>
                        <h3 className="face-bold mt-0.5 text-xs sm:text-sm text-[#003828]">
                          {faq.q}
                        </h3>
                      </div>
                    </div>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f1fcf4] text-[#00513b]">
                      {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#ebf6ef] bg-[#f8fdfa] p-4 sm:p-5 pl-12 sm:pl-14 text-xs sm:text-sm leading-relaxed text-[#3f4944]">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-dashed border-[#dce9df] bg-white p-8 text-center text-xs text-[#707974]">
              Tidak ada pertanyaan yang sesuai dengan kata kunci "<strong>{searchQuery}</strong>". Silakan coba kata kunci lain atau hubungi layanan bantuan kami.
            </div>
          )}
        </div>

        {/* Bottom Banner: Masih Memiliki Pertanyaan? */}
        <div className="mt-6 rounded-xl border border-[#b5efd8] bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#00513b] text-white">
                <MessageCircle className="size-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#176b50]">
                  KONSULTASI & LAYANAN PENDAMPINGAN
                </span>
                <h3 className="face-bold mt-1 text-base text-[#003828] sm:text-lg">
                  Masih Memerlukan Bantuan atau Informasi Lanjutan?
                </h3>
                <p className="mt-1 text-xs text-[#57605d] max-w-lg">
                  Tim koordinator pendamping sosial (SLRT) dan posko pengaduan terpadu siap melayani konsultasi data kependudukan dan kendala kepesertaan bansos Anda.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => onNavigate && onNavigate('pengaduan-saya')}
                className="face-semibold flex items-center gap-1.5 rounded-lg border border-[#dce9df] bg-white px-4 py-2.5 text-xs text-[#003828] hover:bg-[#ebf6ef]"
              >
                Buat Pengaduan / Sanggah
              </button>
              <button
                onClick={() => alert('Hotline Call Center 1500-BANSOS siap melayani Anda 24 jam bebas pulsa.')}
                className="face-semibold flex items-center gap-1.5 rounded-lg bg-[#00513b] px-4 py-2.5 text-xs text-white shadow-xs hover:bg-[#003828]"
              >
                <Phone className="size-3.5" /> Hubungi Call Center 171
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

