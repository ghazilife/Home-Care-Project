var db = require('../database');
  const encryptPassword = require('encrypt-password');

  db.query('DROP TABLE IF EXISTS pharmacy;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query( 'CREATE TABLE pharmacy ( pharmacyid serial NOT NULL, username text NOT NULL, password text NOT NULL, name text NOT NULL, addressid integer NULL, PRIMARY KEY (pharmacyid));', (err, res) => { 
    db.query('INSERT INTO pharmacy (username, password, name, addressID) VALUES ($1, $2, $3, $4);',
		['ApothekeCharite', encryptPassword('apotheke1', 'homecare'), 'Apotheke am Klinikum', '21'], (err, res) => { })
	db.query('INSERT INTO pharmacy (username, password, name, addressID) VALUES ($1, $2, $3, $4);',
		['ApothekeHirsch', encryptPassword('medi1234', 'homecare'), 'Hirsch Apotheke', '22'], (err, res) => { })
	db.query('INSERT INTO pharmacy (username, password, name, addressID) VALUES ($1, $2, $3, $4);',
		['ApothekeDreilinden', encryptPassword('3Linden!', 'homecare'), 'Dreilinden Apotheke', '23'], (err, res) => { })
    })
  })
