import React, { useState } from 'react';
import { checkNikStatus } from '../services/api';

const A = '/assets';

export default function NikCheckSection({ onOpenPengajuan }) {
  const [nik, setNik] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheck = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setResult(null);

    const cleanNik = nik.replace(/\D/g, '');
    if (cleanNik.length !== 16) {
      setErrorMsg('Harap masukkan 16 digit Nomor Induk Kependudukan (NIK) yang valid sesuai KTP.');
      return;
    }

    setLoading(true);
    try {
      const response = await checkNikStatus(cleanNik);
      setResult(response);
    } catch (err) {
      setErrorMsg('Terjadi kesalahan saat memeriksa data NIK. Silakan coba beberapa saat lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseSample = (sampleNik) => {
    setNik(sampleNik);
    setErrorMsg('');
    setResult(null);
  };

  return (
    <section id="nik-check" className="scroll-mt-24 py-8">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="rounded-2xl bg-white p-6 shadow-xl border border-black/[0.04] sm:p-8">
          <div className="flex flex-col items-stretch justify-between gap-6 xl:flex-row xl:items-center">
            {/* Header info */}
            <div className="flex items-start sm:items-center gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#b5efd8] shadow-sm">
                <img src={`${A}/9dc2f.svg`} alt="" className="size-7" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="face-bold text-xl leading-6 text-[#141e19]">
                    Pengecekan Cepat Status Bansos
                  </h2>
                  <span className="rounded bg-[#ebf6ef] px-2 py-0.5 text-[11px] font-semibold text-[#176b50]">
                    Simulasi Resmi
                  </span>
                </div>
                <p className="face-regular text-sm text-[#57605d] mt-1 leading-[20px] max-w-xl">
                  Masukkan 16 digit Nomor Induk Kependudukan (NIK) untuk memeriksa status kepesertaan aktif dalam Data Terpadu Kesejahteraan Sosial (DTKS).
                </p>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleCheck} className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <img
                  src={`${A}/0321e.svg`}
                  className="pointer-events-none absolute left-3.5 top-[14px] size-4 opacity-70"
                  alt=""
                />
                <input
                  type="text"
                  value={nik}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                    setNik(val);
                    if (errorMsg) setErrorMsg('');
                  }}
                  inputMode="numeric"
                  placeholder="Contoh: 3273012809920001"
                  className="face-regular h-12 w-full rounded-xl bg-[#ebf6ef] pl-10 pr-4 text-sm text-[#141e19] placeholder:text-[#707974] outline-none ring-[#176b50] focus:ring-2 sm:w-[320px] transition-all"
                  aria-label="Nomor Induk Kependudukan"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="face-semibold flex h-12 items-center justify-center gap-2 rounded-xl bg-[#00513b] px-6 text-sm text-white shadow-sm transition hover:bg-[#003828] disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Memeriksa...
                  </span>
                ) : (
                  <>
                    <img src={`${A}/ebb8b.svg`} alt="" className="size-4" />
                    Periksa NIK
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick sample buttons for test demonstration */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#57605d] border-t border-[#ebf6ef] pt-3">
            <span className="font-semibold text-[#326856]">Contoh NIK Demonstrasi:</span>
            <button
              type="button"
              onClick={() => handleUseSample('3273012809920001')}
              className="rounded bg-[#f1fcf4] px-2.5 py-1 text-[#00513b] font-medium border border-[#b5efd8] hover:bg-[#e4f7ed]"
            >
              3273012809920001 (Budi - Penerima Aktif PKH)
            </button>
            <button
              type="button"
              onClick={() => handleUseSample('3205011204890002')}
              className="rounded bg-[#f1fcf4] px-2.5 py-1 text-[#00513b] font-medium border border-[#b5efd8] hover:bg-[#e4f7ed]"
            >
              3205011204890002 (Siti - Proses Verifikasi)
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mt-5 rounded-xl border border-amber-200 bg-[#fff9ed] p-4 text-sm text-[#765a16]">
              <div className="flex items-center gap-2 font-semibold">
                <span>⚠️ Perhatian</span>
              </div>
              <p className="mt-1">{errorMsg}</p>
            </div>
          )}

          {/* Result Card: Found Active */}
          {result && result.found && (
            <div className="mt-6 rounded-xl border border-[#b5efd8] bg-[#f8fdfa] p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#dce9df] gap-3">
                <div>
                  <span className="inline-block rounded-md bg-[#176b50] px-2.5 py-0.5 text-xs font-bold text-white tracking-wide">
                    {result.data.status}
                  </span>
                  <h3 className="face-bold mt-2 text-xl text-[#003828]">
                    {result.data.nama} (NIK: {result.data.nik})
                  </h3>
                  <p className="text-xs text-[#57605d] mt-0.5">
                    Wilayah: Kel. {result.data.kelurahan}, Kec. {result.data.kecamatan}, {result.data.kabupaten}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-[#707974] block">Sinkronisasi Terakhir:</span>
                  <span className="text-xs font-semibold text-[#326856]">{result.data.terakhirSinkron}</span>
                </div>
              </div>

              {/* Programs List */}
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {result.data.program.map((prog, idx) => (
                  <div key={idx} className="rounded-lg bg-white p-4 shadow-sm border border-[#e4f7ed]">
                    <div className="flex items-center justify-between">
                      <span className="face-bold text-sm text-[#003828]">{prog.nama}</span>
                      <span className="rounded bg-[#e4f7ed] px-2 py-0.5 text-[11px] font-semibold text-[#176b50]">
                        {prog.statusPenyaluran}
                      </span>
                    </div>
                    <div className="mt-3 space-y-1 text-xs text-[#3f4944]">
                      <div className="flex justify-between">
                        <span className="text-[#707974]">Periode / Tahap:</span>
                        <span className="font-semibold">{prog.tahap}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#707974]">Besaran Nominal:</span>
                        <span className="font-bold text-[#00513b]">{prog.nominal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#707974]">Penyalur:</span>
                        <span className="font-medium">{prog.lokasiPenyalur}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#707974]">Jadwal Penyaluran:</span>
                        <span className="font-medium text-[#176b50]">{prog.jadwal}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result Card: Not Found */}
          {result && !result.found && (
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-block rounded-md bg-gray-600 px-2.5 py-0.5 text-xs font-bold text-white">
                    BELUM TERDAFTAR
                  </span>
                  <h3 className="face-bold mt-2 text-lg text-[#141e19]">
                    NIK Tidak Ditemukan dalam Basis Data DTKS Aktif
                  </h3>
                  <p className="text-sm text-[#57605d] mt-1 max-w-xl">
                    {result.message}
                  </p>
                </div>
                <button
                  onClick={() => onOpenPengajuan && onOpenPengajuan()}
                  className="face-semibold whitespace-nowrap rounded-lg bg-[#00513b] px-5 py-2.5 text-sm text-white shadow-sm hover:bg-[#003828]"
                >
                  Ajukan Usulan Bansos
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

