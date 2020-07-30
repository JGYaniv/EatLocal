export default function (linkData) {
    const {facebook, twitter, website, email} = linkData;

    const links = document.createElement("div")
    links.setAttribute("class","links")

    if (facebook){
        let facebookEl = generateLink(facebook, 'frontend/assets/images/icons/facebook.svg')
        if (facebookEl) links.append(facebookEl)
    }

    if (twitter){
        let twitterEl = generateLink(twitter, 'frontend/assets/images/icons/twitter.svg')
        if (twitterEl) links.append(twitterEl)
    }

    if (website){
        let websiteEl = generateLink(website, 'frontend/assets/images/icons/website.svg')
        if (websiteEl) links.append(websiteEl)
    }

    if (email){
        let emailEl = generateLink(email, 'frontend/assets/images/icons/email.svg')
        if (emailEl) links.append(emailEl)
    }

    return links;
}
/*
<object type="image/svg+xml" data="kiwi.svg" class="logo">
    Kiwi Logo <!-- fallback image in CSS -->
</object>
*/
const generateLink = function (linkUrl, imageUrl) {
    console.log(linkUrl)
    if (linkUrl.slice(0,4).toLowerCase() !== "http") return null;
    let icon = document.createElement("img")
    icon.setAttribute("src", imageUrl)
    let link = document.createElement("a")
    link.setAttribute("href", linkUrl)
    link.setAttribute("target","_blank")
    link.append(icon)
    return link;
}
