var rootURL = "http://localhost/AIT_3_YEAR_Dogs_Project/Dogs_Project/api/dogs";


// -------- document ready -------- //

$(document).ready(function() {
	
	cleanForNewDogBreed();
	
	// Prepare Gallery
	prepareGalleryDogBreed();
	
	
	// -------- CRUD Actions -------- //
	
	// On Click realAllDogBreed
	$(document).on("click", "#btnReadAll", function(){findAllDogBreed();});
	
	// On Click addDogBreed
	$(document).on("click", "#btnAdd", function(){addDogBreed();});
	
	// On Click findDogBreedByBreed
	$(document).on("click", "#btnReadByBreed", function(){checkSearchKeyIsEmpty($('#searchKey').val());});
	
	// On Click findDogBreedById 
	$(document).on("click", "#btnReadById", function(){checkSearchIdIsEmpty($('#searchId').val(), 1);});
	
	// On Click updateDogBreedById
	$(document).on("click", "#btnUpdate", function(){checkSearchIdIsEmpty($('#updateId').val(), 2);});
	
	// On Click deleteDogBreedById
	$(document).on("click", "#btnDelete", function(){checkSearchIdIsEmpty($('#deleteId').val(), 3);});
	
	
	
	// -------- Return Key Pressed -------- //
	
		
	// On Return Key Pressed call checkSearchIdIsEmpty function that will then call findDogBreedById function
	$('#searchId').on("keypress", function(event) {
		
		// Using jQuery $(this) refers to the current element that triggered the event. In this case, it is the input field (#searchId),  
		// where the user is typing the Dog Breed ID to be searched for
		const searchId = $(this).val().trim();
		
		// 13 is the keycode for Enter
		if (event.which === 13) { 
		
			checkSearchIdIsEmpty(searchId);
		}
	});
	
	
	// On Return Key Pressed call checkSearchKeyIsEmpty function that will then call findDogBreedByBreed function
	$('#searchKey').on("keypress", function(event) {
		
		// Using jQuery $(this) refers to the current element that triggered the event. In this case, it is the input field (#searchKey),  
		// where the user is typing the Dog Breed name to be searched for
		const searchKey = $(this).val().trim();
		
		// 13 is the keycode for Enter
		if (event.which === 13) { 
		
			checkSearchKeyIsEmpty(searchKey);
		}
	});
	
	
	// -------- Clean Fields for New Dog data to be insetrted -------- //


	// On Click cleanForNewDogBreed
	$(document).on("click", "#btnNew", function(){cleanForNewDogBreed();});
	
	
});

// --------------------------------------------------------- Ajax CRUD actions --------------------------------------------------------- //



// -------- ALL - findAllDogBreed -------- //
var findAllDogBreed = function () {
    console.log('findAllDogBreed');

    $.ajax({
        type: 'GET',
        url: rootURL,
        dataType: "json",
        success: function (data) {
            renderList(data.dogs);
            initializeGallery(data.dogs);
			
            // Make fields read-only
            $('.form-control').prop('readonly', true);

        },
        error: function (xhr, status, error) {
            console.error('Error:', status, error);
            alert('Failed to load Dog Breeds. Please check the console for details.');
        }
    });
};




// -------- CREATE - addDogBreed -------- //

var addDogBreed = function() {
	
    console.log('addDogBreed');

    // Get the form data as JSON
    var jsonData = formToJson();
    
    // Check if the form jsonData is not null/undefined
    if (!jsonData) {
        console.log("Form validation failed. JSON Not generated.");
        return; 
    }

    // Proceed with the AJAX request if the form is valid
    $.ajax({
        type: 'POST',
        contentType: "application/json",
        url: rootURL,
        dataType: "json",
        data: jsonData,
        success: function(data, textStatus, jqXHR) {
			
            alert('New Dog Breed Created Successfully');
			
			cleanForNewDogBreed();
        },
        error: function(jqXHR, textStatus, errorThrown) {
			
			console.log('addDogBreed error: ' + textStatus);
        }
    });
};





// -------- READ - findDogBreedById -------- //

var findDogBreedById = function(searchId) {
    console.log('findDogBreedById: ' + searchId);

    $.ajax({
        type: 'GET',
        url: rootURL + '/' + searchId,
        dataType: "json",
        success: function(data){
  
			if (data) {
				
	           console.log('Find By Id Successful: ' + data.name);
			   
	           currentDogBreed = data;
	           renderDetails(currentDogBreed);
			   
	       } else {
			
	           console.error('No valid data found for ID: ' + searchId);
	           alert('The Dog Breed with ID ' + searchId + ' was Not found.');
	       }
			
        },
        error: function(xhr, status, error) {
			
            console.error('Error:', status, error);
            alert('Failed to load findDogBreedById ' + searchId + '. Please check the console for details.');
        }
    });
};


