import React from 'react';

const A = '/assets';

export default function Footer({ onScrollTo, onOpenService }) {
  const publicServices = [
    { label: 'Cek NIK Bansos', target: 'nik-check' },
    { label: 'Pengajuan Bantuan Mandiri', action: 'open-pengajuan' },
    { label: 'Sanggah & Pengaduan', action: 'open-sanggahan' },
    { label: 'Informasi Penyaluran', target: 'data' },
  ];

  const policyInfo = [
    { label: 'Dokumentasi Layanan', target: 'services' },
    { label: 'Data Faktual Publik', target: 'data' },
    { label: 'Press Release Resmi', target: 'news' },
    { label: 'Kebijakan Privasi', target: 'footer' },
    { label: 'Syarat & Ketentuan', target: 'footer' },
  ];

  const handleClick = (item) => {
    if (item.action && onOpenService) {
      onOpenService(item.action);
    } else if (item.target && onScrollTo) {
      onScrollTo(item.target);
    }
  };

  return (
    <footer id="footer" className="scroll-mt-16 bg-[#ebf6ef] border-t border-[#dce9df] px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr]">
        {/* Brand statement */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#176b50]">
              <img src={`${A}/7fff5.svg`} alt="Logo TepatBantu" className="size-4" />
            </span>
            <span className="face-bold text-lg text-[#003828]">TepatBantu</span>
          </div>
          <p className="face-regular mt-4 max-w-md text-xs leading-[20px] text-[#57605d]">
            Platform monitoring dan transparansi distribusi bantuan sosial berbasis audit data faktual.
            Menghubungkan pelaporan masyarakat, verifikasi lapangan kelurahan/desa, dan agregasi data
            pemerintah daerah secara akuntabel, tepat sasaran, dan berkeadilan.
          </p>
        </div>

        {/* Public Services links */}
        <div>
          <h3 className="face-bold text-xs tracking-wider text-[#003828] uppercase">
            LAYANAN PUBLIK
          </h3>
          <ul className="mt-3 space-y-2">
            {publicServices.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleClick(item)}
                  className="face-regular text-left text-xs leading-[18px] text-[#57605d] hover:text-[#003828] hover:underline"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Information & Policies */}
        <div>
          <h3 className="face-bold text-xs tracking-wider text-[#003828] uppercase">
            INFORMASI & KEBIJAKAN
          </h3>
          <ul className="mt-3 space-y-2">
            {policyInfo.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleClick(item)}
                  className="face-regular text-left text-xs leading-[18px] text-[#57605d] hover:text-[#003828] hover:underline"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Hotline */}
        <div>
          <h3 className="face-bold text-xs tracking-wider text-[#003828] uppercase">
            PUSAT BANTUAN & PENGADUAN
          </h3>
          <div className="mt-3 space-y-2 text-xs text-[#57605d]">
            <p>
              <strong className="text-[#003828]">Email Resmi Pengaduan:</strong>
              <br />
              pengaduan@tepatbantu.go-simulasi.id
            </p>
            <p>
              <strong className="text-[#003828]">Hotline Bebas Pulsa:</strong>
              <br />
              <span className="font-bold text-[#176b50]">1500-BANSOS (226767)</span>
            </p>
            <p className="text-[11px] text-[#707974] pt-1">
              Layanan operasional Senin - Jumat: 08.00 - 16.00 WIB
            </p>
          </div>
        </div>
      </div>

      <div className="face-medium mx-auto mt-10 max-w-[1240px] rounded-lg bg-[#e6f1e7] p-4 text-center text-xs text-[#326856]">
        © 2026 TepatBantu. Seluruh hak cipta dilindungi undang-undang. Prototipe demonstrasi transparansi penyaluran bantuan sosial di Indonesia.
      </div>
    </footer>
  );
}

