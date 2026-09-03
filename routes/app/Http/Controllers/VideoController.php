<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VideoController extends Controller
{
    public function index(): JsonResponse
    {
        $videos = Video::orderBy('ordre')->get();

        return response()->json([
            'success' => true,
            'videos'  => $videos,
        ]);
    }

    public function public(): JsonResponse
    {
        $videos = Video::where('visible_accueil', true)
            ->orderBy('ordre')
            ->get();

        return response()->json([
            'success' => true,
            'videos'  => $videos,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'titre'   => 'required|string|max:255',
            'fichier' => 'required|mimetypes:video/mp4,video/webm,video/ogg|max:102400',
        ]);

        $chemin = $request->file('fichier')->storeAs(
            'public/videos',
            Str::uuid() . '.' . $request->file('fichier')->getClientOriginalExtension()
        );

        $video = Video::create([
            'titre'           => $request->titre,
            'fichier'         => $chemin,
            'fichier_url'     => Storage::url($chemin),
            'visible_accueil' => true,
            'ordre'           => Video::max('ordre') + 1,
            'taille'          => $request->file('fichier')->getSize(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Vidéo importée avec succès.',
            'video'   => $video,
        ], 201);
    }

    public function toggle(Video $video): JsonResponse
    {
        $video->update(['visible_accueil' => ! $video->visible_accueil]);

        return response()->json([
            'success' => true,
            'message' => $video->visible_accueil
                ? 'Vidéo visible à l\'accueil.'
                : 'Vidéo retirée de l\'accueil.',
            'video'   => $video,
        ]);
    }

    public function destroy(Video $video): JsonResponse
    {
        $video->delete();

        return response()->json([
            'success' => true,
            'message' => 'Vidéo supprimée avec succès.',
        ]);
    }
}
