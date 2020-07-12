var fs = require("fs");
const fsp = require("fs").promises;

const parser = (filepath) => {
    fsp.readFile(filepath).then(
        data => {
            let csvString = data.toString()
            console.log(csvString);
            const rows = csvString.trim().split("\n");
            const headers = rows[0].split("~");
            const db = {};

            console.log(rows);
            rows.forEach((row) => {
              let rowItems = row.trim().split("~");
              let parsedRow = {};
              headers.forEach((col, idx) => {
                parsedRow[col] = rowItems[idx].trim();
              });

              if (CSA_ID) {
                parsedRow.id = parsedRow.CSA_ID
              };

              if (OF_ID) {
                parsedRow.id = parsedRow.OF_ID
              };

              if (FMID) {
                parsedRow.id = parsedRow.FMID
              };

              //set db key here
              db[parsedRow.CSA_ID] = parsedRow;
            });

            fs.writeFile("converted.json", JSON.stringify(db), () =>
              console.log("File completed")
            );
        }
    )
};

parser("../data/usda_csas_til.csv");
