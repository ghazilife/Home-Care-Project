const db = require('../database');

class Chat {
	/*returns all chatrooms from database*/
  static retrieveAllChatrooms(callback) {
    db.query("select c.* , case when c.chatPartner1Type = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = chatPartner1ID) when c.chatPartner1Type = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = chatPartner1ID) else (select name from pharmacy where pharmacyID = chatPartner1ID) end as name_chatPartner1, case when c.chatPartner2Type = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = chatPartner2ID) when c.chatPartner2Type = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = chatPartner2ID) else (select name from pharmacy where pharmacyID = chatPartner2ID) end as name_chatPartner2 from chat c", (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  /*returns a certain row from table chat by chatID*/
  static retrieveAllChatroomsWithID (ID, callback) {
    db.query("SELECT * FROM chat WHERE chatID = $1", [ID], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	/*returns all chatrooms from one user by ID and type (patient, doctor or pharmacy)*/
  static retrieveAllChatroomsFromUser (ID, type, callback) {
    db.query("select c.* , case when c.chatPartner1Type = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = chatPartner1ID) when c.chatPartner1Type = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = chatPartner1ID) else (select name from pharmacy where pharmacyID = chatPartner1ID) end as name_chatPartner1ID , case when c.chatPartner2Type = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = chatPartner2ID) when c.chatPartner2Type = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = chatPartner2ID) else (select name from pharmacy where pharmacyID = chatPartner2ID) end as name_chatPartner2ID from chat c where ((chatPartner1ID = $1 and chatPartner1Type = $2) OR (chatPartner2ID = $1 and chatPartner2Type = $2))", [ID, type], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	/*returns all chatrooms between two persons*/
  static retrieveAllChatroomsFromTwoParties (chatPartner1ID, chatPartner1Type, chatPartner2ID, chatPartner2Type, callback) {
    db.query("select c.* , case when c.chatPartner1Type = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = chatPartner1ID)	when c.chatPartner1Type = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = chatPartner1ID) else (select name from pharmacy where pharmacyID = chatPartner1ID) end as name_chatPartner1ID , case when c.chatPartner2Type = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = chatPartner2ID) when c.chatPartner2Type = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = chatPartner2ID) else (select name from pharmacy where pharmacyID = chatPartner2ID) end as name_chatPartner2ID from chat c  where (((chatPartner1ID = $1 and chatPartner1Type = $2) AND (chatPartner2ID = $3 and chatPartner2Type = $4)) OR ((chatPartner1ID = $3 and chatPartner1Type = $4) AND (chatPartner2ID = $1 and chatPartner2Type = $2)))", [chatPartner1ID, chatPartner1Type, chatPartner2ID, chatPartner2Type], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

	/*insert a new row in database table chat*/
  static createChatroom (chatID, chatName, chatPartner1ID, chatPartner1Type, chatPartner2ID, chatPartner2Type, messages, callback) {
      db.query('INSERT INTO chat (chatID, chatName, chatPartner1ID, chatPartner1Type, chatPartner2ID, chatPartner2Type, messages) VALUES ($1, $2, $3, $4, $5, $6, $7);', [chatID, chatName, chatPartner1ID, chatPartner1Type, chatPartner2ID, chatPartner2Type, messages], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
  
  /*update the message field in table chat by chatID and chatPartner1Type*/
   static updateMessages (chatID, chatPartner1Type, messages, callback) {
      db.query('UPDATE chat set messages = $3 where chatID = $1 and chatPartner1Type = $2;', [chatID, chatPartner1Type, messages], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
  
  /*returns patientID and name (first and lastname) from all rows in table patient*/
  static retrieveAllPatients (callback) {
    db.query("SELECT patientID as ID, CONCAT(firstname, ' ', lastname) as name from patient", (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
  
  /*returns doctorID and name (first and lastname) from all rows in table doctor*/
    static retrieveAllDoctos (callback) {
    db.query("SELECT doctorID as ID, CONCAT(firstname, ' ', lastname) as name from doctor", (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
  
  /*returns pharmacyID and name from all rows in table pharmacy*/
    static retrieveAllPharmacies (callback) {
    db.query("SELECT pharmacyID as ID, name from pharmacy", (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Chat;