var map;
var service;
var infoWindow;
var googleGeocoer;

function createMarker(position) {

    new google.maps.Marker({
        position: position,
        map: map
    });
}

  function initMap() {
    var mapCenter = new google.maps.LatLng(50.4473889,30.381202000000002);

    map = new google.maps.Map(document.getElementById('map'), {
      center: mapCenter,
      zoom: 10
    });

    

    // Try geolocation.
    // infoWindow = new google.maps.InfoWindow;
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     var pos = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };
    //     infoWindow.setPosition(pos);
    //     infoWindow.setContent('Location found.');
    //     infoWindow.open(map);
    //     map.setCenter(pos);
    //   }, function() {
    //     handleLocationError(true, infoWindow, map.getCenter());
    //   });
    // } else {
    //   // Browser doesn't support Geolocation
    //   handleLocationError(false, infoWindow, map.getCenter());
    // }

    // var request = {
    //   query: 'улица Анатолия Петрицкого, 10, Киев',
    //   fields: ['formatted_address', 'name'],
    //   };

    //   service = new google.maps.places.PlacesService(map);
    //   service.findPlaceFromQuery(request, placesStatus);
  
    //   googleGeocoer = new google.maps.Geocoder;

    function placesStatus(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
            googleGeocoer.geocode({address:place.formatted_address}, function(e){
               createMarker(e[0].geometry.location);
            });
          
        }   
      }
  }

  let beginningRoute = document.getElementById('js-beginning-route'),
      endRoute = document.getElementById('js-end-route');

  var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(50.45466, 30.5238));    

  var options = {
    bounds: defaultBounds,
    types: ['geocode']
  };

  autocomplete = new google.maps.places.Autocomplete(beginningRoute, options);
  autocomplete.setFields(['place_id']);

  autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace();
    console.log(place)
  })

} 



