import React from 'react';

const A = '/assets';

export default function ModalArticle({ article, onClose }) {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#003828]/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#ebf6ef] pb-3">
          <div>
            <span className="eyebrow">{article.category || 'PRESS RELEASE'}</span>
            <h2 className="face-bold mt-1 text-xl sm:text-2xl text-[#003828]">
              {article.title}
            </h2>
            <p className="face-medium text-xs text-[#707974] mt-1">
              {article.date || 'Warta Resmi TepatBantu'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg bg-[#ebf6ef] text-[#003828] font-bold text-lg hover:bg-[#dce9df]"
          >
            ×
          </button>
        </div>

        {article.image && (
          <div className="mt-4 h-64 w-full overflow-hidden rounded-xl bg-gray-100">
            <img
              src={`${A}/${article.image}`}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#3f4944]">
          <p>{article.text}</p>
          <p>
            Pemerintah melalui Dinas Sosial dan Tim Audit Lapangan terus memperkuat akuntabilitas penyaluran dengan pengawasan berjenjang, pelibatan RT/RW, dan kanal pengaduan publik mandiri.
          </p>
          <p>
            Masyarakat diimbau untuk selalu memeriksa status kepesertaan melalui kanal resmi TepatBantu dan melaporkan bila menemui pungutan liar atau ketidaksesuaian kriteria di lapangan.
          </p>
        </div>

        <div className="mt-6 border-t border-[#ebf6ef] pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#00513b] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#003828]"
          >
            Tutup Berita
          </button>
        </div>
      </div>
    </div>
  );
}

