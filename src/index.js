import { initMap } from "./map.js";
import keys from '../config/keys.js';

if (!window.google) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${keys.googleApiKey}&libraries=places,geometry`;
  script.defer = true;
  script.async = true;

  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", ()=>{
  setTimeout(initMap, 500);
})