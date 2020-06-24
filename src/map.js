import mapStyle from './map_style.js'

export function initAutocomplete() {
  var src = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
  var map;

  map = new window.google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(-19.257753, 146.823688),
    zoom: 10,
    mapTypeId: "terrain",
    styles: mapStyle,
    disableDefaultUI: true,
  });

  //sidebar setup
  var kmlLayer = new window.google.maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: map,
  });

  kmlLayer.addListener("click", function (event) {
    var content = event.featureData.infoWindowHtml;
    var testimonial = document.getElementById("capture");
    testimonial.innerHTML = content;
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById("pac-input");
  var searchBox = new window.google.maps.places.SearchBox(input);
  map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", function () {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];

    // For the first place, get the icon, name and location.
    var bounds = new window.google.maps.LatLngBounds();
    var place = places[0]

    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    var icon = {
      url: 'assets/images/carbon-location.svg',
      size: new window.google.maps.Size(71, 71),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(17, 34),
      scaledSize: new window.google.maps.Size(50, 50),
    };

    // Create a marker for each place.
    markers.push(
      new window.google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location,
      })
    );

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
  });
}