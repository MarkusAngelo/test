<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;



class AuthController extends Controller
{

    public function authenticate(Request $request)
    {

        $client = new Client();

        $endpoint = 'http://127.0.0.1:8000';

        $username = 'email@gmail.com';
        $password = '12345678';


        $data = [
            'key' => 'value'
        ];

        // Send POST request with Basic Authentication header and request body
        $response = $client->post($endpoint, [
            'auth' => [$username, $password],
            'json' => $data, // Include request body data as JSON
        ]);

        // Get the response body
        $responseBody = $response->getBody()->getContents();

        // Do something with the response data
        echo $responseBody;
    }
}