const express = require("express");
const router = express.Router();
const { loginAdmin, getMe } = require("../controllers/adminController");
const auth = require("../middleware/auth");

router.post("/login", loginAdmin);
router.get("/me", auth, getMe);

module.exports = router;
