<?php declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\DB;

final class ReferenceGenerator
{
    /**
     * Generate proposal reference number (USL-YYYY-NNNNNN)
     */
    public function proposal(): string
    {
        return $this->generate('USL');
    }

    /**
     * Generate complaint reference number (PGD-YYYY-NNNNNN)
     */
    public function complaint(): string
    {
        return $this->generate('PGD');
    }

    private function generate(string $prefix): string
    {
        $year = now()->year;
        $key = "{$prefix}-{$year}";

        DB::beginTransaction();
        try {
            $sequence = DB::table('reference_sequences')
                ->where('key', $key)
                ->lockForUpdate()
                ->first();

            if (!$sequence) {
                DB::table('reference_sequences')->insert([
                    'key' => $key,
                    'last_value' => 0,
                ]);
                $lastValue = 0;
            } else {
                $lastValue = $sequence->last_value;
            }

            $nextValue = $lastValue + 1;
            DB::table('reference_sequences')
                ->where('key', $key)
                ->update(['last_value' => $nextValue]);

            DB::commit();

            return sprintf('%s-%d-%06d', $prefix, $year, $nextValue);
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
