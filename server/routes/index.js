const express = require('express');
const passport = require('passport');
const Authentication = require('../controllers/auth');
const passportServer = require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const requireSignin = passport.authenticate('local', { session: false });

const router = express.Router();
router.post('/signin', requireSignin, Authentication.signin);
router.post('/signup', Authentication.signup);
router.get('/favorites', function(req, res, next) {
  console.log('this route will fetch all users favorites');
});
router.post('/favorites', function(req, res, next) {
  console.log('this route will add favorites to user');
});

module.exports = router;