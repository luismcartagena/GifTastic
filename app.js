// Initial array of movies
var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

  var movie = $(this).attr("data-name");
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Creates a div to hold the movie
    var movie = $("<div>");
    // Retrieves the Rating Data
    var ratingDiv = $("<div>");
    // Creates an element to have the rating displayed
    ratingDiv.text(response.Rated);
    // Displays the rating
    $("#movies-view").append(ratingDiv);
    // Retrieves the release year
    var releaseYearDiv = $("<div>");
    // Creates an element to hold the release year
    releaseYearDiv.text(response.Year);
    // Displays the release year
    $("#movies-view").append(releaseYearDiv);
    // Retrieves the plot
    var plotDiv = $("<div>");
    // Creates an element to hold the plot
    plotDiv.text(response.Plot);
    // Appends the plot
    $("#movies-view").append(plotDiv);
    // var plotDiv = $("<div>").text(response.Plot);
    // Creates an element to hold the image
    var imageDiv = $("<img>")
    // Appends the image
    imageDiv.attr("src", response.Poster);
    $("#movies-view").append(imageDiv);
    // Puts the entire Movie above the previous movies.
      
    // movieDiv.append(ratingDiv, releaseYearDiv, plotDiv...)  

    $("movie-view").prepend(movieDiv);
  });

}

// Function for displaying movie data
function renderButtons() {

  // Deletes the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  // Loops through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of movie to our button
    a.addClass("movie");
    // Added a data-attribute
    a.attr("data-name", movies[i]);
    // Provided the initial button text
    a.text(movies[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where the add movie button is clicked
$("#add-movie").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var movie = $("#movie-input").val().trim();

  // The movie from the textbox is then added to our array
  movies.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
