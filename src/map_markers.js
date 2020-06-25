import generateDetailView from "./web_components/map_detailed_view";
import addDetail from "./web_components/map_result_item";
import * as apiUtil from "./utils/api_utils";
import {marketIcon, posIcon} from "./map_icons";

//fetches locations, removes old markers and adds new ones
export const updateMarkers = (map, markers) => {
  if (!window.google) return null; //guard for invocation before google maps has bootstrapped

  let bounds = map.getBounds();
  let locations = bounds ? apiUtil.getNearbyLocations(bounds) : [];

  markers.forEach((marker, markIdx) => {
    if (locations.length === 0) markers=[];
    if (!locations.some((location) => location.FMID === marker.id)) {
      let el = document.getElementById(marker.id);
      if (Boolean(el)) {
        el.remove();
      }
      marker.setMap(null);
      markers.splice(markIdx, 1);
    }
  });

  let len = locations.length;
  if (len > 10) {
    len = 10;
    var page = 0;
  }

  for (let i = 0; i < len; i++) {
    const location = locations[i];

    if (!markers.some((marker) => marker.title === location.MarketName)) {
      let marker = new window.google.maps.Marker({
        map: map,
        icon: marketIcon(),
        title: location.MarketName, // need to update once DB entries are standardized
        // label: location.MarketName,
        id: location.FMID,
        position: {
          lat: parseFloat(location.y),
          lng: parseFloat(location.x),
        },
      });

      var contentString = `<div class="label"><h2>${location.MarketName}</h2></div>`;

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      marker.addListener("mouseover", () => {
        infowindow.open(map, marker);
        document.getElementById(marker.id).style.backgroundColor = "lightblue";
      });

      marker.addListener("mouseout", () => {
        infowindow.close(map, marker);
        document.getElementById(marker.id).style.backgroundColor = "";
      });

      marker.addListener("click", () => {
        generateDetailView(location);
      });

      markers.push(marker);
      addDetail(location, marker, infowindow);
    }
  }
};


export const updatePosMarker = (map, place, posMarker) => {
    // if (!window.google) return;

    //remove previous pos marker if it exists
    if (posMarker) {
        console.log(posMarker)
        posMarker.setMap(null)
    } else {console.log(posMarker)}

    // Create a marker for selected location.
    return new window.google.maps.Marker({
        map: map,
        icon: posIcon(),
        title: place.name,
        position: place.geometry.location,
    });
};