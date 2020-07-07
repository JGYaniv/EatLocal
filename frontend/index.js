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

// const ensureLoad = () => {
//   if (!window.google) {
//     setTimeout(() => {
//       document.addEventListener("DOMContentLoaded", () => {
//         if (!window.google) {
//           ensureLoad();
//         } else {
//           initMap();
//         };
//       })
//     }, 1000);
//   } else {
//     initMap();
//   };
// }

// ensureLoad();

document.addEventListener("DOMContentLoaded", ()=>{
    if (!window.google) {
      setTimeout(initMap, 1000);
    } else {
      initMap();
    };
})