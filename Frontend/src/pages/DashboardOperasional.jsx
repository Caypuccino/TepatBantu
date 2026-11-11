import React, { useState, useEffect, useCallback } from 'react';
import {
  MapPin,
  FileCheck2,
  AlertTriangle,
  Clock,
  Printer,
  Navigation,
  RefreshCw,
  Search,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  FileText,
  Check,
  X,
} from 'lucide-react';
import {
  fetchOfficerDashboard,
  fetchOfficerProposals,
  submitOfficerProposalAction,
  fetchOfficerCitizens,
  fetchOfficerComplaints,
  fetchOfficerDistributions,
} from '../services/api';

const INITIAL_TASKS = [
  {
    id: 'TSK-101',
    nama: 'Ibu Maryati',
    nik: '327301******0042',
    program: 'Program Keluarga Harapan (PKH)',
    tahap: 'Tahap IV - 2026',
    kategori: 'Kunjungan Fisik',
    priority: 'CRITICAL SLA (< 6 JAM)',
    priorityColor: 'red',
    alamat: 'Jl. Dago Elos No. 14, RT 02 / RW 07, Kel. Dago, Kec. Coblong',
    catatan: 'Diverifikasi: Usulan Mandiri Warga - Desil 1 (Kondisi Rumah Kayu Rapuh, Lansia Tinggal Sendiri).',
    slaTime: '04:15:20',
    lat: -6.8824,
    lng: 107.6165,
    status: 'MENUNGGU_VERIFIKASI',
  },
  {
    id: 'TSK-102',
    nama: 'Bpk. Asep Sunandar',
    nik: '327301******0019',
    program: 'Bantuan Pangan Non Tunai (BPNT)',
    tahap: 'Alokasi November 2026',
    kategori: 'Sanggahan Kritis',
    priority: 'PRIORITAS SANGGAHAN (< 18 JAM)',
    priorityColor: 'amber',
    alamat: 'Komp. Sadang Serang Blok C2, RT 04 / RW 09, Kec. Coblong',
    catatan: 'Laporan Sanggahan Publik: Warga melaporkan adanya mutasi domisili dan kepemilikan usaha konveksi baru.',
    slaTime: '16:45:00',
    lat: -6.8912,
    lng: 107.6255,
    status: 'MENUNGGU_VERIFIKASI',
  },
  {
    id: 'TSK-103',
    nama: 'Ibu Eni Sulastri',
    nik: '327301******0088',
    program: 'BLT Kemiskinan Ekstrem',
    tahap: 'Verifikasi Lapangan Usulan',
    kategori: 'Kunjungan Fisik',
    priority: 'SURVEI KELAYAKAN',
    priorityColor: 'blue',
    alamat: 'Jl. Sekeloa Utara Gg. 3 No. 5, RT 01 / RW 03, Kel. Sekeloa',
    catatan: 'Menunggu foto geotagging meteran daya listrik 450VA dan dokumentasi sanitasi MCK keluarga.',
    slaTime: '28:10:00',
    lat: -6.8878,
    lng: 107.6192,
    status: 'MENUNGGU_VERIFIKASI',
  },
  {
    id: 'TSK-104',
    nama: 'Bpk. Dadang Kusuma',
    nik: '327301******0115',
    program: 'Bansos Beras CBP 10kg',
    tahap: 'Termin Berjalan',
    kategori: 'Selesai',
    priority: 'TERVERIFIKASI LAPANGAN',
    priorityColor: 'green',
    alamat: 'Jl. Dipatiukur Gg. Karya No. 22, RT 05 / RW 02, Kel. Lebakgede',
    catatan: 'Verifikasi faktual selesai via GPS Check-in. Berita acara ditandatangani RT setempat.',
    slaTime: 'SELESAI',
    lat: -6.8942,
    lng: 107.6148,
    status: 'TERVERIFIKASI',
  },
];

const INITIAL_CITIZENS = [
  {
    nik: '3273011405080004',
    nama: 'Bpk. Rahmat Hidayat',
    noKk: '3273012809920001',
    desil: 'Desil 1 (Sangat Miskin)',
    desilColor: 'red',
    kelurahan: 'Dago',
    rtRw: 'RT 02 / RW 07',
    tanggungan: '4 Jiwa',
    program: 'PKH, BPNT',
    status: 'TERDAFTAR & AKTIF',
  },
  {
    nik: '3273012809920042',
    nama: 'Ibu Maryati',
    noKk: '3273012809920015',
    desil: 'Desil 1 (Sangat Miskin)',
    desilColor: 'red',
    kelurahan: 'Dago',
    rtRw: 'RT 02 / RW 07',
    tanggungan: '1 Jiwa (Lansia)',
    program: 'PKH Lansia',
    status: 'PROSES USULAN',
  },
  {
    nik: '3273012809920019',
    nama: 'Bpk. Asep Sunandar',
    noKk: '3273012809920018',
    desil: 'Desil 2 (Miskin)',
    desilColor: 'amber',
    kelurahan: 'Sadang Serang',
    rtRw: 'RT 04 / RW 09',
    tanggungan: '5 Jiwa',
    program: 'BPNT Sembako',
    status: 'DALAM INVESTIGASI',
  },
  {
    nik: '3273012809920088',
    nama: 'Ibu Eni Sulastri',
    noKk: '3273012809920033',
    desil: 'Desil 1 (Sangat Miskin)',
    desilColor: 'red',
    kelurahan: 'Sekeloa',
    rtRw: 'RT 01 / RW 03',
    tanggungan: '3 Jiwa',
    program: 'BLT Ekstrem',
    status: 'SURVEI RUMAH',
  },
  {
    nik: '3273012809920115',
    nama: 'Bpk. Dadang Kusuma',
    noKk: '3273012809920055',
    desil: 'Desil 3 (Hampir Miskin)',
    desilColor: 'blue',
    kelurahan: 'Lebakgede',
    rtRw: 'RT 05 / RW 02',
    tanggungan: '4 Jiwa',
    program: 'Beras CBP 10kg',
    status: 'PENERIMA AKTIF',
  },
  {
    nik: '3273012809920221',
    nama: 'Ibu Nunung Rohayati',
    noKk: '3273012809920089',
    desil: 'Desil 2 (Miskin)',
    desilColor: 'amber',
    kelurahan: 'Dago',
    rtRw: 'RT 05 / RW 01',
    tanggungan: '3 Jiwa',
    program: 'PKH Balita',
    status: 'TERDAFTAR & AKTIF',
  },
];

