// API service for TepatBantu
// Terhubung ke Laravel Backend (Sanctum / REST API)
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const PETUGAS_TOKEN_KEY = 'tepatbantu_petugas_token';
const PETUGAS_USER_KEY = 'tepatbantu_petugas_user';

// ─── Token helpers ────────────────────────────────────────────────────────────

export const tokenManager = {
  getToken: () => localStorage.getItem(PETUGAS_TOKEN_KEY),
  setToken: (token) => localStorage.setItem(PETUGAS_TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(PETUGAS_TOKEN_KEY),

  getUser: () => {
    try {
      const raw = localStorage.getItem(PETUGAS_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setUser: (user) => localStorage.setItem(PETUGAS_USER_KEY, JSON.stringify(user)),
  removeUser: () => localStorage.removeItem(PETUGAS_USER_KEY),

  clear: () => {
    localStorage.removeItem(PETUGAS_TOKEN_KEY);
    localStorage.removeItem(PETUGAS_USER_KEY);
  },
};

// ─── Axios instance ───────────────────────────────────────────────────────────

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor — sematkan Bearer token jika ada
apiClient.interceptors.request.use((config) => {
  const token = tokenManager.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — tangani 401 (token expired / invalid)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Hapus sesi petugas yang tidak valid
      tokenManager.clear();
    }
    return Promise.reject(error);
  }
);

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

// Login terpadu berbasis peran (WARGA / PETUGAS / ADMIN)
// POST /api/v1/auth/login
export const loginUser = async (email, password) => {
  try {
    const res = await apiClient.post('/v1/auth/login', { email, password });
    const { token, user } = res.data?.data ?? {};

    if (!user) {
      throw {
        code: 'INVALID_RESPONSE',
        message: 'Respon autentikasi dari server tidak valid.',
      };
    }

    // Simpan token & user di localStorage
    tokenManager.setToken(token);
    tokenManager.setUser(user);

    return { token, user };
  } catch (err) {
    // Lempar error domain kita apa adanya
    if (err.code) throw err;

    if (err.response?.status === 401) {
      throw {
        code: 'INVALID_CREDENTIALS',
        message: err.response?.data?.error?.message || 'Email atau kata sandi salah.',
      };
    }

    if (err.response?.status === 422) {
      const errors = err.response?.data?.errors ?? {};
      const firstMsg = Object.values(errors)[0]?.[0];
      throw {
        code: 'VALIDATION_ERROR',
        message: firstMsg || err.response?.data?.message || 'Format masukan tidak valid.',
        errors,
      };
    }

    if (err.response?.status === 429) {
      throw {
        code: 'RATE_LIMITED',
        message: 'Terlalu banyak percobaan masuk. Silakan tunggu beberapa menit.',
      };
    }

    console.error('loginUser API error:', err);
    throw {
      code: 'SERVER_ERROR',
      message: 'Tidak dapat terhubung ke server backend.',
    };
  }
};

// Login petugas — POST /api/v1/auth/login (dengan validasi role PETUGAS)
export const loginPetugas = async (email, password) => {
  const result = await loginUser(email, password);
  const { user } = result;

  // Pastikan role PETUGAS — tolak role lain
  if (!user || user.role !== 'PETUGAS') {
    tokenManager.clear();
    throw {
      code: 'UNAUTHORIZED_ROLE',
      message: 'Akun ini bukan akun Petugas Operasional Lapangan.',
    };
  }

  return result;
};

// Logout pengguna (Warga / Petugas) — POST /api/v1/auth/logout
export const logoutUser = async () => {
  try {
    await apiClient.post('/v1/auth/logout');
  } catch {
    // Abaikan kegagalan jaringan saat logout
  } finally {
    tokenManager.clear();
  }
};

// Logout petugas alias
export const logoutPetugas = logoutUser;

export const fetchPetugasMe = async () => {
  const res = await apiClient.get('/v1/auth/me');
  return res.data?.data;
};

// ─── Officer API Functions ────────────────────────────────────────────────────

/**
 * GET /api/v1/officer/dashboard
 * Statistik ringkasan untuk dashboard petugas
 */
export const fetchOfficerDashboard = async () => {
  const res = await apiClient.get('/v1/officer/dashboard');
  return res.data?.data;
};

/**
 * GET /api/v1/officer/proposals
 * Daftar usulan/proposal di wilayah kerja petugas
 * @param {Object} params - { status, date_from, date_to, page, page_size }
 */
export const fetchOfficerProposals = async (params = {}) => {
  const res = await apiClient.get('/v1/officer/proposals', { params });
  return res.data;
};

/**
 * POST /api/v1/officer/proposals/{id}/actions
 * Kirim tindakan verifikasi pada usulan (APPROVE / REJECT / REQUEST_REVISION)
 * @param {string} id  - ID proposal
 * @param {string} action - 'APPROVE' | 'REJECT' | 'REQUEST_REVISION'
 * @param {string} note   - Catatan petugas
 */
export const submitOfficerProposalAction = async (id, action, note = '') => {
  const res = await apiClient.post(`/v1/officer/proposals/${id}/actions`, { action, note });
  return res.data?.data;
};

/**
 * GET /api/v1/officer/citizens
 * Data warga DTKS di wilayah kerja petugas
 * @param {Object} params - { q, page, page_size }
 */
export const fetchOfficerCitizens = async (params = {}) => {
  const res = await apiClient.get('/v1/officer/citizens', { params });
  return res.data;
};

/**
 * GET /api/v1/officer/complaints
 * Daftar sanggahan / tiket pengaduan warga
 * @param {Object} params - { status, date_from, date_to, page, page_size }
 */
export const fetchOfficerComplaints = async (params = {}) => {
  const res = await apiClient.get('/v1/officer/complaints', { params });
  return res.data;
};

/**
 * POST /api/v1/officer/complaints/{id}/actions
 * Kirim tindakan pada sanggahan (INVESTIGATE / RESOLVE / CLOSE / REQUEST_INFO)
 * @param {string} id     - ID complaint
 * @param {string} action - 'INVESTIGATE' | 'RESOLVE' | 'CLOSE' | 'REQUEST_INFO'
 * @param {string} note   - Catatan petugas
 */
export const submitOfficerComplaintAction = async (id, action, note = '') => {
  const res = await apiClient.post(`/v1/officer/complaints/${id}/actions`, { action, note });
  return res.data?.data;
};

/**
 * GET /api/v1/officer/distributions
 * Data titik penyaluran bantuan di wilayah petugas
 * @param {Object} params - { page, page_size }
 */
export const fetchOfficerDistributions = async (params = {}) => {
  const res = await apiClient.get('/v1/officer/distributions', { params });
  return res.data;
};

export default apiClient;

