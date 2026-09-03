<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Catalogue;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CatalogueController extends Controller
{
    public function index(): JsonResponse
    {
        $catalogues = Catalogue::orderBy('ordre')
            ->withCount('photos')
            ->get();

        return response()->json([
            'success'    => true,
            'catalogues' => $catalogues,
        ]);
    }

    public function public(): JsonResponse
    {
        $catalogues = Catalogue::actif()
            ->orderBy('ordre')
            ->with(['photos' => function ($q) {
                $q->where('visible', true)->orderBy('ordre');
            }])
            ->get();

        return response()->json([
            'success'    => true,
            'catalogues' => $catalogues,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nom'         => 'required|string|max:255',
            'description' => 'nullable|string',
            'ordre'       => 'nullable|integer',
        ]);

        $data['ordre'] = $data['ordre'] ?? Catalogue::max('ordre') + 1;
        $catalogue = Catalogue::create($data);

        return response()->json([
            'success'   => true,
            'message'   => 'Catalogue créé avec succès.',
            'catalogue' => $catalogue,
        ], 201);
    }

    public function show(Catalogue $catalogue): JsonResponse
    {
        $catalogue->load(['photos' => function ($q) {
            $q->orderBy('ordre');
        }]);

        return response()->json([
            'success'   => true,
            'catalogue' => $catalogue,
        ]);
    }

    public function update(Request $request, Catalogue $catalogue): JsonResponse
    {
        $data = $request->validate([
            'nom'         => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'ordre'       => 'nullable|integer',
            'actif'       => 'nullable|boolean',
        ]);

        $catalogue->update($data);

        return response()->json([
            'success'   => true,
            'message'   => 'Catalogue modifié avec succès.',
            'catalogue' => $catalogue,
        ]);
    }

    public function destroy(Catalogue $catalogue): JsonResponse
    {
        foreach ($catalogue->photos as $photo) {
            $photo->delete();
        }
        $catalogue->delete();

        return response()->json([
            'success' => true,
            'message' => 'Catalogue supprimé avec succès.',
        ]);
    }
}
