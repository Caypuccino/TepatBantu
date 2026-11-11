<?php declare(strict_types=1);

namespace App\Enums;

enum BeneficiaryStatus: string
{
    case TERDAFTAR = 'TERDAFTAR';
    case MENUNGGU = 'MENUNGGU';
    case PERLU_VERIFIKASI = 'PERLU_VERIFIKASI';

    public function label(): string
    {
        return match ($this) {
            self::TERDAFTAR => 'Terdaftar',
            self::MENUNGGU => 'Menunggu',
            self::PERLU_VERIFIKASI => 'Perlu Verifikasi',
        };
    }
}
