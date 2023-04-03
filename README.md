# Home-Care-Project

A remote patient monitoring system



Homecare App is a remote patient monitoring system. The patient should be able to enter on a mobile phone vital information, such as temperature, pulse, blood pressure, weight and medication intake. The data is requested from the patient once a day and then sent to a server where the information is stored in a database.
The app is developed by:

Ahmed Khelifi
Wenwen Zhang
Johanna Schicktanz
Run using the development build
$ git clone https://github.com/ahmedkhelifi/Home-care.git
$ cd Home-care
Home-care$ npm start
Home-care$ node server
Create a production build for server deployment
$ git clone https://github.com/ahmedkhelifi/Home-care.git
$ cd Home-care
Home-care$ npm run build
Home-care$ node server
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
Furthermore, we store health data as JSON objects in the database.

Show Example of health data
API - Doctor
The API consists of the following endpoints:

Dashboard
The dashboard is intended to inform the doctos when a patient is at high or average health.

GET /getPatients/health/risk Returns all patients with high or average health risk inlcuding the health status points.
Patient
The doctor uses the following API calls to get a list of all existing patients or to add a new patient.

Show API Calls
API - Chat
The API consists of the following endpoints:

Show API Calls
Furthermore, we store the chatroom as JSON objects in the database.

Show Example of health data
