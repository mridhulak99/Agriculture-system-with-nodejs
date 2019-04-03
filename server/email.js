var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gamil',
  auth: {
    user: 'rohanluthra14@gmail.com',
    pass: 'Tanisha!23'
  }
});

var mailOptions = {
  from: 'rohanluthra14@gmail.com',
  to: 'mridhulak99@gmail.com',
  subject: 'Pest Alert',
  text: 'HELP'
};
module.exports.sendemail=function(){
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }

	});
}