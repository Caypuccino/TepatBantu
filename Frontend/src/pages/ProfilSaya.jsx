import React, { useState } from 'react';
import {
  User,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  Lock,
  Edit3,
  Save,
  Check,
  FileText,
  AlertCircle,
  Building,
  LogOut,
  QrCode,
  Eye,
  KeyRound,
  Download,
} from 'lucide-react';

export default function ProfilSaya({ currentUser, onNavigate, onLogout, onUpdateProfile }) {
  const [activeTab, setActiveTab] = useState('biodata'); // 'biodata', 'keluarga', 'keamanan'
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State edit profil
  const [formData, setFormData] = useState({
    nama: currentUser?.nama || 'Bpk. Rahmat Hidayat',
    nik: currentUser?.nik || '3273012809920001',
    noKk: currentUser?.noKk || '3273011405080004',
    telepon: currentUser?.telepon || '0812-2025-9981',
    email: currentUser?.email || 'rahmat.hidayat@warga.id',
    jenisKelamin: 'Laki-Laki',
    tempatLahir: 'Bandung',
    tanggalLahir: '28 September 1982',
    pekerjaan: 'Buruh Harian Lepas',
    provinsi: 'Jawa Barat',
    kota: 'Kota Bandung',
    kecamatan: 'Bandung Kulon',
    kelurahan: 'Cibuntu',
    alamat: 'Jl. Bojong Raya Gg. Pelita No. 14, RT 04 / RW 07',
  });

  const anggotaKeluarga = [
    {
      nama: 'Bpk. Rahmat Hidayat',
      hubungan: 'Kepala Keluarga',
      nik: '3273012809920001',
      statusDTKS: 'Terdaftar Aktif (PKH & Sembako)',
      usia: '43 Tahun',
    },
    {
      nama: 'Ibu Sumiyati',
      hubungan: 'Istri',
      nik: '3273016504850002',
      statusDTKS: 'Terdaftar Aktif (Komponen Ibu Rumah Tangga)',
      usia: '39 Tahun',
    },
    {
      nama: 'Fajar Nugraha',
      hubungan: 'Anak (Siswa SMA)',
      nik: '3273011201080003',
      statusDTKS: 'Penerima Bantuan Pendidikan PIP',
      usia: '16 Tahun',
    },
    {
      nama: 'Siti Aisyah',
      hubungan: 'Anak (Siswa SD)',
      nik: '3273014508150004',
      statusDTKS: 'Penerima PKH Kategori SD',
      usia: '9 Tahun',
    },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    onUpdateProfile?.(formData);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f1fcf4] text-[#3f4944] pt-20 pb-20">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#57605d]" aria-label="Breadcrumb">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="flex items-center gap-1 hover:text-[#003828] hover:underline"
          >
            <span>⌂</span> Beranda
          </button>
          <span>/</span>
          <span className="font-semibold text-[#003828]">Profil Akun Terverifikasi</span>
        </nav>

        {/* Notifikasi Simpan Berhasil */}
        {savedSuccess && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#b5efd8] bg-[#ebf6ef] p-3 text-xs text-[#003828] animate-in fade-in">
            <CheckCircle2 className="size-4 shrink-0 text-[#176b50]" />
            <span>Perubahan data profil berhasil disimpan dan disinkronisasi ke server kependudukan.</span>
          </div>
        )}

        {/* Hero Card Profil Pengguna */}
        <div className="mt-4 rounded-2xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#003828] text-2xl font-bold text-white shadow-xs">
                {formData.nama.charAt(0)}
                <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-[#176b50] text-white border-2 border-white">
                  <Check className="size-3 stroke-[3]" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="face-bold text-lg text-[#003828] sm:text-xl">
                    {formData.nama}
                  </h1>
                  <span className="rounded-lg bg-[#ebf6ef] border border-[#b5efd8] px-2 py-0.5 text-[10px] font-semibold text-[#00513b]">
                    ✓ NIK Terpadan SIAK & DTKS
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#57605d]">
                  <span className="font-mono">NIK: <strong>{formData.nik}</strong></span>
                  <span>•</span>
                  <span className="font-mono">No. KK: <strong>{formData.noKk}</strong></span>
                </div>
                <span className="mt-0.5 block text-[11px] text-[#707974]">
                  Domisili: Kel. {formData.kelurahan}, Kec. {formData.kecamatan}, {formData.kota}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="face-semibold flex items-center gap-1.5 rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-4 py-2 text-xs text-[#003828] hover:bg-[#ebf6ef] transition"
              >
                <Edit3 className="size-3.5" /> {isEditing ? 'Batal Edit' : 'Perbarui Kontak'}
              </button>
              <button
                onClick={onLogout}
                className="face-semibold flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-600 hover:bg-red-100 transition"
              >
                <LogOut className="size-3.5" /> Keluar Akun
              </button>
            </div>
          </div>

          {/* Tab Menu Profil */}
          <div className="mt-6 flex flex-wrap gap-2 border-t border-[#ebf6ef] pt-4 text-xs">
            <button
              onClick={() => setActiveTab('biodata')}
              className={`rounded-lg px-4 py-2 font-semibold transition ${
                activeTab === 'biodata'
                  ? 'bg-[#003828] text-white shadow-xs'
                  : 'bg-white border border-[#dce9df] text-[#57605d] hover:bg-gray-50'
              }`}
            >
              Data Pribadi & Domisili
            </button>
            <button
              onClick={() => setActiveTab('keluarga')}
              className={`rounded-lg px-4 py-2 font-semibold transition ${
                activeTab === 'keluarga'
                  ? 'bg-[#003828] text-white shadow-xs'
                  : 'bg-white border border-[#dce9df] text-[#57605d] hover:bg-gray-50'
              }`}
            >
              Anggota Keluarga (1 KK)
            </button>
            <button
              onClick={() => setActiveTab('keamanan')}
              className={`rounded-lg px-4 py-2 font-semibold transition ${
                activeTab === 'keamanan'
                  ? 'bg-[#003828] text-white shadow-xs'
                  : 'bg-white border border-[#dce9df] text-[#57605d] hover:bg-gray-50'
              }`}
            >
              Keamanan & PIN Akses
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: DATA PRIBADI & DOMISILI                                            */}
        {/* ========================================================================= */}
        {activeTab === 'biodata' && (
          <form onSubmit={handleSave} className="mt-4 space-y-4">
            
            {/* Box 1: Data Kependudukan Pokok */}
            <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
              <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                <div className="flex items-center gap-2">
                  <User className="size-4 text-[#176b50]" />
                  <h2 className="face-bold text-sm text-[#003828]">
                    Data Kependudukan Resmi (SIAK Kemendagri)
                  </h2>
                </div>
                <span className="flex items-center gap-1 rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] font-semibold text-[#00513b]">
                  <Lock className="size-3" /> Terkunci Permanen
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3 text-xs">
                <div className="rounded-xl border border-[#dce9df] bg-[#f8fdfa] p-3">
                  <span className="text-[10px] uppercase tracking-wider text-[#707974]">NOMOR INDUK KEPENDUDUKAN</span>
                  <strong className="mt-1 block font-mono text-sm text-[#003828]">{formData.nik}</strong>
                  <span className="text-[10px] text-[#176b50]">Status: Kepala Keluarga</span>
                </div>

                <div className="rounded-xl border border-[#dce9df] bg-[#f8fdfa] p-3">
                  <span className="text-[10px] uppercase tracking-wider text-[#707974]">NOMOR KARTU KELUARGA</span>
                  <strong className="mt-1 block font-mono text-sm text-[#003828]">{formData.noKk}</strong>
                  <span className="text-[10px] text-[#176b50]">Dukcapil Kota Bandung</span>
                </div>

                <div className="rounded-xl border border-[#dce9df] bg-[#f8fdfa] p-3">
                  <span className="text-[10px] uppercase tracking-wider text-[#707974]">TEMPAT, TANGGAL LAHIR</span>
                  <strong className="mt-1 block text-sm text-[#003828]">{formData.tempatLahir}, {formData.tanggalLahir}</strong>
                  <span className="text-[10px] text-[#707974]">{formData.jenisKelamin}</span>
                </div>
              </div>
            </div>

            {/* Box 2: Kontak & Komunikasi (Bisa diedit) */}
            <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
              <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-[#176b50]" />
                  <h2 className="face-bold text-sm text-[#003828]">
                    Kontak WhatsApp & Saluran Verifikasi
                  </h2>
                </div>
                {isEditing && (
                  <span className="rounded bg-yellow-100 px-2 py-0.5 text-[10px] font-semibold text-yellow-800">
                    Mode Edit Aktif
                  </span>
                )}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="face-semibold block text-xs text-[#003828]">
                    Nomor WhatsApp / Ponsel Aktif <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.telepon}
                    onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                    className="mt-1.5 h-10 w-full rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3 font-mono text-xs text-[#003828] outline-none disabled:bg-gray-50 focus:border-[#176b50]"
                  />
                  <p className="mt-1 text-[10px] text-[#707974]">
                    Nomor ini menerima notifikasi survei lapangan dan jadwal pencairan bansos.
                  </p>
                </div>

                <div>
                  <label className="face-semibold block text-xs text-[#003828]">
                    Alamat Email / Surel
                  </label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1.5 h-10 w-full rounded-xl border border-[#dce9df] bg-[#f8fdfa] px-3 text-xs text-[#003828] outline-none disabled:bg-gray-50 focus:border-[#176b50]"
                  />
                  <p className="mt-1 text-[10px] text-[#707974]">
                    Digunakan untuk cadangan dokumen bukti verifikasi digital.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3: Alamat Domisili Aktual */}
            <div className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6">
              <div className="flex items-center gap-2 border-b border-[#ebf6ef] pb-3">
                <MapPin className="size-4 text-[#176b50]" />
                <h2 className="face-bold text-sm text-[#003828]">
                  Alamat Domisili Tempat Tinggal Faktual
                </h2>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-4 text-xs">
                <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#707974]">PROVINSI</span>
                  <strong className="block mt-0.5 text-xs text-[#003828]">{formData.provinsi}</strong>
                </div>
                <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#707974]">KOTA / KABUPATEN</span>
                  <strong className="block mt-0.5 text-xs text-[#003828]">{formData.kota}</strong>
                </div>
                <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#707974]">KECAMATAN</span>
                  <strong className="block mt-0.5 text-xs text-[#003828]">{formData.kecamatan}</strong>
                </div>
                <div className="rounded-lg border border-[#dce9df] bg-[#f8fdfa] p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#707974]">KELURAHAN</span>
                  <strong className="block mt-0.5 text-xs text-[#003828]">{formData.kelurahan}</strong>
                </div>
              </div>

              <div className="mt-3">
                <label className="face-semibold block text-xs text-[#003828]">
                  Alamat Lengkap & Patokan Rumah
                </label>
                <textarea
                  rows={2}
                  disabled={!isEditing}
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[#dce9df] bg-[#f8fdfa] p-3 text-xs text-[#003828] outline-none disabled:bg-gray-50 focus:border-[#176b50]"
                />
              </div>

              {isEditing && (
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="face-semibold flex items-center gap-1.5 rounded-xl bg-[#00513b] px-6 py-2.5 text-xs text-white shadow-xs hover:bg-[#003828] transition"
                  >
                    <Save className="size-3.5" /> Simpan Perubahan Profil
                  </button>
                </div>
              )}
            </div>

          </form>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ANGGOTA KELUARGA (1 KK)                                            */}
        {/* ========================================================================= */}
        {activeTab === 'keluarga' && (
          <div className="mt-4 rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-3">
              <div>
                <h2 className="face-bold text-sm text-[#003828]">
                  Daftar Anggota Keluarga Terdaftar (KK: {formData.noKk})
                </h2>
                <p className="text-[11px] text-[#707974]">
                  Anggota keluarga yang tercantum di kartu keluarga dan berhak menerima komponen bansos terpadu.
                </p>
              </div>
              <span className="rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] font-semibold text-[#00513b]">
                Total 4 Jiwa Terdaftar
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {anggotaKeluarga.map((ang, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#dce9df] bg-[#f8fdfa] p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <strong className="text-xs text-[#003828]">{ang.nama}</strong>
                      <span className="rounded bg-[#00513b] px-2 py-0.5 text-[9px] font-bold text-white">
                        {ang.hubungan}
                      </span>
                    </div>
                    <span className="mt-1 block font-mono text-[11px] text-[#57605d]">
                      NIK: {ang.nik}
                    </span>
                    <span className="mt-2 inline-block rounded bg-[#e6f4ea] px-2 py-0.5 text-[10px] font-semibold text-[#137333]">
                      ✓ {ang.statusDTKS}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-[#ebf6ef] pt-2 text-[10px] text-[#707974]">
                    <span>Usia: {ang.usia}</span>
                    <span className="text-[#176b50] font-medium">Valid Dukcapil</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: KEAMANAN & PIN AKSES                                               */}
        {/* ========================================================================= */}
        {activeTab === 'keamanan' && (
          <div className="mt-4 rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs sm:p-6 space-y-4">
            <div className="border-b border-[#ebf6ef] pb-3">
              <h2 className="face-bold text-sm text-[#003828]">
                Pengaturan Keamanan Akun & PIN Transaksi
              </h2>
              <p className="text-[11px] text-[#707974]">
                Kelola kata sandi akun, autentikasi dua langkah (2FA), dan PIN 6-digit verifikasi bansos.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#dce9df] bg-[#f8fdfa] p-4">
                <div className="flex items-center gap-2">
                  <KeyRound className="size-4 text-[#176b50]" />
                  <strong className="text-xs text-[#003828]">Ubah Kata Sandi Akun</strong>
                </div>
                <p className="mt-1 text-[11px] text-[#707974]">
                  Gunakan kombinasi minimal 8 karakter dengan angka dan simbol unik.
                </p>
                <button
                  type="button"
                  onClick={() => alert('Fitur ganti kata sandi dibuka via SMS/WhatsApp')}
                  className="mt-3 rounded-lg border border-[#dce9df] bg-white px-3 py-1.5 text-xs font-semibold text-[#003828] hover:bg-gray-50"
                >
                  Ubah Kata Sandi Sekarang
                </button>
              </div>

              <div className="rounded-xl border border-[#dce9df] bg-[#f8fdfa] p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-[#176b50]" />
                  <strong className="text-xs text-[#003828]">PIN 6-Digit Verifikasi e-Warong / Pos</strong>
                </div>
                <p className="mt-1 text-[11px] text-[#707974]">
                  PIN rahasia untuk otorisasi saat pencairan beras atau sembako di loket.
                </p>
                <button
                  type="button"
                  onClick={() => alert('PIN 6-digit saat ini aktif dan terenkripsi.')}
                  className="mt-3 rounded-lg border border-[#dce9df] bg-white px-3 py-1.5 text-xs font-semibold text-[#003828] hover:bg-gray-50"
                >
                  Atur Ulang PIN 6-Digit
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

