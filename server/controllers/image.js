const User = require('../models/user');
const Image = require('../models/image');
var ObjectId = require('mongoose').Types.ObjectId;

exports.addFavorite = function(req, res, next) {
  const email = req.user.email;
  imageData = req.body;
  imageData.url = req.body.media.m;

  const newImg = new Image(imageData);
  newImg.save()
    .then(function(image) {
      User.findOneAndUpdate(
        { email: email },
        { $push: { favorites: image._id } },
        function(err, doc) {
          if (err) { console.error(err) }
          res.status(201).send(doc)
        });
    });
}

exports.getFavorites = function(req, res, next) {
  const email = req.user.email;

  User.findOne({ email: email })
    .populate('favorites')
    .exec(function (err, user) {
      if (err) { console.error(err) }
      res.status(200).send(user.favorites)
    });
}

exports.deleteImageById = function(req, res, next) {
  const email = req.user.email;
  const id = req.body.id;

  Image.findOneAndRemove({ _id: id })
    .exec(function(err, removed) {
      User.findOneAndUpdate(
        { email: email },
        { $pull: { favorites: id } },
        { new: true },
        function(err, removedFromUser) {
          if (err) { console.error(err) }
          res.status(200).send(removedFromUser)
        })
    })
}

exports.findUser = function(req, res, next) {
  const email = req.user.email;

  User.findOne({ email: email })
    .then(function(user) {
      res.send(user)
    })
}