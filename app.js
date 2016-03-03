/*
Drew Carter
12-14-2015
*/





var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var fs 		= require('fs');
var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "tmphunter",
  password: "tmphunter",
  database: "hunter"
});


con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');

});


var port = 8190;
var app = express();
var server = http.createServer(function (req, res) {
	displayForm(res);
});

app.use(bodyParser());


app.use(express.static("public"));

app.post('/', function(req, res){

		
			//all values from form input
			var patientID = req.body.patientID; //patientInfo table
			var fname = req.body.fname;
			var lname = req.body.lname;
			var patientDOB = req.body.patientDOB;

			var patientID = req.body.patientID;  //Apointment table
			var apptDate = req.body.apptDate;
			var patientVisitType = req.body.patientVisitType;
			var visit_apptType = req.body.visit_apptType;
			var visitCopayCollected = req.body.visitCopayCollected;
			var apptBilledPrimary = req.body.apptBilledPrimary;
			var paymentPrimary = req.body.paymentPrimary;
			var apptBilledSecondary = req.body.apptBilledSecondary;
			var paymentSecondary = req.body.paymentSecondary;
			var hospitalReimbursed = req.body.hospitalReimbursed;
			var physicianReimbursed = req.body.physicianReimbursed;
			var ancillaryCharges = req.body.ancillaryCharges;
			var standardReimbursmentForAppt = req.body.standardReimbursmentForAppt;
			var apptComment = req.body.apptComment;

			var	billingNoteID = req.body.billingNoteID;  //billingNote table
			var	billingNoteCode = req.body.billingNoteCode; 
			var	patientID = req.body.patientID;
			var	dateOfService = req.body.dateOfService;

			var	dictationID = req.body.dictationID;
			var	apptDate = req.body.apptDate;
			var	patientID = req.body.patientID;
			
		if (req.body.patientID === '' ) {	//sanity check if submit pressed without data. 
			console.log('duplicate');
		}else { 

switch (req.body.patientInfo || req.body.apptTable || req.body.billingNote || req.body.dictationSubmit) //test for correct submit button
	{

	case req.body.patientInfo:

	
			console.log('Submit Patient Info Form');  //for testing This is from the the name tag html

			con.query('INSERT INTO patientInfo SET ?',{patientID: patientID, patientFirstName: fname, patientLastName: lname, patientDOB: patientDOB},
		 	function(err, res)
			{
			if(err) 
		  	throw err;
			})
			break;
			
//************************  Below are new requirements to implement***************************
case (req.body.apptTable):
			//var patientInfo = req.body.patientInfo;
			//console.log(fname);		//for testing This is from the ID tag in html
			console.log('Submit Appointment Form');  //for testing This is from the the name tag html
			//console.log('i have data');
			//con.query('INSERT INTO patientInfo SET ?',{patientID: patientID, patientFirstName: fname, patientLastName: lname, patientDOB: patientDOB},
/*		 	function(err, res)
			{
			if(err) 
		  	throw err;
			//});
			});
*/break;
case "Submit Billing Note Form":
			//var patientInfo = req.body.patientInfo;
			//console.log(fname);		//for testing This is from the ID tag in html
			console.log('Billing Note Form');  //for testing This is from the the name tag html
			//console.log('i have data');
			//con.query('INSERT INTO patientInfo SET ?',{patientID: patientID, patientFirstName: fname, patientLastName: lname, patientDOB: patientDOB},
/*		 	function(err, res)
			{
			if(err) 
		  	throw err;
			//});
			});
*/break;
case req.body.dictationSubmit :
			//var patientInfo = req.body.patientInfo;
			//console.log(fname);		//for testing This is from the ID tag in html
			console.log('dict id form');  //for testing This is from the the name tag html
			//console.log('i have data');
//			con.query('INSERT INTO patientInfo SET ?',{ dictationID: dictationID, patientID: patientID, apptDate: apptDate },
//		 	function(err, res)
//			{
//			if(err) 
//		  	throw err;
//			//});
//			});
break;

}

}//close else

});//app.postclose


app.listen(port, function(error) {
  if(error) {
    console.log("Failed to launch server: " + error);
  } else {
    console.log("Listening on port " + port);
  }
});




/*

 billingNoteID   | int(4)  | NO   | PRI | NULL    | auto_increment |
| billingNoteCode | int(11) | NO   |     | NULL    |                |
| patientID       | int(5) | NO   |     | NULL    |                |
| dateOfService   | date    | NO   |     | NULL    |              



 dictationID | int(4) | NO   | PRI | NULL    | auto_increment |
| apptDate    | date   | NO   |     | NULL    |                |
| patientID   | int(5) | NO   |     | NULL    |                |









 apptID                      | int(4)       | NO   | PRI | NULL    | auto_increment |
| patientID                   | int(5)       | NO   | MUL | NULL    |                |
| apptDate                    | date         | NO   |     | NULL    |                |
| patientVisitType            | int(11)      | YES  |     | NULL    |                |
| visit_apptType              | varchar(45)  | YES  |     | NULL    |                |
| visitCopayCollected         | char(1)      | YES  |     | NULL    |                |
| apptBilledPrimary           | char(1)      | YES  |     | NULL    |                |
| paymentPrimary              | decimal(5,2) | YES  |     | NULL    |                |
| apptBilledSecondary         | char(1)      | YES  |     | NULL    |                |
| paymentSecondary            | decimal(5,2) | YES  |     | NULL    |                |
| hospitalReimbursed          | decimal(5,2) | YES  |     | NULL    |                |
| physicianReimbursed         | decimal(5,2) | YES  |     | NULL    |                |
| ancillaryCharges            | decimal(5,2) | YES  |     | NULL    |                |
| standardReimbursmentForAppt | decimal(5,2) | YES  |     | NULL    |                |
| apptComment                 | char(60)     | YES  |     | NULL    
*/
