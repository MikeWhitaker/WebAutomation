var casper = require("casper").create();
var fs = require("fs");

var data; //

casper.on('remote.message', function (msg){
	console.log('remote message is: ', msg);
});

casper.start("http://www.google.nl/", function() {
	console.log(window.navigator.userAgent);
	this.fill('form', {q: 'hello world'},true);
})
.wait(1000, function(){
	data = this.evaluate(function(){
		
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

casper.run(function(){
	fs.write('./output.json', JSON.stringify(data, null, '\t'));
	this.exit();
});
