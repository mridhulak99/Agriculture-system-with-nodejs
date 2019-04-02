var fs = require('fs');
var sleep = require('system-sleep');
module.exports.base64_encode=function (name) {
    // read binary data
	sleep(10000);
	file=name+'.jpg';
	
	
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}