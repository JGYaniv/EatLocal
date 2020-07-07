import {renderMarkers} from "./map_markers"
import {getPageLocations} from "../locations"

export const addResultsNav = () => {
  let { pageNum, pageSize, resultNum } = window.navState;

  // text content for nav bar
  let details = document.createElement("div");
  details.setAttribute("class", "nav-details");
  let text = document.createElement("h3");
  text.setAttribute("id", "nav-text");

  let resultMin = resultNum > 0 ? (pageNum - 1) * pageSize + 1 : 0;
  let resultMax = resultNum < pageNum * pageSize ? resultNum : pageNum * pageSize;
  text.textContent = `showing results ${resultMin} - ${resultMax}`;
  details.appendChild(text);

  // arrows for nav bar
  let arrows = document.createElement("div");
  arrows.setAttribute("class", "arrows");

  // left arrow and callback
  let left = document.createElement("img");
  left.style.height = "32px";
  left.style.width = "32px";
  if (pageNum > 1) {
    left.src = "assets/images/arrow--left.svg";
  } else {
    left.src = "assets/images/arrow--left-gray.svg";
  }

  left.addEventListener("click", () => {
    let { pageNum, pageSize, resultNum } = window.navState;

    if ((pageNum - 1) * pageSize <= 0) {
      left.src = "assets/images/arrow--left-gray.svg";
      return;
    } else if ((pageNum - 2) * pageSize <= 0) {
      pageNum--;
      left.src = "assets/images/arrow--left-gray.svg";
    } else {
      pageNum--;
      left.src = "assets/images/arrow--left.svg";
    }

    let newState = { pageNum, pageSize, resultNum };
    window.navState = newState;
    let newPageLocations = getPageLocations(window.map.getBounds());
    renderMarkers(newPageLocations);
    addResultsNav()
  });

  // right arrow and callback
  let right = document.createElement("img");
  right.style.height = "32px";
  right.style.width = "32px";
  if (pageNum * pageSize >= resultNum) {
    right.src = "assets/images/arrow--right-gray.svg";
  } else {
    right.src = "assets/images/arrow--right.svg";
  }

  right.addEventListener("click", () => {
    var { pageNum, pageSize, resultNum } = window.navState;
    if ((pageNum) * pageSize >= resultNum) {
      right.src = "assets/images/arrow--right-gray.svg";
      return;
    } else if ((pageNum + 1) * pageSize >= resultNum) {
      pageNum++;
      right.src = "assets/images/arrow--right-gray.svg";
    } else {
      pageNum++;
      right.src = "assets/images/arrow--right.svg";
    }

    let newState = { pageNum, pageSize, resultNum };
    window.navState = newState;
    let newPageLocations = getPageLocations(window.map.getBounds());
    renderMarkers(newPageLocations);
    addResultsNav()
  });

  arrows.appendChild(left);
  arrows.appendChild(right);

  let navEl = document.getElementById("pac-nav");
  navEl.innerHTML = "";
  navEl.appendChild(details);
  navEl.appendChild(arrows);
};