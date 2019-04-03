var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var express = require('express');
var app = express();

app.get('/values', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','GET');
	res.setHeader('Access-Control-Allow-Headers','content-type');
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("agriculture");
		dbo.collection("values").find({}).toArray(function(err, result) {
		if (err) throw err;
		//console.log(result);
		db.close();
		res.send(result);
		//res.send({"hi":"hi"});
		});
	});
})
app.listen(5002);
