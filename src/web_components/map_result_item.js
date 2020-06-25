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

// class ResultItem extends HTMLElement {
//   constructor(props) {
//     super(props);

//     //create shadow root
//     var shadow = this.attachShadow({ mode: "open" });

//     //create elements
//     var wrapper = document.createElement("div");
//     wrapper.setAttribute("class", "wrapper");

//     const title = document.createElement("span");
//     title.setAttribute("class", "title");

//     const hours = document.createElement("span");
//     hours.setAttribute("class", "hours");

//     //add atributes to elements
//     var titleText = this.getAttribute("data-title");
//     title.textContent = "hello";

//     var hoursText = this.getAttribute("data-hours");
//     hours.textContent = hoursText;

//     //attached elements to shadow dom
//     shadow.appendChild(wrapper);
//     wrapper.appendChild(title);
//     wrapper.appendChild(hours);
//   }

//   connectedCallback(){
//     console.log('connected')
//   }
// }

// export default () => customElements.define("map-result-item", ResultItem);