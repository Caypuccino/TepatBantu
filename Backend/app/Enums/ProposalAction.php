<?php declare(strict_types=1);

namespace App\Enums;

enum ProposalAction: string
{
    case ACCEPT = 'ACCEPT';
    case REQUEST_DOCS = 'REQUEST_DOCS';
    case SCHEDULE_FIELD = 'SCHEDULE_FIELD';
    case FIELD_PASS = 'FIELD_PASS';
    case FIELD_NEED_INFO = 'FIELD_NEED_INFO';
    case FIELD_FAIL = 'FIELD_FAIL';
    case APPROVE = 'APPROVE';
    case REJECT = 'REJECT';
    case COMPLETE = 'COMPLETE';

    public function label(): string
    {
        return match ($this) {
            self::ACCEPT => 'Terima',
            self::REQUEST_DOCS => 'Minta Dokumen',
            self::SCHEDULE_FIELD => 'Jadwalkan Verifikasi',
            self::FIELD_PASS => 'Verifikasi Lulus',
            self::FIELD_NEED_INFO => 'Perlu Informasi',
            self::FIELD_FAIL => 'Verifikasi Gagal',
            self::APPROVE => 'Setujui',
            self::REJECT => 'Tolak',
            self::COMPLETE => 'Selesaikan',
        };
    }
}
