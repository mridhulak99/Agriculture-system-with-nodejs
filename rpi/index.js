var dht11=require("./dht11.js");
var mcp3008=require("./mcp3008.js");
var camera=require("./picture");
var base=require("./base64");
var mqtt=require("./mqttconnect");

var dateandtime=new Date().toISOString();
console.log(dateandtime);
var dht=dht11.dht();
console.log(dht[0],dht[1]);
var mcp=mcp3008.mcp();
console.log(mcp[0],mcp[1],mcp[2]);
camera.cam(dateandtime)

var pic=base.base64_encode(dateandtime);
console.log(pic);
var fi=
	'{"dateandtime":"'+dateandtime+
	'","temperature":"'+dht[0]+
	'","humidity":"'+dht[1]+
	'","rain":"'+mcp[0]+
	'","moisture":"'+mcp[1]+
	'","light":"'+mcp[2]+
	'","photo":"'+pic+
	'"}';

mqtt.connect(fi);
    
   
