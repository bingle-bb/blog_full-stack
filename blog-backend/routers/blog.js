const express = require("express");
const router = express.Router();

const {
  blogList,
  blogDetail,
  blogCreate,
  blogUpdate,
  blogDelete,
} = require("../controllers/blogController");

// middleware
router.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

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
