var https = require('https');

module.exports = {

	get_follower_list_from_github: function(req, res) {

		var username = req.params.username;

		var options = {
			host: 'api.github.com',
			port: 443,
			path: '/users/' + username + '/followers',
			method: 'GET',
			headers: {'user-agent': 'node.js'}
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

				console.log(parsed);
				// pass the relevant data back to the callback
				return res.render('friend_list.ejs', {
					friend_list: parsed
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