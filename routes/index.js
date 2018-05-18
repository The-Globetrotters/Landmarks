var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', ensureAuthenticated,function(req, res, next) {
  res.render('index', { title: 'Members' });
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		var uname;
		uname = req.user.name;
		module.exports.uname = uname;
		return next();
	}
	res.redirect('/users/login');
}

router.post('/saveland',
	ensureAuthenticated,
  function(req, res) {
  	console.log('at saveland for ', req.user.name, 'saving', req.body.landname);

  	User.getUserByUsername(req.user.name,function(err,user){
		if(err){
			console.log("some err", err);
			throw err;

		}
		if(!user){
			console.log('no user found');
			return;
		}

		User.appendFav(user, req.body.landname, function(err){

			if(err) {
				console.log('some other err', err);
				return;
			}
			console.log('successfully added', req.body.landname, 'to ', req.user.name);

		});
	});
  });

module.exports = router;
