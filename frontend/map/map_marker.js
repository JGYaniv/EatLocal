import {generateDetailView} from "./map_detailed_view";
import {
  marketIcon,
  farmstandIcon,
  foodhubIcon,
  csaIcon,
  posIcon
} from "./map_icons";

// remove marker helper function
export const removeMarker = (marker) => {
  marker.setMap(null);
  document.getElementById(marker.id).remove();
  delete window.markers[marker.id]; // update markers state
};

// creates marker, adds to map, attaches listeners, returns object
export const createMarker = (map, location, infoWindow) => {
  let icon;
  switch (location.type){
    case 'csa': icon = csaIcon();break;
    case 'foodhub': icon = foodhubIcon();break;
    case 'farmstand': icon = farmstandIcon();break;
    case 'market': icon = marketIcon();break;
    default: icon = marketIcon();break;
  }

  let marker = new window.google.maps.Marker({
    icon: icon,
    map: map,
    title: location.title, // need to update once DB entries are standardized
    id: location.id,
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

// helper function for creating marker callbacks pojo
export const createMarkerCallbacks = (infowindow, marker, location) => ({
  mouseover: () => {
    infowindow.open(map, marker);
    let el = document.getElementById(location.id)
    if (el) el.style.backgroundColor = "lightblue";
  },
  mouseout: () => {
    infowindow.close(map, marker);
    let el = document.getElementById(location.id)
    if (el) el.style.backgroundColor = "";
  },
  click: () => {
    generateDetailView(location);
  }
})

// Create a marker for selected location.
export const createPosMarker = (map, place) => {
    return new window.google.maps.Marker({
        map: map,
        icon: posIcon(),
        title: place.name,
        position: place.geometry.location,
    });
};
