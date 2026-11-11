<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->unique();
            $table->mediumText('value');
            $table->integer('expiration');

            $table->index('expiration');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cache');
    }
};
