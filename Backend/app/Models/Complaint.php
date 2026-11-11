<?php declare(strict_types=1);

namespace App\Models;

use App\Enums\ComplaintStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Complaint extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['reference_no', 'submitted_by', 'citizen_id', 'region_id', 'category', 'program_id', 'incident_date', 'incident_location', 'description', 'confidential', 'status', 'assigned_officer_id'];

    protected function casts(): array
    {
        return [
            'status' => ComplaintStatus::class,
            'confidential' => 'boolean',
            'incident_date' => 'date',
        ];
    }

    public function submittedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }

    public function citizen(): BelongsTo
    {
        return $this->belongsTo(Citizen::class);
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    public function assignedOfficer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_officer_id');
    }

    public function evidences(): HasMany
    {
        return $this->hasMany(ComplaintEvidence::class);
    }

    public function timelines(): HasMany
    {
        return $this->hasMany(ComplaintTimeline::class);
    }
}
