var casper = require("casper").create();

casper.on('remote.message', function (msg){
	console.log('remote message is: ', msg);
});

casper.start("http://www.google.nl/", function() {
	this.fill('form', {q: 'hello world'},true);
})
.then(function(){
	this.capture('./output/output.png');
});



casper.run();
