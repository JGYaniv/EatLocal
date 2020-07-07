export const addRefreshButton = (searchFunction) => {
    let refreshButton = document.createElement("button");
    refreshButton.textContent = "🔍 Search this area"
    refreshButton.setAttribute("class", "refresh-button")
    refreshButton.style.display = "none";
    
    
    refreshButton.addEventListener("click", () => {
        searchFunction();
        refreshButton.remove();
    })
    
    if (document.getElementsByClassName("refresh-button").length === 0) {
        document.getElementById('map').appendChild(refreshButton)
    }

    setTimeout((() => {
        let el = document.getElementsByClassName("refresh-button")[0];
        if (el) el.style.display = "block"
    }), 200)
}

export const removeRefreshButton = () => {
    let buttons = document.getElementsByClassName("refresh-button");
    for(let i=0; i<buttons.length; i++){
        buttons[i].remove();
    }
    let details = document.getElementById("location-details")
    details.style.display = "none";
    let button = document.getElementsByClassName("close-detailed-view")[0]
    if (button) button.remove();
}

window.removeRefreshButton = removeRefreshButton;