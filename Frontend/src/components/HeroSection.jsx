import React from 'react';

const A = '/assets';

export default function HeroSection({ onScrollTo, onOpenServices }) {
  return (
    <section className="relative overflow-hidden py-12 lg:py-16">
      {/* Background Pattern */}
      <img
        src={`${A}/ce3dd.svg`}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
        alt=""
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-10 px-5 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e4f7ed] px-3.5 py-1 text-xs font-semibold text-[#00513b] mb-4">
              <span className="size-2 rounded-full bg-[#176b50] animate-pulse"></span>
              Platform Resmi Transparansi Bantuan Sosial
            </div>

            <h1 className="face-bold max-w-3xl text-[38px] leading-[46px] tracking-[-1.2px] text-[#003828] sm:text-5xl sm:leading-[56px]">
              Pastikan Bantuan Sosial Tepat Sasaran.
            </h1>

            <p className="face-regular mt-4 max-w-xl text-base leading-[26px] text-[#3f4944]">
              TepatBantu membantu masyarakat mengakses informasi bantuan sosial, mengusulkan
              kelayakan, dan menyampaikan pengaduan melalui satu platform terpadu, transparan, dan akuntabel.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => onScrollTo('nik-check')}
                className="face-semibold flex h-11 items-center gap-2 rounded-lg bg-[#00513b] px-6 text-sm tracking-[0.14px] text-white shadow-sm transition hover:bg-[#003828]"
              >
                <img src={`${A}/5cf8a.svg`} alt="" className="size-4" />
                Cek Status Bansos Sekarang
              </button>
              <button
                onClick={() => onScrollTo('services')}
                className="face-semibold h-11 rounded-lg border border-[#326856]/20 bg-white px-6 text-sm tracking-[0.14px] text-[#326856] shadow-sm transition hover:bg-[#ebf6ef]"
              >
                Pelajari Layanan & Panduan
              </button>
            </div>

            {/* Trust Badges */}
            <div className="face-semibold mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[13px] tracking-[0.26px] text-[#326856]">
              {[
                { icon: '0a4b3.svg', text: 'Enkripsi NIK Terproteksi' },
                { icon: '3b525.svg', text: 'Verifikasi Berjenjang RT/RW' },
                { icon: 'f850b.svg', text: 'Publikasi Data Terbuka' },
              ].map((badge) => (
                <span key={badge.text} className="flex items-center gap-2 bg-[#e4f7ed]/70 px-3 py-1.5 rounded-md">
                  <img src={`${A}/${badge.icon}`} alt="" className="size-4" />
                  {badge.text}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="overflow-hidden rounded-xl bg-white shadow-xl border border-black/[0.04] lg:col-span-5">
            <div className="relative h-72 overflow-hidden">
              <img
                src={`${A}/bc596.png`}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                alt="Petugas melayani warga penerima bantuan sosial"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003828]/85 via-[#003828]/25 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <span className="face-bold inline-block rounded bg-[#326856]/90 px-2.5 py-0.5 text-[11px] tracking-[0.275px] uppercase">
                  Penyaluran Aktif 2026
                </span>
                <p className="face-semibold mt-1.5 text-base">
                  Program Keluarga Harapan (PKH) & Sembako
                </p>
                <p className="face-regular text-xs text-[#e8f3ec]">
                  Target 12 Juta Keluarga Penerima Manfaat (KPM)
                </p>
              </div>
            </div>

            {/* Bottom Info Strip */}
            <div className="grid grid-cols-2 bg-[#ebf6ef] p-4 text-[#151e18]">
              <div className="px-2">
                <p className="face-bold text-[11px] tracking-[0.44px] text-[#326856]">
                  STATUS PEMBARUAN
                </p>
                <p className="face-bold mt-1 text-sm text-[#003828]">Data Simulasi Harian</p>
                <p className="face-regular text-xs text-[#326856]">Sinkron: Bandung & Garut</p>
              </div>
              <div className="border-l border-[#bfc9c2]/40 pl-4">
                <p className="face-bold text-[11px] tracking-[0.44px] text-[#326856]">
                  TINGKAT PENYERAPAN
                </p>
                <p className="face-bold mt-1 text-sm text-[#003828]">98.2% Kuota</p>
                <p className="face-regular text-xs text-[#326856]">Aman & Terfasilitasi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

