export default () => {

    let posIconDiv = createKeyItem(
        "assets/images/carbon-location.svg",
        "Searched location",
        "pos"
    )

    let marketIconDiv = createKeyItem(
        "assets/images/market-pin.svg",
        "Farmer's Market",
        "farmersmarket"
    )

    let farmstandIconDiv = createKeyItem(
        "assets/images/farmstand-pin.svg",
        "Farm Stand",
        "farmstand"
    )

    let foodhubIconDiv = createKeyItem(
        "assets/images/foodhub-pin.svg",
        "Food Hub",
        "foodhub"
    )

    let csaIconDiv = createKeyItem(
        "assets/images/csa-pin.svg",
        "CSA Dropoff",
        "csa"
    )

    let key = document.createElement("div")
    key.setAttribute("class", "map-key")
    key.append((document.createElement("h3").textContent = "Map Key"))
    key.append(posIconDiv)
    key.append(marketIconDiv)
    key.append(foodhubIconDiv)
    key.append(farmstandIconDiv)
    key.append(csaIconDiv)
    
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
    div.append(checkbox)
    div.append(icon)
    div.append(title)

    return div;
}