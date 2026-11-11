<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('regions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->enum('level', ['PROVINSI', 'KOTA_KAB', 'KECAMATAN', 'KELURAHAN']);
            $table->string('name');
            $table->uuid('parent_id')->nullable();
            $table->timestamps();

            $table->index('parent_id');
            $table->index('level');
        });

        Schema::table('regions', function (Blueprint $table) {
            $table->foreign('parent_id')->references('id')->on('regions')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('regions');
    }
};
