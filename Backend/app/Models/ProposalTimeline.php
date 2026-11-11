<?php declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProposalTimeline extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['proposal_id', 'status', 'note', 'actor_id', 'actor_role'];

    public const CREATED_AT = 'created_at';
    public const UPDATED_AT = null;

    public function proposal(): BelongsTo
    {
        return $this->belongsTo(Proposal::class);
    }

    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_id');
    }
}
