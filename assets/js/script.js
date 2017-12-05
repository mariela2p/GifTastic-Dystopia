var giphys = ["Bobs Burger","Family Guy", "Rick and Morty", "Futurama", "American dad", "Bojack Horseman", "The Simpsons", " Adventure Time", "South Park"];

function displayGiphy() {

    $("#giphy-view").empty();

    var giphy = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&limit=9&api_key=dc6zaTOxFJmzC";

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

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < giphys.length; i++) {

        var a = $("<button>");

        a.addClass("giphy");
        a.addClass("btn");
        a.attr("data-name", giphys[i]);
        a.text(giphys[i]);

        $("#buttons-view").append(a);
    }
}

$("#add-giphy").on("click", function(event) {

    event.preventDefault();

    var giphy = $("#giphy-input").val().trim();

    giphys.push(giphy);

    renderButtons();

});


$(document).ready(function() {

    renderButtons();
    $("#giphy-input").focus();
    $(document).on("click", ".giphy", displayGiphy);
    $(document).on("click", '.gif', function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});