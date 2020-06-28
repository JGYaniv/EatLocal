export const posIcon = () =>
  window.google
    ? {
        url: "assets/images/carbon-location.svg",
        size: new window.google.maps.Size(71, 71),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(50, 50),
      }
    : "";

export const marketIcon = () =>
  window.google
    ? {
        url: "assets/images/market-pin.svg",
        size: new window.google.maps.Size(71, 71),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(50, 50),
      }
    : "";
