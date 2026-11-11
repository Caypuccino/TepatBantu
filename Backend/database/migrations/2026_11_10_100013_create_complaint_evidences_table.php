<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('complaint_evidences', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('complaint_id');
            $table->uuid('file_id');
            $table->enum('kind', ['FOTO', 'DOKUMEN', 'LAINNYA']);

            $table->foreign('complaint_id')->references('id')->on('complaints')->onDelete('cascade');
            $table->foreign('file_id')->references('id')->on('file_objects')->onDelete('restrict');
            $table->index('complaint_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('complaint_evidences');
    }
};
