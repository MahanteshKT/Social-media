import mongoose from "mongoose";

const comments=mongoose.Schema({
    postId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true})

const Comment=mongoose.model("Comment",comments);
export default Comment
