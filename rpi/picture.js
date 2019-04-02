const PiCamera = require('pi-camera');
var fs = require('fs');

module.exports.cam=function(dateandtime){
	
	const clickpic = new PiCamera({
	  mode: 'photo',
	  output: '${images}'+dateandtime+'.jpg',
	  width:  640,
	  height: 480,
	  nopreview: true,
	});
	clickpic.snap()
    .then((result) => {
    console.log("clicked");
	return 1;
    })
    .catch((error) => {
    console.log("error in camera")
	return 0;
    });
	
}


 
