var express = require('express');
var Patient = require('../models/patient');
var router = express.Router();
const encryptPassword = require('encrypt-password');

//get health status of patient
router.get('/health/:username', (req, res) => {

  let health = {username: req.params.username, birthdate: '', status: 'stable', backgroundColor: 'rgb(103 148 108)', medication: {}, missedMedication: false, pendingMedication: [], temperature: []}
  console.log(req.params.username)
  Patient.retrieveUser(req.params.username, (result) => {


    // if (err)
    //   return res.json({error: true});
    if(result[0].temperature != null ) health.temperature = result[0].temperature.temperature
    health.birthdate = result[0].birthdate
    if(result[0].medication.medication.length == 0) { //patient doesn't need any medication
      return res.json(health)
    }

    health.medication = result[0].medication.medication
    let medication = health.medication

    health = get_medication(health, medication)
    health = get_temperature(health, result[0].temperature.temperature)
    
    health = get_weight(health, result[0].weight.weight)
    health = get_pulse(health, result[0].pulse.pulse)
    health = get_blood_pressure(health, result[0].blood_pressure.blood_pressure)
    // console.log(health)
    return res.json(health)
  });
});

//update patient data
router.post('/updatePatient/:patientID/', (req, res) => {

    Patient.updatePatient(req.params.patientID, req.body.firstName, req.body.lastName , req.body.birthdate, {medication: req.body.medication}, (err, resultt) => {
        if (err)
          return res.json(err);
        return res.json({username: req.params.username})
      });
  });

/*    -------   */

router.post('/medication/pending/:username/:title', (req, res) => {
  Patient.retrieveUserMedication(req.params.username, (result) => {
    let medication = result[0].medication.medication
    
    let timestamp = new Date().valueOf()
    medication.forEach(med => {
      if(med.title == req.params.title){
        med.history.push({timestamp: timestamp, taken: true})
      }
    })

    Patient.saveUserMedication(req.params.username, {medication: medication}, (errr, resultt) => {
        return res.json({taken: true})
    })

  });
});

router.post('/medication/missed/:username/:title/:timestamp', (req, res) => {
  Patient.retrieveUserMedication(req.params.username, (result) => {
    let medication = result[0].medication.medication
    
    medication.forEach(med => {
      if(med.title == req.params.title) {
        med.history.push({timestamp: Number(req.params.timestamp), taken: req.body.taken})
        med.history = med.history.sort(function(a, b) { return Number(a.timestamp) - Number(b.timestamp) })
      }
    })

    Patient.saveUserMedication(req.params.username, {medication: medication}, (errr, resultt) => {
        return res.json({timestamp: req.params.timestamp, taken: true})
    })

  });
});

/*    -------   */

router.post('/temperature/pending/:username/', (req, res) => {

  var user_temperature = req.body.temperature;
  var measured = req.body.measured;
  var temperature = req.body.temperature

  Patient.retrieveTemperature(req.params.username, (result) => {
    
    let temperatures = result[0].temperature
    console.log('old temperatures ')
    console.log(temperatures)
    if(temperatures.temperature == null || temperatures.temperature == undefined) temperatures.temperature  = []

    temperatures.temperature.push({temperature: temperature, timestamp: (new Date()).valueOf(), measured: measured })
    temperatures.temperature = temperatures.temperature.sort(function(a, b) { return Number(a.timestamp) - Number(b.timestamp) })

    Patient.saveTemperature(req.params.username, temperatures, (err, resultt) => {
        if (err)
          return res.json(err);
        return res.json(temperatures)

      });

  });
});

router.post('/temperature/missed/:username/:timestamp/', (req, res) => {
  var measured = req.body.measured;
  var temperature = req.body.temperature
  console.log(measured)


  Patient.retrieveTemperature(req.params.username, (result) => {
    
    let temperatures = result[0].temperature
    console.log('old temperatures ')
    console.log(temperatures)
    if(temperatures.temperature == null || temperatures.temperature == undefined) temperatures.temperature  = []

    temperatures.temperature.push({temperature: temperature, timestamp: Number(req.params.timestamp), measured: measured })

    Patient.saveTemperature(req.params.username, temperatures, (err, resultt) => {
        if (err)
          return res.json(err);
        return res.json(temperatures)

      });

  });
});

