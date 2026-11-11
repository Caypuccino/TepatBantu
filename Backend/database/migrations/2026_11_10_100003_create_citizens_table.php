<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('citizens', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->nullable()->unique();
            $table->string('full_name');
            $table->string('nik_hash')->unique();
            $table->text('nik_encrypted');
            $table->char('nik_last4', 4);
            $table->string('kk_number')->nullable();
            $table->date('birth_date')->nullable();
            $table->enum('gender', ['L', 'P'])->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->uuid('region_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('region_id')->references('id')->on('regions')->onDelete('restrict');
            $table->index('region_id');
            $table->index('nik_hash');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('citizens');
    }
};
