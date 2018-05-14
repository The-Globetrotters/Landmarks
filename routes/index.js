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



module.exports = router;
