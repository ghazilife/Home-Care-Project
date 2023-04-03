# Home-Care-Project
A remote patient monitoring system



Homecare App is a remote patient monitoring system. The patient should be able to enter on a mobile phone vital information, such as temperature, pulse, blood pressure, weight and medication intake. The data is requested from the patient once a day and then sent to a server where the information is stored in a database.
The app is developed by:

MO JUNED

Run using the development build

Home-Care-Project npm start
Home-Care-Project node server
Create a production build for server deployment

Built with
Frontend: React.js + echarts.js
Server: Node.js
Database: Postgresql
Progress
What's finished
 doctor’s interface: create new patient profile
 doctor’s interface: dashboard showing patiens with abnormal health data or missing entries
 doctor’s interface: overview of all patients
 doctor’s interface: view a specific patient's data
 doctor’s interface: send and receive chat messages from and to patients and pharmacies
 patient’s interface: health page overview
 patient’s interface: enter health data
 patient’s interface: confirm that data were missed to enter on a specific day
 patient’s interface: display health data using beautiful graphs
 patient’s interface: send and receive chat messages from and to doctors and pharmacies
 pharmacy’s interface: send and receive chat messages from and to doctors and patients
What is pending:
 in-depth UX-Design
 comfort functions such as sanitiy check of entered data, reminder to update data, forwarding of chat messages to email adress, etc.
Structural explanation of project folders
Home-Care:
This is the main folder. It contains files that are required for setting up the node server and the packages to be loaded, and it include all of the following folders.

build:
This folder contains the "production build" containing the code, which in the end is executed on the client machine.

database:
This folder is used for the establishment of connection to the database.

db_script:
This folder contains scripts, with which the tables and test data are created in the database.

models:
This folder contains the database requests.

node_modules:
This folder contains the previously installed packages.

public:
This folder contains the index.html for the initial loading of the page by the browser.

routes:
This folder contains requests from and to the server.

src:
This folder contains the design and functions of the pages including the graphs. In this src folder it is necessary that an index.js file is present at the end of every path, so that the server can assign the path. The subfolder "components" contains components, that may be used more times, this prevents code duplication. The subfolder "containers" contains the logic of when and which component is called.

websocket:
This folder establishes the bidirectional connection between the client and the websocket and sends the messages to the respective reciever and to the database. In addition, a ping message is sent to all clients every 8 seconds. If no pong message is received within 20 seconds, the client is regarded as "offline".

API - Login
All parties in the app share the same login API.

The API consists of the following endpoints:

POST /api/login Checks if user exists and then return its type and whether login was successful
If the user input correct login data, the user receives the following JSON object:

Case patient:

 {"authenticated": "true", "user": {"patientid": "id", "username": "username", "name": "name", "type": "patient"} }
Case doctor:

 {"authenticated": "true", "user": {"doctorid": "id", "username": "username", "name": "name", "type": "patient"} }
Case pharmacy:

 {"authenticated": "true", "user": {"pharmacyid": "id", "username": "username", "name": "name", "type": "patient"} }
If the login data is wrong (either password is wrong or username not found), following reply is generated:

 {"authenticated": "false" }
API - Patient
The API consists of the following endpoints:

Health
We've build an API call that gets a summary of the patient's health and multiple smaller API calls the patient uses to submit new data

Show API Calls
GET /health/:username Returns the health status of patient including medication, temperature, blood Pressure, pulse, weight and the patient's pending tasks.

POST /updatePatient/:patientID Patient's data is updated.

POST /medication/pending/:username/:title Patient confirms that the medication was taken within the allowed timeframe.

POST /medication/missed/:username/:title/:timestamp Patient either confirms that the medication was taken or forgotten once the allowed timeframe has passed.

POST /temperature/pending/:username Patient confirms that temperature was measure within the allowed timeframe.

POST /temperature/missed/:username/:title/:timestamp Patient either confirms that temperature was measured or forgotten once the allowed timeframe has passed.

POST /weight/pending/:username/:title Patient confirms that the weight was measure within the allowed timeframe.

POST /weight/missed/:username/:title/:timestamp Patient either confirms that the weight was measured or forgotten once the allowed timeframe has passed.

POST /blood_pressure/pending/:username Patient confirms that blood pressure was measure within the allowed timeframe.

POST /blood_pressure/missed/:username/:title/:timestamp Patient either confirms that blood pressure was measured or forgotten once the allowed timeframe has passed.

POST /pulse/pending/:username Patient confirms that pulse was measure within the allowed timeframe.

POST /pulse/missed/:username/:title/:timestamp Patient either confirms that pulse was measured or forgotten once the allowed timeframe has passed.

POST /medication Patient either confirms that medication was taken or forgotten once the allowed timeframe has passed.

Furthermore, we store health data as JSON objects in the database.

Show Example of health data
medication is saved in the Database as follows:

{"medication": [
       {"title":"Azathioprine","ammount":1,"duration":1,"history":[
   	{"timestamp": 1609879883768, "measured": true},
 	{"timestamp": 1609879883768, "measured": true},
 	{"timestamp": 1609966283768, "measured": true},
 	{"timestamp": 1610052683768, "measured": true},
 	{"timestamp": 1610139083768, "measured": true},
 	{"timestamp": 1610225483768, "measured": true}
             ],
         "assigned_on": 1609707083768},
       {"title":"Ciclosporin","ammount":1,"duration":2,"history":[
   	{"timestamp": 1609707083768, "measured": true},
 	{"timestamp": 1609879883768, "measured": true},
 	{"timestamp": 1610052683768, "measured": true},
 	{"timestamp": 1610225483768, "measured": true},
 	{"timestamp": 1610311883768, "measured": true}
             ],
     "assigned_on": 1609707083768},
  ]}
Temperature is saved in the Database as follows:

 {"temperature":[
 	{"temperature":36.9,"timestamp": 1609707083768, "measured": true},
 	{"temperature":36.8,"timestamp": 1609879883768, "measured": true},
 	{"temperature":36.5,"timestamp": 1610052683768, "measured": true},
 	{"temperature":36.9,"timestamp": 1610225483768, "measured": true},
 	{"temperature":37.1,"timestamp": 1610311883768, "measured": true}
 	]},
 ]}
Weight is saved in the Database as follows:

 {"weight":[
 	{"weight":72,"timestamp": 1609707083768, "measured": true},
 	{"weight":68,"timestamp": 1609879883768, "measured": true},
 	{"weight":70,"timestamp": 1610052683768, "measured": true},
 	{"weight":69,"timestamp": 1610225483768, "measured": true},
 	{"weight":71,"timestamp": 1610311883768, "measured": true}
 	]},
 ]}
pulse is saved in the Database as follows:

 {"pulse":[
 	{"pulse":46,"timestamp": 1609707083768, "measured": true},
 	{"pulse":46,"timestamp": 1609879883768, "measured": true},
 	{"pulse":46,"timestamp": 1610052683768, "measured": true},
 	{"pulse":46,"timestamp": 1610225483768, "measured": true},
 	{"pulse":47,"timestamp": 1610311883768, "measured": true}
 	]},
 ]}
blood_pressure is saved in the Database as follows:

 {"blood_pressure":[
 	{"bloodpres_dia": 120, "bloodpres_sys": 80, "timestamp": 1609707083768, "measured": true},
 	{"bloodpres_dia": 122, "bloodpres_sys": 76, "timestamp": 1609879883768, "measured": true},
 	{"bloodpres_dia": 110, "bloodpres_sys": 83, "timestamp": 1610052683768, "measured": true},
 	{"bloodpres_dia": 123, "bloodpres_sys": 81, "timestamp": 1610225483768, "measured": true},
 	{"bloodpres_dia": 115, "bloodpres_sys": 77, "timestamp": 1610311883768, "measured": true}
 	]},
 ]}
API - Doctor
The API consists of the following endpoints:

Dashboard
The dashboard is intended to inform the doctos when a patient is at high or average health.

GET /getPatients/health/risk Returns all patients with high or average health risk inlcuding the health status points.
Patient
The doctor uses the following API calls to get a list of all existing patients or to add a new patient.

Show API Calls
GET /getPatients Returns a list of all patients inlcuding the health status points.

POST /addPatient Creates a new Patient.

POST /medication Assigns a medication to a patient.

API - Chat
The API consists of the following endpoints:

Show API Calls
GET /getAllChatrooms Returns all messages from database

GET /getAllChatroomsFromUser/:id/:type Returns all messages from one person (sent and received)

GET /getAllChatroomsFromTwoParties/:chatPartner1ID/:chatPartner1Type/:chatPartner2ID/:chatPartner2Type Returns all messages from two parties

POST /newChatroom/:chatID/:chatName/:fromID/:fromType/:toID/:toType Creates a new chatroom

POST /updateMessage/:chatID/:chatName/:chatPartner1ID/:chatPartner1Type/:chatPartner2ID/:chatPartner2Type/:message Update the message entry

GET /getPatients Returns the IDs and names from all patients

GET /getDoctors Returns the IDs and names from all doctors

GET /getPharmacies Returns the IDs and names from all pharmacies

Furthermore, we store the chatroom as JSON objects in the database.

Show Example of health data
messages is saved in the Database as follows:

   {"messages":[
   	{"timestamp":1613118472724,"type":"created","read":true}
	{"message":"Hello", "fromType":"doctor","toType":"patient", "timestamp":1613118475705, "read":true, "type":"message"}
	{"message":"hello doctor", "fromType": "patient", "toType": "doctor", "timestamp":1613220860614, "read":false, "type":"message"}
	]}