// -------- READ - findDogBreedByBreed -------- //

var findDogBreedByBreed = function(searchKey) {
	
    console.log('findDogBreedByBreed: ' + searchKey);

    $.ajax({
        type: 'GET',
        url: rootURL + '/search/' + searchKey,
        dataType: "json",
        success: function(data){
			
			if (data) {		
						
   				console.log('Find By Breed Successful: ' + data.name);
			   
	            currentDogBreed = data;
	            renderDetails(currentDogBreed);
			   
	       } else {
			
	            console.error('No valid data found for Breed: ' + searchKey);
	            alert('The Dog Breed ' + searchKey + ' was Not found.');
	       }
 
        },
        error: function(xhr, status, error) {
            console.error('Error: ', status, error);
            alert('Failed to load findDogBreedByBreed by breed ' + searchKey + '. Please check the console for details.');
        }
    });
};



// -------- UPDATE - updateDogBreedById -------- //

var updateDogBreedById = function(dogId) {
	
    console.log('updateDogBreedById');

    // On update button click, send updated data
    $.ajax({
        type: 'PUT',
        contentType: "application/json",
        url: rootURL + '/' + dogId,
        dataType: "json",
        data: formToJson(),
        success: function(data) {
			
			if (data && data.status === "success") {
							
				if (data.updated) {
					
			        console.log('Dog Breed Updated Successfully for ID: ' + data.id);
			        alert('Dog Breed Updated Successfully for ID: ' + data.id);
					
			        currentDogBreed = data.updated;
			        renderDetails(currentDogBreed);
					
			        cleanForNewDogBreed();
					
			    } else {
					
			        console.log('No changes made to the Dog Breed with ID: ' + data.id);
			        alert('No changes made to the Dog Breed with ID: ' + data.id);
			    }
				
			} else {
				
			    console.error('No Dog Breed found with ID: ' + dogId);
			    alert('No Dog Breed found with ID: ' + dogId);
			}
			
		},
        error: function(jqXHR, textStatus, errorThrown) {
			
			console.log('updateDogBreedById error: ' + textStatus);
            console.log('Error details:', jqXHR);
            console.log('Error message:', errorThrown);
        }
    });
};



// -------- DELETE - deleteDogBreedById -------- //

var deleteDogBreedById = function(dogId) {
	
    console.log('deleteDogBreedById');

    $.ajax({
        type: 'DELETE',
        contentType: "application/json",
        url: rootURL + '/' + dogId,
        success: function(data) {
						
			if(confirm("Are you sure you want to Delete the Dog Breed with ID: " + dogId + "?")) {
													
	            console.log('Dog Breed Deleted Successfully for ID: ' + dogId);
	            alert('Dog Breed Deleted Successfully for ID: ' + dogId);
	
	            currentDogBreed = data;
	            renderDetails(currentDogBreed);
	
	            cleanForNewDogBreed();
			}
			        
        }, error: function(jqXHR, textStatus, errorThrown) {
			
            console.log('deleteDogBreedById error: ' + textStatus);
        }
    });
};





// -------------------------------------------------------- JSON Parse --------------------------------------------------------  //


// -------- renderData -------- //
var renderList = function(dogs) {
	
    var list = dogs;
	
	console.log(dogs);
	
    $('#dogsList li').remove();
	
    $.each(list, function(index, dog) {
		
        $('#dogsList').append('<li>ID: ' + dog.id + ' <br>Breed: ' + dog.breed + '</li>');
		
    });
	
};



// -------- Parse formToJson -------- //
var formToJson = function() {
	
			
	
    // Gather all input fields to check if any is empty
    var fields = [

        { id: '#breed', name: 'Breed' },
        { id: '#size', name: 'Size' },
        { id: '#coat_length', name: 'Coat Length' },
        { id: '#temperament', name: 'Temperament' },
        { id: '#exercise_needs', name: 'Exercise Needs' },
        { id: '#color', name: 'Color' },
        { id: '#grooming_needs', name: 'Grooming Needs' },
        { id: '#trainability', name: 'Trainability' },
        { id: '#compatibility_with_kids', name: 'Compatibility with Kids' },
        { id: '#intelligence', name: 'Intelligence' },
        { id: '#picture', name: 'Picture' },
        { id: '#wikipedia', name: 'Wikipedia' }
		
    ];

    // Check if any field is empty
    for (var i = 0; i < fields.length; i++) {
		
        var field = $(fields[i].id).val();
		
        if (!field || field.trim() === "") {
			
            alert("Please fill out the field " +fields[i].name+ " to be able to proceed with the action.");
			$('#dogId').val('');
            return;
        }
    }
	
	// Return JSON if all fields are filled
	return JSON.stringify({
		
	    "breed": $('#breed').val(),
	    "size": $('#size').val(),
	    "coat_length": $('#coat_length').val(),
	    "temperament": $('#temperament').val(),
	    "exercise_needs": $('#exercise_needs').val(),
	    "color": $('#color').val(),
	    "grooming_needs": $('#grooming_needs').val(),
	    "trainability": $('#trainability').val(),
	    "compatibility_with_kids": $('#compatibility_with_kids').val(),
	    "intelligence": $('#intelligence').val(),
	    "picture": $('#picture').val(),
	    "wikipedia": $('#wikipedia').val()
		
	});		
};



