<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('password');
            $table->enum('role', ['WARGA', 'PETUGAS', 'ADMIN']);
            $table->enum('status', ['AKTIF', 'NONAKTIF', 'MENUNGGU_VERIFIKASI'])->default('MENUNGGU_VERIFIKASI');
            $table->uuid('region_id')->nullable();
            $table->timestamp('last_activity_at')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('region_id')->references('id')->on('regions')->onDelete('set null');
            $table->index('email');
            $table->index('role');
            $table->index('region_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
