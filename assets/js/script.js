
// Initial array of gifs
      var gifButtons = [];
      // displaygifInfo function re-renders the HTML to display the appropriate content
     
      function displayGifInfo() {
      	$("<div class='col-lg-4 images>").empty();
      	var gif = $(this).attr("data-name");
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q="' + gif +'"&api_key=dc6zaTOxFJmzC&fmt=JSON&limit=3"';
        // Creating an AJAX call for the specific gif button being clicked
        console.log(queryURL);
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          var results = response.data;

          for (i=0; i < response.data.length; i++) {
          // Creating a div to hold the gif
          var gifDiv = $("<div class='col-lg-4 images'>");
    
          // Retrieving the URL for the image
          var imgURLStill = response.data[i].images.fixed_height_still.url;
          var imgURLAnimated = response.data[i].images.fixed_height.url;
          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURLStill);
          // Appending the image
  			console.log(imgURLStill);
          gifDiv.append(image).addClass("gifDiv");
          image.addClass("gif").attr("data-still", imgURLStill).attr("data-animate", imgURLAnimated).attr("data-state", "still");
          // Putting the entire gif above the previous gifs
          $("#imageArea").prepend(gifDiv);
        };
      })
  }
      // Function for displaying gif data
      function renderButtons() {
        // Deleting the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttonArea").empty();
        // Looping through the array of gifs
        for (var i = 0; i < gifButtons.length; i++) {
          // Then dynamicaly generating buttons for each gif in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of gif to our button
          a.addClass("btn btn-info btn-block buttons");
          // Adding a data-attribute
          a.attr("data-name", gifButtons[i]);
          // Providing the initial button text
          a.text(gifButtons[i]);
          // Adding the button to the buttons-view div
          $("#buttonArea").append(a);
        }
      }
      // This function handles events where a gif button is clicked
      $("#add-button").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gifCategory = $("#newButton").val().trim();
        // Adding gif from the textbox to our array
        gifButtons.push(gifCategory);
        console.log(gifButtons);
        $("#newButton").val("");
        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
      });

      $(".gif").on("click", function() {
      	alert("you clicked an image");
		var state = $(this).attr("data-state") ;     // =============================================
      console.log(state);
      if (state==="still") {
        var animate = $(this).attr("data-animate");
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
      }
      else {
        var still = $(this).attr("data-still");
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
      }
     });
      // Adding a click event listener to all elements with a class of "gif"
      $(document).on("click", ".buttons", displayGifInfo);
      // Calling the renderButtons function to display the intial buttons
