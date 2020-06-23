import React, {useEffect, useState} from 'react'

export default ({
    map,
    markers,
}) => {
    const [pacInput, setPacInput] = useState("");

    useEffect(()=> {
        if (window.google){
            // Bind the map's bounds (viewport) property to the autocomplete object,
            // so that the autocomplete requests use the current map bounds for the
            // bounds option in the request.
            let input = document.getElementById('pac-input')
            let searchbox = new window.google.maps.places.SearchBox(input);
            searchbox.setBounds(map.getBounds());

             // Set the data fields to return when the user selects a place.
            // searchbox.setFields([
            //   "address_components",
            //   "geometry",
            //   "icon",
            //   "name",
            // ]);

            searchbox.addListener('place_changed', function() {
                
                var places = searchbox.getPlaces();
                var place = places[0]

                if (places.length == 0) return;

                map.setCenter(place.geometry.location);
                map.setZoom(12);
                
                markers.userMark.setVisible(false);
                markers.userMark.setPosition(place.geometry.location);
                markers.userMark.setVisible(true);

                var address = "";
                if (place.address_components) {
                    address = [
                    (place.address_components[0] &&
                        place.address_components[0].short_name) ||
                        "",
                    (place.address_components[1] &&
                        place.address_components[1].short_name) ||
                        "",
                    (place.address_components[2] &&
                        place.address_components[2].short_name) ||
                        "",
                    ].join(" ");
                }
            })
        }
    })

    return (
      <div id="pac-container">
        <h1>SearchBar</h1>
        <input
          id="pac-input"
          type="text"
          placeholder="enter your location here..."
          value={pacInput}
          onChange={(e) => setPacInput(e.target.value)}
        />
      </div>
    );
}