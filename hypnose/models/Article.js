const mongoose = require("mongoose");
const {Schema} = mongoose;

const articleSchema = new Schema({
  title: String,
  image: String,
  video: String,
  description: String
}, {
  timestamps: true
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;