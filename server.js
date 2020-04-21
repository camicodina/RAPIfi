// //create-db.js

// var mongo = require('mongodb');

// var new_db = "mongodb://localhost:27017/rapifi";

// mongo.connect(new_db ,(error , db) => {
// 	if (error){
// 		throw error;
// 	}
// 	console.log("Database rapifi created successfully");
// 	//To close the connection
// 	db.close();
// });

var express = require('express');
var path = require('path'); 
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var app = express();
//enter the name of the database in the end 
var new_db = "mongodb://localhost:27017/rapifi";

//create server								
app.get('/',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/index.html');
}).listen(3000);

console.log("Server listening at : 3000");
app.use('/public', express.static(__dirname + '/public'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));
												

												
// Sign-up function starts here. . .
app.post('/sign_up' ,function(req,res){
	var name = req.body.name;
	var email= req.body.email;
	var phone = req.body.phone;
					

	
	var data = {
		"nombre":name,
		"email":email,
		"telefono" : phone
	}
	
	mongo.connect(new_db , function(error , db){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		db.collection("details").insertOne(data, (err , collection) => {
			if(err) throw err;
			console.log("Record inserted successfully");
			console.log(collection);
		});
	});
	
	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/index.html');  

});
													
			

