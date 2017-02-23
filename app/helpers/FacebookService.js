var https = require('https');

module.exports = {

   get_friend_list_from_facebook : function(fb_accesstoken, apiPath, callback) {
    
    var options = {
        host: 'graph.facebook.com',
        port: 443,
        path: apiPath + '?access_token=' + fb_accesstoken,
        method: 'GET'
    };

    var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
    var request = https.get(options, function(result){
        result.setEncoding('utf8');
        result.on('data', function(chunk){
            buffer += chunk;
        });
        
        result.on('end', function(){
            try {
                var parsed = JSON.parse(buffer);
            } catch (err) {
                //console.error('Unable to parse response as JSON', err);
                return callback(err,null);
            }

           // pass the relevant data back to the callback
            callback(null,parsed);
        });
    });

    request.on('error', function(e){
        //console.log('error from facebook.getFbData: ' + e.message);
        callback(e,null);
    });

    request.end();
    }
}