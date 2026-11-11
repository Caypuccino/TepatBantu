import React, { useState } from 'react';

const A = '/assets';

export default function StatsSection() {
  const [selectedRegion, setSelectedRegion] = useState('all');

  const statsData = {
    all: {
      totalWarga: '1.240.580',
      totalWargaNote: '+3.2% bln ini',
      usulanMasuk: '84.920',
      usulanNote: '91.4% telah diproses',
      verifikasiPersen: '92.4%',
      pengaduanSelesai: '14.810',
      pengaduanNote: 'Selesai 97.8%',
      alokasi: 'Rp 4,8 Triliun',
      realisasi: 'Rp 4,68 Triliun (97.5%)',
    },
    bandung: {
      totalWarga: '412.350',
      totalWargaNote: '+2.1% bln ini',
      usulanMasuk: '28.140',
      usulanNote: '94.2% telah diproses',
      verifikasiPersen: '95.1%',
      pengaduanSelesai: '4.920',
      pengaduanNote: 'Selesai 98.6%',
      alokasi: 'Rp 1,6 Triliun',
      realisasi: 'Rp 1,57 Triliun (98.1%)',
    },
    garut: {
      totalWarga: '388.900',
      totalWargaNote: '+3.8% bln ini',
      usulanMasuk: '31.250',
      usulanNote: '89.7% telah diproses',
      verifikasiPersen: '90.8%',
      pengaduanSelesai: '5.110',
      pengaduanNote: 'Selesai 96.5%',
      alokasi: 'Rp 1,4 Triliun',
      realisasi: 'Rp 1,35 Triliun (96.4%)',
    },
  };

  const current = statsData[selectedRegion] || statsData.all;

  const metrics = [
    {
      label: 'TOTAL WARGA TERDATA DTKS',
      value: current.totalWarga,
      icon: '22ea8.svg',
      badge: current.totalWargaNote,
      badgeColor: 'text-[#17503f] bg-[#e4f7ed]',
      source: 'Basis Data Terpadu Simulasi 2026',
    },
    {
      label: 'USULAN KELAYAKAN MASUK',
      value: current.usulanMasuk,
      icon: '4a9b4.svg',
      badge: current.usulanNote,
      badgeColor: 'text-[#17503f] bg-[#e4f7ed]',
      source: 'Kanal Pendaftaran Mandiri Warga',
    },
    {
      label: 'VERIFIKASI LAPANGAN RT/RW',
      value: current.verifikasiPersen,
      icon: '2e345.svg',
      isProgress: true,
      progressVal: current.verifikasiPersen,
      badge: 'Target Standar Kuartal: 95%',
      source: 'Petugas Pendamping Lapangan',
    },
    {
      label: 'PENGADUAN DITINDAKLANJUTI',
      value: current.pengaduanSelesai,
      icon: 'e3ad1.svg',
      badge: current.pengaduanNote,
      badgeColor: 'text-[#17503f] bg-[#e4f7ed]',
      source: 'Kanal Laporan Sanggah Publik',
    },
  ];

  return (
    <section id="data" className="scroll-mt-16 px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-[1240px] rounded-2xl bg-white p-6 shadow-sm border border-black/[0.04] sm:p-10">
        {/* Top Header & Region Filter */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#bfc9c2]/30 pb-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow">TRANSPARANSI DATA PUBLIK</span>
              <span className="size-2 rounded-full bg-[#176b50] animate-pulse"></span>
            </div>
            <h2 className="section-title mt-1">Transparansi Data & Realisasi Anggaran</h2>
            <p className="face-regular text-sm text-[#57605d] mt-1 leading-[22px]">
              Ringkasan data faktual penyaluran bansos, verifikasi lapangan, dan penanganan pengaduan masyarakat.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="text-xs font-semibold text-[#57605d]">Filter Wilayah:</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="rounded-lg border border-[#326856]/30 bg-[#ebf6ef] px-3 py-2 text-xs font-semibold text-[#003828] outline-none focus:ring-2 focus:ring-[#176b50]"
            >
              <option value="all">Nasional (Semua Percontohan)</option>
              <option value="bandung">Kota Bandung, Jawa Barat</option>
              <option value="garut">Kabupaten Garut, Jawa Barat</option>
            </select>
            <span className="face-semibold flex items-center gap-2 rounded-lg bg-[#e6f1e9] px-3 py-2 text-xs text-[#176b50]">
              <i className="size-2 rounded-full bg-[#176b50]" />
              Update: Hari Ini
            </span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, idx) => (
            <article
              key={m.label}
              className="rounded-xl bg-[#ebf6ef] p-5 border border-[#dce9df] flex flex-col justify-between"
            >
              <div>
                <p className="face-bold text-[11px] tracking-[0.44px] text-[#326856]">{m.label}</p>
                <div className="mt-2 flex items-center justify-between">
                  <strong className="face-bold text-[32px] leading-tight tracking-[-0.64px] text-[#003828]">
                    {m.value}
                  </strong>
                  <span className="flex size-9 items-center justify-center rounded-lg bg-white/70 shadow-2xs">
                    <img src={`${A}/${m.icon}`} alt="" className="size-5" />
                  </span>
                </div>

                {m.isProgress ? (
                  <div className="mt-3">
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#dae5de]">
                      <div
                        className="h-full rounded-full bg-[#176b50] transition-all duration-700"
                        style={{ width: m.progressVal }}
                      />
                    </div>
                    <span className="mt-1.5 block text-[11px] font-medium text-[#326856]">
                      {m.badge}
                    </span>
                  </div>
                ) : (
                  <div className="mt-3">
                    <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-bold ${m.badgeColor}`}>
                      {m.badge}
                    </span>
                  </div>
                )}
              </div>

              <p className="face-medium mt-4 text-[11px] tracking-[0.3px] text-[#707974] border-t border-[#dae5de] pt-2">
                {m.source}
              </p>
            </article>
          ))}
        </div>

        {/* Anggaran Realisasi Bar */}
        <div className="mt-8 rounded-xl bg-[#f1fcf4] p-5 border border-[#b5efd8]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="face-bold text-xs text-[#003828] uppercase tracking-wider">
                Realisasi Anggaran Bansos Periode Berjalan
              </span>
              <p className="text-xs text-[#57605d]">Alokasi Pagu: {current.alokasi}</p>
            </div>
            <div className="text-right">
              <span className="face-bold text-base text-[#176b50]">{current.realisasi}</span>
            </div>
          </div>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[#dae5de]">
            <div className="h-full rounded-full bg-gradient-to-r from-[#176b50] to-[#00513b] w-[97.5%]" />
          </div>
        </div>
      </div>
    </section>
  );
}

