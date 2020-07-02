import { createMarker, removeMarker } from "./map_marker";
import { createInfoWindow } from "./map_info_window";
import addDetail from "../web_components/map_result_item";
import { addResultsNav } from "../web_components/map_results_nav";

export const renderMarkers = (pageLocations) => {
    let { pageSize } = window.navState;

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
      if (!!newLocation){
          let locationId = newLocation["id"];
    
          if (!window.markers[locationId]) {
            let infoWindow = createInfoWindow(newLocation)
            let newMarker = createMarker(window.map, newLocation, infoWindow);
            addDetail(newLocation, newMarker, infoWindow);
            window.markers[newMarker.id] = newMarker;
          }
      }
    }

    addResultsNav()
    // for testing: console logs in case markers and details are not deleting properly
    if (markers.length > pageSize) console.log('you got too many markers hombre, whatsup?')
    if (document.getElementsByClassName("map-detail-item").length > pageSize){
      console.log('you got too details chico, whatsup?')
    }
  }