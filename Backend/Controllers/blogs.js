const Blog = require("../Models/blogsModels");
const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/getAllBlogs", async (req, res) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs found" });
  }
  return res.status(200).json({ blogs });
});

router.post("/addBlog", async (req, res) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await Blog.fibdById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Unable to find User by ID" });
  }
  const blog = await new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    existingUser.blogs.push(blog)
    await existingUser.save({session})
    await session.commitTransaction()
  } catch (error) {
     console.log(error);
     return res.status(500).json({message:error})
  }
  return res.status(201).json({ blog });
});

router.put("/update/:id", async (req, res) => {
  const { title, description } = req.body;
  const { blogId } = req.params;
  let Blog;
  try {
    Blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!Blog) {
    return res.status(404).json({ message: "Unable to udate blog" });
  }
  return res.status(200).json({ Blog });
});

router.get("/getBlog/:id", async (req, res) => {
  const id = req.params.id;
  let Blog;
  try {
    Blog = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!Blog) {
    return res.status(404).json({ message: "No blog found" });
  }
  return res.status(200).json({ Blog });
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  let Blog;
  try {
    Blog = await Blog.findByIdAndRemove(id).populate('user');
    await Blog.user.blogs.pull(Blog)
    await Blog.user.save()
  } catch (error) {
    return console.log(error);
  }
  if (!Blog) {
    return res.status(404).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully deleted" });
});

router.get("/user/:id", async (req, res) => {
    const userId = req.params.id;
    let userBlog;
    try {
        userBlog = await Blog.findById(userId).populate('blogs');
    } catch (error) {
      return console.log(error);
    }
    if (!userBlog) {
      return res.status(404).json({ message: "No blog found" });
    }
    return res.status(200).json({blogs: userBlog });
  });

module.exports = router;
