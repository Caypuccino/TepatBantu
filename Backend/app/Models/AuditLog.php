<?php declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['user_id', 'role', 'action_type', 'module', 'record_id', 'old_value', 'new_value', 'ip'];

    protected function casts(): array
    {
        return [
            'old_value' => 'json',
            'new_value' => 'json',
        ];
    }

    public const UPDATED_AT = null;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
