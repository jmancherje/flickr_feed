const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Image = require('./image').schema;

// define our model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String,
  favorites: [{ type: Schema.Types.ObjectId, ref: 'image' }]
})

// On Save Hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function(next) {
  // get access to user model
  const user = this;

  // generate a salt (async)
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) our password using our salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    })
  });
});

// add comparePassword method to the userSchema so that each instance of a user
// model will be able to easily compare sign in pw with encrypted stored pw
// used in local passport strategy in passport.js
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // candidatePassword is the unencrypted pw the user submitted
  // this.password is the salted/hashed password stored in db for the user
  // bcrypt will salt/hash the candidate password and compare it to this.password
  // isMatch will be a boolean of whether or not the password is correct
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch)
  });
}

// create model class
const ModelClass = mongoose.model('user', userSchema)

// export model
module.exports = ModelClass