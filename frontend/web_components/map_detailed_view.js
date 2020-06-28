export default (location) => {
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
  headerText.textContent = location.MarketName;
  header.appendChild(headerText);

  const details = document.createElement("div");
  details.setAttribute("class", "details-list");

  const address = document.createElement("div");
  address.setAttribute("class", "address");
  const addressIcon = document.createElement("img");
  addressIcon.src = "assets/images/location.svg";
  const addressText = document.createElement("p");
  addressText.textContent = [
    location.street,
    location.city,
    location.State,
    location.zip,
  ].join(", ");
  address.appendChild(addressIcon);
  address.appendChild(addressText);

  let dates;
  if (location.Season1Date) {
    dates = document.createElement("div");
    dates.setAttribute("class", "dates");
    const datesIcon = document.createElement("img");
    datesIcon.src = "assets/images/calendar.svg";
    const datesText = document.createElement("p");
    datesText.textContent = location.Season1Date;
    dates.appendChild(datesIcon);
    dates.appendChild(datesText);
  }

  if (location.Season1Time) {
    const times = document.createElement("div");
    times.setAttribute("class", "times");
    const timesIcon = document.createElement("img");
    timesIcon.src = "assets/images/time.svg";
    const timesText = document.createElement("p");
    timesText.textContent = location.Season1Time;
    times.appendChild(timesIcon);
    times.appendChild(timesText);
  }

  details.appendChild(address);
  if (location.Season1Date) details.appendChild(dates);
  if (location.timesText) details.appendChild(times);

  let detailsWrapper = document.getElementById("location-details");
  detailsWrapper.innerHTML = "";
  detailsWrapper.append(backButton);
  detailsWrapper.append(banner);
  detailsWrapper.append(header);
  detailsWrapper.append(details);
  detailsWrapper.style.display = "block";
};
