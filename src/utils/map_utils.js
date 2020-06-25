// https://stackoverflow.com/questions/4752340/how-to-zoom-in-smoothly-on-a-marker-in-google-maps
export function animateMapZoomTo(map, targetZoom) {
  var currentZoom = arguments[2] || map.getZoom();
  
  if (currentZoom != targetZoom) {
    window.google.maps.event.addListenerOnce(map, "zoom_changed", function (event) {
      animateMapZoomTo(
        map,
        targetZoom,
        currentZoom + (targetZoom > currentZoom ? 1 : -1)
      );
    });
    setTimeout(function () {
      map.setZoom(currentZoom);
    }, 80);
  }
}