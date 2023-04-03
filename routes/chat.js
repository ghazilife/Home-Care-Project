var express = require('express');
var Patient = require('../models/patient');
var Chat = require('../models/chat');
var router = express.Router();


//get all messages from database
router.get('/getAllChatrooms', (req, res) => {
  Patient.retrieveAllChatrooms((messages) => {
    return res.json(messages);
  });
});

//get all messages from one person (sent and received)
router.get('/getAllChatroomsFromUser/:id/:type', (req, res) => { // WAS IST HIER DAS ROUTING?

  let messages = {id: req.params.id, type: req.params.type}
  Chat.retrieveAllChatroomsFromUser (req.params.id, req.params.type, (result) => {
    return res.json(messages)
  });
});


//get all messages from two parties 
router.get('/getAllChatroomsFromTwoParties/:chatPartner1ID/:chatPartner1Type/:chatPartner2ID/:chatPartner2Type', (req, res) => { // WAS IST HIER DAS ROUTING?

  let messages = {chatPartner1ID: req.params.chatPartner1ID, chatPartner1Type: req.params.chatPartner1Type, chatPartner2ID: req.params.chatPartner2ID, chatPartner2Type: req.params.chatPartner2Type}
  Chat.retrieveAllChatroomsFromTwoParties (req.params.chatPartner1ID, req.params.chatPartner1Type, req.params.chatPartner2ID, req.params.chatPartner2Type, (result) => {
    return res.json(messages)
  });
});


//insert new chatroom into database
router.post('/newChatroom/:chatID/:chatName/:fromID/:fromType/:toID/:toType', (req, res) => {
  Chat.createChatroom(req.params.chatID, req.params.chatName, req.params.fromID, req.params.fromType, req.params.toID, req.params.toType, (errr, resultt) => {
        return res.json({timestamp: req.params.timestamp, send: true}) 
    })
  });
  
 //update message
router.post('/updateMessage/:chatID/:chatName/:chatPartner1ID/:chatPartner1Type/:chatPartner2ID/:chatPartner2Type/:message', (req, res) => {
  Chat.createChatroom(req.params.chatID, req.params.chatName, req.params.chatPartner1ID, req.params.chatPartner1Type, req.params.chatPartner2ID, req.params.chatPartner2Type, req.params.message, (errr, resultt) => {
        return res.json({timestamp: req.params.timestamp, send: true}) 
    })
  });

// get IDs and names from all patients
router.get('/getPatients', (req, res) => {
  Chat.retrieveAllPatients((users) => {
    return res.json(users);
  });
});

// get IDs and names from all patients
router.get('/getDoctors', (req, res) => {
  Chat.retrieveAllDoctos((users) => {
    return res.json(users);
  });
});

// get IDs and names from all patients
router.get('/getPharmacies', (req, res) => {
  Chat.retrieveAllPharmacies((users) => {
    return res.json(users);
  });
});

module.exports = router;