const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  image: { type: String, required: true },
  images: [String],
  link: String,
  github: String,
  tech: [{ name: String }],
  category: {
    type: String,
    enum: [
      "Web Development",
      "E-Commerce",
      "Research & AI",
      "Automation",
      "Productivity Tools",
    ],
    required: true,
  },
  featured: { type: Boolean, default: false },
  metrics: {
    users: String,
    performance: String,
    rating: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);
