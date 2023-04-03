var db = require('../database');
  const encryptPassword = require('encrypt-password');

  db.query('DROP TABLE IF EXISTS doctor;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query('CREATE TABLE doctor (doctorid serial,username text NOT NULL,password text NOT NULL,firstname text NOT NULL,lastname text NOT NULL,addressid integer NOT NULL, PRIMARY KEY (doctorid));', (err, res) => { 
          db.query('INSERT INTO doctor (username, password, firstName, lastName, addressID) VALUES ($1, $2, $3, $4, $5);',
          ['d.thiel', encryptPassword('123456', 'homecare'), 'David', 'Thiel', '1'], (err, res) => { })
        db.query('INSERT INTO doctor (username, password, firstName, lastName, addressID) VALUES ($1, $2, $3, $4, $5);',
          ['a.klein', encryptPassword('654123', 'homecare'), 'Angelika', 'Klein', '2'], (err, res) => { })
        db.query('INSERT INTO doctor (username, password, firstName, lastName, addressID) VALUES ($1, $2, $3, $4, $5);',
          ['s.afzal', encryptPassword('654321', 'homecare'), 'Shazia', 'Afzal', '3'], (err, res) => { })

    })	
  })