import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Filter,
  CheckCircle2,
  TrendingUp,
  FileText,
  Users,
  Check,
  Clock,
  ShieldCheck,
  Building,
  Sparkles,
  ChevronDown,
  BarChart3,
  Layers,
  ArrowUpRight,
  Info,
} from 'lucide-react';

export default function DataFaktual({ onNavigate }) {
  const [selectedYear, setSelectedYear] = useState('TA 2025 (Berjalan)');
  const [selectedWilayah, setSelectedWilayah] = useState('Semua Wilayah Percontohan');
  const [selectedProgram, setSelectedProgram] = useState('Semua Program (PKH, BPNT, BLT, PBI)');

  const monthlyData = [
    { bulan: 'Januari', usulan: '11.240', verifikasi: '8.910', penyaluran: '194.500', barP: 65, barU: 50 },
    { bulan: 'Februari', usulan: '12.850', verifikasi: '9.450', penyaluran: '196.200', barP: 72, barU: 58 },
    { bulan: 'Maret', usulan: '14.120', verifikasi: '10.820', penyaluran: '201.000', barP: 80, barU: 68 },
    { bulan: 'April', usulan: '15.340', verifikasi: '11.200', penyaluran: '200.800', barP: 88, barU: 72 },
    { bulan: 'Mei', usulan: '15.910', verifikasi: '11.180', penyaluran: '198.700', barP: 95, barU: 75 },
    { bulan: 'Juni', usulan: '15.460', verifikasi: '11.250', penyaluran: '202.500', barP: 98, barU: 78 },
  ];

  const wilayahData = [
    {
      nama: 'Kota Bandung',
      tipe: 'Kawasan Urban Terpadu',
      target: '485.200',
      tersalurkan: '471.600',
      rasio: 97.2,
      usulan: '5.120',
      aduan: '840 (98.8%)',
    },
    {
      nama: 'Kabupaten Garut',
      tipe: 'Kawasan Rural & Pegunungan',
      target: '755.380',
      tersalurkan: '722.100',
      rasio: 95.6,
      usulan: '7.310',
      aduan: '1.210 (91.7%)',
    },
  ];

  const programList = [
    {
      nama: 'Program Keluarga Harapan (PKH)',
      persen: 98.4,
      kpm: '180.000 KPM',
      note: 'Terserap Optimal',
    },
    {
      nama: 'BPNT / Kartu Sembako',
      persen: 96.8,
      kpm: '320.000 KPM',
      note: 'Elektronik E-Warong',
    },
    {
      nama: 'BLT Pengalihan BBM',
      persen: 94.5,
      kpm: '210.000 KPM',
      note: 'Via Kantor Pos',
    },
    {
      nama: 'PBI Jaminan Kesehatan (PBI-JK)',
      persen: 99.1,
      kpm: 'Terpenuhi Penuh',
      note: 'Sinkron BPJS',
    },
  ];

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
          <span className="font-semibold text-[#003828]">Data Faktual</span>
        </nav>

        {/* Page Header */}
        <div className="mt-3 rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="face-bold text-xl text-[#003828] sm:text-2xl">
                Data Faktual & Transparansi Bantuan Sosial
              </h1>
              <p className="face-regular mt-1 text-xs leading-relaxed text-[#57605d] max-w-2xl">
                Pantau data agregat kepesertaan, verifikasi usulan mandiri, penanganan pengaduan, dan progress penyaluran bantuan sosial secara terbuka, terukur, dan akuntabel.
              </p>
            </div>

            {/* Circular Progress Realisasi Nasional */}
            <div className="flex shrink-0 items-center gap-3.5 rounded-xl border border-[#b5efd8] bg-[#ebf6ef] px-4 py-2.5">
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-wider text-[#707974]">REALISASI NASIONAL</span>
                <strong className="text-xl font-bold text-[#003828]">96.2%</strong>
                <span className="block text-[10px] text-[#176b50] font-medium flex items-center gap-0.5">
                  <TrendingUp className="size-3" /> On Track Semester I
                </span>
              </div>
              <div className="relative flex size-12 items-center justify-center rounded-full border-4 border-[#00513b] bg-white text-xs font-bold text-[#003828]">
                96%
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-[#ebf6ef] pt-4">
            <div className="flex items-center gap-2 rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3 py-1.5 text-xs text-[#003828]">
              <Calendar className="size-3.5 text-[#176b50]" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-transparent font-semibold outline-none cursor-pointer"
              >
                <option>TA 2025 (Berjalan)</option>
                <option>TA 2024 (Lengkap)</option>
                <option>TA 2023 (Arsip)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3 py-1.5 text-xs text-[#003828]">
              <MapPin className="size-3.5 text-[#176b50]" />
              <select
                value={selectedWilayah}
                onChange={(e) => setSelectedWilayah(e.target.value)}
                className="bg-transparent font-semibold outline-none cursor-pointer"
              >
                <option>Semua Wilayah Percontohan</option>
                <option>Kota Bandung</option>
                <option>Kabupaten Garut</option>
                <option>Kabupaten Sumedang</option>
              </select>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-[#dce9df] bg-[#f8fdfa] px-3 py-1.5 text-xs text-[#003828]">
              <Layers className="size-3.5 text-[#176b50]" />
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="bg-transparent font-semibold outline-none cursor-pointer"
              >
                <option>Semua Program (PKH, BPNT, BLT, PBI)</option>
                <option>Program Keluarga Harapan (PKH)</option>
                <option>BPNT / Sembako</option>
                <option>BLT Pengalihan BBM</option>
                <option>PBI Jaminan Kesehatan</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4 Ringkasan Metrik Utama */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Card 1 */}
          <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707974]">
                  DATA WARGA TERVERIFIKASI
                </span>
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#176b50]">
                  <Users className="size-3.5" />
                </span>
              </div>
              <strong className="mt-2 block text-2xl font-bold text-[#003828]">1.240.580</strong>
              <p className="text-[10px] text-[#707974]">Jiwa terdaftar dalam Data Terpadu</p>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-[#ebf6ef] pt-2 text-[10px]">
              <span className="text-[#176b50] font-semibold">Kesesuaian NIK: 99.8%</span>
              <CheckCircle2 className="size-3 text-[#137333]" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707974]">
                  USULAN KELAYAKAN MASUK
                </span>
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#176b50]">
                  <FileText className="size-3.5" />
                </span>
              </div>
              <strong className="mt-2 block text-2xl font-bold text-[#003828]">84.920</strong>
              <p className="text-[10px] text-[#707974]">Pengajuan mandiri via portal & kader</p>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-[#ebf6ef] pt-2 text-[10px]">
              <span className="text-[#57605d]">Kanal Digital 68% • Kader 32%</span>
              <Info className="size-3 text-[#707974]" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707974]">
                  STATUS VALIDASI USULAN
                </span>
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#176b50]">
                  <BarChart3 className="size-3.5" />
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between text-xs">
                <span className="font-semibold text-[#003828]">Disetujui Lapangan</span>
                <strong className="font-bold text-[#003828]">62.810 (74.0%)</strong>
              </div>
              <div className="mt-1 flex items-baseline justify-between text-[11px] text-[#57605d]">
                <span>Proses Verifikasi Lapangan</span>
                <span className="font-medium">12.430 (14.6%)</span>
              </div>
            </div>
            <div className="mt-3 border-t border-[#ebf6ef] pt-2 text-[10px] text-[#707974]">
              Sisa 11.4% Ditolak/Tidak Memenuhi Kriteria
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707974]">
                  PENGADUAN SELESAI
                </span>
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#176b50]">
                  <CheckCircle2 className="size-3.5" />
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <strong className="text-2xl font-bold text-[#003828]">13.920</strong>
                <span className="text-xs font-semibold text-[#137333]">(94.0%)</span>
              </div>
              <p className="text-[10px] text-[#707974]">Dari 14.810 total sanggah & aduan masuk</p>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-[#ebf6ef] pt-2 text-[10px]">
              <span className="text-[#57605d]">Rata-rata Respon: <strong>3.2 Hari</strong></span>
              <Clock className="size-3 text-[#707974]" />
            </div>
          </div>

        </div>

        {/* Grid Tengah: Komparasi Wilayah vs Transparansi Petugas Lapangan */}
        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          
          {/* Kolom Kiri: Evaluasi Teritori / Komparasi Wilayah */}
          <div className="lg:col-span-8 rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#176b50]">
                  EVALUASI TERITORI
                </span>
                <h2 className="face-bold text-sm text-[#003828]">
                  Komparasi Wilayah Percontohan
                </h2>
              </div>
              <span className="rounded bg-[#f1fcf4] px-2 py-0.5 text-[9px] font-semibold text-[#176b50]">
                Pembaruan Siklus Tahap II
              </span>
            </div>

            {/* Table Komparasi */}
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#ebf6ef] text-[10px] font-bold uppercase tracking-wider text-[#707974]">
                    <th className="pb-2.5">WILAYAH ADMINISTRASI</th>
                    <th className="pb-2.5">TARGET KUOTA</th>
                    <th className="pb-2.5">TERSALURKAN</th>
                    <th className="pb-2.5">RASIO (%)</th>
                    <th className="pb-2.5">USULAN DIPROSES</th>
                    <th className="pb-2.5 text-right">ADUAN SELESAI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebf6ef]">
                  {wilayahData.map((w, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fdfa]">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-[#00513b]" />
                          <div>
                            <strong className="block text-xs text-[#003828]">{w.nama}</strong>
                            <span className="text-[10px] text-[#707974]">{w.tipe}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 font-medium text-[#003828]">{w.target}</td>
                      <td className="py-3 font-bold text-[#003828]">{w.tersalurkan}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#003828]">{w.rasio}%</span>
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full rounded-full bg-[#003828]"
                              style={{ width: `${w.rasio}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-[#57605d]">{w.usulan}</td>
                      <td className="py-3 text-right">
                        <span className="rounded bg-[#e6f4ea] px-2 py-0.5 text-[10px] font-semibold text-[#137333]">
                          {w.aduan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom bar Komparasi */}
            <div className="mt-4 flex flex-col gap-2 rounded-lg border border-[#b5efd8] bg-[#ebf6ef] p-2.5 text-[11px] text-[#003828] sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="size-3.5 text-[#176b50]" />
                Mekanisme penyaluran melalui Pos Indonesia & Bank Himbara terverifikasi.
              </span>
              <strong className="font-mono text-[#003828]">Total Kuota Pilot: 1.240.580 KPM</strong>
            </div>
          </div>

          {/* Kolom Kanan: Verifikasi Lapangan Faktual */}
          <div className="lg:col-span-4 rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#176b50]">
                VERIFIKASI LAPANGAN FAKTUAL
              </span>
              <h2 className="face-bold mt-0.5 text-sm text-[#003828]">
                Transparansi Petugas Lapangan
              </h2>

              <div className="relative mt-3 overflow-hidden rounded-lg aspect-video bg-gray-200">
                <img
                  src="/assets/bc596.png"
                  alt="Petugas Pendamping Sosial Melayani Warga"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 text-[10px] text-white">
                  <strong>Dokumentasi Lapangan: Pendamping Sosial Kec. Tarogong Kidul</strong>
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-[#57605d]">
                Setiap usulan mandiri melalui audit dua lapis: uji silang identitas kependudukan digital serta kunjungan geospasial oleh pendamping lokal bersertifikasi.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#ebf6ef] pt-3 text-xs">
              <strong className="text-[#003828]">1.840 Petugas Aktif</strong>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#137333]">
                <ShieldCheck className="size-3.5" /> 100% Terakreditasi
              </span>
            </div>
          </div>

        </div>

        {/* Grid Bawah: Tren Bulanan Usulan & Penyaluran vs Breakdown Program Bansos */}
        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          
          {/* Kolom Kiri: Dinamika Semester I - Tren Bulanan Usulan & Penyaluran */}
          <div className="lg:col-span-7 rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#ebf6ef] pb-3">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#176b50]">
                  DINAMIKA SEMESTER I
                </span>
                <h2 className="face-bold text-sm text-[#003828]">
                  Tren Bulanan Usulan & Penyaluran (2025)
                </h2>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1.5 font-semibold text-[#003828]">
                  <span className="size-2 rounded-xs bg-[#003828]" /> Penyaluran
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-[#707974]">
                  <span className="size-2 rounded-xs bg-[#b5efd8]" /> Usulan Masuk
                </span>
              </div>
            </div>

            {/* Simulated Bar Chart */}
            <div className="mt-5 flex h-36 items-end justify-between gap-3 px-2 border-b border-[#ebf6ef] pb-2">
              {monthlyData.map((m, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex w-full items-end justify-center gap-1 h-28">
                    <div
                      className="w-3.5 sm:w-5 rounded-t bg-[#003828] transition-all hover:opacity-80"
                      style={{ height: `${m.barP}%` }}
                      title={`Penyaluran: ${m.penyaluran}`}
                    />
                    <div
                      className="w-3.5 sm:w-5 rounded-t bg-[#b5efd8] transition-all hover:opacity-80"
                      style={{ height: `${m.barU}%` }}
                      title={`Usulan: ${m.usulan}`}
                    />
                  </div>
                  <span className="text-[10px] text-[#707974]">{m.bulan.substring(0, 3)}</span>
                </div>
              ))}
            </div>

            {/* Table Rincian Bulanan */}
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#ebf6ef] text-[9px] font-bold uppercase tracking-wider text-[#707974]">
                    <th className="pb-2">BULAN (2025)</th>
                    <th className="pb-2">USULAN MANDIRI</th>
                    <th className="pb-2">VERIFIKASI SELESAI</th>
                    <th className="pb-2 text-right">PENYALURAN (KPM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebf6ef] text-[11px]">
                  {monthlyData.map((d, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fdfa]">
                      <td className="py-1.5 font-semibold text-[#003828]">{d.bulan}</td>
                      <td className="py-1.5 text-[#57605d]">{d.usulan}</td>
                      <td className="py-1.5 text-[#57605d]">{d.verifikasi}</td>
                      <td className="py-1.5 text-right font-mono font-medium text-[#003828]">{d.penyaluran}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kolom Kanan: Klaster Intervensi - Breakdown Program Bansos */}
          <div className="lg:col-span-5 rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="border-b border-[#ebf6ef] pb-3">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#176b50]">
                  KLASTER INTERVENSI
                </span>
                <h2 className="face-bold text-sm text-[#003828]">
                  Breakdown Program Bansos
                </h2>
              </div>

              {/* Progress Bar List */}
              <div className="mt-4 space-y-4">
                {programList.map((pr, idx) => (
                  <div key={idx} className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-3">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-[#003828]">{pr.nama}</strong>
                      <span className="font-bold text-[#003828]">{pr.persen}%</span>
                    </div>

                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-[#003828]"
                        style={{ width: `${pr.persen}%` }}
                      />
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="text-[#57605d]">Penerima Aktif: <strong>{pr.kpm}</strong></span>
                      <span className="text-[#176b50] font-semibold">{pr.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom info note */}
            <div className="mt-4 flex items-center gap-1.5 border-t border-[#ebf6ef] pt-3 text-[10px] text-[#707974]">
              <Building className="size-3.5 text-[#176b50]" />
              <span>Seluruh pagu bersumber dari APBN & Dana Dekonsentrasi Terpadu.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

