<?php declare(strict_types=1);

namespace App\Models;

use App\Enums\DistributionStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Distribution extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['beneficiary_record_id', 'period', 'channel', 'location', 'scheduled_date', 'status', 'notes', 'updated_by'];

    protected function casts(): array
    {
        return [
            'status' => DistributionStatus::class,
            'scheduled_date' => 'datetime',
        ];
    }

    public function beneficiaryRecord(): BelongsTo
    {
        return $this->belongsTo(BeneficiaryRecord::class);
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function histories(): HasMany
    {
        return $this->hasMany(DistributionHistory::class);
    }
}
