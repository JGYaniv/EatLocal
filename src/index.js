import { initMap, initAutocomplete } from "./map.js";
import keys from '../config/keys'

if (!window.google) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${keys.googleApiKey}&libraries=places,geometry`;
  script.defer = true;
  script.async = true;

  document.head.appendChild(script);
  console.log("head appended")
}

document.addEventListener("DOMContentLoaded", ()=>{
  setTimeout(initAutocomplete, 500);
})