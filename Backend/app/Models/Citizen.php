<?php declare(strict_types=1);

namespace App\Models;

use App\Casts\NikEncrypted;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Hidden(['nik_hash', 'nik_encrypted'])]
class Citizen extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['user_id', 'full_name', 'nik_hash', 'nik_encrypted', 'nik_last4', 'kk_number', 'birth_date', 'gender', 'phone', 'address', 'region_id'];

    protected function casts(): array
    {
        return [
            'nik_encrypted' => NikEncrypted::class,
            'birth_date' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

    public function beneficiaryRecords(): HasMany
    {
        return $this->hasMany(BeneficiaryRecord::class);
    }

    public function proposals(): HasMany
    {
        return $this->hasMany(Proposal::class);
    }

    public function complaints(): HasMany
    {
        return $this->hasMany(Complaint::class);
    }
}
