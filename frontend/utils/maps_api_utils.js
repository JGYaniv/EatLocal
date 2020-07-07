import axios from 'axios'
import keys from '../../config/keys'

export default (queryString) => {
    let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
        'query=' + queryString + "&" +
        'key=' + keys.googleApiKey + "&" +
        'fields=' + "photo"

    return axios.get(url)
    .then(res => {
        console.log(res)
        let url = 'https://maps.googleapis.com/maps/api/place/photo?' +
            'photo_reference=' + res.data.results[0].photos[0]["photo_reference"] + "&" +
            'key=' + keys.googleApiKey + "&" +
            'maxwidth=1920' + "&" +
            'maxheight=1080'
            
        return url
    })
    .catch(e => {console.log('caught in axios:');console.log(e)})
}