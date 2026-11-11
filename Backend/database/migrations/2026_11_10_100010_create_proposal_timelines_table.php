<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proposal_timelines', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('proposal_id');
            $table->string('status');
            $table->text('note')->nullable();
            $table->uuid('actor_id');
            $table->string('actor_role');
            $table->timestamp('created_at');

            $table->foreign('proposal_id')->references('id')->on('proposals')->onDelete('cascade');
            $table->foreign('actor_id')->references('id')->on('users')->onDelete('restrict');
            $table->index(['proposal_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proposal_timelines');
    }
};
