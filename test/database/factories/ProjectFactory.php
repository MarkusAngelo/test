<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        $projects = [
            "CMS for Web Developers' Blogs",
            "E-commerce Platform for Tools",
            "Collaborative Coding Platform",
            "Interactive Web Dev Learning",
            "E-learning Platform for Web Dev",
            "Recorded at Lake Pond Studios",
            "You're On Your Own Kid",
            "I Forgot That You Existed",
            "New Kidz on the Block"
        ];
        return [
            'title' => $this->faker->randomElement($projects),
            'startDate' => $this->faker->dateTimeThisYear,
            'endDate' => $this->faker->dateTimeThisYear('+1 year'),
            'goal' => $this->faker->paragraph,
            'key' => $this->faker->word
        ];
    }
}