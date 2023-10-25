import mongoose from "mongoose";

const PostsSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    location:{
        type:String
    },
    description:String,
    picturePath:String,
    userPicturePath:String,
    tags:{
        type:Array,
        default:[]
    },  
    likes:{
        type:Map,
        of:Boolean
    },
    comments:{
        type:Array,
        default:[]
    }
},{timestamps:true});

const Post=mongoose.model("Post",PostsSchema);

export default Post;