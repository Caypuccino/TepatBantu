<?php declare(strict_types=1);

namespace Database\Seeders;

use App\Models\BeneficiaryRecord;
use App\Models\Citizen;
use App\Models\Program;
use App\Models\Region;
use Illuminate\Database\Seeder;

class BeneficiarySeeder extends Seeder
{
    public function run(): void
    {
        $kotaBandung = Region::where('name', 'Kota Bandung')->firstOrFail();
        $kabGarut = Region::where('name', 'Kabupaten Garut')->firstOrFail();

        $programs = Program::all()->keyBy('code');
        $pkh = $programs['PKH'];
        $bpnt = $programs['BPNT'];

        // Create 40 beneficiaries (20 Bandung, 20 Garut)
        $bandungCitizens = Citizen::where('region_id', $kotaBandung->id)->skip(0)->take(20)->get();
        $garutCitizens = Citizen::where('region_id', $kabGarut->id)->skip(0)->take(20)->get();

        foreach ($bandungCitizens as $index => $citizen) {
            $program = $index % 2 === 0 ? $pkh : $bpnt;
            BeneficiaryRecord::create([
                'citizen_id' => $citizen->id,
                'program_id' => $program->id,
                'region_id' => $kotaBandung->id,
                'status' => 'TERDAFTAR',
            ]);
        }

        foreach ($garutCitizens as $index => $citizen) {
            $program = $index % 2 === 0 ? $pkh : $bpnt;
            BeneficiaryRecord::create([
                'citizen_id' => $citizen->id,
                'program_id' => $program->id,
                'region_id' => $kabGarut->id,
                'status' => 'TERDAFTAR',
            ]);
        }
    }
}
