const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String },
  category: { type: String },
  image: { type: String },
  status: { type: String, default: 'Draft' }, // Published or Draft
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
