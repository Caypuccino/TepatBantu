import { useState, useEffect } from "react";
import CekBansos from "./pages/CekBansos";
import PengajuanSaya from "./pages/PengajuanSaya";
import DetailPengajuan from "./pages/DetailPengajuan";
import BuatUsulanBaru from "./pages/BuatUsulanBaru";
import HalamanPengaduanSaya from "./pages/PengaduanSaya";
import HalamanDataFaktual from "./pages/DataFaktual";
import HalamanPressRelease from "./pages/PressRelease";
import HalamanFAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilSaya from "./pages/ProfilSaya";
import DashboardOperasional from "./pages/DashboardOperasional";
import { tokenManager, logoutUser } from "./services/api";

const A = "/assets";

const services = [
  {
    icon: "c97f2.svg",
    eyebrow: "LAYANAN TRANSPARANSI",
    title: "Cek Status Bansos",
    description:
      "Periksa status kepesertaan PKH, BPNT, dan BLT BBM secara transparan berdasarkan NIK. Menampilkan data jadwal cair, nominal bantuan, dan titik pos penyalur.",
    action: "Mulai Pengecekan",
    note: "Akses 24 Jam",
    target: "cek-bansos",
  },
  {
    icon: "99053.svg",
    eyebrow: "LAYANAN PARTISIPATIF",
    title: "Usulan Kelayakan Mandiri",
    description:
      "Belum terdaftar? Ajukan usulan mandiri lengkap dengan data kondisi sosial ekonomi dan bukti pendukung rumah tangga untuk dinilai kelayakannya oleh tim verifikator.",
    action: "Ajukan Usulan",
    note: "Verifikasi Cepat",
    target: "pengajuan-saya",
  },
  {
    icon: "e37da.svg",
    eyebrow: "LAYANAN PENGAWASAN",
    title: "Sanggah & Pengaduan",
    description:
      "Laporkan ketidaktepatan sasaran, dugaan pemotongan liar, atau kendala penyaluran dengan jaminan kerahasiaan pelapor dan nomor tiket pelacakan otomatis.",
    action: "Buat Laporan Sanggah",
    note: "Anonim & Terlindungi",
    target: "pengaduan-saya",
  },
];

const steps = [
  [
    "bdd06.svg",
    "Pengecekan NIK Mandiri",
    "Warga memasukkan nomor NIK untuk mengecek keberadaan data dalam DTKS maupun daftar penerima bansos berkala.",
  ],
  [
    "16735.svg",
    "Pengajuan Usulan & Dokumen",
    "Unggah berkas Kartu Keluarga, swafoto rumah tinggal, dan pengisian indikator kemiskinan secara jujur dan mandiri.",
  ],
  [
    "71c09.svg",
    "Verifikasi Petugas Wilayah",
    "Pendamping sosial dan aparat kelurahan melakukan validasi lapangan serta uji silang keabsahan dokumen usulan.",
  ],
  [
    "f0a00.svg",
    "Validasi & Penyaluran",
    "Dana bantuan disalurkan langsung melalui Himbara atau PT Pos Indonesia tanpa perantara dan tanpa potongan liar.",
  ],
];

const metrics = [
  [
    "TOTAL DATA WARGA TERDATA",
    "1.240.580",
    "22ea8.svg",
    "+3.2% bln ini",
    "Sumber: DTKS Simulasi 2025",
    "839a6.svg",
  ],
  [
    "USULAN KELAYAKAN MASUK",
    "84.920",
    "4a9b4.svg",
    "91.4% telah diproses",
    "Dari aplikasi mandiri warga",
    "4697e.svg",
  ],
  ["VERIFIKASI LAPANGAN", "92.4%", "2e345.svg", "92.4", "Target target kuartal 95%", ""],
  [
    "PENGADUAN DITINDAKLANJUTI",
    "14.810",
    "e3ad1.svg",
    "Selesai 97.8%",
    "Laporan sanggah publik",
    "",
  ],
];

