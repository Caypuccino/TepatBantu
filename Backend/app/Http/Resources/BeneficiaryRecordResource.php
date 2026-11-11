<?php declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BeneficiaryRecordResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'program_id' => $this->program_id,
            'program_name' => $this->program->name,
            'status' => $this->status->value,
            'status_label' => $this->status->label(),
            'latest_distribution' => new DistributionResource($this->whenLoaded('distributions')?->first()),
        ];
    }
}
