<?php declare(strict_types=1);

namespace App\Enums;

enum RegionLevel: string
{
    case PROVINSI = 'PROVINSI';
    case KOTA_KAB = 'KOTA_KAB';
    case KECAMATAN = 'KECAMATAN';
    case KELURAHAN = 'KELURAHAN';

    public function label(): string
    {
        return match ($this) {
            self::PROVINSI => 'Provinsi',
            self::KOTA_KAB => 'Kota/Kabupaten',
            self::KECAMATAN => 'Kecamatan',
            self::KELURAHAN => 'Kelurahan',
        };
    }
}
