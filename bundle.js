/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/keys.js":
/*!************************!*\
  !*** ./config/keys.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  googleApiKey: \"AIzaSyAZNRumUBPe3zF3B9zrAm8hsEqOTNEtoWs\"\n});\n\n//# sourceURL=webpack:///./config/keys.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ \"./src/map.js\");\n/* harmony import */ var _config_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/keys */ \"./config/keys.js\");\n\n\n\nif (!window.google) {\n  var script = document.createElement(\"script\");\n  script.type = \"text/javascript\";\n  script.src = \"https://maps.googleapis.com/maps/api/js?key=\".concat(_config_keys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].googleApiKey, \"&libraries=places,geometry\");\n  script.defer = true;\n  script.async = true;\n  document.head.appendChild(script);\n  console.log(\"head appended\");\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  setTimeout(_map_js__WEBPACK_IMPORTED_MODULE_0__[\"initAutocomplete\"], 500);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! exports provided: initAutocomplete */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initAutocomplete\", function() { return initAutocomplete; });\n/* harmony import */ var _map_style_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map_style.js */ \"./src/map_style.js\");\n\nfunction initAutocomplete() {\n  var src = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';\n  var map;\n  map = new window.google.maps.Map(document.getElementById(\"map\"), {\n    center: new google.maps.LatLng(-19.257753, 146.823688),\n    zoom: 10,\n    mapTypeId: \"terrain\",\n    styles: _map_style_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    disableDefaultUI: true\n  }); //sidebar setup\n\n  var kmlLayer = new window.google.maps.KmlLayer(src, {\n    suppressInfoWindows: true,\n    preserveViewport: false,\n    map: map\n  });\n  kmlLayer.addListener(\"click\", function (event) {\n    var content = event.featureData.infoWindowHtml;\n    var testimonial = document.getElementById(\"capture\");\n    testimonial.innerHTML = content;\n  }); // Create the search box and link it to the UI element.\n\n  var input = document.getElementById(\"pac-input\");\n  var searchBox = new window.google.maps.places.SearchBox(input);\n  map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input); // Bias the SearchBox results towards current map's viewport.\n\n  map.addListener(\"bounds_changed\", function () {\n    searchBox.setBounds(map.getBounds());\n  });\n  var markers = []; // Listen for the event fired when the user selects a prediction and retrieve\n  // more details for that place.\n\n  searchBox.addListener(\"places_changed\", function () {\n    var places = searchBox.getPlaces();\n\n    if (places.length == 0) {\n      return;\n    } // Clear out the old markers.\n\n\n    markers.forEach(function (marker) {\n      marker.setMap(null);\n    });\n    markers = []; // For the first place, get the icon, name and location.\n\n    var bounds = new window.google.maps.LatLngBounds();\n    var place = places[0];\n\n    if (!place.geometry) {\n      console.log(\"Returned place contains no geometry\");\n      return;\n    }\n\n    var icon = {\n      url: 'assets/images/carbon-location.svg',\n      size: new window.google.maps.Size(71, 71),\n      origin: new window.google.maps.Point(0, 0),\n      anchor: new window.google.maps.Point(17, 34),\n      scaledSize: new window.google.maps.Size(50, 50)\n    }; // Create a marker for each place.\n\n    markers.push(new window.google.maps.Marker({\n      map: map,\n      icon: icon,\n      title: place.name,\n      position: place.geometry.location\n    }));\n\n    if (place.geometry.viewport) {\n      // Only geocodes have viewport.\n      bounds.union(place.geometry.viewport);\n    } else {\n      bounds.extend(place.geometry.location);\n    }\n\n    map.fitBounds(bounds);\n  });\n}\n\n//# sourceURL=webpack:///./src/map.js?");

/***/ }),

/***/ "./src/map_style.js":
/*!**************************!*\
  !*** ./src/map_style.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//wy theme from https://snazzymaps.com/style/8097/wy\n/* harmony default export */ __webpack_exports__[\"default\"] = ([{\n  \"featureType\": \"all\",\n  \"elementType\": \"geometry.fill\",\n  \"stylers\": [{\n    \"weight\": \"2.00\"\n  }]\n}, {\n  \"featureType\": \"all\",\n  \"elementType\": \"geometry.stroke\",\n  \"stylers\": [{\n    \"color\": \"#9c9c9c\"\n  }]\n}, {\n  \"featureType\": \"all\",\n  \"elementType\": \"labels.text\",\n  \"stylers\": [{\n    \"visibility\": \"on\"\n  }]\n}, {\n  \"featureType\": \"landscape\",\n  \"elementType\": \"all\",\n  \"stylers\": [{\n    \"color\": \"#f2f2f2\"\n  }]\n}, {\n  \"featureType\": \"landscape\",\n  \"elementType\": \"geometry.fill\",\n  \"stylers\": [{\n    \"color\": \"#ffffff\"\n  }]\n}, {\n  \"featureType\": \"landscape.man_made\",\n  \"elementType\": \"geometry.fill\",\n  \"stylers\": [{\n    \"color\": \"#ffffff\"\n  }]\n}, {\n  \"featureType\": \"poi\",\n  \"elementType\": \"all\",\n  \"stylers\": [{\n    \"visibility\": \"off\"\n  }]\n}, {\n  \"featureType\": \"road\",\n  \"elementType\": \"all\",\n  \"stylers\": [{\n    \"saturation\": -100\n  }, {\n    \"lightness\": 45\n  }]\n}, {\n  \"featureType\": \"road\",\n  \"elementType\": \"geometry.fill\",\n  \"stylers\": [{\n    \"color\": \"#eeeeee\"\n  }]\n}, {\n  \"featureType\": \"road\",\n  \"elementType\": \"labels.text.fill\",\n  \"stylers\": [{\n    \"color\": \"#7b7b7b\"\n  }]\n}, {\n  \"featureType\": \"road\",\n  \"elementType\": \"labels.text.stroke\",\n  \"stylers\": [{\n    \"color\": \"#ffffff\"\n  }]\n}, {\n  \"featureType\": \"road.highway\",\n  \"elementType\": \"all\",\n  \"stylers\": [{\n    \"visibility\": \"simplified\"\n  }]\n}, {\n  \"featureType\": \"road.arterial\",\n  \"elementType\": \"labels.icon\",\n  \"stylers\": [{\n    \"visibility\": \"off\"\n  }]\n}, {\n  \"featureType\": \"transit\",\n  \"elementType\": \"all\",\n  \"stylers\": [{\n    \"visibility\": \"off\"\n  }]\n}, {\n  \"featureType\": \"water\",\n  \"elementType\": \"all\",\n  \"stylers\": [{\n    \"color\": \"#46bcec\"\n  }, {\n    \"visibility\": \"on\"\n  }]\n}, {\n  \"featureType\": \"water\",\n  \"elementType\": \"geometry.fill\",\n  \"stylers\": [{\n    \"color\": \"#c8d7d4\"\n  }]\n}, {\n  \"featureType\": \"water\",\n  \"elementType\": \"labels.text.fill\",\n  \"stylers\": [{\n    \"color\": \"#070707\"\n  }]\n}, {\n  \"featureType\": \"water\",\n  \"elementType\": \"labels.text.stroke\",\n  \"stylers\": [{\n    \"color\": \"#ffffff\"\n  }]\n}]);\n\n//# sourceURL=webpack:///./src/map_style.js?");

/***/ })

/******/ });