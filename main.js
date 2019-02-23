var casper = require('casper').create();
casper.start('http://www.google.nl/', function(){
	this.capture('./output/test.png')
});
casper.run();