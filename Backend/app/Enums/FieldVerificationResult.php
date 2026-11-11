<?php declare(strict_types=1);

namespace App\Enums;

enum FieldVerificationResult: string
{
    case SESUAI = 'SESUAI';
    case PERLU_INFO = 'PERLU_INFO';
    case TIDAK_SESUAI = 'TIDAK_SESUAI';

    public function label(): string
    {
        return match ($this) {
            self::SESUAI => 'Sesuai',
            self::PERLU_INFO => 'Perlu Informasi',
            self::TIDAK_SESUAI => 'Tidak Sesuai',
        };
    }
}
