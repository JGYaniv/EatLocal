import mapStyle from './map_style.js'
import { animateMapZoomTo } from "./utils/map_utils";
import { updateMarkers, updatePosMarker } from "./map_markers";
import updateNav from "./web_components/map_results_nav"

export const initMap = () => {
  if (!window.google) return;


  // instance variables
  var markers = [];
  var posMarker = null;

  var map = new window.google.maps.Map(document.getElementById("map"), {
    center: new window.google.maps.LatLng(39, -101),
    zoom: 5,
    mapTypeId: "roadmap",
    styles: mapStyle,
    disableDefaultUI: true,
  });


  // move starting pos to users's geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.panTo(pos)
      animateMapZoomTo(map, 10);
    })
  }


  /////////// google maps API searchbox setup /////////////

  var input = document.getElementById("pac-input");
  var searchBox = new window.google.maps.places.SearchBox(input);
  
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", function () {
    updateMarkers(map, markers);
    updateNav();
    let bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
      var place = searchBox.getPlaces()[0];
      if (!place) return;
      if (!place.geometry) return;

      //set searchbox text to autocomplete value
      document.getElementById("pac-input").value = place.formatted_address;

      // create new posMarker and update our posMarker "state"
      posMarker = updatePosMarker(map, place, posMarker)

      // set map bounds to new location
      var bounds = new window.google.maps.LatLngBounds();

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

      map.fitBounds(bounds);
    }
  );
}
