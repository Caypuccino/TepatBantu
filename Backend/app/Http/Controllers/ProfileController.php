<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\BeneficiaryRecordResource;
use App\Http\Resources\CitizenResource;
use App\Http\Resources\DistributionResource;
use App\Models\Citizen;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function getProfile(Request $request): JsonResponse
    {
        $user = $request->user();
        $citizen = Citizen::where('user_id', $user->id)->first();

        if (!$citizen) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Profil warga tidak ditemukan',
                ],
            ], 404);
        }

        return response()->json([
            'data' => CitizenResource::make($citizen),
        ]);
    }

    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        $citizen = Citizen::where('user_id', $user->id)->first();

        if (!$citizen) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Profil warga tidak ditemukan',
                ],
            ], 404);
        }

        $data = $request->only(['phone', 'address', 'gender', 'birth_date', 'kk_number']);

        if ($request->filled('full_name')) {
            $user->update(['full_name' => $request->string('full_name')->value()]);
        }

        $citizen->update($data);

        return response()->json([
            'data' => CitizenResource::make($citizen),
        ]);
    }

    public function getAssistance(Request $request): JsonResponse
    {
        $user = $request->user();
        $citizen = Citizen::where('user_id', $user->id)
            ->with('beneficiaryRecords.program', 'beneficiaryRecords.distributions')
            ->first();

        if (!$citizen) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Profil warga tidak ditemukan',
                ],
            ], 404);
        }

        return response()->json([
            'data' => [
                'citizen' => CitizenResource::make($citizen),
                'beneficiaries' => BeneficiaryRecordResource::collection($citizen->beneficiaryRecords),
                'latest_distributions' => DistributionResource::collection(
                    $citizen->beneficiaryRecords
                        ->flatMap(fn ($br) => $br->distributions)
                        ->sortByDesc('created_at')
                        ->take(5)
                ),
            ],
        ]);
    }
}
