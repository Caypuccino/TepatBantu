<?php declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DistributionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'period' => $this->period,
            'channel' => $this->formatChannel(),
            'channel_code' => $this->channel,
            'location' => $this->location,
            'scheduled_date' => $this->scheduled_date,
            'status' => $this->status->value,
            'status_label' => $this->status->label(),
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'histories' => DistributionHistoryResource::collection($this->whenLoaded('histories')),
        ];
    }

    private function formatChannel(): string
    {
        $channelMap = [
            'BRI' => 'Bank BRI',
            'BNI' => 'Bank BNI',
            'BTN' => 'Bank BTN',
            'MANDIRI' => 'Bank Mandiri',
            'TITIK_LOKAL' => 'Titik Lokal / Kantor Pos',
            'POSYANDU' => 'Posyandu',
            'KELURAHAN' => 'Kantor Kelurahan',
            'KECAMATAN' => 'Kantor Kecamatan',
            'OPZ' => 'Organisasi Penyalur Zakat',
            'TRANSFER_BANK' => 'Transfer Bank',
        ];

        return $channelMap[$this->channel] ?? $this->channel;
    }
}

