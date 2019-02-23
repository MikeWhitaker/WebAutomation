var casper = require('casper').create();
casper.start('http://www.google.nl/', function(){
	this.capture('./output/test.png');
});
casper.thenOpen('http://www.bing.com/', function(){
	console.log('inside second statement');
	this.capture('./output/test02.png');
});
casper.run();