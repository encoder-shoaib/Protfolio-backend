const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  author: {
    name: { type: String, default: "Md Shoaib" },
    avatar: String,
    role: { type: String, default: "Senior Developer" },
  },
  readTime: { type: String, default: "5 min read" },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  slug: { type: String, required: true, unique: true },
  publishedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
