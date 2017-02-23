// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookService = require('../app/helpers/FacebookService');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

   // used to serialize the user for the session
   passport.serializeUser(function(user, done) {
      done(null, user.id);
   });

   // used to deserialize the user
   passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
         done(err, user);
      });
   });

   // =========================================================================
   // FACEBOOK ================================================================
   // =========================================================================

   var fbStrategy = configAuth.facebookAuth;
   fbStrategy.passReqToCallback = true; // allows us to pass in the req from our route (lets us check if a user is logged in or not)
   passport.use(new FacebookStrategy(fbStrategy,
      function(req, token, refreshToken, profile, done) {

         console.log(token);
         console.log(profile);
         var apiPath = '/me/friends';
         // asynchronous
         process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({
               'facebook.id': profile.id
            }, function(err, user) {

               // if there is an error, stop everything and return that
               // ie an error connecting to the database
               if (err)
                  return done(err);

               // if the user is found, then log them in
               if (user) {
                  return done(null, user); // user found, return that user
               } else {
                  // if there is no user found with that facebook id, create them
                  var newUser = new User();

                  // set all of the facebook information in our user model
                  newUser.facebook.id = profile.id; // set the users facebook id                   
                  newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                  newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                  newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                  // save our user to the database
                  newUser.save(function(err) {
                     if (err)
                        throw err;

                     // if successful, return the new user
                     return done(null, newUser);
                  });
               }

            });
         });

      }));
   // =========================================================================
   // GOOGLE ==================================================================
   // =========================================================================
   passport.use(new GoogleStrategy({

         clientID: configAuth.googleAuth.clientID,
         clientSecret: configAuth.googleAuth.clientSecret,
         callbackURL: configAuth.googleAuth.callbackURL,

      },
      function(token, refreshToken, profile, done) {

         // make the code asynchronous
         // User.findOne won't fire until we have all our data back from Google
         process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({
               'google.id': profile.id
            }, function(err, user) {
               if (err)
                  return done(err);

               if (user) {

                  // if a user is found, log them in
                  return done(null, user);
               } else {
                  // if the user isnt in our database, create a new user
                  var newUser = new User();

                  // set all of the relevant information
                  newUser.google.id = profile.id;
                  newUser.google.token = token;
                  newUser.google.name = profile.displayName;
                  newUser.google.email = profile.emails[0].value; // pull the first email

                  // save the user
                  newUser.save(function(err) {
                     if (err)
                        throw err;
                     return done(null, newUser);
                  });
               }
            });
         });

      }));
};