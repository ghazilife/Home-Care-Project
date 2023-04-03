var express = require('express');
var Patient = require('../models/patient');
var router = express.Router();
const encryptPassword = require('encrypt-password');

/*
*
* Get health data (all)
*
*/

/*order medication data in missed and pending*/
function get_medication(health, medication){
    medication.forEach(med => {
      health.medication[med.title] = {}
      let med_assigned_on = Number(med.assigned_on) //The patient must take med starting from this date
      let med_duration = Number(med.duration) // The inerval in which med should be taken
      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []

      //calculate intervals and save them in array as int
      let till_when = Number(med_assigned_on)+1
      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000) *  med_duration
      }
      med.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1){
        //first time patient takes this med
        if(!med.history.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending = (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration)  > Number(new Date().valueOf())
          if(pending)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration), pending: pending })
          else
          missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration), pending: pending })
        }

      } else if (intervals.length >= 2){
        
        for(let i = 0; i < intervals.length - 2; i++) {
          if( !med.history.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) <= intervals[i+1]}).length > 0 ){
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
      
    })
  return health
}

/*order temperature data in missed and pending*/
function get_temperature(health, temperature, assigned_on){

      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []
      let temperatures = {}
      temperatures.history = temperature

      let till_when = assigned_on - 1
	  
      //calculate intervals and save them in array as int
      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000)
      }

      temperatures.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1) {
        //first time patient enters temperature
        if(!temperature.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending_bool = (intervals[0] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf())
          if(pending_bool)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_bool })
          else
          missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_bool })
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

/*order weight data in missed and pending*/
function get_weight(health, weight, assigned_on){

      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []
      let weights = {}
      weights.history = weight

      let till_when = assigned_on - 1 
	  
      //calculate intervals and save them in array as int
      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000)
      }

      weights.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1) {
        //first time patient enters weight
        if(!weight.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending_bool = (intervals[0] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf())
          if(pending_bool)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_bool })
          else
          missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_bool })
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

/*order pulse data in missed and pending*/
function get_pulse(health, pulse, assigned_on){

      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []
      let pulses = {}
      pulses.history = pulse

      let till_when = assigned_on - 1
	  
      //calculate intervals and save them in array as int
      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000)
      }

      pulses.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1) {
        //first time patient enters pulse
        if(!pulse.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending_bool = (intervals[0] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf())
          if(pending_bool)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_bool })
          else
          missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_bool })
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

/*order blood_pressure data in missed and pending*/
function get_blood_pressure(health, blood_pressure, assigned_on){

      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []
      let blood_pressures = {}
      blood_pressures.history = blood_pressure

      let till_when = assigned_on - 1
	  
      //calculate intervals and save them in array as int
      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000)
      }

      blood_pressures.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1) {
        //first time patient enters blood_pressure
        if(!blood_pressure.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending_bool = (intervals[0] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf())
          if(pending_bool)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_bool })
          else
          missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending_bool })
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

/*
*
* grab missing data from general data
*
*/

function get_medication_missed(health, medication){
    medication.forEach(med => {
      health.medication[med.title] = {}
      let med_assigned_on = Number(med.assigned_on) //The patient must take med starting from this date
      let med_duration = Number(med.duration) // The inerval in which med should be taken
      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []

      //calculate intervals and save them in array as int
      let till_when = Number(med_assigned_on)
      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000) *  med_duration
      }

      let missed = []
      let pending = []

      if(intervals.length == 1){
        //first time patient takes this med
        if(!med.history.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending_bool = (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration)  > Number(new Date().valueOf())
          if(pending_bool){
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration), pending: pending_bool })
          }
          else {
              missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration), pending: pending_bool })
          }
        }

      } else if (intervals.length >= 2){
        
        for(let i = 0; i <= intervals.length - 2; i++) {
          if( !med.history.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) < intervals[i+1]}).length > 0 ){
              missed.push({from: intervals[i], to: intervals[i+1] })
          }
        }
        if( !med.history.filter( obj =>  { return Number(obj.timestamp) > intervals[intervals.length - 1]}).length > 0 )
        {
            pending.push({from: intervals[intervals.length-1], to: (intervals[intervals.length-1] + (24 * 60 * 60 * 1000) *  med_duration), pending: true })
        }
      }

      med.interval = intervals
      med.missed = missed.reverse()
      health.medication[med.title]= med      
    })

  return health
}

/*
*
* calculate point for health status
*
*/

