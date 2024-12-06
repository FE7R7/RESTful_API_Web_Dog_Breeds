<?php

// ------------------------------- Get All Function --------------------------------- //
function getAllDogs(){
    
    if (isset($_GET['sort'])) {

        $id = $_GET['sort'];
    } else {
        $id = "id";
    }

    $query = "SELECT * FROM dog_breeds ORDER BY " . "$id";

    try {

        global $db;

        $dogs = $db->query($query);
        $dogs = $dogs->fetchAll(PDO::FETCH_ASSOC);

        header("Content-Type: application/json", true);
        

        echo '{"dogs": ' . json_encode($dogs) . '}';
    } catch (PDOException $e) {

        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

// -------------------------------- Get By Id Function -------------------------------- //
function getDogById($id){
    
    $query = "SELECT * FROM dog_breeds WHERE id = '$id'";

    try {

        global $db;

        $dogs = $db->query($query);
        $dog = $dogs->fetch(PDO::FETCH_ASSOC);

        header("Content-Type: application/json", true);

        echo json_encode($dog);
    } catch (PDOException $e) {

        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

// --------------------------------- Get By Breed Function -------------------------------- //
function getDogByBreed($breed){
    
    $query = "SELECT * FROM dog_breeds WHERE UPPER(breed) LIKE " . '"%' . $breed . '%"' . " ORDER BY breed";

    try {

        global $db;

        $dogs = $db->query($query);
        $dog = $dogs->fetch(PDO::FETCH_ASSOC);

        header("Content-Type: application/json", true);

        echo json_encode($dog);
    } catch (PDOException $e) {

        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

// --------------------------------- (Post) Add Function -------------------------------- //
function addDog(){
    
    global $app;

    $request = $app->request();

    $dog = json_decode($request->getBody());

    $breed = $dog->breed;
    $size = $dog->size;
    $coat_length = $dog->coat_length;
    $temperament = $dog->temperament;
    $exercise_needs = $dog->exercise_needs;
    $color = $dog->color;
    $grooming_needs = $dog->grooming_needs;
    $trainability = $dog->trainability;
    $compatibility_with_kids = $dog->compatibility_with_kids;
    $intelligence = $dog->intelligence;
    $picture = $dog->picture;
    $wikipedia = $dog->wikipedia;

    $query = "INSERT INTO dog_breeds (breed, size, coat_length, temperament, exercise_needs, color, grooming_needs, trainability, compatibility_with_kids, intelligence, picture, wikipedia) VALUES ('$breed', '$size', '$coat_length', '$temperament', '$exercise_needs', '$color', '$grooming_needs', '$trainability', '$compatibility_with_kids', '$intelligence', '$picture', '$wikipedia')";

    try {

        global $db;
        $db->exec($query);

        $dog->id = $db->lastInsertId();

        echo json_encode($dog);
    } catch (PDOException $e) {

        echo '"error":{"text":' . $e->getMessage() . '}';
    }
}

// --------------------------------- (Put) Update Function -------------------------------- //
function updateDog($id){
    
    global $app;
    
    $request = $app->request();
    $dog = json_decode($request->getBody());
    
    $breed = $dog->breed;
    $size = $dog->size;
    $coat_length = $dog->coat_length;
    $temperament = $dog->temperament;
    $exercise_needs = $dog->exercise_needs;
    $color = $dog->color;
    $grooming_needs = $dog->grooming_needs;
    $trainability = $dog->trainability;
    $compatibility_with_kids = $dog->compatibility_with_kids;
    $intelligence = $dog->intelligence;
    $picture = $dog->picture;
    $wikipedia = $dog->wikipedia;
    
    // Check if the ID exists in the database
    global $db;
    
    $query = "SELECT * FROM dog_breeds WHERE id = '$id'";
    $result = $db->query($query);
    
    if ($result->rowCount() == 0) {
        
        echo json_encode([
            
            "status" => "error",
        ]);
        
        exit;  // Exit early, don't execute the update query
    }
    
    // ID exists, so proceed with the update query
    $query = "UPDATE dog_breeds SET breed='$breed', size='$size', coat_length='$coat_length', temperament='$temperament',
    exercise_needs='$exercise_needs', color='$color', grooming_needs='$grooming_needs', trainability='$trainability',
    compatibility_with_kids='$compatibility_with_kids', intelligence='$intelligence', picture='$picture', wikipedia='$wikipedia'
    WHERE id='$id'";
    
    
    try {

        $affectedRows = $db->exec($query);
        
        // If rows are affected, meaning the update was successful), return a success response
        if ($affectedRows > 0) {
            
            echo json_encode([
                "status" => "success",
                "id" => $id,
                "updated" => true  // Indicate that the update was successful
            ]);
            
        } else {
            
            echo json_encode([
                "status" => "success",  // No actual changes but still a valid success response
                "id" => $id,
                "updated" => false // Indicate NO update was needed
            ]);
            
        }
        
    } catch (PDOException $e) {
        
        // Catch any database exceptions and return the error message
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}


// --------------------------------- (Delete) Delete Function -------------------------------- //
function deleteDog($id){
    
    global $db;

    // Proceed with deletion
    $query = "DELETE FROM dog_breeds WHERE id = '$id'";
    
    try {
        $affectedRows = $db->exec($query);
        
        // Check if any rows were affected (deletion was successful)
        if ($affectedRows > 0) {
            echo json_encode([ "deleted" => true]);
            
        } else {
            echo json_encode([ "deleted" => false]);
        }
        
    } catch (PDOException $e) {     
        echo '{"error":{"text":' . $e->getMessage() . '}}';
        
    }
}

?>