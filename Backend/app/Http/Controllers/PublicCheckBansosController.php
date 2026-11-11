<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CheckBansosRequest;
use App\Services\AuditService;
use App\Services\PublicCheckService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\RateLimiter;

class PublicCheckBansosController extends Controller
{
    public function __construct(
        private PublicCheckService $checkService,
        private AuditService $auditService,
    ) {}

    public function check(CheckBansosRequest $request): JsonResponse
    {
        $ip = $request->ip();
        $key = "check-bansos:{$ip}";
        $limit = 5;
        $decayMinutes = 1;

        if (RateLimiter::tooManyAttempts($key, $limit)) {
            return response()->json([
                'error' => [
                    'code' => 'RATE_LIMITED',
                    'message' => 'Terlalu banyak permintaan. Coba lagi dalam beberapa menit.',
                ],
            ], 429);
        }

        RateLimiter::hit($key, $decayMinutes * 60);

        $nik = $request->string('nik')->value();
        $result = $this->checkService->check(
            $nik, 
            $request->input('wilayah'), 
            $request->input('kecamatan')
        );

        $this->auditService->log(
            null,
            'CHECK_BANSOS',
            'public',
            null,
            null,
            ['state' => $result['state'], 'masked_nik' => $result['masked_nik']],
        );

        return response()->json($result);
    }
}
