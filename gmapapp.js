const request = require('request');
const yargs = require('yargs');

const geocode = require('./positiontest/gmaps');

const argv = yargs
	.options({
		a: {
			demand:true,
			type: 'array',
			alias: 'address',
			describe: 'Search for an address',
			string: true
		}
	})
	.help()
	.argv;


geocode.getLandmarks(argv.address, (errorMessage, results) => {
	if (errorMessage){
		console.log(errorMessage);
	} else{
		console.log(JSON.stringify(results, undefined, 2));
	}
});
