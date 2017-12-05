// Initial array of animated series
var giphys = ["Bobs Burger","Family Guy", "Rick and Morty", "Futurama", "American dad", "Bojack Horseman", "The Simpsons", " Adventure Time", "South Park"];

//functoin re-renders the HTML to display the appropriate content
function displayGiphy() {

    $("#giphy-view").empty();

    var giphy = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&limit=9&api_key=dc6zaTOxFJmzC";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {

        
        for (var i = 0; i < response.data[0].images.downsized_medium.url.length; i++) {

            var giphyDiv = $("<div class='newGiphy'>");

            var rating = $("<p id=rating>").html("Rating: " + response.data[i].rating);

            var animate = response.data[i].images.downsized_medium.url;
            var still = response.data[i].images.downsized_still.url;

            var image = $("<img>").attr("src", still);
            image.attr('data-still', still);
            image.attr('data-animate', animate);
            image.attr('data-state', image.data('state') === 'still' ?
                'animate' :
                'still');
            image.addClass("gif");


            giphyDiv.append(rating, image);


            $("#giphy-view").prepend(giphyDiv);
            event.preventDefault();
        }
    });
}

// Function for displaying data
function renderButtons() {

    $("#buttons-view").empty();
    
    // Looping through the array of series
    for (var i = 0; i < giphys.length; i++) {
    
    // Dynamicaly generating buttons for each movie in the array
        var a = $("<button>");
        a.addClass("giphy");
        a.addClass("btn");
        a.attr("data-name", giphys[i]);
        a.text(giphys[i]);

        $("#buttons-view").append(a);
    }
}
//handles events where a series button is clicked
$("#add-giphy").on("click", function(event) {

    event.preventDefault();

    var giphy = $("#giphy-input").val().trim();

    giphys.push(giphy);

    renderButtons();

});

// Adding a click event
$(document).ready(function() {

    renderButtons();
    $("#giphy-input").focus();
    $(document).on("click", ".giphy", displayGiphy);
    $(document).on("click", '.gif', function() {

        var state = $(this).attr("data-state");
        //animate the gifs and put them still 
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});