import mongoose from "mongoose";


const UserModel=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    lastName:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:7,
        max:20,
    },
    picturePath:{
        type:String,
        default:"",
    },
    friends:{
        type:Array,
        default:[],
    },
    location:String,
    occupation:String,
    viewedProfile:Number,
    impressions:Number,


},{timestamps:true});


const User = mongoose.model("User",UserModel);

export default User;
