<?php declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Citizen;
use App\Models\Region;
use App\Services\NikService;
use Illuminate\Database\Seeder;

class CitizenSeeder extends Seeder
{
    public function run(): void
    {
        $nikService = new NikService();
        $kotaBandung = Region::where('name', 'Kota Bandung')->firstOrFail();
        $kabGarut = Region::where('name', 'Kabupaten Garut')->firstOrFail();

        // Demo NIK untuk testing check-bansos
        $demoNiks = [
            '3273010101010001', // TERDAFTAR_DISALURKAN
            '3273010101010002', // TERDAFTAR_MENUNGGU
            '3273010101010003', // TERDAFTAR_PERLU_VERIFIKASI
            '3273010101010004', // BELUM_TERDAFTAR
        ];

        foreach ($demoNiks as $index => $nik) {
            Citizen::create([
                'full_name' => "Warga Demo {$nik}",
                'nik_hash' => $nikService->hash($nik),
                'nik_encrypted' => $nik,
                'nik_last4' => $nikService->extractLast4($nik),
                'region_id' => $index % 2 === 0 ? $kotaBandung->id : $kabGarut->id,
            ]);
        }

        // Generate 56 citizens tambahan secara random (30 Bandung, 26 Garut)
        mt_srand(42);
        for ($i = 5; $i <= 60; $i++) {
            $baseNik = sprintf('327301010101%04d', $i);
            $region = $i <= 34 ? $kotaBandung : $kabGarut;

            Citizen::create([
                'full_name' => "Citizen Demo {$i}",
                'nik_hash' => $nikService->hash($baseNik),
                'nik_encrypted' => $baseNik,
                'nik_last4' => substr($baseNik, -4),
                'region_id' => $region->id,
                'gender' => rand(0, 1) ? 'L' : 'P',
                'birth_date' => now()->subYears(rand(18, 65)),
            ]);
        }
    }
}
