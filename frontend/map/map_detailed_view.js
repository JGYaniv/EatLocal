import {getLocationDetails} from '../utils/api_utils'
import generateLinkIcons from './map_detailed_links'

export async function generateDetailView(location) {
  const locationQuery = await getLocationDetails(location.id)
  const locationDetails = await locationQuery[0];
  locationDetails.details = await JSON.parse(locationDetails.data);
  addDetailedView(locationDetails);
}

const addDetailedView = (location) => {
  const backButton = document.createElement("button");
  backButton.innerText = "back to results";
  backButton.addEventListener("click", (e) => {
    e.preventDefault;
    document.getElementById("location-details").style.display = "none";
    backButton.remove();
  });
  backButton.setAttribute("class","close-detailed-view")
  document.getElementById("body").append(backButton);

  const banner = document.createElement("div");
  banner.setAttribute("class", "details-banner");
  if (location.photoUrl){
    banner.style.backgroundImage = `url(${location.photoUrl})`;
  } else {
    banner.style.backgroundImage = "url('frontend/assets/images/image-placeholder.png')";
  }
  banner.style.backgroundPosition = "center";
  banner.style.backgroundSize = "cover"
  banner.style.height = "350px";
  banner.style.width = "100%";

  const header = document.createElement("div");
  header.setAttribute("class", "details-header");
  const headerText = document.createElement("h1");
  headerText.textContent = location.title;
  header.appendChild(headerText);

  const details = document.createElement("div");
  details.setAttribute("class", "details-list");

  const address = document.createElement("div");
  address.setAttribute("class", "address");
  const addressIcon = document.createElement("img");
  addressIcon.src = "frontend/assets/images/location.svg";
  const addressText = document.createElement("p");
  let addressArr = []
  if (location.street) addressArr.push(location.street)
  if (location.city) addressArr.push(location.city)
  if (location.state) addressArr.push(location.state)
  if (location.zip && location.zip.length === 5) addressArr.push(location.zip)
  addressText.textContent = addressArr.join(", ");
  address.appendChild(addressIcon);
  address.appendChild(addressText);


  const times = document.createElement("span");
  times.setAttribute("class","detailed-times")
  const timesIcon = document.createElement("img");
  timesIcon.src = "frontend/assets/images/time.svg";

  const timesList = document.createElement("div")

  if (location.Season1Time) {
    times.appendChild(timesIcon);
    const timesList = document.createElement("div")
    let timeArr = location.Season1Time.split(";").filter(el => el.length > 2);
    timeArr.forEach(time => {
      let timeEl = document.createElement("p");
      timeEl.textContent = time;
      timesList.appendChild(timeEl);
    });
    times.append(timesList)
  }

  if (location.Available_Months) {
    times.appendChild(timesIcon);
    let months = location.Available_Months.split(";").filter(el => el.length > 2)
    let monthList = document.createElement("p")
    if (months.length > 1) {
      monthList.textContent = `${months[0]} - ${months[months.length - 1]}`;
    } else {
      monthList.textContent = months[0]
    }
    timesList.append(monthList);
    times.append(timesList)
  }

  const locationType = document.createElement("h3");
  locationType.textContent = location.type;
  switch(location.type){
    case "csa": 
      locationType.style.color = "#f1d600";
      locationType.textContent = "CSA Association";
      break;
    case "market": 
      locationType.style.color = "#35acff"; 
      locationType.textContent="Farmer's Market";
      break;
    case "farmstand": 
    locationType.style.color = "#00ee3e";
    locationType.textContent = "Farm Stand";
    break;
    case "foodhub": 
      locationType.style.color = "#a839ff";
      locationType.textContent = "Food Hub";
      break;
  }

  let linkIcons = generateLinkIcons(location.details)
  details.append(linkIcons)

  details.appendChild(locationType);
  details.appendChild(address);
  details.appendChild(times);

  let detailsWrapper = document.getElementById("location-details");
  detailsWrapper.innerHTML = "";
  detailsWrapper.append(banner);
  detailsWrapper.append(header);
  detailsWrapper.append(details);
  detailsWrapper.style.display = "block";
};
