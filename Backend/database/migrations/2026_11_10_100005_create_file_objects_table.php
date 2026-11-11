<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('file_objects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('filename');
            $table->string('mime');
            $table->bigInteger('size');
            $table->string('path');
            $table->uuid('owner_id')->nullable();
            $table->timestamp('created_at');

            $table->foreign('owner_id')->references('id')->on('users')->onDelete('set null');
            $table->index('owner_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('file_objects');
    }
};
