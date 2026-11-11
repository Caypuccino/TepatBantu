<?php declare(strict_types=1);

namespace App\Enums;

enum ComplaintAction: string
{
    case REVIEW = 'REVIEW';
    case START_INVESTIGATION = 'START_INVESTIGATION';
    case REQUEST_INFO = 'REQUEST_INFO';
    case RECORD_FINDINGS = 'RECORD_FINDINGS';
    case FORWARD = 'FORWARD';
    case RESOLVE = 'RESOLVE';
    case CLOSE = 'CLOSE';

    public function label(): string
    {
        return match ($this) {
            self::REVIEW => 'Tinjau',
            self::START_INVESTIGATION => 'Mulai Investigasi',
            self::REQUEST_INFO => 'Minta Informasi',
            self::RECORD_FINDINGS => 'Catat Temuan',
            self::FORWARD => 'Teruskan',
            self::RESOLVE => 'Selesaikan',
            self::CLOSE => 'Tutup',
        };
    }
}
