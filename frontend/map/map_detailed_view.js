import getPlacePicture from '../utils/maps_api_utils'

export default (location) => {
  console.log("fetching details")
  let queryString = location.city + location.state
  getPlacePicture(queryString)
  .then(res => {
    window.locationPhoto = res;
    addDetailedView(location)
  })
  .catch(err => {
    console.log(err)
    addDetailedView(location)
  })
}

const addDetailedView = location => {
// export default location => {
  const backButton = document.createElement("button");
  backButton.innerText = "X";
  backButton.addEventListener("click", (e) => {
    e.preventDefault;
    document.getElementById("location-details").style.display = "none";
  });

  const banner = document.createElement("div");
  banner.setAttribute("class", "details-banner");
  banner.style.backgroundImage = "url('assets/images/image-placeholder.png')";
  banner.style.backgroundPosition = "center";
  banner.style.height = "400px";
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
  addressIcon.src = "assets/images/location.svg";
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
  timesIcon.src = "assets/images/time.svg";

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

  details.appendChild(address);
  details.appendChild(times);

  let detailsWrapper = document.getElementById("location-details");
  detailsWrapper.innerHTML = "";
  detailsWrapper.append(backButton);
  detailsWrapper.append(banner);
  detailsWrapper.append(header);
  detailsWrapper.append(details);
  detailsWrapper.style.display = "block";
};