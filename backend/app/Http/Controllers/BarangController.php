<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;

class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 5);
        $barang = Barang::paginate($perPage);
        return response()->json($barang);
    }


    public function update(Request $request, Barang $barang)
    {
        $barang = Barang::where('id', $barang->id)->update($request->all());
        if ($barang) {
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

    /**
     * Remove the specified resource from storage.
     */
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
