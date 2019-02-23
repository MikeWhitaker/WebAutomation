var casper = require("casper").create();

casper.on('remote.message', function (msg){
	console.log('remote message is: ', msg);
});

casper.start("http://www.google.nl/", function() {
  var title = this.getTitle();
  console.log(title);
});
casper.run();
