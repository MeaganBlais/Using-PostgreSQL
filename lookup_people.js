const pg = require('pg');
const settings = require('./settings'); //settings.json

// progres cli uses this information to connect
const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ss1: settings.ss1
});

const input = process.argv[2];
const nameQ = `SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text`

// client connects to database
client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err);
  }
  client.query(nameQ, [input], (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    console.log('ln25', result.rows[0].id); //output: 1
    console.log('ln26', result.rows);
    // return result.rows;
    client.end();
    console.log("Found 1 person(s) by the name 'Lincoln': - ", result.rows[0].id, ": ", result.rows[0].first_name, ' ', result.rows[0].last_name, ", born", result.rows[0].birthdate)
  });

});

// function printData(input, results) {
// const printData = (rows) => {
//   // for (let row of rows) {
//   // results.rows.forEach((row) => {
//   let row = rows[0];
// console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born ${row.birthdate}`);
//   // console.log(`- ${results.rows[input].id}: ${results.rows[input].first_name} ${results.rows[input].last_name}, born ${results.rows[input].birthdate}`);
// // });
// // }
// }
// printData(process.argv[2]);
// console.log('connected');
