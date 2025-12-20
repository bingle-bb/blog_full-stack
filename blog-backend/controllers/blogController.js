const Blog = require("../models/blogModel");

const blogList = async (req, res) => {
  try {
    const blogs = await Blog.find({ user_id: req.user.id });
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const blogDetail = async (req, res) => {
  try {
    const blogData = await Blog.findById(req.params.id);
    if (!blogData) {
      return res.status(404).json({ message: "blog not found!" });
    }
    if (blogData.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Permission not allowed!" });
    }

    return res.status(200).json(blogData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const blogCreate = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newBlog = await Blog.create({
      title,
      content,
      user_id: req.user.id,
    });

    return res.status(201).json(newBlog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const blogUpdate = async (req, res) => {
  try {
    const blogData = await Blog.findById(req.params.id);
    if (!blogData) {
      return res.status(404).json({ message: "blog not found!" });
    }
    if (blogData.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Permission not allowed!" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedBlog);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const blogDelete = async (req, res) => {
  try {
    const blogData = await Blog.findById(req.params.id);
    if (!blogData) {
      return res.status(404).json({ message: "blog not found!" });
    }
    if (blogData.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Permission not allowed!" });
    }
    await blogData.deleteOne();
    return res.status(200).json(blogData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  blogList,
  blogDetail,
  blogCreate,
  blogUpdate,
  blogDelete,
};
