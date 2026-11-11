import React from 'react';

const A = '/assets';

export default function StepsSection() {
  const steps = [
    {
      icon: 'bdd06.svg',
      title: 'Pengecekan NIK Mandiri',
      desc: 'Warga memasukkan nomor NIK untuk mengecek keberadaan data dalam DTKS maupun daftar penerima bansos berkala secara cepat dan aman.',
    },
    {
      icon: '16735.svg',
      title: 'Pengajuan Usulan & Dokumen',
      desc: 'Unggah berkas Kartu Keluarga, swafoto rumah tinggal, dan pengisian indikator kemiskinan secara jujur dan mandiri melalui portal.',
    },
    {
      icon: '71c09.svg',
      title: 'Verifikasi Petugas Wilayah',
      desc: 'Pendamping sosial dan aparat kelurahan melakukan validasi lapangan serta uji silang keabsahan dokumen usulan sesuai standar kriteria.',
    },
    {
      icon: 'f0a00.svg',
      title: 'Validasi & Penyaluran',
      desc: 'Dana bantuan disalurkan langsung melalui Bank Himbara atau PT Pos Indonesia secara langsung tanpa perantara dan bebas potongan liar.',
    },
  ];

  return (
    <section id="flow" className="bg-[#ebf6ef] py-14">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">ALUR PELAYANAN PUBLIK</p>
            <h2 className="section-title mt-1">Bagaimana TepatBantu Bekerja?</h2>
          </div>
          <p className="face-regular max-w-md text-sm leading-[22px] text-[#57605d]">
            Siklus terintegrasi dari pendaftaran mandiri masyarakat hingga validasi faktual oleh dinas sosial terkait demi memastikan ketepatan sasaran.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-xl bg-white p-6 shadow-sm border border-black/[0.04] transition-all hover:shadow-md"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="face-bold flex size-10 items-center justify-center rounded-lg bg-[#00513b] text-lg text-white shadow-sm">
                  {index + 1}
                </span>
                <span className="flex size-10 items-center justify-center rounded-lg bg-[#f1fcf4]">
                  <img src={`${A}/${step.icon}`} alt="" className="size-5" />
                </span>
              </div>
              <h3 className="face-bold text-base leading-6 text-[#003828]">{step.title}</h3>
              <p className="face-regular mt-2 text-xs leading-[20px] text-[#57605d]">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

