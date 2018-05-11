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
	}

});

/*var FavSchema = mongoose.Schema({
	username: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserSchema',
		index: true
	}],

	landmarks: {
		type: String
	}

});

var FavLandmarks = module.exports = mongoose.model('FavLandmarks', FavSchema);*/

var User = module.exports = mongoose.model('User', UserSchema);
var FavLandmarks = module.exports = mongoose.model('FavLandmarks', FavSchema);

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
	/*FavLandmarks.findById(id, callback);*/
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



