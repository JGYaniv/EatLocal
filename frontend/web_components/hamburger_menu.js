export default () => {
    let burger = document.createElement("img")
    burger.setAttribute("src", "assets/images/open-menu.svg")
    burger.setAttribute("class", "hamburger")
    // document.getElementById("body").append(burger)

    let search = document.createElement("img")
    search.setAttribute("src", "assets/images/search.svg")
    search.setAttribute("class", "search-icon")
    document.getElementById("body").append(search)
}