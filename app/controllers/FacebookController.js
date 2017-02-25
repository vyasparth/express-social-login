// load up https module to make XHR requests
var https = require('https');

// load up the user model
var User = require('../models/user');
var _ = require('lodash');

module.exports = {

		get_friend_list_from_facebook: function(req, res) {

			var fb_accesstoken = req.params.token;
			var id = req.params.id;

			var options = {
				host: 'graph.facebook.com',
				port: 443,
				path: '/me/friends?access_token=' + fb_accesstoken,
				method: 'GET'
			};

			var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
			var request = https.get(options, function(result) {
					result.setEncoding('utf8');
					result.on('data', function(chunk) {

						buffer += chunk;
					});

					result.on('end', function() {
							try {
								var parsed = JSON.parse(buffer);
							} catch (err) {
								//console.error('Unable to parse response as JSON', err);
								return res.render('index.ejs');
							}

							var friend_list = parsed.data;
							var total_friend_count = parsed.summary.total_count;

							var mapped_friend_ids = _.map(friend_list, 'id');

							User.aggregate({
								$match: {
									'facebook.id': {
										$in: mapped_friend_ids
									},
									'facebook.email': {
										$ne: ''
									}
								}
							})
							.project({
								'_id': 0,
								'name': '$facebook.name',
								'email': '$facebook.email'
							}).exec(function(err, facebook_users) {

									if (err)
										throw err;
									else {
										
										// pass the relevant data back to the callback
										return res.render('friend_list.ejs', {
											friend_list: facebook_users
										});
									}
								});

							});
					});

				request.on('error', function(e) {
					//console.log('error from facebook.getFbData: ' + e.message);
					return res.render('index.ejs');
				});

				request.end();
			}
		}