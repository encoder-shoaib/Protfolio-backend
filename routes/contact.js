const express = require("express");
const router = express.Router();
const {
  submitContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");
const auth = require("../middleware/auth");

router.post("/", submitContact);
router.get("/", auth, getContacts);
router.delete("/:id", auth, deleteContact);

module.exports = router;