/*first step: check abnormal data*/
function calculate_points_first_Step(health){
  let points = 0

  //pulse of last 28 days
  let puls_history = health.pulses.history.filter(pulse => {return Number(pulse.timestamp) >= Number(new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).valueOf()) && pulse.measured} ) 
  let pulse_points_low = 0
  let pulse_points_high = 0
  puls_history.forEach(pulse => {
    if ( (pulse.pulse >=50 && pulse.pulse <=60) || (pulse.pulse >=90 && pulse.pulse <=100) ) {
      points += 1 
      pulse_points_low += 1 
    }
    if(pulse.pulse <50 || pulse.pulse > 100) {
      points += 2 
      pulse_points_high += 1 
    }
  })
  health.detailed_first_step_points.pulse_low = pulse_points_low
  health.detailed_first_step_points.pulse_high = pulse_points_high

  //weight of last 90 days
  let weight_history = health.weights.history.filter(weight => {return Number(weight.timestamp) >= Number(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).valueOf()) && weight.measured} )
  let old_weight = weight_history[0]

  let weight_points = 0
  if(old_weight!= undefined){
    let old_weight_10_percent = old_weight.weight*0.1
    old_weight = old_weight.weight
    let new_weight = weight_history[weight_history.length -  1].weight

    if( new_weight >= old_weight+old_weight_10_percent || new_weight <= old_weight-old_weight_10_percent ){
      points += 3
      weight_points = 1
    }
  }

  health.detailed_first_step_points.weight = weight_points

  //temperature of last 28 days
  let temperature_history = health.temperatures.history.filter(temperature => {return Number(temperature.timestamp) >= Number(new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).valueOf() ) && temperature.measured } )
  let temperature_points_low = 0
  let temperature_points_high = 0
  temperature_history.forEach(temperature => {
    if( (temperature.temperature >=36 && temperature.temperature <=36.4) || (temperature.temperature >=37.6 && temperature.temperature <=38.5) ) {
      points += 1 
	    temperature_points_low += 1 
    }
    if(temperature.temperature <36 || temperature.temperature > 38.5) {
	    points += 2
      temperature_points_high += 1
    }
  })

  health.detailed_first_step_points.temperature_low = temperature_points_low
  health.detailed_first_step_points.temperature_high = temperature_points_high

  //blood_pressure of last 28 days
  let blood_pressure_history = health.blood_pressures.history.filter(blood_pressure => {return Number(blood_pressure.timestamp) >= Number(new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).valueOf()) && blood_pressure.measured} )
  let blood_pressure_points_low = 0
  let blood_pressure_points_high = 0
  blood_pressure_history.forEach(blood_pressure => {
    if( (blood_pressure.bloodpres_dia >= 90 && blood_pressure.bloodpres_dia <=100 && blood_pressure.bloodpres_sys >= 140 && temperature.bloodpres_sys <=150) ) {
      points += 1 
      blood_pressure_points_low += 1 
    }
    if(blood_pressure.bloodpres_dia > 100 || blood_pressure.bloodpres_sys > 150) {
      points += 2 
      blood_pressure_points_high += 1 
    }
  })

  health.detailed_first_step_points.blood_pressure_low = blood_pressure_points_low
  health.detailed_first_step_points.blood_pressure_high = blood_pressure_points_high

  return points
}

/*calculate final points with missed entries, 
	add_number is the number of point that have to be added for each missing data, 
	add_number depends on result of calculate_points_first_Step()*/
function calculate_points_final(health, add_number){
  let points = 0
  
  for (var key in health.medication) {
    if (health.medication.hasOwnProperty(key)) {
      var val = health.medication[key];
      var measured_false = val.history.filter(med => {return med.measured == false})
       points += val.missed.length * add_number // add add_number for each missing data
       points += measured_false.length * add_number // add add_number for each data with measured false
    }
  }

   let temperature_points = 0
   points += health.temperatures.history.filter(pulse => {return pulse.measured == false }).length * add_number
   points += health.temperatures.missed.length * add_number
   temperature_points += health.temperatures.history.filter(pulse => {return pulse.measured == false }).length
   temperature_points += health.temperatures.missed.length
   health.detailed_final_step_points.temperature = temperature_points
   
   let weight_points = 0
   points += health.weights.history.filter(pulse => {return pulse.measured == false }).length * add_number
   points += health.weights.missed.length * add_number
   weight_points += health.weights.history.filter(pulse => {return pulse.measured == false }).length
   weight_points += health.weights.missed.length
   health.detailed_final_step_points.weight = weight_points
  
   let blood_pressure_points = 0
   points += health.blood_pressures.history.filter(pulse => {return pulse.measured == false }).length * add_number
   points += health.blood_pressures.missed.length * add_number
   blood_pressure_points += health.blood_pressures.history.filter(pulse => {return pulse.measured == false }).length
   blood_pressure_points += health.blood_pressures.missed.length
   health.detailed_final_step_points.blood_pressure = blood_pressure_points
   
   let pulse_points = 0
   points += health.pulses.history.filter(pulse => {return pulse.measured == false }).length * add_number
   points += health.pulses.missed.length * add_number
   pulse_points += health.pulses.history.filter(pulse => {return pulse.measured == false }).length
   pulse_points += health.pulses.missed.length
   health.detailed_final_step_points.pulse = pulse_points

  return points
}


module.exports = {get_medication, get_temperature, get_weight, get_pulse, get_blood_pressure, get_medication_missed, calculate_points_first_Step, calculate_points_final}