<?php declare(strict_types=1);

namespace Database\Seeders;

use App\Models\PressRelease;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PressReleaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@demo.test')->firstOrFail();

        $releases = [
            [
                'title' => 'Program Keluarga Harapan Dimulai Fase Baru',
                'category' => 'Informasi Bantuan',
                'content' => 'Kami dengan senang hati mengumumkan dimulainya fase baru Program Keluarga Harapan yang dirancang untuk memberikan dukungan lebih baik kepada keluarga-keluarga yang membutuhkan di seluruh wilayah.',
                'status' => 'PUBLISHED',
            ],
            [
                'title' => 'Bantuan Pangan Non Tunai Tersedia Setiap Hari',
                'category' => 'Penyaluran',
                'content' => 'Layanan Bantuan Pangan Non Tunai kini tersedia di setiap hari kerja di kantor cabang kami. Pastikan Anda membawa dokumen identitas asli saat mendatangi lokasi penyaluran.',
                'status' => 'PUBLISHED',
            ],
            [
                'title' => 'Verifikasi Data Penerima Manfaat Dilakukan Berkala',
                'category' => 'Pengumuman Layanan',
                'content' => 'Demi memastikan ketepatan sasaran, tim kami melakukan verifikasi data secara berkala. Mohon untuk memastikan data Anda tetap update dengan melaporkan setiap perubahan.',
                'status' => 'PUBLISHED',
            ],
            [
                'title' => 'Laporan Bulanan Bantuan Sosial Bulan Oktober',
                'category' => 'Laporan Bulanan',
                'content' => 'Bulan Oktober mencatat peningkatan 15% dalam penyaluran bantuan dibanding bulan sebelumnya. Kami berterima kasih kepada semua tim yang telah bekerja keras untuk mensukseskan program ini.',
                'status' => 'PUBLISHED',
            ],
            [
                'title' => 'Layanan Pengaduan Kini Lebih Mudah Diakses',
                'category' => 'Informasi Bantuan',
                'content' => 'Kami meluncurkan sistem pelaporan pengaduan yang lebih sederhana dan transparan. Masyarakat dapat melaporkan keluhan mereka melalui berbagai saluran yang tersedia.',
                'status' => 'PUBLISHED',
            ],
            [
                'title' => 'Draft: Persiapan Program Baru 2026',
                'category' => 'Pengumuman Layanan',
                'content' => 'Kami sedang mempersiapkan program-program baru untuk tahun 2026 yang akan lebih komprehensif dan terarah.',
                'status' => 'DRAFT',
            ],
            [
                'title' => 'Archive: Laporan Tahun 2024',
                'category' => 'Laporan Bulanan',
                'content' => 'Laporan tahunan 2024 telah diselesaikan dan tersimpan dalam arsip untuk referensi.',
                'status' => 'ARCHIVED',
            ],
        ];

        foreach ($releases as $release) {
            PressRelease::create([
                'slug' => Str::slug($release['title']),
                'title' => $release['title'],
                'category' => $release['category'],
                'content' => $release['content'],
                'status' => $release['status'],
                'published_at' => $release['status'] === 'PUBLISHED' ? now()->subDays(rand(1, 30)) : null,
                'author_id' => $admin->id,
            ]);
        }
    }
}
