<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Region;
use Illuminate\Http\JsonResponse;

class PublicRegionController extends Controller
{
    public function index(): JsonResponse
    {
        // Ambil semua Kota/Kabupaten beserta anak-anaknya (Kecamatan)
        $regions = Region::where('level', 'KOTA_KAB')
            ->with(['children' => function ($query) {
                $query->where('level', 'KECAMATAN')->orderBy('name');
            }])
            ->orderBy('name')
            ->get();

        $data = $regions->map(function ($kota) {
            return [
                'id' => $kota->id,
                'name' => $kota->name,
                'kecamatan' => $kota->children->map(function ($kec) {
                    return ['id' => $kec->id, 'name' => $kec->name];
                })
            ];
        });

        return response()->json(['data' => $data]);
    }
}