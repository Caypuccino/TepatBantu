<?php declare(strict_types=1);

namespace Database\Seeders;

use App\Models\BeneficiaryRecord;
use App\Models\Distribution;
use Illuminate\Database\Seeder;

class DistributionSeeder extends Seeder
{
    public function run(): void
    {
        $beneficiaries = BeneficiaryRecord::all();
        $channels = ['BRI', 'BNI', 'Mandiri', 'BSI', 'POS', 'TITIK_LOKAL'];
        $statuses = ['ALOKASI_TERCATAT', 'DIJADWALKAN', 'SIAP_DISALURKAN', 'TELAH_DISALURKAN'];

        $index = 0;
        foreach ($beneficiaries as $beneficiary) {
            $status = $statuses[$index % 4];
            
            Distribution::create([
                'beneficiary_record_id' => $beneficiary->id,
                'period' => now()->format('Y-m'),
                'channel' => $channels[$index % count($channels)],
                'location' => $status === 'KENDALA' ? 'Lokasi Tidak Ditemukan' : null,
                'scheduled_date' => $status !== 'ALOKASI_TERCATAT' ? now()->addDays(rand(1, 30)) : null,
                'status' => $status,
                'notes' => $status === 'KENDALA' ? 'Penerima manfaat tidak hadir' : null,
            ]);
            
            $index++;
        }

        // Add one KENDALA for Garut
        $garutDistribution = Distribution::where('status', '!=', 'KENDALA')
            ->inRandomOrder()
            ->first();
        
        if ($garutDistribution) {
            $garutDistribution->update([
                'status' => 'KENDALA',
                'notes' => 'Lokasi tidak ditemukan, perlu verifikasi ulang',
            ]);
        }
    }
}
