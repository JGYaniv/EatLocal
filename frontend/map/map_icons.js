export const posIcon = () =>
  window.google
    ? {
        url: "frontend/assets/images/carbon-location.svg",
        size: new window.google.maps.Size(50, 70),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(50, 50),
      }
    : "";

export const marketIcon = () =>
  window.google
    ? {
        url: "frontend/assets/images/market-pin.svg",
        size: new window.google.maps.Size(50, 70),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(50, 50),
      }
    : "";

export const farmstandIcon = () =>
  window.google
    ? {
        url: "frontend/assets/images/farmstand-pin.svg",
        size: new window.google.maps.Size(50, 70),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(50, 50),
      }
    : "";

export const foodhubIcon = () =>
  window.google
    ? {
      url: "frontend/assets/images/foodhub-pin.svg",
        size: new window.google.maps.Size(50, 70),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(50, 50),
      }
    : "";

export const csaIcon = () =>
  window.google
    ? {
        url: "frontend/assets/images/csa-pin.svg",
        size: new window.google.maps.Size(50, 70),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(50, 50),
      }
    : "";
