var lat;
var long;
        
function geocodeCityQuery(query){
    $.ajax({
        url: 'https://api.opencagedata.com/geocode/v1/json',
        method: 'GET',
        data: {
            'key': '0a1ff0055a9c47ba9f37c072144bad31',
            'q': query,
            'language': 'en',
            'no_annotations': 1
            // see other optional params:
            // https://opencagedata.com/api#forward-opt
        },
        dataType: 'json',
        statusCode: {
            200: function(response){  // success
                console.log(response);
                // lat =  ( response.results[0].bounds.northeast.lat - response.results[0].bounds.southwest.lat ) / 2;
                // long =  ( response.results[0].bounds.northeast.lng - response.results[0].bounds.southwest.lng ) / 2; 
                lat  = response.results[0].geometry.lat;
                long = response.results[0].geometry.lng;
                document.write('lat - ' + lat + '// long - '+ long);
                        
            },
            402: function(){
                console.log('hit free-trial daily limit');
                console.log('become a customer: https://opencagedata.com/pricing');
            }
            // other possible response codes:
            // https://opencagedata.com/api#codes
        }
    });

}

$(document).ready(function(){
    geocodeCityQuery('Portland, OR'); // 'Portland, OR, USA'
    // console should now show:
});