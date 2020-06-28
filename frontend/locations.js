import * as apiUtil from './utils/api_utils'

export const getPageLocations = (bounds) => {
    // calculates number of results & the index of locations array to slice
    let {pageNum, pageSize} = window.navState;
    let endIdx = pageNum * pageSize;
    let startIdx = (pageNum - 1) * pageSize;

    // get locations and convert into a pojo based on page size and number
    let locations = apiUtil.getNearbyLocations(bounds);
    window.navState.resultNum = locations.length;
    let pageLocations = {};

    for (let i = startIdx; i < endIdx; i++ ) {
      if(locations[i]) pageLocations[locations[i].FMID] = locations[i];
    }

    return pageLocations
}