import React from 'react';

const A = '/assets';

export default function CtaSection({ onScrollTo, onOpenSanggahan }) {
  return (
    <section id="cta" className="scroll-mt-20 px-5 py-10 lg:px-8">
      <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-8 rounded-2xl bg-[#176b50] p-8 text-white shadow-xl lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <p className="face-semibold text-[11px] tracking-[0.55px] text-[#b5efd8] uppercase">
            KANAL PARTISIPASI MANDIRI
          </p>
          <h2 className="face-bold mt-1.5 text-2xl leading-8 tracking-[-0.36px]">
            Pastikan Hak Bantuan Sosial Keluarga Anda Tercatat dengan Benar.
          </h2>
          <p className="face-regular mt-2 text-sm leading-relaxed text-white/90">
            Gunakan hak pengawasan Anda. Cek kepesertaan NIK keluarga secara berkala atau
            laporkan kendala dan dugaan penyelewengan langsung ke tim verifikasi independen kami.
          </p>
          <p className="face-medium mt-4 flex items-center gap-2 text-xs text-[#b5efd8]">
            <img src={`${A}/c9e97.svg`} alt="" className="size-4" />
            Bebas Pungutan Liar • 100% Dijamin Kerahasiaan Identitas Pelapor
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onScrollTo('nik-check')}
            className="face-semibold flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm text-[#003828] shadow-md transition hover:bg-[#ebf6ef]"
          >
            <img src={`${A}/dd67d.svg`} alt="" className="size-4" />
            Cek Status Bansos
          </button>
          <button
            onClick={onOpenSanggahan}
            className="face-semibold flex items-center gap-2 rounded-xl bg-[#f2fcf2]/20 px-6 py-3.5 text-sm text-white backdrop-blur-sm border border-white/20 transition hover:bg-[#f2fcf2]/30"
          >
            <img src={`${A}/394c7.svg`} alt="" className="size-4" />
            Ajukan Sanggahan & Pengaduan
          </button>
        </div>
      </div>
    </section>
  );
}

