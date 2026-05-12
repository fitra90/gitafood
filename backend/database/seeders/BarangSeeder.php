<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Barang;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $barangs = [
            [
                'kode_barang' => 'BB-001',
                'nama_barang' => 'Tepung Terigu Segitiga Biru',
                'kategori' => 'Bahan Baku',
                'satuan' => 'kg',
                'harga_beli' => 10500,
                'harga_jual' => 12000,
                'stok' => 500,
            ],
            [
                'kode_barang' => 'BB-002',
                'nama_barang' => 'Gula Pasir',
                'kategori' => 'Bahan Baku',
                'satuan' => 'kg',
                'harga_beli' => 15000,
                'harga_jual' => 16500,
                'stok' => 250,
            ],
            [
                'kode_barang' => 'BB-003',
                'nama_barang' => 'Mentega Blueband',
                'kategori' => 'Bahan Baku',
                'satuan' => 'kg',
                'harga_beli' => 28000,
                'harga_jual' => 32000,
                'stok' => 100,
            ],
            [
                'kode_barang' => 'BB-004',
                'nama_barang' => 'Cokelat Bubuk',
                'kategori' => 'Perisa',
                'satuan' => 'kg',
                'harga_beli' => 45000,
                'harga_jual' => 55000,
                'stok' => 50,
            ],
            [
                'kode_barang' => 'BB-005',
                'nama_barang' => 'Minyak Goreng Bimoli',
                'kategori' => 'Bahan Baku',
                'satuan' => 'liter',
                'harga_beli' => 14000,
                'harga_jual' => 15500,
                'stok' => 1000,
            ],
            [
                'kode_barang' => 'PKG-001',
                'nama_barang' => 'Plastik Kemasan Pouch',
                'kategori' => 'Packaging',
                'satuan' => 'pcs',
                'harga_beli' => 800,
                'harga_jual' => 1000,
                'stok' => 5000,
            ],
        ];

        foreach ($barangs as $barang) {
            Barang::create($barang);
        }
    }
}
