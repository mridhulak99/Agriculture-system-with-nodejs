var mqtt = require('mqtt');
var url = require('url');
var fs = require('fs');

var mqtt_url =  'mqtt://54.160.238.67:1883';
var topic =  'test';
var client  = mqtt.connect('mqtt://54.160.238.67:1883',{
   username: 'mridhu',
   password: 'mridhu',


});

client.on('connect', function() {
	console.log('conected');

});

module.exports.connect=function(fi){
	
	client.publish('hi', fi, function() {
      	console.log("sent");
		var js=JSON.parse(fi);
		fs.unlinkSync(js.dateandtime+".jpg");

	});
	client.end();
}