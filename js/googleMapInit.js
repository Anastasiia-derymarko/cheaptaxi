var map;
var service;
var infoWindow;
var googleGeocoer;






  function initMap() {
    let routeService = new google.maps.DirectionsService(map);
    var mapCenter = new google.maps.LatLng(50.4473889,30.381202000000002);
    var markers = [];

    map = new google.maps.Map(document.getElementById('map'), {
      center: mapCenter,
      zoom: 10,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false
    });

    var rendererOptions = {
      map: map
    }

    let directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    let directionsRequest = {
        origin: null,
        destination: null,
        travelMode: 'DRIVING',
    }
    function creatDirection(position){
      routeService.route(directionsRequest,function(response,status){
         directionsDisplay.setDirections(response);
      })     
    }

    function addMarker(location) {
        var marker = new google.maps.Marker({
          position: location,
          map: map
        });
        markers.push(marker);
    }

    function deleteMarkers() {
     for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

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

      service = new google.maps.places.PlacesService(map);
      // service.findPlaceFromQuery(request, placesStatus);
  
      googleGeocoer = new google.maps.Geocoder;

    function placesStatus(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          console.log(place)
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
//dosnt work defaultBounds 
  var options = {
    bounds: defaultBounds,
    types: ['geocode']
  };

  autocompleteBeginningRoute = new google.maps.places.Autocomplete(beginningRoute, options);
  autocompleteEndRoute = new google.maps.places.Autocomplete(endRoute, options);
  autocompleteBeginningRoute.setFields(['name']);
  autocompleteEndRoute.setFields(['name']);

  autocompleteBeginningRoute.addListener('place_changed', function () {
    let place = autocompleteBeginningRoute.getPlace();
      googleGeocoer.geocode({address:place.name}, function(results, status){
        if (status === 'OK'){
            let resultsLocation = results[0].geometry.location;
            addMarker(resultsLocation);
            directionsRequest.origin = {'lat':resultsLocation.lat(), 'lng':resultsLocation.lng()};

         if (directionsRequest.origin && directionsRequest.destination) {
            deleteMarkers();
            creatDirection(directionsRequest); 
         }
        }
      });
  })

  autocompleteEndRoute.addListener('place_changed', function () {
    let place = autocompleteEndRoute.getPlace();
      googleGeocoer.geocode({address:place.name}, function(results, status){
        if(status === 'OK'){
          let resultsLocation = results[0].geometry.location;
          addMarker(resultsLocation);

         directionsRequest.destination = {'lat':resultsLocation.lat(), 'lng':resultsLocation.lng()}

         if (directionsRequest.origin && directionsRequest.destination) {
           creatDirection(directionsRequest);
           deleteMarkers()
         }
        }
      });
  })
} 



