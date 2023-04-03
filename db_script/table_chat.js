var db = require('../database');

  db.query('DROP TABLE IF EXISTS chat;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query('CREATE TABLE chat (chatID text NOT NULL, chatName text NOT NULL, chatPartner1ID integer NOT NULL, chatPartner1Type text NOT NULL, chatPartner2ID integer NOT NULL, chatPartner2Type text NOT NULL, messages json);', (err, res) => { 
    })	
  })