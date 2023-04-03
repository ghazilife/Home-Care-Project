**********************************************
1. Abfrage für alle Chatnachrichten

select c.*
	, case when c.fromtype = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = fromid)
		when c.fromtype = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = fromid)
		else (select name from pharmacy where pharmacyID = fromid) end as name_from
	, case when c.totype = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = toid)
		when c.totype = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = toid)
		else (select name from pharmacy where pharmacyID = toid) end as name_to
from chat c 
where ((fromID = 1 and fromtype = 'doctor') OR (toID = 1 and totype = 'doctor'))/********hier die ID und type des users eintragen **********/



Ausgabe:
fromid	|fromtype	|toid	|totype		|message							|timestamp			|read	|name_from		|name_to
1		|"doctor"	|1		|"patient"	|"Hi Kameron, how are you doint"	|"1611504159744"	|true	|"David Thiel"	|"Kameron Lyons"
1		|"patient"	|1		|"doctor"	|"Hi Doc, I am good."				|"1609171359744"	|false	|"Kameron Lyons"|"David Thiel"

ACHTUNG: Timestamp ist als String gespeichert


models



*********************************************************
2. Abfrage: nur Chatnachrichten zwischen 2 Parteien:
select c.*
	, case when c.fromtype = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = fromid)
		when c.fromtype = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = fromid)
		else (select name from pharmacy where pharmacyID = fromid) end as name_from
	, case when c.totype = 'doctor' then (select CONCAT(firstname, ' ', lastname) from doctor where doctorID = toid)
		when c.totype = 'patient' then (select CONCAT(firstname, ' ', lastname) from patient where patientID = toid)
		else (select name from pharmacy where pharmacyID = toid) end as name_to
from chat c 
where (((fromID = 1 and fromtype = 'patient')  /*user*/
			AND (toID = 1 and totype = 'doctor')) /*chatpartner*/
	   OR ((fromID = 1 and fromtype = 'doctor')  /*chatpartner*/
			AND (toID = 1 and totype = 'patient'))) /*user*/

