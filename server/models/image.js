const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  author: String,
  author_id: String,
  date_taken: String,
  description: String,
  link: String,
  published: String,
  tags: String,
  title: String,
  url: String
})

// imageSchema.pre('remove', function(next) {
//     // Remove all the assignment docs that reference the removed person.
//     this.model('Assignment').remove({ person: this._id }, next);
// });

// create model class
const ModelClass = mongoose.model('image', imageSchema)

// export model
module.exports = ModelClass