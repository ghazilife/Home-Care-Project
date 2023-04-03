  var db = require('../database');

  db.query('DROP TABLE IF EXISTS patientToDoctor;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query('CREATE TABLE patientToDoctor(patientid integer NOT NULL,doctorid integer NOT NULL,validfrom date NOT NULL,validto date NOT NULL,PRIMARY KEY (patientid, doctorid));', (err, res) => {
    db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
		['1', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
		['2', '2', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
		['3', '3', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
		['4', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
		['5', '2', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
		['6', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
		['7', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	//db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
	//	['8', '2', '2020-01-01', '2099-12-31'], (err, res) => { })
	//db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
	//	['9', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	//db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
	//	['10', '2', '2020-01-01', '2099-12-31'], (err, res) => { })
	//db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
	//	['11', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	//db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
	//	['12', '2', '2020-01-01', '2099-12-31'], (err, res) => { })
	//db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
	//	['13', '3', '2020-01-01', '2099-12-31'], (err, res) => { })
	//db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
	//	['14', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	//db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
	//	['15', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
	//db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
	//	['16', '2', '2020-01-01', '2099-12-31'], (err, res) => { })
	//db.query('INSERT INTO patientToDoctor (patientid, doctorid, validfrom, validto) VALUES ($1, $2, $3, $4);',
	//	['17', '1', '2020-01-01', '2099-12-31'], (err, res) => { })
  })
})