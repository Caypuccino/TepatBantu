<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('field_verifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('proposal_id')->unique();
            $table->uuid('officer_id');
            $table->timestamp('scheduled_at');
            $table->json('checklist');
            $table->text('notes')->nullable();
            $table->enum('result', ['SESUAI', 'PERLU_INFO', 'TIDAK_SESUAI'])->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();

            $table->foreign('proposal_id')->references('id')->on('proposals')->onDelete('cascade');
            $table->foreign('officer_id')->references('id')->on('users')->onDelete('restrict');
            $table->index(['officer_id', 'scheduled_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('field_verifications');
    }
};
