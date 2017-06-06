var bcrypt = require('bcrypt-as-promised');
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:user');
var _ = require('lodash');

module.exports = function(db) {
	var users = db.collection('users');

	return {
		findUser: function(username, password) {
			return users.findOne({username: username}).then(function(user) {
				return user ? bcrypt.compare(password, user.password).then(function(res) {return user;}) : Promise.reject('错误的用户名或者密码');
			});
		},
 
		createUser: function(user) {
			return bcrypt.hash(user.password, 5).then(function(hash) {
				delete user.repeatPassword;
				user.password = hash;
				return users.insert(user);
			});
		},

		checkUser: function(user) {
			var formatErrors = validator.findFormatErrors(user);
			return new Promise(function(resolve, reject) {
				formatErrors ? reject(formatErrors) : resolve(user);
			}).then(function() {
				//	findOne() return document, find() return cursor
				return users.findOne(changeFormat(user)).then(function(existedUser) {
					debug("existed user: ", existedUser);
					return existedUser ? Promise.reject("用户不唯一！") : Promise.resolve(user);
				});
			});
		}
	};
};

// format
// $or: [ { 'name.first' : /^G/ },
//        { birth: { $lt: new Date('01/01/1945') } }
//      ]

function changeFormat(user) {
	return {
		$or: _(user).omit(['password', 'repeatPassword']).toPairs().map(pairToObject).value()
	};
}

function pairToObject(pair) {
	obj = {};
	obj[pair[0]] = pair[1];
	return obj;
}
