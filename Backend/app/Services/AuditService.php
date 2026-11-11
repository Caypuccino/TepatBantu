<?php declare(strict_types=1);

namespace App\Services;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Support\Facades\Request;

final class AuditService
{
    public function log(
        ?User $actor,
        string $actionType,
        string $module,
        ?string $recordId = null,
        ?array $oldValue = null,
        ?array $newValue = null,
    ): AuditLog {
        return AuditLog::create([
            'user_id' => $actor?->id,
            'role' => $actor?->role->value,
            'action_type' => $actionType,
            'module' => $module,
            'record_id' => $recordId,
            'old_value' => $oldValue,
            'new_value' => $newValue,
            'ip' => Request::ip(),
        ]);
    }
}
