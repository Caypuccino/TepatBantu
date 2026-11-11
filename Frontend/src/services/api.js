// Mock API service for TepatBantu
// Ready to connect to Laravel Backend (Sanctum / REST API)
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Sample mock data for prototype demonstration
const DUMMY_RECIPIENTS = {
  '3273012809920001': {
    nik: '3273012809920001',
    nama: 'Budi Santoso',
    kabupaten: 'Kota Bandung',
    kecamatan: 'Coblong',
    kelurahan: 'Dago',
    status: 'TERDAFTAR & AKTIF',
    kategori: 'Penerima Aktif (KPM)',
    program: [
      {
        nama: 'Program Keluarga Harapan (PKH)',
        tahap: 'Tahap III - 2026',
        nominal: 'Rp 750.000 / triwulan',
        statusPenyaluran: 'Siap Disalurkan',
        lokasiPenyalur: 'Bank BRI KCP Dago Bandung',
        jadwal: '15 - 25 November 2026',
      },
      {
        nama: 'Bantuan Pangan Non Tunai (BPNT)',
        tahap: 'November 2026',
        nominal: 'Sembako Senilai Rp 200.000',
        statusPenyaluran: 'Tersalurkan',
        lokasiPenyalur: 'e-Warong Mandiri Kel. Dago',
        jadwal: '05 November 2026',
      },
    ],
    terakhirSinkron: '10 November 2026, 08:30 WIB',
  },
  '3205011204890002': {
    nik: '3205011204890002',
    nama: 'Siti Aminah',
    kabupaten: 'Kab. Garut',
    kecamatan: 'Tarogong Kidul',
    kelurahan: 'Sukagalih',
    status: 'DALAM VERIFIKASI LAPANGAN',
    kategori: 'Usulan Mandiri 2026',
    program: [
      {
        nama: 'Bantuan Langsung Tunai (BLT)',
        tahap: 'Verifikasi Usulan Mandiri',
        nominal: 'Rp 600.000',
        statusPenyaluran: 'Menunggu Validasi Kelurahan',
        lokasiPenyalur: 'Kantor Pos Cabang Garut',
        jadwal: 'Estimasi Akhir November 2026',
      },
    ],
    terakhirSinkron: '09 November 2026, 14:15 WIB',
  },
};

export const checkNikStatus = async (nik, wilayah, kecamatan) => {
  try {
    const res = await apiClient.post('/v1/public/check-bansos', { nik, wilayah, kecamatan });
    return res.data;
  } catch (err) {
    // Handle validation errors (422) or other errors
    if (err.response?.status === 422) {
      throw {
        code: 'VALIDATION_ERROR',
        message: err.response?.data?.message || 'NIK harus 16 digit',
        errors: err.response?.data?.errors,
      };
    }

    if (err.response?.status === 429) {
      throw {
        code: 'RATE_LIMITED',
        message: 'Terlalu banyak permintaan. Coba lagi dalam beberapa menit.',
      };
    }

    console.warn('Backend API error:', err);
    throw {
      code: 'SERVER_ERROR',
      message: 'Terjadi kesalahan server. Silakan coba beberapa saat lagi.',
    };
  }
};

export const submitPengajuan = async (formData) => {
  try {
    // Tembak ke API Laravel yang akan kita buat
    const res = await apiClient.post('/v1/public/pengajuan', formData);
    return res.data;
  } catch (err) {
    throw {
      code: 'SERVER_ERROR',
      message: err.response?.data?.message || 'Gagal mengirim usulan.',
    };
  }
};

export const submitSanggahan = async (formData) => {
  try {
    const res = await apiClient.post('/v1/public/sanggahan', formData);
    return res.data;
  } catch (err) {
    throw {
      code: 'SERVER_ERROR',
      message: err.response?.data?.message || 'Gagal mengirim pengaduan.',
    };
  }
};

export default apiClient;

