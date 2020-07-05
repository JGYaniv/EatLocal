import generateDetailView from "./map_detailed_view";

// adds detail div to sidebar
export default (location, marker, infowindow) => {
  let resultItem = document.createElement("div");
  resultItem.setAttribute("id", location.id);
  resultItem.setAttribute("class", "map-detail-item");

  const title = document.createElement("span");
  title.setAttribute("class", "title");
  title.textContent = location.title;

  const times = document.createElement("div");
  times.setAttribute("class", "times");
  if (location.Season1Time){
    let timeArr = location.Season1Time.split(";").filter(el => el.length > 2);
    if (timeArr.length > 2) {
      timeArr.splice(2)
      timeArr.push("View more...")
    }
    timeArr.slice(0,3).forEach(time => {
      let timeEl = document.createElement("p");
      timeEl.textContent = time;
      times.appendChild(timeEl);
    });
  }

  if (location.Available_Months) {
    let months = location.Available_Months.split(";").filter(el => el.length > 2)
    if (months.length > 1){
      times.textContent = `${months[0]} - ${months[months.length - 1]}`;
    } else {
      times.textContent = months[0]
    }
  }

  const address = document.createElement("div");
  address.setAttribute("class", "address");
  const addressText = document.createElement("p");
  let addressArr = []
  if (location.street) addressArr.push(location.street)
  if (location.city) addressArr.push(location.city)
  if (location.state) addressArr.push(location.state)
  if (location.zip && location.zip.length === 5) addressArr.push(location.zip)
  addressText.textContent = addressArr.join(", ");
  address.appendChild(addressText);

  resultItem.appendChild(title);
  resultItem.appendChild(address);
  resultItem.appendChild(times);
  
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
