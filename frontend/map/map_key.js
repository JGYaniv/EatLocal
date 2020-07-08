export default () => {

    let posIconDiv = createKeyItem(
        "frontend/assets/images/carbon-location.svg",
        "Searched location",
        "pos"
    )

    let marketIconDiv = createKeyItem(
        "frontend/assets/images/market-pin.svg",
        "Farmer's Market",
        "farmersmarket"
    )

    let farmstandIconDiv = createKeyItem(
        "frontend/assets/images/farmstand-pin.svg",
        "Farm Stand",
        "farmstand"
    )

    let foodhubIconDiv = createKeyItem(
        "frontend/assets/images/foodhub-pin.svg",
        "Food Hub",
        "foodhub"
    )

    let csaIconDiv = createKeyItem(
        "frontend/assets/images/csa-pin.svg",
        "CSA Dropoff",
        "csa"
    )

    let hideRevealButton = document.createElement("button");
    hideRevealButton.setAttribute("class","hide-reveal-key")
    hideRevealButton.textContent = "+";

    let key = document.createElement("div")
    key.setAttribute("class", "map-key")
    let keyTitle = document.createElement("h3")
    keyTitle.textContent = "Map Key"
    keyTitle.setAttribute("class", "key-title")
    let keyContent = document.createElement("div")
    keyContent.setAttribute("class","key-content")
    keyContent.style.display = "none";

    key.append(keyTitle)
    key.append(hideRevealButton)
    keyContent.appendChild(posIconDiv)
    keyContent.appendChild(marketIconDiv)
    keyContent.appendChild(foodhubIconDiv)
    keyContent.appendChild(farmstandIconDiv)
    keyContent.appendChild(csaIconDiv)
    key.append(keyContent)

    hideRevealButton.addEventListener("click", () => {
        if (hideRevealButton.textContent === "+"){
            keyContent.style.display = "block"
            key.style.height = "275px"
            hideRevealButton.textContent = "-"
        } else {
            keyContent.style.display = "none"
            key.style.height = "auto"
            hideRevealButton.textContent = "+"
        }

    })
    
    document.getElementById("body").appendChild(key)
}

const createKeyItem = (url, text, id) => {
    let checkbox = document.createElement("input")
    checkbox.setAttribute("type","checkbox")
    checkbox.setAttribute("id", id)
    checkbox.setAttribute("checked",true)

    let title = document.createElement("p")
    title.setAttribute("class", `key-label`)
    title.textContent = text;

    let icon = document.createElement("img")
    icon.setAttribute("src", url)

    let div = document.createElement("div")
    // div.append(checkbox)
    div.append(icon)
    div.append(title)

    return div;
}