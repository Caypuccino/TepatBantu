<?php declare(strict_types=1);

namespace Database\Seeders;

use App\Models\BeneficiaryRecord;
use App\Models\Citizen;
use App\Models\Program;
use App\Services\NikService;
use Illuminate\Database\Seeder;

class BeneficiarySeeder extends Seeder
{
    public function run(): void
    {
        // Ambil data program
        $pkh = Program::where('code', 'PKH')->first();
        $bpnt = Program::where('code', 'BPNT')->first();
        
        if (!$pkh || !$bpnt) {
            throw new \Exception("Program PKH atau BPNT tidak ditemukan. Cek ProgramSeeder.");
        }

        // NIK Demo yang akan didaftarkan menerima bansos
        $niks = [
            '3273010101010001' => ['program' => $pkh->id, 'status' => 'TERDAFTAR'],
            '3273010101010002' => ['program' => $bpnt->id, 'status' => 'TERDAFTAR'],
            '3273010101010003' => ['program' => $pkh->id, 'status' => 'PERLU_VERIFIKASI'],
            // 3273010101010004 sengaja dibiarkan tidak didaftarkan (untuk tes BELUM_TERDAFTAR)
        ];

        $nikService = new NikService();

        foreach ($niks as $nik => $data) {
            // PERBAIKAN: Cast $nik menjadi (string) karena PHP otomatis mengubah key angka menjadi Integer
            $nikHash = $nikService->hash((string) $nik);
            $citizen = Citizen::where('nik_hash', $nikHash)->first();

            if ($citizen) {
                BeneficiaryRecord::create([
                    'citizen_id' => $citizen->id,
                    'program_id' => $data['program'],
                    'region_id' => $citizen->region_id,
                    'status' => $data['status'],
                ]);
            }
        }
    }
}