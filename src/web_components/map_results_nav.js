export default () => {
    let {pageNum, pageSize, resultNum} = JSON.parse(
        window.localStorage.getItem("navState")
    );

    // text content for nav bar
    let details = document.createElement("div")
    details.setAttribute("class", "nav-details")
    let text = document.createElement("h3")
    text.setAttribute("id", "nav-text")
    text.textContent = `showing results ${(pageNum - 1) * pageSize + 1}-${pageNum * pageSize}`
    details.appendChild(text)

    // arrows for nav bar
    let arrows = document.createElement("div")
    arrows.setAttribute("class", "arrows")

    // left arrow and callback
    let left = document.createElement("img")
    left.src = "assets/images/arrow--left.svg"
    left.addEventListener("click", () => {
        let {pageNum, pageSize, resultNum} = JSON.parse(
        window.localStorage.getItem("navState")
        );

        if ((pageNum - 1) * pageSize < 0) {
            return;
        } else if ((pageNum - 2) * pageSize <= 0) {
            pageNum--;
            right.style.color = "lightgray";
        } else {
            pageNum--;
            right.style.color = "black";
        }

        let newState = {pageNum, pageSize, resultNum};
        window.localStorage.setItem("pageState", newState);
    });
    
    // right arrow and callback
    let right = document.createElement("img")
    right.src = "assets/images/arrow--right.svg"
    right.addEventListener("click", () => {
        console.log("rightening")
        let {pageNum, pageSize, resultNum} = JSON.parse(
            window.localStorage.getItem("navState")
        );

        if ((pageNum + 1) * pageSize > resultNum){
            return;
        } else if ((pageNum + 2) * pageSize > resultNum) {
            pageNum ++
            right.style.color = "lightgray";
        } else {
            pageNum ++
            right.style.color = "black";
        }

        let newState = {pageNum, pageSize, resultNum};
        window.localStorage.setItem("pageState", newState)
    })

    arrows.appendChild(left)
    arrows.appendChild(right)

    let navEl = document.getElementById("pac-nav")
    navEl.innerHTML = "";
    navEl.appendChild(details)
    navEl.appendChild(arrows)
}