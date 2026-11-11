<?php declare(strict_types=1);

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

final class NikEncrypted implements CastsAttributes
{
    public function get(Model $model, string $key, mixed $value, array $attributes): ?string
    {
        if (blank($value)) {
            return null;
        }

        try {
            [$ivB64, $tagB64, $dataB64] = explode('.', (string) $value, 3);
            $plain = openssl_decrypt(
                base64_decode($dataB64),
                'aes-256-gcm',
                $this->key(),
                OPENSSL_RAW_DATA,
                base64_decode($ivB64),
                base64_decode($tagB64),
            );

            return $plain === false ? null : $plain;
        } catch (\Throwable) {
            return null;
        }
    }

    public function set(Model $model, string $key, mixed $value, array $attributes): ?string
    {
        if (blank($value)) {
            return null;
        }

        $iv = random_bytes(12);
        $tag = '';
        $enc = openssl_encrypt(
            (string) $value,
            'aes-256-gcm',
            $this->key(),
            OPENSSL_RAW_DATA,
            $iv,
            $tag,
        );

        return implode('.', [
            base64_encode($iv),
            base64_encode($tag),
            base64_encode((string) $enc),
        ]);
    }

    private function key(): string
    {
        return base64_decode((string) config('app.nik_key'));
    }
}
