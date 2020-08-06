
var express = require('express');
var path = require('path'); 
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var crypto = require('crypto');

var app = express();
//enter the name of the database in the end 
var new_db = "mongodb://localhost:27017/mongodb";

//create server								
app.get('/',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/index.html');
}).listen(8080);

console.log("Server listening at : 8080");
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
	console.log("holi")
	mongo.connect(new_db , function(error , db){
		if (error){
			console.log("ERROR")
			throw error;
		}
		var dbo = db.db("rapifi");

		console.log("connected to database successfully");
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		dbo.collection('details',(err, collection)=>{
			collection.insertOne(data, (err , collection) => {
			if(err) throw err;
			
			console.log("Record inserted successfully");
			console.log(collection);
		});
		})
	});
	
	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/index.html');  

});
													
			

