const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://protfolio-frontend-alpha.vercel.app",
    ],
    credentials: true,
  }),
);

// Create default admin function
const createDefaultAdmin = async () => {
  try {
    // Check if admin exists
    const adminExists = await Admin.findOne({ email: "admin@example.com" });

    if (!adminExists) {
      // Create default admin
      const admin = await Admin.create({
        username: "admin",
        email: "admin@example.com",
        password: "admin123",
      });

      console.log("\n==================================");
      console.log("✅ DEFAULT ADMIN CREATED!");
      console.log("📧 Email: admin@example.com");
      console.log("🔑 Password: admin123");
      console.log("==================================\n");
    } else {
      console.log("\n✅ Admin already exists");
      console.log("📧 Email: admin@example.com");
      console.log("🔑 Password: admin123");
      console.log("==================================\n");
    }
  } catch (error) {
    console.error("Error creating admin:", error.message);
  }
};

// Import routes
app.use("/api/admin", require("./routes/admin"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/contact", require("./routes/contact"));

// Error handler
app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 5000;

// Create admin and start server
createDefaultAdmin().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API URL: http://localhost:${PORT}/api`);
  });
});
