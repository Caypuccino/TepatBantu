<?php declare(strict_types=1);

namespace App\Enums;

enum Role: string
{
    case WARGA  = 'WARGA';
    case PETUGAS = 'PETUGAS';
    case ADMIN  = 'ADMIN';

    public function label(): string
    {
        return match ($this) {
            self::WARGA  => 'Warga',
            self::PETUGAS => 'Petugas Wilayah',
            self::ADMIN  => 'Administrator',
        };
    }
}
