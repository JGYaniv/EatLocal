// const keys = require('../../config/keysES5')
const axios = require('axios')
const fs = require("fs");
const path = 'assets/data/test.json'

var records = Object.values(JSON.parse(getFile(path).toString()))
processRecords(records)

function processRecords(records){
    Promise.all(
            records.map(record => getCoords(record))
        )
    .then( res =>
        fs.writeFile(
            "./dataconverted.json", 
            JSON.stringify(res), 
            () => console.log("File completed")
        )
    )
}

function getCoords(record){
    const address = [
        record.HQ_ST,
        record.HQ_City,
        record.HQ_State,
        record.HQ_Zip,
    ].join("+");
    return axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAZNRumUBPe3zF3B9zrAm8hsEqOTNEtoWs`
    )
    .then((res) => {
        let coord = res.data.results[0].geometry.location;
        record.x = coord.lng;
        record.y = coord.lat;
        return record
    })
}

function getFile(path){
    let fileData = fs.readFileSync(path)
    return fileData
}
