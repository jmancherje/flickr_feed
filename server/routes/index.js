const express = require('express');
const flickrController = require('../controllers/flickr_controller');

const router = express.Router();
router.get('/images', flickrController.fetchFeed);

module.exports = router;