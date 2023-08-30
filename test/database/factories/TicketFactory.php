<?php

namespace Database\Factories;

use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    public function definition(): array
    {
        $issueType = ['Support', 'Bug'];
        $status = ['Pending', 'In Progress', 'On Hold', 'Resolved'];
        return [

            'createdDate' => $this->faker->dateTimeThisYear,
            'summary' => $this->faker->sentence,
            'status' => $this->faker->randomElement($status),
            'issueType' => $this->faker->randomElement($issueType),
            'description' => $this->faker->paragraph,
            'createdBy' => $this->faker->randomNumber(1, true),
            'projectId' => $this->faker->randomNumber(1, true)
        ];
    }
}