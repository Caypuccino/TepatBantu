<?php declare(strict_types=1);

namespace App\Enums;

enum UserStatus: string
{
    case AKTIF = 'AKTIF';
    case NONAKTIF = 'NONAKTIF';
    case MENUNGGU_VERIFIKASI = 'MENUNGGU_VERIFIKASI';

    public function label(): string
    {
        return match ($this) {
            self::AKTIF => 'Aktif',
            self::NONAKTIF => 'Nonaktif',
            self::MENUNGGU_VERIFIKASI => 'Menunggu Verifikasi',
        };
    }
}
