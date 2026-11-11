<?php declare(strict_types=1);

namespace App\Enums;

enum DistributionStatus: string
{
    case ALOKASI_TERCATAT = 'ALOKASI_TERCATAT';
    case DIJADWALKAN = 'DIJADWALKAN';
    case SIAP_DISALURKAN = 'SIAP_DISALURKAN';
    case TELAH_DISALURKAN = 'TELAH_DISALURKAN';
    case KENDALA = 'KENDALA';

    public function label(): string
    {
        return match ($this) {
            self::ALOKASI_TERCATAT => 'Alokasi Tercatat',
            self::DIJADWALKAN => 'Dijadwalkan',
            self::SIAP_DISALURKAN => 'Siap Disalurkan',
            self::TELAH_DISALURKAN => 'Telah Disalurkan',
            self::KENDALA => 'Kendala',
        };
    }
}
