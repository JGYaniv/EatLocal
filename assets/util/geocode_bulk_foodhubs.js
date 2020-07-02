require('dotenv').config()
const axios = require('axios')
const fs = require("fs");
const path = "assets/data/usda_foodhubs.json";
const output = "./assets/util/usda_foodhubs.json"

var records = Object.values(JSON.parse(getFile(path).toString()))
processRecords(records)

function getFile(path) {
  let fileData = fs.readFileSync(path);
  return fileData;
}

function processRecords(records){
    Promise.all(
        records.map(record => getCoords(record))
    )
    .then( res => {
        let newRecords = {}
        res.forEach(record => {
            if (record){
                record.id = record.FMID;
                newRecords[record.FMID] = record;
            }
        })
        return newRecords
    })
    .then( res =>
        fs.writeFile(
            output, 
            JSON.stringify(res), 
            () => console.log("File completed")
        )
    )
    .catch(e => console.log(e))
}

async function getCoords(record){
    const address = [
        record.Location_ST,
        record.Location_City,
        record.Location_State,
        record.Location_Zip,
    ].join("+");
    return await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
    )
    .then(
        (res) => {
            if (record && res.data.results[0]){
                let coord = res.data.results[0].geometry.location;
                record.x = coord.lng;
                record.y = coord.lat;
                return record
            }
        }
    )
}

