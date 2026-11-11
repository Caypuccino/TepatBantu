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
        
        // Ambil SEMUA kecamatan dari database untuk dijadikan pilihan acak
        $kecamatans = Region::where('level', 'KECAMATAN')->get();
        if ($kecamatans->isEmpty()) {
            throw new \Exception("Data Kecamatan kosong. Jalankan RegionSeeder terlebih dahulu.");
        }

        $desilLabels = [
            1 => 'Sangat Miskin', 2 => 'Rentan Miskin', 3 => 'Rentan Miskin',
            4 => 'Rentan Miskin', 5 => 'Menengah', 6 => 'Menengah',
            7 => 'Mampu', 8 => 'Mampu', 9 => 'Mampu', 10 => 'Mampu',
        ];

        // List Nama untuk variasi (Nama Depan, Tengah, Belakang)
        $maleFirst = ['Budi', 'Agus', 'Slamet', 'Joko', 'Andi', 'Rudi', 'Hendra', 'Ahmad', 'Dedi', 'Eko', 'Muhammad', 'Iwan', 'Rizky', 'Bayu'];
        $femaleFirst = ['Siti', 'Ayu', 'Dewi', 'Sri', 'Rina', 'Fitri', 'Indah', 'Nur', 'Lestari', 'Maya', 'Intan', 'Putri', 'Dian', 'Ratna'];
        $middleNames = ['Santoso', 'Aminah', 'Setiawan', 'Pratama', 'Kusuma', 'Hidayat', 'Suryana', 'Purnama', 'Wibowo', 'Kurniawan'];
        $lastNames = ['Wijaya', 'Saputra', 'Nugroho', 'Siregar', 'Simanjuntak', 'Harahap', 'Lubis', 'Gunawan', 'Syahputra', 'Wardana'];

        // Helper untuk generate alamat & KK
        $generateAddress = fn() => "Jl. " . ['Merdeka', 'Sudirman', 'Mawar', 'Melati', 'Diponegoro', 'Gatot Subroto', 'Pahlawan'][rand(0, 6)] . " No. " . rand(1, 150) . ", RT " . sprintf('%02d', rand(1, 15)) . "/RW " . sprintf('%02d', rand(1, 10));
        $generateKK = fn() => '32' . rand(10, 99) . rand(10, 99) . rand(10, 99) . rand(100000, 999999);
        $generatePhone = fn() => '08' . rand(11, 99) . rand(10000000, 99999999);

        // --- 1. 4 DATA DEMO (NIK TETAP & NAMA PANJANG) ---
        $demoData = [
            [
                'nik' => '3273010101010001', 
                'name' => 'Budi Santoso Wijaya', 
                'kecamatan_name' => 'Coblong', 
                'desil' => 2,
                'gender' => 'L'
            ],
            [
                'nik' => '3273010101010002', 
                'name' => 'Siti Aminah Putri', 
                'kecamatan_name' => 'Sukajadi', 
                'desil' => 1,
                'gender' => 'P'
            ],
            [
                'nik' => '3273010101010003', 
                'name' => 'Agus Setiawan Pratama', 
                'kecamatan_name' => 'Tarogong Kidul', 
                'desil' => 4,
                'gender' => 'L'
            ],
            [
                'nik' => '3273010101010004', 
                'name' => 'Dewi Lestari Sari', 
                'kecamatan_name' => 'Kebayoran Baru', 
                'desil' => 8,
                'gender' => 'P'
            ],
        ];

        foreach ($demoData as $data) {
            $kec = $kecamatans->where('name', $data['kecamatan_name'])->first();
            Citizen::create([
                'full_name' => $data['name'],
                'nik_hash' => $nikService->hash($data['nik']),
                'nik_encrypted' => $data['nik'],
                'nik_last4' => $nikService->extractLast4($data['nik']),
                'region_id' => $kec ? $kec->id : $kecamatans->random()->id,
                'kk_number' => $generateKK(),
                'phone' => $generatePhone(),
                'address' => $generateAddress(),
                'gender' => $data['gender'],
                'birth_date' => now()->subYears(rand(25, 55)),
                'desil' => $data['desil'],
                'desil_label' => $desilLabels[$data['desil']],
            ]);
        }

        // --- 2. GENERATE 56 DATA ACAK ---
        mt_srand(42);
        for ($i = 5; $i <= 60; $i++) {
            $baseNik = sprintf('327301010101%04d', $i);
            $desil = rand(1, 10);

            // Tentukan jenis kelamin & buat nama panjang (3 kata)
            $isMale = rand(0, 1) === 1;
            $firstName = $isMale ? $maleFirst[array_rand($maleFirst)] : $femaleFirst[array_rand($femaleFirst)];
            $middleName = $middleNames[array_rand($middleNames)];
            $lastName = $lastNames[array_rand($lastNames)];
            $fullName = "{$firstName} {$middleName} {$lastName}";

            $randomKecamatan = $kecamatans->random();

            Citizen::create([
                'full_name' => $fullName,
                'nik_hash' => $nikService->hash($baseNik),
                'nik_encrypted' => $baseNik,
                'nik_last4' => substr($baseNik, -4),
                'region_id' => $randomKecamatan->id,
                'kk_number' => $generateKK(),
                'phone' => $generatePhone(),
                'address' => $generateAddress(),
                'gender' => $isMale ? 'L' : 'P',
                'birth_date' => now()->subYears(rand(18, 65)),
                'desil' => $desil,
                'desil_label' => $desilLabels[$desil],
            ]);
        }
    }
}