
// Initial array of movies
var movies = ["Blindness", "Children of men", "Dark City", "Ex machina", "Gattaca", "Her", "Mr. Nobody", "Planet Terror", "Soylent Green", "The Lobster", "The Survivalist", "THX 1138"];

//functoin re-renders the HTML to display the appropriate content
function displayMovieInfo(){
	var movie = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "movie" + "&api_key=dc6zaTOxFJmzC";
	//var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
    

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {
        	for (var i = 0; i < response.data[0].images.downsized_medium.url.length; i++) {
		      // Creating a div to hold the movie  	
		      var movieDiv = $("<div class='movie'>"); 
		      // Storing, creating and retrieving    
		      var animate = response.data[i].images.downsized_medium.url;
		      var still = response.data[i].images.downsized_still.url;
		      var pFour = $("<img>").attr("src", poster);
		      movieDiv.append(pFour);
		      // Putting the entire movie above the previous movies
		      $("#gifsDiv").prepend(movieDiv);
		      
			      }
		        });

}
// Function for displaying movie data
function renderButtons() {

	// Deleting the movies prior to adding new movies
    $("#buttons").empty();

     // Looping through the array of movies
	for (var i = 0; i < movies.length; i++) {
		// Dynamicaly generating buttons for each movie in the array
		var a = $("<button>");
		a.addClass("movie");
		a.attr("data-name", movies[i]);
		a.text(movies[i]);
		$("#buttons").prepend(a);
	}
}
//handles events where a movie button is clicked
$("#submitButton").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#inputMovie").val().trim();
    // Adding movie from the textbox to our array
	movies.push(movie);
	// Calling renderButtons which handles the processing of our movie array
	renderButtons();
});
// Adding a click event listener to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovieInfo);


renderButtons();



//added word "movie" to the api    to narrow the search to mostly movies






