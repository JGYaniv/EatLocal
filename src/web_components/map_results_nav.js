export default () => {
    let details = document.createElement("div")
    details.setAttribute("class", "nav-details")
    let text = document.createElement("h3")
    text.textContent = "10/10 results"
    details.appendChild(text)

    let arrows = document.createElement("div")
    arrows.setAttribute("class", "arrows")
    let left = document.createElement("img")
    left.src = "assets/images/arrow--left.svg"
    let right = document.createElement("img")
    right.src = "assets/images/arrow--right.svg"
    arrows.appendChild(left)
    arrows.appendChild(right)

    let navEl = document.getElementById("pac-nav")
    navEl.innerHTML = "";
    navEl.appendChild(details)
    navEl.appendChild(arrows)
}