<?php declare(strict_types=1);

namespace App\Enums;

enum ComplaintStatus: string
{
    case DIAJUKAN = 'DIAJUKAN';
    case DITINJAU = 'DITINJAU';
    case DALAM_INVESTIGASI = 'DALAM_INVESTIGASI';
    case MEMBUTUHKAN_INFO = 'MEMBUTUHKAN_INFO';
    case DITERUSKAN = 'DITERUSKAN';
    case DISELESAIKAN = 'DISELESAIKAN';
    case DITUTUP = 'DITUTUP';

    public function label(): string
    {
        return match ($this) {
            self::DIAJUKAN => 'Diajukan',
            self::DITINJAU => 'Ditinjau',
            self::DALAM_INVESTIGASI => 'Dalam Investigasi',
            self::MEMBUTUHKAN_INFO => 'Membutuhkan Informasi',
            self::DITERUSKAN => 'Diteruskan',
            self::DISELESAIKAN => 'Diselesaikan',
            self::DITUTUP => 'Ditutup',
        };
    }
}
