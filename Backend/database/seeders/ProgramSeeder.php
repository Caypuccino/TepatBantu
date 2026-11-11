<?php declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Program;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    public function run(): void
    {
        Program::create([
            'code' => 'PKH',
            'name' => 'Program Keluarga Harapan',
            'description' => 'Program bantuan sosial untuk keluarga kurang mampu',
            'active' => true,
        ]);

        Program::create([
            'code' => 'BPNT',
            'name' => 'Bantuan Pangan Non Tunai',
            'description' => 'Program bantuan pangan melalui kartu elektronik',
            'active' => true,
        ]);

        Program::create([
            'code' => 'BLT-DD',
            'name' => 'Bantuan Langsung Tunai Dana Desa',
            'description' => 'Program bantuan tunai dari dana desa',
            'active' => true,
        ]);
    }
}
