const marketData = require('../assets/data/usda_markets.json');
const farmstandData = require('../assets/data/usda_farmstands.json');
const foodhubData = require('../assets/data/usda_foodhubs.json');
const csaData = require('../assets/data/usda_csas.json');

export const getNearbyLocations = (bounds) => {
  let filteredData = Object.values({ 
    ...marketData, 
    ...farmstandData, 
    ...foodhubData, 
    ...csaData
  }).filter((market) => {
    return (
      bounds["Za"]["j"] > market.y &&
      bounds["Za"]["i"] < market.y &&
      bounds["Ua"]["j"] > market.x &&
      bounds["Ua"]["i"] < market.x
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
    
  return filteredData;
};


