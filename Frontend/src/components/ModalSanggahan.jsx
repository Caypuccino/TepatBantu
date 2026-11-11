import React, { useState } from 'react';
import { submitSanggahan } from '../services/api';

export default function ModalSanggahan({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    kategori: 'Ketidaktepatan Sasaran Penerima',
    terlaporNama: '',
    terlaporAlamat: '',
    alasan: '',
    anonim: true,
    pelaporNama: '',
    pelaporKontak: '',
  });

  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.alasan) {
      alert('Harap isi uraian kronologi laporan / sanggahan.');
      return;
    }

    setLoading(true);
    try {
      const res = await submitSanggahan(formData);
      setTicketId(res.ticketId);
    } catch (err) {
      alert('Gagal mengirim laporan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setTicketId(null);
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
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#ebf6ef] pb-4">
          <div>
            <span className="eyebrow">KANAL PENGAWASAN PUBLIK</span>
            <h2 className="face-bold mt-1 text-2xl text-[#003828]">
              Formulir Sanggahan & Pengaduan
            </h2>
            <p className="face-regular text-xs text-[#57605d] mt-1">
              Laporkan ketidaktepatan penerima bansos atau dugaan pemotongan liar secara rahasia dan aman.
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="flex size-8 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#003828] font-bold text-lg hover:bg-[#dce9df]"
          >
            ×
          </button>
        </div>

        {ticketId ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#e4f7ed] text-3xl text-[#176b50]">
              ✓
            </div>
            <h3 className="face-bold mt-4 text-xl text-[#003828]">
              Laporan Sanggahan Berhasil Diterima!
            </h3>
            <p className="face-regular mt-2 text-sm text-[#57605d] max-w-md mx-auto">
              Laporan Anda telah dienkripsi dan diteruskan ke Tim Satgas Pengawasan Independen.
            </p>
            <div className="my-6 rounded-xl bg-[#ebf6ef] p-4 max-w-sm mx-auto border border-[#b5efd8]">
              <span className="text-xs text-[#707974] block uppercase font-semibold">Nomor Tiket Pelacakan:</span>
              <strong className="face-bold text-2xl text-[#00513b] tracking-wider block mt-1">
                {ticketId}
              </strong>
            </div>
            <p className="text-xs text-[#707974]">
              Simpan nomor tiket ini untuk melihat progres tindak lanjut audit lapangan dalam waktu 2x24 jam kerja.
            </p>
            <button
              onClick={resetAndClose}
              className="face-semibold mt-6 rounded-xl bg-[#00513b] px-8 py-3 text-sm text-white shadow-sm hover:bg-[#003828]"
            >
              Tutup
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#003828] mb-1">
                Kategori Laporan / Sanggahan *
              </label>
              <select
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                className="w-full rounded-lg border border-gray-200 bg-[#ebf6ef]/50 p-2.5 text-sm outline-none"
              >
                <option>Ketidaktepatan Sasaran Penerima (Warga Mampu)</option>
                <option>Dugaan Pungutan Liar / Pemotongan Nominal</option>
                <option>Penyaluran Tidak Tepat Waktu / Bansos Rusak</option>
                <option>Lainnya</option>
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-[#003828] mb-1">
                  Nama Warga Terlapor (Jika Ada)
                </label>
                <input
                  type="text"
                  value={formData.terlaporNama}
                  onChange={(e) => setFormData({ ...formData, terlaporNama: e.target.value })}
                  placeholder="Nama warga yang disanggah"
                  className="w-full rounded-lg border border-gray-200 bg-[#ebf6ef]/50 p-2.5 text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#003828] mb-1">
                  Wilayah / RT / RW Terlapor
                </label>
                <input
                  type="text"
                  value={formData.terlaporAlamat}
                  onChange={(e) => setFormData({ ...formData, terlaporAlamat: e.target.value })}
                  placeholder="Contoh: RT 03 RW 02 Kel. Coblong"
                  className="w-full rounded-lg border border-gray-200 bg-[#ebf6ef]/50 p-2.5 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#003828] mb-1">
                Uraian Kronologi / Alasan Sanggahan *
              </label>
              <textarea
                rows={3}
                required
                value={formData.alasan}
                onChange={(e) => setFormData({ ...formData, alasan: e.target.value })}
                placeholder="Jelaskan alasan sanggahan secara objektif (misal: memiliki mobil pribadi, rumah mewah, atau potongan biaya tanpa kuitansi resmi)..."
                className="w-full rounded-lg border border-gray-200 bg-[#ebf6ef]/50 p-2.5 text-sm outline-none"
              />
            </div>

            {/* Anonim Toggle */}
            <div className="rounded-xl bg-[#f1fcf4] p-3 border border-[#b5efd8]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.anonim}
                  onChange={(e) => setFormData({ ...formData, anonim: e.target.checked })}
                  className="size-4 accent-[#176b50]"
                />
                <span className="face-semibold text-xs text-[#003828]">
                  Kirim Laporan Secara Anonim (Identitas Dirahasiakan)
                </span>
              </label>
              <p className="text-[11px] text-[#57605d] mt-1 pl-6">
                Identitas dan data perangkat Anda akan dienkripsi dan tidak akan dipublikasikan kepada pihak mana pun.
              </p>
            </div>

            {!formData.anonim && (
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#003828] mb-1">
                    Nama Pelapor
                  </label>
                  <input
                    type="text"
                    value={formData.pelaporNama}
                    onChange={(e) => setFormData({ ...formData, pelaporNama: e.target.value })}
                    placeholder="Nama Anda"
                    className="w-full rounded-lg border border-gray-200 p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#003828] mb-1">
                    No. WhatsApp Pelapor
                  </label>
                  <input
                    type="text"
                    value={formData.pelaporKontak}
                    onChange={(e) => setFormData({ ...formData, pelaporKontak: e.target.value })}
                    placeholder="0812xxxx"
                    className="w-full rounded-lg border border-gray-200 p-2 text-xs"
                  />
                </div>
              </div>
            )}

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
                {loading ? 'Mengirim...' : 'Kirim Laporan Sanggah'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

