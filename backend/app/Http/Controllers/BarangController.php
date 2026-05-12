<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;

class BarangController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 5);
        $barang = Barang::paginate($perPage);
        return response()->json($barang);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode_barang' => 'required|string|unique:tabel_barang,kode_barang',
            'nama_barang' => 'required|string',
            'kategori' => 'nullable|string',
            'satuan' => 'required|string',
            'harga_beli' => 'required|integer',
            'harga_jual' => 'required|integer',
            'stok' => 'required|integer'
        ]);

        $barang = Barang::create($request->all());

        if ($barang) {
            return response()->json([
                'message' => 'Barang berhasil ditambahkan',
                'status' => 'success',
                'data' => $barang
            ]);
        }
        
        return response()->json([
            'message' => 'Barang gagal ditambahkan',
            'status' => 'error'
        ]);
    }

    public function show(Barang $barang)
    {
        return response()->json([
            'message' => 'Detail Barang',
            'status' => 'success',
            'data' => $barang
        ]);
    }

    public function update(Request $request, Barang $barang)
    {
        $request->validate([
            'kode_barang' => 'required|string|unique:tabel_barang,kode_barang,' . $barang->id,
            'nama_barang' => 'required|string',
            'kategori' => 'nullable|string',
            'satuan' => 'required|string',
            'harga_beli' => 'required|integer',
            'harga_jual' => 'required|integer'
        ]);

        $dataToUpdate = $request->except(['stok']);
        
        $updated = Barang::where('id', $barang->id)->update($dataToUpdate);
        
        if ($updated) {
            return response()->json([
                'message' => 'Barang berhasil diupdate',
                'status' => 'success'
            ]);
        }
        return response()->json([
            'message' => 'Barang gagal diupdate',
            'status' => 'error'
        ]);
    }

    public function destroy(Barang $barang)
    {
        $barang = Barang::where('id', $barang->id)->delete();
        if ($barang) {
            return response()->json([
                'message' => 'Barang berhasil dihapus',
                'status' => 'success'
            ]);
        }
        return response()->json([
            'message' => 'Barang gagal dihapus',
            'status' => 'error'
        ]);
    }
}
