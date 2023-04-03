var express = require('express');
var Patient = require('../models/patient');
var router = express.Router();
const encryptPassword = require('encrypt-password');
const PatientLogic = require("./patient_health.js");

/*get all patients with health status*/
router.get('/getPatients', (req, res) => {
  Patient.retrieveAll((users) => {

    users.forEach( user => {
      let health = {medication: {}}
      
	  //grab data with missed and pending separated
      if(user.medication != null) health = PatientLogic.get_medication_missed(health, user.medication.medication)
      if(user.temperature != null) health = PatientLogic.get_temperature(health, user.temperature.temperature)
      if(user.weight != null) health = PatientLogic.get_weight(health, user.weight.weight)
      if(user.pulse != null) health = PatientLogic.get_pulse(health, user.pulse.pulse)
      if(user.blood_pressure != null) health = PatientLogic.get_blood_pressure(health, user.blood_pressure.blood_pressure, user.blood_pressure.assigned_on)


      let first_step_points
      let medication_points

      if(health != undefined ) {
        health.detailed_first_step_points = {}
        first_step_points = PatientLogic.calculate_points_first_Step(health) // get intermediate result
        health.first_step_points = first_step_points
      }
	  // depending on intermediate result add points for final result
      if(health != undefined ) {
        health.detailed_final_step_points = {}
        if(first_step_points <= 1)  
          medication_points = PatientLogic.calculate_points_final(health, 1)
        if(first_step_points == 2 || first_step_points == 3)  
          medication_points = PatientLogic.calculate_points_final(health, 2)
        if(first_step_points > 3)  
          medication_points = PatientLogic.calculate_points_final(health, 3)
      }

      if(health != undefined ) health.points = first_step_points + medication_points

      user.health = health

      delete user['password']
    })

    return res.json(users);
  });
});

/*add new patient into database*/
router.post('/addPatient', (req, res) => {

  // retrieve user information from request
  var firstName    = req.body.firstname;
  var LastName     = req.body.lastname;
  var email        = req.body.email;
  var birthdate    = req.body.birthdate;
  var username     = req.body.username;
  var password     = req.body.password;
  var medication  = req.body.medication;

  var timestamp = new Date().valueOf().toString()
  medication.forEach(medicament => {
    if(!medicament.hasOwnProperty('assigned_on')){
      medicament.assigned_on = timestamp
    }
  })

  let medication_json = {medication: medication}

    //forward request to the model
    Patient.insert(firstName, LastName, email, birthdate, username, encryptPassword(password, 'homecare'), medication_json, (err, result) => {
      if (err)
        return res.json(err);
      return res.json(result);
    });
});

/*update medicament*/
router.post('/medication', (req, res) => {

  var medication = req.body.medication;

  Patient.insert(medication, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

/*get patients health status of thoose with high or average risk */
router.get('/getPatients/health/risk', (req, res) => {
  Patient.retrieveAll((users) => {

    users.forEach( user => {
      let health = {medication: {}}
      
      if(user.medication != null) health = PatientLogic.get_medication_missed(health, user.medication.medication)
      if(user.temperature != null) health = PatientLogic.get_temperature(health, user.temperature.temperature, user.temperature.assigned_on)
      if(user.weight != null) health = PatientLogic.get_weight(health, user.weight.weight, user.weight.assigned_on)
      if(user.pulse != null) health = PatientLogic.get_pulse(health, user.pulse.pulse, user.pulse.assigned_on)
      if(user.blood_pressure != null) health = PatientLogic.get_blood_pressure(health, user.blood_pressure.blood_pressure, user.blood_pressure.assigned_on)


      let first_step_points
      let medication_points

      if(health != undefined ) {
        health.detailed_first_step_points = {}
        first_step_points = PatientLogic.calculate_points_first_Step(health)
        health.first_step_points = first_step_points
      }
      if(health != undefined ) {
        health.detailed_final_step_points = {}
        if(first_step_points <= 1)  
          medication_points = PatientLogic.calculate_points_final(health, 1)
        if(first_step_points == 2 || first_step_points == 3)  
          medication_points = PatientLogic.calculate_points_final(health, 2)
        if(first_step_points > 3)  
          medication_points = PatientLogic.calculate_points_final(health, 3)
      }

      if(health != undefined ) health.points = first_step_points + medication_points

      user.health = health

      delete user['password']
      delete user['addressid']
    })


    return res.json(users.filter(user => {return user.health.points > 2 }));
  });
});


module.exports = router;