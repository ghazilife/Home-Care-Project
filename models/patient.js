const db = require('../database');

class Patient {
	/*returns all data form database table patient*/
  static retrieveAll (callback) {
    db.query('SELECT * from patient', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	/*returns all data from a single patient by his*her username*/
  static retrieveUser (username, callback) {
    db.query('SELECT * from patient WHERE username = $1', [username], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
  
	/*Change patients name, birthdate and medication*/
  static updatePatient (patientid, firstName, lastName , birthdate, medication, callback) {
      db.query('UPDATE patient SET firstName = $2, lastName = $3, birthdate = $4, medication = $5 WHERE patientid = $1', [patientid, firstName, lastName , birthdate, medication], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
  
	/*returns field temperature of table patient by username*/
  static retrieveTemperature (username, callback) {
    db.query('SELECT temperature from patient WHERE username = $1', [username], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	/*Update patients temperature*/
  static saveTemperature (username, temperature, callback) {
      db.query('UPDATE patient SET temperature = $2 WHERE username = $1', [username, temperature], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	/*returns field weight of table patient by username*/
  static retrieveWeight (username, callback) {
    db.query('SELECT weight from patient WHERE username = $1', [username], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	/*Update patients weight*/
  static saveWeight (username, weight, callback) {
      db.query('UPDATE patient SET weight = $2 WHERE username = $1', [username, weight], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
	
	/*returns field blood_pressureof table patient by username*/
  static retrieveBloodPressure (username, callback) {
    db.query('SELECT blood_pressure from patient WHERE username = $1', [username], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	/*Update patients blood pressure*/
  static saveBloodPressure (username, blood_pressure, callback) {
      db.query('UPDATE patient SET blood_pressure = $2 WHERE username = $1', [username, blood_pressure], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	/*returns field pulse table patient by username*/
  static retrievePulse (username, callback) {
    db.query('SELECT pulse from patient WHERE username = $1', [username], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	/*Update patients pulse*/
  static savePulse (username, pulse, callback) {
      db.query('UPDATE patient SET pulse = $2 WHERE username = $1', [username, pulse], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	/*returns field medication table patient by username*/
  static retrieveUserMedication (username, callback) {
    db.query('SELECT medication from patient WHERE username = $1', [username], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	/*Update patients medication*/
  static saveUserMedication (username, medication, callback) {
      db.query('UPDATE patient SET medication = $2 WHERE username = $1', [username, medication], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	/*placeholder for any db request*/
  static retrieveSpecific (data, callback) {
   db.query(data, (err, res) => {
        if (err.error)
          return callback(err);
        callback(res);
    });
  }

	/*insert new patient*/
  static insert (firstName, lastName, email, birthdate, username, password, medication, callback) {
    let addressid = new Date().valueOf().toString()
    let timestamp =  new Date().valueOf()
      db.query('INSERT INTO patient (username, password, firstName, lastName , birthdate, addressid, pulse, weight, blood_pressure, temperature, medication) VALUES ($1, $2,$3, $4, $5, $6, $7, $8, $9, $10, $11)', [username, password, firstName, lastName , birthdate, "1", {pulse: [], assigned_on: timestamp}, {weight: [], assigned_on: timestamp}, {blood_pressure: [], assigned_on: timestamp}, {temperature: [], assigned_on: timestamp}, medication], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Patient;