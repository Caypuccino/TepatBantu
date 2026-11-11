<?php declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileObjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $url = $this->path ? url('storage/' . $this->path) : null;

        return [
            'file_id' => $this->id,
            'filename' => $this->filename,
            'mime' => $this->mime,
            'size' => $this->size,
            'url' => $url,
        ];
    }
}
