import React, { useState } from 'react';
import { submitPengajuan } from '../services/api';

export default function ModalPengajuan({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nik: '',
    nama: '',
    noKk: '',
    telepon: '',
    provinsi: 'Jawa Barat',
    kabupaten: 'Kota Bandung',
    alamat: '',
    pekerjaan: 'Buruh Harian Lepas',
    penghasilan: '< 1.000.000',
    tanggungan: '2',
    kondisiLantai: 'Tanah/Semen',
    kondisiDinding: 'Anyaman Bambu/Kayu',
  });

  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nik || formData.nik.length !== 16) {
      alert('Harap isi 16 digit NIK dengan benar.');
      return;
    }
    if (!formData.nama) {
      alert('Harap isi Nama Lengkap.');
      return;
    }

    setLoading(true);
    try {
      const res = await submitPengajuan(formData);
      setSubmittedId(res.trackingId);
    } catch (err) {
      alert('Gagal mengirim usulan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSubmittedId(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#003828]/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      onClick={resetAndClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#ebf6ef] pb-4">
          <div>
            <span className="eyebrow">FORMULIR PARTISIPATIF</span>
            <h2 className="face-bold mt-1 text-2xl text-[#003828]">
              Pengajuan Usulan Bantuan Sosial Mandiri
            </h2>
            <p className="face-regular text-xs text-[#57605d] mt-1">
              Data yang Anda masukkan akan diverifikasi oleh RT/RW dan Tim Pendamping Sosial kelurahan setempat.
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="flex size-8 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#003828] font-bold text-lg hover:bg-[#dce9df]"
          >
            ×
          </button>
        </div>

        {submittedId ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#e4f7ed] text-3xl text-[#176b50]">
              ✓
            </div>
            <h3 className="face-bold mt-4 text-xl text-[#003828]">
              Usulan Mandiri Berhasil Terdaftar!
            </h3>
            <p className="face-regular mt-2 text-sm text-[#57605d] max-w-md mx-auto">
              Berkas Anda telah diterima ke dalam sistem antrian verifikasi percontohan.
            </p>
            <div className="my-6 rounded-xl bg-[#ebf6ef] p-4 max-w-sm mx-auto border border-[#b5efd8]">
              <span className="text-xs text-[#707974] block uppercase font-semibold">Nomor Registrasi Usulan:</span>
              <strong className="face-bold text-2xl text-[#00513b] tracking-wider block mt-1">
                {submittedId}
              </strong>
            </div>
            <p className="text-xs text-[#707974]">
              Simpan nomor registrasi di atas untuk memantau status validasi lapangan RT/RW.
            </p>
            <button
              onClick={resetAndClose}
              className="face-semibold mt-6 rounded-xl bg-[#00513b] px-8 py-3 text-sm text-white shadow-sm hover:bg-[#003828]"
            >
              Selesai
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-[#003828] mb-1">
                  Nomor Induk Kependudukan (NIK) *
                </label>
                <input
                  type="text"
                  required
                  maxLength={16}
                  value={formData.nik}
                  onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/\D/g, '') })}
                  placeholder="16 digit NIK KTP"
                  className="w-full rounded-lg border border-gray-200 bg-[#ebf6ef]/50 p-2.5 text-sm focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#003828] mb-1">
                  Nama Lengkap Pemohon *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Sesuai KTP"
                  className="w-full rounded-lg border border-gray-200 bg-[#ebf6ef]/50 p-2.5 text-sm focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50] outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-[#003828] mb-1">
                  Nomor Kartu Keluarga (KK)
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={formData.noKk}
                  onChange={(e) => setFormData({ ...formData, noKk: e.target.value.replace(/\D/g, '') })}
                  placeholder="16 digit No KK"
                  className="w-full rounded-lg border border-gray-200 bg-[#ebf6ef]/50 p-2.5 text-sm focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#003828] mb-1">
                  Nomor WhatsApp / HP Aktif
                </label>
                <input
                  type="text"
                  value={formData.telepon}
                  onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                  placeholder="Contoh: 081234567890"
                  className="w-full rounded-lg border border-gray-200 bg-[#ebf6ef]/50 p-2.5 text-sm focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#003828] mb-1">
                Alamat Domisili Lengkap (RT/RW/Desa/Kelurahan) *
              </label>
              <textarea
                rows={2}
                required
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                placeholder="Jl. Merdeka No. 10, RT 02 RW 05, Kelurahan Dago"
                className="w-full rounded-lg border border-gray-200 bg-[#ebf6ef]/50 p-2.5 text-sm focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50] outline-none"
              />
            </div>

            {/* Indikator Ekonomi */}
            <div className="border-t border-[#ebf6ef] pt-4">
              <span className="face-bold text-xs text-[#003828] uppercase tracking-wide block mb-3">
                Kondisi Sosial Ekonomi Rumah Tangga
              </span>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#57605d] mb-1">
                    Penghasilan Bulanan
                  </label>
                  <select
                    value={formData.penghasilan}
                    onChange={(e) => setFormData({ ...formData, penghasilan: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs"
                  >
                    <option>&lt; 1.000.000</option>
                    <option>1.000.000 - 2.000.000</option>
                    <option>2.000.000 - 3.500.000</option>
                    <option>&gt; 3.500.000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#57605d] mb-1">
                    Kondisi Lantai Rumah
                  </label>
                  <select
                    value={formData.kondisiLantai}
                    onChange={(e) => setFormData({ ...formData, kondisiLantai: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs"
                  >
                    <option>Tanah/Semen Kasar</option>
                    <option>Papan Kayu Sederhana</option>
                    <option>Keramik Standar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#57605d] mb-1">
                    Kondisi Dinding Utama
                  </label>
                  <select
                    value={formData.kondisiDinding}
                    onChange={(e) => setFormData({ ...formData, kondisiDinding: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs"
                  >
                    <option>Anyaman Bambu / Bilik</option>
                    <option>Kayu / Papan Sederhana</option>
                    <option>Tembok Belum Diplester</option>
                    <option>Tembok Plesteran</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Berkas Pendukung Dummy */}
            <div className="border-t border-[#ebf6ef] pt-4">
              <label className="block text-xs font-bold text-[#003828] mb-1">
                Unggah Foto Berkas (KTP / KK & Rumah Tinggal)
              </label>
              <div className="flex items-center justify-center border-2 border-dashed border-[#b5efd8] rounded-xl p-4 bg-[#f8fdfa] text-center cursor-pointer hover:bg-[#e4f7ed]">
                <div className="text-xs text-[#326856]">
                  <span className="font-semibold text-[#00513b]">Klik untuk memilih file</span> (JPG, PNG maks. 5MB)
                  <p className="text-[10px] text-[#707974] mt-0.5">Simulasi upload file dokumen pendukung</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#ebf6ef]">
              <button
                type="button"
                onClick={resetAndClose}
                className="face-semibold rounded-lg px-4 py-2.5 text-sm text-[#707974] hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="face-semibold rounded-xl bg-[#00513b] px-6 py-2.5 text-sm text-white shadow-sm hover:bg-[#003828] disabled:opacity-70"
              >
                {loading ? 'Mengirim Data...' : 'Kirim Usulan Mandiri'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

