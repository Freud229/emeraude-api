<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('catalogue_id')
                  ->constrained()
                  ->onDelete('cascade');
            $table->string('titre')->nullable();
            $table->text('description')->nullable();
            $table->enum('type_lunette', ['Vue','Soleil','Lentille','Accessoire']);
            $table->string('fichier');
            $table->string('fichier_url')->nullable();
            $table->integer('ordre')->default(0);
            $table->boolean('visible')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('photos');
    }
};
