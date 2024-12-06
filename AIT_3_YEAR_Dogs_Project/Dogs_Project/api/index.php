<?php

require 'Slim/Slim.php';
require 'dogs_database_actions.php';
require 'database_connection.php';

use Slim\Slim;
\Slim\Slim::registerAutoloader();


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    
    http_response_code(204);
    exit;
}

$app = new Slim();

// -------------------- Get Routes -------------------- //

$app->get('/dogs', 'getAllDogs');

$app->get('/dogs/:id', 'getDogById');

$app->get('/dogs/search/:query', 'getDogByBreed');

// -------------------- Post,Update(Put8), Delete Routes -------------------- //

$app->post('/dogs', 'addDog');

$app->put('/dogs/:id', 'updateDog');

$app->delete('/dogs/:id', 'deleteDog');

// -------------------- // -------------------- //

$app->run();

?>