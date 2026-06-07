<?php

namespace Database\Seeders;

use App\Models\LinkWpp;
use App\Models\Banner;
use App\Models\MyHistory;
use App\Models\Course;
use App\Models\Content;
use App\Models\User;
use App\Models\CompanyInformation;
use App\Models\MoreInformation;
use App\Models\Price;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        LinkWpp::factory(1)->create();
        Banner::factory(1)->create();
        Price::factory(1)->create();
        
        Course::factory(1)->create();
        Content::factory(3)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $user->assignPermission('admin');

        CompanyInformation::factory(1)->create();
        MoreInformation::factory(1)->create();
    }
}
