const axios = require('axios')
const getLocations = () => axios.get("api/locations")
const getLocation = (id) => axios.get(`api/locations/${id}`)

export async function getNearbyLocations(bounds){
  const locations = await getLocations()
  // if (!bounds) {console.log("no bounds"); return null}
  let {south, west, north, east} = bounds.toJSON()
  window.bounds = {south, west, north, east}
  let filteredLocations = locations.data.filter((market) => {
    return (
      north > market.y &&
      south < market.y &&
      east > market.x &&
      west < market.x
    );
  }).sort((el1, el2) => {
    let yMid = (north + south)/2
    let xMid = (east + west)/2
    return ((
      Math.abs(el1.x - xMid) + Math.abs(el1.y - yMid)
      ) - (
        Math.abs(el2.x - xMid) + Math.abs(el2.y - yMid)
    ))
  });
  
  return filteredLocations;
};

export async function getLocationDetails(id){
  const location = await getLocation(id)
  return await location.data;
}
