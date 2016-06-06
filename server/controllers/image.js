const Image = require('../models/image');
const User = require('../models/user');

exports.addImage = function(req, res, next) {
  const imageData = JSON.stringify(req.body);
  const favorite = new Image({ jsonData: imageData })
  favorite.save()
    .then(function(image) {
      const imageId = image._id
      User.findOne({ email: req.user.email }, function(err, user) {
        user.favorites.push(imageId)
        user.save()
          .then(function(user) {
            res.sendStatus(201)
          })
      })
    })
    .catch(function(error) {
      res.status(500).send(error)
    })
};

exports.fetchImages = function(req, res, next) {
  const query = { email: req.user.email };

  User.findOne(query, function(err, user) {
    const ids = user.favorites;
    Image.find({
      '_id': { $in: ids }
    }, function(err, images) {
      console.log('all favorites', images);
      res.status(200).send(images);
    })
  })
};

exports.removeImage = function(req, res, next) {
  const imageId = req.body.id;
  // find Image by Id
  Image.findOne({ '_id': imageId }, function(err, image) {
    if (err) {
      console.error('error finding favorite image', err)
    } else {
      image.remove(function(err, doc) {
        if (err) {
          console.error('error removing favorite image', err)
        } else {
          User.update(
            { email: req.user.email },
            { $pull: { favorites: { _id: imageId } } }
          )
            .then(function(err, doc) {
              console.log('err, doc', err, doc)
              res.sendStatus(202);           
            })
        }
      })
    }
  })
}

exports.checkUser = function(req, res, next) {
  console.log('user', req.user)
  res.status(200).send(req.user)
}