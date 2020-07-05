export const addRefreshButton = (searchFunction) => {
    console.log("adding")
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
    console.log("removing")

    let buttons = document.getElementsByClassName("refresh-button");
    for(let i=0; i<buttons.length; i++){
        buttons[i].remove();
    }
}

window.removeRefreshButton = removeRefreshButton;