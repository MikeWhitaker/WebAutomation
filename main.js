var casper = require("casper").create();
casper.start("http://www.google.nl/", function() {
	var message = "this is the page title: ";
  var title = this.evaluate(function(message) {
    console.log("in title");
    var title = document.title;
    return message + title;
  }, message);
  console.log(title);
});
casper.run();
