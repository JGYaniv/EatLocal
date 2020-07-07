export default () => {
    let burger = document.createElement("img")
    burger.setAttribute("src", "assets/images/open-menu.svg")
    burger.setAttribute("class", "hamburger")
    burger.addEventListener("click", openMenu)
    // document.getElementById("body").append(burger)

    let search = document.createElement("img")
    search.setAttribute("src", "assets/images/search.svg")
    search.setAttribute("class", "search-icon")
    document.getElementById("body").append(search)
}

const openMenu = () => {
    let background = document.createElement("div")
    background.setAttribute("id","modal-background")

    let menuModal = document.createElement("div")
    menuModal.setAttribute("id","menu-modal")

    let menuButtons = document.createElement("div")
    menuButtons.setAttribute("class","menu-buttons")

    let aboutButton = document.createElement("button")
    aboutButton.textContent = "About"
    
    let findNearestMarketButton = document.createElement("button")
    findNearestMarketButton.textContent = "Nearby Farmer's Market"
    
    let findNearestCSAButton = document.createElement("button")
    findNearestCSAButton.textContent = "Nearby CSA Dropoff"

    let findNearestFarmstandButton = document.createElement("button")
    findNearestFarmstandButton.textContent = "Nearby Farm Stand"

    let findNearestFoodhubButton = document.createElement("button")
    findNearestFoodhubButton.textContent = "Nearby Food Hub"

    menuButtons.appendChild(aboutButton)
    menuButtons.appendChild(findNearestMarketButton)
    menuButtons.appendChild(findNearestCSAButton)
    menuButtons.appendChild(findNearestFarmstandButton)
    menuButtons.appendChild(findNearestFoodhubButton)
    menuModal.appendChild(menuButtons)

    let body = document.getElementById("body")
    body.appendChild(background)
    body.appendChild(menuModal)
}