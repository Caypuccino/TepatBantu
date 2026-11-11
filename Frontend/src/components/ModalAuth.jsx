import React, { useState } from 'react';

export default function ModalAuth({ mode, onClose, onSwitchMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setNama] = useState('');
  const [nik, setNik] = useState('');
  const [simulatedLogin, setSimulatedLogin] = useState(false);

  if (!mode) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSimulatedLogin(true);
    setTimeout(() => {
      alert(`Berhasil ${mode === 'login' ? 'masuk' : 'mendaftar'} ke dalam portal TepatBantu!`);
      setSimulatedLogin(false);
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#003828]/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#ebf6ef] pb-3">
          <div>
            <span className="eyebrow">PORTAL RESMI WARGA</span>
            <h2 className="face-bold mt-1 text-2xl text-[#003828]">
              {mode === 'login'
                ? 'Masuk ke Akun'
                : mode === 'register'
                ? 'Daftar Akun Baru'
                : 'Profil Pengguna'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#003828] font-bold text-lg hover:bg-[#dce9df]"
          >
            ×
          </button>
        </div>

        {mode === 'profile' ? (
          <div className="mt-5 space-y-4 text-sm text-[#3f4944]">
            <div className="flex items-center gap-4 bg-[#ebf6ef] p-4 rounded-xl">
              <div className="size-12 rounded-full bg-[#00513b] text-white flex items-center justify-center text-lg font-bold">
                TB
              </div>
              <div>
                <strong className="block text-base text-[#003828]">Warga Tamu (Simulasi)</strong>
                <span className="text-xs text-[#57605d]">Belum Terautentikasi</span>
              </div>
            </div>
            <p className="text-xs text-[#57605d]">
              Silakan masuk atau daftar untuk menyimpan riwayat pengecekan NIK dan memantau tiket sanggahan Anda secara terpusat.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onSwitchMode('login')}
                className="flex-1 rounded-xl bg-[#00513b] py-2.5 text-xs font-semibold text-white hover:bg-[#003828]"
              >
                Masuk
              </button>
              <button
                onClick={() => onSwitchMode('register')}
                className="flex-1 rounded-xl border border-[#00513b] py-2.5 text-xs font-semibold text-[#00513b] hover:bg-[#ebf6ef]"
              >
                Daftar Akun
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#003828] mb-1">
                    Nama Lengkap Sesuai KTP *
                  </label>
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama lengkap"
                    className="w-full rounded-lg border border-gray-200 bg-[#ebf6ef]/50 p-2.5 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#003828] mb-1">
                    Nomor Induk Kependudukan (NIK) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={nik}
                    onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                    placeholder="16 digit NIK"
                    className="w-full rounded-lg border border-gray-200 bg-[#ebf6ef]/50 p-2.5 text-sm outline-none"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-[#003828] mb-1">
                Alamat Email atau Nomor Ponsel *
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com atau 0812xxxx"
                className="w-full rounded-lg border border-gray-200 bg-[#ebf6ef]/50 p-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#003828] mb-1">
                Kata Sandi *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full rounded-lg border border-gray-200 bg-[#ebf6ef]/50 p-2.5 text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={simulatedLogin}
              className="face-semibold mt-4 w-full rounded-xl bg-[#00513b] py-3 text-sm text-white shadow-sm hover:bg-[#003828] transition"
            >
              {simulatedLogin ? 'Memproses...' : mode === 'login' ? 'Masuk Sekarang' : 'Daftar Akun'}
            </button>

            <div className="pt-2 text-center text-xs text-[#57605d]">
              {mode === 'login' ? (
                <p>
                  Belum punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => onSwitchMode('register')}
                    className="font-bold text-[#176b50] hover:underline"
                  >
                    Daftar di sini
                  </button>
                </p>
              ) : (
                <p>
                  Sudah punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => onSwitchMode('login')}
                    className="font-bold text-[#176b50] hover:underline"
                  >
                    Masuk di sini
                  </button>
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

