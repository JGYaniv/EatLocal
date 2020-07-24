const axios = require('axios')
const getLocations = () => axios.get("api/locations")
const getLocation = (id) => axios.get(`api/locations/${id}`)

export async function getNearbyLocations(bounds){
  const locations = await getLocations()
  // if (!bounds) {console.log("no bounds"); return null}
  let filteredLocations = locations.data.filter((market) => {
    return (
      bounds["Za"]["j"] > market.y &&
      bounds["Za"]["i"] < market.y &&
      bounds["Va"]["j"] > market.x &&
      bounds["Va"]["i"] < market.x
    );
  }).sort((el1, el2) => {
    let yMid = (bounds["Za"]["j"] + bounds["Za"]["i"])/2
    let xMid = (bounds["Va"]["j"] + bounds["Va"]["i"])/2
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
