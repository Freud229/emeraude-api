<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Video extends Model
{
    protected $fillable = [
        'titre',
        'fichier',
        'fichier_url',
        'visible_accueil',
        'ordre',
        'taille',
        'duree',
    ];

    protected $casts = [
        'visible_accueil' => 'boolean',
    ];

    protected $appends = ['url'];

    public function getUrlAttribute(): string
    {
        return Storage::url($this->fichier);
    }

    protected static function booted(): void
    {
        static::deleting(function (Video $video) {
            if (Storage::exists($video->fichier)) {
                Storage::delete($video->fichier);
            }
        });
    }
}
