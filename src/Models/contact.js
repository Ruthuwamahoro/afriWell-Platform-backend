
import mongoose from "mongoose";

const ContactSchema = mongoose.Schema({
    FirstName:{
        type:String,
        required: true
    },
    LastName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:false
    },

    Email:{
        type:String,
        required:false
    },
    Request:{
        type:String,
        required:true
    }   
},
{ timestamps: true })
const Contact= mongoose.model("Contact",ContactSchema)

export default Contact
