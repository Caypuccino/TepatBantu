<?php declare(strict_types=1);

namespace App\Models;

use App\Enums\BeneficiaryStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BeneficiaryRecord extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['citizen_id', 'program_id', 'region_id', 'status'];

    protected function casts(): array
    {
        return [
            'status' => BeneficiaryStatus::class,
        ];
    }

    public function citizen(): BelongsTo
    {
        return $this->belongsTo(Citizen::class);
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

    public function distributions(): HasMany
    {
        return $this->hasMany(Distribution::class);
    }
}
