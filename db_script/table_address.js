  var db = require('../database');

  db.query('DROP TABLE IF EXISTS address;', (err, res) => {
   if (err.error)
     return console.log(err.error);
    db.query('CREATE TABLE address( addressid serial NOT NULL, street text NULL, houseno text NOT NULL, zip text NOT NULL, city text NULL, country text NOT NULL, telephone text NOT NULL, email text NOT NULL, PRIMARY KEY (addressid) );', (err, res) => { 
    db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Charitéplatz', '1', '10117', 'Berlin', 'Germany', '004930123456', 'd.thiel@charite-test.de'], (err, res) => { })
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Charitéplatz', '1', '10117', 'Berlin', 'Germany', '004930123456', 'a.klein@charite-test.de'], (err, res) => { })
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Charitéplatz', '1', '10117', 'Berlin', 'Germany', '004930123456', 's.afzal@charite-test.de'], (err, res) => { })
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Hauptstraße', '17', '16766', 'Kremmen', 'Germany', '0049176123456', 'k_Lyons@testmail.de'], (err, res) => { })
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['An der Linde', '4', '08956', 'Großeich', 'Germany', '00491761894566', 'e.Whiteley@testmail.de'], (err, res) => { })
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Steig', '23', '19322', 'Weisen', 'Germany', '00491761894566', 'm_Arias@testmail.de'], (err, res) => { })
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Dorfstraße', '19', '16845', 'Breddin', 'Germany', '0049176258994566', 'C_Lancaster@testmail.de'], (err, res) => { })
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Lange Straße', '192', '16727', 'Velten', 'Germany', '0049176258994566', 'Crane_Al@testmail.de'], (err, res) => { })
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Akazienstraße', '2', '15698', 'Teuplitz', 'Germany', '00491758994566', 'H_Brewer@testmail.de'], (err, res) => { })
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Möllnerstraße', '22', '14471', 'Potsdam', 'Germany', '0049151258994566', 'N_Chester@testmail.de'], (err, res) => { })
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Am Übergang', '5', '17039', 'Staven', 'Germany', '0049151258998796', 'Z_John@testmail.de'], (err, res) => { })
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Mittelstraße', '45', '23992', 'Glasin', 'Germany', '0049151238796', 'Knights1998@testmail.de'], (err, res) => { }) 
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Luisenstraße', '10', '19230', 'Hoort', 'Germany', '0049151238436', 'Flowers_p@testmail.de'], (err, res) => { }) 
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Innstraße', '51', '19069', 'Seehof', 'Germany', '0049161238436', 'P_Montes@testmail.de'], (err, res) => { }) 
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Weserstraße', '3', '18551', 'Lohme', 'Germany', '0049161299436', 'D_Markham@testmail.de'], (err, res) => { }) 
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Herbertsteig', '14', '18230', 'Rerik', 'Germany', '0049161299878', 'AGlenn@testmail.de'], (err, res) => { }) 
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Lohnestraße', '7', '17375', 'Luckkow', 'Germany', '004917798653265', 'Begum_A@testmail.de'], (err, res) => { }) 
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Buckowallee', '67', '17217', 'Penzlin', 'Germany', '0049161299878', 'L_Forrest@testmail.de'], (err, res) => { }) 
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Riesersstraße', '29', '38828', 'Wegeleben', 'Germany', '00491612912348', 'E_Adamson@testmail.de'], (err, res) => { }) 
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Grüner Weg', '11', '39606', 'Iden', 'Germany', '0049167845978', 'Viktoria_Floyd@testmail.de'], (err, res) => { }) 
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Charitéplatz', '2', '10117', 'Berlin', 'Germany', '0049307789561', 'info@apotheke-charite-test.de'], (err, res) => { }) 
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Hauptstraße', '12', '16727', 'Velten', 'Germany', '0049332907789561', 'info@hirsch-apotheke-test.de'], (err, res) => { }) 
	db.query('INSERT INTO address (street, houseno, zip, city, country, telephone, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',
		['Dreilindenplatz', '1', '14469', 'Potsdam', 'Germany', '00493331798561', 'info@dreilinden-apotheke-test.de'], (err, res) => { }) 
	})
 })
