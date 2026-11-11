<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->uuid('user_id')->nullable();
            $table->longText('payload');
            $table->integer('last_activity');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('last_activity');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
