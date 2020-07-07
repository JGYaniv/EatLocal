import axios from 'axios'
import keys from '../../config/keys'

export default (queryString) => {
    console.log('query assembling...')

    let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
        'query=' + queryString +
        'key=' + keys.GOOGLE_API_KEY +
        'fields=' + "photo"
    
    console.log(url)

    return axios.get({
        url: url
    })
    .then(res => {
        let url = 'https://maps.googleapis.com/maps/api/place/photo?' +
            'photo_reference=' + res.photos[0]["photo_reference"] +
            'key=' + keys.GOOGLE_API_KEY +
            'maxwidth=1920' +
            'maxheight=1080'
            
        console.log(url)

        return axios.get({url: url })
    })
    .catch(e => {console.log('caught in axios:');console.log(e)})
}