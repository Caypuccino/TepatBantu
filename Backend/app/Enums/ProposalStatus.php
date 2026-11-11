<?php declare(strict_types=1);

namespace App\Enums;

enum ProposalStatus: string
{
    case DIAJUKAN = 'DIAJUKAN';
    case MENUNGGU_PEMERIKSAAN = 'MENUNGGU_PEMERIKSAAN';
    case VERIFIKASI_LAPANGAN = 'VERIFIKASI_LAPANGAN';
    case PERLU_PERBAIKAN = 'PERLU_PERBAIKAN';
    case DISETUJUI = 'DISETUJUI';
    case DITOLAK = 'DITOLAK';
    case SELESAI = 'SELESAI';

    public function label(): string
    {
        return match ($this) {
            self::DIAJUKAN => 'Diajukan',
            self::MENUNGGU_PEMERIKSAAN => 'Menunggu Pemeriksaan',
            self::VERIFIKASI_LAPANGAN => 'Verifikasi Lapangan',
            self::PERLU_PERBAIKAN => 'Perlu Perbaikan',
            self::DISETUJUI => 'Disetujui untuk Proses Lanjutan',
            self::DITOLAK => 'Ditolak dengan Alasan',
            self::SELESAI => 'Selesai',
        };
    }
}
