var Chat = require('../models/chat');

function handle_request(wss, WebSocket) {

  var online = []
  var ping = JSON.stringify({type: 'ping'})

  wss.on('connection', function connection(ws) {

     ws.on('message', function incoming(data) {

        let  m = JSON.parse(data)

          if (m.type == 'online') {
              online.push({id: m.id, name: m.name, idType: m.idType, lastAlive: Math.round((new Date()).getTime() / 1000)})
              wss.clients.forEach(function each(client) {
                if (client == ws) {
                  client.id = m.id
                  client.name = m.name
                  client.idType = m.idType
               
                  Chat.retrieveAllChatroomsFromUser(m.id, m.idType, result => {
                    result.forEach(chatroom => {
                      // console.log(chatroom);
                      chatroom.chatroom_id = chatroom.chatid
                      chatroom.name = chatroom.chatname

                      chatroom.fromID = chatroom.chatpartner1id
                      chatroom.fromType = chatroom.chatpartner1type
                      chatroom.from = chatroom.name_chatpartner1id

                      chatroom.toID = chatroom.chatpartner2id
                      chatroom.toType = chatroom.chatpartner2type
                      chatroom.to = chatroom.name_chatpartner2id

                    })
                    client.send( JSON.stringify({type:'set_chatrooms', chatrooms: result}) );
                  })
                }
              })
              console.log(m.idType + ' ' + m.name + ' online (ID: ' + m.id + ')')

          }
          //check if user still responsive
          if (m.type == 'pong') {
            online.forEach(function each(client) {
              if(client.id == m.id && client.idType == m.idType) client.lastAlive = Math.round((new Date()).getTime() / 1000);
            })
          }

          //check if user still responsive
          if (m.type == 'chatroom_update') {
            send_chatroom(m.chatroom, m.to_id, m.to_type)
            save_chatroom_in_db(m.chatroom)
          }

      });

  })

    //Forward Message to Clients
    function send_chatroom(chatroom, to_id, to_type) {
            wss.clients.forEach(function each(client) {
                if ( client.id == to_id && client.idType == to_type && client.readyState === WebSocket.OPEN && !client.master) {
                    client.send( JSON.stringify({type: 'update_chatroom', chatroom: chatroom}));
                }
            });
    }

    //Forward Message to database
    function save_chatroom_in_db(chatroom) {
      console.log(chatroom)
      Chat.retrieveAllChatroomsWithID(chatroom.chatroom_id, result => {
        if(result.length == 0) {
          Chat.createChatroom(chatroom.chatroom_id, chatroom.name, chatroom.fromID, chatroom.fromType, chatroom.toID, chatroom.toType, chatroom.messages, result => {})
        } else {
          Chat.updateMessages(chatroom.chatroom_id, chatroom.fromType, chatroom.messages, result => {})
        }
      })
    }

  //SEND PING INTERVAL
  setInterval(function(){
   if(online.length != 0) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(ping);
      }
    });
   }
  }, 8000);

  //DETECT OFFLINE USERS who didn't respond to ping after interval
  setInterval(function(){
   if(online.length != 0) {
    online.forEach(function each(client) {
      let currentTime = Math.round((new Date()).getTime() / 1000)
      if (currentTime - client.lastAlive > 10) {
        console.log(client.idType + ' ' + client.name + " Disconnected " )
        online = online.filter((item) => item.id !== client.id && item.idType !== client.idType  );
      }
    });
   }
  }, 20000);


}
module.exports = {handle_request}
