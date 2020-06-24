export const getNearbyZips = (zip, radius=25) =>
  $.ajax({
    url: `http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=${zip}&country=USA&radius=${radius}&maxRows=20&username=jgyaniv`,
  })
