<?php declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComplaintResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $isConfidential = $this->confidential && $request->user()?->id !== $this->submitted_by;

        return [
            'id' => $this->id,
            'reference_no' => $this->reference_no,
            'citizen_id' => $isConfidential ? null : $this->citizen_id,
            'submitted_by' => $isConfidential ? null : $this->submitted_by,
            'region_id' => $this->region_id,
            'category' => $this->category,
            'program_id' => $this->program_id,
            'incident_date' => $this->incident_date,
            'incident_location' => $this->incident_location,
            'description' => $isConfidential ? null : $this->description,
            'confidential' => $this->confidential,
            'status' => $this->status->value,
            'status_label' => $this->status->label(),
            'identity' => $isConfidential ? 'TERLINDUNGI' : null,
            'assigned_officer_id' => $this->assigned_officer_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'timeline' => ComplaintTimelineResource::collection($this->whenLoaded('timelines')),
            'evidences' => ComplaintEvidenceResource::collection($this->whenLoaded('evidences')),
        ];
    }
}
