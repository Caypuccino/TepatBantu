<?php declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\ProposalStatus;
use App\Models\Citizen;
use App\Models\Region;
use App\Models\Proposal;
use App\Models\User;
use App\Services\ReferenceGenerator;
use Illuminate\Database\Seeder;

class ProposalSeeder extends Seeder
{
    public function run(): void
    {
        $referenceGenerator = new ReferenceGenerator();
        $regionService = new \App\Services\RegionService();
        $kotaBandung = Region::where('name', 'Kota Bandung')->firstOrFail();
        $kabGarut = Region::where('name', 'Kabupaten Garut')->firstOrFail();

        $bandungRegionIds = $regionService->subtreeIds($kotaBandung->id);
        $garutRegionIds = $regionService->subtreeIds($kabGarut->id);

        $warga1 = User::where('email', 'warga1@demo.test')->firstOrFail();
        $warga2 = User::where('email', 'warga2@demo.test')->firstOrFail();
        $petugasBdg = User::where('email', 'petugas.bdg@demo.test')->firstOrFail();
        $petugasGarut = User::where('email', 'petugas.garut@demo.test')->firstOrFail();

        $bandungCitizens = Citizen::whereIn('region_id', $bandungRegionIds)->skip(0)->take(8)->get();
        $garutCitizens = Citizen::whereIn('region_id', $garutRegionIds)->skip(0)->take(6)->get();

        $statuses = [
            ProposalStatus::DIAJUKAN,
            ProposalStatus::MENUNGGU_PEMERIKSAAN,
            ProposalStatus::VERIFIKASI_LAPANGAN,
            ProposalStatus::PERLU_PERBAIKAN,
            ProposalStatus::DISETUJUI,
            ProposalStatus::DITOLAK,
            ProposalStatus::SELESAI,
        ];

        $bandungIndex = 0;
        foreach ($bandungCitizens as $citizen) {
            $status = $statuses[$bandungIndex % count($statuses)];
            $proposal = Proposal::create([
                'reference_no' => $referenceGenerator->proposal(),
                'citizen_id' => $citizen->id,
                'submitted_by' => $warga1->id,
                'region_id' => $kotaBandung->id,
                'status' => $status,
                'assigned_officer_id' => $petugasBdg->id,
                'personal_data' => [
                    'full_name' => $citizen->full_name,
                    'nik_last4' => $citizen->nik_last4,
                    'birth_date' => $citizen->birth_date?->format('Y-m-d'),
                    'gender' => $citizen->gender ?? 'L',
                    'phone' => $citizen->phone ?? '08123456789',
                    'address' => $citizen->address ?? 'Alamat Demo',
                ],
                'socio_economic' => [
                    'family_size' => rand(3, 7),
                    'employment_status' => 'Tidak Bekerja',
                    'income_range' => '<500000',
                    'housing_status' => 'Milik Sendiri',
                    'house_condition' => 'Rusak Ringan',
                ],
            ]);

            $bandungIndex++;
        }

        $garutIndex = 0;
        foreach ($garutCitizens as $citizen) {
            $status = $statuses[$garutIndex % count($statuses)];
            Proposal::create([
                'reference_no' => $referenceGenerator->proposal(),
                'citizen_id' => $citizen->id,
                'submitted_by' => $warga2->id,
                'region_id' => $kabGarut->id,
                'status' => $status,
                'assigned_officer_id' => $petugasGarut->id,
                'personal_data' => [
                    'full_name' => $citizen->full_name,
                    'nik_last4' => $citizen->nik_last4,
                    'birth_date' => $citizen->birth_date?->format('Y-m-d'),
                    'gender' => $citizen->gender ?? 'L',
                    'phone' => $citizen->phone ?? '08123456790',
                    'address' => $citizen->address ?? 'Alamat Demo Garut',
                ],
                'socio_economic' => [
                    'family_size' => rand(3, 7),
                    'employment_status' => 'Petani',
                    'income_range' => '<500000',
                    'housing_status' => 'Milik Sendiri',
                    'house_condition' => 'Rusak Berat',
                ],
            ]);

            $garutIndex++;
        }
    }
}
