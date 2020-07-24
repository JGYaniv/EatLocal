const axios = require('axios')
const getLocations = () => axios.get("api/locations")
const getLocation = (id) => axios.get(`api/locations/${id}`)

export async function getNearbyLocations(bounds){
  const locations = await getLocations()

  let filteredLocations = locations.data.filter((market) => { 
    return (
      bounds["Va"]["j"] > market.y &&
      bounds["Va"]["i"] < market.y &&
      bounds["Za"]["j"] > market.x &&
      bounds["Za"]["i"] < market.x
    );
  }).sort((el1, el2) => {
    let yMid = (bounds["Za"]["j"] + bounds["Za"]["i"])/2
    let xMid = (bounds["Ua"]["j"] + bounds["Ua"]["i"])/2
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
