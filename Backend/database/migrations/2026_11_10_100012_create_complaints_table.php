<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('complaints', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('reference_no')->unique();
            $table->uuid('submitted_by');
            $table->uuid('citizen_id')->nullable();
            $table->uuid('region_id');
            $table->string('category');
            $table->uuid('program_id')->nullable();
            $table->date('incident_date')->nullable();
            $table->string('incident_location')->nullable();
            $table->text('description');
            $table->boolean('confidential')->default(false);
            $table->enum('status', ['DIAJUKAN', 'DITINJAU', 'DALAM_INVESTIGASI', 'MEMBUTUHKAN_INFO', 'DITERUSKAN', 'DISELESAIKAN', 'DITUTUP']);
            $table->uuid('assigned_officer_id')->nullable();
            $table->timestamps();

            $table->foreign('submitted_by')->references('id')->on('users')->onDelete('restrict');
            $table->foreign('citizen_id')->references('id')->on('citizens')->onDelete('set null');
            $table->foreign('region_id')->references('id')->on('regions')->onDelete('restrict');
            $table->foreign('program_id')->references('id')->on('programs')->onDelete('set null');
            $table->foreign('assigned_officer_id')->references('id')->on('users')->onDelete('set null');
            $table->index(['region_id', 'status']);
            $table->index('assigned_officer_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};
