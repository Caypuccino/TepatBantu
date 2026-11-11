<?php declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\ComplaintStatus;
use App\Models\Citizen;
use App\Models\Complaint;
use App\Models\Region;
use App\Models\User;
use App\Services\ReferenceGenerator;
use Illuminate\Database\Seeder;

class ComplaintSeeder extends Seeder
{
    public function run(): void
    {
        $referenceGenerator = new ReferenceGenerator();
        $kotaBandung = Region::where('name', 'Kota Bandung')->firstOrFail();
        $kabGarut = Region::where('name', 'Kabupaten Garut')->firstOrFail();

        $warga1 = User::where('email', 'warga1@demo.test')->firstOrFail();
        $warga2 = User::where('email', 'warga2@demo.test')->firstOrFail();
        $petugasBdg = User::where('email', 'petugas.bdg@demo.test')->firstOrFail();
        $petugasGarut = User::where('email', 'petugas.garut@demo.test')->firstOrFail();

        $bandungCitizens = Citizen::where('region_id', $kotaBandung->id)->skip(20)->take(6)->get();
        $garutCitizens = Citizen::where('region_id', $kabGarut->id)->skip(20)->take(4)->get();

        $categories = ['BANTUAN_BELUM_DITERIMA', 'PEMOTONGAN', 'SALAH_SASAR', 'KETIDAKSESUAIAN_DATA'];
        $statuses = [
            ComplaintStatus::DIAJUKAN,
            ComplaintStatus::DITINJAU,
            ComplaintStatus::DALAM_INVESTIGASI,
            ComplaintStatus::DISELESAIKAN,
        ];

        $index = 0;
        foreach ($bandungCitizens as $citizen) {
            $status = $statuses[$index % count($statuses)];
            Complaint::create([
                'reference_no' => $referenceGenerator->complaint(),
                'submitted_by' => $warga1->id,
                'citizen_id' => $citizen->id,
                'region_id' => $kotaBandung->id,
                'category' => $categories[$index % count($categories)],
                'incident_date' => now()->subDays(rand(1, 30)),
                'incident_location' => 'Lokasi Demo Bandung',
                'description' => 'Deskripsi pengaduan demo untuk testing sistem TepatBantu dengan panjang minimum 30 karakter.',
                'confidential' => $index === 0,
                'status' => $status,
                'assigned_officer_id' => $petugasBdg->id,
            ]);
            $index++;
        }

        $index = 0;
        foreach ($garutCitizens as $citizen) {
            $status = $statuses[$index % count($statuses)];
            Complaint::create([
                'reference_no' => $referenceGenerator->complaint(),
                'submitted_by' => $warga2->id,
                'citizen_id' => $citizen->id,
                'region_id' => $kabGarut->id,
                'category' => $categories[$index % count($categories)],
                'incident_date' => now()->subDays(rand(1, 30)),
                'incident_location' => 'Lokasi Demo Garut',
                'description' => 'Deskripsi pengaduan demo untuk testing sistem TepatBantu dengan panjang minimum 30 karakter.',
                'confidential' => false,
                'status' => $status,
                'assigned_officer_id' => $petugasGarut->id,
            ]);
            $index++;
        }
    }
}
