import mapStyle from './map_style.js'
import { animateMapZoomTo } from "./utils/map_utils";
import { createMarker, createInfoWindow, createPosMarker } from "./map_markers";
import addDetail from "./web_components/map_result_item"
import addResultsNav from "./web_components/map_results_nav"
import * as apiUtil from "./utils/api_utils"

export const initMap = () => {
  //if google maps has not loaded, wait a second, then another, then another
  if (!window.google) setTimeout(console.log("loading..."), 1000);
  if (!window.google) setTimeout(console.log("loading..."), 1000);
  if (!window.google) setTimeout(console.log("loading..."), 1000);

  // set marker state
  window.markers = {};
  window.posMarker = null;

  // set nav state
  let initNavState = { 
    pageNum: 1, 
    pageSize: 10,
    resultNum: 0, 
  };
  window.localStorage.setItem("navState", JSON.stringify(initNavState));

  // config google map API
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

    // update markers state
    delete window.markers[marker.id]
  }

  // event listener that triggers functions which populate map
  map.addListener("bounds_changed", function () {
    let bounds = map.getBounds(); // get current map bounds
    searchBox.setBounds(bounds); // set searchbox bias

    // get locations and convert into a pojo based on page size and number
    let locations = bounds ? apiUtil.getNearbyLocations(bounds) : [];
    window.localStorage.setItem("resultNum", locations.length)
    let pageLocations = {}

    // calculates number of results & the index of locations array to slice
    let {pageNum, pageSize} = JSON.parse(window.localStorage.getItem("navState"))
    let endIdx = pageNum * pageSize;
    let startIdx = (pageNum - 1) * pageSize

    // create an object from the selected 
    for (let i = startIdx; i < endIdx; i++) {
      pageLocations[locations[i].FMID] = locations[i];
    }

    // remove markers that are not included in the location list
    let markersArr = Object.values(window.markers)
    for (let i = 0; i < pageSize; i++) {
      let marker = markersArr[i];
      if (marker){
        if (!pageLocations[marker.id]) removeMarker(marker)
      } 
    }

    // creates new markers if a given location does not already exist in the markers object
    let pageLocationsArr = Object.values(pageLocations)
    for (let i=0; i<pageSize; i++){
      let newLocation = pageLocationsArr[i]
      let locationId = newLocation["FMID"];

      if (!window.markers[locationId]) {
        let infoWindow = createInfoWindow(newLocation)
        let newMarker = createMarker(map, newLocation, infoWindow);
        addDetail(newLocation, newMarker, infoWindow);
        addResultsNav();
        window.markers[newMarker.id] = newMarker;
      }
    }

    // for testing: console logs in case markers and details are not deleting properly
    if (markers.length > pageSize) console.log('you got too many markers hombre, whatsup?')
    if (document.getElementsByClassName("map-detail-item").length > pageSize){
      console.log('you got too details chico, whatsup?')
    }
  });
  

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
      // select first PAC result
      var place = searchBox.getPlaces()[0];
      if (!place) return;
      if (!place.geometry) return;

      // set searchbox text to autocomplete value
      document.getElementById("pac-input").value = place.formatted_address;

      // create new posMarker and update our posMarker "state"
      if (window.posMarker) window.posMarker.setMap(null);
      posMarker = createPosMarker(map, place);

      // set map bounds to new location
      var bounds = new window.google.maps.LatLngBounds();

      // set bounds object based on place geometry
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      
      // set map bounds to updated bounds obj
      map.fitBounds(bounds);
    }
  );
  
}
