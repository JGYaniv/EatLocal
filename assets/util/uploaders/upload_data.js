const pgp = require("pg-promise")({
  /* initialization options */
  capSQL: true, // capitalize all generated SQL
});
require("dotenv").config();

const data = require('../../data/usda_markets.json'); //json data file location
const tableName = "locations"

//for local development, make sure your .env file specifies the type as "dev"
var db;
if (process.env.TYPE == "dev") {
  db = pgp(process.env.LOCAL_DATABASE_URL);
} else {
  db = pgp(process.env.DATABASE_URL);
}

const headers = [
    'id',
    'title',
    'type',
    'street',
    'city',
    'state',
    'zip',
    'x',
    'y',
    'schedule',
    'data'
]

// our set of columns, to be created only once (statically), and then reused,
// to let it cache up its formatting templates for high performance:
const cs = new pgp.helpers.ColumnSet(headers, { table: tableName });

// map data input values:
const values = Object.values(data).map((datum) => ({
  id: datum.id,
  title: datum.title,
  type: datum.type,
  street: datum.street,
  city: datum.city,
  state: datum.state,
  zip: datum.zip,
  x: parseFloat(datum.x),
  y: parseFloat(datum.y),
  schedule: datum.Season1Time,
  data: JSON.stringify(datum),
}));

// generating a multi-row insert query:
const query = () => pgp.helpers.insert(values, cs);

// executing the query:
db.none(query);