const articles = [
  {
    image: "182b1.png",
    category: "DISTRIBUSI",
    date: "24 Oktober 2025 • Humas Jawa Barat",
    title: "Penyaluran Bantuan Sembako Tahap III Wilayah Jawa Barat Dimulai",
    text: "Sebanyak 420.000 Keluarga Penerima Manfaat di Jawa Barat mulai menerima alokasi bahan pangan pokok dengan verifikasi berbasis sistem QR identitas digital.",
  },
  {
    image: "7399a.png",
    category: "AKUNTABILITAS",
    date: "18 Oktober 2025 • Satgas Anti-Pungli",
    title: "Mekanisme Sanggah Mandiri Diluncurkan untuk Mencegah Pemotongan Liar",
    text: "Masyarakat kini dapat melaporkan pungutan liar langsung ke dashboard pemantauan pusat dengan enkripsi identitas pelapor dan eskalasi otomatis dalam 48 jam.",
  },
  {
    image: "b7571.png",
    category: "TRANSPARANSI",
    date: "10 Oktober 2025 • Tim Audit Terpadu",
    title: "Laporan Transparansi Bansos Semester I 2025: Efisiensi Naik Signifikan",
    text: "Integrasi verifikasi lapangan digital menurunkan angka salah sasaran hingga 84% pada pilot project di wilayah percontohan DTKS mandiri.",
  },
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  // Determine initial page from URL pathname
  const getInitialPage = () => {
    const pathname = window.location.pathname;
    if (pathname.includes('cek-bansos')) return 'cek-bansos';
    if (pathname.includes('pengajuan-saya')) return 'pengajuan-saya';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [nik, setNik] = useState("");
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [redirectTarget, setRedirectTarget] = useState(null);
  const savedUser = tokenManager.getUser();
  const [currentUser, setCurrentUser] = useState(() => (savedUser?.role === 'WARGA' ? savedUser : null));
  const [currentPetugas, setCurrentPetugas] = useState(() => (savedUser?.role === 'PETUGAS' ? savedUser : null));
  const [activePetugasTab, setActivePetugasTab] = useState("dashboard");

  const petugasNavLinks = [
    { label: "Dashboard Operasional", id: "dashboard" },
    { label: "Verifikasi Berkas & Survei", id: "verifikasi" },
    { label: "Data Warga & DTKS Lapangan", id: "dtks" },
    { label: "Tiket & Sanggahan Warga", id: "sanggahan" },
    { label: "Penyaluran Bantuan Lapangan", id: "penyaluran" },
  ];

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setCurrentPetugas(null);
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateTo = (page, redirect = null) => {
    if (redirect) {
      setRedirectTarget(redirect);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Update URL when currentPage changes
  useEffect(() => {
    if (currentPage === 'cek-bansos') {
      window.history.pushState(null, '', '/cek-bansos');
    } else if (currentPage === 'pengajuan-saya') {
      window.history.pushState(null, '', '/pengajuan-saya');
    } else {
      window.history.pushState(null, '', '/');
    }
  }, [currentPage]);

  function checkNik(event) {
    event?.preventDefault();
    const cleanNik = nik.replace(/\D/g, "");
    setMessage(
      cleanNik.length === 16
        ? "NIK berhasil diverifikasi. Data simulasi menunjukkan status Anda sedang dalam pembaruan berkala."
        : "Masukkan 16 digit NIK yang valid untuk melanjutkan pengecekan."
    );
  }

  const navLinks = [
    { label: "Beranda", id: "home", type: "page" },
    { label: "Cek Bansos", id: "cek-bansos", type: "page" },
    { label: "Pengajuan Saya", id: "pengajuan-saya", type: "page" },
    { label: "Pengaduan Saya", id: "pengaduan-saya", type: "page" },
    { label: "Data Faktual", id: "data-faktual", type: "page" },
    { label: "Press Release", id: "press-release", type: "page" },
    { label: "FAQ", id: "faq", type: "page" },
    ...(currentPetugas
      ? [{ label: "Konsol Petugas", id: "dashboard-operasional", type: "page" }]
      : []),
  ];

  const handleNavClick = (item) => {
    if (item.type === "page") {
      setCurrentPage(item.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item.type === "scroll") {
      if (currentPage !== "home") {
        setCurrentPage("home");
        setTimeout(() => scrollToId(item.id), 100);
      } else {
        scrollToId(item.id);
      }
    } else {
      setDialog(item.id);
    }
  };

  const handleServiceClick = (target) => {
    if (target === "cek-bansos" || target === "pengajuan-saya" || target === "pengaduan-saya") {
      setCurrentPage(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToId(target);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1fcf4] text-[#3f4944]">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.04] bg-[#f1fcf4]/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
          {/* Logout button when authenticated */}
          {(currentUser || currentPetugas) && (
            <button
              onClick={handleLogout}
              className="absolute right-4 top-2 text-sm text-[#176b50] hover:underline"
            >
              Logout
            </button>
          )}
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            className="flex items-center gap-2 text-left shrink-0"
            onClick={() => {
              if (currentPage === "dashboard-operasional") {
                setActivePetugasTab("dashboard");
              } else {
                setCurrentPage("home");
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Kembali ke beranda"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-[#176b50]">
              <img src={`${A}/c79f1.svg`} alt="" />
            </span>
            <span className="face-semibold text-base tracking-[-0.4px] text-[#151e18]">
              TepatBantu
            </span>
            {currentPage === "dashboard-operasional" && (
              <span className="hidden xl:inline-block rounded-md bg-[#ebf6ef] px-2 py-0.5 text-[10px] font-bold text-[#00513b] border border-[#b5efd8]">
                OPERASIONAL
              </span>
            )}
          </button>

          {/* Desktop Nav: Opsi Fitur Operasional jika di Dashboard, atau Menu Publik jika di halaman umum */}
          {currentPage === "dashboard-operasional" ? (
            <nav className="hidden items-center gap-1 xl:gap-2 text-xs lg:flex" aria-label="Navigasi Fitur Operasional Petugas">
              {petugasNavLinks.map((item) => {
                const isActive = activePetugasTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePetugasTab(item.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={
                      isActive
                        ? "face-bold rounded-lg bg-white px-3 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-[#003828] border border-black/[0.04]"
                        : "face-regular text-[#3f4944] hover:text-[#003828] hover:bg-white/60 rounded-lg px-2.5 py-1.5 transition"
                    }
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          ) : (
            <nav className="hidden items-center gap-6 text-sm lg:flex" aria-label="Navigasi utama">
              {navLinks.map((item) => {
                const isActive =
                  currentPage === item.id ||
                  ((currentPage === "detail-pengajuan" || currentPage === "buat-usulan") &&
                    item.id === "pengajuan-saya");

                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className={
                      isActive
                        ? "face-bold rounded bg-white px-3 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-[#003828]"
                        : "face-regular text-[#3f4944] transition hover:text-[#003828]"
                    }
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Action Buttons */}
          <div className="hidden items-center gap-2 sm:flex">
            {currentPage === "dashboard-operasional" ? (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => navigateTo("home")}
                  className="rounded-lg border border-[#dce9df] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#3f4944] hover:bg-[#ebf6ef] transition"
                  title="Buka portal publik warga"
                >
                  Portal Publik
                </button>
                <div className="flex items-center gap-2 pl-2 border-l border-[#dce9df]">
                  <div className="text-right">
                    <span className="block text-xs font-bold text-[#003828]">
                      {currentPetugas?.full_name || currentPetugas?.nama || "Petugas Lapangan"}
                    </span>
                    <span className="block text-[10px] text-[#176b50] font-medium flex items-center gap-1 justify-end">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Petugas Operasional
                    </span>
                  </div>
                  <span
                    className="flex size-9 items-center justify-center rounded-xl bg-[#00513b] text-white text-xs font-bold shadow-xs"
                    title="Konsol Petugas Operasional"
                  >
                    {(currentPetugas?.full_name || currentPetugas?.nama || "P").charAt(0)}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : currentPetugas ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo("dashboard-operasional")}
                  className="flex items-center gap-2 text-right hover:opacity-85 transition"
                >
                  <div>
                    <span className="block text-xs font-bold text-[#003828]">
                      {currentPetugas.full_name || currentPetugas.nama || "Petugas Lapangan"}
                    </span>
                    <span className="block text-[10px] text-[#176b50] font-medium flex items-center gap-1 justify-end">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Konsol Petugas
                    </span>
                  </div>
                  <span
                    className="flex size-9 items-center justify-center rounded-xl bg-[#00513b] text-white text-xs font-bold shadow-xs hover:bg-[#003828]"
                    title="Buka Dashboard Operasional"
                  >
                    {(currentPetugas.full_name || currentPetugas.nama || "P").charAt(0)}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-[#dce9df] px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                >
                  Keluar
                </button>
              </div>
            ) : currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo("profil")}
                  className="flex items-center gap-2 text-right hover:opacity-85 transition"
                >
                  <div>
                    <span className="block text-xs font-bold text-[#003828]">{currentUser.nama || currentUser.full_name}</span>
                    <span className="block text-[10px] text-[#176b50] font-medium">✓ Warga Terverifikasi</span>
                  </div>
                  <span
                    className="flex size-9 items-center justify-center rounded-xl bg-[#003828] text-white text-xs font-bold shadow-xs hover:bg-[#176b50]"
                    title="Buka Halaman Profil"
                  >
                    {(currentUser.nama || currentUser.full_name || "W").charAt(0)}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-[#dce9df] px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigateTo("login")}
                  className="face-semibold h-10 rounded-lg bg-white px-4 text-sm text-[#326856] hover:bg-[#ebf6ef] border border-black/[0.04]"
                >
                  Masuk
                </button>
                <button
                  onClick={() => navigateTo("register")}
                  className="face-semibold h-10 rounded-lg bg-[#00513b] px-4 text-sm text-white hover:bg-[#003828] shadow-xs"
                >
                  Daftar Akun
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded bg-[#00513b] text-xl text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-label="Buka menu"
          >
            ≡
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {menuOpen && (
          <nav className="border-t border-[#dce9df] bg-[#f1fcf4] px-5 py-4 lg:hidden">
            {currentPage === "dashboard-operasional" ? (
              <div className="space-y-1">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#176b50] mb-2">
                  FITUR OPERASIONAL LAPANGAN
                </span>
                {petugasNavLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePetugasTab(item.id);
                      setMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`block w-full py-2 text-left text-sm font-semibold rounded-lg px-2 transition ${
                      activePetugasTab === item.id
                        ? "bg-white text-[#003828] shadow-xs"
                        : "text-[#3f4944]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-2 border-t border-[#dce9df] mt-2">
                  <button
                    onClick={() => {
                      navigateTo("home");
                      setMenuOpen(false);
                    }}
                    className="block w-full py-2 text-left text-xs font-semibold text-[#176b50]"
                  >
                    ← Buka Portal Publik Warga
                  </button>
                </div>
              </div>
            ) : (
              navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    handleNavClick(item);
                    setMenuOpen(false);
                  }}
                  className="face-medium block w-full py-2 text-left text-sm"
                >
                  {item.label}
                </button>
              ))
            )}
            <div className="mt-3 flex gap-2 border-t border-[#dce9df] pt-3">
              {currentPetugas ? (
                <div className="flex w-full items-center justify-between">
                  <button
                    onClick={() => {
                      navigateTo("dashboard-operasional");
                      setMenuOpen(false);
                    }}
                    className="text-left"
                  >
                    <span className="block text-xs font-bold text-[#003828]">
                      {currentPetugas.full_name || currentPetugas.nama || "Petugas Lapangan"}
                    </span>
                    <span className="block text-[10px] text-[#176b50]">Buka Dashboard Petugas ›</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="rounded bg-red-100 px-3 py-1.5 text-xs text-red-700 font-semibold"
                  >
                    Keluar
                  </button>
                </div>
              ) : currentUser ? (
                <div className="flex w-full items-center justify-between">
                  <button
                    onClick={() => {
                      navigateTo("profil");
                      setMenuOpen(false);
                    }}
                    className="text-left"
                  >
                    <span className="block text-xs font-bold text-[#003828]">{currentUser.nama || currentUser.full_name}</span>
                    <span className="block text-[10px] text-[#176b50]">Buka Halaman Profil ›</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="rounded bg-red-100 px-3 py-1.5 text-xs text-red-700 font-semibold"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigateTo("login");
                      setMenuOpen(false);
                    }}
                    className="face-semibold h-10 flex-1 rounded bg-white text-sm text-[#326856]"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => {
                      navigateTo("register");
                      setMenuOpen(false);
                    }}
                    className="face-semibold h-10 flex-1 rounded bg-[#00513b] text-sm text-white"
                  >
                    Daftar Akun
                  </button>
                </>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Dynamic View: Dashboard Operasional | Buat Usulan Baru | Detail Pengajuan | Pengajuan Saya | Pengaduan Saya | Cek Bansos | Login | Register | Profil | Home */}
      {currentPage === "dashboard-operasional" ? (
        <DashboardOperasional
          currentPetugas={currentPetugas}
          activeTab={activePetugasTab}
        />
      ) : currentPage === "login-petugas" ? (
        currentPetugas ? (
          <DashboardOperasional
            currentPetugas={currentPetugas}
            activeTab={activePetugasTab}
          />
        ) : (
          <Login
            onNavigate={(page, redirect) => navigateTo(page, redirect)}
            redirectTarget="dashboard-operasional"
            onLoginSuccess={(user) => {
              if (user.role === "PETUGAS") {
                setCurrentPetugas(user);
                setCurrentUser(null);
                tokenManager.setUser(user);
                setCurrentPage("dashboard-operasional");
              } else {
                setCurrentUser(user);
                tokenManager.setUser(user);
                setCurrentPage("home");
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )
      ) : currentPage === "profil" ? (
        <ProfilSaya
          currentUser={currentUser}
          onNavigate={(page, redirect) => navigateTo(page, redirect)}
          onLogout={handleLogout}
          onUpdateProfile={(updated) => {
            setCurrentUser((prev) => ({ ...prev, ...updated }));
          }}
        />
      ) : currentPage === "login" ? (
        <Login
          onNavigate={(page, redirect) => navigateTo(page, redirect)}
          redirectTarget={redirectTarget}
          onLoginSuccess={(user) => {
            if (user.role === "PETUGAS") {
              setCurrentPetugas(user);
              setCurrentUser(null);
              tokenManager.setUser(user);
              setCurrentPage("dashboard-operasional");
              setDialog(
                `Selamat datang kembali di Dashboard Operasional, ${
                  user.full_name || user.nama || "Petugas Lapangan"
                }!`
              );
            } else {
              setCurrentUser(user);
              setCurrentPetugas(null);
              tokenManager.setUser(user);
              if (redirectTarget) {
                setCurrentPage(redirectTarget);
                setRedirectTarget(null);
              } else {
                setCurrentPage("pengajuan-saya");
              }
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : currentPage === "register" ? (
        <Register
          onNavigate={(page, redirect) => navigateTo(page, redirect)}
          onRegisterSuccess={(user) => {
            setCurrentUser(user);
            if (redirectTarget) {
              setCurrentPage(redirectTarget);
              setRedirectTarget(null);
            } else {
              setCurrentPage("pengajuan-saya");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : currentPage === "buat-usulan" ? (
        <BuatUsulanBaru
          onNavigate={(page, redirect) => navigateTo(page, redirect)}
        />
      ) : currentPage === "detail-pengajuan" ? (
        <DetailPengajuan
          onNavigate={(page, redirect) => navigateTo(page, redirect)}
          onOpenDialog={(name) => setDialog(name)}
        />
      ) : currentPage === "pengajuan-saya" ? (
        <PengajuanSaya
          currentUser={currentUser}
          onNavigate={(page, redirect) => navigateTo(page, redirect)}
          onOpenDialog={(name) => setDialog(name)}
        />
      ) : currentPage === "pengaduan-saya" ? (
        <HalamanPengaduanSaya
          currentUser={currentUser}
          onNavigate={(page, redirect) => navigateTo(page, redirect)}
          onOpenDialog={(name) => setDialog(name)}
        />
      ) : currentPage === "data-faktual" ? (
        <HalamanDataFaktual
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenDialog={(name) => setDialog(name)}
        />
      ) : currentPage === "press-release" ? (
        <HalamanPressRelease
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenDialog={(name) => setDialog(name)}
        />
      ) : currentPage === "faq" ? (
        <HalamanFAQ
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenDialog={(name) => setDialog(name)}
        />
      ) : currentPage === "cek-bansos" ? (
        <CekBansos
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenDialog={(name) => setDialog(name)}
        />
      ) : (
        <main id="home" className="pt-16">
          {/* Hero Section */}
          <section className="relative overflow-hidden py-14 lg:py-[60px]">
            <img
              src={`${A}/ce3dd.svg`}
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
              alt=""
            />
            <div className="relative mx-auto flex max-w-[1280px] flex-col gap-10 px-5 lg:px-8">
              <div className="grid items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <h1 className="face-bold max-w-3xl text-[38px] leading-[46px] tracking-[-1.2px] text-[#003828] sm:text-5xl sm:leading-[56px]">
                    Pastikan Bantuan Sosial Tepat Sasaran.
                  </h1>
                  <p className="face-regular mt-4 max-w-xl text-base leading-[26px]">
                    TepatBantu membantu masyarakat mengakses informasi bantuan sosial, mengusulkan
                    kelayakan, dan menyampaikan pengaduan melalui satu platform terpadu dan
                    transparan.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <button
                      onClick={() => {
                        setCurrentPage("cek-bansos");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="face-semibold flex h-11 items-center gap-2 rounded bg-[#00513b] px-6 text-sm tracking-[0.14px] text-white shadow-sm transition hover:bg-[#003828]"
                    >
                      <img src={`${A}/5cf8a.svg`} alt="" /> Cek Status Bansos Sekarang
                    </button>
                    <button
                      onClick={() => scrollToId("services")}
                      className="face-semibold h-11 rounded bg-white px-6 text-sm tracking-[0.14px] text-[#326856] shadow-sm transition hover:bg-[#ebf6ef]"
                    >
                      Pelajari Layanan & Panduan
                    </button>
                  </div>
                  <div className="face-semibold mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[13px] tracking-[0.26px]">
                    {[
                      ["0a4b3.svg", "Enkripsi NIK Terproteksi"],
                      ["3b525.svg", "Verifikasi Berjenjang RT/RW"],
                      ["f850b.svg", "Publikasi Data Terbuka"],
                    ].map(([icon, label]) => (
                      <span key={label} className="flex items-center gap-1.5">
                        <img src={`${A}/${icon}`} alt="" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow-lg lg:col-span-5">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={`${A}/bc596.png`}
                      className="h-full w-full object-cover"
                      alt="Petugas melayani warga penerima bantuan sosial"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#003828]/80 via-transparent to-transparent" />
                    <div className="absolute inset-x-4 bottom-4 text-white">
                      <span className="face-bold rounded-sm bg-[#326856]/80 px-1 py-0.5 text-[11px] tracking-[0.275px]">
                        PENYALURAN AKTIF 2025
                      </span>
                      <p className="face-semibold mt-1 text-sm">
                        Program Keluarga Harapan (PKH) & Sembako
                      </p>
                      <p className="face-regular text-xs text-[#e8f3ec]">
                        Target 12 Juta KPM se-Indonesia
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 bg-[#ebf6ef] p-4">
                    <div className="px-1">
                      <p className="face-bold text-[11px] tracking-[0.44px]">STATUS PEMBARUAN</p>
                      <p className="face-bold mt-1 text-sm text-[#003828]">Data Simulasi Harian</p>
                      <p className="face-regular text-xs text-[#326856]">Sinkron: Garut & Bdg</p>
                    </div>
                    <div className="border-l border-[#bfc9c2]/30 pl-4">
                      <p className="face-bold text-[11px] tracking-[0.44px]">TINGKAT PENYERAPAN</p>
                      <p className="face-bold mt-1 text-sm text-[#003828]">98.2% Kuota</p>
                      <p className="face-regular text-xs text-[#326856]">Aman & Terfasilitasi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* NIK Quick Check Box */}
              <form
                id="nik-check"
                onSubmit={checkNik}
                className="scroll-mt-24 rounded-lg bg-white p-5 shadow-lg sm:p-6"
              >
                <div className="flex flex-col items-stretch justify-between gap-5 xl:flex-row xl:items-center">
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#b5efd8]">
                      <img src={`${A}/9dc2f.svg`} alt="" />
                    </span>
                    <div>
                      <h2 className="face-bold text-base leading-6 text-[#141e19]">
                        Pengecekan Cepat NIK Bansos
                      </h2>
                      <p className="face-regular text-xs leading-[18px]">
                        Masukkan 16 digit Nomor Induk Kependudukan sesuai KTP untuk melihat status
                        kepesertaan aktif.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row">
                    <label className="relative">
                      <img src={`${A}/0321e.svg`} className="absolute left-3 top-[15px]" alt="" />
                      <input
                        value={nik}
                        onChange={(e) => setNik(e.target.value.replace(/\D/g, "").slice(0, 16))}
                        inputMode="numeric"
                        placeholder="Contoh: 3273012809920001"
                        className="face-regular h-11 w-full rounded bg-[#ebf6ef] pl-10 pr-4 text-sm outline-none ring-[#176b50] focus:ring-2 sm:w-[320px]"
                        aria-label="Nomor Induk Kependudukan"
                      />
                    </label>
                    <button className="face-semibold flex h-11 items-center justify-center gap-2 rounded bg-[#00513b] px-6 text-sm text-white hover:bg-[#003828]">
                      <img src={`${A}/ebb8b.svg`} alt="" />
                      Periksa NIK
                    </button>
                  </div>
                </div>
                {message && (
                  <p
                    role="status"
                    className={`face-medium mt-4 rounded p-3 text-sm ${nik.length === 16 ? "bg-[#e4f7ed] text-[#17503f]" : "bg-[#fff4dd] text-[#765a16]"}`}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </section>

          {/* Tiga Pilar Section */}
          <section id="services" className="scroll-mt-16 py-10">
            <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <p className="eyebrow">LAYANAN TERPADU MASYARAKAT</p>
                <h2 className="section-title">Tiga Pilar Akses Bantuan Sosial</h2>
                <p className="face-regular mt-1 text-sm leading-[22px]">
                  Didesain dengan kesederhanaan dan kepastian hukum demi memutus kendala birokrasi
                  bagi seluruh lapisan masyarakat.
                </p>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {services.map((service) => (
                  <article
                    key={service.title}
                    className="flex min-h-[328px] flex-col justify-between rounded-lg bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div>
                      <span className="flex size-14 items-center justify-center rounded-lg bg-[#b5efd8]">
                        <img src={`${A}/${service.icon}`} alt="" />
                      </span>
                      <p className="face-semibold mt-4 text-[11px] tracking-[0.44px] text-[#326856]">
                        {service.eyebrow}
                      </p>
                      <h3 className="face-bold mt-1 text-xl leading-7 text-[#003828]">
                        {service.title}
                      </h3>
                      <p className="face-regular mt-2 text-sm leading-[22px]">
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-[#bfc9c2]/30 pt-4">
                      <button
                        onClick={() => handleServiceClick(service.target)}
                        className="face-bold flex items-center gap-1 text-sm text-[#003828] hover:underline"
                      >
                        {service.action}
                        <img src={`${A}/a00ec.svg`} alt="" />
                      </button>
                      <span className="face-bold text-[11px] tracking-[0.44px] text-[#707974]">
                        {service.note}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Alur Section */}
          <section className="bg-[#ebf6ef] py-10">
            <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="eyebrow">ALUR PELAYANAN PUBLIK</p>
                  <h2 className="section-title">Bagaimana TepatBantu Bekerja?</h2>
                </div>
                <p className="face-regular max-w-md text-sm leading-[22px]">
                  Siklus terintegrasi dari pendaftaran mandiri masyarakat hingga validasi faktual oleh
                  dinas sosial terkait.
                </p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map(([icon, title, text], index) => (
                  <article key={title} className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="face-semibold flex size-10 items-center justify-center rounded bg-[#00513b] text-xl text-white">
                        {index + 1}
                      </span>
                      <img src={`${A}/${icon}`} alt="" />
                    </div>
                    <h3 className="face-bold text-base leading-6 text-[#003828]">{title}</h3>
                    <p className="face-regular mt-1 text-xs leading-[18px]">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Transparansi Data Section */}
          <section id="data" className="scroll-mt-16 px-5 py-10 lg:px-8">
            <div className="mx-auto max-w-[1216px] rounded-lg bg-white p-6 shadow-sm sm:p-10">
              <div className="flex flex-col justify-between gap-4 border-b border-[#bfc9c2]/30 pb-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="section-title">Transparansi Data Publik Bansos</h2>
                  <p className="face-regular text-sm leading-[22px]">
                    Ringkasan data simulasi penyaluran dan penanganan pengaduan percontohan Kota
                    Bandung dan Kab. Garut.
                  </p>
                </div>
                <span className="face-semibold flex w-fit items-center gap-2 rounded bg-[#e6f1e9] px-4 py-2 text-[13px]">
                  <i className="size-2.5 rounded-full bg-[#326856]" />
                  Update Berkala: <b className="face-bold">Data Terkini</b>
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map(([label, value, icon, status, source, visual], index) => (
                  <article key={label} className="rounded bg-[#ebf6ef] px-4 py-5">
                    <p className="face-bold text-[11px] tracking-[0.44px]">{label}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <strong className="face-bold text-[30px] leading-10 tracking-[-0.64px] text-[#003828]">
                        {value}
                      </strong>
                      <img src={`${A}/${icon}`} alt="" />
                    </div>
                    {visual ? (
                      <div className="mt-1 flex items-center gap-2">
                        <img src={`${A}/${visual}`} alt="" />
                        <span className="face-semibold text-xs text-[#326856]">{status}</span>
                      </div>
                    ) : index === 2 ? (
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#dae5de]">
                        <div className="h-full w-[92.4%] bg-[#326856]" />
                      </div>
                    ) : (
                      <p className="face-bold mt-1 inline-block rounded-sm bg-[#b5efd8] px-1.5 text-[11px] text-[#17503f]">
                        {status}
                      </p>
                    )}
                    <p className="face-bold mt-2 text-[11px] tracking-[0.44px] text-[#707974]">
                      {source}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* News Section */}
          <section id="news" className="scroll-mt-16 py-10">
            <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow">PEMBERITAAN RESMI</p>
                  <h2 className="section-title">Siaran Pers & Kebijakan Terkini</h2>
                </div>
                <button
                  onClick={() => setDialog("Arsip Siaran Pers")}
                  className="face-bold flex items-center gap-1 text-sm text-[#003828]"
                >
                  Lihat Semua Siaran Pers
                  <img src={`${A}/a00ec.svg`} alt="" />
                </button>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {articles.map((article) => (
                  <article
                    key={article.title}
                    className="overflow-hidden rounded-lg bg-white shadow-sm"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={`${A}/${article.image}`}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        alt=""
                      />
                      <span className="face-bold absolute left-2 top-2 rounded-sm bg-[#00513b] px-1 py-0.5 text-[11px] tracking-[0.44px] text-white">
                        {article.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="face-bold text-[11px] tracking-[0.44px]">{article.date}</p>
                      <h3 className="face-bold mt-1 text-base leading-6 text-[#003828]">
                        {article.title}
                      </h3>
                      <p className="face-regular mt-1 text-xs leading-[18px]">{article.text}</p>
                      <button
                        onClick={() => setDialog(article.title)}
                        className="face-semibold mt-4 flex items-center gap-1 text-sm text-[#326856]"
                      >
                        Baca Selengkapnya
                        <img src={`${A}/ddb61.svg`} alt="" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="cta" className="scroll-mt-20 px-5 py-8 lg:px-8">
            <div className="mx-auto flex max-w-[1216px] flex-col justify-between gap-8 rounded-lg bg-[#176b50] p-8 text-white shadow-sm lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="face-semibold text-[11px] tracking-[0.55px]">
                  KANAL PARTISIPASI MANDIRI
                </p>
                <h2 className="face-bold mt-1 text-2xl leading-8 tracking-[-0.36px]">
                  Pastikan Informasi Bantuan Sosial Anda Tercatat dengan Baik.
                </h2>
                <p className="face-regular mt-1 text-sm leading-5 text-white/90">
                  Gunakan hak pengawasan Anda. Cek kepesertaan NIK keluarga secara berkala atau
                  laporkan hambatan penyaluran langsung ke tim verifikasi independen kami.
                </p>
                <p className="face-medium mt-3 flex items-center gap-2 text-[11px] tracking-[0.44px] text-white/80">
                  <img src={`${A}/c9e97.svg`} alt="" />
                  Bebas Pungutan Liar • Dijamin Kerahasiaan Identitas
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setCurrentPage("cek-bansos");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="face-medium flex items-center gap-2 rounded bg-white px-6 py-3 text-sm text-[#151e18]"
                >
                  <img src={`${A}/dd67d.svg`} alt="" />
                  Cek Status Bansos
                </button>
                <button
                  onClick={() => setDialog("Ajukan Pengaduan")}
                  className="face-medium flex items-center gap-2 rounded bg-[#f2fcf2]/20 px-6 py-3 text-sm"
                >
                  <img src={`${A}/394c7.svg`} alt="" />
                  Ajukan Pengaduan
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer id="footer" className="scroll-mt-16 bg-[#ebf6ef] px-5 py-10 lg:px-8">
        <div className="mx-auto grid max-w-[1216px] gap-9 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-7 items-center justify-center rounded bg-[#176b50]">
                <img src={`${A}/7fff5.svg`} alt="" />
              </span>
              <span className="face-semibold text-base text-[#151e18]">TepatBantu</span>
            </div>
            <p className="face-regular mt-4 max-w-md text-[13px] leading-[18px]">
              Platform monitoring dan transparansi distribusi bantuan sosial berbasis audit data
              faktual. Menghubungkan pelaporan masyarakat, verifikasi lapangan kelurahan, dan
              agregasi data pemerintah daerah secara akuntabel.
            </p>
          </div>
          <FooterList
            title="LAYANAN PUBLIK"
            items={[
              "Cek NIK Bansos",
              "Usulan Kelayakan Mandiri",
              "Sanggah & Pengaduan",
              "Informasi Penyaluran",
            ]}
            onItemClick={(item) => {
              if (item === "Cek NIK Bansos") {
                setCurrentPage("cek-bansos");
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else if (item === "Usulan Kelayakan Mandiri") {
                setCurrentPage("pengajuan-saya");
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                setDialog(item);
              }
            }}
          />
          <FooterList
            title="INFORMASI & KEBIJAKAN"
            items={[
              "Dokumentasi Layanan",
              "Data Faktual",
              "Press Release",
              "FAQ",
              "Kebijakan Privasi",
              "Syarat & Ketentuan",
            ]}
            onItemClick={(item) => {
              if (item === "Data Faktual") {
                setCurrentPage("home");
                setTimeout(() => scrollToId("data"), 100);
              } else if (item === "Press Release") {
                setCurrentPage("home");
                setTimeout(() => scrollToId("news"), 100);
              } else {
                setDialog(item);
              }
            }}
          />
          <div>
            <h3 className="face-semibold text-sm tracking-[0.6px] text-[#151e18]">
              PUSAT BANTUAN & PENGADUAN
            </h3>
            <p className="face-regular mt-3 text-[13px] leading-[18px]">
              Kanal Simulasi Pengaduan:
              <br />
              halo@tepatbantu.go-simulasi.id
            </p>
            <p className="face-medium mt-2 text-[11px] tracking-[0.44px] text-[#57605d]">
              Hotline Pengawasan: 1500-BANSOS
            </p>
          </div>
        </div>
        <div className="face-medium mx-auto mt-8 max-w-[1216px] rounded bg-[#e6f1e7] p-4 text-[11px] tracking-[0.44px]">
          © 2026 TepatBantu. Dikembangkan untuk transparansi bantuan sosial daerah.
        </div>
      </footer>

      {/* Dialog Modal */}
      {dialog && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#003828]/50 p-5"
          role="presentation"
          onMouseDown={() => setDialog(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={dialog}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">TEPATBANTU</p>
                <h2 className="face-bold text-2xl text-[#003828]">{dialog}</h2>
              </div>
              <button
                onClick={() => setDialog(null)}
                className="face-bold size-9 rounded bg-[#ebf6ef] text-[#003828]"
                aria-label="Tutup"
              >
                ×
              </button>
            </div>
            <p className="face-regular mt-4 text-sm leading-[22px]">
              Fitur ini tersedia sebagai pratinjau interaktif. Pada layanan aktif, Anda akan
              diarahkan ke formulir aman dan terverifikasi.
            </p>
            <button
              onClick={() => setDialog(null)}
              className="face-semibold mt-6 h-11 w-full rounded bg-[#00513b] text-sm text-white"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FooterList({ title, items, onItemClick }) {
  return (
    <div>
      <h3 className="face-semibold text-sm tracking-[0.7px] text-[#141e19]">{title}</h3>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item}>
            <button
              onClick={() => onItemClick && onItemClick(item)}
              className="face-regular text-left text-xs leading-[18px] hover:text-[#003828] hover:underline"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
