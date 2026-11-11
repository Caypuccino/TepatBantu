<?php declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Seeder;

class RegionSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            'Jawa Barat' => [
                'Kota Bandung' => ['Coblong', 'Sukajadi', 'Lengkong'],
                'Kabupaten Garut' => ['Tarogong Kidul', 'Garut Kota'],
                'Kota Bekasi' => ['Bekasi Timur', 'Bekasi Barat'],
            ],
            'DKI Jakarta' => [
                'Jakarta Selatan' => ['Kebayoran Baru', 'Tebet', 'Cilandak'],
                'Jakarta Pusat' => ['Menteng', 'Tanah Abang', 'Gambir'],
            ],
            'Jawa Timur' => [
                'Kota Surabaya' => ['Gubeng', 'Sukolilo', 'Rungkut'],
                'Kota Malang' => ['Klojen', 'Blimbing', 'Lowokwaru'],
            ],
            'Sumatera Utara' => [
                'Kota Medan' => ['Medan Baru', 'Medan Kota', 'Medan Selayang'],
                'Kabupaten Deli Serdang' => ['Lubuk Pakam', 'Pancur Batu'],
            ],
            'Sulawesi Selatan' => [
                'Kota Makassar' => ['Panakkukang', 'Rappocini', 'Tamalanrea'],
            ],
        ];

        foreach ($data as $provinsi => $kotaKabupaten) {
            $prov = Region::create([
                'level' => 'PROVINSI',
                'name' => $provinsi,
            ]);

            foreach ($kotaKabupaten as $kota => $kecamatanList) {
                $kotaRegion = Region::create([
                    'level' => 'KOTA_KAB',
                    'name' => $kota,
                    'parent_id' => $prov->id,
                ]);

                foreach ($kecamatanList as $kecamatan) {
                    Region::create([
                        'level' => 'KECAMATAN',
                        'name' => $kecamatan,
                        'parent_id' => $kotaRegion->id,
                    ]);
                }
            }
        }
    }
}