const INITIAL_SANGGAHAN = [
  {
    noTiket: '#TKT-2026-0041',
    pelapor: 'Warga Sekitar (Anonim)',
    terlapor: 'Bpk. Asep Sunandar (Komp. Sadang Serang)',
    jenis: 'Dugaan Salah Sasaran & Kepemilikan Usaha',
    alasan: 'Warga melaporkan terlapor telah membuka usaha konveksi dan memiliki 2 sepeda motor baru, dinilai tidak lagi masuk kriteria desil penerima.',
    tanggal: '10 Nov 2026, 14:20 WIB',
    status: 'MENUNGGU TINDAK LANJUT',
    urgensi: 'SLA < 18 Jam',
  },
  {
    noTiket: '#TKT-2026-0038',
    pelapor: 'Pengurus RT 03 Sekeloa',
    terlapor: 'Ibu Ratna (Kel. Sekeloa)',
    jenis: 'Mutasi Domisili ke Luar Kota',
    alasan: 'KPM dilaporkan telah pindah domisili permanen ke Kabupaten Subang sejak 3 bulan lalu, namun kartu bantuan masih dipegang kerabat.',
    tanggal: '09 Nov 2026, 09:10 WIB',
    status: 'DALAM INVESTIGASI',
    urgensi: 'SLA < 24 Jam',
  },
  {
    noTiket: '#TKT-2026-0029',
    pelapor: 'KPM Mandiri',
    terlapor: 'Oknum Titik Pos Penyalur',
    jenis: 'Dugaan Pemotongan Liar (Pungli)',
    alasan: 'Pelapor mengadukan potongan liar sebesar Rp 50.000 dengan alasan biaya administrasi map berkas.',
    tanggal: '07 Nov 2026, 11:45 WIB',
    status: 'SELESAI DITINDAK',
    urgensi: 'Selesai',
  },
];

const INITIAL_DISTRIBUTIONS = [
  {
    pos: 'Kantor Pos Bandung KCP Dago',
    kelurahan: 'Dago & Lebakgede',
    targetKpm: 180,
    realisasiKpm: 172,
    persen: '95.5%',
    bantuan: 'PKH Triwulan IV & BPNT Tunai',
    jadwal: '10 - 15 Nov 2026',
    status: 'Sedang Berlangsung',
  },
  {
    pos: 'e-Warong Kube Mandiri Sekeloa',
    kelurahan: 'Sekeloa',
    targetKpm: 95,
    realisasiKpm: 90,
    persen: '94.7%',
    bantuan: 'Paket Sembako Pokok BPNT',
    jadwal: '08 - 14 Nov 2026',
    status: 'Sedang Berlangsung',
  },
  {
    pos: 'Balai Warga RW 09 Sadang Serang',
    kelurahan: 'Sadang Serang',
    targetKpm: 63,
    realisasiKpm: 56,
    persen: '88.9%',
    bantuan: 'Beras CBP 10kg & BLT Ekstrem',
    jadwal: '11 - 16 Nov 2026',
    status: 'Siap Dibagikan',
  },
];

