<?php declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FieldVerificationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'proposal_id' => $this->proposal_id,
            'officer_id' => $this->officer_id,
            'scheduled_at' => $this->scheduled_at,
            'checklist' => $this->checklist,
            'notes' => $this->notes,
            'result' => $this->result?->value,
            'result_label' => $this->result?->label(),
            'submitted_at' => $this->submitted_at,
        ];
    }
}
