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

const fixCategories = async () => {
  try {
    // See all current categories
    const categories = await Project.distinct("category");
    console.log("Current categories in database:", categories);

    // Valid categories
    const validCategories = [
      "Web Development",
      "E-Commerce",
      "Research & AI",
      "Automation",
      "Productivity Tools",
    ];

    // Fix each project with invalid categories
    let fixedCount = 0;
    for (const cat of categories) {
      if (!validCategories.includes(cat) && cat !== undefined && cat !== null) {
        const result = await Project.updateMany(
          { category: cat },
          { $set: { category: "Web Development" } },
        );
        console.log(
          `Fixed ${result.modifiedCount} projects with category "${cat}" -> "Web Development"`,
        );
        fixedCount += result.modifiedCount;
      }
    }

    // Fix any null/undefined categories
    const nullResult = await Project.updateMany(
      { category: { $in: [null, undefined, ""] } },
      { $set: { category: "Web Development" } },
    );
    console.log(
      `Fixed ${nullResult.modifiedCount} projects with null/empty category`,
    );

    // Show final categories
    const finalCategories = await Project.distinct("category");
    console.log("\n✅ Final categories in database:", finalCategories);
    console.log(
      `✅ Total projects fixed: ${fixedCount + nullResult.modifiedCount}`,
    );

    mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    mongoose.disconnect();
  }
};

fixCategories();
