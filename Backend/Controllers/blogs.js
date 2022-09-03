const Blog = require("../Models/blogsModels");
const User = require('../Models/userModel')
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
  let blogs;
  try {
    blogs = await Blog.find().populate('user')
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
   let existingUser = await User.findById(user);
   if (!existingUser) {
     return res.status(400).json({ message: "Unable TO FInd User By This ID" });
   }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    await blog.save()
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save(session );
    existingUser.blogs.push(blog);
    await existingUser.save( session );
    await session.commitTransaction();
    
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });

})


router.put("/update/:id", async (req, res) => {
  const { title, description } = req.body;
  const  blogId  = req.params.id;

  try {
   let  blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
    if (!blog) {
      return res.status(404).json({ message: "Unable to update blog" });
    }
    return res.status(200).json({ blog });
  } catch (error) {
    return console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const  id  = req.params.id;

  try {
   let  blog = await Blog.findByIdAndRemove(id).populate('user');
   await blog.user.blogs.pull(blog)
    if (!blog) {
      return res.status(404).json({ message: "Unable to update blog" });
    }
    return res.status(200).json({message: 'Successfully deleted' });
  } catch (error) {
    return console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blog });
});

router.get('/getUser/:id', async(req,res)=>{
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ user: userBlogs });
});


module.exports = router;
