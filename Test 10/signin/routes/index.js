var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:index');
var url = require('url');
var queryString = require('querystring');

module.exports = function(db) {
	var userManager = require('../models/user')(db);
	//	detail
	router.get('/detail', function(req, res, next) {
		if (req.session.user) {
			res.render('detail', {
				title: '用户详情',
				user: req.session.user
			});
		} else {
			res.redirect('/signin');
		};
	});

	// signin
	router.get('/signin', function(req, res, next) {
		res.render('signin', {
			title: '登陆',
			user: {}
		});
	});

	router.post('/signin', function(req, res, next) {
		userManager.findUser(req.body.username, req.body.password)
			.then(function(user) {
				console.log(user);
				req.session.user = user;
				res.redirect('/detail');
			})
			.catch(function(err) {
				res.render('signin', {
					title: '登陆',
					user: req.body,
					error: '错误的用户名或者密码'
				});
			});
	});

	// signout
	router.get('/signout', function(req, res, next) {
		delete req.session.user;
		res.redirect('/signin');
	});

	//	signup
	router.get('/signup', function(req, res, next) {
		res.render('signup', {
			title: '注册',
			user: {}
		});
	});

	router.get('/regist', function(req, res, next) {
		res.redirect('/signup');
	});

	router.post('/signup', function(req, res, next) {
		var user = req.body;
		userManager.checkUser(user)
			.then(function() {
				userManager.createUser(user);
			})
			.then(function() {
				req.session.user = user;
				res.redirect('/detail');
			})
			.catch(function(error) {
				res.render('signup', {
					title: '注册',
					user: user,
					error: error
				});
			});
	});

	router.all('*', function(req, res, next) {
		req.session.user ? next() : res.redirect('/signin');
	});

	return router;
};