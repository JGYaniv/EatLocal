const marketData = require('../../assets/data/usda_markets.json');
const farmstandData = require('../../assets/data/usda_farmstands.json');
const foodhubData = require('../../assets/data/usda_foodhubs.json');
const csaData = require('../../assets/data/usda_csas.json');

export const getNearbyLocations = (bounds) => {
  let marketDataValues = Object.values(marketData)
  let farmstandDataValues = Object.values(farmstandData)
  let foodhubDataValues = Object.values(foodhubData)
  let csaDataValues = Object.values(csaData)

  let filteredData = Object.values({ 
    ...marketDataValues, 
    ...farmstandDataValues, 
    ...foodhubDataValues, 
    ...csaDataValues
  }).filter((market) => {
    if (!market.id && market.FMID) market.id = market.FMID; 
    if (market.CSA_ID) {
      market.type = "CSA";
    };
    if (market.OF_ID) {
      market.type = "Farmstand";
    };
    if (market.FMID && market.id.slice(0,1) === "5") {
      market.type = "Farmstand";
    };
    if (market.FMID && (market.id.slice(0, 1) === "1" || market.id.slice(0, 1) === "2")) {
      market.type = "Market";
    };

    let upperY = bounds
    return (
      bounds["Za"]["j"] > market.y &&
      bounds["Za"]["i"] < market.y &&
      bounds["Ua"]["j"] > market.x &&
      bounds["Ua"]["i"] < market.x
    );
  });
    
    return filteredData;
};