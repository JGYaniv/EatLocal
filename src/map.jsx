import React, {useEffect} from 'react'

export default ({
    currentLocation,
    setMap,
    setMarkers,
    markers
}) => {
    useEffect(() => {
        //add script tag element
        if (!window.google){
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD2lbk0VP9MhTdvaBAFOX2wjPOPB7LHUfw&callback=initMap&libraries=places,geometry";
            script.defer = true;
            script.async = true;
    
            document.head.appendChild(script);
        }
    });

    window.initMap = () => {
        const map = new window.google.maps.Map(
            document.getElementById("map"), {
                center: currentLocation,
                zoom: 10,
        });

        const marker = new window.google.maps.Marker({
            position: currentLocation,
            map: map,
            title: "Your location",
        });

        setMap(map)
        setMarkers(Object.assign({}, markers, {userMark: marker}))
    };

    return (
      <div>
        <p value={currentLocation}></p>
        <div style={{ width: 500, height: 500 }} id="map" />
      </div>
    );
}
