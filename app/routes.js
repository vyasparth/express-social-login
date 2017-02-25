// app/routes.js
    
var FacebookController = require('./controllers/FacebookController.js');
var GithubController = require('./controllers/GithubController.js');

module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // route for showing the facebook friends
    app.get('/friends/facebook/:id/:token', isLoggedIn, FacebookController.get_friend_list_from_facebook);

    // route for showing the github followers
    app.get('/friends/github/:username', isLoggedIn, GithubController.get_follower_list_from_github);

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // send to instagram to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    // app.get('/auth/instagram',
    //     passport.authenticate('instagram'),
    //     function(req, res) {

    //     });

    // // the callback after instagram has authenticated the user
    // app.get('/auth/instagram/callback',
    //     passport.authenticate('instagram', {
    //         failureRedirect: '/'
    //     }),
    //     function(req, res) {
    //         res.redirect('/profile');
    //     });

    // =====================================
    // Github ROUTES =======================
    // =====================================
    // send to github to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/github',
        passport.authenticate('github'),
        function(req, res) {});

    // the callback after github has authenticated the user
    app.get('/auth/github/callback',
        passport.authenticate('github', {
            failureRedirect: '/'
        }),
        function(req, res) {
            res.redirect('/profile');
        });

    // =====================================
    // Twitter ROUTES =======================
    // =====================================
    // send to github to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/twitter',
        passport.authenticate('twitter'),
        function(req, res) {});

    // the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            failureRedirect: '/'
        }),
        function(req, res) {
            res.redirect('/profile');
        });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}