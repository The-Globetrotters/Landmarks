<!DOCTYPE html>
<html>
  <head>
    <style>
      #map {
        height: 400px;
        width: 100%;
       }
    </style>
  </head>
  <body>
    <h3>My Google Maps Demo</h3>
    <div id="map"></div>
    <script>
      const gmaps = require('/gmaps');
      function initMap() {
        var marker =""
        var locations = gmaps.getLandmarks();
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: {lat: 51.4968, lng: -115.9281}
        });

  for (var i =0; i < locations.length; i++){
  marker = new google.maps.Marker({
    position: locations[i],
    map: map
    })
  }
}
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGT9DtN2cOFyQW8CY5GD7cHYbeWsBoox8&callback=initMap">
    </script>
  </body>
</html>
