// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '134453110287566', // your App ID
        'clientSecret'    : '64ce54dd6188650ded6a90a5d7a268fc', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        // "passReqToCallback" : true,
        'profileFields': ['email']
    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '921550211190-5blbjop36hgt6o7fk8d228g1c9irs7an.apps.googleusercontent.com',
        'clientSecret'     : 'FBL7eo0c_EaXJU-nJE-6dGMo',
        'callbackURL'      : 'http://localhost:3000/auth/google/callback'
    }

};
