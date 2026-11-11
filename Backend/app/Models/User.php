<?php declare(strict_types=1);

namespace App\Models;

use App\Enums\Role;
use App\Enums\UserStatus;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Casts\AsEnumCollection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['full_name', 'email', 'phone', 'password', 'status'])]
#[Hidden(['password', 'remember_token', 'nik_hash', 'nik_encrypted'])]
class User extends Authenticatable
{
    use HasFactory, HasUuids, Notifiable, HasApiTokens;

    protected $keyType = 'string';
    public $incrementing = false;

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'role' => Role::class,
            'status' => UserStatus::class,
            'last_activity_at' => 'datetime',
        ];
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

    public function citizen(): HasMany
    {
        return $this->hasMany(Citizen::class);
    }

    public function proposals(): HasMany
    {
        return $this->hasMany(Proposal::class, 'submitted_by');
    }

    public function complaints(): HasMany
    {
        return $this->hasMany(Complaint::class, 'submitted_by');
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function auditLogs(): HasMany
    {
        return $this->hasMany(AuditLog::class);
    }

    public function pressReleases(): HasMany
    {
        return $this->hasMany(PressRelease::class, 'author_id');
    }

    public function fileObjects(): HasMany
    {
        return $this->hasMany(FileObject::class, 'owner_id');
    }

    public function proposalsAssigned(): HasMany
    {
        return $this->hasMany(Proposal::class, 'assigned_officer_id');
    }

    public function complaintsAssigned(): HasMany
    {
        return $this->hasMany(Complaint::class, 'assigned_officer_id');
    }

    public function fieldVerifications(): HasMany
    {
        return $this->hasMany(FieldVerification::class, 'officer_id');
    }

    public function distributions(): HasMany
    {
        return $this->hasMany(Distribution::class, 'updated_by');
    }

    public function distributionHistories(): HasMany
    {
        return $this->hasMany(DistributionHistory::class, 'changed_by');
    }
}
