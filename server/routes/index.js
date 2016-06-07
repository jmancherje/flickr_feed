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
router.get('/favorites', requireAuth, ImageController.getFavorites);
router.post('/favorites', requireAuth, ImageController.addFavorite);
router.delete('/favorites', requireAuth, ImageController.deleteImageById);
router.get('/checkuser', requireAuth, ImageController.findUser);

module.exports = router;