const Blog = require("../models/blogModel");
const Tag = require("../models/tagModel");

exports.createBlog = async (req,res)=>{
    try{
        const {title,body,tag,hashtag,user} = req.body;
        const blog = new Blog({
            title,body,tag,hashtag,user
        })
        const savedBlog = await blog.save();

        const recentBlog = await Blog.find().sort({"_id": -1}).limit(1);
        const recentBlogJson = recentBlog[0];

        const recentBlogTag = recentBlogJson.tag;

        const existingTag = await Tag.findOne({title:recentBlogTag});

        let newTag = {};
        if(existingTag){
            newTag = await Tag.findByIdAndUpdate({_id:existingTag._id},{$push:{blogs:recentBlogJson._id}},{new:true});
        }
        else{
            const createdTag = new Tag({
                title:recentBlogTag, 
                blogs:[recentBlogJson._id]
            })
            newTag = await createdTag.save();
        }
        
        return res.status(200).json({
            success:true,
            message:'Blog created Successfully',
            blog: savedBlog,
            tag: newTag,
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error while creating blog",
            error:error.message,
        })
    }
};

exports.getAllBlogs = async (req,res)=>{
    try{
        const tag = req.query.tag;
        const hashtag = req.query.hashtag;

        if(!tag && !hashtag){
            const blogs = await Blog.find();
            return res.status(200).json({
                blogs,
            })
        }
        else if(tag){
            const blogs = await Tag.findOne({title:tag}).populate("blogs").exit();
            return res.status(200).json({
                success:true,
                message:'Blogs related to tag fetched successfully',
                blogs,
            })
        }
        else if(hashtag){
            const blogs = await Blog.find({hashtag:{$elemMatch:hashtag}})
            return res.status(200).json({
                success:true,
                message:'Blogs related to hashtag fetched successfully',
                blogs,
            })
        }
        
    }
    catch(error){
        return res.status(400).json({
            error:"Error while fetching Blogs",
            message:error.message
        })
    }
}

exports.getBlogById = async (req,res)=>{
    try{
        const blogId = req.params.blogId;
        const blog = await Blog.findById({blogId});
        const relatedTag = await Tag.findOne({title:blog.tag}).populate("blogs").exit();
        return res.status(200).json({
            success:true,
            message:'Blog Page fetched Successfully',
            blog,
            relatedTag
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(404).json({
            success:false,
            message:'Blog by Id not fetched',
            error:error.message
        })
    }
}