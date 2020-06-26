import mapStyle from './map_style.js'
import { animateMapZoomTo } from "./utils/map_utils";
import {
  createMarker,
  removeMarker,
  createInfoWindow,
  createPosMarker,
} from "./map_markers";
import updateNav from "./web_components/map_results_nav"
import addDetail from "./web_components/map_result_item"
import * as apiUtil from "./utils/api_utils"

export const initMap = () => {
  //if google maps bootstrap has not finished loading, wait a second
  if (!window.google) setTimeout(console.log("loading..."), 1000);
  

  // instance variables
  var markers = {};
  var posMarker = null;
  var pageNum = 0;
  var pageSize = 10;
  var input = document.getElementById("pac-input");
  var searchBox = new window.google.maps.places.SearchBox(input);
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
  
  // remove marker helper function
  const removeMarker = (marker) => {
    marker.setMap(null)
    document.getElementById(marker.id).remove()
    delete markers[marker.id]
  }

  // event listener that triggers functions which populate map
  map.addListener("bounds_changed", function () {
    let bounds = map.getBounds();
    searchBox.setBounds(bounds);

    // get locations and convert into a pojo based on page size and number
    let locations = bounds ? apiUtil.getNearbyLocations(bounds) : [];
    let pageLocations = {}
    let locationIndex = (pageNum * 10)
    for (let i = locationIndex; i < pageSize + locationIndex; i++){
      pageLocations[locations[i].FMID] = locations[i]
    }   

    // remove markers that are not included in the location list
    let markersArr = Object.values(markers)
    for (let i = 0; i < pageSize; i++) {
      let marker = markersArr[i];
      if (marker){
        if (!pageLocations[marker.id]) removeMarker(marker)
      } 
    }

    // create new markers if they do not already exist
    let pageLocationsArr = Object.values(pageLocations)
    for (let i=0; i<pageSize; i++){
      let newLocation = pageLocationsArr[i]
      let locationId = newLocation["FMID"];

      if (!markers[locationId]) {
        let infoWindow = createInfoWindow(newLocation)
        let newMarker = createMarker(map, newLocation, infoWindow);
        addDetail(newLocation, newMarker, infoWindow);
  
        markers[newMarker.id] = newMarker;
      }
    }

    // console logs in case markers and details are not deleting properly
    if (markers.length > pageSize) console.log('you got too many markers bro, whatsup?')
    if (document.getElementsByClassName("map-detail-item").length > pageSize){
      console.log('you got too details bro, whatsup?')
    }
  });
  

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
      var place = searchBox.getPlaces()[0];
      if (!place) return;
      if (!place.geometry) return;

      // set searchbox text to autocomplete value
      document.getElementById("pac-input").value = place.formatted_address;

      // create new posMarker and update our posMarker "state"
      if (posMarker) posMarker.setMap(null);
      posMarker = createPosMarker(map, place);

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
