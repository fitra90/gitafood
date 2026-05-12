<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\TransaksiBarang;
use Illuminate\Http\Request;

class TransaksiBarangController extends Controller
{
    // Menampilkan riwayat transaksi
    public function index()
    {
        // Mengambil semua data transaksi beserta info barangnya, diurutkan dari yang terbaru
        $transaksi = TransaksiBarang::with('barang')->latest()->get();
        return response()->json($transaksi);
    }

    // Mencatat transaksi masuk / keluar
    public function store(Request $request)
    {
        // 1. Validasi Input Dasar
        $request->validate([
            'barang_id' => 'required|exists:tabel_barang,id',
            'tipe_transaksi' => 'required|in:masuk,keluar',
            'kuantitas' => 'required|integer|min:1',
            'keterangan' => 'nullable|string'
        ]);

        $barang = Barang::find($request->barang_id);

        // 2. Cek Stok untuk barang keluar
        if ($request->tipe_transaksi === 'keluar' && $barang->stok < $request->kuantitas) {
            return response()->json([
                'message' => 'Transaksi melebihi stok barang saat ini',
                'status' => 'error'
            ], 400); // 400 Bad Request
        }

        // 3. Update Stok di Tabel Master Barang
        if ($request->tipe_transaksi === 'masuk') {
            $barang->stok += $request->kuantitas;
        } else {
            $barang->stok -= $request->kuantitas;
        }
        $barang->save();

        // 4. Catat Riwayat (Log) di Tabel Transaksi Barang
        $transaksi = TransaksiBarang::create([
            'barang_id' => $request->barang_id,
            'tipe_transaksi' => $request->tipe_transaksi,
            'kuantitas' => $request->kuantitas,
            'keterangan' => $request->keterangan
        ]);

        return response()->json([
            'message' => 'Transaksi berhasil diproses',
            'status' => 'success',
            'data' => $transaksi
        ]);
    }
}
