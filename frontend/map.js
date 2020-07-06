import mapStyle from './map/map_style.js'
import { animateMapZoomTo } from "./utils/map_utils";
import { createPosMarker } from "./map/map_marker";
import { renderMarkers } from './map/map_markers';
import { getPageLocations } from './locations'
import { addResultsNav } from "./web_components/map_results_nav";
import {addRefreshButton, removeRefreshButton} from "./web_components/map_refresh_button"
// import addMapKey from './map/map_key'
import addSearchbarIcons from './web_components/hamburger_menu'

export const initMap = () => {
  // set marker state
  window.markers = {};
  window.posMarker = null;

  // set nav state
  const initNavState = {
    pageNum: 1,
    pageSize: 10,
    resultNum: 0,
  };
  window.navState = initNavState;
  addResultsNav();

  addSearchbarIcons();

  // config google map API
  var input = document.getElementById("pac-input");
  const searchBox = new window.google.maps.places.SearchBox(input);
  window.map = new window.google.maps.Map(document.getElementById("map"), {
    center: new window.google.maps.LatLng(40.39, -96.91),
    zoom: 5,
    mapTypeId: "roadmap",
    styles: mapStyle,
    disableDefaultUI: true,
  });

  // move starting pos to users's geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      window.map.panTo(pos);
      animateMapZoomTo(window.map, 10);
    });
  }

  // callback for searching map based on bounds
  const searchBounds = () => {
    let bounds = window.map.getBounds(); // get current map bounds
    searchBox.setBounds(bounds); // update searchBox bias

    // get a pages worth of locations and render them as markers
    let pageLocations = getPageLocations(bounds);
    renderMarkers(pageLocations);

    // reset the page numbers and re-render the nav bar
    window.navState.pageNum = 1;
    addResultsNav();
    removeRefreshButton();
  }
  
  addMapKey(searchBounds);

  var fresh = 0;
  // event listener that triggers functions which populate map
  window.map.addListener("bounds_changed", () => {
    if (fresh > 0) addRefreshButton(searchBounds)
    fresh++
  });
  
  // event listener for when the map loads all tiles ONLY the first time! (keep for reference)
  // window.google.maps.event.addListenerOnce(window.map, "tilesloaded", () => {
  //   searchBounds();
  // })

  window.map.addListener("zoom_changed", () => {
    setTimeout(searchBounds,100);
  })

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    // select first PAC result
    var place = searchBox.getPlaces()[0];
    if (!place) return;
    if (!place.geometry) return;

    // set searchbox text to autocomplete value
    let pacInput = document.getElementById("pac-input");
    pacInput.value = place.formatted_address;
    pacInput.setAttribute("placeholder","enter your location")

    // create new posMarker and update our posMarker "state"
    if (window.posMarker) window.posMarker.setMap(null);
    posMarker = createPosMarker(window.map, place);

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
    window.map.fitBounds(bounds);
  });
};
