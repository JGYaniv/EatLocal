const marketData = require('../../assets/data/usda_markets.json')

export const getNearbyLocations = (bounds) => {
    let filteredData = Object.values(marketData).filter((market) => {
        // const bounds = map.getBounds()
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