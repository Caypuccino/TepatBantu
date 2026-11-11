<?php declare(strict_types=1);

namespace App\Models;

use App\Enums\ProposalStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Proposal extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['reference_no', 'citizen_id', 'submitted_by', 'region_id', 'status', 'assigned_officer_id', 'personal_data', 'socio_economic'];

    protected function casts(): array
    {
        return [
            'status' => ProposalStatus::class,
            'personal_data' => 'json',
            'socio_economic' => 'json',
        ];
    }

    public function citizen(): BelongsTo
    {
        return $this->belongsTo(Citizen::class);
    }

    public function submittedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

    public function assignedOfficer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_officer_id');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(ProposalDocument::class);
    }

    public function timelines(): HasMany
    {
        return $this->hasMany(ProposalTimeline::class);
    }

    public function fieldVerification(): HasMany
    {
        return $this->hasMany(FieldVerification::class);
    }
}
