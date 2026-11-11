<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proposals', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('reference_no')->unique();
            $table->uuid('citizen_id');
            $table->uuid('submitted_by');
            $table->uuid('region_id');
            $table->enum('status', ['DIAJUKAN', 'MENUNGGU_PEMERIKSAAN', 'VERIFIKASI_LAPANGAN', 'PERLU_PERBAIKAN', 'DISETUJUI', 'DITOLAK', 'SELESAI']);
            $table->uuid('assigned_officer_id')->nullable();
            $table->json('personal_data');
            $table->json('socio_economic');
            $table->timestamps();

            $table->foreign('citizen_id')->references('id')->on('citizens')->onDelete('cascade');
            $table->foreign('submitted_by')->references('id')->on('users')->onDelete('restrict');
            $table->foreign('region_id')->references('id')->on('regions')->onDelete('restrict');
            $table->foreign('assigned_officer_id')->references('id')->on('users')->onDelete('set null');
            $table->index(['region_id', 'status']);
            $table->index('assigned_officer_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};
