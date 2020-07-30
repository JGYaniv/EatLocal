// creates and returns infowindow object
export const createInfoWindow = (location) => {
  var contentString = `<div class="label" ><h2>${location.title}</h2></div>`;
  return new google.maps.InfoWindow({
    content: contentString,
  });
};
