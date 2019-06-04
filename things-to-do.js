// API KEY: vjqpjjdpsurf7n1tpkyq2w2b7p41ty47
// ENDPOINT: api/20181213/article.json
// limit: &count=10
// LOCATION?: "/location_city=

// OpenCage APIkey: 0a1ff0055a9c47ba9f37c072144bad31

var searchProvider = 'https://api.tomtom.com/search/2';
var lat = '45.512794'; // Portland PDX
var long = '-122.679565'; // Portland PDX
var apiKey = 'K9n7ZVn5UJfCjDSF9plLq4d9oS0bRZ63';
var searchType = 'categorySearch';
var query = 'coffee';
var event = '';
var city = '';
var state = '';
var queryURL  =  `${searchProvider}/${searchType}/${query}.json?key=${apiKey}&lat=${lat}&lon=${long}`;


$(document).ready(function() {

  function get_events(queryURL){

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(tomtom_data) {
      
      // $('#events-section').empty();
      console.log(tomtom_data);
      
  

      for (var i = 0; i < tomtom_data.results.length;i++){
        
        // console.log(tomtom_data.results[i].poi.name);

        var events_div = $('<div>');
        events_div.addClass('card');
        events_div.attr('id', 'event-spot-' + i);
        
        $('#events-section').append(events_div);

        $('#event-spot-' + i).append("<h3>Name: " + response.results[i].poi.name + "</h3>");
        // $('#event-spot-' + i).append("<h4>Phone#: " + response.results[i].display_phone + "</h4>");
        // $('#event-spot-' + i).append("<h4>Budget ($ - $$$$): " + response.results[i].price + "</h4>");
        // $('#event-spot-' + i).append("<h4>Rating: " + response.results[i].rating + "</h4>");
        // $('#event-spot-' + i).append("<h4>Address: " + response.results[i].location.display_address[0] + " , " + response.results[i].location.display_address[1] + "</h4>");
        // $('#event-spot-' + i).append("<h4>Open/Closed: " + response.results[i].is_closed + "</h4>");
      }
    });
  }

      // @GK usually you will make this dynamic!
      get_events(queryURL);
      
  $('#search-button').on('click',function(){

    event = $('#events').val().trim();
    city = $('#city').val().trim();
    state = $('#state').val().trim();
    // var new_url = cors_anywhere_url+triposo_search_url+"location="+cityState+"&term="+event;
    var new_url = "https://www.triposo.com/api/20181213/location.json?countrycode=US&tag_labels=city&fields=id,name,score,country_id,parent_id,snippet&count=10&order_by=-score&account=3OMP060J&token=vjqpjjdpsurf7n1tpkyq2w2b7p41ty47"
    // https://api.yelp.com/v3/businesses/search?location=portland,or&term=mexican

    // console.log(food);
    // console.log(address);
    // console.log(new_url);
    
    get_events(new_url);
    return false;

  });
});