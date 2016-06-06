const express = require('express');
const passport = require('passport');
const Authentication = require('../controllers/auth');
const passportServer = require('../services/passport');

// auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// controllers
const ImageController = require('../controllers/image')

const router = express.Router();
router.post('/signin', requireSignin, Authentication.signin);
router.post('/signup', Authentication.signup);
router.get('/favorites', requireAuth, ImageController.fetchImages);
router.post('/favorites', requireAuth, ImageController.addImage);
router.delete('/favorites', requireAuth, ImageController.removeImage);
router.get('/checkuser', requireAuth, ImageController.checkUser);

module.exports = router;