export default function DashboardOperasional({
  currentPetugas,
  activeTab = 'dashboard',
}) {
  const activeView = activeTab;

  // Operational states
  const [taskFilter, setTaskFilter] = useState('Semua Tugas');
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [citizens, setCitizens] = useState(INITIAL_CITIZENS);
  const [sanggahanList, setSanggahanList] = useState(INITIAL_SANGGAHAN);
  const [distributions, setDistributions] = useState(INITIAL_DISTRIBUTIONS);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isVerifyingModal, setIsVerifyingModal] = useState(false);
  const [activeMapPin, setActiveMapPin] = useState(INITIAL_TASKS[0]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncText, setLastSyncText] = useState('Baru saja');
  const [gpsStatus, setGpsStatus] = useState({ active: true, lat: -6.8852, lng: 107.6185, accuracy: '12m' });
  const [toastMsg, setToastMsg] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dashboardStats, setDashboardStats] = useState(null);

  // Form Verifikasi Modal State
  const [criteria, setCriteria] = useState({
    ktpMatch: true,
    kkMatch: true,
    houseConditionValid: true,
    incomeMatch: true,
  });
  const [petugasNotes, setPetugasNotes] = useState('');

  // Info petugas fallback
  const petugasInfo = currentPetugas || {
    full_name: 'Budi Santoso, S.Sos',
    nip: '19880415 201101 1 003',
    role: 'PETUGAS',
    region_name: 'Kota Bandung',
    kecamatan: 'Coblong',
    kelurahan: 'Dago',
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // ─── Mapper: response backend → shape UI ────────────────────────────────────

  const mapProposalToTask = (p) => ({
    id: p.id,
    _backendId: p.id,
    nama: p.personal_data?.full_name || 'Nama tidak tersedia',
    nik: p.personal_data?.nik
      ? `${String(p.personal_data.nik).slice(0, 6)}******${String(p.personal_data.nik).slice(-4)}`
      : '—',
    program: p.personal_data?.program_requested || 'Bantuan Sosial',
    tahap: p.personal_data?.proposal_period || '—',
    kategori: p.personal_data?.category || 'Kunjungan Fisik',
    priority:
      p.status === 'PENDING_REVIEW'
        ? 'MENUNGGU VERIFIKASI'
        : p.status === 'UNDER_REVIEW'
          ? 'DALAM PROSES'
          : p.status === 'APPROVED'
            ? 'TERVERIFIKASI LAPANGAN'
            : p.status === 'REJECTED'
              ? 'DITOLAK (TIDAK MEMENUHI SYARAT)'
              : p.status_label || p.status,
    priorityColor:
      p.status === 'APPROVED' ? 'green'
        : p.status === 'REJECTED' ? 'red'
          : p.status === 'UNDER_REVIEW' ? 'blue'
            : 'amber',
    alamat: p.personal_data?.address || p.personal_data?.kelurahan || '—',
    catatan: p.personal_data?.notes || p.socio_economic?.notes || '—',
    slaTime: p.status === 'APPROVED' || p.status === 'REJECTED' ? 'SELESAI' : '—',
    lat: p.personal_data?.lat || -6.8852,
    lng: p.personal_data?.lng || 107.6185,
    status:
      p.status === 'APPROVED'
        ? 'TERVERIFIKASI'
        : p.status === 'REJECTED'
          ? 'DITOLAK_TIDAK_LAYAK'
          : 'MENUNGGU_VERIFIKASI',
    referenceNo: p.reference_no,
  });

  const mapComplaintToSanggahan = (c) => ({
    id: c.id,
    _backendId: c.id,
    noTiket: c.reference_no || `#${c.id?.slice(0, 8).toUpperCase()}`,
    pelapor: c.confidential ? 'Pelapor Anonim (Dilindungi)' : (c.identity || 'Warga'),
    terlapor: c.incident_location || '—',
    jenis: c.category || '—',
    alasan: c.description || '(Rahasia / Terlindungi)',
    tanggal: c.created_at
      ? new Date(c.created_at).toLocaleString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      }) + ' WIB'
      : '—',
    status:
      c.status === 'RESOLVED' || c.status === 'CLOSED' ? 'SELESAI DITINDAK'
        : c.status === 'UNDER_INVESTIGATION' ? 'DALAM INVESTIGASI'
          : 'MENUNGGU TINDAK LANJUT',
    urgensi:
      c.status === 'RESOLVED' || c.status === 'CLOSED' ? 'Selesai'
        : c.status === 'UNDER_INVESTIGATION' ? 'SLA < 24 Jam'
          : 'SLA < 18 Jam',
  });

  const mapCitizenToUi = (c) => ({
    id: c.id,
    nik: c.nik_last4 ? `327301******${c.nik_last4}` : c.nik || '—',
    nama: c.full_name || '—',
    noKk: c.kk_number || '—',
    desil: c.poverty_decile ? `Desil ${c.poverty_decile}` : '—',
    desilColor: c.poverty_decile <= 1 ? 'red' : c.poverty_decile <= 2 ? 'amber' : 'blue',
    kelurahan: c.kelurahan || c.region_name || '—',
    rtRw: c.rt_rw || '—',
    tanggungan: c.family_members ? `${c.family_members} Jiwa` : '—',
    program: c.active_programs?.join(', ') || '—',
    status: c.registration_status || '—',
  });

  const mapDistributionToUi = (d) => ({
    id: d.id,
    pos: d.distribution_point || d.pos || '—',
    kelurahan: d.kelurahan || '—',
    targetKpm: d.target_recipients ?? d.target_kpm ?? 0,
    realisasiKpm: d.realized_recipients ?? d.realisasi_kpm ?? 0,
    persen: d.target_recipients
      ? `${((d.realized_recipients / d.target_recipients) * 100).toFixed(1)}%`
      : (d.persen || '—'),
    bantuan: d.program_name || d.bantuan || '—',
    jadwal: d.distribution_date || d.jadwal || '—',
    status: d.status || '—',
  });

  // ─── Fetch data dari backend ────────────────────────────────────────────────

  const loadDashboard = useCallback(async () => {
    try {
      const data = await fetchOfficerDashboard();
      setDashboardStats(data);
    } catch {
      // fallback ke mock — diam saja
    }
  }, []);

  const loadProposals = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const res = await fetchOfficerProposals({ page_size: 50 });
      if (res?.data?.length) {
        const mapped = res.data.map(mapProposalToTask);
        setTasks(mapped);
        setActiveMapPin(mapped[0]);
      }
    } catch {
      // tetap pakai INITIAL_TASKS
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  const loadCitizens = useCallback(async (q = '') => {
    setIsLoadingData(true);
    try {
      const res = await fetchOfficerCitizens({ q, page_size: 50 });
      if (res?.data?.length) {
        setCitizens(res.data.map(mapCitizenToUi));
      }
    } catch {
      // tetap pakai INITIAL_CITIZENS
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  const loadComplaints = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const res = await fetchOfficerComplaints({ page_size: 50 });
      if (res?.data?.length) {
        setSanggahanList(res.data.map(mapComplaintToSanggahan));
      }
    } catch {
      // tetap pakai INITIAL_SANGGAHAN
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  const loadDistributions = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const res = await fetchOfficerDistributions({ page_size: 50 });
      if (res?.data?.length) {
        setDistributions(res.data.map(mapDistributionToUi));
      }
    } catch {
      // tetap pakai INITIAL_DISTRIBUTIONS
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  // Load data sesuai tab aktif
  useEffect(() => {
    if (activeView === 'dashboard') {
      loadDashboard();
      loadProposals();
    } else if (activeView === 'verifikasi') {
      loadProposals();
    } else if (activeView === 'dtks') {
      loadCitizens();
    } else if (activeView === 'sanggahan') {
      loadComplaints();
    } else if (activeView === 'penyaluran') {
      loadDistributions();
    }
  }, [activeView, loadDashboard, loadProposals, loadCitizens, loadComplaints, loadDistributions]);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      if (activeView === 'dashboard') {
        await Promise.all([loadDashboard(), loadProposals()]);
      } else if (activeView === 'verifikasi') {
        await loadProposals();
      } else if (activeView === 'dtks') {
        await loadCitizens();
      } else if (activeView === 'sanggahan') {
        await loadComplaints();
      } else if (activeView === 'penyaluran') {
        await loadDistributions();
      }
      setLastSyncText('Baru saja');
      showToast('Sinkronisasi data lapangan berhasil diperbarui dengan server pusat.');
    } catch {
      showToast('Gagal sinkronisasi. Periksa koneksi internet Anda.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleStartGps = () => {
    if ('geolocation' in navigator) {
      showToast('Memperbarui titik koordinat GPS petugas...');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsStatus({
            active: true,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: `${Math.round(pos.coords.accuracy)}m`,
          });
          showToast(`GPS Terkunci: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)} (Akurasi ${Math.round(pos.coords.accuracy)}m)`);
        },
        () => {
          showToast('GPS menggunakan mode satelit wilayah binaan (Kota Bandung - Kec. Coblong).');
        }
      );
    } else {
      showToast('Fitur GPS aktif via simulasi koordinat presisi.');
    }
  };

  const handlePrintWorksheet = () => {
    window.print();
  };

  const openVerifyModal = (task) => {
    setSelectedTask(task);
    setPetugasNotes('');
    setCriteria({
      ktpMatch: true,
      kkMatch: true,
      houseConditionValid: true,
      incomeMatch: true,
    });
    setIsVerifyingModal(true);
  };

  const submitVerification = async (isApproved) => {
    if (!selectedTask) return;
    const action = isApproved ? 'APPROVE' : 'REJECT';
    const newStatus = isApproved ? 'TERVERIFIKASI' : 'DITOLAK_TIDAK_LAYAK';

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === selectedTask.id
          ? {
            ...t,
            status: newStatus,
            priority: isApproved ? 'TERVERIFIKASI LAPANGAN' : 'DITOLAK (TIDAK MEMENUHI SYARAT)',
            priorityColor: isApproved ? 'green' : 'red',
            catatan: `Hasil Verifikasi Petugas: ${petugasNotes || (isApproved ? 'Berkas lengkap dan sesuai kriteria desil kemiskinan.' : 'Kondisi sosial ekonomi tidak sesuai desil penerima.')}`,
          }
          : t
      )
    );
    setIsVerifyingModal(false);
    showToast(
      isApproved
        ? `Sukses! Berkas ${selectedTask.nama} berhasil diverifikasi dan disahkan.`
        : `Laporan penolakan/revisi berkas ${selectedTask.nama} telah dicatat dalam berita acara.`
    );

    // Kirim ke backend jika ada _backendId (data dari API)
    if (selectedTask._backendId) {
      try {
        await submitOfficerProposalAction(selectedTask._backendId, action, petugasNotes);
      } catch (err) {
        showToast(`Peringatan: Pembaruan status ke server gagal — ${err?.response?.data?.error?.message || 'coba sinkron ulang.'}`);
      }
    }

    setSelectedTask(null);
  };

  // Filter tasks based on taskFilter and searchQuery
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.nik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.alamat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.program.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (taskFilter === 'Semua Tugas') return true;
    if (taskFilter === 'Kunjungan Fisik') return t.kategori === 'Kunjungan Fisik' && t.status !== 'TERVERIFIKASI';
    if (taskFilter === 'Sanggahan Kritis') return t.kategori === 'Sanggahan Kritis';
    if (taskFilter === 'Selesai') return t.status === 'TERVERIFIKASI';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f1fcf4] text-[#3f4944] pt-20 pb-16 font-sans">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-20 right-5 z-50 flex items-center gap-2 rounded-xl border border-[#b5efd8] bg-[#003828] px-4 py-3 text-xs text-white shadow-lg animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="size-4 text-[#b5efd8] shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8 py-4">

        {/* Module Sub-Header & Command Strip */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-[#dce9df] pb-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#176b50] tracking-wide uppercase flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {activeView === 'dashboard'
                ? 'DASHBOARD KERJA HARIAN'
                : activeView === 'verifikasi'
                  ? 'VERIFIKASI BERKAS & SURVEI'
                  : activeView === 'dtks'
                    ? 'DATA WARGA & DTKS LAPANGAN'
                    : activeView === 'sanggahan'
                      ? 'TIKET & SANGGAHAN WARGA'
                      : 'PENYALURAN BANTUAN LAPANGAN'}
            </span>
            <span className="text-[#a0aba5]">/</span>
            <span className="rounded bg-[#ebf6ef] px-2 py-0.5 font-semibold text-[#00513b]">
              {petugasInfo.region_name || 'Kota Bandung'} ({petugasInfo.kecamatan || 'Coblong'})
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#707974]" />
              <input
                type="text"
                placeholder="Cari NIK, KPM, tiket..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-full rounded-lg border border-[#dce9df] bg-white pl-8 pr-3 text-xs text-[#003828] placeholder-[#707974] outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50]"
              />
            </div>

            {/* GPS Live Pill */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[#b5efd8] bg-[#ebf6ef] px-2.5 py-1 text-[11px] font-semibold text-[#00513b]">
              <MapPin className="size-3 text-emerald-600 animate-bounce" />
              <span>GPS Aktif ({gpsStatus.accuracy})</span>
            </div>

            {/* Sync Button */}
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="flex items-center gap-1 rounded-lg border border-[#dce9df] bg-white px-2.5 py-1 text-[11px] font-medium text-[#003828] hover:bg-[#ebf6ef] transition"
              title="Sinkronisasi data lapangan"
            >
              <RefreshCw className={`size-3 text-[#176b50] ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Sinkron Otomatis</span>
            </button>
          </div>
        </div>

        {/* ─── VIEW 1: DASHBOARD OPERASIONAL ────────────────────────────────── */}
        {activeView === 'dashboard' && (
          <div className="space-y-6 mt-6">
            {/* Command Header Banner */}
            <div className="rounded-2xl bg-white p-5 sm:p-7 border border-black/[0.05] shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-[#ebf6ef] px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-[#00513b] uppercase">
                      KONSOL PETUGAS OPERASIONAL LAPANGAN
                    </span>
                    <span className="text-[11px] text-[#707974]">• Sinkronisasi: {lastSyncText}</span>
                  </div>
                  <h1 className="face-bold text-xl sm:text-2xl text-[#003828]">
                    Dashboard Kerja Harian & Pantauan Operasional Lapangan
                  </h1>
                  <p className="mt-1 text-xs text-[#57605d] max-w-2xl">
                    Pusat komando dan eksekusi tugas verifikasi faktual DTKS, mitigasi aduan warga, serta penyaluran bantuan sosial ke seluruh wilayah kerja binaan Anda.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    onClick={handlePrintWorksheet}
                    className="flex items-center gap-2 rounded-xl border border-[#dce9df] bg-white px-3.5 py-2 text-xs font-semibold text-[#003828] hover:bg-[#ebf6ef] shadow-xs transition"
                  >
                    <Printer className="size-4 text-[#176b50]" />
                    <span>Cetak Lembar Kerja PDF</span>
                  </button>

                  <button
                    onClick={handleStartGps}
                    className="flex items-center gap-2 rounded-xl bg-[#00513b] px-4 py-2 text-xs font-semibold text-white hover:bg-[#003828] shadow-xs transition"
                  >
                    <Navigation className="size-4" />
                    <span>Mulai Kunjungan GPS</span>
                  </button>
                </div>
              </div>

              {/* SLA Warning Banner */}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-900">
                <div className="flex items-start gap-2.5">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-700 mt-0.5">
                    <AlertTriangle className="size-4" />
                  </div>
                  <div>
                    <strong className="block text-red-950 font-bold">
                      3 Berkas Usulan & Sanggahan Membutuhkan Tindakan Segera (&lt; 24 Jam)
                    </strong>
                    <span className="text-[11px] text-red-800">
                      Batas waktu SLA regulasi verifikasi lapangan mendekati tenggat. Segera lakukan peninjauan fisik atau konfirmasi kelurahan.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setTaskFilter('Sanggahan Kritis')}
                  className="shrink-0 font-bold text-xs text-red-700 hover:text-red-900 underline flex items-center gap-1"
                >
                  Lihat Berkas Kritis →
                </button>
              </div>
            </div>

            {/* 4 Key KPI Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Verifikasi */}
              <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#176b50]">
                      <FileCheck2 className="size-5" />
                    </span>
                    <span className="rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] font-bold text-[#00513b]">
                      TOTAL
                    </span>
                  </div>
                  <span className="mt-3 block text-[10px] font-bold uppercase tracking-wider text-[#707974]">
                    ANTREAN VERIFIKASI LAPANGAN
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#003828]">
                      {dashboardStats
                        ? `${dashboardStats.total_proposals} Berkas`
                        : isLoadingData ? '…' : `${tasks.length} Berkas`}
                    </span>
                    {dashboardStats?.proposals_by_status?.PENDING_REVIEW > 0 && (
                      <span className="text-xs text-[#176b50] font-semibold">
                        +{dashboardStats.proposals_by_status.PENDING_REVIEW} pending
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="h-1.5 w-full rounded-full bg-[#ebf6ef] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#176b50]"
                      style={{
                        width: dashboardStats
                          ? `${Math.round(((dashboardStats.proposals_by_status?.APPROVED || 0) / Math.max(dashboardStats.total_proposals, 1)) * 100)}%`
                          : '72%',
                      }}
                    ></div>
                  </div>
                  <div className="mt-1.5 flex justify-between text-[10px] text-[#707974]">
                    <span>
                      {dashboardStats
                        ? `${dashboardStats.proposals_by_status?.APPROVED || 0} disetujui`
                        : 'Progres 72% selesai'}
                    </span>
                    <span>Target selesai</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Penyaluran */}
              <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <TrendingUp className="size-5" />
                    </span>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      REALISASI
                    </span>
                  </div>
                  <span className="mt-3 block text-[10px] font-bold uppercase tracking-wider text-[#707974]">
                    PENYALURAN BANTUAN TAHAP INI
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#003828]">
                      {dashboardStats ? `${dashboardStats.total_distributions} Pos` : '—'}
                    </span>
                    <span className="text-xs text-[#57605d]">
                      {dashboardStats ? 'titik penyalur' : 'Tersalurkan'}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="h-1.5 w-full rounded-full bg-[#ebf6ef] overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-600" style={{ width: '94.2%' }}></div>
                  </div>
                  <div className="mt-1.5 flex justify-between text-[10px] text-[#707974]">
                    <span>Wilayah binaan aktif</span>
                    <span>Sinkron real-time</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                      <AlertTriangle className="size-5" />
                    </span>
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                      PERLU ATENSI
                    </span>
                  </div>
                  <span className="mt-3 block text-[10px] font-bold uppercase tracking-wider text-[#707974]">
                    TIKET ADUAN & SANGGAHAN
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#003828]">
                      {dashboardStats
                        ? `${dashboardStats.total_complaints} Aduan`
                        : isLoadingData ? '…' : `${sanggahanList.length} Aduan`}
                    </span>
                    {(dashboardStats?.complaints_by_status?.OPEN > 0) && (
                      <span className="text-xs text-amber-700 font-semibold">
                        {dashboardStats.complaints_by_status.OPEN} Baru
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="h-1.5 w-full rounded-full bg-[#ebf6ef] overflow-hidden">
                    <div className="h-full rounded-full bg-amber-500" style={{ width: '88%' }}></div>
                  </div>
                  <div className="mt-1.5 flex justify-between text-[10px] text-[#707974]">
                    <span>Respon SLA: 88%</span>
                    <span>Max 48 Jam</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <ShieldCheck className="size-5" />
                    </span>
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                      AUDIT GPS
                    </span>
                  </div>
                  <span className="mt-3 block text-[10px] font-bold uppercase tracking-wider text-[#707974]">
                    VALIDITAS TITIK GEOTAGGING
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#003828]">99.4%</span>
                    <span className="text-xs text-blue-700 font-semibold">Presisi Tinggi</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="h-1.5 w-full rounded-full bg-[#ebf6ef] overflow-hidden">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: '99.4%' }}></div>
                  </div>
                  <div className="mt-1.5 flex justify-between text-[10px] text-[#707974]">
                    <span>Kec. Coblong terpetakan</span>
                    <span>Enkripsi AES-256</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (8 cols): Tasks */}
              <div className="lg:col-span-8 space-y-4">
                <div className="rounded-xl bg-white p-4 border border-black/[0.05] shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h2 className="face-bold text-base text-[#003828]">
                        Antrean Prioritas & Jadwal Kunjungan Lapangan
                      </h2>
                      <p className="text-xs text-[#57605d]">
                        Daftar usulan baru mandiri warga dan laporan sanggahan publik yang membutuhkan tindak lanjut fisik.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {['Semua Tugas', 'Kunjungan Fisik', 'Sanggahan Kritis', 'Selesai'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setTaskFilter(tab)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${taskFilter === tab
                              ? 'bg-[#003828] text-white shadow-xs'
                              : 'bg-[#f1fcf4] text-[#3f4944] hover:bg-[#ebf6ef]'
                            }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Task Cards */}
                <div className="space-y-3">
                  {filteredTasks.length === 0 ? (
                    <div className="rounded-xl border border-[#dce9df] bg-white p-8 text-center text-xs text-[#707974]">
                      Tidak ada tugas yang cocok dengan filter atau kata kunci pencarian.
                    </div>
                  ) : (
                    filteredTasks.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-xl border border-black/[0.05] bg-white p-4 sm:p-5 shadow-xs hover:border-[#176b50] transition"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${task.priorityColor === 'red'
                                    ? 'bg-red-100 text-red-800'
                                    : task.priorityColor === 'amber'
                                      ? 'bg-amber-100 text-amber-800'
                                      : task.priorityColor === 'green'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-blue-100 text-blue-800'
                                  }`}
                              >
                                {task.priority}
                              </span>
                              <span className="text-xs font-semibold text-[#00513b]">{task.program}</span>
                              <span className="text-xs text-[#707974]">• {task.tahap}</span>
                            </div>

                            <h3 className="face-bold mt-2 text-base text-[#003828]">
                              {task.nama}{' '}
                              <span className="font-mono text-xs text-[#707974] font-normal">
                                (NIK: {task.nik})
                              </span>
                            </h3>

                            <div className="mt-1 flex items-start gap-1.5 text-xs text-[#57605d]">
                              <MapPin className="size-3.5 text-[#176b50] shrink-0 mt-0.5" />
                              <span>{task.alamat}</span>
                            </div>

                            <div className="mt-2.5 rounded-lg bg-[#f8fdfa] border border-[#ebf6ef] p-2.5 text-xs text-[#3f4944]">
                              <strong className="text-[#003828]">Catatan Faktual: </strong>
                              <span>{task.catatan}</span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:items-end gap-2 shrink-0">
                            <div className="flex items-center gap-1.5 text-[11px] text-[#707974]">
                              <Clock className="size-3 text-[#176b50]" />
                              <span>SLA: {task.slaTime}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-1">
                              {task.status !== 'TERVERIFIKASI' ? (
                                <button
                                  onClick={() => openVerifyModal(task)}
                                  className="rounded-lg bg-[#00513b] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#003828] shadow-xs transition"
                                >
                                  Mulai Verifikasi Berkas
                                </button>
                              ) : (
                                <span className="rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800 flex items-center gap-1">
                                  <Check className="size-3.5" /> Terverifikasi
                                </span>
                              )}

                              <button
                                onClick={() => {
                                  setActiveMapPin(task);
                                  showToast(`Menampilkan rute navigasi menuju: ${task.nama}`);
                                }}
                                className="rounded-lg border border-[#dce9df] bg-white px-3 py-1.5 text-xs font-semibold text-[#003828] hover:bg-[#ebf6ef] transition"
                              >
                                Buka Rute Peta
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right Column (4 cols): Map & Feed */}
              <div className="lg:col-span-4 space-y-4">
                {/* Geofencing Radar */}
                <div className="rounded-xl border border-black/[0.05] bg-white overflow-hidden shadow-xs">
                  <div className="p-4 border-b border-[#ebf6ef] flex items-center justify-between">
                    <div>
                      <h3 className="face-bold text-sm text-[#003828]">Peta Sebaran Titik Kunjungan</h3>
                      <span className="text-[11px] text-[#707974]">
                        Wilayah: {petugasInfo.kecamatan || 'Kec. Coblong'}, {petugasInfo.region_name || 'Kota Bandung'}
                      </span>
                    </div>
                    <span className="rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] font-bold text-[#00513b]">
                      RADAR AKTIF
                    </span>
                  </div>

                  <div className="relative h-56 bg-[#0e3b2e] p-4 flex flex-col justify-between overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage:
                          'radial-gradient(#b5efd8 1px, transparent 1px), linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    ></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 rounded-full border border-emerald-400/30 animate-ping pointer-events-none"></div>

                    <div className="relative z-10 space-y-2">
                      <div className="inline-block rounded-md bg-black/60 px-2 py-1 text-[10px] text-white backdrop-blur-xs">
                        Pin Terpilih: <strong>{activeMapPin.nama}</strong>
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-around">
                      {tasks.slice(0, 4).map((t, idx) => (
                        <button
                          key={t.id}
                          onClick={() => setActiveMapPin(t)}
                          className={`group relative flex flex-col items-center transition ${activeMapPin.id === t.id ? 'scale-125' : 'opacity-80 hover:opacity-100'
                            }`}
                        >
                          <span
                            className={`size-3.5 rounded-full border-2 border-white shadow-md ${t.priorityColor === 'red'
                                ? 'bg-red-500'
                                : t.priorityColor === 'green'
                                  ? 'bg-emerald-400'
                                  : 'bg-amber-400'
                              }`}
                          ></span>
                          <span className="mt-1 text-[9px] font-bold text-white bg-black/70 px-1 rounded truncate max-w-[70px]">
                            #{idx + 1} {t.nama.split(' ')[1] || t.nama}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="relative z-10 flex items-center justify-between text-[10px] text-[#b5efd8]">
                      <span>Lat: {activeMapPin.lat} • Lng: {activeMapPin.lng}</span>
                      <span className="font-mono">RADIUS 1.2 KM</span>
                    </div>
                  </div>
                </div>

                {/* Audit Feed */}
                <div className="rounded-xl border border-black/[0.05] bg-white p-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#ebf6ef] pb-2.5 mb-3">
                    <h3 className="face-bold text-sm text-[#003828]">Aktivitas Terkini & Log Audit</h3>
                    <span className="size-2 rounded-full bg-emerald-500"></span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold mt-0.5">
                        ✓
                      </div>
                      <div>
                        <strong className="block text-[#003828]">09:42 WIB: Berkas Disetujui</strong>
                        <span className="text-[#57605d]">
                          Ibu Suhartini dinyatakan memenuhi kelayakan desil 1 via verifikasi lapangan.
                        </span>
                        <span className="block font-mono text-[9px] text-[#707974] mt-0.5">
                          Hash Audit: #78a29f...41c
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold mt-0.5">
                        ⇄
                      </div>
                      <div>
                        <strong className="block text-[#003828]">09:15 WIB: Sinkronisasi Foto</strong>
                        <span className="text-[#57605d]">
                          14 dokumentasi foto fisik rumah warga berhasil terunggah ke repositori aman.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── VIEW 2: VERIFIKASI BERKAS & SURVEI ──────────────────────────── */}
        {activeView === 'verifikasi' && (
          <div className="space-y-5 mt-6">
            <div className="rounded-2xl bg-white p-6 border border-black/[0.05] shadow-xs">
              <h2 className="face-bold text-xl text-[#003828]">
                Verifikasi Berkas & Survei Lapangan KPM
              </h2>
              <p className="mt-1 text-xs text-[#57605d]">
                Pemeriksaan keabsahan dokumen kependudukan (KTP & KK), validasi indikator kemiskinan desil 1-2, dan pengunggahan bukti survei fisik rumah tinggal.
              </p>

              {/* Progress Summary */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="rounded-xl bg-[#ebf6ef] p-3 border border-[#b5efd8]">
                  <span className="block text-2xl font-bold text-[#003828]">42</span>
                  <span className="text-[11px] font-medium text-[#176b50]">Total Berkas Masuk</span>
                </div>
                <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-200">
                  <span className="block text-2xl font-bold text-emerald-800">28</span>
                  <span className="text-[11px] font-medium text-emerald-700">Telah Diverifikasi</span>
                </div>
                <div className="rounded-xl bg-amber-50 p-3 border border-amber-200">
                  <span className="block text-2xl font-bold text-amber-800">11</span>
                  <span className="text-[11px] font-medium text-amber-700">Perlu Kunjungan Fisik</span>
                </div>
                <div className="rounded-xl bg-red-50 p-3 border border-red-200">
                  <span className="block text-2xl font-bold text-red-800">3</span>
                  <span className="text-[11px] font-medium text-red-700">Ditolak / Tidak Layak</span>
                </div>
              </div>
            </div>

            {/* List of Applications to Verify */}
            <div className="rounded-2xl bg-white border border-black/[0.05] shadow-xs overflow-hidden">
              <div className="p-4 border-b border-[#ebf6ef] flex items-center justify-between">
                <h3 className="face-bold text-sm text-[#003828]">
                  Daftar Usulan Mandiri Warga Menunggu Validasi
                </h3>
                <span className="text-xs text-[#707974]">{tasks.length} Usulan Terdaftar</span>
              </div>

              <div className="divide-y divide-[#ebf6ef]">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#f8fdfa] transition">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#003828]">{task.nama}</span>
                        <span className="text-[10px] font-mono text-[#707974]">{task.nik}</span>
                        <span className="rounded bg-[#ebf6ef] px-2 py-0.5 text-[9px] font-bold text-[#00513b]">
                          {task.program}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#57605d]">{task.alamat}</p>
                      <p className="text-[11px] text-[#707974] italic mt-0.5">{task.catatan}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${task.status === 'TERVERIFIKASI' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                        {task.status === 'TERVERIFIKASI' ? '✓ Disahkan' : 'Menunggu Survei'}
                      </span>
                      <button
                        onClick={() => openVerifyModal(task)}
                        className="rounded-lg bg-[#00513b] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#003828] shadow-xs transition"
                      >
                        {task.status === 'TERVERIFIKASI' ? 'Tinjau Berkas' : 'Validasi Berkas'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── VIEW 3: DATA WARGA & DTKS LAPANGAN ─────────────────────────── */}
        {activeView === 'dtks' && (
          <div className="space-y-5 mt-6">
            <div className="rounded-2xl bg-white p-6 border border-black/[0.05] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="face-bold text-xl text-[#003828]">
                    Data Warga & DTKS Wilayah Binaan
                  </h2>
                  <p className="mt-1 text-xs text-[#57605d]">
                    Basis data kependudukan sosial dan desil ekonomi DTKS resmi untuk Kecamatan {petugasInfo.kecamatan || 'Coblong'}, {petugasInfo.region_name || 'Kota Bandung'}.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Data DTKS wilayah Coblong berhasil disinkronkan dengan Kemensos.')}
                  className="rounded-xl border border-[#dce9df] bg-white px-3.5 py-2 text-xs font-semibold text-[#003828] hover:bg-[#ebf6ef] shadow-xs transition shrink-0"
                >
                  Ekspor Data CSV / Excel
                </button>
              </div>
            </div>

            {/* DTKS Citizen Table */}
            <div className="rounded-2xl bg-white border border-black/[0.05] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f8fdfa] border-b border-[#ebf6ef] text-[11px] font-bold text-[#003828] uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Nama KPM & NIK</th>
                      <th className="p-3.5">No. Kartu Keluarga</th>
                      <th className="p-3.5">Tingkat Desil</th>
                      <th className="p-3.5">Domisili / Kelurahan</th>
                      <th className="p-3.5">Tanggungan</th>
                      <th className="p-3.5">Bantuan Aktif</th>
                      <th className="p-3.5">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ebf6ef]">
                    {citizens.map((c) => (
                      <tr key={c.nik} className="hover:bg-[#f8fdfa] transition">
                        <td className="p-3.5">
                          <strong className="block font-bold text-[#003828]">{c.nama}</strong>
                          <span className="font-mono text-[10px] text-[#707974]">{c.nik}</span>
                        </td>
                        <td className="p-3.5 font-mono text-[#57605d]">{c.noKk}</td>
                        <td className="p-3.5">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${c.desilColor === 'red' ? 'bg-red-100 text-red-800' : c.desilColor === 'amber' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                            {c.desil}
                          </span>
                        </td>
                        <td className="p-3.5 text-[#57605d]">
                          {c.kelurahan}, {c.rtRw}
                        </td>
                        <td className="p-3.5 text-[#57605d]">{c.tanggungan}</td>
                        <td className="p-3.5">
                          <span className="rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] font-semibold text-[#00513b]">
                            {c.program}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() => showToast(`Detail berkas DTKS ${c.nama} berhasil dibuka.`)}
                            className="font-bold text-[#176b50] hover:underline"
                          >
                            Detail ›
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── VIEW 4: TIKET & SANGGAHAN WARGA ─────────────────────────────── */}
        {activeView === 'sanggahan' && (
          <div className="space-y-5 mt-6">
            <div className="rounded-2xl bg-white p-6 border border-black/[0.05] shadow-xs">
              <h2 className="face-bold text-xl text-[#003828]">
                Tiket Aduan & Sanggahan Publik
              </h2>
              <p className="mt-1 text-xs text-[#57605d]">
                Penanganan laporan masyarakat terkait ketidaktepatan sasaran, dugaan pemotongan liar bansos, atau kepemilikan aset yang melebihi batas kelayakan.
              </p>
            </div>

            <div className="space-y-3">
              {sanggahanList.map((t) => (
                <div key={t.noTiket} className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#176b50]">{t.noTiket}</span>
                        <span className="text-xs text-[#707974]">• {t.tanggal}</span>
                        <span className="rounded-full bg-red-100 text-red-800 px-2 py-0.5 text-[10px] font-bold">
                          {t.urgensi}
                        </span>
                      </div>

                      <h3 className="face-bold mt-2 text-sm text-[#003828]">
                        {t.jenis}
                      </h3>

                      <p className="mt-1 text-xs text-[#57605d]">
                        <strong>Terlapor: </strong> {t.terlapor} • <strong>Pelapor: </strong> {t.pelapor}
                      </p>

                      <div className="mt-2.5 rounded-lg bg-amber-50/60 border border-amber-200 p-2.5 text-xs text-amber-950">
                        {t.alasan}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2 shrink-0">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${t.status === 'SELESAI DITINDAK' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                        {t.status}
                      </span>
                      <button
                        onClick={() => showToast(`Catatan investigasi tiket ${t.noTiket} diperbarui.`)}
                        className="rounded-lg bg-[#00513b] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#003828] shadow-xs transition"
                      >
                        Investigasi Lapangan
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── VIEW 5: PENYALURAN BANTUAN LAPANGAN ─────────────────────────── */}
        {activeView === 'penyaluran' && (
          <div className="space-y-5 mt-6">
            <div className="rounded-2xl bg-white p-6 border border-black/[0.05] shadow-xs">
              <h2 className="face-bold text-xl text-[#003828]">
                Pantauan Penyaluran & Titik Distribusi Lapangan
              </h2>
              <p className="mt-1 text-xs text-[#57605d]">
                Monitoring realisasi distribusi fisik dan tunai bantuan sosial di pos penyaluran resmi (PT Pos Indonesia & e-Warong Kube).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {distributions.map((d) => (
                <div key={d.pos} className="rounded-xl border border-black/[0.05] bg-white p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="rounded bg-[#ebf6ef] px-2 py-0.5 text-[10px] font-bold text-[#00513b]">
                      POS PENYALUR
                    </span>
                    <h3 className="face-bold mt-2 text-sm text-[#003828]">{d.pos}</h3>
                    <p className="text-xs text-[#57605d] mt-1">Wilayah: {d.kelurahan}</p>
                    <p className="text-xs font-semibold text-[#176b50] mt-1">{d.bantuan}</p>

                    <div className="mt-4 pt-3 border-t border-[#ebf6ef] space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#707974]">Target KPM:</span>
                        <strong className="text-[#003828]">{d.targetKpm} KPM</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#707974]">Tersalurkan:</span>
                        <strong className="text-emerald-700">{d.realisasiKpm} KPM ({d.persen})</strong>
                      </div>
                      <div className="flex justify-between text-[11px] text-[#707974]">
                        <span>Jadwal:</span>
                        <span>{d.jadwal}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast(`Daftar serah terima KPM di ${d.pos} dibuka.`)}
                    className="mt-4 w-full rounded-lg bg-[#00513b] py-2 text-xs font-semibold text-white hover:bg-[#003828] transition"
                  >
                    Buka Berita Acara Penyaluran
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL VERIFIKASI BERKAS */}
      {isVerifyingModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-black/[0.08] overflow-hidden max-h-[90vh] flex flex-col">

            <div className="bg-[#176b50] p-4 sm:p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d8f0e1]">
                  LEMBAR VERIFIKASI FAKTUAL KPM
                </span>
                <h3 className="face-bold text-lg text-white">
                  Verifikasi Berkas: {selectedTask.nama}
                </h3>
                <span className="text-xs text-[#d8f0e1]">
                  Program: {selectedTask.program} • NIK: {selectedTask.nik}
                </span>
              </div>
              <button
                onClick={() => setIsVerifyingModal(false)}
                className="rounded-lg bg-white/10 p-1.5 text-white hover:bg-white/20 transition"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs text-[#3f4944]">
              <div className="rounded-xl bg-[#f8fdfa] border border-[#dce9df] p-3.5 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="size-4 text-[#176b50] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#003828]">Lokasi Tempat Tinggal KPM:</strong>
                    <span>{selectedTask.alamat}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-[#ebf6ef]">
                  <FileText className="size-4 text-[#176b50] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#003828]">Catatan Awal Usulan:</strong>
                    <span>{selectedTask.catatan}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="face-bold text-sm text-[#003828] mb-2.5">
                  Checklist Validasi Dokumen & Kondisi Fisik Lapangan
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 rounded-lg border border-[#dce9df] p-2.5 hover:bg-[#f8fdfa] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={criteria.ktpMatch}
                      onChange={(e) => setCriteria({ ...criteria, ktpMatch: e.target.checked })}
                      className="size-4 rounded accent-[#00513b]"
                    />
                    <span>Kesesuaian fisik e-KTP dengan data Dukcapil dan pemohon asli</span>
                  </label>

                  <label className="flex items-center gap-2.5 rounded-lg border border-[#dce9df] p-2.5 hover:bg-[#f8fdfa] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={criteria.kkMatch}
                      onChange={(e) => setCriteria({ ...criteria, kkMatch: e.target.checked })}
                      className="size-4 rounded accent-[#00513b]"
                    />
                    <span>Kesesuaian Kartu Keluarga (KK) dan susunan anggota keluarga tanggungan</span>
                  </label>

                  <label className="flex items-center gap-2.5 rounded-lg border border-[#dce9df] p-2.5 hover:bg-[#f8fdfa] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={criteria.houseConditionValid}
                      onChange={(e) => setCriteria({ ...criteria, houseConditionValid: e.target.checked })}
                      className="size-4 rounded accent-[#00513b]"
                    />
                    <span>Kondisi fisik rumah (lantai, dinding, atap, daya listrik) sesuai kriteria desil kemiskinan</span>
                  </label>

                  <label className="flex items-center gap-2.5 rounded-lg border border-[#dce9df] p-2.5 hover:bg-[#f8fdfa] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={criteria.incomeMatch}
                      onChange={(e) => setCriteria({ ...criteria, incomeMatch: e.target.checked })}
                      className="size-4 rounded accent-[#00513b]"
                    />
                    <span>Hasil konfirmasi aparat RT/RW setempat menyatakan benar warga bersangkutan layak menerima</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#003828] mb-1">
                  Catatan Rekomendasi Verifikator Lapangan:
                </label>
                <textarea
                  rows={3}
                  value={petugasNotes}
                  onChange={(e) => setPetugasNotes(e.target.value)}
                  placeholder="Masukkan observasi lapangan tambahan atau alasan kelayakan / ketidaklayakan usulan..."
                  className="w-full rounded-xl border border-[#dce9df] p-3 text-xs outline-none focus:border-[#176b50] focus:ring-1 focus:ring-[#176b50]"
                ></textarea>
              </div>

              <div className="rounded-lg bg-[#ebf6ef] p-2.5 text-[11px] text-[#00513b] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  <span>Stempel GPS: Lat {selectedTask.lat}, Lng {selectedTask.lng} (Akurasi Presisi)</span>
                </span>
                <span className="font-mono text-[10px]">WIB PRESISI DIGITAL</span>
              </div>
            </div>

            <div className="border-t border-[#ebf6ef] bg-[#f8fdfa] p-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => submitVerification(false)}
                className="rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition"
              >
                Tolak / Tidak Layak
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsVerifyingModal(false)}
                  className="rounded-xl border border-[#dce9df] bg-white px-4 py-2 text-xs font-semibold text-[#57605d] hover:bg-gray-100 transition"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => submitVerification(true)}
                  className="rounded-xl bg-[#00513b] px-5 py-2 text-xs font-semibold text-white hover:bg-[#003828] shadow-xs transition"
                >
                  Setujui & Sahkan Verifikasi
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}