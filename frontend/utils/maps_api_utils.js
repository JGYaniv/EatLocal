import axios from 'axios'
import keys from '../../config/keys'

export default (queryString) => {
    let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
        'query=' + queryString + "&" +
        'key=' + keys.googleApiKey + "&" +
        'fields=' + "photo"

    return axios.get(url)
    .then(res => {
        let url = 'https://maps.googleapis.com/maps/api/place/photo?' +
            'photo_reference=' + res.data.results[0].photos[0]["photo_reference"] + "&" +
            'key=' + keys.googleApiKey + "&" +
            'maxwidth=720' + "&" +
            'maxheight=480'
            
        return url
    })
    .catch(e => console.log(e))
}