import React from 'react';

const A = '/assets';

export default function ServicesSection({ onOpenService }) {
  const services = [
    {
      id: 'cek-status',
      icon: 'c97f2.svg',
      eyebrow: 'LAYANAN TRANSPARANSI',
      title: 'Cek Status Bansos',
      description:
        'Periksa status kepesertaan PKH, BPNT, dan BLT secara transparan menggunakan NIK KTP. Menampilkan jadwal pencairan, nominal bantuan, dan titik pos penyalur terdekat.',
      action: 'Mulai Pengecekan',
      note: 'Akses 24 Jam',
      actionType: 'scroll-nik',
    },
    {
      id: 'pengajuan-usulan',
      icon: '99053.svg',
      eyebrow: 'LAYANAN PARTISIPATIF',
      title: 'Pengajuan Bantuan Mandiri',
      description:
        'Belum terdaftar? Ajukan usulan mandiri dengan mengisi formulir kelayakan ekonomi dan mengunggah dokumen pendukung untuk dinilai kelayakannya oleh tim verifikator kelurahan.',
      action: 'Ajukan Usulan',
      note: 'Verifikasi Berjenjang',
      actionType: 'open-pengajuan',
    },
    {
      id: 'sanggahan-lapor',
      icon: 'e37da.svg',
      eyebrow: 'LAYANAN PENGAWASAN',
      title: 'Sanggah & Pengaduan',
      description:
        'Laporkan dugaan ketidaktepatan sasaran, potongan liar tanpa izin, atau penyelewengan bantuan dengan jaminan kerahasiaan identitas dan nomor tiket pelacakan otomatis.',
      action: 'Buat Laporan Sanggah',
      note: 'Anonim & Terlindungi',
      actionType: 'open-sanggahan',
    },
  ];

  return (
    <section id="services" className="scroll-mt-16 py-12">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">LAYANAN TERPADU MASYARAKAT</p>
          <h2 className="section-title mt-1">Tiga Pilar Akses Bantuan Sosial</h2>
          <p className="face-regular mt-2 text-sm leading-[22px] text-[#57605d]">
            Didesain dengan kesederhanaan dan kepastian hukum demi memutus rantai birokrasi
            bagi seluruh lapisan masyarakat di Indonesia.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="flex min-h-[340px] flex-col justify-between rounded-xl bg-white p-7 shadow-sm border border-black/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <span className="flex size-14 items-center justify-center rounded-xl bg-[#b5efd8] shadow-sm">
                  <img src={`${A}/${service.icon}`} alt="" className="size-7" />
                </span>
                <p className="face-semibold mt-5 text-[11px] tracking-[0.44px] text-[#326856]">
                  {service.eyebrow}
                </p>
                <h3 className="face-bold mt-1 text-xl leading-7 text-[#003828]">
                  {service.title}
                </h3>
                <p className="face-regular mt-2.5 text-sm leading-[23px] text-[#57605d]">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#bfc9c2]/30 pt-4">
                <button
                  onClick={() => onOpenService(service.actionType)}
                  className="face-bold flex items-center gap-1.5 text-sm text-[#003828] hover:text-[#176b50] hover:underline"
                >
                  {service.action}
                  <img src={`${A}/a00ec.svg`} alt="" className="size-3" />
                </button>
                <span className="face-semibold text-[11px] tracking-[0.44px] text-[#707974] bg-[#f1fcf4] px-2 py-0.5 rounded">
                  {service.note}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

