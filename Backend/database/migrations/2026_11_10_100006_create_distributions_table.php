<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('distributions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('beneficiary_record_id');
            $table->char('period', 7);
            $table->enum('channel', ['BRI', 'BNI', 'Mandiri', 'BSI', 'POS', 'TITIK_LOKAL']);
            $table->string('location')->nullable();
            $table->timestamp('scheduled_date')->nullable();
            $table->enum('status', ['ALOKASI_TERCATAT', 'DIJADWALKAN', 'SIAP_DISALURKAN', 'TELAH_DISALURKAN', 'KENDALA']);
            $table->text('notes')->nullable();
            $table->uuid('updated_by')->nullable();
            $table->timestamps();

            $table->foreign('beneficiary_record_id')->references('id')->on('beneficiary_records')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
            $table->index(['beneficiary_record_id', 'status']);
            $table->index('period');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('distributions');
    }
};