/*    -------   */

router.post('/weight/pending/:username/', (req, res) => {
  var measured = req.body.measured;
  var weight = req.body.weight

  Patient.retrieveWeight(req.params.username, (result) => {
    
    let weights = result[0].weight
    console.log(weights)
    if(weights.weight == null || weights.weight == undefined) weights.weight  = []

    weights.weight.push({weight: weight, timestamp: (new Date()).valueOf(), measured: measured })
    weights.weight = weights.weight.sort(function(a, b) { return Number(a.timestamp) - Number(b.timestamp) })

    Patient.saveWeight(req.params.username, weights, (err, resultt) => {
        if (err)
          return res.json(err);
        return res.json(weights)

      });

  });
});

router.post('/weight/missed/:username/:timestamp/', (req, res) => {
  var measured = req.body.measured;
  var weight = req.body.weight
  console.log(measured)


  Patient.retrieveWeight(req.params.username, (result) => {
    
    let weights = result[0].weight
    if(weights.weight == null || weights.weight == undefined) weights.weight  = []

    weights.weight.push({weight: weight, timestamp: Number(req.params.timestamp), measured: measured })

    Patient.saveWeight(req.params.username, weights, (err, resultt) => {
        if (err)
          return res.json(err);
        return res.json(weights)

      });

  });
});

/*    -------   */

router.post('/blood_pressure/pending/:username/', (req, res) => {
  var measured = req.body.measured;
  var bloodpres_dia = req.body.bloodpres_dia
  var bloodpres_sys = req.body.bloodpres_sys

  Patient.retrieveBloodPressure(req.params.username, (result) => {
    
    let blood_pressures = result[0].blood_pressure

    if(blood_pressures.blood_pressure == null || blood_pressures.blood_pressure == undefined) blood_pressures.blood_pressure  = []

    blood_pressures.blood_pressure.push({"bloodpres_dia": bloodpres_dia, "bloodpres_sys": bloodpres_sys, timestamp: (new Date()).valueOf(), measured: measured })
    blood_pressures.blood_pressure = blood_pressures.blood_pressure.sort(function(a, b) { return Number(a.timestamp) - Number(b.timestamp) })

    Patient.saveBloodPressure(req.params.username, blood_pressures, (err, resultt) => {
        if (err)
          return res.json(err);
        return res.json(blood_pressures)

      });

  });
});

router.post('/blood_pressure/missed/:username/:timestamp/', (req, res) => {
  var measured = req.body.measured;
  var bloodpres_dia = req.body.bloodpres_dia
  var bloodpres_sys = req.body.bloodpres_sys


  Patient.retrieveBloodPressure(req.params.username, (result) => {
    
    let blood_pressures = result[0].blood_pressure
    if(blood_pressures.blood_pressure == null || blood_pressures.blood_pressure == undefined) blood_pressures.blood_pressure  = []

    blood_pressures.blood_pressure.push({"bloodpres_dia": bloodpres_dia, "bloodpres_sys": bloodpres_sys, timestamp: Number(req.params.timestamp), measured: measured })

    Patient.saveBloodPressure(req.params.username, blood_pressures, (err, resultt) => {
        if (err)
          return res.json(err);
        return res.json(blood_pressures)

      });

  });
});

/*    -------   */

router.post('/pulse/pending/:username/', (req, res) => {
  var measured = req.body.measured;
  var pulse = req.body.pulse

  Patient.retrievePulse(req.params.username, (result) => {
    
    let pulses = result[0].pulse
    console.log(pulses)
    if(pulses.pulse == null || pulses.pulse == undefined) pulses.pulse  = []

    pulses.pulse.push({pulse: pulse, timestamp: (new Date()).valueOf(), measured: measured })
    pulses.pulse = pulses.pulse.sort(function(a, b) { return Number(a.timestamp) - Number(b.timestamp) })

    Patient.savePulse(req.params.username, pulses, (err, resultt) => {
        if (err)
          return res.json(err);
        return res.json(pulses)

      });

  });
});

