import generateDetailView from "./web_components/map_detailed_view";
import {marketIcon, posIcon} from "./map_icons";

// creates marker, adds to map, attaches listeners, returns object
export const createMarker = (map, location, infoWindow) => {
  let marker = new window.google.maps.Marker({
    icon: marketIcon(),
    map: map,
    title: location.MarketName, // need to update once DB entries are standardized
    id: location.FMID,
    position: {
      lat: parseFloat(location.y),
      lng: parseFloat(location.x),
    },
  });

  // add event listeners
  let callbacks = createMarkerCallbacks(infoWindow, marker, location);
  marker.addListener("mouseover", callbacks.mouseover);
  marker.addListener("mouseout", callbacks.mouseout);
  marker.addListener("click", callbacks.click);

  return marker;
};


// create marker callbacks pojo
export const createMarkerCallbacks = (infowindow, marker, location) => ({
  mouseover: () => {
    infowindow.open(map, marker);
    let el = document.getElementById(location.FMID)
    if (el) el.style.backgroundColor = "lightblue";
  },
  mouseout: () => {
    infowindow.close(map, marker);
    let el = document.getElementById(location.FMID)
    if (el) el.style.backgroundColor = "";
  },
  click: () => {
    generateDetailView(location);
  }
})


// creates and returns infowindow object
export const createInfoWindow = (location) => {
  var contentString = `<div class="label"><h2>${location.MarketName}</h2></div>`;
  return new google.maps.InfoWindow({
    content: contentString,
  });
}



// Create a marker for selected location.
export const createPosMarker = (map, place) => {
    return new window.google.maps.Marker({
        map: map,
        icon: posIcon(),
        title: place.name,
        position: place.geometry.location,
    });
};