// --------------------------------------------  Render Details and Clean Fields for New Entries -------------------------------------------- //



// -------- renderDetails -------- //

var renderDetails = function(dog){
	
	
	$('#dogId').val(dog.id);
	$('#breed').val(dog.breed);
	$('#size').val(dog.size);
	$('#coat_length').val(dog.coat_length);
	$('#temperament').val(dog.temperament);
	$('#exercise_needs').val(dog.exercise_needs);
	$('#color').val(dog.color);
	$('#grooming_needs').val(dog.grooming_needs);
	$('#trainability').val(dog.trainability);
	$('#compatibility_with_kids').val(dog.compatibility_with_kids);
	$('#intelligence').val(dog.intelligence);
	$('#picture').val(dog.picture);
	$('#wikipedia').val(dog.wikipedia);
};


	
// -------- cleanForNewDogBreed -------- //

var cleanForNewDogBreed = function () {
	
    $('#dogId').val('');
    $('#breed').val('');
    $('#size').val('');
    $('#coat_length').val('');
    $('#temperament').val('');
    $('#exercise_needs').val('');
    $('#color').val('');
    $('#grooming_needs').val('');
    $('#trainability').val('');
    $('#compatibility_with_kids').val('');
    $('#intelligence').val('');
    $('#picture').val('');
    $('#wikipedia').val('');
    $('#searchId').val('');
    $('#searchKey').val('');
    $('#updateId').val('');
    $('#deleteId').val('');
	
};



// --------------------------------------------  Gallery Page Display Functionalities -------------------------------------------- //

   
// -------- Prepararation for Gallery -------- //
var prepareGalleryDogBreed = function () {

$.ajax({
       type: 'GET',
       url: rootURL,
       dataType: "json",
       success: function (data) {
           initializeGallery(data.dogs);
       },
       error: function (xhr, status, error) {
           console.error('Error:', status, error);
           alert('Failed to load dog breeds. Please check the console for details.');
       }
   });  
};



// -------- Initialize Gallery -------- //
var initializeGallery = function (breeds) {
    let currentBreedIndex = 0;

    const displayBreed = function (index) {
        const breed = breeds[index];
        $('#breedName').text(breed.breed);
        $('#wikiLink').html(`<a href="${breed.wikipedia}" target="_blank">${breed.breed} Info</a>`);
        $('#breedImage').attr('src', `pics/${breed.picture}`).removeClass('d-none');
    };

    // Display the first breed
    displayBreed(currentBreedIndex);

    // Navigation Buttons
    $('#prevBreed').off('click').on('click', function () {
		
        if (currentBreedIndex > 0) {
			
            currentBreedIndex--;
            displayBreed(currentBreedIndex);		
        }
    });

    $('#nextBreed').off('click').on('click', function () {
		
        if (currentBreedIndex < breeds.length - 2) {
			
			currentBreedIndex++;
            displayBreed(currentBreedIndex);			
        }
    });
};




// -------------------------------------------- Check if it is Empty: Dog Breed ID or Dog Breed Name -------------------------------------------- //



// -------- checkSearchIdIsEmpty -------- //

var checkSearchIdIsEmpty = function(id, identifier){
	
	if(id == ''){
	
		if(identifier == 1){
					
			alert('Please, Enter an ID Value to Search');
			
		}else if(identifier == 2){
			
			alert('Please, Enter an ID Value to Update');
			
		}else if(identifier == 3){
					
			alert('Please, Enter an ID Value to Delete');
		}
		
	}else{
		
		if(identifier == 1){
			
			findDogBreedById(id);
			
		}else if(identifier == 2){
			
			updateDogBreedById(id);
			
		}else if(identifier == 3){
					
			deleteDogBreedById(id);
		}
		
	}
};


// -------- checkSearchKeyIsEmpty -------- //

var checkSearchKeyIsEmpty = function(searchKey){
	
	if(searchKey == ''){
		
		alert('Please, Enter a Breed Name to Search');
		
	}else{
		
		findDogBreedByBreed(searchKey);
		
	}
};

