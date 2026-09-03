<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Catalogue;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Créer l'admin
        User::create([
            'name'     => 'Administrateur',
            'email'    => 'admin@emeraudeoptique.com',
            'password' => Hash::make('emeraude2024'),
            'role'     => 'admin',
        ]);

        // Catalogues de démo
        $catalogues = [
            [
                'nom'         => 'Lunettes de Vue',
                'description' => 'Notre sélection de montures pour corriger votre vision avec style.',
                'ordre'       => 1,
            ],
            [
                'nom'         => 'Lunettes Soleil',
                'description' => 'Protection solaire et style à la fois. Verres polarisés, filtres UV400.',
                'ordre'       => 2,
            ],
            [
                'nom'         => 'Lentilles',
                'description' => 'Lentilles de contact quotidiennes, mensuelles et colorées.',
                'ordre'       => 3,
            ],
            [
                'nom'         => 'Accessoires',
                'description' => 'Étuis, chiffons et solutions nettoyantes pour vos équipements.',
                'ordre'       => 4,
            ],
        ];

        foreach ($catalogues as $cat) {
            Catalogue::create($cat);
        }
    }
}
