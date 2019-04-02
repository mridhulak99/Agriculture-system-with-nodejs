var rpio = require('rpio');

rpio.spiBegin();
//rpio.spiChipSelect(0);                  /* Use CE0 (slave 0) */
//rpio.spiSetCSPolarity(0, rpio.LOW);    /* Commonly chip enable (CE) pins are active low, and this is the default. */
//rpio.spiSetClockDivider(256);           /* MCP3008 max is ~1MHz, 256 == 0.98MHz */
//rpio.spiSetDataMode(0);

//process.stdout.write('\x1b[36m');
//for (var channelHeader = 0; channelHeader <= 7; channelHeader++) {
//    process.stdout.write('ch' + channelHeader.toString() + (channelHeader == 7 ? '\x1b[0m\n' : '\t'));
//}

module.exports.mcp=function() {
	channel=0
	// Prepare TX buffer [trigger byte = 0x01] [channel 0 = 0x80 (128)] [placeholder = 0x01]
	var txBuffer = new Buffer([0x01, (8 + channel << 4), 0x01]);
	var rxBuffer = new Buffer(txBuffer.byteLength);

	rpio.spiTransfer(txBuffer, rxBuffer, txBuffer.length); // Send TX buffer and recieve RX buffer

	// Extract value from output buffer. Ignore first byte.
	var junk = rxBuffer[0],
		MSB = rxBuffer[1],
		LSB = rxBuffer[2];

	// Ignore first six bits of MSB, bit shift MSB 8 positions and
	// finally combine LSB and MSB to get a full 10 bit value
	var value = ((MSB & 3) << 8) + LSB;
	
	ch0=value; 
	
	channel=1
	// Prepare TX buffer [trigger byte = 0x01] [channel 0 = 0x80 (128)] [placeholder = 0x01]
	var txBuffer = new Buffer([0x01, (8 + channel << 4), 0x01]);
	var rxBuffer = new Buffer(txBuffer.byteLength);

	rpio.spiTransfer(txBuffer, rxBuffer, txBuffer.length); // Send TX buffer and recieve RX buffer

	// Extract value from output buffer. Ignore first byte.
	var junk = rxBuffer[0],
		MSB = rxBuffer[1],
		LSB = rxBuffer[2];

	// Ignore first six bits of MSB, bit shift MSB 8 positions and
	// finally combine LSB and MSB to get a full 10 bit value
	var value = ((MSB & 3) << 8) + LSB;

	ch1=value;
	
	channel=2
	// Prepare TX buffer [trigger byte = 0x01] [channel 0 = 0x80 (128)] [placeholder = 0x01]
	var txBuffer = new Buffer([0x01, (8 + channel << 4), 0x01]);
	var rxBuffer = new Buffer(txBuffer.byteLength);

	rpio.spiTransfer(txBuffer, rxBuffer, txBuffer.length); // Send TX buffer and recieve RX buffer

	// Extract value from output buffer. Ignore first byte.
	var junk = rxBuffer[0],
		MSB = rxBuffer[1],
		LSB = rxBuffer[2];

	// Ignore first six bits of MSB, bit shift MSB 8 positions and
	// finally combine LSB and MSB to get a full 10 bit value
	var value = ((MSB & 3) << 8) + LSB;

	ch2=value;
	return([ch0,ch1,ch2]);
	
}

/*process.on('SIGTERM', function () {

    process.exit(0);
});

process.on('SIGINT', function () {
    process.exit(0);
});

process.on('exit', function () {
    console.log('\nShutting down, performing GPIO cleanup');
    rpio.spiEnd();
    process.exit(0);
});*/

