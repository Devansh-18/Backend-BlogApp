const express = require("express");
const router = express.Router();

//Import Controllers

const {createBlog, getAllBlogs, getBlogById} = require("../controllers/blogController");

router.post("/blogs/create",createBlog);

router.get("/blogs/getblog",getAllBlogs);

router.get("/blogs/getblog/:blogId",getBlogById);

//export
module.exports = router;
