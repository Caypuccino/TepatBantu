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

export const checkNikStatus = async (nik) => {
  try {
    // Attempt real API call if backend is available
    // const res = await apiClient.post('/bansos/check-nik', { nik });
    // return res.data;
  } catch (err) {
    console.warn('Backend API unavailable, falling back to prototype mock data:', err);
  }

  // Prototype mock fallback
  await new Promise((r) => setTimeout(r, 600)); // Simulate latency
  const cleanNik = (nik || '').replace(/\D/g, '');

  if (DUMMY_RECIPIENTS[cleanNik]) {
    return {
      success: true,
      found: true,
      data: DUMMY_RECIPIENTS[cleanNik],
    };
  }

  return {
    success: true,
    found: false,
    message: 'Data NIK tidak ditemukan dalam daftar penerima aktif periode berjalan. Anda dapat mengajukan usulan mandiri melalui menu Pengajuan Bantuan.',
  };
};

export const submitPengajuan = async (formData) => {
  await new Promise((r) => setTimeout(r, 800));
  const trackingId = 'TB-USL-' + Math.floor(100000 + Math.random() * 900000);
  return {
    success: true,
    trackingId,
    message: 'Usulan mandiri Anda berhasil didaftarkan dan sedang menunggu verifikasi petugas wilayah.',
  };
};

export const submitSanggahan = async (formData) => {
  await new Promise((r) => setTimeout(r, 800));
  const ticketId = 'TB-SGH-' + Math.floor(100000 + Math.random() * 900000);
  return {
    success: true,
    ticketId,
    message: 'Laporan sanggahan telah diterima dengan aman. Identitas Anda terenkripsi dan terlindungi.',
  };
};

export default apiClient;

