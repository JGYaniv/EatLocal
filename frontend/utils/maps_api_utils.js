import axios from 'axios'
import keys from '../../config/keys'

export default (queryString) => (
    axios.get({
        url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
            'query=' + queryString +
            'key=' + keys.GOOGLE_API_KEY +
            'fields=' + "photo"
    })
    .then(res => axios.get({
        url: 'https://maps.googleapis.com/maps/api/place/photo?' +
            'photo_reference=' + res.photos[0]["photo_reference"] +
            'key=' + keys.GOOGLE_API_KEY +
            'maxwidth=1920' +
            'maxheight=1080'
    }))
    .catch(e => console.log(e))
)