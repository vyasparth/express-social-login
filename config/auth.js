// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth': {
        'clientID': '', // your App ID
        'clientSecret': '', // your App Secret
        'callbackURL': 'http://localhost:3000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'googleAuth': {
        'clientID': '', // your Client ID
        'clientSecret': '', // your Client Secret
        'callbackURL': 'http://localhost:3000/auth/google/callback'
    },

    // 'instagramAuth': {
    //     'clientID': '',
    //     'clientSecret': ' ',
    //     'callbackURL': 'http://127.0.0.1:3000/auth/instagram/callback'
    // },

    'githubAuth': {
        'clientID': '',
        'clientSecret': '',
        'callbackURL': "http://localhost:3000/auth/github/callback"
    },

    'twitterAuth': {
        'consumerKey': '',
        'consumerSecret': '',
        'callbackURL': "http://localhost:3000/auth/twitter/callback"
    },
};