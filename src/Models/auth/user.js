
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    Names:{
        type:String,
        required: true,
        
    },
    email:{
      type:String,
      required:true,
      

    },

    phoneNumber:{
      type:String,
      required: true
    },

   
    Gender:{
    type:String,
    required: true,

    },
    
    profile_picture:{
        type:String,
        required: false
    },
    
    password:{
        type:String,
        required: true
    },
    role:{
        type:String,
        default: "user"
    },token: { type: String },
    
},
{ timestamps: true })
const User= mongoose.model("User",userSchema)

export default User
