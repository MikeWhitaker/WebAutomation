var casper = require("casper").create();
var _ = require("underscore");

casper.on('remote.message', function (msg){
	console.log('remote message is: ', msg);
});

casper.start("http://www.google.nl/", function() {
	console.log(window.navigator.userAgent);
	this.fill('form', {q: 'hello world'},true);
})
.wait(1000, function(){
	var data = this.evaluate(function(){
		
		var targetElements = document.querySelectorAll('.g h3 a');
		var data = [];
		for (var i = 0; i < targetElements.length; i++){
			var currentEl = targetElements[i];
			var currentLink = currentEl.getAttribute('href');
			var currentTitle = currentEl.text;
			var currentItem = {
				'link': currentLink,
				'title': currentTitle
			};
			data.push(currentItem);
		}
		
		return data;
	});
	console.log(JSON.stringify(data));
});

casper.run();
