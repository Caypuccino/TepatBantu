<?php declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Seeder;

class RegionSeeder extends Seeder
{
    public function run(): void
    {
        // Jawa Barat (Provinsi)
        $jabarId = Region::create([
            'level' => 'PROVINSI',
            'name' => 'Jawa Barat',
        ])->id;

        // Kota Bandung
        $kotaBandungId = Region::create([
            'level' => 'KOTA_KAB',
            'name' => 'Kota Bandung',
            'parent_id' => $jabarId,
        ])->id;

        // Kecamatan di Kota Bandung
        Region::create([
            'level' => 'KECAMATAN',
            'name' => 'Coblong',
            'parent_id' => $kotaBandungId,
        ]);

        Region::create([
            'level' => 'KECAMATAN',
            'name' => 'Sukajadi',
            'parent_id' => $kotaBandungId,
        ]);

        // Kabupaten Garut
        $kabGarutId = Region::create([
            'level' => 'KOTA_KAB',
            'name' => 'Kabupaten Garut',
            'parent_id' => $jabarId,
        ])->id;

        // Kecamatan di Kabupaten Garut
        Region::create([
            'level' => 'KECAMATAN',
            'name' => 'Tarogong Kidul',
            'parent_id' => $kabGarutId,
        ]);
    }
}
