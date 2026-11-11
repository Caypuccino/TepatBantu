<?php declare(strict_types=1);

namespace App\Models;

use App\Enums\FieldVerificationResult;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FieldVerification extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['proposal_id', 'officer_id', 'scheduled_at', 'checklist', 'notes', 'result', 'submitted_at'];

    protected function casts(): array
    {
        return [
            'checklist' => 'json',
            'result' => FieldVerificationResult::class,
            'scheduled_at' => 'datetime',
            'submitted_at' => 'datetime',
        ];
    }

    public function proposal(): BelongsTo
    {
        return $this->belongsTo(Proposal::class);
    }

    public function officer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'officer_id');
    }
}
