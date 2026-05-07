const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/portfolio");

const Project = mongoose.model(
  "Project",
  new mongoose.Schema(
    {
      category: String,
      title: String,
    },
    { strict: false },
  ),
);

const resetProjects = async () => {
  try {
    // Delete all projects
    const result = await Project.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} projects from database`);

    console.log(
      "\n📋 Database is now empty. You can add new projects from admin panel.",
    );
    console.log("Available categories:");
    console.log("  - Web Development");
    console.log("  - E-Commerce");
    console.log("  - Research & AI");
    console.log("  - Automation");
    console.log("  - Productivity Tools");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    mongoose.disconnect();
  }
};

resetProjects();
