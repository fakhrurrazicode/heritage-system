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
        Schema::create('heritage_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('heritage_id')->constrained('heritage')->onDelete('cascade');
            $table->string('filename');
            $table->string('file_type'); // document, image, video, etc.
            $table->string('path');
            $table->timestamp('uploaded_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('heritage_files');
    }
};
