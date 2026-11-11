<?php declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProposalResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference_no' => $this->reference_no,
            'citizen_id' => $this->citizen_id,
            'region_id' => $this->region_id,
            'status' => $this->status->value,
            'status_label' => $this->status->label(),
            'personal_data' => $this->personal_data,
            'socio_economic' => $this->socio_economic,
            'assigned_officer_id' => $this->assigned_officer_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'timeline' => ProposalTimelineResource::collection($this->whenLoaded('timelines')),
            'documents' => ProposalDocumentResource::collection($this->whenLoaded('documents')),
            'field_verification' => new FieldVerificationResource($this->whenLoaded('fieldVerification')),
        ];
    }
}
