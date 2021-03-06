const mongoose = require("mongoose");
const {Schema} = mongoose;

const articleSchema = new Schema({
  title: String,
  imageUrl: String,
  video: String,
  description: String,
  like: Number
}, {
  timestamps: true
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;