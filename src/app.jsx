import React, {useState} from "react"

import Map from "./map.jsx"
import SearchBar from "./search_bar.jsx"

export default () => {
    const [map, setMap] = useState({});
    const [markers, setMarkers] = useState({});

    const mapProps = {
      map,
      setMap,
      markers,
      setMarkers
    }

    return (
      <div>
        <SearchBar {...mapProps} />
        <Map
          currentLocation={{ address: "", lat: 41.0082, lng: 28.9784 }}
          {...mapProps}
        />
      </div>
    );
};