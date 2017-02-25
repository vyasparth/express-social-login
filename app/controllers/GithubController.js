// load up https module to make XHR requests
var https = require('https');

// load up the user model
var User = require('../models/user');

var _ = require('lodash');

module.exports = {

	get_follower_list_from_github: function(req, res) {

		var username = req.params.username;

		var options = {
			host: 'api.github.com',
			port: 443,
			path: '/users/' + username + '/followers',
			method: 'GET',
			headers: {
				'user-agent': 'node.js'
			}
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

				var mapped_friend_ids = _.map(parsed, 'id');

				User.aggregate({
						$match: {
							'github.id': {
								$in: mapped_friend_ids
							},
							'github.email': {
								$ne: ''
							}
						}
					})
					.project({
						'_id': 0,
						'name': '$github.name',
						'email': '$github.email'
					}).exec(function(err, github_users) {

						if (err)
							throw err;
						else {
							// facebook_users

							// pass the relevant data back to the callback
							return res.render('friend_list.ejs', {
								friend_list: github_users
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