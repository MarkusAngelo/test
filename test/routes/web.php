<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('/authenticate', 'AuthController@authenticate');

$router->group(['prefix' => 'ticket'], function () use ($router) {
    $router->get('/project', 'ProjectController@index');
    $router->get('/user', 'UserController@index');
    $router->get('/project/{projectId}/tickets', 'TicketController@getByProject');
    $router->post('/project/add', 'ProjectController@store');
    $router->post('create', 'TicketController@createIssue');
    $router->put('/project/{projectId}', 'ProjectController@update');
    $router->delete('/project/{projectId}', 'ProjectController@destroy');
    $router->group(['prefix' => '/{projectId}/tickets'], function () use ($router) {
        $router->get('/', 'TicketController@index');
        $router->post('/add', 'TicketController@store');
        $router->put('/{tickId}', 'TicketController@update');
        $router->delete('/{tickId}', 'TicketController@destroy');

    });
});