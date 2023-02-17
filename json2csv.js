const Parser = require('@json2csv/plainjs');

const parser = new Parser({ delimiter: '|' });

const obj = [
  { firstName: 'Russell', lastName: 'Castillo', age: 23 },
  { firstName: 'Christy', lastName: 'Harper', age: 35 },
  { firstName: 'Eleanor', lastName: 'Mark', age: 26 },
];

const csv = parser.parse(obj);

console.log(csv);