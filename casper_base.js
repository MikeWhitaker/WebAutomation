var require = patchRequire(require);
var casper = require('casper').create();

/*
	inject remote scripts for use in casper:
		var casper = require('casper').create({
			remoteScripts: [<script path>],
		});
*/

casper.on('remote.message', function (msg){
	console.log('remote message is: ', msg);
});

module.exports = casper;