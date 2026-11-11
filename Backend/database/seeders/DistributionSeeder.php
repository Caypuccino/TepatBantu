<?php declare(strict_types=1);

namespace Database\Seeders;

use App\Models\BeneficiaryRecord;
use App\Models\Citizen;
use App\Models\Distribution;
use App\Models\DistributionHistory;
use App\Models\Program;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DistributionSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ambil SEMUA warga yang desilnya di bawah 7 (Desil 1 - 6)
        $eligibleCitizens = Citizen::where('desil', '<', 7)->get();

        $channels = ['BRI', 'BNI', 'Mandiri', 'BSI', 'POS', 'TITIK_LOKAL'];
        $statuses = ['ALOKASI_TERCATAT', 'DIJADWALKAN', 'SIAP_DISALURKAN', 'TELAH_DISALURKAN'];

        $officer = User::where('role', 'PETUGAS')->first() ?? User::first();
        $officerId = $officer ? $officer->id : Str::uuid()->toString();

        // Ambil data program untuk berjaga-jaga jika warga belum punya BeneficiaryRecord
        $pkh = Program::where('code', 'PKH')->first();
        $bpnt = Program::where('code', 'BPNT')->first();
        $programs = array_values(array_filter([$pkh, $bpnt]));

        $index = 0;
        foreach ($eligibleCitizens as $citizen) {
            // 2. Pastikan setiap warga berhak memiliki BeneficiaryRecord
            // Jika sudah ada (dari BeneficiarySeeder), pakai. Jika belum, buatkan.
            $beneficiary = BeneficiaryRecord::firstOrCreate(
                ['citizen_id' => $citizen->id],
                [
                    'program_id' => $programs[array_rand($programs)]->id,
                    'region_id' => $citizen->region_id,
                    'status' => 'TERDAFTAR',
                ]
            );

            // 3. Buat data Distribusi
            $status = $statuses[$index % 4];
            
            $distribution = Distribution::create([
                'beneficiary_record_id' => $beneficiary->id,
                'period' => now()->format('Y-m'),
                'channel' => $channels[$index % count($channels)],
                'location' => $status === 'KENDALA' ? 'Lokasi Tidak Ditemukan' : null,
                'scheduled_date' => $status !== 'ALOKASI_TERCATAT' ? now()->addDays(rand(1, 30)) : null,
                'status' => $status,
                'notes' => $status === 'KENDALA' ? 'Penerima manfaat tidak hadir' : null,
            ]);

            // 4. Buat Riwayat (Timeline) khusus untuk NIK 0001 (Budi Santoso) atau warga pertama
            if ($index === 0 || str_ends_with($citizen->nik_last4, '0001')) {
                $historyStatuses = [
                    ['status' => 'Alokasi Data', 'date' => now()->subDays(25)],
                    ['status' => 'Verifikasi Dinsos', 'date' => now()->subDays(15)],
                    ['status' => 'SP2D Diterbitkan', 'date' => now()->subDays(9)],
                    ['status' => 'Berhasil Tersalur', 'date' => now()->subDays(3)],
                ];

                $previousStatus = null;

                foreach ($historyStatuses as $historyData) {
                    DistributionHistory::create([
                        'distribution_id' => $distribution->id,
                        'from_status' => $previousStatus,
                        'to_status' => $historyData['status'],
                        'note' => 'Tahapan proses penyaluran',
                        'changed_by' => $officerId,
                        'created_at' => $historyData['date'],
                    ]);
                    
                    $previousStatus = $historyData['status'];
                }
            }
            
            $index++;
        }

        // 5. Ubah satu data secara acak menjadi KENDALA (untuk testing UI)
        $kendalaDistribution = Distribution::where('status', '!=', 'KENDALA')
            ->inRandomOrder()
            ->first();
        
        if ($kendalaDistribution) {
            $kendalaDistribution->update([
                'status' => 'KENDALA',
                'notes' => 'Lokasi tidak ditemukan, perlu verifikasi ulang',
            ]);
        }
    }
}