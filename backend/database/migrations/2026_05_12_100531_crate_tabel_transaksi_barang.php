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
        Schema::create('tabel_transaksi_barang', function (Blueprint $table) {
            $table->id();
            $table->foreignId('barang_id')->constrained('tabel_barang')->onDelete('cascade');
            $table->enum('tipe_transaksi', ['masuk', 'keluar']);
            $table->integer('kuantitas');
            $table->string('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tabel_transaksi_barang');
    }
};
