<?php declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DistributionHistory extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['distribution_id', 'from_status', 'to_status', 'note', 'changed_by'];

    public const CREATED_AT = 'created_at';
    public const UPDATED_AT = null;

    public function distribution(): BelongsTo
    {
        return $this->belongsTo(Distribution::class);
    }

    public function changedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
