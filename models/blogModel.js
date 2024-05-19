const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    user:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        trim:true,
        enum:["AI", "ML", "Software", "Web Development", "Networking", "Algorithms", "Designing"]
    },
    hashtag:[{
        type:String,
        trim:true,
        req:true,
    }]
    
})

//export
module.exports = mongoose.model("Blog", blogSchema)