router.post('/pulse/missed/:username/:timestamp/', (req, res) => {
  var measured = req.body.measured;
  var pulse = req.body.pulse
  console.log(measured)


  Patient.retrievePulse(req.params.username, (result) => {
    
    let pulses = result[0].pulse
    if(pulses.pulse == null || pulses.pulse == undefined) pulses.pulse  = []

    pulses.pulse.push({pulse: pulse, timestamp: Number(req.params.timestamp), measured: measured })

    Patient.savePulse(req.params.username, pulses, (err, resultt) => {
        if (err)
          return res.json(err);
        return res.json(pulses)

      });

  });
});

router.post('/medication', (req, res) => {

  var medication = req.body.medication;

  Patient.insert(medication, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


/*
*
* Hilf Funntkionen
*
*/

function get_medication(health, medication){
    medication.forEach(med => {
      health.medication[med.title] = {}
      let med_assigned_on = Number(med.assigned_on) //The patient must take med starting from this date
      let med_duration = Number(med.duration) // The inerval in which med should be taken
      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []

      //calculate intervals and save them in array as int
      let till_when = med_assigned_on
      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000) *  med_duration - 1
      }
      med.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1){
        //first time patient takes this med
        if(!med.history.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending_boll = (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration)  > Number(new Date().valueOf())
          if(pending_boll)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration), pending: pending_boll })
          else
          missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration), pending: pending_boll })
        }

      } else if (intervals.length >= 2){
        
        for(let i = 0; i < intervals.length - 2; i++) {
          if( !med.history.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) <= intervals[i+1]}).length > 0 ){
            // let pending = ( Number(new Date().valueOf()) - intervals[i+1] ) < (24 * 60 * 60 * 1000) *  med_duration
            // if(pending)
            //   pending.push({from: intervals[i], to: intervals[i+1], pending: pending  })
            // else
              missed.push({from: intervals[i], to: intervals[i+1], pending: pending  })
          }
        }
        if(( intervals[intervals.length-1] + (24 * 60 * 60 * 1000) *  med_duration)  >= Number(new Date().valueOf()) 
          && !med.history.filter( obj =>  { return Number(obj.timestamp) >= intervals[intervals.length-1]}).length > 0
           ) {
            pending.push({from: intervals[intervals.length-1], to: (intervals[intervals.length-1] + (24 * 60 * 60 * 1000) *  med_duration), pending: true })
        }

      }
      med.missed = missed.reverse()
      med.pending = pending
      health.medication[med.title]= med
      // health[med.title] = .intervals = intervals
      
    })
  return health
}

function get_temperature(health, temperature){
    if(temperature.length === 0 ) {
      let obj = {}
      obj.missed = []
      obj.pending = []
      health.temperatures  = obj
      return health
    }

      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []
      let temperatures = {}
      temperatures.history = temperature



      let till_when = temperature.slice().reduce(function(prev, curr) { return Number(prev.timestamp) < Number(curr.timestamp) ? prev : curr; }); //first  date when I started enttering
      console.log(till_when)
      till_when = Number(till_when.timestamp) - 1
      //calculate intervals and save them in array as int

      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000)
      }

      temperatures.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1) {
        //first time patient takes this med
        if(!temperature.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending_boll = (intervals[0] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf())
          if(pending_boll)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_boll })
          else
          missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_boll })
        }

      } else if (intervals.length >= 2) {
        
        for(let i = 0; i < intervals.length - 2; i++) {
          if( temperature.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) <= intervals[i+1]}).length == 0 ){
              missed.push({from: intervals[i], to: intervals[i+1]  })
          }
        }
        if(( intervals[intervals.length-1] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf()) 
          && !temperature.filter( obj =>  { return Number(obj.timestamp) > intervals[intervals.length-1]}).length > 0
           ) {
            pending.push({from: intervals[intervals.length-1], to: (intervals[intervals.length-1] + (24 * 60 * 60 * 1000) ) })
        }

      }


      temperatures.missed = missed.reverse()
      temperatures.pending = pending

      health.temperatures  = temperatures

  return health
}

