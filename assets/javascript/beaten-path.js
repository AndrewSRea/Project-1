var latitude;
var longitude;

function openCageRun() {

  var openCageAPIkey = "0a1ff0055a9c47ba9f37c072144bad31";
  var placename = $("#hike-input").val().trim();

  // Querying the OpenCage api for the selected artist, the ?app_id parameter is required, but can equal anything
  var queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + placename + "&key=" + openCageAPIkey + "&language=en&pretty=1";
      
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Printing the entire object to console
    console.log(response);

    // Constructing HTML containing the lat/long information
    latitude = response.results[0].geometry.lat;
    longitude = response.results[0].geometry.lng;
        
    // Querying the Hiking Project api for the selected location (lat/long), the ?app_id parameter is required, but can equal anything
    var hikeAPIKey = "200495939-f44a49ad3853a6a476cf74f933ac6797";
    var corsURL = "https://cors-anywhere.herokuapp.com/";
    var hikeQueryURL = corsURL + "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=10&key=" + hikeAPIKey;

    $.ajax({
      url: hikeQueryURL,
      method: "GET"
    }).then(function(hikeResponse) {

      // Printing the entire object to console
      console.log(hikeResponse);

      for(i = 0; i < hikeResponse.trails.length; i++) {

        // Constructing HTML containing the trail location information
        var hikeName = $("<h1>").text(hikeResponse.trails[i].name);
        var hikeImage = $("<img>").attr("src", hikeResponse.trails[i].imgSqSmall);
        var hikeLength = $("<h4>").text("Trail length: " + hikeResponse.trails[i].length);
        var hikeCondition = $("<p>").text("Current Trail Conditions: " + hikeResponse.trails[i].conditionStatus + ": " + hikeResponse.trails[i].conditionDetails);
        var hikeSummary = $("<p>").text(hikeResponse.trails[i].summary);

        // Empty the contents of the "hiking info" div, append the new hiking trail content
        // $("#hiking-info").empty();
        $("#hiking-info").append(hikeName, hikeImage, hikeSummary, hikeLength, hikeCondition);
      };
          
    });
  });
}

// Event handler for user clicking the location button
$("#select-location").on("click", function(event) {
  // Preventing the button from trying to submit the form
  event.preventDefault();

  // Running the openCageRun function(passing in the location as an argument)
  openCageRun();
});