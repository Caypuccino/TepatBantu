import React from 'react';

const A = '/assets';

export default function NewsSection({ onSelectArticle }) {
  const articles = [
    {
      id: 1,
      image: '182b1.png',
      category: 'DISTRIBUSI',
      date: '24 Oktober 2026 • Humas Dinas Sosial',
      title: 'Penyaluran Bantuan Sembako Tahap III Wilayah Jawa Barat Dimulai Serentak',
      text: 'Sebanyak 420.000 Keluarga Penerima Manfaat di Jawa Barat mulai menerima alokasi bahan pangan pokok dengan verifikasi berbasis sistem QR identitas digital tanpa potongan.',
    },
    {
      id: 2,
      image: '7399a.png',
      category: 'AKUNTABILITAS',
      date: '18 Oktober 2026 • Satgas Pengawasan Bansos',
      title: 'Mekanisme Sanggah Mandiri Diluncurkan untuk Mencegah Pemotongan Liar',
      text: 'Masyarakat kini dapat melaporkan pungutan liar langsung ke dashboard pemantauan pusat dengan enkripsi identitas pelapor dan eskalasi otomatis dalam 48 jam kerja.',
    },
    {
      id: 3,
      image: 'b7571.png',
      category: 'TRANSPARANSI',
      date: '10 Oktober 2026 • Tim Audit Terpadu',
      title: 'Laporan Transparansi Bansos Semester I 2026: Efisiensi Naik Signifikan',
      text: 'Integrasi verifikasi lapangan digital bersama RT/RW menurunkan angka salah sasaran penerima hingga 84% pada wilayah percontohan DTKS mandiri terpadu.',
    },
  ];

  return (
    <section id="news" className="scroll-mt-16 py-12">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">PEMBERITAAN RESMI</p>
            <h2 className="section-title mt-1">Siaran Pers & Kebijakan Terkini</h2>
          </div>
          <button
            onClick={() => onSelectArticle && onSelectArticle({ title: 'Semua Siaran Pers', text: 'Arsip seluruh siaran pers berkala Kementerian Sosial dan Dinas Sosial percontohan dapat diakses melalui portal publik ini.' })}
            className="face-bold flex items-center gap-1.5 text-sm text-[#003828] hover:text-[#176b50]"
          >
            Lihat Semua Siaran Pers
            <img src={`${A}/a00ec.svg`} alt="" className="size-3" />
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="overflow-hidden rounded-xl bg-white shadow-sm border border-black/[0.04] flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={`${A}/${article.image}`}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    alt={article.title}
                  />
                  <span className="face-bold absolute left-3 top-3 rounded bg-[#00513b] px-2 py-0.5 text-[11px] tracking-[0.44px] text-white uppercase shadow-sm">
                    {article.category}
                  </span>
                </div>
                <div className="p-5">
                  <p className="face-bold text-[11px] tracking-[0.44px] text-[#707974]">
                    {article.date}
                  </p>
                  <h3 className="face-bold mt-2 text-base leading-snug text-[#003828] hover:text-[#176b50] transition">
                    {article.title}
                  </h3>
                  <p className="face-regular mt-2 text-xs leading-[19px] text-[#57605d]">
                    {article.text}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectArticle && onSelectArticle(article)}
                  className="face-semibold flex items-center gap-1.5 text-sm text-[#326856] hover:text-[#003828]"
                >
                  Baca Selengkapnya
                  <img src={`${A}/ddb61.svg`} alt="" className="size-3" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

