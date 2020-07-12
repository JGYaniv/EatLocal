const axios = require('axios')
require("dotenv").config();

async function getPlacePicture (queryString) {
    let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
        'query=' + queryString + "&" +
        'key=' + process.env.GOOGLE_API_KEY + "&" +
        'fields=' + "photo"

    return axios.get(url)
    .then(res => {
        var photo_url;
        if (res.data.results[0].photos){
            photo_url = 'https://maps.googleapis.com/maps/api/place/photo?' +
                'photo_reference=' + res.data.results[0].photos[0]["photo_reference"] + "&" +
                'key=' + process.env.GOOGLE_API_KEY + "&" +
                'maxwidth=720' + "&" +
                'maxheight=480'
        }
        return photo_url;
    })
    .catch(e => console.log(e))
}

module.exports = getPlacePicture;