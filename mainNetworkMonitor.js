var casper = require('./casper_base');
var utils = require('utils');
var brokenResources = false;
var urlState = {};

var urls = [
	'https://web.archive.org/web/20040602193658/http://www.bbc.co.uk/?ok',
	'http://google.com',
	'https://web.archive.org/web/20030401214345/http://www.bbc.co.uk/?ok',
	'http://bing.com'
]

casper.on('resource.received', function(resource){
//	var dumpObj = { 
//		stage: resource.stage,
//		status: resource.status
//	};
//	
//	utils.dump(dumpObj);
	
	if ((resource.stage === 'end' && resource.status > 400) || (resource.stage === 'end' && resource.status === null )){
		utils.dump(resource.url);
		brokenResources = true;
	}
});

casper.start('http://www.google.com');
casper.each(urls, function(self, url, index){
		self.thenOpen(url, function () {
			urlState[url] = brokenResources;
		});
		self.then(function(){
			brokenResources = false; // why are we doing this here?
		});
});

casper.run(function(){
	utils.dump(urlState);
	casper.exit();
});