import generateDetailView from "./map_detailed_view";

// adds detail div to sidebar
export default (location, marker, infowindow) => {
  let resultItem = document.createElement("div");
  resultItem.setAttribute("id", location.FMID);
  resultItem.setAttribute("class", "map-detail-item");

  const title = document.createElement("span");
  title.setAttribute("class", "title");
  title.textContent = location.MarketName;

  const time = document.createElement("span");
  time.setAttribute("class", "time");
  time.textContent = location.Season1Time.split(";").join("\n");

  const date = document.createElement("span");
  date.setAttribute("class", "date");
  date.textContent = location.Season1Date;

  resultItem.appendChild(title);
  resultItem.appendChild(date);
  resultItem.appendChild(time);
  
  resultItem.addEventListener("click", () => {
    generateDetailView(location);
  });
  
  resultItem.addEventListener("mouseover", () => {
    infowindow.open(map, marker);
  });
  
  resultItem.addEventListener("mouseout", () => {
    infowindow.close(map, marker);
  });
  
  let container = document.getElementById("capture");
  container.appendChild(resultItem);
};
