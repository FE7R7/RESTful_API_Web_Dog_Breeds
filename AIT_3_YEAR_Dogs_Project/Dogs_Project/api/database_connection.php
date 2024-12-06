<?php
$dsn = 'mysql:host=localhost;dbname=Dogs_Project';
// $dsn = 'mysql:host=localhost:3306;dbname=WebDev3_2024';

$username = 'root';

$password = '';

try {

    $db = new PDO($dsn, $username, $password);

} catch (PDOException $e) {

    $error_message = $e->getMessage();

    echo '<p>Not Connected -> ' . $error_message . '</p>';
}

?>