<?php declare(strict_types=1);

namespace App\Services;

final class NikService
{
    public function hash(string $nik): string
    {
        return hash('sha256', $nik . config('app.nik_pepper'));
    }

    public function mask(string $nik): string
    {
        return substr($nik, 0, 4) . '********' . substr($nik, -4);
    }

    public function maskLast4(string $last4): string
    {
        return "**** **** **** {$last4}";
    }

    public function extractLast4(string $nik): string
    {
        return substr($nik, -4);
    }
}
