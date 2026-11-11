<?php declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\Role;
use App\Enums\UserStatus;
use App\Models\Region;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUserSeeder extends Seeder
{
    public function run(): void
    {
        // Get regions
        $kotaBandung = Region::where('name', 'Kota Bandung')->firstOrFail();
        $kabGarut = Region::where('name', 'Kabupaten Garut')->firstOrFail();

        // Warga 1 - Bandung
        User::create([
            'full_name' => 'Warga Demo Satu',
            'email' => 'warga1@demo.test',
            'phone' => '08123456789',
            'password' => Hash::make('demo1234'),
            'role' => Role::WARGA,
            'status' => UserStatus::AKTIF,
        ]);

        // Warga 2 - Garut
        User::create([
            'full_name' => 'Warga Demo Dua',
            'email' => 'warga2@demo.test',
            'phone' => '08123456790',
            'password' => Hash::make('demo1234'),
            'role' => Role::WARGA,
            'status' => UserStatus::AKTIF,
        ]);

        // Petugas Bandung
        User::create([
            'full_name' => 'Petugas Bandung',
            'email' => 'petugas.bdg@demo.test',
            'phone' => '08123456791',
            'password' => Hash::make('demo1234'),
            'role' => Role::PETUGAS,
            'status' => UserStatus::AKTIF,
            'region_id' => $kotaBandung->id,
        ]);

        // Petugas Garut
        User::create([
            'full_name' => 'Petugas Garut',
            'email' => 'petugas.garut@demo.test',
            'phone' => '08123456792',
            'password' => Hash::make('demo1234'),
            'role' => Role::PETUGAS,
            'status' => UserStatus::AKTIF,
            'region_id' => $kabGarut->id,
        ]);

        // Admin
        User::create([
            'full_name' => 'Administrator',
            'email' => 'admin@demo.test',
            'phone' => '08123456793',
            'password' => Hash::make('demo1234'),
            'role' => Role::ADMIN,
            'status' => UserStatus::AKTIF,
        ]);
    }
}
