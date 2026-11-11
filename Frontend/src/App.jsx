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
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
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
    </main >
      )
}

{/* Footer */ }
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

{/* Dialog Modal */ }
{
  dialog && (
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
  )
}
    </div >
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
