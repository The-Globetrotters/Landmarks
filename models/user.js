var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.connection;

//user schema 
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},

	password: {
		type: String
	},

	email: {
		type: String 
	},

	name: {
		type: String 
	},

	profileimage: {
		type: String 
	},

	favlands: [{type: String}]

});


var User = module.exports = mongoose.model('User', UserSchema);

module.exports.appendFav = function(regUser, landname, callback){
	console.log('appending fav', regUser, landname);
	regUser.favlands.addToSet(landname);
	regUser.save(callback)
	console.log('done appending fav', regUser, landname);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    // res === true
    	callback(null, isMatch);
	});
}

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
        // Store hash in your password DB.
        	newUser.password = hash;
        	newUser.save(callback);

    	});
	});
}


