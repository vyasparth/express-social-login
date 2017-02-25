// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    github: {
        id: String,
        token: String,
        name: String,
        username: String,
        email: String,
        public_repos: Number,
        public_gists: Number,
        followers: Number,
        following: Number
    },
    twitter: {
        id: String,
        token: String,
        name: String,
        followers_count: Number,
        friends_count: Number,
        screen_name: String,
        favourites_count: Number,
        photo: String
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);