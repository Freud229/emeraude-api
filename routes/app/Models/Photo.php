<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Photo extends Model
{
    protected $fillable = [
        'catalogue_id',
        'titre',
        'description',
        'type_lunette',
        'fichier',
        'fichier_url',
        'ordre',
        'visible',
    ];

    protected $casts = [
        'visible' => 'boolean',
    ];

    protected $appends = ['url'];

    public function getUrlAttribute(): string
    {
        return Storage::url($this->fichier);
    }

    public function catalogue(): BelongsTo
    {
        return $this->belongsTo(Catalogue::class);
    }

    protected static function booted(): void
    {
        static::deleting(function (Photo $photo) {
            if (Storage::exists($photo->fichier)) {
                Storage::delete($photo->fichier);
            }
        });
    }
}
