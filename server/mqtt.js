var express = require('express');
var mqtt = require('mqtt');
var router = express.Router();
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var AWS = require("aws-sdk");
var email=require('./email');
let awsConfig = {
    "region": "us-east-1",
    "accessKeyId": "*", "secretAccessKey": "*"
};
AWS.config.update(awsConfig);

var mqtt_url =  'mqtt://localhost:1883';
var topic =  'hi';
var client  = mqtt.connect('mqtt://localhost:1883',{
   username: 'mridhu',
   password: 'mridhu'

});

var rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'});
client.on('connect', function() {
	console.log('conected');
});
 
client.subscribe(topic, function() {
client.on('message', function(topic, msg, pkt) {	
		var json = JSON.parse(msg);
		//var buf = Buffer.from(json.photo, 'base64'); 
        //console.log("dateandtime: " + json.dateandtime);
		//console.log(json.photo);
		var params = {
			  Image: {
				Bytes: new Buffer(json.photo, 'base64')
				}, 
			  MaxLabels: 123, 
			  MinConfidence: 70
			 };
			 rekognition.detectLabels(params, function(err, data) {
			   if (err) console.log(err, err.stack); // an error occurred
			   else {
				    console.log(data); 
					json.insect=0;
					json.outcome=data;
					for(var i=0; i<data.Labels.length;i++){
						if(data.Labels[i].Name==="Human"){
							json.insect=1;
							//email.sendemail();
							break;
						}
					}
				    var url = "mongodb://localhost:27017/";
					MongoClient.connect(url, function(err, db) {
						if (err) throw err;
						var dbo = db.db("agriculture");
						dbo.collection("values").insertOne(json, function(err, res) {
						if (err) throw err;
						console.log("1 document inserted");
						db.close();
					  });
					});
			   }         
			  
			 });
		
   });
});
 