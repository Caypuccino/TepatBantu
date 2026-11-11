<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('beneficiary_records', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('citizen_id');
            $table->uuid('program_id');
            $table->uuid('region_id');
            $table->enum('status', ['TERDAFTAR', 'MENUNGGU', 'PERLU_VERIFIKASI']);
            $table->timestamps();

            $table->unique(['citizen_id', 'program_id']);
            $table->foreign('citizen_id')->references('id')->on('citizens')->onDelete('cascade');
            $table->foreign('program_id')->references('id')->on('programs')->onDelete('restrict');
            $table->foreign('region_id')->references('id')->on('regions')->onDelete('restrict');
            $table->index(['citizen_id', 'status']);
            $table->index('region_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('beneficiary_records');
    }
};
