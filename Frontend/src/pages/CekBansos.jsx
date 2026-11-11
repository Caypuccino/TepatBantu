import React, { useState } from 'react';
import {
  ShieldCheck,
  Scale,
  Lock,
  Download,
  AlertTriangle,
  FileText,
  Phone,
  CreditCard,
  RefreshCw,
  CheckCircle2,
  Check,
  Search,
  RotateCcw,
  UserCheck,
} from 'lucide-react';

const A = '/assets';

export default function CekBansos({ onNavigate, onOpenDialog }) {
  const [nik, setNik] = useState('3210394109921001');
  const [noKk, setNoKk] = useState('3210394109921001');
  const [wilayah, setWilayah] = useState('Kota Konoha (Wilayah Barat/Pusat)');
  const [kecamatan, setKecamatan] = useState('Kecamatan Konoha');
  const [captchaInput, setCaptchaInput] = useState('4821');
  const [isDeclared, setIsDeclared] = useState(true);
  const [showResult, setShowResult] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  const handleReset = () => {
    setNik('');
    setNoKk('');
    setCaptchaInput('');
    setIsDeclared(false);
    setShowResult(false);
  };

  const handleCheck = (e) => {
    if (e) e.preventDefault();
    if (!nik || nik.length !== 16) {
      alert('Harap masukkan 16 digit NIK yang valid.');
      return;
    }
    if (captchaInput !== '4821') {
      alert('Kode captcha simetris tidak cocok.');
      return;
    }
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setShowResult(true);
      const resEl = document.getElementById('hasil-pencarian');
      if (resEl) resEl.scrollIntoView({ behavior: 'smooth' });
    }, 500);
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
          <span className="face-semibold text-[#003828]">Cek Bansos</span>
        </nav>

        {/* Header Title Section */}
        <div className="mt-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="face-bold rounded bg-[#b5efd8] px-2.5 py-1 text-[11px] tracking-wide text-[#00513b]">
                DATA TERPADU KESEJAHTERAAN SOSIAL (DTKS) 2026
              </span>
              <span className="face-bold flex items-center gap-1 rounded bg-[#b5efd8] px-2.5 py-1 text-[11px] tracking-wide text-[#00513b]">
                <ShieldCheck className="size-3.5 text-[#176b50]" />
                UU PDP No. 27/2022 Patuh
              </span>
            </div>
            <h1 className="face-bold mt-3 text-3xl leading-tight text-[#003828] sm:text-4xl">
              Pemeriksaan Status Kepesertaan Bantuan Sosial
            </h1>
            <p className="face-regular mt-2 text-sm leading-[22px] text-[#57605d]">
              Layanan mandiri untuk memeriksa penetapan dan pencatatan distribusi bantuan sosial
              (PKH, BPNT/Sembako, BLT) berdasarkan 16 digit NIK yang terdaftar pada Data Terpadu
              Kesejahteraan Sosial (DTKS) secara real-time.
            </p>
          </div>

          {/* Privacy Notice Pill */}
          <div className="flex items-center gap-3 rounded-xl border border-[#b5efd8] bg-white p-3.5 shadow-xs lg:max-w-xs">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#00513b] text-white">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h2 className="face-bold text-xs text-[#003828]">Penyamaran Identitas Otomatis</h2>
              <p className="text-[11px] leading-[15px] text-[#57605d] mt-0.5">
                NIK & Nama ditampilkan parsial demi privasi warga
              </p>
            </div>
          </div>
        </div>

        {/* Form and Side Info Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Left Form: 8 cols */}
          <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-sm sm:p-7 lg:col-span-8">
            <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-4">
              <div className="flex items-center gap-2">
                <span className="h-5 w-1.5 rounded-full bg-[#176b50]" />
                <h2 className="face-bold text-base text-[#003828]">
                  Formulir Pengecekan NIK
                </h2>
              </div>
              <span className="text-xs text-[#707974]">Kompilasi Tahap 1 - TA 2026</span>
            </div>

            <form onSubmit={handleCheck} className="mt-5 space-y-4">
              {/* Row 1: NIK & No KK */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <label className="face-semibold text-[#003828]">
                      Nomor Induk Kependudukan (NIK) <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-[#707974]">
                      {nik.length} / 16 Digit
                    </span>
                  </div>
                  <div className="relative mt-1.5">
                    <input
                      type="text"
                      maxLength={16}
                      value={nik}
                      onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                      placeholder="Masukkan 16 digit NIK"
                      className="face-regular h-11 w-full rounded-lg border border-[#dce9df] bg-[#ebf6ef]/40 pl-3.5 pr-10 text-sm outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50]"
                    />
                    {nik.length === 16 && (
                      <span className="absolute right-3 top-3 text-[#176b50]">
                        <CheckCircle2 className="size-5" />
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] text-[#707974]">
                    Pastikan NIK sesuai e-KTP kepala keluarga atau anggota KK.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <label className="face-semibold text-[#003828]">Nomor Kartu Keluarga (KK)</label>
                    <span className="text-[11px] text-[#707974]">Verifikasi Opsional</span>
                  </div>
                  <div className="relative mt-1.5">
                    <input
                      type="text"
                      maxLength={16}
                      value={noKk}
                      onChange={(e) => setNoKk(e.target.value.replace(/\D/g, ''))}
                      placeholder="Masukkan 16 digit No KK"
                      className="face-regular h-11 w-full rounded-lg border border-[#dce9df] bg-[#ebf6ef]/40 px-3.5 text-sm outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50]"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-[#707974]">
                    Mempercepat validasi bila NIK mengalami mutasi domisili.
                  </p>
                </div>
              </div>

              {/* Row 2: Wilayah & Kecamatan */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="face-semibold block text-xs text-[#003828]">
                    Wilayah <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={wilayah}
                    onChange={(e) => setWilayah(e.target.value)}
                    className="face-regular mt-1.5 h-11 w-full rounded-lg border border-[#dce9df] bg-[#ebf6ef]/40 px-3.5 text-sm outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50]"
                  />
                </div>

                <div>
                  <label className="face-semibold block text-xs text-[#003828]">
                    Kecamatan Domisili Sesuai KTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={kecamatan}
                    onChange={(e) => setKecamatan(e.target.value)}
                    className="face-regular mt-1.5 h-11 w-full rounded-lg border border-[#dce9df] bg-[#ebf6ef]/40 px-3.5 text-sm outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50]"
                  />
                </div>
              </div>

              {/* Row 3: Captcha & Pernyataan */}
              <div className="grid gap-4 rounded-xl bg-[#f8fdfa] p-4 sm:grid-cols-2 border border-[#e4f7ed]">
                <div>
                  <label className="face-bold block text-xs text-[#003828]">
                    Validasi Integritas Akses
                  </label>
                  <p className="mt-0.5 text-[11px] text-[#707974]">
                    Ketik 4-digit kode simetris sistem berikut:
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="face-bold flex h-10 w-20 items-center justify-center rounded-lg bg-[#b5efd8] text-base tracking-widest text-[#00513b] select-none">
                      4821
                    </span>
                    <input
                      type="text"
                      maxLength={4}
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="4821"
                      className="face-bold h-10 w-24 rounded-lg border border-[#dce9df] bg-white px-3 text-center text-sm tracking-wider outline-none focus:border-[#176b50]"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="declaration"
                    checked={isDeclared}
                    onChange={(e) => setIsDeclared(e.target.checked)}
                    className="mt-1 size-4 rounded accent-[#00513b] cursor-pointer"
                  />
                  <label
                    htmlFor="declaration"
                    className="face-regular text-[11px] leading-[17px] text-[#57605d] cursor-pointer"
                  >
                    Saya menyatakan pemeriksaan ini dilakukan untuk diri sendiri atau atas
                    persetujuan pemilik NIK, sesuai prinsip keterbukaan publik yang bertanggungjawab.
                  </label>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="flex flex-col items-center justify-between gap-3 pt-3 sm:flex-row border-t border-[#ebf6ef]">
                <div className="flex items-center gap-1.5 text-xs text-[#707974]">
                  <RefreshCw className="size-3.5 text-[#326856]" />
                  <span>Basis Data Mutakhir: Sinkronisasi 10 Februari 2026</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="face-semibold flex-1 sm:flex-initial h-10 rounded-lg border border-[#bfc9c2]/40 bg-white px-5 text-xs text-[#57605d] hover:bg-[#ebf6ef]"
                  >
                    Atur Ulang
                  </button>
                  <button
                    type="submit"
                    disabled={isChecking}
                    className="face-semibold flex-1 sm:flex-initial flex h-10 items-center justify-center gap-2 rounded-lg bg-[#00513b] px-6 text-xs text-white shadow-sm hover:bg-[#003828] transition"
                  >
                    {isChecking ? (
                      'Memeriksa...'
                    ) : (
                      <>
                        <Search className="size-3.5" />
                        Periksa Status Bansos
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Info: 4 cols */}
          <div className="space-y-4 lg:col-span-4">
            {/* Card 1: Ketentuan Yuridis */}
            <div className="rounded-xl border border-black/[0.04] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[#003828]">
                <Scale className="size-4 text-[#176b50]" />
                <h3 className="face-bold text-xs">Ketentuan Yuridis DTKS</h3>
              </div>
              <p className="mt-2.5 text-xs leading-[19px] text-[#57605d]">
                <strong className="text-[#141e19]">Catatan Penting:</strong> NIK terdaftar bukan
                jaminan otomatis memperoleh bantuan tunai berulang. Penetapan status bersyarat pada
                kuota APBN/APBD serta hasil musyawarah kelurahan dan audit faktual desil P3KE.
              </p>
              <div className="mt-4 border-t border-[#ebf6ef] pt-3 text-[11px] text-[#707974]">
                <p className="face-bold text-[#003828] uppercase tracking-wider text-[10px]">
                  DASAR PENETAPAN:
                </p>
                <p className="mt-1 leading-[16px]">
                  Permensos RI No. 3 Tahun 2021 tentang Pengelolaan DTKS & SK Walikota/Bupati
                  Wilayah Terkait.
                </p>
              </div>
            </div>

            {/* Card 2: Protokol Keamanan Data */}
            <div className="rounded-xl border border-black/[0.04] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[#003828]">
                <Lock className="size-4 text-[#176b50]" />
                <h3 className="face-bold text-xs">Protokol Keamanan Data</h3>
              </div>
              <p className="mt-2 text-xs leading-[19px] text-[#57605d]">
                Sistem menerapkan tokenisasi NIK sesaat dan tidak merekam riwayat pencarian
                identitas di peramban publik.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Hasil Rekam Status Kepesertaan */}
        {showResult && (
          <section id="hasil-pencarian" className="mt-10 scroll-mt-20">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1.5 rounded-full bg-[#176b50]" />
              <div>
                <h2 className="face-bold text-lg text-[#003828]">
                  Hasil Rekam Status Kepesertaan
                </h2>
                <p className="text-xs text-[#707974]">
                  Diperbarui dari Pusat Data dan Informasi Kesejahteraan Sosial
                </p>
              </div>
            </div>

            {/* Status Banner (Green Header Card) */}
            <div className="mt-4 flex flex-col justify-between gap-4 rounded-xl bg-[#b5efd8] p-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#00513b] text-white">
                  <Check className="size-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="face-bold text-sm text-[#003828]">
                      Terdaftar dan Bantuan Telah Tercatat Disalurkan
                    </h3>
                    <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold text-[#00513b]">
                      Valid 2027
                    </span>
                  </div>
                  <p className="text-xs text-[#17503f] mt-0.5">
                    Penerima manfaat tercatat aktif pada SK Mensos Penetapan Tahap I. Penyaluran
                    telah terkonfirmasi oleh pihak penyalur resmi.
                  </p>
                </div>
              </div>
              <button
                onClick={() => alert('Mengunduh bukti penetapan bansos format PDF...')}
                className="face-semibold flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs text-[#003828] shadow-xs hover:bg-[#ebf6ef]"
              >
                <Download className="size-3.5" />
                Unduh Bukti (PDF)
              </button>
            </div>

            {/* Results Grid Container */}
            <div className="mt-4 grid gap-6 lg:grid-cols-12">
              {/* Left Column: Profil Identitas (4 cols) */}
              <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-sm lg:col-span-4 flex flex-col justify-between">
                <div>
                  <p className="face-bold text-[10px] tracking-wider text-[#707974] uppercase">
                    PROFIL IDENTITAS TERLINDUNGI
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="relative flex size-12 items-center justify-center rounded-full bg-[#ebf6ef] text-[#176b50]">
                      <UserCheck className="size-6" />
                    </div>
                    <div>
                      <h4 className="face-bold text-base text-[#003828]">P******* S********</h4>
                      <p className="text-xs text-[#707974]">Kepala Keluarga Terdaftar</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5 border-t border-[#ebf6ef] pt-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#707974]">NIK</span>
                      <strong className="font-mono text-[#141e19]">3273**********03</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#707974]">No. Kartu Keluarga</span>
                      <strong className="font-mono text-[#141e19]">3273**********12</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#707974]">Kecamatan / Kota</span>
                      <strong className="text-[#141e19]">Asing, Kota Konoha</strong>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[#707974]">Desil Kesejahteraan</span>
                      <span className="face-bold rounded bg-[#ebf6ef] px-2 py-0.5 text-[11px] text-[#00513b]">
                        Desil 1 (Sangat Miskin)
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 rounded-lg bg-[#ebf6ef]/50 p-3 text-[11px] leading-[17px] text-[#57605d]">
                    Desil 1 merupakan kelompok masyarakat atau rumah tangga yang berada pada
                    peringkat 10% terbawah dengan tingkat kesejahteraan sosial dan ekonomi paling
                    rendah di Indonesia.
                  </p>
                </div>

                <div className="mt-4 border-t border-[#ebf6ef] pt-3 text-xs flex justify-between items-center text-[#707974]">
                  <span>ID Registrasi DTKS:</span>
                  <span className="font-mono font-bold text-[#003828]">BDT-3273-050-88421</span>
                </div>
              </div>

              {/* Right Column: Rincian Program (8 cols) */}
              <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-sm lg:col-span-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                    <p className="face-bold text-xs tracking-wider text-[#003828] uppercase">
                      RINCIAN PROGRAM BANTUAN SOSIAL AKTIF
                    </p>
                    <span className="text-xs text-[#707974]">2 Program Ditetapkan</span>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto mt-2">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#ebf6ef] text-[10px] font-bold text-[#707974] uppercase">
                          <th className="py-2.5">PROGRAM BANSOS</th>
                          <th className="py-2.5">PERIODE SALUR</th>
                          <th className="py-2.5">KANAL PENCAIRAN</th>
                          <th className="py-2.5">TGL PEMBUKUAN</th>
                          <th className="py-2.5 text-right">STATUS PENYALURAN</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ebf6ef]">
                        <tr>
                          <td className="py-3 pr-2">
                            <strong className="block font-bold text-[#003828]">
                              Program Keluarga Harapan (PKH)
                            </strong>
                            <span className="text-[11px] text-[#707974]">
                              Komponen: Lansia + Siswa SMA
                            </span>
                          </td>
                          <td className="py-3 text-[#3f4944]">Tahap 1 (Jan - Mar 2026)</td>
                          <td className="py-3 text-[#3f4944]">
                            <span className="flex items-center gap-1">
                              <CreditCard className="size-3.5 text-[#176b50]" />
                              KKS Bank BNI
                            </span>
                          </td>
                          <td className="py-3 text-[#3f4944]">08 Feb 2026</td>
                          <td className="py-3 text-right">
                            <span className="inline-block rounded bg-[#b5efd8] px-2 py-0.5 text-[11px] font-bold text-[#17503f]">
                              Tercatat Tersalurkan
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="py-3 pr-2">
                            <strong className="block font-bold text-[#003828]">
                              Bantuan Pangan Non-Tunai (BPNT)
                            </strong>
                            <span className="text-[11px] text-[#707974]">
                              Alokasi Beras & Protein Mandiri
                            </span>
                          </td>
                          <td className="py-3 text-[#3f4944]">Januari 2026</td>
                          <td className="py-3 text-[#3f4944]">
                            <span className="flex items-center gap-1">
                              <CreditCard className="size-3.5 text-[#176b50]" />
                              KKS Bank BNI
                            </span>
                          </td>
                          <td className="py-3 text-[#3f4944]">06 Feb 2026</td>
                          <td className="py-3 text-right">
                            <span className="inline-block rounded bg-[#b5efd8] px-2 py-0.5 text-[11px] font-bold text-[#17503f]">
                              Tercatat Tersalurkan
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Riwayat Tahapan Penyaluran (Timeline) */}
                  <div className="mt-6 rounded-xl bg-[#ebf6ef]/50 p-4 border border-[#e4f7ed]">
                    <p className="face-bold text-[11px] text-[#003828]">
                      Riwayat Tahapan Penyaluran Terakhir (PKH Tahap 1 2026):
                    </p>
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="flex size-5 items-center justify-center rounded-full bg-[#00513b] text-[10px] font-bold text-white">
                          1
                        </span>
                        <div>
                          <strong className="block text-[11px] text-[#003828]">Alokasi Data</strong>
                          <span className="text-[10px] text-[#707974]">15 Jan 2026</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="flex size-5 items-center justify-center rounded-full bg-[#00513b] text-[10px] font-bold text-white">
                          2
                        </span>
                        <div>
                          <strong className="block text-[11px] text-[#003828]">Verifikasi Dinsos</strong>
                          <span className="text-[10px] text-[#707974]">25 Jan 2026</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="flex size-5 items-center justify-center rounded-full bg-[#00513b] text-[10px] font-bold text-white">
                          3
                        </span>
                        <div>
                          <strong className="block text-[11px] text-[#003828]">SP2D Diterbitkan</strong>
                          <span className="text-[10px] text-[#707974]">02 Feb 2026</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="flex size-5 items-center justify-center rounded-full bg-[#00513b] text-[10px] font-bold text-white">
                          4
                        </span>
                        <div>
                          <strong className="block text-[11px] text-[#003828]">Berhasil Tersalur</strong>
                          <span className="text-[10px] text-[#707974]">08 Feb 2026</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer disclaimer */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-2 pt-2 border-t border-[#ebf6ef]">
                  <p className="text-[#707974]">
                    Bila saldo rekening KKS Anda belum bertambah meski tercatat salur, gunakan hak sanggah Anda.
                  </p>
                  <button
                    onClick={() => onOpenDialog && onOpenDialog('Laporkan Kendala Penarikan')}
                    className="flex items-center gap-1 font-semibold text-amber-700 hover:underline shrink-0"
                  >
                    <AlertTriangle className="size-3.5" />
                    Laporkan Kendala Penarikan
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section: Kanal Sanggah & Pelayanan Publik Terpadu */}
        <section className="mt-8 rounded-xl border border-[#b5efd8] bg-[#ebf6ef]/70 p-6 sm:p-7">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="face-bold flex items-center gap-1.5 text-xs text-[#176b50]">
                <FileText className="size-4" />
                Kanal Sanggah & Pelayanan Publik Terpadu
              </span>
              <h2 className="face-bold mt-1 text-xl text-[#003828]">
                Menemukan Ketidaksesuaian Data Penyaluran?
              </h2>
              <p className="face-regular mt-1 text-xs leading-[19px] text-[#57605d]">
                Laporkan bila penerima tercatat tidak memenuhi syarat (inklusif/eksklusif eror),
                adanya pungutan liar dari oknum, atau dana bansos yang tidak diterima utuh. Pengaduan
                diproteksi oleh Ombudsman & Tim Saber Pungli Daerah.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <button
                onClick={() => onOpenDialog && onOpenDialog('Form Sanggahan')}
                className="face-semibold flex items-center gap-1.5 rounded-lg border border-[#bfc9c2]/50 bg-white px-5 py-2.5 text-xs text-[#003828] shadow-xs hover:bg-[#ebf6ef]"
              >
                <FileText className="size-3.5 text-[#176b50]" />
                Isi Form Sanggahan
              </button>
              <button
                onClick={() => alert('Menghubungkan ke hotline pengawasan bansos 1500-299...')}
                className="face-semibold flex items-center gap-1.5 rounded-lg bg-[#00513b] px-5 py-2.5 text-xs text-white shadow-xs hover:bg-[#003828]"
              >
                <Phone className="size-3.5" />
                Hotline: 1500-299
              </button>
            </div>
          </div>
        </section>

        {/* Section: Pertanyaan Umum Pengecekan NIK */}
        <section className="mt-12">
          <div>
            <p className="eyebrow">BANTUAN & EDUKASI</p>
            <h2 className="section-title mt-1">Pertanyaan Umum Pengecekan NIK</h2>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {/* FAQ 1 */}
            <article className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-sm">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#176b50]">
                <FileText className="size-4" />
              </div>
              <h3 className="face-bold mt-4 text-sm text-[#003828]">
                Berapa digit NIK yang valid?
              </h3>
              <p className="face-regular mt-2 text-xs leading-[19px] text-[#57605d]">
                NIK resmi di Indonesia terdiri dari persis 16 angka yang memuat kode provinsi,
                kode kabupaten/kota, kecamatan, tanggal lahir, dan nomor urut registrasi e-KTP.
                Pastikan tidak ada spasi atau karakter khusus.
              </p>
            </article>

            {/* FAQ 2 */}
            <article className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-sm">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#176b50]">
                <RefreshCw className="size-4" />
              </div>
              <h3 className="face-bold mt-4 text-sm text-[#003828]">
                Mengapa status saya berubah?
              </h3>
              <p className="face-regular mt-2 text-xs leading-[19px] text-[#57605d]">
                Data Terpadu Kesejahteraan Sosial (DTKS) dimutakhirkan secara berkala setiap bulan
                oleh Pemerintah Daerah bersama Kementerian Sosial berdasarkan musyawarah desa,
                audit kelayakan, serta perbaikan status ekonomi.
              </p>
            </article>

            {/* FAQ 3 */}
            <article className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-sm">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#176b50]">
                <CreditCard className="size-4" />
              </div>
              <h3 className="face-bold mt-4 text-sm text-[#003828]">
                Bantuan belum cair padahal tertulis salur?
              </h3>
              <p className="face-regular mt-2 text-xs leading-[19px] text-[#57605d]">
                Penyaluran perbankan (Himbara) memerlukan waktu rekonsiliasi batch transfer 1-3 hari
                kerja sejak SP2D terbit. Bila rekening tetap kosong setelah masa tersebut, bawa KKS
                dan e-KTP ke unit bank penerbit atau ajukan sanggah.
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}

