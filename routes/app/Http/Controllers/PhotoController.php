<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PhotoController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Photo::with('catalogue')->orderBy('catalogue_id')->orderBy('ordre');

        if ($request->catalogue_id) {
            $query->where('catalogue_id', $request->catalogue_id);
        }

        return response()->json([
            'success' => true,
            'photos'  => $query->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'catalogue_id' => 'required|exists:catalogues,id',
            'type_lunette' => 'required|in:Vue,Soleil,Lentille,Accessoire',
            'fichier'      => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
            'titre'        => 'nullable|string|max:255',
            'description'  => 'nullable|string',
        ]);

        $chemin = $request->file('fichier')->storeAs(
            'public/photos',
            Str::uuid() . '.' . $request->file('fichier')->getClientOriginalExtension()
        );

        $ordre = Photo::where('catalogue_id', $request->catalogue_id)->max('ordre') + 1;

        $photo = Photo::create([
            'catalogue_id' => $request->catalogue_id,
            'type_lunette' => $request->type_lunette,
            'titre'        => $request->titre,
            'description'  => $request->description,
            'fichier'      => $chemin,
            'fichier_url'  => Storage::url($chemin),
            'ordre'        => $ordre,
            'visible'      => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Photo importée avec succès.',
            'photo'   => $photo,
        ], 201);
    }

    public function toggle(Photo $photo): JsonResponse
    {
        $photo->update(['visible' => ! $photo->visible]);

        return response()->json([
            'success' => true,
            'message' => $photo->visible ? 'Photo affichée.' : 'Photo masquée.',
            'photo'   => $photo,
        ]);
    }

    public function destroy(Photo $photo): JsonResponse
    {
        $photo->delete();

        return response()->json([
            'success' => true,
            'message' => 'Photo supprimée avec succès.',
        ]);
    }
}
