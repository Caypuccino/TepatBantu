<?php declare(strict_types=1);

namespace App\Services;

use App\Models\BeneficiaryRecord;
use App\Models\Citizen;
use App\Models\Distribution;

final class PublicCheckService
{
    public function check(string $nik, string $wilayah, string $kecamatan): array
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

        // --- VALIDASI WILAYAH & KECAMATAN ---
        $dbRegion = strtolower($citizen->region->name);
        $dbParent = $citizen->region->parent ? strtolower($citizen->region->parent->name) : '';
        $inputWilayah = strtolower(trim($wilayah));
        $inputKecamatan = strtolower(trim($kecamatan));

        // Cek apakah input cocok dengan nama wilayah atau kecamatan di DB
        $isWilayahValid = str_contains($dbRegion, $inputWilayah) || str_contains($inputWilayah, $dbRegion) || str_contains($dbParent, $inputWilayah);
        $isKecamatanValid = str_contains($dbRegion, $inputKecamatan) || str_contains($inputKecamatan, $dbRegion) || str_contains($dbParent, $inputKecamatan);

        if (!$isWilayahValid && !$isKecamatanValid) {
            return [
                'state' => 'DATA_WILAYAH_TIDAK_COCOK',
                'masked_nik' => $nikService->maskLast4($citizen->nik_last4),
                'message' => 'Wilayah atau Kecamatan yang Anda masukkan tidak sesuai dengan data DTKS.',
                'sample_data' => true,
            ];
        }
        // ------------------------------------

        // Cek beneficiary records
        $beneficiaryRecord = BeneficiaryRecord::where('citizen_id', $citizen->id)->first();

        if (!$beneficiaryRecord) {
            return [
                'state' => 'BELUM_TERDAFTAR',
                'masked_nik' => $nikService->maskLast4($citizen->nik_last4),
                'desil' => $citizen->desil ?? 1,
                'cta' => 'USULKAN_KELAYAKAN',
                'sample_data' => true,
            ];
        }

        // Cek distribution
        $distribution = Distribution::with('histories')
            ->where('beneficiary_record_id', $beneficiaryRecord->id)
            ->orderByDesc('created_at')
            ->first();

        if (!$distribution) {
            return [
                'state' => 'TERDAFTAR_MENUNGGU',
                'masked_nik' => $nikService->maskLast4($citizen->nik_last4),
                'desil' => $citizen->desil ?? 1,
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

        // Logika Desil (Desil 7-10 Tidak Layak)
        if (($citizen->desil ?? 1) >= 7) {
            $state = 'TIDAK_LAYAK';
        }

        if ($beneficiaryRecord->status->value === 'PERLU_VERIFIKASI') {
            $state = 'TERDAFTAR_PERLU_VERIFIKASI';
        }

        return [
            'state' => $state,
            'masked_nik' => $nikService->maskLast4($citizen->nik_last4),
            'desil' => $citizen->desil ?? 1,
            'program' => [
                'code' => $beneficiaryRecord->program->code,
                'name' => $beneficiaryRecord->program->name,
            ],
            'period' => $distribution->period,
            'region' => $citizen->region->name,
            'distribution' => [
                'channel' => $this->formatChannel($distribution->channel),
                'location' => $distribution->location,
                'status' => $distribution->status->value,
                'status_label' => $distribution->status->label(),
                'date' => $distribution->scheduled_date?->format('Y-m-d'),
                'notes' => $distribution->notes,
                'histories' => $distribution->histories->map(function ($history) {
                    return [
                        'to_status' => $history->to_status,
                        'from_status' => $history->from_status,
                        'note' => $history->note,
                        'created_at' => $history->created_at?->format('d M Y'),
                    ];
                })->toArray(),
            ],
            'note' => 'Data simulasi.',
            'sample_data' => true,
        ];
    }

    private function formatChannel(string $channel): string
    {
        return match ($channel) {
            'TITIK_LOKAL' => 'Titik Lokal / Kantor Pos',
            'BRI' => 'Bank BRI',
            'BNI' => 'Bank BNI',
            'MANDIRI' => 'Bank Mandiri',
            'BSI' => 'Bank BSI',
            'POS' => 'PT Pos Indonesia',
            default => $channel,
        };
    }
}