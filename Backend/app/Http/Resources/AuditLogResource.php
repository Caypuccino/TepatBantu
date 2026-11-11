<?php declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuditLogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'user_name' => $this->user?->full_name,
            'role' => $this->role,
            'action_type' => $this->action_type,
            'module' => $this->module,
            'record_id' => $this->record_id,
            'old_value' => $this->old_value,
            'new_value' => $this->new_value,
            'ip' => $this->ip,
            'created_at' => $this->created_at,
        ];
    }
}
