<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('contacts');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('username');
            $table->string('email');
            $table->string('phone');
            $table->text('message');
            $table->enum('done', ['0','1'])->default('0');
            $table->timestamps();
        });
    }
};
