<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('distribution_histories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('distribution_id');
            $table->string('from_status')->nullable();
            $table->string('to_status');
            $table->text('note')->nullable();
            $table->uuid('changed_by');
            $table->timestamp('created_at');

            $table->foreign('distribution_id')->references('id')->on('distributions')->onDelete('cascade');
            $table->foreign('changed_by')->references('id')->on('users')->onDelete('restrict');
            $table->index(['distribution_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('distribution_histories');
    }
};
