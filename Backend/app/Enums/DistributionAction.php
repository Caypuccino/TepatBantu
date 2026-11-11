<?php declare(strict_types=1);

namespace App\Enums;

enum DistributionAction: string
{
    case SCHEDULE = 'SCHEDULE';
    case READY = 'READY';
    case DELIVER = 'DELIVER';
    case FLAG_ISSUE = 'FLAG_ISSUE';
    case RESOLVE_ISSUE = 'RESOLVE_ISSUE';

    public function label(): string
    {
        return match ($this) {
            self::SCHEDULE => 'Jadwalkan',
            self::READY => 'Siap',
            self::DELIVER => 'Salurkan',
            self::FLAG_ISSUE => 'Tandai Kendala',
            self::RESOLVE_ISSUE => 'Selesaikan Kendala',
        };
    }
}
