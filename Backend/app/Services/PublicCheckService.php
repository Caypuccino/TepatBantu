<?php declare(strict_types=1);

namespace App\Services;

use App\Models\BeneficiaryRecord;
use App\Models\Citizen;
use App\Models\Distribution;

final class PublicCheckService
{
    public function check(string $nik): array
    {
        $nikService = new NikService();
        $nikHash = $nikService->hash($nik);

        $citizen = Citizen::where('nik_hash', $nikHash)->first();

        if (!$citizen) {
            return [
                'state' => 'DATA_TIDAK_DITEMUKAN',
                'masked_nik' => $nikService->mask($nik),
                'message' => 'NIK tidak ditemukan dalam sistem',
                'cta' => 'COBA_LAGI',
                'sample_data' => true,
            ];
        }

        // Cek beneficiary records
        $beneficiaryRecord = BeneficiaryRecord::where('citizen_id', $citizen->id)->first();

        if (!$beneficiaryRecord) {
            return [
                'state' => 'BELUM_TERDAFTAR',
                'masked_nik' => $nikService->maskLast4($citizen->nik_last4),
                'cta' => 'USULKAN_KELAYAKAN',
                'sample_data' => true,
            ];
        }

        // Cek distribution
        $distribution = Distribution::where('beneficiary_record_id', $beneficiaryRecord->id)
            ->orderByDesc('created_at')
            ->first();

        if (!$distribution) {
            return [
                'state' => 'TERDAFTAR_MENUNGGU',
                'masked_nik' => $nikService->maskLast4($citizen->nik_last4),
                'program' => [
                    'code' => $beneficiaryRecord->program->code,
                    'name' => $beneficiaryRecord->program->name,
                ],
                'region' => $citizen->region->name,
                'sample_data' => true,
            ];
        }

        // Map distribution status
        $state = match ($distribution->status->value) {
            'TELAH_DISALURKAN' => 'TERDAFTAR_DISALURKAN',
            'ALOKASI_TERCATAT', 'DIJADWALKAN', 'SIAP_DISALURKAN' => 'TERDAFTAR_MENUNGGU',
            default => 'TERDAFTAR_MENUNGGU',
        };

        if ($beneficiaryRecord->status->value === 'PERLU_VERIFIKASI') {
            $state = 'TERDAFTAR_PERLU_VERIFIKASI';
        }

        $response = [
            'state' => $state,
            'masked_nik' => $nikService->maskLast4($citizen->nik_last4),
            'program' => [
                'code' => $beneficiaryRecord->program->code,
                'name' => $beneficiaryRecord->program->name,
            ],
            'period' => $distribution->period,
            'region' => $citizen->region->name,
            'distribution' => [
                'channel' => $distribution->channel,
                'status' => $distribution->status->value,
                'date' => $distribution->scheduled_date?->format('Y-m-d'),
            ],
            'note' => 'Data simulasi.',
            'sample_data' => true,
        ];

        return $response;
    }
}
