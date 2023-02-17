const csvToJson = require('csvtojson');

async function start() {

const csvFilePath = 'data.csv';

const json = await csvToJson().fromFile(csvFilePath);

const jsonString = JSON.stringify(json, null, 2)

// console.log(jsonString);

for(let i = 0; i < json.length; i++) {
  let obj = json[i];

  console.log(obj);
}

}

start()

