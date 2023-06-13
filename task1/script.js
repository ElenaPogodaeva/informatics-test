const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "usersdb",
  password: ""
});

connection.query("CREATE DATABASE usersdb",
  function(err) {
    if (err) console.log(err);
    else console.log("База данных создана");
});

const createCars = `CREATE TABLE IF NOT EXISTS cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) not null,
  model VARCHAR(255) not null,
  country VARCHAR(255) not null
)`;

const createUsers = `CREATE TABLE if not exists users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) not null,
  address VARCHAR(255) not null
)`;

const createRegistration = `CREATE TABLE if not exists registration (
  id INT AUTO_INCREMENT PRIMARY KEY,
  carId INT NOT NULL,
  userId INT NOT NULL,
  dateReg DATE NOT NULL
)`;

connection.query(createCars, function(err, results) {
  if (err) console.log(err);
  else console.log(results);
});

connection.query(createUsers, function(err, results) {
  if (err) console.log(err);
  else console.log(results);
});

connection.query(createRegistration, function(err, results) {
  if (err) console.log(err);
  else console.log(results);
});

const cars = [
  ['Toyota', '2000GT', 'Japan'],
  ['Audi', 'A1', 'Germany'],
  ['Audi', 'A2', 'Germany'],
  ['BMW', 'M2', 'Germany'],
  ['Volkswagen', 'Fox', 'Germany'],
];

const insertCars = `INSERT INTO cars(name, model, country) VALUES ?`;

connection.query(insertCars, [cars], function(err, results) {
  if (err) console.log(err);
  else console.log(results);
});

const users = [
  ['John', 'Highway 71'],
  ['Peter', 'Lowstreet 4'],
  ['Amy', 'Apple st 652'],
  ['Hannah', 'Mountain 21'],
  ['Michael', 'Valley 345'],
];

const insertUsers = `INSERT INTO users(name, address) VALUES ?`;

connection.query(insertUsers, [users], function(err, results) {
  if(err) console.log(err);
  else console.log(results.affectedRows);
});

const registration = [
  ['1', '2', '05.04.2018'],
  ['2', '1', '05.04.2020'],
  ['3', '5', '05.04.2021'],
  ['4', '3', '05.04.2022'],
  ['5', '4', '05.04.2023'],
];

const insertReg = `INSERT INTO registration(carId, userId, dateReg) VALUES ?`;

connection.query(insertReg, [registration], function(err, results) {
  if (err) console.log(err);
  else console.log(results);
});

const sql = `SELECT users.name, cars.name, cars.model, registration.dateReg 
  FROM users
  JOIN registration ON (users.id = registration.userId)
  JOIN cars ON (cars.id = registration.carId)
  WHERE registration.dateReg < '01.01.2022'
)`;

connection.query(sql, function(err, results) {
  if (err) console.log(err);
  else console.log(results);
});

connection.end(function(err) {
  if (err) {
    return console.log("Ошибка: " + err.message);
  }
  console.log("Подключение закрыто");
});