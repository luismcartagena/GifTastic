// Initial array of gifs
var gifs = ["Dogs", "Cats", "Robots", "Science"];

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {
  var gif = $(this).attr("data-name");

  //javascript, jQuery
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    gif +
    "&api_key=dc6zaTOxFJmzC&limit=10";

  // queryURL.done(function(data) {
  // console.log("success got data", data);
  // });

  // Creates AJAX call for the specific gif button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      // Creates a div to hold the gif
      var gifDiv = $("<div class='gif'>");

      // Storing the rating data
      var rating = results[i].rating;
      console.log(rating);
      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      gifDiv.append(pOne);

      // Creates an element to hold the image
      // Appends the image
      var imgURL = results[i].images.fixed_height.url;
      var image = $("<img>").attr("src", imgURL);

      $("#gifs-view").append(image);

      gifDiv.append(image);

      // Puts the entire gif above the previous gifs.

      // gifDiv.append(ratingDiv, releaseYearDiv, plotDiv...)

      $("#gifs-view").prepend(gifDiv);
    }
  });
}

// Function for displaying gif data
function renderButtons() {
  // Deletes the gifs prior to adding new gifs
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  // Loops through the array of gifs
  for (var i = 0; i < gifs.length; i++) {
    // Then dynamicaly generates buttons for each gif in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of gif to our button
    a.addClass("gif");
    // Added a data-attribute
    a.attr("data-name", gifs[i]);
    // Provided the initial button text
    a.text(gifs[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var gif = $("#gif-input")
    .val()
    .trim();

  // The gif from the textbox is then added to our array
  gifs.push(gif);

  // Calling renderButtons which handles the processing of our gif array
  renderButtons();
});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
