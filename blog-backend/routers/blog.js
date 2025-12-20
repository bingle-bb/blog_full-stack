const express = require("express");
const router = express.Router();

const {
  blogList,
  blogDetail,
  blogCreate,
  blogUpdate,
  blogDelete,
} = require("../controllers/blogController");
const validateToken = require("../middleware/validateJwtToken");

// middleware
router.use(validateToken);

// Get all blogs
router.get("/", blogList);

// Get single blog
router.get("/:id", blogDetail);

// Create new blog
router.post("/", blogCreate);

// Update blog
router.put("/:id", blogUpdate);

// Delete blog
router.delete("/:id", blogDelete);

module.exports = router;
