<?php declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            RegionSeeder::class,
            ProgramSeeder::class,
            DemoUserSeeder::class,
            CitizenSeeder::class,
            BeneficiarySeeder::class,
            DistributionSeeder::class,
            ProposalSeeder::class,
            ComplaintSeeder::class,
            PressReleaseSeeder::class,
        ]);
    }
}
