import { initMap } from "./map.js";
import keys from './config/keys.js';

if (!window.google) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${keys.googleApiKey}&libraries=places,geometry`;
  script.defer = true;
  script.async = true;

  document.head.appendChild(script);
}

const ensureMapsLoaded = () => {
  if (!window.google) {
    setTimeout(ensureMapsLoaded, 1000);
  } else {
    initMap();
  }
};

document.addEventListener("DOMContentLoaded", ensureMapsLoaded);