function get_weight(health, weight){
    if(weight.length === 0 ) {
      let obj = {}
      obj.missed = []
      obj.pending = []
      health.weights  = obj
      return health
    }

      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []
      let weights = {}
      weights.history = weight



      let till_when = weight.slice().reduce(function(prev, curr) { return Number(prev.timestamp) < Number(curr.timestamp) ? prev : curr; }); //first  date when I started enttering
      console.log(till_when)
      till_when = Number(till_when.timestamp) - 1
      //calculate intervals and save them in array as int

      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000)
      }

      weights.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1) {
        //first time patient takes this med
        if(!weight.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending_boll = (intervals[0] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf())
          if(pending_boll)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_boll })
          else
            missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_boll })
        }

      } else if (intervals.length >= 2) {
        
        for(let i = 0; i < intervals.length - 2; i++) {
          if( weight.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) <= intervals[i+1]}).length == 0 ){
              missed.push({from: intervals[i], to: intervals[i+1]  })
          }
        }
        if(( intervals[intervals.length-1] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf()) 
          && !weight.filter( obj =>  { return Number(obj.timestamp) > intervals[intervals.length-1]}).length > 0
           ) {
            pending.push({from: intervals[intervals.length-1], to: (intervals[intervals.length-1] + (24 * 60 * 60 * 1000) ) })
        }

      }


      weights.missed = missed.reverse()
      weights.pending = pending

      health.weights  = weights

  return health
}

function get_pulse(health, pulse){
    if(pulse.length === 0 ) {
      let obj = {}
      obj.missed = []
      obj.pending = []
      health.pulses  = obj
      return health
    }

      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []
      let pulses = {}
      pulses.history = pulse



      let till_when = pulse.slice().reduce(function(prev, curr) { return Number(prev.timestamp) < Number(curr.timestamp) ? prev : curr; }); //first  date when I started enttering
      console.log(till_when)
      till_when = Number(till_when.timestamp) - 1
      //calculate intervals and save them in array as int

      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000)
      }

      pulses.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1) {
        //first time patient takes this med
        if(!pulse.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending_boll = (intervals[0] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf())
          if(pending_boll)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_boll })
          else
            missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_boll })
        }

      } else if (intervals.length >= 2) {
        
        for(let i = 0; i < intervals.length - 2; i++) {
          if( pulse.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) <= intervals[i+1]}).length == 0 ){
              missed.push({from: intervals[i], to: intervals[i+1]  })
          }
        }
        if(( intervals[intervals.length-1] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf()) 
          && !pulse.filter( obj =>  { return Number(obj.timestamp) > intervals[intervals.length-1]}).length > 0
           ) {
            pending.push({from: intervals[intervals.length-1], to: (intervals[intervals.length-1] + (24 * 60 * 60 * 1000) ) })
        }

      }


      pulses.missed = missed.reverse()
      pulses.pending = pending

      health.pulses  = pulses

  return health
}

function get_blood_pressure(health, blood_pressure){
    if(blood_pressure.length === 0 ) {
      let obj = {}
      obj.missed = []
      obj.pending = []
      health.blood_pressures  = obj
      return health
    }

      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []
      let blood_pressures = {}
      blood_pressures.history = blood_pressure



      let till_when = blood_pressure.slice().reduce(function(prev, curr) { return Number(prev.timestamp) < Number(curr.timestamp) ? prev : curr; }); //first  date when I started enttering
      console.log(till_when)
      till_when = Number(till_when.timestamp) - 1
      //calculate intervals and save them in array as int

      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000)
      }

      blood_pressures.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1) {
        //first time patient takes this med
        if(!blood_pressure.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending_boll = (intervals[0] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf())
          if(pending_boll)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_boll })
          else
            missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_boll })
        }

      } else if (intervals.length >= 2) {
        
        for(let i = 0; i < intervals.length - 2; i++) {
          if( blood_pressure.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) <= intervals[i+1]}).length == 0 ){
              missed.push({from: intervals[i], to: intervals[i+1]  })
          }
        }
        if(( intervals[intervals.length-1] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf()) 
          && !blood_pressure.filter( obj =>  { return Number(obj.timestamp) > intervals[intervals.length-1]}).length > 0
           ) {
            pending.push({from: intervals[intervals.length-1], to: (intervals[intervals.length-1] + (24 * 60 * 60 * 1000) ) })
        }

      }


      blood_pressures.missed = missed.reverse()
      blood_pressures.pending = pending

      health.blood_pressures  = blood_pressures

  return health
}


module.exports = router;