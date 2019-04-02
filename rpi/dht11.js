var rpiDhtSensor = require('rpi-dht-sensor');
var dht = new rpiDhtSensor.DHT11(2);

module.exports.dht=function () {
	console.log("hello");
	var readout = dht.read();
	var temp=0,humidity=0;
	while (temp==0 && humidity==0){
	readout=dht.read();
	temp=readout.temperature.toFixed(2);
	humidity=readout.humidity.toFixed(2);
	}
	return ([temp,humidity]);
	console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' + 'humidity: ' + readout.humidity.toFixed(2) + '%');
}
