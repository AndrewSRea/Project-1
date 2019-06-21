var apikey = '0a1ff0055a9c47ba9f37c072144bad31';
var placename = '';

var api_url = 'https://api.opencagedata.com/geocode/v1/json'

var request_url = api_url
    + '?q=' + encodeURIComponent(placename)
    + '&key=' + apikey
    + '&language=en'
    + '&pretty=1'

// see full list of required and optional parameters:
// https://opencagedata.com/api#forward

var request = new XMLHttpRequest();
request.open('GET', request_url, true);

request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status == 200){ 
      // Success!
      var data = JSON.parse(request.responseText);
      alert(data.results[0].formatted);

    } else if (request.status <= 500){ 
      // We reached our target server, but it returned an error
                           
      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log(data.status.message);
    } else {
      console.log("server error");
    }
};

request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");        
};

request.send();  // make the request

results.geometry.lat
results.geometry.long

function searchHikingData(artist) {

  // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
  var hikeAPIKey = '200495939-f44a49ad3853a6a476cf74f933ac6797';
  var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + logitude + "&maxDistance=10&key=" + hikeAPIKey;
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Printing the entire object to console
    console.log(response);

    // Constructing HTML containing the artist information
    var hikeName = $("<h1>").text(response.trails.name);
    var hikeImage = $("<img>").attr("src", response.trails.imgSqSmall);
    var hikeSummary = $("<p>").text(response.trails.summary);
    var hikeLength = $("<h2>").text("Trail length: " + response.trails.length);
    var hikeCondition = $("<p>").text(response.trails.conditionDetails);
    var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
    var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

    // Empty the contents of the artist-div, append the new artist content
    $("#hiking-info").empty();
    $("#hiking-info").append(hikeName, hikeImage, hikeSummary, hikeLength, hikeCondition, goToArtist);
  });
}

// Event handler for user clicking the select-artist button
$("#select-artist").on("click", function(event) {
  // Preventing the button from trying to submit the form
  event.preventDefault();
  // Storing the artist name
  var inputArtist = $("#artist-input").val().trim();

  // Running the searchBandsInTown function(passing in the artist as an argument)
  searchHikingData(inputArtist);
});