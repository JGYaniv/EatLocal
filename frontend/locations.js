import * as apiUtil from './utils/api_utils'

export async function getPageLocations(bounds){
    // calculates number of results & the index of locations array to slice
    let {pageNum, pageSize} = window.navState;
    let endIdx = pageNum * pageSize;
    let startIdx = (pageNum - 1) * pageSize;

    // get locations and convert into a pojo based on page size and number
    console.log(bounds, "!!!!")
    let locations = await apiUtil.getNearbyLocations(bounds);
    
    window.navState.resultNum = locations.length;
    let pageLocations = {};

    for (let i = startIdx; i < endIdx; i++ ) {
      if(locations[i]) pageLocations[locations[i].id] = locations[i];
    }

    return pageLocations
}