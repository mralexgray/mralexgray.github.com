var casper = require('casper').create();
var errors = [];

// log into the site first
casper.start('http://mrgray.com/globaljs', function () {

	this.on("page.error", function (msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		errors.push(msg);
	});
})
casper.run(function () {
	if (errors.length > 0) {
		this.echo(errors.length + ' Javascript errors found', "WARNING");
	} else {
		this.echo(errors.length + ' Javascript errors found', "INFO");
	}
	casper.exit();
});

// Then run the script, in my case I called it "check_for_errors.js"

 // casperjs check_for_errors.js

//   this.fill('form[action="/session"]',
//   {
//   'login[email]': 'username',
//   'login[password]': 'password'
//   }, true);
// });
// 
// // add as many pages as you would like...
// casper.thenOpen('http://mrgray.com/globaljs');
